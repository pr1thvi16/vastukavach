'use client'

import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowUpRight, RotateCcw } from 'lucide-react'
import { track } from '@vercel/analytics'
import { trackGA4Event } from '@/lib/ga4'
import { useLanguage } from '@/components/language'

const field = 'min-w-0 w-full border-0 border-b border-[#2a1b1f]/25 bg-transparent px-0 py-3 text-base focus:border-[#a57a4a] focus:outline-none focus:ring-0'
const label = 'min-w-0 flex flex-col gap-2 text-[11px] uppercase tracking-[.18em] text-[#2a1b1f]/65'
const priorityAdvice: Record<string, string> = {
  'Entry and circulation': 'Walk from the entrance to the main rooms. Check that everyday routes stay clear.',
  'Daily routines': 'Trace the routines of everyone at home and notice where movement or shared use feels difficult.',
  Daylight: 'Notice where daylight falls at different times, including heat and glare.',
  'Quiet and rest': 'Consider how quieter rooms relate to doors, shared spaces and outdoor noise.',
  'Storage and ease': 'Look for practical storage and everyday routes that keep the home easy to use.',
  'Focus and productivity': 'Check whether work areas have useful light and enough separation from interruptions.',
  'Visitor experience': 'Follow the visitor journey from arrival to meeting spaces and note where it feels unclear.',
  'Team connection': 'Consider whether shared areas support collaboration without disrupting focused work.',
  'Daylight and comfort': 'Notice daylight, glare, acoustics and comfort across the workday.',
  'Plot orientation': 'Review how the site orientation affects access, daylight, heat and outdoor use.',
  'Buyer experience': 'Walk through the intended buyer journey and consider what feels clear, welcoming and usable.',
  'Efficient planning': 'Check whether circulation, services and shared spaces work together without wasted movement.',
  'Daylight and livability': 'Consider daylight, ventilation and outlook as part of long-term everyday comfort.',
}
const layoutAdvice: Record<string, string> = {
  'Entrance and circulation': 'Check whether the route from the entrance to main rooms stays clear.',
  'Living or shared room': 'Notice daylight and circulation in the room where people gather most.',
  'Bedroom or quiet room': 'Consider its distance from busy routes, doors and outdoor noise.',
  'Kitchen or service area': 'Look at practical routes between the kitchen, storage and the rooms used every day.',
  'Balcony or outdoor edge': 'Notice how the home connects to light, air, outlook and outdoor routines.',
  'Work or focus area': 'Check for useful light and enough separation from interruptions.',
  'Meeting or client area': 'Notice how visitors arrive, wait and move through the space without disrupting focused work.',
  'Team or collaboration area': 'Check whether shared work areas support conversation while preserving clear circulation.',
  'Private or focus area': 'Look for useful light, acoustic separation and enough distance from busy routes.',
  'Arrival and reception': 'Follow the arrival sequence from the entrance to reception and identify points of friction.',
  'Private or leadership area': 'Look for useful light, acoustic separation and a clear relationship to shared spaces.',
  'Staff or service route': 'Check whether staff, deliveries and service movement can happen without crossing visitor routes.',
  'Site arrival and access': 'Review how people, vehicles and services arrive and move through the development.',
  'Residential unit mix': 'Consider how unit types, privacy and shared circulation support the intended residents.',
  'Shared amenities': 'Look at how amenities connect to homes, access routes and everyday community use.',
  'Core and circulation': 'Check whether lifts, stairs and corridors make movement intuitive and efficient.',
  'Landscape and open space': 'Notice how landscape, shade, outlook and gathering areas support the wider plan.',
  'Not sure yet': 'Walk from the entrance through the main rooms and note where movement or room use feels unclear.',
}
const curatedQuestions = {
  Home: {
    layouts: ['Entrance and circulation', 'Living or shared room', 'Bedroom or quiet room', 'Kitchen or service area', 'Balcony or outdoor edge', 'Not sure yet'],
    priorities: ['Daily routines', 'Daylight', 'Quiet and rest', 'Storage and ease', 'Not sure yet'],
  },
  Workplace: {
    layouts: ['Arrival and reception', 'Work or focus area', 'Meeting or client area', 'Team or collaboration area', 'Private or leadership area', 'Staff or service route', 'Not sure yet'],
    priorities: ['Focus and productivity', 'Visitor experience', 'Team connection', 'Daylight and comfort', 'Not sure yet'],
  },
  Development: {
    layouts: ['Site arrival and access', 'Residential unit mix', 'Shared amenities', 'Core and circulation', 'Landscape and open space', 'Not sure yet'],
    priorities: ['Plot orientation', 'Buyer experience', 'Efficient planning', 'Daylight and livability', 'Not sure yet'],
  },
} as const

