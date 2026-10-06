const PRODUCTION_SITE_URL = 'https://vastukavach.vercel.app'

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  const vercelProductionDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  const netlifyProductionUrl = process.env.URL?.trim()
  const origin = configured || vercelProductionDomain || netlifyProductionUrl ||
    (process.env.NODE_ENV === 'production' ? PRODUCTION_SITE_URL : 'http://localhost:3000')
  return new URL(origin.startsWith('http') ? origin : `https://${origin}`).toString().replace(/\/$/, '')
}
