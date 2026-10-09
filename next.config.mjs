/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Prefer modern, compressed formats for photographic assets.
    formats: ['image/avif', 'image/webp'],
    // Explicit breakpoints let Next serve appropriately sized responsive variants.
    deviceSizes: [360, 390, 430, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
