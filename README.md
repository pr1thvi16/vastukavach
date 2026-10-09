# Kavach Consultancy

A responsive English/Arabic website for Kavach Consultancy & Marketing LLC, a Dubai-based advisory practice covering practical Vastu, Vedic Astrology/Kundli, numerology and property-selection guidance.

## Local setup

Requirements: Node.js 20.9 or newer.

1. Copy `.env.example` to `.env.local`.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev` and open `http://localhost:3000`.
4. Run a production build with `npm run build`, then serve it with `npm start`.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home, personalised journey guide, services and customer reviews |
| `/about` | Approach and founder profile |
| `/services` | Services index |
| `/services/residential` | Residential advice |
| `/services/workplace` | Workplace advice |
| `/services/development` | Development and project advice |
| `/blogs` | Journal index with accessible article links |
| `/blogs/what-vastu-is-and-is-not` | A grounded introduction to Vastu |
| `/blogs/choosing-a-home-that-feels-right` | A practical home-viewing checklist |
| `/blogs/well-oriented-workplace` | Workplace layout, focus and circulation |
| `/bookings` | Consultation enquiry form |
| `/contact` | Phone, email, WhatsApp, address and enquiry form |
| `/vastu-checker` | Multi-select checker for Vastu, numerology, Vedic Astrology/Kundli and property-selection interests |

## Features and design decisions

- Next.js App Router, React and TypeScript; Tailwind CSS for responsive layout, spacing and states.
- Warm ivory, deep burgundy and muted-gold palette; Cormorant Garamond display type and Jost body text.
- Responsive navigation, keyboard focus states, local image assets, and `next/image` for optimized image delivery.
- English/Arabic toggle with right-to-left layout and translated checker, contact, booking recovery and journal content.
- Interactive homepage journey that changes its guidance and next-step link based on the visitor's choices.
- Vastu checker with multi-select improvement priorities and service interests: Vastu, numerology, Vedic Astrology/Kundli, and property selection.
- Three full journal articles with their own URLs, metadata and sitemap entries; cards link directly to each article and do not rely on hover for access.
- WhatsApp click-to-chat links with English/Arabic messages and a floating topic chooser.
- LocalBusiness structured data, route metadata, canonical URLs, Open Graph, sitemap and robots rules.
- Vercel Web Analytics plus GA4 events for booking, consultation, WhatsApp, language and checker interactions.

## Contact details

The current defaults use the contact details listed in the supplied audit brief:

- Main phone / WhatsApp: **+971 56 452 7299**
- Alternate phone: **+971 52 922 8629**
- General email: **info@kavachconsultancy.com**
- Founder email: **vedang@kavachconsultancy.com**
- Address: Bur Dubai, behind ADCB Bank, Dubai, United Arab Emirates

Confirm all contact details with the business owner before final public handoff. Override these defaults using the `NEXT_PUBLIC_CONTACT_*` and `NEXT_PUBLIC_WHATSAPP_NUMBER` variables if the client supplies approved alternatives. Placeholder values from the previous build are ignored by the default contact helper.

## Booking delivery and recovery

