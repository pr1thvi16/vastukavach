import { Booking } from '@/components/site-page'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Book a Consultation | Kavach Consultancy Dubai', description: 'Request a Vastu spatial advisory consultation for a home, workplace or development in Dubai.', alternates: { canonical: '/bookings' }, openGraph: { title: 'Book a Consultation | Kavach Consultancy', description: 'Tell us about your space and request a consultation.' } }
export default function Page() { return <Booking /> }
