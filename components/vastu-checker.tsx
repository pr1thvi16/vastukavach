'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowUpRight, RotateCcw } from 'lucide-react'
import { track } from '@vercel/analytics'
import { useLanguage } from '@/components/language'

const field = 'w-full border-0 border-b border-[#2a1b1f]/25 bg-transparent px-0 py-3 text-base focus:border-[#a57a4a] focus:outline-none focus:ring-0'
const label = 'flex flex-col gap-2 text-[11px] uppercase tracking-[.18em] text-[#2a1b1f]/65'
const priorityAdvice: Record<string, string> = {
  'Entry and circulation': 'Walk from the entrance to the main rooms. Check that everyday routes stay clear.',
  Daylight: 'Notice where daylight falls at different times, including heat and glare.',
  'Quiet and rest': 'Consider how quieter rooms relate to doors, shared spaces and outdoor noise.',
  'Work and focus': 'Check whether the work area has useful light and enough separation from interruptions.',
}

export function VastuChecker() {
  const { t } = useLanguage()
  const [spaceType, setSpaceType] = useState('')
  const [direction, setDirection] = useState('')
  const [priority, setPriority] = useState('')
  const [complete, setComplete] = useState(false)

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    track('Vastu Checker Completed', { spaceType, direction, priority })
    setComplete(true)
  }

  function reset() {
    setSpaceType('')
    setDirection('')
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
            {(['Entry and circulation', 'Daylight', 'Quiet and rest', 'Work and focus'] as const).map((value) => <option key={value} value={value}>{t(value)}</option>)}
          </select>
        </label>
        <button className="inline-flex w-fit items-center gap-3 bg-[#3b1220] px-7 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#f6f1ea] transition-colors hover:bg-[#74512f]">{t('Show my pointers')} <ArrowUpRight className="size-4" /></button>
      </form> : <div aria-live="polite">
        <p className="text-[11px] uppercase tracking-[.22em] text-[#74512f]">{t('General guidance only')}</p>
        <h2 className="mt-4 font-serif text-4xl font-light">{t('Your starting points')}</h2>
        <ul className="mt-7 space-y-5 text-sm leading-7 text-[#2a1b1f]/75">
          <li>{t('The entrance direction is only one part of a space. Observe its daylight and heat through the day, then consider it alongside your layout and routines.')}</li>
          <li>{spaceType === 'Home' ? t('For a home, compare the layout with the routines of everyone who lives there.') : spaceType === 'Workplace' ? t('For a workplace, consider how staff, visitors and service routes move through it.') : t('For a development project, review orientation, circulation and daylight together while the plan can still be adjusted.')}</li>
          <li>{t(priorityAdvice[priority])}</li>
        </ul>
        <p className="mt-7 border-t border-[#2a1b1f]/10 pt-5 text-xs leading-6 text-[#2a1b1f]/55">{t('Your selection')}: {t(spaceType)} · {t(direction === 'Unknown' ? 'I’m not sure' : direction)} · {t(priority)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/services" className="inline-flex items-center gap-3 border border-[#2a1b1f]/25 px-5 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#2a1b1f] transition-colors hover:bg-[#ebe3d8]">{t('Explore our services')} <ArrowUpRight className="size-4" /></Link>
          <button type="button" onClick={reset} className="inline-flex items-center gap-2 border border-[#2a1b1f]/25 px-5 py-4 text-[11px] font-medium uppercase tracking-[.18em] text-[#2a1b1f] hover:bg-[#ebe3d8]"><RotateCcw className="size-4" />{t('Start again')}</button>
        </div>
      </div>}
    </div>
  </section>
}
