import type { MetadataRoute } from 'next'
import { getSiteUrl } from '@/lib/site-url'
import { blogSlugs } from '@/lib/blog-posts'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  return ['', 'about', 'services', 'services/residential', 'services/workplace', 'services/development', 'blogs', ...blogSlugs.map((slug) => `blogs/${slug}`), 'contact', 'bookings', 'vastu-checker'].map((path) => ({ url: path ? `${base}/${path}` : base, lastModified: new Date() }))
}
