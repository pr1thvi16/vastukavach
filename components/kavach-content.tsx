'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language'
import { Eyebrow, btn } from '@/components/site-shell'

// Content copied from kavachconsultancy.com.
export const mission = 'My mission remains the same: to provide you with a Kavach, a shield of positive energy that protects your peace and promotes your prosperity.'

export const whyChoose = [
  '40+ years of inherited Vastu & Astrology knowledge',
  'Vedic principle-driven and philosophical Vastu consultancy',
  'Sacred space consultations aligned with UAE homes & lifestyles',
]

export const extraServices = [
  ['Property Vastu Consultancy', 'For apartments, villas & rental homes in the UAE'],
  ['Business & Office Vastu', 'For growth, stability & team harmony'],
  ['Warehouse & Factory Vastu', 'Optimising flow, safety & productivity'],
  ['Property Selection Guidance', 'Choosing a space before you buy or rent'],
  ['Kundli & Life Path Astrology', 'Career, marriage, timing & decisions'],
  ['Numerology for Name & Business', 'Names and numbers aligned with your goals'],
] as const

export function MissionSection() {
  const { t } = useLanguage()
  return <section className="bg-[#f6efdf] px-5 py-16 text-center sm:py-20 lg:px-10"><div className="mx-auto max-w-4xl">
    <Eyebrow>Where ancient wisdom meets modern living</Eyebrow>
    <p className="mt-6 font-serif text-3xl font-light leading-snug sm:text-4xl">{t(mission)}</p>
    <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-[#2a1b1f]/70">{t('Practical, non-demolition Vastu Shastra audits and in-depth Vedic Astrology (Kundli) readings across Dubai, Abu Dhabi and Sharjah, for apartments, luxury villas, corporate offices and warehouses, without structural changes.')}</p>
  </div></section>
}

export function WhyChooseSection() {
  const { t } = useLanguage()
  return <section className="px-5 py-16 sm:py-20 lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl">
    <Eyebrow>Why choose Kavach Consultancy?</Eyebrow>
    <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">{whyChoose.map((item, i) => <article key={item} className="border-t border-[#2a1b1f]/15 pt-6"><p className="font-serif text-xl italic text-[#74512f]">0{i + 1}</p><h3 className="mt-4 font-serif text-2xl leading-snug">{t(item)}</h3></article>)}</div>
    <div className="mt-14 flex flex-col gap-5 border-t border-[#2a1b1f]/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-2xl font-serif text-2xl font-light leading-snug">{t('Privately serving homes and businesses across Dubai, Abu Dhabi, Sharjah and the UAE through on-site and online consultations.')}</p>
      <Link href="/bookings" className={`${btn} w-fit shrink-0 bg-[#3b1220] text-[#f6f1ea] hover:bg-[#74512f]`}>{t('Book Kavach Consultation')} <ArrowUpRight className="size-4" /></Link>
    </div>
  </div></section>
}

export function ExtraServices() {
  const { t } = useLanguage()
  return <section className="mt-16 border-t border-[#2a1b1f]/15 pt-12 sm:mt-20 sm:pt-16"><Eyebrow>Specialised solutions across the UAE</Eyebrow>
    <h2 className="mt-5 font-serif text-4xl font-light sm:text-5xl">{t('Vastu & Astrology solutions')}</h2>
    <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">{extraServices.map(([title, desc]) => <li key={title} className="border-t border-[#2a1b1f]/15 pt-4"><h3 className="font-serif text-2xl">{t(title)}</h3><p className="mt-1 text-sm leading-6 text-[#2a1b1f]/70">{t(desc)}</p></li>)}</ul>
  </section>
}
