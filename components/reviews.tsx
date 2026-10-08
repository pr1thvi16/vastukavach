'use client'

import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useLanguage } from '@/components/language'
import { Eyebrow } from '@/components/site-shell'

// The live Kavach site uses the Trustindex "Google reviews" widget.
// Set NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID to the id after "loader.js?" in that site's embed code
// (Trustindex dashboard > Get widget code) and the real, always-current widget renders here.
// Until then, the responsive carousel below is shown using the reviews copied from the site.
const widgetId = process.env.NEXT_PUBLIC_TRUSTINDEX_WIDGET_ID?.trim()

// `excerpt: true` means only the visible preview was available; paste the full text when you have it.
export const reviews = [
  { name: 'Zenab Khand', text: 'I had a great experience working with Kavach Consultancy. The 1-on-1 session was incredibly\u2026', excerpt: true },
  { name: 'Prisha Thakkar', text: 'I have had a great experience with Vedang. The consultation was insightful, detailed, and surprisingly\u2026', excerpt: true },
  { name: 'Deepak', text: 'Had a great experience overall. The guidance was clear, thoughtful, and very precise. Everything was\u2026', excerpt: true },
  { name: 'Janvi Joshi', text: 'Very authentic and explained me everything in depth helped me gain clarity\u2026', excerpt: true },
  { name: 'Vaishnavi', text: 'I had a really good experience consulting. The guidance was clear, practical, and easy to\u2026', excerpt: true },
  { name: 'Webface Design', text: 'Highly recommend Kavach Consultancy in Dubai for Vastu services they gave me proper guidance for my\u2026', excerpt: true },
  { name: 'Karthik T', text: 'Love the service, very humble people', excerpt: false },
] as const

const Stars = () => <div className="flex gap-0.5 text-[#f5b82e]" role="img" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-4 fill-current" aria-hidden="true" />)}</div>

function TrustindexWidget({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const host = ref.current
    if (!host) return
    const script = document.createElement('script')
    script.src = `https://cdn.trustindex.io/loader.js?${id}`
    script.defer = true
    script.async = true
    host.appendChild(script)
    return () => { host.innerHTML = '' }
  }, [id])
  return <div ref={ref} className="min-h-[280px] w-full" />
}

function ReviewsCarousel() {
  const { t } = useLanguage()
  const track = useRef<HTMLUListElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' })
  }
  return <div className="grid items-center gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
    <div className="text-center">
      <p className="font-sans text-2xl font-semibold uppercase tracking-wide">{t('Excellent')}</p>
      <div className="mt-3 flex justify-center"><Stars /></div>
      <p className="mt-3 text-sm text-[#2a1b1f]/75">{t('Based on')} <strong>7 {t('reviews')}</strong></p>
      <p className="mt-2 font-sans text-3xl font-medium tracking-tight" aria-label="Google"><span className="text-[#4285F4]">G</span><span className="text-[#EA4335]">o</span><span className="text-[#FBBC05]">o</span><span className="text-[#4285F4]">g</span><span className="text-[#34A853]">l</span><span className="text-[#EA4335]">e</span></p>
    </div>
    <div className="relative min-w-0">
      <button type="button" onClick={() => scroll(-1)} aria-label={t('Previous reviews')} className="absolute -left-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md transition hover:bg-[#ebe3d8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#74512f] max-sm:left-0"><ChevronLeft className="size-5" /></button>
      <ul ref={track} tabIndex={0} aria-label={t('Client reviews')} className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {reviews.map((review) => <li key={review.name} className="flex min-h-[230px] w-[84%] shrink-0 snap-start flex-col rounded-2xl bg-[#f3f1ee] p-6 sm:w-[calc(50%-.5rem)] lg:w-[calc(33.333%-.7rem)]">
          <div className="flex items-center gap-3"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#74512f] text-base font-medium text-white" aria-hidden="true">{review.name[0]}</span><p className="min-w-0 truncate font-medium">{review.name}</p></div>
          <div className="mt-4"><Stars /></div>
          <blockquote className="mt-4 text-[15px] leading-7 text-[#2a1b1f]/80">{review.text}</blockquote>
        </li>)}
      </ul>
      <button type="button" onClick={() => scroll(1)} aria-label={t('Next reviews')} className="absolute -right-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white shadow-md transition hover:bg-[#ebe3d8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#74512f] max-sm:right-0"><ChevronRight className="size-5" /></button>
    </div>
  </div>
}

export function ReviewsSection() {
  const { t } = useLanguage()
  return <section className="overflow-hidden bg-[#fbf9f5] px-5 py-16 sm:py-20 lg:px-10 lg:py-28" aria-labelledby="reviews-heading"><div className="mx-auto max-w-7xl">
    <Eyebrow>Client reviews</Eyebrow>
    <h2 id="reviews-heading" className="mt-6 max-w-4xl font-serif text-3xl font-light leading-tight sm:text-4xl lg:text-5xl">{t('What our customers in Dubai have to say about Kavach Consultancy')}</h2>
    <div className="mt-10 sm:mt-12">{widgetId ? <TrustindexWidget id={widgetId} /> : <ReviewsCarousel />}</div>
  </div></section>
}
