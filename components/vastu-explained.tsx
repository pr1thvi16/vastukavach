'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language'
import { Eyebrow, btn } from '@/components/site-shell'

const columns = [
  {
    label: 'Observable',
    title: 'What we can see and measure',
    points: [
      'Which way rooms face and how daylight moves through them across the day.',
      'Airflow, ventilation and how comfortable each room is in the Gulf climate.',
      'How people move between entrance, living areas, kitchen and bedrooms.',
      'What each room is used for, and whether the layout supports that use.',
    ],
  },
  {
    label: 'Traditional',
    title: 'What the tradition offers',
    points: [
      'Vastu is an old body of thought about orienting buildings and rooms to the sun, wind and daily routine.',
      'We use its principles as a structured way to ask good questions about a space.',
      'Where a traditional guideline has no practical benefit for you, we say so rather than insist on it.',
    ],
  },
  {
    label: 'Our limits',
    title: 'What we do not do',
    points: [
      'We do not promise wealth, health or luck from moving a door or a sofa.',
      'We do not use fear, and we do not recommend demolition or major structural work.',
      'We do not tell you that a home is “bad”. We describe trade-offs and suggest practical options.',
    ],
  },
] as const

export function VastuExplained({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage()
  return <section className={`${compact ? 'mt-24 border-t border-[#2a1b1f]/15 pt-20' : 'mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-10 lg:py-28'}`} aria-labelledby="vastu-explained-heading">
    <Eyebrow>Vastu, explained plainly</Eyebrow>
    <h2 id="vastu-explained-heading" className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl">{t('What Vastu advisory is, and what it is not.')}</h2>
    <p className="mt-6 max-w-2xl leading-8 text-[#2a1b1f]/70">{t('Think of it as a conversation about how a space works for the people in it. Some of what we discuss can be checked against daylight, layout and comfort. Some is tradition, and we describe it as tradition. None of it is a guarantee.')}</p>
    <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">{columns.map((column) => <article key={column.label} className="border-t border-[#2a1b1f]/15 pt-6">
      <p className="text-[11px] uppercase tracking-[.22em] text-[#74512f]">{t(column.label)}</p>
      <h3 className="mt-4 font-serif text-2xl leading-snug">{t(column.title)}</h3>
      <ul className="mt-5 space-y-4 text-sm leading-7 text-[#2a1b1f]/70">{column.points.map((point) => <li key={point}>{t(point)}</li>)}</ul>
    </article>)}</div>
    <p className="mt-12 max-w-2xl border-l-2 border-[#74512f] pl-4 text-sm leading-7 text-[#2a1b1f]/75">{t('A good review should leave you better informed, not more anxious. If a recommendation cannot be explained in plain language, we will not make it.')}</p>
  </section>
}

const reasons = [
  ['No demolition, no fear', 'Advice is built around the home or office as it stands: furniture, room use, lighting, colour and layout. We do not ask for structural changes.'],
  ['Principle-led, explained clearly', 'Every point comes with a reason you can follow and judge for yourself, so you stay in control of the decision.'],
  ['Made for UAE homes and workplaces', 'High-rise apartments, villas, offices and industrial units each have different constraints. We advise on the space you actually have.'],
] as const

export function WhyKavach() {
  const { t } = useLanguage()
  return <section className="bg-[#ebe3d8] px-5 py-16 sm:py-20 lg:px-10 lg:py-28" aria-labelledby="why-kavach-heading"><div className="mx-auto max-w-7xl">
    <Eyebrow>Why Kavach</Eyebrow>
    <h2 id="why-kavach-heading" className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl">{t('Clear advice you can act on, and question.')}</h2>
    <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">{reasons.map(([title, description], i) => <article key={title} className="border-t border-[#2a1b1f]/15 pt-6">
      <p className="font-serif text-xl italic text-[#74512f]">0{i + 1}</p>
      <h3 className="mt-4 font-serif text-2xl">{t(title)}</h3>
      <p className="mt-3 max-w-sm text-sm leading-7 text-[#2a1b1f]/70">{t(description)}</p>
    </article>)}</div>
    <Link href="/bookings" className={`${btn} mt-12 w-fit bg-[#3b1220] text-[#f6f1ea] hover:bg-[#74512f]`}>{t('Book a consultation')} <ArrowUpRight className="size-4" /></Link>
  </div></section>
}
