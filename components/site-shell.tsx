'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Mail, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react'
import { track } from '@vercel/analytics'
import { trackGA4Event } from '@/lib/ga4'
import { LanguageToggle, useLanguage } from '@/components/language'

// Contact sits last so every navigation path ends with a way to reach us. Booking stays a header action.
const nav = [['Home','/'],['About','/about'],['Services','/services'],['Vastu checker','/vastu-checker'],['Journal','/blogs'],['Contact','/contact']] as const

const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || '+971 50 123 4567'
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()
const whatsappNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || '971501234567').replace(/\D/g, '')
type WhatsAppTopic = 'general' | 'home' | 'workplace' | 'development'
const whatsappMessages: Record<'en' | 'ar', Record<WhatsAppTopic, string>> = {
  en: {
    general: "Hi Kavach, I'd like help reviewing a property layout. Can you guide me on the next steps?",
    home: "Hi Kavach, I'd like advice about a home layout. Can we review its light, circulation and orientation?",
    workplace: "Hi Kavach, I'd like advice about a workplace layout and how people move through it.",
    development: "Hi Kavach, I'd like to discuss a Vastu review for a development project.",
  },
  ar: {
    general: 'مرحباً كافاش، أود الحصول على مساعدة في مراجعة مخطط عقاري. هل يمكنكم إرشادي إلى الخطوات التالية؟',
    home: 'مرحباً كافاش، أود الحصول على نصيحة بشأن مخطط منزل ومراجعة الضوء والحركة والاتجاه.',
    workplace: 'مرحباً كافاش، أود الحصول على نصيحة بشأن تخطيط مكان العمل وحركة الأشخاص فيه.',
    development: 'مرحباً كافاش، أود مناقشة مراجعة فاستو لمشروع تطوير عقاري.',
  },
}
export function whatsappHref(language: 'en' | 'ar' = 'en', topic: WhatsAppTopic = 'general') {
  return whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessages[language][topic])}` : undefined
}
export const contact = {
  phone: contactPhone,
  tel: contactPhone ? `tel:${contactPhone.replace(/[^+\d]/g, '')}` : undefined,
  email: contactEmail,
  whatsapp: whatsappHref(),
  location: 'Dubai, United Arab Emirates',
  address: 'Bur- Dubai, Behind ADCB Bank, Dubai, United Arab Emirates',
}

// Architectural compass mark: a cut-corner frame, pitched roof, doorway and north tick.
export function LogoMark({ className = 'size-11' }: { className?: string }) { return <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true"><path d="M16 5.5h32L58.5 16v32L48 58.5H16L5.5 48V16L16 5.5Z" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /><path d="M15.5 31 32 19l16.5 12M20.5 29.5V48h23V29.5M28 48V35h8v13M32 10v5m-3-2.5h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg> }
export function Logo({ light = false }: { light?: boolean }) { const { t } = useLanguage(); return <Link href="/" className="flex shrink-0 items-center"><span className="sr-only">{t('Home')}</span>{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/images/kavach-logo.png" alt="Kavach Consultancy" width={700} height={605} className={`h-14 w-auto sm:h-16 ${light ? 'drop-shadow-md' : ''}`} /></Link> }

export const Eyebrow = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => { const { t } = useLanguage(); return <p className={`flex items-center gap-4 text-[11px] uppercase tracking-[.28em] ${light ? 'text-[#d9bf9a]' : 'text-[#74512f]'}`}><span className="h-px w-10 bg-current" />{typeof children === 'string' ? t(children) : children}</p> }
export const btn = 'inline-flex items-center gap-3 px-7 py-4 text-[11px] font-medium uppercase tracking-[.22em] transition-[color,background-color,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0'

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  return <header className={overlay ? 'absolute inset-x-0 top-0 z-30 border-b border-white/20 bg-[#211114]/65 shadow-lg backdrop-blur-md' : 'border-b border-[#2a1b1f]/10 bg-[#f6f1ea]'}><div className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-10 ${overlay ? 'text-white' : 'text-[#2a1b1f]'}`}><Logo light={overlay} /><div className="hidden items-center gap-4 xl:flex"><nav className="site-nav flex items-center gap-4 text-[11px] uppercase tracking-[.14em]" aria-label={t('Primary navigation')}>{nav.map(([label, href]) => <Link key={href} href={href} onClick={() => { if (href === '/vastu-checker') trackGA4Event('vastu_checker_start', { location: 'primary_navigation' }) }} className="whitespace-nowrap transition-opacity hover:opacity-60">{t(label)}</Link>)}</nav><LanguageToggle className="whitespace-nowrap" /><Link href="/bookings" onClick={() => { track('Consultation CTA Clicked', { location: 'header' }); trackGA4Event('consultation_cta_click', { location: 'header' }) }} className={`${btn} whitespace-nowrap px-5 py-3 ${overlay ? 'border border-white/50 hover:bg-white hover:text-[#2a1b1f]' : 'bg-[#3b1220] text-[#f6f1ea] hover:bg-[#74512f]'}`}>{t('Book a consultation')}</Link></div><div className="flex items-center gap-2 xl:hidden"><LanguageToggle /><button className="rounded p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" onClick={() => setOpen(!open)} aria-label={t(open ? 'Close menu' : 'Open menu')} aria-expanded={open}>{open ? <X /> : <Menu />}</button></div></div>{open && <nav className="site-nav flex flex-col divide-y divide-[#2a1b1f]/10 border-t border-[#2a1b1f]/10 bg-[#f6f1ea] px-5 text-[13px] uppercase tracking-[.18em] text-[#2a1b1f] xl:hidden" aria-label={t('Primary navigation')}>{nav.map(([label, href]) => <Link className="py-4" onClick={() => { if (href === '/vastu-checker') trackGA4Event('vastu_checker_start', { location: 'mobile_navigation' }); setOpen(false) }} key={href} href={href}>{t(label)}</Link>)}<Link href="/bookings" onClick={() => { track('Consultation CTA Clicked', { location: 'mobile_menu' }); trackGA4Event('consultation_cta_click', { location: 'mobile_menu' }); setOpen(false) }} className="my-4 inline-flex justify-center bg-[#3b1220] px-5 py-4 text-[#f6f1ea]">{t('Book a consultation')}</Link></nav>}</header>
}

