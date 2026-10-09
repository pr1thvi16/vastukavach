'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
import { track } from '@vercel/analytics'
import { trackGA4Event } from '@/lib/ga4'
import { useLanguage } from '@/components/language'
import { FounderStrip } from '@/components/founder'
import { gallery, services } from '@/components/site-data'
import { Eyebrow, Footer, Header, btn } from '@/components/site-shell'
import { VastuPropertyGallery } from '@/components/vastu-property-gallery'

const vastuMandalaImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NTHvuyi7cf6Zsv3JEhkdeNESGTBUCe.png'
const vastuEntranceImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6tvDH0V1VKEsULMCaI96GNLREnV2aC.png'
const vastuBlueprintImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Bs86HstGDdUzvd4oarMkZw8W2SHpem.png'
const vastuYantraImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FodFBegIvVsIgeMeOscCbgwkcG5CfX.png'

function CompassRose() {
  return <svg viewBox="0 0 120 120" fill="none" className="size-24 text-[#74512f] transition-transform duration-1000 ease-in-out hover:rotate-[360deg] motion-reduce:transition-none sm:size-32" aria-hidden="true">
    <circle cx="60" cy="60" r="43" stroke="currentColor" strokeOpacity=".4" />
    <circle cx="60" cy="60" r="4" fill="currentColor" />
    <path d="M60 9v18m0 66v18M9 60h18m66 0h18M60 30l8 22-8 8-8-8 8-22Zm0 60-8-22 8-8 8 8-8 22ZM30 60l22-8 8 8-8 8-22-8Zm60 0-22 8-8-8 8-8 22 8Z" stroke="currentColor" strokeLinejoin="round" />
    <text x="60" y="8" textAnchor="middle" className="fill-current font-sans text-[8px]">N</text>
    <text x="60" y="119" textAnchor="middle" className="fill-current font-sans text-[8px]">S</text>
    <text x="8" y="63" textAnchor="middle" className="fill-current font-sans text-[8px]">W</text>
    <text x="112" y="63" textAnchor="middle" className="fill-current font-sans text-[8px]">E</text>
  </svg>
}



const focusOptions = [
  { id: 'home', label: 'My home', title: 'Let’s make your space work for you.', body: 'Something feel off, or planning a change? We’ll start with the rooms and routines that matter most.', note: 'For your home, villa or rental.', href: '/vastu-checker?type=Home', cta: 'Get guidance for my home' },
  { id: 'workplace', label: 'My workplace', title: 'Let’s make work feel easier.', body: 'Tell us what’s getting in the way — focus, flow, or how your team uses the space. We’ll help you think through practical next steps.', note: 'For offices and professional spaces.', href: '/vastu-checker?type=Workplace', cta: 'Help with my workplace' },
  { id: 'property', label: 'Buying or renting', title: 'Not sure about a property? Let’s look closer.', body: 'Before you commit, let’s look at the plan and the questions you have — so you know what to consider next.', note: 'Before buying, renting or building.', href: '/services', cta: 'Help me assess a property' },
] as const

const journeyStages = [
  { id: 'exploring', label: 'Just looking', prefix: 'No rush. Let’s start with the basics.' },
  { id: 'planning', label: 'I have a plan', prefix: 'Great — let’s work with what you have.' },
  { id: 'ready', label: 'Ready to talk', prefix: 'Let’s focus on your next decision.' },
] as const

