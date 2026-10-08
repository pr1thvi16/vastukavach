import type { Metadata } from 'next'
import { StandardPage } from '@/components/site-page'
import { VastuChecker } from '@/components/vastu-checker'

export const metadata: Metadata = {
  title: 'Quick Vastu Checker | Kavach Consultancy',
  description: 'Get general starting points for your space type, entrance direction, room layout and priorities.',
  alternates: { canonical: '/vastu-checker' },
  openGraph: {
    title: 'Quick Vastu Checker | Kavach Consultancy',
    description: 'Get general starting points for your space type, entrance direction, room layout and priorities.',
  },
}

export default function VastuCheckerPage() {
  return <StandardPage eyebrow="A quick first look" title="Quick Vastu checker" image="/images/kavach-hero.png" imageAlt="Sunlit interior with a rounded doorway and indoor greenery"><VastuChecker /></StandardPage>
}
