import { Contact } from '@/components/site-page'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Contact Kavach Consultancy | Dubai', description: 'Get in touch with Kavach Consultancy to discuss Vastu advisory for your home, workplace or development in Dubai.', alternates: { canonical: '/contact' }, openGraph: { title: 'Contact | Kavach Consultancy', description: 'Start a thoughtful conversation about your space.' } }
export default function Page() { return <Contact /> }
