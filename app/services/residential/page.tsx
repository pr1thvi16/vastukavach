import type { Metadata } from 'next'
import { ServiceDetail } from '@/components/site-page'

export const metadata: Metadata = {
  title: 'Residential Vastu Advisory | Kavach Consultancy Dubai',
  description: 'Thoughtful Vastu guidance for choosing, renting, renovating or arranging a home in Dubai.',
  alternates: { canonical: '/services/residential' },
  openGraph: { title: 'Residential Advisory | Kavach Consultancy', description: 'Practical spatial guidance for the place you call home.' },
}

export default function Page() {
  return <ServiceDetail eyebrow="Residential advisory" title="A home that works for the way you live." image="/images/bright-living.jpg" imageAlt="Bright open-plan living room with soft sofas" intro="Whether you are choosing a new home or rethinking one you already love, we help you look at orientation, natural light, movement and how each room supports daily life." points={['Pre-purchase or rental review of a floor plan and orientation','Guidance for renovations, room use and furniture placement','On-site or remote consultation shaped around your priorities']} />
}
