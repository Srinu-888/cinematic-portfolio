import { useEffect, useMemo, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from '../hooks/useMediaQuery'
import { ScrollContext, nativeScroll, type ScrollApi } from '../hooks/useScroller'

/** Global Lenis instance + in-page anchor handling. Disabled for reduced-motion users. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  const api = useMemo<ScrollApi>(
    () => ({
      scrollTo: (target) => {
        const lenis = lenisRef.current
        if (!lenis) return nativeScroll.scrollTo(target)
        lenis.scrollTo(target as never, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 4) })
      },
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [],
  )

  useEffect(() => {
    if (prefersReducedMotion()) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 0.95, touchMultiplier: 1.6 })
    lenisRef.current = lenis

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''
      if (href === '#' || href === '#home') {
        e.preventDefault()
        api.scrollTo(0)
        return
      }
      const el = document.querySelector<HTMLElement>(href)
      if (el) {
        e.preventDefault()
        api.scrollTo(el)
        history.replaceState(null, '', href)
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [api])

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}
