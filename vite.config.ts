import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Social-share images and canonical links need absolute URLs.
 * Build with your live address:  SITE_URL=https://yourdomain.com npm run build
 * Without it the tags keep relative paths (fine for local preview).
 */
function siteUrl(): Plugin {
  const base = (process.env.SITE_URL ?? '').replace(/\/$/, '')
  return { name: 'site-url', transformIndexHtml: (html) => {
      // Without a real address a canonical link would be wrong, so leave it out.
      const out = base ? html : html.replace(/\s*<link rel="canonical"[^>]*>\n?/, '\n')
      return out.replaceAll('__SITE_URL__', base)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrl()],
})
