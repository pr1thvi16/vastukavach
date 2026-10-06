import type { Metadata } from 'next'
import { ServiceDetail } from '@/components/site-page'

export const metadata: Metadata = {
  title: 'Workplace Vastu Advisory | Kavach Consultancy Dubai',
  description: 'Spatial advisory for offices, shops, clinics and hospitality spaces across Dubai.',
  alternates: { canonical: '/services/workplace' },
  openGraph: { title: 'Workplace Advisory | Kavach Consultancy', description: 'Advice for the places where people work, meet and serve.' },
}

export default function Page() {
  return <ServiceDetail eyebrow="Workplace advisory" title="Space for good work to happen." image="/images/workplace.jpg" imageAlt="Calm modern office corridor with natural tones" intro="We help business owners and teams make considered spatial decisions for offices, shops, clinics and restaurants, balancing practical needs with a clearer sense of flow." points={['Planning input for new premises and fit-outs','Review of room functions, circulation and key work areas','Advice for existing spaces seeking a more intentional layout']} />
}