function InteractiveGuide() {
  const { t } = useLanguage()
  const [activeId, setActiveId] = useState<(typeof focusOptions)[number]['id']>('home')
  const [journeyStage, setJourneyStage] = useState<(typeof journeyStages)[number]['id']>('exploring')
  const [visitorName, setVisitorName] = useState('')

  useEffect(() => {
    try {
      const savedName = sessionStorage.getItem('kavach-visitor-name')
      if (savedName) setVisitorName(savedName)
    } catch {}
  }, [])

  useEffect(() => {
    try {
      const cleanName = visitorName.trim()
      if (cleanName) sessionStorage.setItem('kavach-visitor-name', cleanName)
      else sessionStorage.removeItem('kavach-visitor-name')
    } catch {}
  }, [visitorName])

  const active = focusOptions.find(option => option.id === activeId) ?? focusOptions[0]
  const stage = journeyStages.find(option => option.id === journeyStage) ?? journeyStages[0]

  function chooseFocus(id: typeof activeId) {
    setActiveId(id)
    track('Personal Path Selected', { focus: id })
    trackGA4Event('personal_path_selected', { focus: id })
  }

  return <section className="mx-auto max-w-7xl px-5 py-10 sm:py-16 lg:px-10" aria-labelledby="focus-guide-heading">
    <div className="overflow-hidden rounded-[2rem] border border-[#2a1b1f]/10 bg-[#f1eadf] shadow-sm">
      <div className="grid lg:grid-cols-[.9fr_1.1fr]">
        <div className="p-5 sm:p-10 lg:p-12">
          <div className="flex items-center justify-between gap-4">
            <Eyebrow>Vastu for real estate</Eyebrow>
            <Sparkles className="size-5 text-[#74512f]" aria-hidden="true" />
          </div>
          <h2 id="focus-guide-heading" className="mt-6 max-w-xl font-serif text-4xl font-light leading-tight sm:text-5xl">{t('What property are you considering?')}</h2>
          <p className="mt-5 max-w-lg leading-7 text-[#2a1b1f]/70">{t('Whether you are buying, renting, building or reviewing a space, start with the property and questions that matter to you.')}</p>

          <label className="mt-7 flex max-w-md flex-col gap-2 text-[11px] uppercase tracking-[.2em] text-[#2a1b1f]/70">
            {t('What can we call you? (optional)')}
            <input value={visitorName} onChange={event => setVisitorName(event.target.value.slice(0, 40))} placeholder={t('First name (optional)')} autoComplete="given-name" className="border-0 border-b border-[#2a1b1f]/20 bg-transparent px-0 py-3 text-base normal-case tracking-normal placeholder:text-[#2a1b1f]/35 focus:border-[#a57a4a] focus:outline-none" />
          </label>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[.2em] text-[#2a1b1f]/70">{t('What would you like help with today?')}</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={t('Choose a focus')}>
              {focusOptions.map((option, index) => <button key={option.id} type="button" aria-pressed={activeId === option.id} onClick={() => chooseFocus(option.id)} className={`rounded-full border px-4 py-2.5 text-left text-[11px] uppercase tracking-[.12em] transition-all duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74512f] ${activeId === option.id ? 'border-[#3b1220] bg-[#3b1220] text-[#f6f1ea] shadow-sm' : 'border-[#2a1b1f]/15 bg-white/40 hover:-translate-y-0.5 hover:bg-white'}`}>
                <span className="mr-2 font-serif text-base italic">{String(index + 1).padStart(2, '0')}</span>{t(option.label)}
              </button>)}
            </div>
          </div>

          <div className="mt-7">
            <p className="text-[11px] uppercase tracking-[.2em] text-[#2a1b1f]/70">{t('How far along are you?')}</p>
            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={t('Choose where you are in the journey')}>
              {journeyStages.map(option => <button key={option.id} type="button" aria-pressed={journeyStage === option.id} onClick={() => setJourneyStage(option.id)} className={`rounded-full border px-4 py-2.5 text-[11px] uppercase tracking-[.12em] transition-all duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74512f] ${journeyStage === option.id ? 'border-[#74512f] bg-[#74512f] text-white' : 'border-[#2a1b1f]/15 bg-transparent hover:bg-white'}`}>{t(option.label)}</button>)}
            </div>
            <p className="mt-4 max-w-lg text-sm leading-6 text-[#2a1b1f]/75">{t('No pressure. Start with one question — we’ll help you work out the next step.')}</p>
          </div>
        </div>

        <div className="relative min-h-[360px] sm:min-h-[430px] overflow-hidden bg-[#3b1220] p-5 sm:p-10 lg:p-12 text-[#f6f1ea]">
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border border-[#d9bf9a]/20" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 size-56 rounded-full border border-[#d9bf9a]/10" />
          <div className="relative flex h-full flex-col justify-between" aria-live="polite">
            <div>
              <p className="text-[11px] uppercase tracking-[.24em] text-[#d9bf9a]">{t('A helpful place to start')}</p>
              <p className="mt-5 text-sm text-white/65">{visitorName.trim() && <><bdi dir="auto">{visitorName.trim()}</bdi>، </>}{t(stage.prefix)}</p>
              <h3 className="mt-3 max-w-xl font-serif text-4xl font-light leading-tight sm:text-5xl">{t(active.title)}</h3>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/75">{t(active.body)}</p>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/60">{t('You don’t have to solve everything today. We’ll take it one step at a time.')}</p>
            </div>

            <div className="mt-10 border-t border-white/15 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-white/65">{t(active.note)}</p>
                <span className="text-[10px] uppercase tracking-[.18em] text-[#d9bf9a]">{t('Your path')} · {t(active.label)}</span>
              </div>
              <Link href={active.href} onClick={() => { track('Personal Path CTA Clicked', { focus: active.id, stage: journeyStage }); trackGA4Event('personal_path_cta_click', { focus: active.id, stage: journeyStage }) }} className={`${btn} mt-6 w-fit border border-[#d9bf9a]/50 text-[#f6f1ea] hover:bg-[#d9bf9a] hover:text-[#3b1220]`}>{t(active.cta)} <ArrowUpRight className="size-4" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export function HomePage() { const { t } = useLanguage(); return <><Header overlay /><main>
  <section className="relative h-[82svh] min-h-[540px] sm:h-[86svh] md:min-h-[560px] max-h-[900px] overflow-hidden bg-[#3b1220]"><img src={vastuEntranceImage} alt={t('Warmly lit architectural entrance with greenery and a central threshold')} className="image-drift absolute inset-0 size-full object-cover object-center" fetchPriority="high" /><div className="pointer-events-none absolute -right-[30%] top-[11%] block h-[58%] w-[88%] opacity-35 sm:-right-[8%] sm:top-[7%] sm:h-[82%] sm:w-[62%] sm:opacity-45 lg:-right-[2%] lg:top-[4%] lg:h-[88%] lg:w-[56%]"><img src={vastuYantraImage} alt="" aria-hidden="true" className="size-full object-cover object-center opacity-75 mix-blend-screen [filter:sepia(.35)_saturate(.55)] [mask-image:radial-gradient(ellipse_at_center,black_0%,black_42%,transparent_76%)]" /></div><div className="pointer-events-none absolute right-[8%] top-[17%] block size-24 rounded-full border border-[#d9bf9a]/20 opacity-45 sm:right-[16%] sm:top-[22%] sm:size-32 sm:border-[#d9bf9a]/25 sm:opacity-60 lg:right-[20%] lg:top-[18%] lg:size-44" aria-hidden="true"><div className="absolute inset-3 rounded-full border border-[#d9bf9a]/20" /><div className="absolute inset-1/4 rotate-45 border border-[#d9bf9a]/20" /></div><div className="absolute inset-0 bg-gradient-to-r from-[#1e0a11]/55 via-[#3b1220]/5 to-[#3b1220]/20" /><div className="absolute inset-0 bg-gradient-to-b from-[#3b1220]/55 via-[#3b1220]/10 to-[#1e0a11]/90" /><p aria-hidden className="pointer-events-none absolute inset-x-0 top-[14vh] hidden select-none text-center font-sans text-[21vw] font-medium leading-none tracking-[.02em] md:block lg:top-[12vh]"><span className="bg-gradient-to-b from-white via-white/85 to-white/0 bg-clip-text text-transparent">KAVACH</span></p><div className="absolute inset-x-0 bottom-0 z-10 mx-auto grid max-w-7xl gap-6 px-5 pb-8 text-white sm:gap-8 sm:pb-12 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:px-10 lg:pb-16"><div><p className="mb-4 text-[10px] font-medium uppercase tracking-[.24em] text-[#d9bf9a] sm:text-xs">Before You Own, Align.</p><h1 className="mt-0 max-w-[12ch] font-serif text-[clamp(2.6rem,10vw,3.4rem)] font-light leading-[.98] sm:max-w-3xl sm:text-7xl">{t('Choose with Vastu in mind')} <em className="text-[#d9bf9a]">{t('before you commit.')}</em></h1></div><div className="hero-copy border-l border-white/25 pl-6"><p className="text-sm leading-6 text-white/90">{t('A thoughtful Vastu reading for homes, workplaces and developments. Understand orientation, room relationships and the way energy moves through a space before you buy, rent, renovate or build across')} <strong className="font-semibold text-white">{t('Dubai')}</strong>, <strong className="font-semibold text-white">{t('Abu Dhabi')}</strong> {t('and')} <strong className="font-semibold text-white">{t('Sharjah')}</strong>.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/bookings" onClick={() => { track('Consultation CTA Clicked', { location: 'home_hero' }); trackGA4Event('consultation_cta_click', { location: 'home_hero' }) }} className={`${btn} bg-[#74512f] text-white hover:bg-[#8d6539]`}>{t('Start a conversation')} <ArrowUpRight className="size-4" /></Link><Link href="/services" className={`${btn} border border-white/50 hover:bg-white hover:text-[#2a1b1f]`}>{t('Our services')}</Link></div></div></div></section>
  <InteractiveGuide />
  <VastuPropertyGallery />
  <section className="mx-auto max-w-7xl px-5 py-10 sm:py-16 lg:px-10"><div className="border-y border-[#2a1b1f]/15 py-10 sm:py-14"><Eyebrow>Our mission</Eyebrow><h2 className="mt-6 max-w-5xl font-serif text-4xl font-light leading-tight sm:text-6xl">{t('My mission remains the same: To provide you with a Kavach — a shield of positive energy that protects your peace and promotes your prosperity.')}</h2></div></section>
  <section className="bg-[#e8dccb] px-5 py-14 sm:py-20 lg:px-10 lg:py-24"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-20"><div className="relative mx-auto w-full max-w-[560px] overflow-hidden border border-[#2a1b1f]/15 bg-[#d9bf9a] p-3 shadow-sm sm:p-5"><img src={vastuMandalaImage} alt={t('Hand-drawn Vastu Purusha mandala with directional grid and elemental symbols')} className="aspect-square size-full object-cover object-center mix-blend-multiply" loading="lazy" /><span className="absolute bottom-5 left-5 bg-[#f6f1ea]/90 px-3 py-2 text-[10px] uppercase tracking-[.2em] text-[#3b1220]">Vastu Purusha Mandala</span></div><div className="max-w-xl"><Eyebrow>Read the space</Eyebrow><h2 className="mt-5 max-w-xl font-serif text-4xl font-light leading-[1.08] sm:text-6xl">{t('Before the walls, understand the energy of the plan.')}</h2><p className="mt-6 max-w-lg leading-8 text-[#2a1b1f]/70">{t('Vastu begins with orientation, proportion and the relationship between a space and the people who use it. We bring that traditional lens into thoughtful, contemporary advice.')}</p><div className="mt-8 grid gap-4 sm:grid-cols-2"><div className="border-t border-[#2a1b1f]/20 pt-4"><p className="font-serif text-2xl">01</p><p className="mt-2 text-sm leading-6 text-[#2a1b1f]/70">{t('Direction, centre and elemental balance.')}</p></div><div className="border-t border-[#2a1b1f]/20 pt-4"><p className="font-serif text-2xl">02</p><p className="mt-2 text-sm leading-6 text-[#2a1b1f]/70">{t('A practical reading for modern living.')}</p></div></div></div></div></section>
  <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:py-20 md:grid-cols-[1fr_auto_1.45fr] md:items-center md:gap-12 lg:px-10 lg:py-24"><div><Eyebrow>{t('A quick first look')}</Eyebrow><h2 className="mt-5 font-serif text-4xl font-light sm:text-5xl">{t('A first look at your property through Vastu')}</h2><p className="mt-4 max-w-md leading-7 text-[#2a1b1f]/70">{t('Explore orientation, daylight, circulation and room placement through a practical Vastu lens. Choose your property type to get useful starting points — not a definitive property rating.')}</p><p className="mt-5 max-w-md border-l-2 border-[#74512f] pl-4 text-sm leading-6 text-[#2a1b1f]/75"><span className="mb-1 block text-[10px] uppercase tracking-[.18em] text-[#74512f]">{t('Example pointer')}</span>{t('Walk from the entrance to the main rooms. Check that everyday routes stay clear.')}</p></div><CompassRose /><div className="grid gap-3 sm:grid-cols-3">{([{label:'Home',value:'Home'},{label:'Workplace',value:'Workplace'},{label:'Development project',value:'Development'}] as const).map(({label,value},i)=><Link key={value} href={`/vastu-checker?type=${value}`} onClick={() => trackGA4Event('vastu_checker_start', { space_type: value, location: 'home_quick_checker' })} className="group flex min-h-[88px] items-center justify-between border-y border-[#2a1b1f]/20 px-4 py-4 transition-colors hover:bg-[#ebe3d8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#74512f]"><span><span className="block text-[10px] tracking-[.2em] text-[#74512f]">0{i+1}</span><span className="mt-1 block font-serif text-lg">{t(label)}</span></span><ArrowUpRight className="size-4 shrink-0 text-[#74512f] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>)}</div></section>
  <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:gap-16 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24 lg:px-10 lg:py-28"><div className="relative mx-auto w-full max-w-[440px]"><div className="relative aspect-[.78] overflow-hidden rounded-t-full"><img src={vastuBlueprintImage} alt={t('Architectural floor plan and elevation drawing for a grand residence')} className="size-full object-cover object-center" loading="lazy" /></div><p className="mt-4 text-[11px] uppercase tracking-[.22em] text-[#2a1b1f]/70">{t('A considered approach to every space')}</p></div><div><Eyebrow>Our approach</Eyebrow><h2 className="mt-6 font-serif text-5xl font-light leading-[1.05] sm:text-6xl">{t('Light, flow and orientation, read with care.')}</h2><p className="mt-8 max-w-md leading-8 text-[#2a1b1f]/70">{t('Founded by Vedang Joshi and rooted in more than 40 years of familial astrological lineage, Kavach looks at how a space is lived in: where the morning light lands, how people move, and what each room is asked to do. Recommendations are practical, considered, and shaped around your priorities.')}</p><Link href="/about" className="mt-8 inline-block text-[11px] uppercase tracking-[.22em] text-[#74512f] underline underline-offset-8">{t('Meet your advisor')}</Link></div></section>
  <section className="mx-auto max-w-7xl px-5 py-10 sm:py-16 lg:px-10"><div className="grid gap-8 border-y border-[#2a1b1f]/15 py-12 md:grid-cols-[1fr_1.3fr] md:items-center"><div><Eyebrow>Consulting Kavach Secures Your Future</Eyebrow><h2 className="mt-6 font-serif text-4xl font-light sm:text-5xl">{t('Consulting Kavach Secures Your Future')}</h2></div><p className="max-w-2xl leading-8 text-[#2a1b1f]/70">{t('Kavach Consultancy delivers reliable, forward-thinking solutions that protect your business interests and support long-term growth.')}</p></div></section>
  <section className="bg-[#ebe3d8] px-5 py-10 sm:py-16 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 border-b border-[#2a1b1f]/15 pb-10 md:flex-row md:items-end"><div><Eyebrow>How we help</Eyebrow><h2 className="mt-6 font-serif text-5xl font-light sm:text-6xl">{t('Advice for the spaces that matter.')}</h2></div><Link href="/services" className="text-[11px] uppercase tracking-[.22em] text-[#74512f] underline underline-offset-8">{t('All services')}</Link></div><div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-3 md:gap-8">{services.map(([title, description, src, alt], i) => <Link href={`/services#${title.toLowerCase().replaceAll(' ','-')}`} key={title} className="group block rounded-sm transition-transform duration-300 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#74512f] hover:-translate-y-1"><div className="relative aspect-[4/5] overflow-hidden"><Image src={src} alt={t(alt)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]" /></div><div className="mt-6 flex gap-5"><span className="font-serif text-lg italic text-[#74512f]">0{i+1}</span><div><h3 className="font-serif text-3xl">{t(title)}</h3><p className="mt-2 text-sm leading-6 text-[#2a1b1f]/65">{t(description)}</p></div></div></Link>)}</div></div></section>
  <section className="px-5 py-10 sm:py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl"><Eyebrow>How a review works</Eyebrow><h2 className="mt-6 max-w-3xl font-serif text-4xl font-light leading-tight sm:text-5xl">{t('From first look to a clearer next step.')}</h2><div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-10">{[['01','Tell us what matters','Share your plan, priorities and where you are in the process.'],['02','Review how the space works','Consider orientation, daylight, circulation and the way each room will be used.'],['03','Leave with practical next steps','Discuss practical points to explore before you buy, renovate or build.']].map(([number,title,description])=><article key={number} className="border-t border-[#2a1b1f]/15 pt-6"><p className="font-serif text-xl italic text-[#74512f]">{number}</p><h3 className="mt-4 font-serif text-2xl">{t(title)}</h3><p className="mt-3 max-w-sm text-sm leading-7 text-[#2a1b1f]/70">{t(description)}</p></article>)}</div><div className="mt-10 flex flex-col gap-4 border-t border-[#2a1b1f]/15 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-md text-sm leading-6 text-[#2a1b1f]/70">{t('Want to review a specific plan?')}</p><Link href="/bookings" onClick={() => { track('Consultation CTA Clicked', { location: 'home_review_process' }); trackGA4Event('consultation_cta_click', { location: 'home_review_process' }) }} className={`${btn} w-fit bg-[#3b1220] text-[#f6f1ea] hover:bg-[#74512f]`}>{t('Book a consultation')} <ArrowUpRight className="size-4" /></Link></div></div></section>
  
  <FounderStrip />
  <section className="bg-[#fbf8f3] px-5 py-10 sm:py-16 lg:px-10 lg:py-24" aria-labelledby="customer-reviews-heading">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-4xl text-center">
        <Eyebrow>Google customer reviews</Eyebrow>
        <h2 id="customer-reviews-heading" className="mt-5 font-serif text-4xl font-light leading-tight text-[#3b1220] sm:text-6xl">{t('What Our Customers in Dubai Have To Say About Kavach Consultancy?')}</h2>
      </div>
      <div className="mt-8 sm:mt-12 grid gap-4 sm:gap-5 lg:grid-cols-[.75fr_2fr]">
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[#2a1b1f]/10 bg-white p-8 text-center">
          <p className="font-semibold">{t('EXCELLENT')}</p>
          <p aria-label="5 out of 5 stars" className="mt-2 text-3xl tracking-wide text-[#f6b400]">★★★★★</p>
          <p className="mt-2 text-sm">{t('Based on 7 reviews')}</p>
          <p className="mt-2 font-bold text-2xl tracking-tight text-[#4285f4]">Google</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            ['Zenab Khand','I had a great experience working with Kavach Consultancy. The 1-on-1 session was incredibly…'],
            ['Prisha Thakkar','I have had a great experience with Vedang. The consultation was insightful, detailed, and surprisingly…'],
            ['Deepak','Had a great experience overall. The guidance was clear, thoughtful, and very precise. Everything was…'],
            ['Janvi Joshi','Very authentic and explained me everything in depth helped me gain clarity towards the way I se…'],
            ['Vaishnavi','I had a really good experience consulting. The guidance was clear, practical, and easy to…'],
            ['Webface Design…','Highly recommend Kavach Consultancy in Dubai for Vastu services they gave me proper guidance for my…'],
            ['KARTHIK T','Love the service, very humble people'],
          ].map(([name, review]) => <article key={name} className="group rounded-2xl border border-[#2a1b1f]/10 bg-white p-5 shadow-sm transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between gap-3"><h3 className="font-semibold">{t(name)}</h3><span className="text-lg font-bold text-[#4285f4]" aria-label="Google review">G</span></div>
            <p className="mt-2 text-lg tracking-wide text-[#f6b400]" aria-label="5 out of 5 stars">★★★★★</p>
            <p className="mt-3 text-sm leading-6 text-[#292929]">{t(review)}</p>
            <p className="mt-3 text-xs text-[#666]">{t('Google review · 7–9 months ago')}</p>
          </article>)}
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-[#666]">{t('Review excerpts are shown as visible in the supplied screenshots.')}</p>
    </div>
  </section>
  <section className="bg-[#ebe3d8] px-5 py-10 sm:py-16 lg:px-10 lg:py-24"><div className="mx-auto max-w-7xl"><Eyebrow>Why Choose Kavach Consultancy?</Eyebrow><h2 className="mt-6 max-w-4xl font-serif text-4xl font-light sm:text-5xl">{t('Why Choose Kavach Consultancy?')}</h2><div className="mt-10 grid gap-8 md:grid-cols-3"><article className="group border-t border-[#2a1b1f]/15 pt-6 transition-transform duration-300 motion-reduce:transition-none hover:-translate-y-1"><p className="font-serif text-2xl transition-colors duration-300 group-hover:text-[#74512f]">{t('40+ Years of Vastu Knowledge')}</p></article><article className="border-t border-[#2a1b1f]/15 pt-6"><p className="font-serif text-2xl">{t('Principle-Driven Vastu Consultancy')}</p></article><article className="border-t border-[#2a1b1f]/15 pt-6"><p className="font-serif text-2xl">{t('Sacred Space Consultations Aligned with UAE Homes & Lifestyles')}</p></article></div></div></section>
  <section className="mx-auto max-w-7xl px-5 py-8 sm:py-12 lg:px-10 lg:py-20"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><Eyebrow>Illustrative spaces</Eyebrow><h2 className="mt-6 font-serif text-5xl font-light sm:text-6xl">{t('Calm, considered, lived in.')}</h2></div><Link href="/blogs" className="text-[11px] uppercase tracking-[.22em] text-[#74512f] underline underline-offset-8">{t('Read the journal')}</Link></div><div className="mt-6 sm:mt-8 grid auto-rows-[220px] sm:auto-rows-[260px] gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-7 md:grid-cols-4">{gallery.map(([src, alt, caption, place, span]) => <figure key={src} className={`group flex flex-col ${span}`}><div className="relative min-h-0 flex-1 overflow-hidden"><Image src={src} alt={t(alt)} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]" /></div><figcaption className="mt-3 flex justify-between gap-4 text-xs"><span className="font-serif text-base italic">{t(caption)}</span><span className="uppercase tracking-[.18em] text-[#2a1b1f]/70">{t(place)}</span></figcaption></figure>)}</div></section>
  <section className="mx-auto max-w-7xl px-5 py-10 sm:py-16 lg:px-10"><div className="border-y border-[#2a1b1f]/15 py-12 text-center sm:py-16"><Eyebrow>Begin Your Journey of Balance At Kavach</Eyebrow><h2 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-light sm:text-6xl">{t('Let ancient wisdom bring clarity to your modern life. Speak with our expert now!')}</h2><Link href="/bookings" className={btn + " mt-8 bg-[#3b1220] text-[#f6f1ea] hover:bg-[#74512f]"}>{t('Book yours today!')} <ArrowUpRight className="size-4" /></Link></div></section>
  <section className="relative h-[68svh] min-h-[420px] overflow-hidden lg:h-[80svh] lg:min-h-[480px]"><Image src="/images/dubai-skyline.jpg" alt={t('Dubai skyline at sunrise')} fill sizes="100vw" className="image-drift object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#1e0a11]/90 via-[#1e0a11]/25 to-transparent" /><div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-14 text-white lg:px-10"><Eyebrow light>Based in Dubai</Eyebrow><h2 className="mt-6 max-w-3xl font-serif text-5xl font-light leading-[1.02] sm:text-7xl">{t('Ready when you are. Let’s begin.')}</h2><div className="mt-9 flex flex-wrap gap-3"><Link href="/contact" className={`${btn} border border-white/50 hover:bg-white hover:text-[#2a1b1f]`}>{t('Contact us')}</Link></div></div></section>
</main><Footer /></> }

