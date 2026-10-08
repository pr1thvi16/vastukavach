import { NextResponse } from 'next/server'

type BookingInput = {
  name: string
  email: string
  phone: string
  date: string
  propertyType: 'Home' | 'Workplace' | 'Development'
  message: string
}

// Public defaults (the publishable key is designed to be public; access is limited by RLS).
// Environment variables override these when set.
const DEFAULT_SUPABASE_URL = 'https://qidfdtanwbvlporikhjj.supabase.co'
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_5hsYAgReOSB7SnK_-b5X0A_krtkqOp6'

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

function safeSupabaseUrl(value: string) {
  try {
    const url = new URL(value)
    const localUrl = process.env.NODE_ENV !== 'production' && ['localhost', '127.0.0.1'].includes(url.hostname)
    return (url.protocol === 'https:' || localUrl) && !url.username && !url.password && !url.search && !url.hash && (url.pathname === '/' || url.pathname === '')
  } catch {
    return false
  }
}

async function insertBooking(input: BookingInput, projectUrl: string, publishableKey: string) {
  return fetch(`${projectUrl.replace(/\/+$/, '')}/rest/v1/booking_enquiries`, {
    method: 'POST',
    headers: {
      apikey: publishableKey,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      phone: input.phone,
      preferred_date: input.date,
      property_type: input.propertyType,
      message: input.message,
    }),
    signal: AbortSignal.timeout(8000),
  })
}

// Best-effort spam protection. The rate limiter is in-memory, so it resets when a
// serverless instance restarts and is not shared across instances; it still blocks
// simple floods. Honeypot and timing checks do the heavy lifting against bots.
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const MIN_FILL_TIME_MS = 3000
const recentSubmissions = new Map<string, number[]>()

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  return forwarded || request.headers.get('x-real-ip')?.trim() || 'unknown'
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (recentSubmissions.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    recentSubmissions.set(ip, recent)
    return true
  }
  recent.push(now)
  recentSubmissions.set(ip, recent)
  if (recentSubmissions.size > 5000) {
    for (const [key, times] of recentSubmissions) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) recentSubmissions.delete(key)
    }
  }
  return false
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ error: 'Too many requests. Please try again in a few minutes.' }, { status: 429 })
  }

  const body: unknown = await request.json().catch(() => null)
  if (!body || typeof body !== 'object' || requiredFields.some((key) => typeof (body as Record<string, unknown>)[key] !== 'string')) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  // Bots: a hidden "website" field that humans never fill, and forms submitted faster than a person could.
  // Pretend success so bots get no signal to adapt to, but store and send nothing.
  const honeypot = (body as Record<string, unknown>).website
  const startedAt = Number((body as Record<string, unknown>).startedAt)
  if ((typeof honeypot === 'string' && honeypot.trim() !== '') || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return NextResponse.json({ ok: true, stored: true }, { status: 201 })
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
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || DEFAULT_SUPABASE_URL
  const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || DEFAULT_SUPABASE_PUBLISHABLE_KEY
  const hasSupabaseConfig = Boolean(supabaseUrl && supabasePublishableKey)
  const hasPartialSupabaseConfig = Boolean(supabaseUrl || supabasePublishableKey) && !hasSupabaseConfig

  if (hasPartialSupabaseConfig) {
    return NextResponse.json({ error: 'Supabase storage is partially configured. Please contact the site administrator.' }, { status: 503 })
  }
  if (!hasSupabaseConfig && !webhookUrl && !hasResendConfig) {
    const error = hasAnyResendConfig
      ? 'Booking email is partially configured. Please contact the site administrator.'
      : 'Online booking is not configured yet. Please use the contact page to request a consultation.'
    return NextResponse.json({ error }, { status: 503 })
  }
  if (hasSupabaseConfig && !safeSupabaseUrl(supabaseUrl!)) {
    return NextResponse.json({ error: 'Supabase storage URL must be a valid HTTPS project URL.' }, { status: 503 })
  }
  if (!hasSupabaseConfig && webhookUrl && !safeWebhookUrl(webhookUrl)) {
    return NextResponse.json({ error: 'The booking delivery URL must use HTTPS.' }, { status: 503 })
  }
  const submittedAt = new Date().toISOString()
  try {
    if (hasSupabaseConfig) {
      const saved = await insertBooking(input, supabaseUrl!, supabasePublishableKey!)
      if (!saved.ok) {
        return NextResponse.json({ error: 'We could not save your request right now. Please try again shortly.' }, { status: 502 })
      }

      // A successful database write is the source of truth; notifications are optional.
      if (webhookUrl && safeWebhookUrl(webhookUrl)) {
        try {
          const notification = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...input, submittedAt, source: 'Kavach Consultancy website' }),
            signal: AbortSignal.timeout(8000),
          })
          if (!notification.ok) console.error('Booking was stored in Supabase, but webhook notification failed.')
        } catch {
          console.error('Booking was stored in Supabase, but webhook notification failed.')
        }
      } else if (hasResendConfig) {
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
        try {
          const notification = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { Authorization: `Bearer ${resendApiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ from: fromEmail, to: [notificationEmail], reply_to: input.email, subject: `Website booking enquiry — ${input.propertyType}`, text }),
            signal: AbortSignal.timeout(8000),
          })
          if (!notification.ok) console.error('Booking was stored in Supabase, but email notification failed.')
        } catch {
          console.error('Booking was stored in Supabase, but email notification failed.')
        }
      }
      return NextResponse.json({ ok: true, stored: true }, { status: 201 })
    }

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
