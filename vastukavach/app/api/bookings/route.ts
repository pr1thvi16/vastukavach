import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  const required = ['name','email','phone','date','propertyType','message']
  if (!body || required.some((key) => typeof body[key] !== 'string' || !body[key].trim())) return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  if (!/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({ error: 'Enter a valid email.' }, { status: 400 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
