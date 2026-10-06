import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const required = ['name','email','phone','date','propertyType','message']
  if (!body || required.some((key) => typeof body[key] !== 'string' || !body[key].trim())) return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  if (!/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 })
  if (body.name.length > 120 || body.email.length > 254 || body.phone.length > 40 || body.message.length > 5000) return NextResponse.json({ error: 'Please shorten one or more fields.' }, { status: 400 })
  if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date) || Number.isNaN(Date.parse(`${body.date}T00:00:00Z`))) return NextResponse.json({ error: 'Choose a valid preferred date.' }, { status: 400 })
  if (!['Home', 'Workplace', 'Development'].includes(body.propertyType)) return NextResponse.json({ error: 'Choose a valid property type.' }, { status: 400 })

  const destination = process.env.BOOKING_WEBHOOK_URL
  if (!destination) return NextResponse.json({ error: 'Online booking is not configured yet. Please use the contact page to request a consultation.' }, { status: 503 })

  try {
    const result = await fetch(destination, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...body, submittedAt: new Date().toISOString(), source: 'Kavach Consultancy website' }),
      signal: AbortSignal.timeout(8000),
    })
    if (!result.ok) return NextResponse.json({ error: 'We could not send your request right now. Please try again shortly.' }, { status: 502 })
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'We could not send your request right now. Please try again shortly.' }, { status: 502 })
  }
}
