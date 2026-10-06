# Kavach Consultancy

Responsive marketing website for Kavach Consultancy & Marketing LLC, a Dubai-based spatial advisory firm founded by Vedang Joshi.

## Run locally

1. Install Node.js 20.9 or newer.
2. Copy `.env.example` to `.env.local` and set the deployment URL, verified contact details, and booking webhook.
3. Install dependencies with `npm install`.
4. Start the local site with `npm run dev`, then open `http://localhost:3000`.
5. Create a production build with `npm run build` and serve it with `npm start`.

The booking form validates required fields in the browser and again on the server. It sends a JSON POST to `BOOKING_WEBHOOK_URL`; the form only displays success after that destination accepts the submission. The payload contains the form fields plus `submittedAt` and `source`. Configure a trusted webhook before deployment. If it is not configured, the form explains that online booking is not yet available.

Set `NEXT_PUBLIC_SITE_URL` to the canonical public origin so the sitemap and robots file point to the deployed site. Set any real contact channels using `NEXT_PUBLIC_CONTACT_PHONE`, `NEXT_PUBLIC_CONTACT_EMAIL`, and `NEXT_PUBLIC_WHATSAPP_NUMBER` (international digits, without `+`). No sample phone number or email address is displayed when these values are missing.

## Pages

- Home
- About
- Services, with residential, workplace, and development detail pages
- Journal
- Contact
- Bookings

## Tech stack

Next.js App Router, React, TypeScript, and Tailwind CSS. Next.js provides route-level metadata, sitemap and robots routes, server-rendered pages, and the booking API in one deployable application. Local image assets avoid external image requests at page load. The form endpoint can deliver enquiries to a business-owned webhook without requiring a third-party form service in the browser.

## Design guide

- Background: warm ivory `#F6F1EA`
- Primary ink: deep burgundy `#3B1220`
- Accent: muted brass `#A57A4A`; pale gold `#D9BF9A`
- Display type: Cormorant Garamond
- Body type: Jost
- Buttons: compact uppercase labels with generous padding; primary actions use burgundy or brass, secondary actions use a thin outline
- Logo: a serif K inside a fine double circle, paired with a widely tracked KAVACH wordmark and VASTU CONSULTANCY descriptor
- Layout: wide margins, restrained borders, editorial serif headings, and large architectural imagery

The design treats Vastu as a practical spatial lens, with attention to light, orientation, movement and use. It avoids predictive or fear-based claims. Reduced-motion preferences are respected, images include descriptive alt text where they convey information, and the navigation and forms work with keyboard input.

## SEO and accessibility

Each page has a distinct title and description, Open Graph metadata, and a canonical path. The site publishes `sitemap.xml`, `robots.txt`, and LocalBusiness structured data identifying Dubai as the service area. The booking endpoint validates submissions before forwarding them.

## Images and attribution

The image files were present in the local project copied for this assignment, but their original source URLs and credit details were not included. Confirm the license and required attribution for each file in `public/images/` before public deployment, then add those credits here or in a visible image-credit page. Do not describe the imagery as royalty-free until that check is complete.

## AI use

AI assistance was used to review the assignment, shape page copy and structure, and update the implementation. Review all copy, image rights, business contact details, and booking delivery settings with the client before launch.

## One more week

With another week, I would confirm the reference site's visual details and approved brand assets with the client, verify image licenses, connect the booking webhook to the client's actual scheduling or CRM workflow, publish a small CMS-backed article collection, and run mobile Lighthouse and accessibility reviews against the deployed domain.
