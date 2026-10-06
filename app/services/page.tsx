import { Services } from '@/components/site-page'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Vastu Advisory Services | Kavach Consultancy Dubai', description: 'Explore residential, workplace and development advisory from Kavach Consultancy in Dubai.', alternates: { canonical: '/services' }, openGraph: { title: 'Services | Kavach Consultancy', description: 'Spatial advice for homes, workplaces and developments.' } }
export default function Page() { return <Services /> }
