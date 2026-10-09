"use client"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Eyebrow, btn } from '@/components/site-shell'
import { useLanguage } from '@/components/language'

const cards = [
 { src: '/images/hero-villa.jpg', alt: 'Contemporary villa entrance with warm natural materials', title: 'The home', caption: 'Architecture, entrance and first impressions' },
 { src: '/images/garden-house.jpg', alt: 'House surrounded by greenery and a garden', title: 'The surroundings', caption: 'Landscape, light and setting' },
 { src: '/images/calm-corner.jpg', alt: 'Quiet interior corner with warm natural light', title: 'The interiors', caption: 'Room placement and everyday flow' },
]
function MandalaArtwork() {
 return <svg viewBox="0 0 420 420" role="img" aria-label="Decorative Vastu Purusha Mandala inspired grid illustration" className="h-full w-full">
  <rect x="22" y="22" width="376" height="376" fill="#efe2c9" stroke="#9b6945" strokeWidth="2"/><rect x="42" y="42" width="336" height="336" fill="none" stroke="#3b1220" strokeWidth="2"/>
  {Array.from({length:7},(_,i)=><g key={i} stroke="#b98d69" strokeWidth="1" opacity=".75"><line x1={42+(i+1)*42} y1="42" x2={42+(i+1)*42} y2="378"/><line x1="42" y1={42+(i+1)*42} x2="378" y2={42+(i+1)*42}/></g>)}
  <g transform="translate(210 210)">{Array.from({length:8},(_,i)=><g key={i} transform={`rotate(${i*45})`}><path d="M0 -142 C-48 -126 -70 -70 -28 -34 C-12 -20 -9 -8 0 0 C9 -8 12 -20 28 -34 C70 -70 48 -126 0 -142Z" fill={i%2?'#d9bf9a':'#c58b60'} fillOpacity=".7" stroke="#74512f" strokeWidth="1.5"/></g>)}<circle r="68" fill="#f6f1e7" stroke="#3b1220" strokeWidth="2"/><circle r="54" fill="none" stroke="#a57a4a" strokeWidth="1.5"/><path d="M0 -44 L38 22 L-38 22 Z" fill="#d9bf9a" stroke="#74512f" strokeWidth="2"/><path d="M0 44 L-38 -22 L38 -22 Z" fill="none" stroke="#3b1220" strokeWidth="1.5"/><circle r="8" fill="#3b1220"/></g>
  <text x="210" y="16" textAnchor="middle" fontSize="11" letterSpacing="3" fill="#3b1220">NORTH</text><text x="210" y="414" textAnchor="middle" fontSize="11" letterSpacing="3" fill="#3b1220">SOUTH</text>
 </svg>
}
export function VastuPropertyGallery() {
 const {t}=useLanguage()
 return <section className="bg-[#fbf8f3] px-5 py-10 sm:py-16 lg:px-10 lg:py-20" aria-labelledby="property-visuals-heading"><div className="mx-auto max-w-7xl">
  <div className="grid gap-6 sm:gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-end"><div><Eyebrow>Space meets tradition</Eyebrow><h2 id="property-visuals-heading" className="mt-5 max-w-xl font-serif text-4xl font-light leading-tight text-[#3b1220] sm:text-6xl">{t('A thoughtful balance of Vastu and modern homes.')}</h2><p className="mt-5 max-w-lg leading-7 text-[#2a1b1f]/70">{t('Explore a property as it is lived in — from the entrance and surroundings to the flow of each room — alongside the traditional spatial principles that inform Vastu.')}</p></div>
   <div className="grid grid-cols-2 gap-3 sm:gap-4"><div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-sm sm:col-span-1 sm:aspect-[4/5]"><Image src={cards[0].src} alt={t(cards[0].alt)} fill sizes="(max-width: 640px) 100vw, 35vw" className="object-cover transition-transform duration-700 hover:scale-[1.04]"/></div><div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-sm sm:col-span-1 sm:aspect-[4/5]"><Image src={cards[1].src} alt={t(cards[1].alt)} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-700 hover:scale-[1.04]"/></div></div>
  </div>
  <div className="mt-6 sm:mt-12 grid gap-5 sm:gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div className="grid gap-4 sm:grid-cols-2"><article className="relative min-h-[240px] sm:min-h-[280px] overflow-hidden"><Image src={cards[2].src} alt={t(cards[2].alt)} fill sizes="(max-width: 640px) 100vw, 35vw" className="object-cover"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e0a11]/85 to-transparent p-5 text-white"><h3 className="font-serif text-2xl">{t(cards[2].title)}</h3><p className="mt-1 text-sm text-white/80">{t(cards[2].caption)}</p></div></article><article className="flex flex-col justify-between bg-[#efe2c9] p-6 sm:p-7"><div><Eyebrow>Traditional principles</Eyebrow><h3 className="mt-4 font-serif text-3xl font-light text-[#3b1220]">{t('The Vastu Purusha Mandala')}</h3><p className="mt-3 text-sm leading-6 text-[#2a1b1f]/70">{t('A traditional planning diagram used as a starting point for thinking about orientation and spatial relationships.')}</p></div><p className="mt-8 text-xs leading-5 text-[#2a1b1f]/60">{t('Illustrative artwork, not a property assessment.')}</p></article></div><div className="mx-auto w-full max-w-[360px] sm:max-w-[460px]"><MandalaArtwork/></div></div>
  <div className="mt-8 sm:mt-10 flex flex-col gap-4 border-t border-[#2a1b1f]/15 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="max-w-xl text-sm leading-6 text-[#2a1b1f]/70">{t('Every property is different. A considered review combines the plan, the site and your practical needs.')}</p><Link href="/services" className={btn+" w-fit bg-[#3b1220] text-[#f6f1ea] hover:bg-[#74512f]"}>{t('Explore Vastu services')} <ArrowUpRight className="size-4"/></Link></div>
 </div></section>
}
