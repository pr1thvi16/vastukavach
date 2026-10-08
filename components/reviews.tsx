'use client'

import { Star } from 'lucide-react'
import { useLanguage } from '@/components/language'
import { Eyebrow } from '@/components/site-shell'

// Google reviews, copied from kavachconsultancy.com (rated 5 stars, "Based on 7 reviews").
// Review text is user-written, so it is shown as-is and is not translated.
// `excerpt: true` means only the visible preview was available; paste the full text over it when you have it.
export const reviews = [
  { name: 'Zenab Khand', text: 'I had a great experience working with Kavach Consultancy. The 1-on-1 session was incredibly\u2026', excerpt: true },
  { name: 'Prisha Thakkar', text: 'I have had a great experience with Vedang. The consultation was insightful, detailed, and surprisingly\u2026', excerpt: true },
  { name: 'Deepak', text: 'Had a great experience overall. The guidance was clear, thoughtful, and very precise. Everything was\u2026', excerpt: true },
  { name: 'Janvi Joshi', text: 'Very authentic and explained me everything in depth helped me gain clarity\u2026', excerpt: true },
  { name: 'Vaishnavi', text: 'I had a really good experience consulting. The guidance was clear, practical, and easy to\u2026', excerpt: true },
  { name: 'Webface Design', text: 'Highly recommend Kavach Consultancy in Dubai for Vastu services they gave me proper guidance for my\u2026', excerpt: true },
  { name: 'Karthik T', text: 'Love the service, very humble people', excerpt: false },
] as const

const Stars = () => <div className="flex gap-0.5 text-[#c9a227]" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-current" aria-hidden="true" />)}</div>

export function ReviewsSection() {
  const { t } = useLanguage()
  return <section className="bg-[#fbf9f5] px-5 py-16 sm:py-20 lg:px-10 lg:py-28" aria-labelledby="reviews-heading"><div className="mx-auto max-w-7xl">
    <Eyebrow>Client reviews</Eyebrow>
    <h2 id="reviews-heading" className="mt-6 max-w-4xl font-serif text-4xl font-light leading-tight sm:text-5xl">{t('What our customers in Dubai have to say about Kavach Consultancy')}</h2>
    <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
      <div className="text-center lg:self-center">
        <p className="font-sans text-2xl font-semibold uppercase tracking-wide">{t('Excellent')}</p>
        <div className="mt-3 flex justify-center"><Stars /></div>
        <p className="mt-3 text-sm text-[#2a1b1f]/75">{t('Based on')} <strong>7 {t('reviews')}</strong></p>
        <p className="mt-2 font-sans text-2xl font-medium tracking-tight" aria-label="Google"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{reviews.map((review) => <li key={review.name} className="flex flex-col rounded-2xl bg-[#f3f1ee] p-6">
        <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#74512f] text-sm font-medium text-white" aria-hidden="true">{review.name[0]}</span><p className="font-medium">{review.name}</p></div>
        <div className="mt-4"><Stars /></div>
        <blockquote className="mt-4 text-sm leading-7 text-[#2a1b1f]/80">{review.text}</blockquote>
      </li>)}</ul>
    </div>
    <p className="mt-8 text-xs text-[#2a1b1f]/60">{t('Verified Google reviews')}</p>
  </div></section>
}