export function VastuChecker() {
  const { t } = useLanguage()
  const [spaceType, setSpaceType] = useState('')
  const [direction, setDirection] = useState('')
  const [layoutArea, setLayoutArea] = useState('')
  useEffect(() => {
    const requestedType = new URLSearchParams(window.location.search).get('type')
    if (requestedType === 'Home' || requestedType === 'Workplace' || requestedType === 'Development') {
      setSpaceType(requestedType)
    }
  }, [])
  const [priority, setPriority] = useState('')
  const [complete, setComplete] = useState(false)
  const questionSet = curatedQuestions[spaceType as keyof typeof curatedQuestions] ?? curatedQuestions.Development

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    track('Vastu Checker Completed', { spaceType, direction, layoutArea, priority })
    trackGA4Event('vastu_checker_complete', { space_type: spaceType, entrance_direction: direction, layout_area: layoutArea, priority })
    setComplete(true)
  }

  function reset() {
    setSpaceType('')
    setDirection('')
    setLayoutArea('')
    setPriority('')
    setComplete(false)
  }

  return <section className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
    <div>
      <p className="max-w-xl leading-8 text-[#2a1b1f]/70">{t('A few details can help you notice what to look at next. This is not a pass/fail rating or a substitute for a full plan review.')}</p>
      <p className="mt-8 border-l-2 border-[#a57a4a] pl-5 text-sm leading-7 text-[#2a1b1f]/65">{t('General guidance only')}</p>
    </div>
    <div className="border border-[#2a1b1f]/10 bg-[#fbf8f3] p-6 sm:p-10">
      {!complete ? <form onSubmit={submit} className="grid gap-8">
        <label className={label}>{t('What kind of space is it?')}
          <select required value={spaceType} onChange={(event) => setSpaceType(event.target.value)} className={field}>
            <option value="">{t('Select one')}</option>
            <option value="Home">{t('Home')}</option>
            <option value="Workplace">{t('Workplace')}</option>
            <option value="Development">{t('Development project')}</option>
          </select>
        </label>
        <label className={label}>{t('Which room or area in the layout should we review first?')}
          <select required value={layoutArea} onChange={(event) => setLayoutArea(event.target.value)} className={field}>
            <option value="">{t('Select one')}</option>
            {questionSet.layouts.map((value) => <option key={value} value={value}>{t(value)}</option>)}
          </select>
        </label>
        <label className={label}>{t('Which direction does the main entrance face?')}
          <select required value={direction} onChange={(event) => setDirection(event.target.value)} className={field}>
            <option value="">{t('Select one')}</option>
            {(['North', 'East', 'South', 'West'] as const).map((value) => <option key={value} value={value}>{t(value)}</option>)}
            <option value="Unknown">{t('I’m not sure')}</option>
          </select>
        </label>
        <label className={label}>{t('What would you most like to improve?')}
          <select required value={priority} onChange={(event) => setPriority(event.target.value)} className={field}>
            <option value="">{t('Select one')}</option>
            {questionSet.priorities.map((value) => <option key={value} value={value}>{t(value)}</option>)}
          </select>
        </label>
        <button className="inline-flex w-fit items-center gap-3 bg-[#3b1220] px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#f6f1ea] transition-colors hover:bg-[#74512f]">{t('Show my pointers')} <ArrowUpRight className="size-4" /></button>
      </form> : <div aria-live="polite">
        <p className="text-[11px] uppercase tracking-[.22em] text-[#74512f]">{t('General guidance only')}</p>
        <h2 className="mt-4 font-serif text-4xl font-light">{t('Your starting points')}</h2>
        <ul className="mt-7 space-y-5 text-sm leading-7 text-[#2a1b1f]/75">
          <li>{t('The entrance direction is only one part of a space. Observe its daylight and heat through the day, then consider it alongside your layout and routines.')}</li>
          <li>{spaceType === 'Home' ? t('For a home, compare the layout with the routines of everyone who lives there.') : spaceType === 'Workplace' ? t('For a workplace, consider how staff, visitors and service routes move through it.') : t('For a development project, review orientation, circulation and daylight together while the plan can still be adjusted.')}</li>
          <li>{t(layoutAdvice[layoutArea])}</li>
          <li>{t(priorityAdvice[priority])}</li>
        </ul>
        <p className="mt-7 border-t border-[#2a1b1f]/10 pt-5 text-xs leading-6 text-[#2a1b1f]/55">{t('Your selection')}: {t(spaceType)} · {t(direction === 'Unknown' ? 'I’m not sure' : direction)} · {t(layoutArea)} · {t(priority)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/services" className="inline-flex items-center gap-3 border border-[#2a1b1f]/25 px-5 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#2a1b1f] transition-colors hover:bg-[#ebe3d8]">{t('Explore our services')} <ArrowUpRight className="size-4" /></Link>
          <Link href="/bookings" onClick={() => { trackGA4Event('consultation_cta_click', { location: 'vastu_checker_result' }); track('Consultation CTA Clicked', { location: 'vastu_checker_result' }) }} className="inline-flex items-center gap-3 bg-[#3b1220] px-5 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#f6f1ea] transition-colors hover:bg-[#74512f]">{t('Book a consultation')} <ArrowUpRight className="size-4" /></Link>
          <button type="button" onClick={reset} className="inline-flex items-center gap-2 border border-[#2a1b1f]/25 px-5 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#2a1b1f] hover:bg-[#ebe3d8]"><RotateCcw className="size-4" />{t('Start again')}</button>
        </div>
      </div>}
    </div>
  </section>
}