// Footer doubles as a full contact transcript so details and every page are one tap away site-wide.
export function Footer() {
  const { t, language } = useLanguage()
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const details = [[contact.phone ? 'Phone' : '', contact.phone, contact.tel, Phone], [contact.email ? 'Email' : '', contact.email, contactEmail ? `mailto:${contactEmail}` : undefined, Mail], ['WhatsApp', 'Message us', whatsappHref(language), MessageCircle]] as const
  return <><footer className="bg-[#3b1220] px-5 pb-10 pt-20 text-[#f6f1ea] lg:px-10"><div className="mx-auto max-w-7xl"><div className="grid gap-14 lg:grid-cols-[1.2fr_1fr_.7fr]"><div><Eyebrow light>Contact details</Eyebrow><h2 className="mt-6 font-serif text-5xl font-light leading-[1.05] sm:text-6xl">{t('Let’s talk about your space.')}</h2><p className="mt-6 max-w-sm text-sm leading-7 text-white/80">{t('Spatial advisory for more intentional living and working. Tell us what you are looking for and we will help you find the right next step.')}</p></div><dl className="divide-y divide-white/10 border-y border-white/10 text-sm">{details.filter(([label]) => label).map(([label,value,href,Icon]) => <div key={label} className="flex items-baseline justify-between gap-6 py-4"><dt className="text-[11px] uppercase tracking-[.22em] text-white/65">{t(label)}</dt><dd>{href && value && <a href={href} onClick={() => label === 'WhatsApp' && (track('WhatsApp Contact Clicked', { location: 'footer' }), trackGA4Event('whatsapp_click', { location: 'footer' }))} {...(href.startsWith('http') ? {target:'_blank',rel:'noopener noreferrer'} : {})} className="break-all font-serif text-xl hover:text-[#d9bf9a]"><Icon className="mr-2 inline size-4 text-[#d9bf9a]" />{t(value)}</a>}</dd></div>)}<div className="flex items-baseline justify-between gap-6 py-4"><dt className="text-[11px] uppercase tracking-[.22em] text-white/65">{t('Address')}</dt><dd className="max-w-xs text-right text-white/90"><MapPin className="mr-2 inline size-4 text-[#d9bf9a]" />{t(contact.address)}</dd></div>{!contact.phone && !contact.email && !contact.whatsapp && <div className="py-4 text-white/80"><Link href="/bookings" className="underline underline-offset-4">{t('Request a consultation')}</Link></div>}</dl><nav aria-label={t('Footer navigation')}><p className="text-[11px] uppercase tracking-[.22em] text-white/65">{t('Pages')}</p><ul className="footer-nav mt-4 flex flex-col gap-3 font-serif text-xl">{nav.map(([label, href]) => <li key={href}><Link href={href} onClick={() => { if (href === '/vastu-checker') trackGA4Event('vastu_checker_start', { location: 'footer_navigation' }) }} className="text-white/90 hover:text-[#d9bf9a]">{t(label)}</Link></li>)}</ul></nav></div><div className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center"><Logo light /><p className="text-xs text-white/70">© 2026 Kavach Consultancy, Dubai</p></div></div></footer>{contact.whatsapp && <div className={`fixed bottom-5 z-40 sm:bottom-7 ${language === 'ar' ? 'left-5 sm:left-7' : 'right-5 sm:right-7'}`}>
  <button id="whatsapp-options-toggle" type="button" aria-expanded={whatsappOpen} aria-controls="whatsapp-enquiry-panel" aria-label={t(whatsappOpen ? 'Close WhatsApp options' : 'Open WhatsApp options')} title={t(whatsappOpen ? 'Close WhatsApp options' : 'Open WhatsApp options')} onClick={() => setWhatsappOpen(!whatsappOpen)} className="relative z-10 inline-flex size-14 items-center justify-center rounded-full bg-[#1f9d62] text-white shadow-xl transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f9d62]">{whatsappOpen ? <X className="size-6" /> : <MessageCircle className="size-6" />}</button>
  {whatsappOpen && <div id="whatsapp-enquiry-panel" role="region" aria-label={t('Choose a topic')} onKeyDown={(event) => { if (event.key === 'Escape') { setWhatsappOpen(false); document.getElementById('whatsapp-options-toggle')?.focus() } }} className={`absolute bottom-20 ${language === 'ar' ? 'left-0 right-auto' : 'right-0 left-auto'} max-h-[calc(100svh-8rem)] w-80 max-w-[calc(100vw-2rem)] overflow-y-auto border border-[#2a1b1f]/15 bg-[#f6f1ea] p-5 text-[#2a1b1f] shadow-2xl`}>
    <div className="mb-5 flex items-start justify-between gap-4"><div><h2 className="font-serif text-2xl">{t('Choose a topic')}</h2><p className="mt-2 text-sm leading-6 text-[#2a1b1f]/70">{t('Choose a space to start your WhatsApp enquiry.')}</p></div><button type="button" aria-label={t('Close WhatsApp options')} onClick={() => { setWhatsappOpen(false); document.getElementById('whatsapp-options-toggle')?.focus() }} className="rounded p-1 text-[#2a1b1f]/70 hover:bg-[#ebe3d8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"><X className="size-4" /></button></div>
    <div className="grid gap-2">{([{topic:'home',label:'Home'},{topic:'workplace',label:'Workplace'},{topic:'development',label:'Development project'}] as const).map(({topic,label})=><a key={topic} href={whatsappHref(language, topic)} target="_blank" rel="noopener noreferrer" onClick={() => { track('WhatsApp Contact Clicked', { location: 'floating_chooser', topic }); trackGA4Event('whatsapp_click', { location: 'floating_chooser', topic }); setWhatsappOpen(false) }} className="flex items-center justify-between border border-[#2a1b1f]/15 px-4 py-3 text-sm transition-colors hover:bg-[#ebe3d8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74512f]"><span>{t(label)}</span><ArrowUpRight className="size-4 text-[#74512f]" /></a>)}</div>
  </div>}
</div>}</>
}
