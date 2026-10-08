'use client'

import Link from 'next/link'
import { ArrowUpRight, MapPin } from 'lucide-react'
import { useLanguage } from '@/components/language'
import { Eyebrow } from '@/components/site-shell'

const extraServices = [
  ['Warehouse & industrial', 'Layout review for warehouses, factories and logistics sites: loading and movement routes, storage zones, staff areas, light and ventilation.'],
  ['Hotel & hospitality', 'Guest arrival, lobby flow, room orientation and back-of-house routes for hotels, serviced apartments and restaurants.'],
  ['Site & plot selection', 'A look at orientation, access, surroundings and sun and wind exposure before you commit to a plot or a development site.'],
  ['Property selection assistance', 'Comparing shortlisted homes or offices on daylight, layout and how they would suit the way you live or work.'],
] as const

export function ExtraServices() {
  const { t } = useLanguage()
  return <section className="mt-16 border-t border-[#2a1b1f]/15 pt-12 sm:mt-20 sm:pt-16" aria-labelledby="extra-services-heading">
    <Eyebrow>Also available</Eyebrow>
    <h2 id="extra-services-heading" className="mt-5 font-serif text-4xl font-light sm:text-5xl">{t('More ways we can help')}</h2>
    <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2">{extraServices.map(([title, description], i) => <article key={title} className="border-t border-[#2a1b1f]/15 pt-6">
      <p className="font-serif text-lg italic text-[#74512f]">0{i + 1}</p>
      <h3 className="mt-3 font-serif text-2xl">{t(title)}</h3>
      <p className="mt-3 max-w-md text-sm leading-7 text-[#2a1b1f]/70">{t(description)}</p>
      <Link href="/bookings" className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[.22em] text-[#74512f] underline underline-offset-8">{t('Enquire about this')} <ArrowUpRight className="size-3.5" /></Link>
    </article>)}</div>
  </section>
}

const areas = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Across the UAE'] as const

export function ServiceAreas({ className = '' }: { className?: string }) {
  const { t } = useLanguage()
  return <section className={className} aria-labelledby="service-areas-heading"><div className="mx-auto flex max-w-7xl flex-col gap-6 border-y border-[#2a1b1f]/15 px-5 py-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
    <div className="flex items-start gap-4"><MapPin className="mt-1 size-5 shrink-0 text-[#74512f]" aria-hidden="true" /><div><h2 id="service-areas-heading" className="font-serif text-2xl">{t('Where we work')}</h2><p className="mt-1 text-sm leading-6 text-[#2a1b1f]/70">{t('On-site visits and online consultations for homes and businesses across the UAE.')}</p></div></div>
    <ul className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] uppercase tracking-[.22em] text-[#2a1b1f]/75">{areas.map((area) => <li key={area}>{t(area)}</li>)}</ul>
  </div></section>
}
