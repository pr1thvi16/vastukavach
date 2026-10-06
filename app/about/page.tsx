import { About } from '@/components/site-page'
import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'About Vedang Joshi | Kavach Consultancy Dubai', description: 'Meet Vedang Joshi and learn about Kavach’s practical, people-first approach to Vastu spatial advisory in Dubai.', alternates: { canonical: '/about' }, openGraph: { title: 'About Kavach Consultancy', description: 'A clear-eyed, practical approach to Vastu and the spaces we live and work in.' } }
export default function Page() { return <About /> }
