import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'

const dmSans = Jost({ subsets: ['latin'], variable: '--font-dm-sans' })
const playfairDisplay = Cormorant_Garamond({ subsets: ['latin'], weight: ['300','400','500','600'], style: ['normal','italic'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Kavach Consultancy | Modern Vastu Advisory in Dubai',
  description: 'Practical, personal Vastu advisory for homes, workplaces and developments across Dubai.',
  generator: 'v0.app',
  openGraph: {
    title: 'Kavach Consultancy | Modern Vastu Advisory in Dubai',
    description: 'Spaces that feel like home. Thoughtful spatial advisory rooted in Vastu.',
    type: 'website',
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
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
