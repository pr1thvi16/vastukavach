'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FormEvent, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { track } from '@vercel/analytics'
import { trackGA4Event } from '@/lib/ga4'
import { useLanguage } from '@/components/language'
import { services } from '@/components/site-data'
import { Eyebrow, Footer, Header, btn } from '@/components/site-shell'

export function StandardPage({title, eyebrow, image, imageAlt, children}: {title:string; eyebrow:string; image?:string; imageAlt?:string; children:React.ReactNode}) { const { t } = useLanguage(); return <><Header /><main><div className="mx-auto max-w-7xl px-5 pt-20 lg:px-10 lg:pt-28"><Eyebrow>{eyebrow}</Eyebrow><h1 className="mt-6 max-w-4xl font-serif text-5xl font-light leading-[1.02] sm:text-8xl">{t(title)}</h1></div>{image && <div className="relative mx-auto mt-16 h-[60svh] min-h-[320px] max-w-7xl sm:px-5 lg:px-10"><div className="relative h-full overflow-hidden"><Image src={image} alt={imageAlt ? t(imageAlt) : ''} fill sizes="100vw" className="image-drift object-cover" priority /></div></div>}<div className="mx-auto max-w-7xl px-5 py-20 lg:px-10 lg:py-28">{children}</div></main><Footer /></> }

const field = 'border-0 border-b border-[#2a1b1f]/25 bg-transparent px-0 py-3 text-base focus:border-[#a57a4a] focus:outline-none focus:ring-0'
const labelCls = 'flex flex-col gap-1 text-[11px] uppercase tracking-[.2em] text-[#2a1b1f]/70'
export function BookingForm() {
  const { t } = useLanguage()
  const [status, setStatus] = useState('')
  const [pending, setPending] = useState(false)
  const startedAt = useRef(Date.now())
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setPending(true)
    setStatus('')
    try {
  const response = await fetch('/api/bookings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), startedAt: startedAt.current }), signal: AbortSignal.timeout(15000) })
  const result = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(typeof result.error === 'string' ? result.error : 'We could not send your request right now. Please try again.')
      const formData = new FormData(form)
      track('Booking Submitted', { propertyType: String(formData.get('propertyType') ?? 'unspecified') }); trackGA4Event('generate_lead', { form_type: 'consultation', property_type: String(formData.get('propertyType') ?? 'unspecified') })
      setStatus(t('Thank you. Your booking enquiry has been sent. We will be in touch soon.'))
      form.reset()
      startedAt.current = Date.now()
    } catch (error) {
      setStatus(t(error instanceof Error ? error.message : 'We could not send your request right now. Please try again.'))
    } finally {
      setPending(false)
    }
  }
  return <form onSubmit={submit} aria-busy={pending} className="grid max-w-3xl gap-x-10 gap-y-8 border border-[#2a1b1f]/10 bg-[#fbf8f3] p-6 sm:grid-cols-2 sm:p-12">
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input name="website" type="text" tabIndex={-1} autoComplete="off" /></label></div>
    <label className={labelCls}>{t('Full name — person to contact')}<input required maxLength={120} name="name" autoComplete="name" className={`${field} normal-case tracking-normal text-[#2a1b1f]`} /></label>
    <label className={labelCls}>{t('Email address')}<input required maxLength={254} name="email" type="email" autoComplete="email" className={`${field} normal-case tracking-normal text-[#2a1b1f]`} /></label>
    <label className={labelCls}>{t('Phone / WhatsApp number')}<input required maxLength={40} name="phone" type="tel" autoComplete="tel" placeholder="+971 50 123 4567" className={`${field} normal-case tracking-normal text-[#2a1b1f]`} /></label>
    <label className={labelCls}>{t('Preferred date')}<input required name="date" type="date" min={new Date().toISOString().slice(0, 10)} autoComplete="off" aria-describedby="preferred-date-help" className={`${field} min-h-12 normal-case tracking-normal text-[#2a1b1f]`} /><span id="preferred-date-help" className="text-[10px] normal-case tracking-normal text-[#2a1b1f]/55">{t('Choose a date from today onward')}</span></label>
    <label className={labelCls}>{t('Preferred contact method')}<select required name="contactMethod" className={`${field} normal-case tracking-normal text-[#2a1b1f]`}><option value="">{t('Select one')}</option><option value="WhatsApp">{t('WhatsApp')}</option><option value="Phone">{t('Phone call')}</option><option value="Email">{t('Email')}</option></select></label>
    <label className={labelCls}>{t('Best time to contact you')}<select required name="bestTime" className={`${field} normal-case tracking-normal text-[#2a1b1f]`}><option value="">{t('Select one')}</option><option value="Morning">{t('Morning')}</option><option value="Afternoon">{t('Afternoon')}</option><option value="Evening">{t('Evening')}</option></select></label>
    <label className={`${labelCls} sm:col-span-2`}>{t('Property type')}<select required name="propertyType" className={`${field} normal-case tracking-normal text-[#2a1b1f]`}><option value="">{t('Select one')}</option><option value="Home">{t('Home')}</option><option value="Workplace">{t('Workplace')}</option><option value="Development">{t('Development')}</option></select></label>
    <label className={`${labelCls} sm:col-span-2`}>{t('How can we help?')}<textarea required maxLength={5000} name="message" rows={4} className={`${field} normal-case tracking-normal text-[#2a1b1f]`} /></label>
    <div className="sm:col-span-2"><p className="mb-4 text-xs leading-6 text-[#2a1b1f]/60">{t('Your name, phone/WhatsApp number, preferred contact method, preferred time, email, service, date and message will be included with your enquiry so our team knows who to contact and how.')}</p><button disabled={pending} className={`${btn} bg-[#3b1220] text-[#f6f1ea] hover:bg-[#74512f] disabled:cursor-wait disabled:opacity-60`}>{pending ? t('Sending…') : t('Submit booking enquiry')} <ArrowUpRight className="size-4" /></button>{status && <p role={status.startsWith(t('Thank you. Your booking enquiry has been sent. We will be in touch soon.')) ? 'status' : 'alert'} className="mt-4 text-sm text-[#2a1b1f]">{status}</p>}</div>
  </form>
}


export const ServiceCards = () => { const { t } = useLanguage(); return <div className="divide-y divide-[#2a1b1f]/15 border-y border-[#2a1b1f]/15">{services.map(([title, description, src, alt], i) => { const href = i === 0 ? '/services/residential' : i === 1 ? '/services/workplace' : '/services/development'; return <article id={title.toLowerCase().replaceAll(' ','-')} key={title} className="group grid gap-8 py-12 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-14 transition-colors duration-300 motion-reduce:transition-none hover:bg-[#fbf8f3] focus-within:bg-[#fbf8f3] px-2 sm:px-4"><span className="font-serif text-5xl italic text-[#74512f]">0{i+1}</span><div><h2 className="font-serif text-4xl">{t(title)}</h2><p className="mt-4 max-w-md leading-7 text-[#2a1b1f]/70">{t(description)}</p><Link href={href} className="mt-8 inline-block text-[11px] uppercase tracking-[.22em] text-[#74512f] underline underline-offset-8">{t('Explore this service')}</Link></div><div className="relative aspect-[4/3] overflow-hidden"><Image src={src} alt={t(alt)} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-[1.03]" /></div></article> })}</div> }
