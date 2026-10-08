'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language'
import { Eyebrow, btn } from '@/components/site-shell'

// Edit the founder's details here only. Add verified credentials, profile URL and portrait when supplied.
export const founder = {
  name: 'Vedang Joshi',
  role: 'Founder & Principal Vastu Advisor',
  photo: '/images/founder.webp',
  bio: [
    'Kavach was founded by Vedang Joshi to make Vastu advisory practical, transparent and relevant to the way people live, work and invest today.',
    'The work connects traditional spatial principles with observable factors such as orientation, daylight, circulation, comfort and how a property will actually be used — without fear, rigid rules or superstition.',
    'Based in Dubai, Vedang advises homeowners, workplace teams and real-estate stakeholders from early planning through review and handover.',
  ],
  credentials: [] as string[],
  linkedin: 'https://ae.linkedin.com/in/vedang-joshi-624b171b',
}

export function FounderSection() {
  const { t } = useLanguage()
  return <section className="mt-28 grid gap-12 border-t border-[#2a1b1f]/15 pt-20 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden bg-[#ebe3d8]">
      {founder.photo ? <Image src={founder.photo} alt={t(`Portrait of ${founder.name}, ${founder.role}`)} fill sizes="(max-width: 1024px) 100vw, 420px" className="object-cover" /> : <span className="grid h-full place-items-center font-serif text-7xl font-light text-[#74512f]" aria-hidden="true">VJ</span>}
    </div>
    <div className="self-center">
      <Eyebrow>Meet the founder</Eyebrow>
      <h2 className="mt-6 font-serif text-5xl font-light leading-[1.05]">{founder.name}</h2>
      <p className="mt-3 text-[11px] uppercase tracking-[.26em] text-[#2a1b1f]/55">{t(founder.role)}</p>
      <div className="mt-8 max-w-xl space-y-5 leading-8 text-[#2a1b1f]/70">{founder.bio.map((paragraph) => <p key={paragraph}>{t(paragraph)}</p>)}</div>
      {founder.credentials.length > 0 && <ul className="mt-8 max-w-xl divide-y divide-[#2a1b1f]/10 border-y border-[#2a1b1f]/10 text-sm text-[#2a1b1f]/70">{founder.credentials.map((credential) => <li key={credential} className="py-3">{t(credential)}</li>)}</ul>}
      {founder.linkedin && <div className="mt-10 flex flex-wrap gap-3"><a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className={`${btn} border border-[#2a1b1f]/40 hover:bg-[#3b1220] hover:text-[#f6f1ea]`}>LinkedIn</a></div>}
    </div>
  </section>
}

export function FounderStrip() {
  const { t } = useLanguage()
  return <section className="bg-[#3b1220] px-5 py-24 text-[#f6f1ea] lg:px-10"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
    <div><Eyebrow light>Behind Kavach</Eyebrow><h2 className="mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl">{t('Every consultation is guided by Vedang Joshi.')}</h2></div>
    <div><p className="max-w-md leading-8 text-white/75">{t('Kavach starts by listening to what matters to you, then considers how light, movement, orientation and daily routines shape a space.')}</p><Link href="/about" className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[.22em] text-[#d9bf9a] hover:text-white">{t('Meet the founder')} <ArrowUpRight className="size-4" /></Link></div>
  </div></section>
}
