# Srinivasa Reddy Mithana: Cinematic Automation Portfolio

A premium black-and-gold cinematic portfolio built with **React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion and Lenis**.
Design language follows the second reference project (gold-gradient Bebas Neue headlines, corner brackets, scroll-stacked project cards, bento skills grid, scroll-drawn timeline), rebuilt around your own photos, certificate and résumé.

## Run it

Use a **new, empty folder** for each release: extract the ZIP there, then run the commands below. Do not copy it over an older folder (old `node_modules` and `package.json` cause confusing install results). Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # local development
npm run build      # type-check + production build into /dist
SITE_URL=https://yourdomain.com npm run build   # same, with absolute URLs for link previews
npm run preview    # serve the production build locally
```

Requires Node.js 20 or newer. A ready-built `dist/` folder is also included for instant deployment (Netlify, Vercel, Cloudflare Pages, GitHub Pages or any static host).

## Where to edit things

| What | Where |
| --- | --- |
| Projects, companies, case study, services, FAQ, work-with-me cards | `src/data/content.ts` (`projects`, `companies`, `caseStudyCopy`, `servicesCopy`, `processCopy`, `hireCopy`, `faq`) |
| All text: bio, projects, skills, experience, contact details | `src/data/content.ts` |
| Colours, fonts, global effects | `src/index.css` (`@theme` block at the top) |
| Photos, certificate, dashboard and menu screenshots, Arcenvo logo | `src/assets/` |
| Résumé and certificate downloads | `public/resume.pdf`, `public/Zoho-Creator-Developer-Associate-Certificate.pdf` |
| Tab icon | `public/favicon.svg` |
| SEO title, description, structured data | `index.html` |

`source-assets/` holds your original photos, the certificate PDF and the transparent hero cut-out, in case you want to re-edit them.

## What is in the experience

- Title-sequence intro (plays once per browser session, skipped for reduced-motion users)
- Hero with stage lighting, gold-dust particles, cursor parallax and a rotating certification seal
- Smooth inertial scrolling, scroll progress bar, auto-hiding navigation with scroll-spy, full-screen mobile menu
- Custom cursor on desktop (swells over links, shows "VIEW" on the certificate)
- About with 3D-tilt portrait and count-up stats
- Projects: 15 projects grouped by company and industry (FFICO, Hallek, Jio Financial Services via Transform Hub, Lucky-Tech, Artmac Soft). Filter by company, animated process-flow steppers, company intro panels with website links, and jump links from the Experience timeline
- Case study: the largest application's live menu (English and Arabic) and the Sales Pipeline widget dashboard, in one tabbed section with a full-size lightbox
- Rolling industry headline in the hero (Enterprise, Finance, Fleet, HR, Factory), scroll-reactive marquee, and a right-edge section navigator
- Skills bento grid with cursor-following spotlight
- Experience timeline whose gold line draws as you scroll
- Credentials: tilting certificate, full-size lightbox, copy-ID button, PDF download
- Services (what I build) and how we work together
- Work With Me: separate paths for companies and for recruiters, plus an FAQ
- Floating WhatsApp button that appears after the hero, and a "Hire me" button in the navigation
- WhatsApp-only contact form (opens WhatsApp with the message pre-filled)
- Founder section for Arcenvo Technologies Private Limited, currently **hidden**. Set `showVenture = true` in `src/data/content.ts` to show the section, the About pill and the timeline entry

## Contact form

The form is WhatsApp-only. It opens WhatsApp with the visitor's message pre-filled, addressed to the number in `profile.whatsapp` (`src/data/content.ts`). There is no email sending, no third-party service and nothing to activate.

## Getting found and shared

- `public/og-image.png` is the preview card shown when the link is pasted into WhatsApp, LinkedIn or X. Build with `SITE_URL=https://yourdomain.com npm run build` so the preview uses your real address (social apps need absolute URLs).
- `index.html` carries the search title and description, canonical link and structured data (name, role, certification, LinkedIn).
- `public/robots.txt` allows search engines. After you publish, also add the site to Google Search Console and put the link in your LinkedIn profile.

## Go-live checklist

1. `npm install` then `SITE_URL=https://yourdomain.com npm run build`, and upload the `dist/` folder to your host (Netlify, Vercel, Cloudflare Pages or GitHub Pages all work).
2. Open the live address on your phone and desktop; click Start a project and Message on WhatsApp once to confirm the message reaches +91 88860 69026.
3. Paste the link into WhatsApp or LinkedIn and confirm the preview card (photo, name and role) appears. If an old preview is cached, use LinkedIn's Post Inspector to refresh it.
4. Add the live address to your LinkedIn profile, your email signature and your résumé.
5. Add the site to Google Search Console so it is indexed.
6. Re-check the points under "Before you publish" below (public project descriptions, dashboard data, contact details).

## Accessibility and performance

Audited before release: axe-core reports zero WCAG A/AA issues, and Lighthouse scores 100 for accessibility, best practices and SEO. Performance is 88 on the desktop profile; on Lighthouse's throttled phone profile it is lower (about 55 to 60) because the page is animation-rich.
- Sections below the hero are loaded as separate chunks right after first paint.
- The title-sequence intro plays on desktop only; phones and reduced-motion users see the hero immediately.
- Costly effects (blend-mode grain, animated blur filters, endless glow pulses) were removed or limited to desktop.

- Keyboard focus rings, skip link, ARIA labels, dialog semantics for the lightbox
- `prefers-reduced-motion` respected (no intro, no smooth scroll, no particles, static marquee)
- Fonts are self-hosted (no Google Fonts requests); images are WebP (about 330 KB total)
- Responsive from 320 px phones to wide desktops, no horizontal overflow

## Before you publish: please review

1. **Projects** describe work for several employers and clients. Confirm each is fine to show publicly. FFICO and Jio Financial Services descriptions stay at a general level with no client data. Edit or remove any entry in `projects` (`src/data/content.ts`).
2. **Contact details** shown publicly: email, call number (+966), WhatsApp number (+91) and LinkedIn. Remove any you do not want listed.
3. **Arcenvo**: hidden for now. When the company is registered, set `showVenture = true` and update `venture` in `content.ts`.
4. The hero image is your original photo with the background removed (cut-out) so it can sit on the black stage; the untouched original is in `source-assets/`.
5. **Dashboard screenshots** show real lead data. Personal names are painted over in the published copies (originals with redactions are in `source-assets/dashboard-screenshots/`). Confirm your employer is comfortable with the figures being public, or swap in sample data.
6. **Testimonials**: none are included because none were provided. Client or manager recommendations (for example from LinkedIn) are the strongest next addition.
7. When deploying, build with `SITE_URL` set so link previews work.
