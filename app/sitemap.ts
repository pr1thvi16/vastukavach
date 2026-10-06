import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  return ['', 'about', 'services', 'services/residential', 'services/workplace', 'services/development', 'blogs', 'contact', 'bookings', 'vastu-checker'].map((path) => ({ url: `${base}/${path}`, lastModified: new Date() }))
}
