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

const serviceOptions = [
  { value: 'Vastu', label: 'Vastu for my home or workplace', description: 'Room layout, directions and how the space feels to use.' },
  { value: 'Property', label: 'Choosing a property', description: 'Guidance before buying, renting or building.' },
] as const

export function VastuChecker() {
  const { t } = useLanguage()
  const [spaceType, setSpaceType] = useState('')
  const [direction, setDirection] = useState('')
  const [layoutArea, setLayoutArea] = useState('')
  const [priority, setPriority] = useState<string[]>([])
  const [serviceInterests, setServiceInterests] = useState<string[]>(['Vastu'])
  const [selectionError, setSelectionError] = useState('')
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    const requestedType = new URLSearchParams(window.location.search).get('type')
    if (requestedType === 'Home' || requestedType === 'Workplace' || requestedType === 'Development') {
      setSpaceType(requestedType)
    }
  }, [])

  const questionSet = curatedQuestions[spaceType as keyof typeof curatedQuestions] ?? curatedQuestions.Development
  const wantsVastu = serviceInterests.includes('Vastu')

  function toggleService(value: string) {
    setServiceInterests(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value])
    setSelectionError('')
  }

  function togglePriority(value: string) {
    setPriority(current => {
      if (value === 'Not sure yet') return current.includes(value) ? [] : [value]
      const withoutUncertain = current.filter(item => item !== 'Not sure yet')
      return withoutUncertain.includes(value) ? withoutUncertain.filter(item => item !== value) : [...withoutUncertain, value]
    })
    setSelectionError('')
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!serviceInterests.length) {
      setSelectionError('Choose at least one type of guidance so we can point you in the right direction.')
      return
    }
    if (wantsVastu && !priority.length) {
      setSelectionError('Choose at least one thing you would like to improve, or select Not sure yet.')
      return
    }

    track('Vastu Checker Completed', { spaceType: wantsVastu ? spaceType : 'not_applicable', direction: wantsVastu ? direction : 'not_applicable', layoutArea: wantsVastu ? layoutArea : 'not_applicable', priorities: priority.join(', '), serviceInterests: serviceInterests.join(', ') })
    trackGA4Event('vastu_checker_complete', { space_type: wantsVastu ? spaceType : 'not_applicable', entrance_direction: wantsVastu ? direction : 'not_applicable', layout_area: wantsVastu ? layoutArea : 'not_applicable', priorities: priority.join(', '), service_interests: serviceInterests.join(', ') })
    setComplete(true)
  }

  function reset() {
    setSpaceType('')
    setDirection('')
    setLayoutArea('')
    setPriority([])
    setServiceInterests(['Vastu'])
    setSelectionError('')
    setComplete(false)
  }

  const guidance: string[] = []
  if (wantsVastu) {
    guidance.push('The entrance direction is only one part of a space. Observe its daylight and heat through the day, then consider it alongside your layout and routines.')
    guidance.push(spaceType === 'Home' ? 'For a home, compare the layout with the routines of everyone who lives there.' : spaceType === 'Workplace' ? 'For a workplace, consider how staff, visitors and service routes move through it.' : 'For a development project, review orientation, circulation and daylight together while the plan can still be adjusted.')
    if (layoutArea) guidance.push(layoutAdvice[layoutArea])
    if (priority.includes('Not sure yet')) guidance.push('It is completely fine not to know where to begin. Start by noticing one room or routine that does not feel quite right.')
    else priority.forEach(item => { if (priorityAdvice[item]) guidance.push(priorityAdvice[item]) })
  }
  if (serviceInterests.includes('Property')) guidance.push('Before buying, renting or building, bring the property plan or listing so we can discuss orientation, room layout and practical questions to consider.')

  return <section className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
    <div>
      <p className="max-w-xl leading-8 text-[#2a1b1f]/70">{t('Tell us what you would like help with. Choose as many as you need — we will suggest a practical place to start.')}</p>
      <p className="mt-5 font-serif text-2xl font-light leading-snug text-[#3b1220]">{t('Vastu guidance for your home, workplace or property — connected to everyday decisions.')}</p>
      <p className="mt-6 border-l-2 border-[#a57a4a] pl-5 text-sm leading-7 text-[#2a1b1f]/65">{t('General guidance only. No scores, no pressure, and no need to know all the answers yet.')}</p>
    </div>
    <div className="border border-[#2a1b1f]/10 bg-[#fbf8f3] p-6 sm:p-10">
      {!complete ? <form onSubmit={submit} className="grid gap-8">
        <fieldset className="min-w-0">
          <legend className="text-[11px] uppercase tracking-[.18em] text-[#2a1b1f]/65">{t('What would you like help with?')}</legend>
          <p className="mt-2 text-sm leading-6 text-[#2a1b1f]/60">{t('Select all that fit. You can choose more than one.')}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {serviceOptions.map(option => <label key={option.value} className={`flex min-w-0 cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${serviceInterests.includes(option.value) ? 'border-[#74512f] bg-[#ebe3d8]' : 'border-[#2a1b1f]/12 bg-white hover:bg-[#f6f1ea]'}`}>
              <input type="checkbox" checked={serviceInterests.includes(option.value)} onChange={() => toggleService(option.value)} className="mt-1 size-4 shrink-0 accent-[#3b1220]" />
              <span className="min-w-0">
                <span className="block font-medium leading-5 text-[#3b1220]">{t(option.label)}</span>
                <span className="mt-1 block text-sm leading-5 text-[#2a1b1f]/60">{t(option.description)}</span>
              </span>
            </label>)}
          </div>
        </fieldset>

        {wantsVastu && <>
          <label className={label}>{t('What kind of space is it?')}
            <select required value={spaceType} onChange={(event) => { setSpaceType(event.target.value); setLayoutArea(''); setDirection(''); setPriority([]); setSelectionError('') }} className={field}>
              <option value="">{t('Select one')}</option>
              <option value="Home">{t('Home')}</option>
              <option value="Workplace">{t('Workplace')}</option>
              <option value="Development">{t('Development project')}</option>
            </select>
          </label>
          {spaceType && <>
          <label className={label}>{t('Which room or area would you like us to look at first?')}
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
          <fieldset className="min-w-0">
            <legend className="text-[11px] uppercase tracking-[.18em] text-[#2a1b1f]/65">{t('What would you most like to improve?')}</legend>
            <p className="mt-2 text-sm leading-6 text-[#2a1b1f]/60">{t('Choose all that apply.')}</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {questionSet.priorities.map(value => <label key={value} className={`flex cursor-pointer items-start gap-3 rounded-lg border px-4 py-3 transition-colors ${priority.includes(value) ? 'border-[#74512f] bg-[#ebe3d8]' : 'border-[#2a1b1f]/10 bg-white hover:bg-[#f6f1ea]'}`}>
                <input type="checkbox" checked={priority.includes(value)} onChange={() => togglePriority(value)} className="mt-1 size-4 shrink-0 accent-[#3b1220]" />
                <span className="text-sm leading-6 text-[#2a1b1f]/80">{t(value)}</span>
              </label>)}
            </div>
          </fieldset>
          </>}
        </>}

        {selectionError && <p role="alert" className="text-sm leading-6 text-[#8a233b]">{t(selectionError)}</p>}
        <button className="inline-flex w-fit items-center gap-3 bg-[#3b1220] px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#f6f1ea] transition-colors hover:bg-[#74512f]">{t('Show my pointers')} <ArrowUpRight className="size-4" /></button>
      </form> : <div aria-live="polite">
        <p className="text-[11px] uppercase tracking-[.22em] text-[#74512f]">{t('Your starting points')}</p>
        <h2 className="mt-4 font-serif text-4xl font-light">{t('Here is a place to start.')}</h2>
        <div className="mt-5 border-b border-[#2a1b1f]/10 pb-5">
          <p className="text-[10px] uppercase tracking-[.18em] text-[#74512f]">{t('What you would like help with')}</p>
          <div className="mt-3 flex flex-wrap gap-2">{serviceOptions.filter(option => serviceInterests.includes(option.value)).map(option => <span key={option.value} className="rounded-full border border-[#74512f]/35 bg-[#ebe3d8] px-3 py-2 text-sm text-[#3b1220]">{t(option.label)}</span>)}</div>
        </div>
        {wantsVastu && <p className="mt-5 text-sm leading-7 text-[#2a1b1f]/70">{t('Your space')}: {t(spaceType)} · {t(direction === 'Unknown' ? 'I’m not sure' : direction)} · {t(layoutArea)}</p>}
        <ul className="mt-6 space-y-5 text-sm leading-7 text-[#2a1b1f]/75">
          {guidance.map((item, index) => <li key={`${item}-${index}`} className="flex gap-3"><span className="mt-3 size-1.5 shrink-0 rounded-full bg-[#a57a4a]" /><span>{t(item)}</span></li>)}
        </ul>
        <p className="mt-7 border-t border-[#2a1b1f]/10 pt-5 text-xs leading-6 text-[#2a1b1f]/55">{t('These are general prompts, not a definitive assessment of a property or personal outcome.')}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/services" className="inline-flex items-center gap-3 border border-[#2a1b1f]/25 px-5 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#2a1b1f] transition-colors hover:bg-[#ebe3d8]">{t('Explore our services')} <ArrowUpRight className="size-4" /></Link>
          <Link href="/bookings" onClick={() => { trackGA4Event('consultation_cta_click', { location: 'vastu_checker_result' }); track('Consultation CTA Clicked', { location: 'vastu_checker_result' }) }} className="inline-flex items-center gap-3 bg-[#3b1220] px-5 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#f6f1ea] transition-colors hover:bg-[#74512f]">{t('Talk it through with us')} <ArrowUpRight className="size-4" /></Link>
          <button type="button" onClick={reset} className="inline-flex items-center gap-2 border border-[#2a1b1f]/25 px-5 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#2a1b1f] hover:bg-[#ebe3d8]"><RotateCcw className="size-4" />{t('Start again')}</button>
        </div>
      </div>}
    </div>
  </section>
}
