import type { Metadata } from 'next'
import { StandardPage } from '@/components/site-page'
import { VastuChecker } from '@/components/vastu-checker'

export const metadata: Metadata = {
  title: 'Quick Vastu Checker | Kavach Consultancy',
  description: 'Get a few general pointers for the layout, entrance direction and priorities of your space.',
  alternates: { canonical: '/vastu-checker' },
}

export default function VastuCheckerPage() {
  return <StandardPage eyebrow="A quick first look" title="Quick Vastu checker" image="/images/kavach-hero.png" imageAlt="Sunlit interior with a rounded doorway and indoor greenery"><VastuChecker /></StandardPage>
}
