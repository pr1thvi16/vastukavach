import type { Metadata } from 'next'
import { ServiceDetail } from '@/components/site-page'

export const metadata: Metadata = {
  title: 'Developer and Design Advisory | Kavach Consultancy Dubai',
  description: 'A Vastu advisory partner for real-estate developers, architects and interior designers in Dubai.',
  alternates: { canonical: '/services/development' },
  openGraph: { title: 'Development Advisory | Kavach Consultancy', description: 'A spatial advisory partner for design and development teams.' },
}

export default function Page() {
  return <ServiceDetail eyebrow="Development advisory" title="A considered partner from concept to handover." image="/images/timber-house.jpg" imageAlt="Contemporary timber-clad home beneath an open sky" intro="Kavach works alongside developers, architects and interior designers to bring a Vastu-informed perspective into the design conversation, early enough to be useful." points={['Concept-stage orientation and planning review','Collaborative input for architects and interior designers','Clear recommendations presented for real project decisions']} />
}
