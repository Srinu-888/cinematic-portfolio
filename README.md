# Srinivasa Reddy Mithana: Cinematic Automation Portfolio

A premium black-and-gold cinematic portfolio built with **React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion and Lenis**.
Design language follows the second reference project (gold-gradient Bebas Neue headlines, corner brackets, scroll-stacked project cards, bento skills grid, scroll-drawn timeline), rebuilt around your own photos, certificate and résumé.

## Run it

```bash
npm install
npm run dev        # local development
npm run build      # type-check + production build into /dist
npm run preview    # serve the production build locally
```

Requires Node.js 20 or newer. A ready-built `dist/` folder is also included for instant deployment (Netlify, Vercel, Cloudflare Pages, GitHub Pages or any static host).

## Where to edit things

| What | Where |
| --- | --- |
| All text: bio, projects, skills, experience, contact details | `src/data/content.ts` |
| Colours, fonts, global effects | `src/index.css` (`@theme` block at the top) |
| Photos, certificate and Arcenvo logo | `src/assets/` |
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
- Selected Works as a sticky card stack on desktop, plain stacked cards on mobile and tablet
- Skills bento grid with cursor-following spotlight
- Experience timeline whose gold line draws as you scroll
- Credentials: tilting certificate, full-size lightbox, copy-ID button, PDF download
- Contact form that emails the message straight to your inbox (via FormSubmit), with an email-app / WhatsApp fallback if sending fails
- Founder section for Arcenvo Technologies Private Limited (coming soon), also shown in About and the experience timeline

## Receiving contact-form emails (one-time setup)

The form sends each message to `mithanasrinivas888@gmail.com` through [FormSubmit](https://formsubmit.co), a free service that needs no account or code.

1. Deploy the site (the form only works from the live site, not from a double-clicked file).
2. Submit the form once yourself.
3. FormSubmit emails an **activation message** to that Gmail address. Click the activation button (check Spam/Promotions if you do not see it).
4. From then on every submission arrives in your inbox, with the visitor's address set as Reply-To.

To change the receiving address or switch service, edit `formEndpoint` in `src/data/content.ts`.

## Accessibility and performance

- Keyboard focus rings, skip link, ARIA labels, dialog semantics for the lightbox
- `prefers-reduced-motion` respected (no intro, no smooth scroll, no particles, static marquee)
- Fonts are self-hosted (no Google Fonts requests); images are WebP (about 330 KB total)
- Responsive from 320 px phones to wide desktops, no horizontal overflow

## Before you publish: please review

1. **Projects** are described at a general level with no client data, credentials or internal links. Confirm your employer is comfortable with them being public and edit or remove any in `src/data/content.ts`.
2. **Contact details** shown publicly: email, call number (+966), WhatsApp number (+91) and LinkedIn. Remove any you do not want listed.
3. **Arcenvo**: the section says "coming soon" and uses only the tagline from your logo. Update `venture` in `content.ts` when you launch.
4. The hero image is your original photo with the background removed (cut-out) so it can sit on the black stage; the untouched original is in `source-assets/`.
5. When deploying, update the `<title>` and add an `og:image` and `og:url` in `index.html` once you have the live URL.
