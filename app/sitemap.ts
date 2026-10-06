import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site-url'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  return ['', 'about', 'services', 'services/residential', 'services/workplace', 'services/development', 'blogs', 'contact', 'bookings', 'vastu-checker'].map((path) => ({ url: `${base}/${path}`, lastModified: new Date() }))
}
