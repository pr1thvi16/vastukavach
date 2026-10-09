# Kavach Consultancy

A responsive English/Arabic website for Kavach Consultancy & Marketing LLC, a Dubai-based advisory practice focused on practical Vastu guidance and property selection.

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
| `/blogs` | Journal index |
| `/blogs/what-vastu-is-and-is-not` | A grounded introduction to Vastu |
| `/blogs/choosing-a-home-that-feels-right` | A practical home-viewing checklist |
| `/blogs/well-oriented-workplace` | Workplace layout, focus and circulation |
| `/bookings` | Consultation enquiry form |
| `/contact` | Phone, email, WhatsApp, address and enquiry form |
| `/vastu-checker` | Interactive Vastu and property guidance checker |

## Features and design decisions

- **Framework:** Next.js App Router, React and TypeScript, with Tailwind CSS for responsive styling.
- **Visual identity:** Warm ivory, deep burgundy and muted gold, with Cormorant Garamond headings and Jost body text.
- **Responsive UX:** Mobile-first navigation, consistent spacing, keyboard focus states and optimised local images.
- **Bilingual experience:** English/Arabic toggle with right-to-left layout support.
- **Interactive journey:** Homepage guidance changes based on visitor choices and provides a relevant next step.
- **Vastu checker:** Interactive questions and multi-select priorities that guide visitors towards relevant services.
- **Journal:** Three articles with their own URLs and metadata.
- **Contact options:** Booking and contact forms, phone/email links, and WhatsApp click-to-chat with topic selection.
- **SEO:** Route-specific metadata, canonical URLs, Open Graph tags, sitemap, robots rules and LocalBusiness structured data.
- **Analytics:** Vercel Web Analytics and GA4 events for key interactions.

## Contact details

The current defaults use the contact details recorded in the project audit:

- Main phone / WhatsApp: **+971 56 452 7299**
- Alternate phone: **+971 52 922 8629**
- General email: **info@kavachconsultancy.com**
- Founder email: **vedang@kavachconsultancy.com**
- Address: Bur Dubai, behind ADCB Bank, Dubai, United Arab Emirates

Confirm all details with the business owner before final public handoff. Use the `NEXT_PUBLIC_CONTACT_*` and `NEXT_PUBLIC_WHATSAPP_NUMBER` environment variables if the client provides approved alternatives.

## Booking delivery and recovery

The browser form and `/api/bookings` validate the enquiry fields. The API is configured to insert accepted requests into `public.booking_enquiries` through the Supabase Data API and can use optional webhook or email fallbacks.

**Database setup:** Open the correct Supabase project, go to **SQL Editor**, run `supabase/schema.sql`, and confirm that `booking_enquiries` appears in **Table Editor**. The schema uses row-level security and is designed to allow anonymous visitors to insert permitted fields without public read/update/delete access.

Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the deployment environment. The publishable key is public by design; it does not replace the database's row-level security policy.

Optional fallbacks:

- **Webhook:** `BOOKING_WEBHOOK_URL` sends the enquiry to a trusted HTTPS endpoint.
- **Resend:** `RESEND_API_KEY`, `BOOKING_NOTIFICATION_EMAIL` and `BOOKING_FROM_EMAIL` enable email notifications after sender-domain verification.

If online submission fails, the form can offer prefilled email and WhatsApp alternatives. These alternatives require the visitor to press Send in their own app and do not mean that the database saved the enquiry.

**Live verification required:** Submit a test enquiry on the public site and confirm that a row appears in Supabase before claiming the live booking flow is fully verified.

## Analytics and deployment

- Production URL: [https://vastukavach.vercel.app](https://vastukavach.vercel.app)
- Vercel Web Analytics is configured for production.
- GA4 measurement ID defaults to `G-B2ZGT4M6HT`; override it with `NEXT_PUBLIC_GA_ID` if required.
- Set `NEXT_PUBLIC_SITE_URL` if the public domain changes.
- WhatsApp click-to-chat opens a conversation; automated replies require separate WhatsApp Business automation/provider configuration.

## Lighthouse results

Latest mobile Lighthouse run shared for the Home page (Moto G Power emulation, slow 4G; captured 9 October 2026):

| Metric | Result |
| --- | ---: |
| Performance | 52/100 |
| First Contentful Paint (FCP) | 3.4 s |
| Largest Contentful Paint (LCP) | 5.2 s |
| Total Blocking Time (TBT) | 800 ms |
| Cumulative Layout Shift (CLS) | 0 |
| Speed Index | 4.8 s |

These are the latest reported mobile results, not a claim that the page has passed performance targets. Re-run Lighthouse against the deployed Home page after the latest changes, and include screenshots of the complete **Mobile** report (Performance score and metrics) in the assignment email. The report should show the tested URL and test conditions. Keep the new screenshots with the submission rather than relying on older local-build scores.

## LocalBusiness structured data

The root layout includes business details and contact information in structured data. Confirm the address, phone, email, founder details and any social profile with the business owner. Only add official social URLs that have been verified.

## Image credits and licensing

The original source, photographer and licence for some existing local images are not recorded in the repository. They are marked **Unverified** below rather than being attributed to Unsplash or Pexels without evidence. Verify each asset's licence and record the actual source before final handoff; replace images whose usage rights cannot be confirmed.

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

The About page uses the founder portrait at `public/images/founder.webp`. Confirm the portrait rights, biography and any additional qualifications with the business owner before final handoff.

## Future improvements

With one additional week of development, I would strengthen the site by verifying and documenting the usage rights for every image, expanding the journal with more practical Vastu articles and improving the content-management workflow so the business can update articles, testimonials and FAQs without changing code. I would also connect booking enquiries to the client's preferred CRM or email workflow with reliable confirmation messages, add automated tests for the booking API and form, and run Lighthouse checks as part of the deployment process. These improvements would make the website easier to maintain, more trustworthy for visitors and more reliable for turning enquiries into consultations.

## AI use

ChatGPT was used to help review the assignment requirements, draft and refine website copy and documentation, implement/refactor components, and diagnose the booking API. Changes were reviewed against the project requirements and available test/deployment evidence. Contact details, image rights, database setup and final live form behaviour still require owner verification.

## Remaining handoff checks

1. Confirm the phone numbers, emails, address and founder portrait/logo publication rights with the business owner.
2. Submit a test enquiry and verify that it is saved in Supabase.
3. Run Lighthouse against the live site and save fresh mobile screenshots.
4. Verify image usage rights and record the real photographer/source/licence, or replace uncleared images.
5. Confirm official social profile URLs before adding them to structured data.
