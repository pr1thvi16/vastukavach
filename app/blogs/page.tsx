import { Blogs } from '@/components/site-page'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Journal | Kavach Consultancy Dubai', description: 'Thoughtful notes on Vastu, orientation, light and the spaces where life happens.', alternates: { canonical: '/blogs' }, openGraph: { title: 'Journal | Kavach Consultancy', description: 'A little perspective on Vastu and thoughtful spaces.' } }
export default function Page() { return <Blogs /> }
