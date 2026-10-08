'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import { track } from '@vercel/analytics'
import { trackGA4Event } from '@/lib/ga4'
import { useLanguage } from '@/components/language'
import { FounderSection } from '@/components/founder'
import { contact, whatsappHref, btn, Eyebrow } from '@/components/site-shell'
import { BookingForm, ServiceCards, StandardPage } from '@/components/page-shared'

export const Booking = () => { const { t } = useLanguage(); return <StandardPage eyebrow="Your next step" title="Let’s make space for good." image="/images/warm-lounge.jpg" imageAlt="Warm lounge with long windows and timber floors"><div className="mb-12 grid max-w-3xl gap-6 border-y border-[#2a1b1f]/15 py-6 text-sm leading-7 text-[#2a1b1f]/70 sm:grid-cols-3"><p>{t('A first conversation begins with your priorities, not a fixed set of rules.')}</p><p>{t('We consider orientation, daylight, circulation and how the space is actually used.')}</p><p>{t('You will receive a clear next step after we review your enquiry.')}</p></div><p className="mb-8 max-w-xl leading-8 text-[#2a1b1f]/70">{t('Tell us a little about your space and preferred timing. The team can then follow up with next steps. For direct enquiries, visit our')} <Link href="/contact" className="underline underline-offset-4">{t('contact page')}</Link>.</p><div className="mb-12 grid max-w-3xl gap-6 border-y border-[#2a1b1f]/15 py-6 sm:grid-cols-2"><div><p className="text-[11px] uppercase tracking-[.22em] text-[#74512f]">{t('Call or WhatsApp')}</p><a href={contact.tel} className="mt-2 block font-serif text-2xl hover:underline">{contact.phone}</a></div><div><p className="text-[11px] uppercase tracking-[.22em] text-[#74512f]">{t('Address')}</p><p className="mt-2 font-serif text-2xl">{t(contact.address)}</p></div></div><BookingForm /></StandardPage> }
export const Contact = () => {
  const { t, language } = useLanguage()
  const options: Array<[LucideIcon, string, string, string]> = []
  if (contact.phone && contact.tel) options.push([Phone, 'Call us', contact.phone, contact.tel])
  if (contact.email) options.push([Mail, 'Email us', contact.email, `mailto:${contact.email}`])
  if (contact.whatsapp) options.push([MessageCircle, 'WhatsApp', 'Message us directly', whatsappHref(language) ?? contact.whatsapp])
  return <StandardPage eyebrow="Get in touch" title="A thoughtful conversation starts here." image="/images/garden-house.jpg" imageAlt="Modern home glowing at dusk beneath a large tree"><div className="grid border-y border-[#2a1b1f]/15 md:grid-cols-3 md:divide-x md:divide-[#2a1b1f]/15">{options.map(([Icon,label,value,href]) => <a key={label} href={href} onClick={() => { if (label === 'WhatsApp') { track('WhatsApp Contact Clicked', { location: 'contact_page' }); trackGA4Event('whatsapp_click', { location: 'contact_page' }) } }} {...(href.startsWith('http') ? {target:'_blank',rel:'noopener noreferrer'} : {})} className="group flex min-h-[220px] flex-col justify-between border-b border-[#2a1b1f]/15 py-8 transition-colors last:border-b-0 hover:bg-[#ebe3d8] md:border-b-0 md:px-8"><Icon className="size-6 text-[#74512f]" /><div><p className="text-[11px] uppercase tracking-[.22em] text-[#2a1b1f]/70">{t(label)}</p><p className="mt-3 break-all font-serif text-3xl">{t(value)}</p></div></a>)}</div>{options.length === 0 && <div className="py-12"><p className="max-w-xl leading-7 text-[#2a1b1f]/70">{t('Share a few details about your space and we can arrange a conversation.')}</p><Link href="/bookings" className={`${btn} mt-6 bg-[#3b1220] text-[#f6f1ea] hover:bg-[#74512f]`}>{t('Request a consultation')} <ArrowUpRight className="size-4" /></Link></div>}<p className="mt-8 text-sm text-[#2a1b1f]/70"><MapPin className="mr-2 inline size-4 text-[#74512f]" />{t(contact.location)}</p></StandardPage>
}
export const Blogs = () => { const { t } = useLanguage(); return <StandardPage eyebrow="From the journal" title="A little perspective." image="/images/calm-corner.jpg" imageAlt="Quiet reading corner with a yellow armchair"><div className="grid gap-12 md:grid-cols-3 md:gap-8">{[['What Vastu is, and what it is not','A grounded introduction to Vastu, separating practical spatial guidance from superstition and rigid rules.','/images/living-greenery.jpg','Sunlit living room with indoor plants','5 min read'],['Choosing a home that feels right','A simple lens for noticing light, flow, orientation, and the everyday feeling of a potential home.','/images/villa-pool.jpg','White villa beside a turquoise pool','4 min read'],['The quiet power of a well-oriented workplace','How thoughtful planning can support focus, collaboration, and a calmer rhythm at work.','/images/workplace.jpg','Calm modern office corridor with natural tones','6 min read']].map(([title, preview, src, alt, length],i)=><article key={title} tabIndex={0} aria-describedby={`article-preview-${i}`} className="group relative cursor-help outline-none focus-visible:ring-2 focus-visible:ring-[#a57a4a] focus-visible:ring-offset-4"><div className="relative aspect-[4/5] overflow-hidden"><Image src={src} alt={t(alt)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]" /><div id={`article-preview-${i}`} role="tooltip" className="pointer-events-none absolute inset-0 z-20 flex items-end bg-[#3b1220]/90 p-7 text-sm leading-7 text-[#f6f1ea] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100"><div><span className="mb-3 block text-[11px] uppercase tracking-[.22em] text-[#d9bf9a]">{t('Article preview')}</span><p>{t(preview)}</p></div></div></div><p className="mt-5 text-[11px] uppercase tracking-[.22em] text-[#2a1b1f]/70">{t('Essay')} · {t(length)}</p><h2 className="mt-2 font-serif text-3xl leading-tight">{t(title)}</h2></article>)}</div></StandardPage> }

export const About = () => { const { t } = useLanguage(); return <StandardPage eyebrow="A different way to look at space" title="Ancient wisdom. Clear-eyed advice." image="/images/dubai-skyline.jpg" imageAlt="Dubai skyline at sunrise"><div className="grid gap-16 lg:grid-cols-[1.2fr_1fr] lg:items-center"><div className="max-w-2xl"><p className="font-serif text-3xl font-light leading-snug text-[#2a1b1f]/90">{t('Vastu is not about fear or rigid rules. It is a thoughtful way to understand how light, movement, orientation and intention shape the way a space feels.')}</p><p className="mt-8 leading-8 text-[#2a1b1f]/65">{t('Founded by Vedang Joshi, Kavach offers practical, considered recommendations for the way people live and work today. We begin by listening to what matters to you, then look at the space and its possibilities together.')}</p><Link href="/services" className="mt-8 inline-block text-[11px] uppercase tracking-[.22em] text-[#74512f] underline underline-offset-8">{t('Explore our services')}</Link></div><div className="relative mx-auto aspect-[.8] w-full max-w-[420px] overflow-hidden rounded-t-full"><Image src="/images/kavach-hero.png" alt={t('Sunlit interior with a rounded doorway and indoor greenery')} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /></div></div><FounderSection /></StandardPage> }
export const ServiceDetail = ({ title, eyebrow, image, imageAlt, intro, points }: { title:string; eyebrow:string; image:string; imageAlt:string; intro:string; points:string[] }) => { const { t } = useLanguage(); return <StandardPage eyebrow={eyebrow} title={title} image={image} imageAlt={imageAlt}><div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr]"><div><p className="max-w-2xl font-serif text-3xl font-light leading-snug text-[#2a1b1f]/90">{t(intro)}</p></div><ul className="divide-y divide-[#2a1b1f]/15 border-y border-[#2a1b1f]/15">{points.map((point,index)=><li key={point} className="flex gap-6 py-5"><span className="font-serif text-xl italic text-[#74512f]">0{index+1}</span><span className="leading-7 text-[#2a1b1f]/70">{t(point)}</span></li>)}</ul></div><div className="mt-20 border-t border-[#2a1b1f]/15 pt-8"><Link href="/services" className="text-[11px] uppercase tracking-[.22em] text-[#74512f] underline underline-offset-8">{t('Back to all services')}</Link></div></StandardPage> }
const serviceQuestions = [
  ['Do I need a floor plan?', 'A floor plan helps make a review specific to your space. The quick checker offers general pointers; a full consultation can consider your complete plan.'],
  ['Is Vastu religious or practical?', 'Kavach focuses on light, movement, orientation and how rooms are used. The approach is not about fear or rigid rules.'],
  ['Can you review a home before I rent or buy?', 'Residential advisory includes reviewing a floor plan and orientation before purchase or rental.'],
  ['What does a review cover?', 'We start with your priorities, consider orientation, daylight, circulation and room use, then discuss practical points to explore next.'],
] as const

export const Services = () => {
  const { t } = useLanguage()
  return <StandardPage eyebrow="How we help" title="Advice for the spaces that matter most." image="/images/bright-living.jpg" imageAlt="Bright open-plan living room with soft sofas">
    <ServiceCards />
    <section className="mt-16 border-t border-[#2a1b1f]/15 pt-12 sm:mt-20 sm:pt-16" aria-labelledby="uae-solutions-heading">
      <Eyebrow>Specialized Vastu & Astrology Solutions Across the UAE</Eyebrow>
      <h2 id="uae-solutions-heading" className="mt-5 max-w-5xl font-serif text-4xl font-light leading-tight sm:text-6xl">{t('Vastu Shastra Consultant & Vedic Astrologer in Dubai')}</h2>
      <p className="mt-5 max-w-4xl font-serif text-2xl font-light leading-snug text-[#2a1b1f]/85">{t('Where Ancient Astrology Wisdom Meets Modern Living')}</p>
      <p className="mt-6 max-w-4xl leading-8 text-[#2a1b1f]/70">{t('Kavach Consultancy, founded by Vedic consultant Vedang Joshi, delivers practical, non-demolition Vastu Shastra audits and in-depth Vedic Astrology (Kundli) readings across Dubai, Abu Dhabi, and Sharjah. We balance modern architectural spaces—including apartments, luxury villas, corporate offices, and warehouses—without structural changes.')}</p>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          ['Property Vastu Consultancy','Comprehensive directional analysis for high-rise apartments, penthouses, and private villas. We evaluate main entrances (Pad Vinyasa), master bedroom orientation, kitchen fire zones, and balcony energy flows.'],
          ['Business & Office Vastu','Optimising flow, safety & productivity for corporate and professional environments.'],
          ['Warehouse & Factory Vastu','Optimising flow, safety & productivity for industrial spaces while working with existing structures.'],
          ['Property Selection Guidance','Vastu-informed guidance to help evaluate a property before purchase, rental, or investment decisions.'],
          ['Kundli & Life Path Astrology','In-depth Vedic Astrology readings to provide perspective on personal growth, timing, and life decisions.'],
          ['Numerology for Name & Business','Numerology guidance for personal names and business naming considerations.'],
        ].map(([title, description], i) => <article key={title} className="group border-y border-[#2a1b1f]/15 px-2 py-7 transition-colors hover:bg-[#ebe3d8]">
          <span className="font-serif text-lg italic text-[#74512f]">0{i+1}</span>
          <h3 className="mt-3 font-serif text-3xl leading-tight">{t(title)}</h3>
          <p className="mt-3 text-sm leading-7 text-[#2a1b1f]/70">{t(description)}</p>
        </article>)}
      </div>
      <div className="mt-10 border-t border-[#2a1b1f]/15 pt-7">
        <p className="max-w-4xl leading-8 text-[#2a1b1f]/70">{t('Our approach combines ancient Vastu and astrology wisdom with the realities of modern living in the UAE, offering practical guidance without requiring structural changes.')}</p>
      </div>
      <div className="mt-12 grid gap-10 border-t border-[#2a1b1f]/15 pt-10 lg:grid-cols-[1fr_1.3fr] lg:items-start">
        <div>
          <Eyebrow>Property Vastu consultancy</Eyebrow>
          <h3 className="mt-4 font-serif text-3xl sm:text-4xl">{t('Comprehensive directional analysis for modern Dubai properties.')}</h3>
        </div>
        <p className="leading-8 text-[#2a1b1f]/70">{t('Comprehensive directional analysis for high-rise apartments, penthouses, and private villas. We evaluate main entrances (Pad Vinyasa), master bedroom orientation, kitchen fire zones, and balcony energy flows.')}</p>
      </div>
    </section>
    <section className="mt-16 border-t border-[#2a1b1f]/15 pt-12 sm:mt-20 sm:pt-16" aria-labelledby="service-faq-heading">
      <Eyebrow>Common questions</Eyebrow>
      <h2 id="service-faq-heading" className="mt-5 font-serif text-4xl font-light sm:text-5xl">{t('Before you book')}</h2>
      <div className="mt-8 divide-y divide-[#2a1b1f]/15 border-y border-[#2a1b1f]/15">
        {serviceQuestions.map(([question, answer]) => <details key={question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-xl marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#74512f] sm:text-2xl">
            {t(question)} <span aria-hidden="true" className="shrink-0 text-[#74512f] transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="max-w-3xl pt-4 text-sm leading-7 text-[#2a1b1f]/70">{t(answer)}</p>
        </details>)}
      </div>
    </section>
  </StandardPage>
}
