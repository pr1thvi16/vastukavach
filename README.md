# Kavach Consultancy

A responsive, bilingual marketing site for Kavach Consultancy & Marketing LLC, a Dubai-based spatial advisory firm. The site helps visitors review a property's practical fit before buying, renting, redesigning, or planning a development.

## Local setup

Requirements: Node.js 20.9 or newer.

1. Copy `.env.example` to `.env.local`.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev` and open `http://localhost:3000`.
4. Create a production build with `npm run build`, then run it with `npm start`.

## Pages and features

| Route | Purpose |
| --- | --- |
| `/` | Home, services overview, property imagery, and consultation calls to action |
| `/about` | Kavach's approach and founder profile |
| `/services` | Services index |
| `/services/residential` | Home and residential advice |
| `/services/workplace` | Workplace advice |
| `/services/development` | Developer and project advice |
| `/blogs` | Journal article previews |
| `/bookings` | Validated consultation enquiry form |
| `/contact` | Phone, email, WhatsApp and location details when configured |
| `/vastu-checker` | Short, general-purpose Vastu checklist |

Other included features:

- Responsive navigation and layouts, local `next/image` assets, descriptive alternative text, and keyboard-visible focus states.
- English and Arabic language toggle, saved preference, and right-to-left Arabic layout.
- A compass rose used with the Vastu checker.
- WhatsApp click-to-chat links with prefilled English and Arabic messages.
- Vercel Web Analytics page views plus custom events for booking submission, consultation calls to action, WhatsApp clicks, language changes, and checker completion.
- Page metadata, Open Graph cards, canonical URLs, a sitemap, robots rules, and LocalBusiness structured data.

## Booking delivery

The browser form and `/api/bookings` both validate required fields, email, phone, date, property type, and field lengths. The form only reports success after its configured delivery target accepts the enquiry.

Choose one delivery method in the deployment environment:

- **Webhook:** set `BOOKING_WEBHOOK_URL` to a trusted HTTPS endpoint. The site sends a JSON payload with the submitted fields, timestamp, and source.
- **Email via Resend:** set `RESEND_API_KEY`, `BOOKING_NOTIFICATION_EMAIL`, and `BOOKING_FROM_EMAIL`. Verify the sender domain in Resend before using it. Booking messages are sent as plain text, and replies go to the visitor's email address.

Keep API keys and webhook URLs in Vercel Environment Variables; never expose them with a `NEXT_PUBLIC_` prefix. If booking delivery is not configured, the API returns an error instead of claiming the request was sent.

## Deployment settings

- Set `NEXT_PUBLIC_SITE_URL` to the public site origin when using a custom domain. Otherwise the app uses Vercel's production project domain, Netlify's `URL`, or the canonical `https://vastukavach.vercel.app` fallback.
- The footer's **Message us** link opens WhatsApp chat with the configured number `+971 50 123 4567` and a prefilled English or Arabic message. Override `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel with international digits only (no `+`, spaces, or punctuation) if the business number changes. Set `NEXT_PUBLIC_CONTACT_PHONE` and `NEXT_PUBLIC_CONTACT_EMAIL` only to verified business contact details.
- A `wa.me` link opens a chat; automated bot replies require the business's WhatsApp Business automation or a WhatsApp Business Platform provider. This repository does not contain a bot service or provider credentials.
- Enable Web Analytics in Vercel project settings to view analytics. `@vercel/analytics` loads in production.
- Netlify uses the root `netlify.toml` and Next.js adapter; deploy from the repository root, not a nested duplicate project.

## Technology and design decisions

- **Next.js App Router, React, TypeScript:** one application provides shareable route pages, route-specific metadata, server-rendered content, image optimization, and the booking API.
- **Tailwind CSS:** responsive spacing, type scale, colors, and interaction states are composed directly in the page components.
- **Vercel Web Analytics:** lightweight page views and first-party custom events without another analytics SDK.
- **Resend API or a business webhook:** delivery happens on the server, so provider credentials are not sent to the browser.
- **Local image assets:** avoid third-party image requests at page load and keep the visual presentation consistent.

## Style guide

- Background: warm ivory `#F6F1EA`
- Primary ink: deep burgundy `#3B1220`
- Accent: muted brass `#A57A4A`; pale gold `#D9BF9A`. Use deep bronze `#74512F` for small text and filled buttons on light surfaces to keep contrast readable.
- Display type: Cormorant Garamond (serif)
- Body type: Jost (sans-serif)
- Buttons: compact uppercase labels with generous padding; primary actions use burgundy or brass, secondary actions use a fine outline.
- Logo: a serif K inside a fine double circle with a widely tracked KAVACH wordmark and VASTU CONSULTANCY descriptor.
- Layout: wide margins, restrained borders, editorial serif headings, architectural imagery, and compass details near directional guidance.

The design frames Vastu as a practical spatial lens, with attention to light, orientation, movement, and use. The checker offers general prompts, not a pass/fail judgement or a substitute for reviewing a complete plan with an advisor.

## Images and attribution

The image files were supplied as local project assets without source URLs, photographer names, or license details. Their origins cannot be verified from the repository, so no Unsplash or Pexels attribution is claimed here. Confirm the source and usage rights for every file in `public/images/`, then add the provider, creator, and source link before public submission. Replace any image whose source or license cannot be confirmed.

## Founder profile

The founder section currently uses initials because no portrait was included with the project. The repository also does not include verified qualifications, years of experience, languages, or a LinkedIn profile URL. Add confirmed details in the `founder` object in `components/founder.tsx`; do not publish placeholder credentials.

## AI use

AI assistance was used to review the assignment, draft and refine site copy, and implement and document the website features. Review all copy, image rights, business details, and booking delivery settings with the business owner before launch.

## Further improvements

Confirm the approved founder profile and image sources, connect booking delivery to the business's CRM or scheduling workflow, publish a CMS-backed journal, and review the deployed pages with mobile accessibility and performance checks.
