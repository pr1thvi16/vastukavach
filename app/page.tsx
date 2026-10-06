'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Check,
  Compass,
  Menu,
  MoveRight,
  Phone,
  Quote,
  Sparkles,
  X,
} from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Home harmony',
    description: 'Make confident decisions when buying, renting, or redesigning a home.',
    tone: 'bg-[#dfe9df]',
  },
  {
    number: '02',
    title: 'Workplace flow',
    description: 'Create offices and studios that support focus, culture, and better work.',
    tone: 'bg-[#f4dfd3]',
  },
  {
    number: '03',
    title: 'Developer advisory',
    description: 'Bring a considered spatial perspective to projects from concept to handover.',
    tone: 'bg-[#eee4cf]',
  },
]

const articles = [
  { category: 'Foundations', title: 'What Vastu is — and what it is not', date: '06.09.26', tone: 'bg-[#dfe9df]' },
  { category: 'For homeowners', title: 'Choosing a home that feels right before you move in', date: '28.08.26', tone: 'bg-[#f4dfd3]' },
  { category: 'For business', title: 'The quiet power of a well-oriented workplace', date: '14.08.26', tone: 'bg-[#eee4cf]' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#fcfaf6] text-[#263c35]">
      <header className="relative z-20 border-b border-[#263c35]/10 bg-[#fcfaf6]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
          <a href="#home" className="flex items-center gap-3" aria-label="Kavach Consultancy home">
            <span className="grid size-10 place-items-center rounded-full border border-[#c97862]/40 bg-[#f4dfd3] text-[#c97862]">
              <Compass aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </span>
            <span className="font-serif text-xl tracking-[-0.02em]">Kavach<span className="text-[#c97862]">.</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-[#263c35]/75 lg:flex" aria-label="Primary navigation">
            <a className="transition-colors hover:text-[#c97862]" href="#about">About</a>
            <a className="transition-colors hover:text-[#c97862]" href="#services">Services</a>
            <a className="transition-colors hover:text-[#c97862]" href="#journal">Journal</a>
            <a className="transition-colors hover:text-[#c97862]" href="#contact">Contact</a>
          </nav>
          <a href="#book" className="hidden rounded-full bg-[#263c35] px-5 py-3 text-sm font-medium text-[#fcfaf6] transition-transform hover:-translate-y-0.5 lg:block">Book a consultation <ArrowUpRight className="ml-2 inline size-4" /></a>
          <button className="rounded-full border border-[#263c35]/15 p-2 lg:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-5 border-t border-[#263c35]/10 px-5 py-6 text-sm lg:hidden"><a href="#about" onClick={() => setMenuOpen(false)}>About</a><a href="#services" onClick={() => setMenuOpen(false)}>Services</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a><a href="#book" onClick={() => setMenuOpen(false)} className="font-medium text-[#c97862]">Book a consultation <ArrowUpRight className="ml-1 inline size-4" /></a></nav>}
      </header>

      <section id="home" className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.03fr_.97fr] lg:items-center lg:px-10 lg:pb-28 lg:pt-24">
        <div className="relative z-10">
          <div className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#c97862]"><span className="h-px w-10 bg-[#c97862]" /> Spatial advisory, rooted in Vastu</div>
          <h1 className="max-w-3xl font-serif text-5xl leading-[.98] tracking-[-0.045em] text-[#263c35] sm:text-6xl lg:text-[6.7rem]">Spaces that<br /><em className="font-normal text-[#c97862]">feel like home.</em></h1>
          <p className="mt-8 max-w-md text-base leading-7 text-[#263c35]/70">Modern Vastu advisory for homes, workplaces and developments across Dubai — practical, personal, and grounded in how you want to live.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4"><a href="#book" className="rounded-full bg-[#c97862] px-6 py-3.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5">Start a conversation <MoveRight className="ml-2 inline size-4" /></a><a href="#services" className="rounded-full border border-[#263c35]/20 px-6 py-3.5 text-sm font-medium transition-colors hover:border-[#c97862] hover:text-[#c97862]">Explore services</a></div>
          <div className="mt-14 flex items-center gap-4 text-sm text-[#263c35]/65"><div className="flex -space-x-2"><span className="grid size-8 place-items-center rounded-full border-2 border-[#fcfaf6] bg-[#d6b49e] text-xs">V</span><span className="grid size-8 place-items-center rounded-full border-2 border-[#fcfaf6] bg-[#b6c9b8] text-xs">K</span><span className="grid size-8 place-items-center rounded-full border-2 border-[#fcfaf6] bg-[#e4c78e] text-xs">+</span></div><span>Trusted by thoughtful people<br />across the UAE</span></div>
        </div>
        <div className="relative mx-auto w-full max-w-[550px] lg:justify-self-end"><div className="absolute -right-5 -top-8 size-28 rounded-full border border-[#c97862]/30 lg:size-40" /><div className="absolute -bottom-8 -left-8 size-24 rounded-full bg-[#eee4cf] lg:size-36" /><div className="relative aspect-[.87] overflow-hidden rounded-[13rem] rounded-br-[3rem] rounded-tl-[3rem] bg-[#dfe9df]"><div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,.1),rgba(38,60,53,.25))]" /><div className="absolute inset-6 rounded-[11rem] rounded-br-[2rem] rounded-tl-[2rem] border border-white/30" /><div className="absolute bottom-0 left-0 right-0 h-2/3 bg-[url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85')] bg-cover bg-center mix-blend-multiply" /><div className="absolute right-7 top-8 grid size-20 place-items-center rounded-full bg-[#fcfaf6]/85 text-center text-[10px] uppercase tracking-[.18em] text-[#c97862] backdrop-blur-sm"><Compass className="mb-1 size-5" />Direction<br />matters</div></div><p className="mt-4 text-right font-serif text-sm italic text-[#263c35]/60">Dubai · UAE</p></div>
      </section>

      <section className="border-y border-[#263c35]/10 bg-[#f3eee6] px-5 py-5 lg:px-10"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-xs uppercase tracking-[.17em] text-[#263c35]/55 sm:justify-between"><span>Homes</span><span className="hidden text-[#c97862] sm:block">✦</span><span>Workplaces</span><span className="hidden text-[#c97862] sm:block">✦</span><span>Developments</span><span className="hidden text-[#c97862] sm:block">✦</span><span>Better decisions</span></div></section>

      <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[.85fr_1.15fr] lg:px-10 lg:py-32"><div><span className="text-xs font-medium uppercase tracking-[.2em] text-[#c97862]">A different way to look at space</span><h2 className="mt-5 max-w-md font-serif text-4xl leading-tight tracking-[-.035em] sm:text-5xl">Ancient wisdom.<br /><em className="font-normal text-[#c97862]">Clear-eyed advice.</em></h2></div><div className="max-w-xl lg:pt-10"><p className="text-xl leading-8 text-[#263c35]/80">Vastu is not about fear, superstition or rigid rules. It is a thoughtful way to understand how light, movement, orientation and intention shape the way a space feels.</p><p className="mt-6 leading-7 text-[#263c35]/65">At Kavach, Vedang brings this perspective into a modern conversation about property. Every recommendation is practical, considered, and tailored to the way you and your people actually live.</p><a href="#book" className="mt-8 inline-flex items-center border-b border-[#c97862] pb-1 text-sm font-medium text-[#c97862]">Meet your advisor <MoveRight className="ml-2 size-4" /></a></div></section>

      <section id="services" className="bg-[#dfe9df] px-5 py-24 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><span className="text-xs font-medium uppercase tracking-[.2em] text-[#c97862]">How we help</span><h2 className="mt-4 font-serif text-4xl tracking-[-.035em] sm:text-5xl">Advice for the spaces<br /><em className="font-normal text-[#c97862]">that matter most.</em></h2></div><a href="#book" className="text-sm font-medium text-[#263c35]/70 hover:text-[#c97862]">View all services <ArrowUpRight className="ml-1 inline size-4" /></a></div><div className="mt-14 grid gap-4 md:grid-cols-3">{services.map((service) => <article key={service.number} className={`group flex min-h-[290px] flex-col justify-between rounded-[2rem] p-7 transition-transform hover:-translate-y-1 ${service.tone}`}><div className="flex items-center justify-between text-sm text-[#263c35]/50"><span>{service.number}</span><ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" /></div><div><h3 className="font-serif text-3xl tracking-[-.02em]">{service.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-[#263c35]/70">{service.description}</p></div></article>)}</div></div></section>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[1fr_.9fr] lg:items-center lg:px-10 lg:py-32"><div className="relative overflow-hidden rounded-[2rem] bg-[#eee4cf] p-8 sm:p-12"><div className="absolute -right-10 -top-10 size-44 rounded-full border border-[#c97862]/25" /><div className="relative"><span className="text-xs uppercase tracking-[.2em] text-[#c97862]">The Kavach approach</span><h2 className="mt-5 max-w-md font-serif text-4xl leading-tight tracking-[-.035em]">A calmer way to make a big decision.</h2><div className="mt-10 flex flex-col gap-5">{['Listen deeply to what you need', 'Read the space with clarity', 'Recommend what is practical'].map((item, index) => <div key={item} className="flex items-center gap-4 border-t border-[#263c35]/15 pt-4 text-sm"><span className="grid size-7 place-items-center rounded-full bg-[#fcfaf6] text-xs text-[#c97862]">0{index + 1}</span>{item}<Check className="ml-auto size-4 text-[#c97862]" /></div>)}</div></div></div><div className="lg:pl-10"><Quote className="size-10 text-[#c97862]/60" strokeWidth={1} /><blockquote className="mt-6 font-serif text-3xl leading-tight tracking-[-.025em]">“The right space doesn’t just look good. It gives you a little more room to become who you are.”</blockquote><div className="mt-8 flex items-center gap-3"><div className="grid size-11 place-items-center rounded-full bg-[#c97862] font-serif text-lg text-white">V</div><div><p className="text-sm font-medium">Vedang Joshi</p><p className="text-xs text-[#263c35]/55">Founder & Spatial Advisor</p></div></div></div></section>

      <section id="journal" className="bg-[#f4dfd3] px-5 py-24 lg:px-10 lg:py-28"><div className="mx-auto max-w-7xl"><div className="flex items-end justify-between"><div><span className="text-xs font-medium uppercase tracking-[.2em] text-[#c97862]">From the journal</span><h2 className="mt-4 font-serif text-4xl tracking-[-.035em] sm:text-5xl">A little perspective.</h2></div><a href="#journal" className="hidden text-sm font-medium sm:block">Read all <ArrowUpRight className="ml-1 inline size-4" /></a></div><div className="mt-12 grid gap-4 md:grid-cols-3">{articles.map((article) => <article key={article.title} className="group"><div className={`relative aspect-[1.25] overflow-hidden rounded-[1.5rem] p-6 ${article.tone}`}><div className="absolute bottom-5 left-5 right-5 top-5 rounded-[1rem] border border-[#263c35]/10" /><div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#c97862]/50 text-[#c97862]"><Compass className="size-8" strokeWidth={1} /></div></div><p className="mt-5 text-xs uppercase tracking-[.15em] text-[#c97862]">{article.category} · {article.date}</p><h3 className="mt-2 max-w-sm font-serif text-2xl leading-tight transition-colors group-hover:text-[#c97862]">{article.title}</h3></article>)}</div></div></section>

      <section id="book" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-32"><div><span className="text-xs font-medium uppercase tracking-[.2em] text-[#c97862]">Your next step</span><h2 className="mt-5 font-serif text-5xl leading-[.98] tracking-[-.045em] sm:text-6xl">Let&apos;s make<br /><em className="font-normal text-[#c97862]">space for good.</em></h2><p className="mt-7 max-w-sm leading-7 text-[#263c35]/65">Tell us a little about your space. We&apos;ll get back to you within one working day.</p><div className="mt-10 flex flex-col gap-4 text-sm text-[#263c35]/70"><a href="tel:+971501234567" className="flex items-center gap-3 hover:text-[#c97862]"><Phone className="size-4 text-[#c97862]" /> +971 50 123 4567</a><a href="mailto:hello@kavachconsultancy.com" className="flex items-center gap-3 hover:text-[#c97862]"><Sparkles className="size-4 text-[#c97862]" /> hello@kavachconsultancy.com</a></div></div><div className="rounded-[2rem] bg-[#f3eee6] p-6 sm:p-10"><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }} className="flex flex-col gap-5">{submitted ? <div className="flex min-h-[310px] flex-col items-center justify-center text-center"><span className="grid size-14 place-items-center rounded-full bg-[#dfe9df] text-[#263c35]"><Check className="size-6" /></span><h3 className="mt-5 font-serif text-3xl">Thank you for reaching out.</h3><p className="mt-3 max-w-sm text-sm leading-6 text-[#263c35]/65">Your note is with us. Vedang will be in touch shortly.</p><button type="button" onClick={() => setSubmitted(false)} className="mt-6 text-sm font-medium text-[#c97862]">Send another enquiry</button></div> : <><div className="grid gap-5 sm:grid-cols-2"><label className="flex flex-col gap-2 text-sm">Your name<input required className="rounded-xl border border-[#263c35]/15 bg-[#fcfaf6] px-4 py-3 outline-none transition focus:border-[#c97862]" placeholder="Aarav Sharma" /></label><label className="flex flex-col gap-2 text-sm">Email address<input required type="email" className="rounded-xl border border-[#263c35]/15 bg-[#fcfaf6] px-4 py-3 outline-none transition focus:border-[#c97862]" placeholder="you@example.com" /></label></div><label className="flex flex-col gap-2 text-sm">I&apos;m enquiring about<select className="rounded-xl border border-[#263c35]/15 bg-[#fcfaf6] px-4 py-3 outline-none focus:border-[#c97862]"><option>My home</option><option>My workplace</option><option>A development project</option><option>Something else</option></select></label><label className="flex flex-col gap-2 text-sm">Tell us a little more<textarea required rows={4} className="resize-none rounded-xl border border-[#263c35]/15 bg-[#fcfaf6] px-4 py-3 outline-none transition focus:border-[#c97862]" placeholder="What are you planning?" /></label><button className="rounded-full bg-[#263c35] px-6 py-3.5 text-sm font-medium text-[#fcfaf6] transition-colors hover:bg-[#c97862]" type="submit">Request a consultation <MoveRight className="ml-2 inline size-4" /></button></>}</form></div></section>

      <footer id="contact" className="bg-[#263c35] px-5 py-12 text-[#fcfaf6] lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-full bg-[#f4dfd3] text-[#c97862]"><Compass className="size-5" /></span><span className="font-serif text-xl">Kavach<span className="text-[#c97862]">.</span></span></div><p className="mt-4 max-w-xs text-sm leading-6 text-white/55">Spatial advisory for more intentional living and working.</p></div><div className="flex gap-4"><a href="#contact" aria-label="Instagram" className="grid size-10 place-items-center rounded-full border border-white/15 hover:border-[#c97862]"><span className="text-xs font-medium">ig</span></a><a href="#contact" aria-label="LinkedIn" className="grid size-10 place-items-center rounded-full border border-white/15 hover:border-[#c97862]"><span className="text-xs font-medium">in</span></a></div></div><div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row sm:justify-between"><span>© 2026 Kavach Consultancy & Marketing LLC</span><span>Dubai · UAE</span></div></footer>
    </main>
  )
}
