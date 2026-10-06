import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/components/language'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const dmSans = Jost({ subsets: ['latin'], variable: '--font-dm-sans' })
const playfairDisplay = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600'], style: ['normal','italic'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Kavach Consultancy | Modern Vastu Advisory in Dubai',
  description: 'Practical, personal Vastu advisory for homes, workplaces and developments across Dubai.',
  ...(process.env.NEXT_PUBLIC_SITE_URL ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) } : {}),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Kavach Consultancy | Modern Vastu Advisory in Dubai',
    description: 'Spaces that feel like home. Thoughtful spatial advisory rooted in Vastu.',
    type: 'website',
    images: [{ url: '/images/hero-villa.jpg', alt: 'Contemporary villa and reflecting pool' }],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f1ea',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Kavach Consultancy & Marketing LLC',
              description: 'Practical spatial advisory rooted in Vastu principles for homes, workplaces and developments.',
              founder: { '@type': 'Person', name: 'Vedang Joshi' },
              areaServed: { '@type': 'City', name: 'Dubai' },
              address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
              ...(process.env.NEXT_PUBLIC_SITE_URL ? { url: process.env.NEXT_PUBLIC_SITE_URL } : {}),
            }),
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
