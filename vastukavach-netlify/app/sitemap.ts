import type { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap { const base = 'https://kavachconsultancy.com'; return ['','about','services','blogs','contact','bookings'].map((path) => ({ url: `${base}/${path}`, lastModified: new Date() })) }
