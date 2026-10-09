import { Services } from '@/components/site-page'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Vastu Advisory Services | Kavach Consultancy Dubai', description: 'Explore practical Vastu Shastra solutions for residences, businesses, warehouses, factories and property selection across Dubai, Abu Dhabi and Sharjah.', alternates: { canonical: '/services' }, openGraph: { title: 'Services | Kavach Consultancy', description: 'Spatial advice for homes, workplaces and developments.' } }
export default function Page() { return <Services /> }
