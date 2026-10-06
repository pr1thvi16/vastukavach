import { NextResponse } from 'next/server'

type BookingInput = {
  name: string
  email: string
  phone: string
  date: string
  propertyType: 'Home' | 'Workplace' | 'Development'
  message: string
}

const requiredFields = ['name', 'email', 'phone', 'date', 'propertyType', 'message'] as const

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function safeWebhookUrl(value: string) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || (process.env.NODE_ENV !== 'production' && url.hostname === 'localhost')
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null)
  if (!body || typeof body !== 'object' || requiredFields.some((key) => typeof (body as Record<string, unknown>)[key] !== 'string')) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  const input = Object.fromEntries(requiredFields.map((key) => [key, (body as Record<string, string>)[key].trim()])) as BookingInput
  if (requiredFields.some((key) => !input[key])) return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  if (input.name.length > 120 || input.email.length > 254 || input.phone.length > 40 || input.message.length > 5000) {
    return NextResponse.json({ error: 'Please shorten one or more fields.' }, { status: 400 })
  }
  if (!isEmail(input.email)) return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 })
  const phoneDigits = input.phone.replace(/\D/g, '')
  if (!/^[+()\d\s.-]+$/.test(input.phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    return NextResponse.json({ error: 'Enter a valid phone number.' }, { status: 400 })
  }
  const parsedDate = new Date(`${input.date}T00:00:00.000Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(input.date) || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== input.date) {
    return NextResponse.json({ error: 'Choose a valid preferred date.' }, { status: 400 })
  }
  if (input.date < new Date().toISOString().slice(0, 10)) return NextResponse.json({ error: 'Choose a date that is today or later.' }, { status: 400 })
  if (!['Home', 'Workplace', 'Development'].includes(input.propertyType)) return NextResponse.json({ error: 'Choose a valid property type.' }, { status: 400 })

  const webhookUrl = process.env.BOOKING_WEBHOOK_URL?.trim()
  const resendApiKey = process.env.RESEND_API_KEY?.trim()
  const notificationEmail = process.env.BOOKING_NOTIFICATION_EMAIL?.trim()
  const fromEmail = process.env.BOOKING_FROM_EMAIL?.trim()
  const hasResendConfig = Boolean(resendApiKey && notificationEmail && fromEmail)
  const hasAnyResendConfig = Boolean(resendApiKey || notificationEmail || fromEmail)

  if (!webhookUrl && !hasResendConfig) {
    const error = hasAnyResendConfig
      ? 'Booking email is partially configured. Please contact the site administrator.'
      : 'Online booking is not configured yet. Please use the contact page to request a consultation.'
    return NextResponse.json({ error }, { status: 503 })
  }
  if (webhookUrl && !safeWebhookUrl(webhookUrl)) {
    return NextResponse.json({ error: 'The booking delivery URL must use HTTPS.' }, { status: 503 })
  }
  const submittedAt = new Date().toISOString()
  try {
    let result: Response
    if (webhookUrl) {
      result = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...input, submittedAt, source: 'Kavach Consultancy website' }),
        signal: AbortSignal.timeout(8000),
      })
    } else {
      const text = [
        'New Kavach Consultancy booking enquiry',
        '',
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone}`,
        `Preferred date: ${input.date}`,
        `Property type: ${input.propertyType}`,
        '',
        'How can we help?',
        input.message,
        '',
        `Submitted at: ${submittedAt}`,
      ].join('\n')
      result = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromEmail, to: [notificationEmail], reply_to: input.email, subject: `Website booking enquiry — ${input.propertyType}`, text }),
        signal: AbortSignal.timeout(8000),
      })
    }
    if (!result.ok) return NextResponse.json({ error: 'We could not send your request right now. Please try again shortly.' }, { status: 502 })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'We could not send your request right now. Please try again shortly.' }, { status: 502 })
  }
}
