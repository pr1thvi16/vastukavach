type GA4Parameters = Record<string, string | number | boolean | undefined>

type GoogleAnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

export function trackGA4Event(eventName: string, parameters: GA4Parameters = {}) {
  if (typeof window === 'undefined') return

  const analyticsWindow = window as GoogleAnalyticsWindow
  if (typeof analyticsWindow.gtag === 'function') {
    analyticsWindow.gtag('event', eventName, parameters)
    return
  }

  // Preserve events that happen before the Google tag finishes loading.
  const dataLayer = analyticsWindow.dataLayer ?? (analyticsWindow.dataLayer = [])
  dataLayer.push(['event', eventName, parameters])
}
