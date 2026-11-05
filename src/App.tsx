import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import heroCutout from './assets/hero-cutout.webp'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Credentials } from './components/Credentials'
import { Cursor } from './components/Cursor'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Loader } from './components/Loader'
import { Marquee } from './components/Marquee'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { ScrollProgress } from './components/ScrollProgress'
import { SmoothScroll } from './components/SmoothScroll'
import { prefersReducedMotion } from './hooks/useMediaQuery'
import { useScroller } from './hooks/useScroller'
import { Skills } from './components/Skills'

const SEEN_KEY = 'mithana-intro-seen'

const loadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = img.onerror = () => resolve()
    img.src = src
  })

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
    if (prefersReducedMotion()) return true
    try {
      return sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      return false
    }
  }, [])
  const [ready, setReady] = useState(seen)
  const [done, setDone] = useState(seen)
  const preload = useMemo(() => loadImage(heroCutout), [])

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
      <Cursor />
      <Navbar ready={ready} />
      <main className="w-full bg-black">
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Credentials />
      </main>
      <Contact />
      <AnimatePresence>{!done && <Loader preload={preload} onReveal={() => setReady(true)} onDone={finish} />}</AnimatePresence>
    </SmoothScroll>
  )
}
