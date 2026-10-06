Is a web dev project for real estate developers

## Netlify deployment

The site is a Next.js application. `netlify.toml` sets the build command to
`npm run build` and the publish directory to `.next`, relative to the site's
configured base directory (`vastukavach-netlify`). Netlify automatically applies
its Next.js adapter to serve pages and API routes.

Keep the publish directory set to `.next`, rather than the repository root or
`public`. Publishing only source files or static assets leaves the application's
routes unavailable and produces Netlify's page-not-found response. Deploy the
updated configuration for it to take effect.