The browser form and `/api/bookings` validate name, email, phone, date, contact method, best contact time, property type and message length. The API inserts accepted requests into `public.booking_enquiries` through the Supabase Data API and logs a status/error code (without logging the visitor's personal submission) when Supabase rejects an insert.

**One-time database setup is required:** open the correct Supabase project, go to **SQL Editor**, run `supabase/schema.sql`, then confirm that `booking_enquiries` appears in **Table Editor**. The migration enables row-level security, gives anonymous visitors insert-only access to the allowed fields and does not grant public read/update/delete access. If a table or policy already exists, re-run the idempotent schema script to align the policy and grants.

Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel Production (and Preview as appropriate). The publishable key is public by design; it is not a replacement for the database's row-level security policy. A successful insert is the primary source of truth.

Optional server-side fallbacks:

- **Webhook:** `BOOKING_WEBHOOK_URL` sends the enquiry to a trusted HTTPS endpoint.
- **Resend:** `RESEND_API_KEY`, `BOOKING_NOTIFICATION_EMAIL` and `BOOKING_FROM_EMAIL` send an email. Verify the sender domain in Resend first.

If the database insert fails, the API attempts a configured webhook or Resend delivery before returning an error. If the API still cannot accept the form, the browser preserves the entered values and offers prefilled direct email and WhatsApp alternatives. These alternatives require the visitor to press Send in their mail or messaging app; they do not claim the database saved the request.

**Live verification still required:** submit a test enquiry on the public site and confirm that a row appears in Supabase. If it fails, check the Vercel Function logs for the Supabase error code; the code distinguishes a missing table, row-level-security/permission problem, invalid key or unavailable endpoint. The connected Vercel account did not provide the permission needed to inspect production runtime logs during this update, so no successful live insert is claimed here.

## Analytics and deployment

- Production host: `https://vastukavach.vercel.app`.
- Vercel Web Analytics loads in production.
- GA4 uses measurement ID `G-B2ZGT4M6HT` by default; override with `NEXT_PUBLIC_GA_ID` if needed.
- `NEXT_PUBLIC_SITE_URL` may be set when the site uses a different public domain.
- A WhatsApp link opens chat; automated replies require separate WhatsApp Business automation/provider configuration.

## Lighthouse results

The submitted local production-build audit reported the following scores. These are **local results, not a fresh measurement of the live URL**; run Lighthouse against the deployed site and save screenshots before submission.

| Page | Mobile Performance | Accessibility |
| --- | ---: | ---: |
| Home | 93 | 96 |
| About | 94 | 96 |
| Contact | 95 | 96 |
| Services | 99 | 100 |

The audit reported SEO 100 across routes. Re-run all scores after deployment, especially after the contact, blog and booking changes.

## LocalBusiness structured data

The root layout includes the business name, founder, service area, street address, telephone, email and contact points. The founder's LinkedIn profile is used as a verifiable `sameAs` link. An official Instagram profile was not independently verified during this update, so an Instagram URL has not been guessed; add the confirmed company profile to `sameAs` before handoff.

## Image credits and licensing

The following are existing local assets. Their original source/photographer/license is not present in the repository, so they are deliberately marked **Unverified** rather than attributing them to Unsplash or Pexels without evidence. Verify the licence and add each real source link before handing the site to the client; replace assets whose rights cannot be confirmed.

| File | Photographer / provider | Source link | Licence status |
| --- | --- | --- | --- |
| `bright-living.jpg` | Unverified | Not recorded | **Unverified — needs review** |
| `calm-corner.jpg` | Unverified | Not recorded | **Unverified — needs review** |
| `dubai-skyline.jpg` | Unverified | Not recorded | **Unverified — needs review** |
| `founder.webp` | Founder portrait supplied in project | Original source not recorded | Confirm publication approval |
| `garden-house.jpg` | Unverified | Not recorded | **Unverified — needs review** |
| `hero-villa.jpg` | Unverified | Not recorded | **Unverified — needs review** |
| `kavach-hero.png` | Unverified | Not recorded | **Unverified — needs review** |
| `kavach-logo.png` | Brand logo supplied in project | Brand asset | Confirm publication approval |
| `living-greenery.jpg` | Unverified | Not recorded | **Unverified — needs review** |
| `timber-house.jpg` | Unverified | Not recorded | **Unverified — needs review** |
| `villa-pool.jpg` | Unverified | Not recorded | **Unverified — needs review** |
| `warm-lounge.jpg` | Unverified | Not recorded | **Unverified — needs review** |
| `workplace.jpg` | Unverified | Not recorded | **Unverified — needs review** |

## Founder profile

The About page uses the founder portrait in `public/images/founder.webp`. The repository contains a LinkedIn profile URL for Vedang Joshi, but no verified credentials have been added beyond the published founder copy. Confirm the portrait rights, biography and any additional qualifications with the business owner.

## AI use

ChatGPT was used to help review the assignment requirements, draft and refine website copy and documentation, implement/refactor components, and diagnose the booking API. The code and copy were reviewed against the repository and deployment evidence. Contact details, image rights, the database setup and final live form behaviour still require owner verification.

## Remaining handoff checks

1. Confirm the phone numbers/emails and founder portrait/logo publication rights with the business owner.
2. Run `supabase/schema.sql` in the correct Supabase project, submit a real test enquiry, and verify the row is stored.
3. Re-run Lighthouse against the live site and save fresh screenshots.
4. Verify image usage rights and add the actual photographer/source/licence or replace any image that cannot be cleared.
5. Add the official Instagram URL only after the business owner confirms it.
