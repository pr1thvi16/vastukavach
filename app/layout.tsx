import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@/components/google-analytics'
import { LanguageProvider } from '@/components/language'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { getSiteUrl } from '@/lib/site-url'
import './globals.css'

const dmSans = Jost({ subsets: ['latin'], variable: '--font-dm-sans' })
const playfairDisplay = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','600'], style: ['normal','italic'], variable: '--font-playfair' })
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID?.trim() || 'G-B2ZGT4M6HT'

export const metadata: Metadata = {
  title: 'Kavach Consultancy | Modern Vastu Advisory in Dubai',
  description: 'Practical, personal Vastu advisory for homes, workplaces and developments across Dubai.',
  metadataBase: new URL(getSiteUrl()),
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
      <head>
        <link rel="preconnect" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com" />
      </head>
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
              areaServed: [
                { '@type': 'City', name: 'Dubai' },
                { '@type': 'City', name: 'Abu Dhabi' },
                { '@type': 'AdministrativeArea', name: 'Sharjah' },
              ],
              telephone: '+971 56 452 7299',
              email: 'info@kavachconsultancy.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Bur Dubai, Behind ADCB Bank',
                addressLocality: 'Dubai',
                addressRegion: 'Dubai',
                addressCountry: 'AE',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  contactType: 'general enquiries',
                  telephone: '+971 56 452 7299',
                  email: 'info@kavachconsultancy.com',
                  availableLanguage: ['English', 'Arabic'],
                },
                {
                  '@type': 'ContactPoint',
                  contactType: 'founder enquiries',
                  telephone: '+971 52 922 8629',
                  email: 'vedang@kavachconsultancy.com',
                  availableLanguage: ['English', 'Arabic'],
                },
              ],
              sameAs: ['https://ae.linkedin.com/in/vedang-joshi-624b171b3'],
              url: getSiteUrl(),
            }),
          }}
        />
        <LanguageProvider>{children}</LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {process.env.NODE_ENV === 'production' && googleAnalyticsId && <GoogleAnalytics gaId={googleAnalyticsId} />}
      </body>
    </html>
  )
}
