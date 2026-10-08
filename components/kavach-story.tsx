'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language'
import { Eyebrow, btn } from '@/components/site-shell'

const principles = [
  ['Balance over chaos', 'Vastu is a way of restoring balance in space, direction and flow. It is not a source of fear or superstition.'],
  ['Guidance, not destiny', 'Astrology is a tool for awareness and timing. It does not forecast outcomes that cannot be changed.'],
  ['Ethical remedies', 'We suggest simple, logical, non-invasive remedies that fit modern life, with awareness in place of anxiety.'],
  ['Built for the UAE', 'Consultations are adapted to Dubai and UAE buildings, from apartments to offices, and to the region’s many cultures.'],
] as const

const adaptations = [
  ['Dubai architecture', 'Aligning the flow of energy with modern layouts such as high-rises, penthouses and villas, without structural changes.'],
  ['Apartment solutions', 'Practical guidance for rented and compact homes, with no demolition and no fear-based remedies.'],
  ['Business & career guidance', 'Timing advice for entrepreneurs and professionals in Dubai, Abu Dhabi and across the UAE.'],
] as const

const philosophy = [
  ['Spirituality without fear', 'Our mission is to bring these traditions into modern life through rational, ethical guidance.'],
  ['Ancient wisdom, modern intelligence', 'Our vision is to connect long-standing knowledge with contemporary architecture, technology and lifestyles.'],
  ['Trust built on integrity', 'We aim to be a consultancy people in the UAE can trust, guided by respect, discretion and responsibility, and focused on protecting peace over profit.'],
] as const

function Grid({ items, columns = 3 }: { items: readonly (readonly [string, string])[]; columns?: 3 | 4 }) {
  const { t } = useLanguage()
  return <div className={`mt-12 grid gap-10 md:gap-8 ${columns === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>{items.map(([title, description], i) => <article key={title} className="border-t border-[#2a1b1f]/15 pt-6">
    <p className="font-serif text-xl italic text-[#74512f]">0{i + 1}</p>
    <h3 className="mt-4 font-serif text-2xl leading-snug">{t(title)}</h3>
    <p className="mt-3 max-w-sm text-sm leading-7 text-[#2a1b1f]/70">{t(description)}</p>
  </article>)}</div>
}

// "Kavach" means protection: the name is the brand idea, so it gets its own band on the home page.
export function KavachMeaning() {
  const { t } = useLanguage()
  return <section className="bg-[#3b1220] px-5 py-20 text-[#f6f1ea] lg:px-10 lg:py-28" aria-labelledby="kavach-meaning-heading"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
    <div><Eyebrow light>Why the name Kavach</Eyebrow><h2 id="kavach-meaning-heading" className="mt-6 font-serif text-4xl font-light leading-tight sm:text-6xl">{t('Kavach means protection.')}</h2></div>
    <div><p className="max-w-lg leading-8 text-white/75">{t('For us it is a shield against imbalance, not against fear. We help homes and businesses line up their surroundings with logic, ethics and awareness, so that peace of mind comes first.')}</p><Link href="/about" className={`${btn} mt-8 border border-white/50 hover:bg-white hover:text-[#2a1b1f]`}>{t('Our story')} <ArrowUpRight className="size-4" /></Link></div>
  </div></section>
}

export function UaeAdaptations() {
  const { t } = useLanguage()
  return <section className="mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-10 lg:py-24" aria-labelledby="uae-heading">
    <Eyebrow>Rooted in wisdom</Eyebrow>
    <h2 id="uae-heading" className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl">{t('Traditional guidance, adapted for life in the UAE.')}</h2>
    <Grid items={adaptations} />
  </section>
}

export function KavachStory() {
  const { t } = useLanguage()
  return <>
    <section className="mt-24 border-t border-[#2a1b1f]/15 pt-20" aria-labelledby="principles-heading">
      <Eyebrow>What we stand for</Eyebrow>
      <h2 id="principles-heading" className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl">{t('Four principles behind every consultation.')}</h2>
      <Grid items={principles} columns={4} />
    </section>
    <section className="mt-24 grid gap-10 border-t border-[#2a1b1f]/15 pt-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-20" aria-labelledby="story-heading">
      <div><Eyebrow>Our story</Eyebrow><h2 id="story-heading" className="mt-6 font-serif text-4xl font-light leading-tight sm:text-5xl">{t('From a family tradition in India to Dubai.')}</h2></div>
      <div className="max-w-xl space-y-5 leading-8 text-[#2a1b1f]/70">
        <p>{t('Kavach grew out of a family tradition in India, where Vastu and astrology were part of everyday life. The knowledge was handed down through generations and refined on real cases over more than forty years.')}</p>
        <p>{t('As Dubai and the wider UAE became centres of modern architecture and multicultural living, we saw a need for this wisdom to be offered without superstition. Kavach Consultancy was founded in Dubai to do exactly that.')}</p>
      </div>
    </section>
    <section className="mt-24 border-t border-[#2a1b1f]/15 pt-20" aria-labelledby="philosophy-heading">
      <Eyebrow>Kavach philosophy</Eyebrow>
      <h2 id="philosophy-heading" className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl">{t('Mission, vision and values.')}</h2>
      <Grid items={philosophy} />
      <div className="mt-14"><Link href="/bookings" className={`${btn} bg-[#3b1220] text-[#f6f1ea] hover:bg-[#74512f]`}>{t('Book a consultation')} <ArrowUpRight className="size-4" /></Link></div>
    </section>
  </>
}
