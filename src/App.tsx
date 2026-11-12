import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import heroCutout from './assets/hero-cutout.webp'
import { Cursor } from './components/Cursor'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { Marquee } from './components/Marquee'
import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { SectionDots } from './components/SectionDots'
import { SmoothScroll } from './components/SmoothScroll'
import { prefersReducedMotion } from './hooks/useMediaQuery'
import { useScroller } from './hooks/useScroller'
import { WhatsAppFab } from './components/WhatsAppFab'
import { showVenture } from './data/content'

const SEEN_KEY = 'mithana-intro-seen'

// Everything below the hero loads as separate chunks, so the first screen paints sooner.
// Components are held in state (not React.lazy) so they mount in the same render as the scroll-spy observers.
const loadSections = async () => {
  const [about, services, projects, caseStudy, skills, experience, credentials, hire, venture, contact] = await Promise.all([
    import('./components/About'),
    import('./components/Services'),
    import('./components/Projects'),
    import('./components/CaseStudy'),
    import('./components/Skills'),
    import('./components/Experience'),
    import('./components/Credentials'),
    import('./components/Hire'),
    import('./components/Venture'),
    import('./components/Contact'),
  ])
  return {
    About: about.About,
    Services: services.Services,
    Projects: projects.Projects,
    CaseStudy: caseStudy.CaseStudy,
    Skills: skills.Skills,
    Experience: experience.Experience,
    Credentials: credentials.Credentials,
    Hire: hire.Hire,
    Venture: venture.Venture,
    Contact: contact.Contact,
  }
}
type Sections = Awaited<ReturnType<typeof loadSections>>

const loadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = src
  })

type IdleWindow = { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void }

/** Runs `fn` when the browser is idle (falls back to a short timeout). Returns a canceller. */
function whenIdle(fn: () => void) {
  const w = window as unknown as IdleWindow
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(fn, { timeout: 1200 })
    return () => w.cancelIdleCallback?.(id)
  }
  const id = window.setTimeout(fn, 150)
  return () => window.clearTimeout(id)
}

/** Freezes scrolling while the intro plays (works with or without Lenis). */
function ScrollLock({ locked }: { locked: boolean }) {
  const { stop, start } = useScroller()
  useEffect(() => {
    document.documentElement.style.overflow = locked ? 'hidden' : ''
    if (locked) stop()
    else start()
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [locked, stop, start])
  return null
}

export default function App() {
  const seen = useMemo(() => {
    // Skip the title sequence for reduced-motion users and on phones, where speed matters more than ceremony.
    if (prefersReducedMotion() || window.matchMedia('(max-width: 767px)').matches) return true
    try {
      return sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      return false
    }
  }, [])
  const [ready, setReady] = useState(seen)
  const [done, setDone] = useState(seen)
  const preload = useMemo(() => loadImage(heroCutout), [])
  const [sections, setSections] = useState<Sections | null>(null)
  const sectionsReady = sections !== null

  // Fetch the section chunks right after first paint (idle time), then mount them.
  useEffect(() => {
    let alive = true
    const cancel = whenIdle(() =>
      loadSections().then((m) => {
        if (alive) setSections(m)
      }),
    )
    return () => {
      alive = false
      cancel()
    }
  }, [])

  const finish = () => {
    setDone(true)
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      /* private mode: intro simply replays next visit */
    }
  }

  return (
    <SmoothScroll>
      <ScrollLock locked={!done} />
      <a
        href="#about"
        className="fixed left-4 top-4 z-[130] -translate-y-20 bg-gilt px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="grain" aria-hidden />
      <ScrollProgress />
      <WhatsAppFab />
      <SectionDots sectionsReady={sectionsReady} />
      <Cursor />
      <Navbar ready={ready} sectionsReady={sectionsReady} />
      <main className="w-full bg-black">
        <Hero ready={ready} />
        <Marquee />
        {sections && (
          <>
            <sections.About />
            <sections.Services />
            <sections.Projects />
            <sections.CaseStudy />
            <sections.Skills />
            <sections.Experience />
            <sections.Credentials />
            <sections.Hire />
            {showVenture && <sections.Venture />}
          </>
        )}
      </main>
      {sections && <sections.Contact />}
      <AnimatePresence>{!done && <Loader preload={preload} onReveal={() => setReady(true)} onDone={finish} />}</AnimatePresence>
    </SmoothScroll>
  )
}
