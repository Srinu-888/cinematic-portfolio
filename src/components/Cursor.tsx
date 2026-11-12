import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { prefersReducedMotion } from '../hooks/useMediaQuery'

type Mode = 'idle' | 'link' | 'view' | 'text'

/**
 * Cinematic cursor: a precise dot plus a trailing ring that swells over interactive elements.
 * Only mounts on fine-pointer, hover-capable devices. Position uses motion values (no re-renders).
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState<Mode>('idle')
  const [hidden, setHidden] = useState(true)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.5 })
  const ry = useSpring(y, { stiffness: 380, damping: 30, mass: 0.5 })

  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setEnabled(true)
    document.documentElement.classList.add('has-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setHidden(false)
    }
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null
      if (!t?.closest) return
      if (t.closest('input, textarea')) setMode('text')
      else if (t.closest('[data-cursor="view"]')) setMode('view')
      else if (t.closest('a, button, [role="button"], [data-cursor]')) setMode('link')
      else setMode('idle')
    }
    const leave = () => setHidden(true)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  const ring =
    mode === 'view'
      ? { width: 88, height: 88, backgroundColor: 'rgba(212,175,55,0.16)', borderColor: 'rgba(212,175,55,0.9)' }
      : mode === 'link'
        ? { width: 58, height: 58, backgroundColor: 'rgba(212,175,55,0.1)', borderColor: 'rgba(212,175,55,0.85)' }
        : { width: 34, height: 34, backgroundColor: 'rgba(212,175,55,0)', borderColor: 'rgba(235,215,195,0.45)' }

  const show = !hidden && mode !== 'text'

  return (
    <>
      <motion.div aria-hidden style={{ x: rx, y: ry }} className="pointer-events-none fixed left-0 top-0 z-[120]">
        <motion.div
          animate={{ ...ring, opacity: show ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border backdrop-blur-[1px]"
        >
          <span
            className={`font-mono text-[9px] tracking-[0.25em] text-champagne transition-opacity duration-200 ${mode === 'view' ? 'opacity-100' : 'opacity-0'}`}
          >
            VIEW
          </span>
        </motion.div>
      </motion.div>
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[121]">
        <div
          className={`-translate-x-1/2 -translate-y-1/2 h-[6px] w-[6px] rounded-full bg-champagne shadow-[0_0_10px_rgba(212,175,55,0.9)] transition-opacity duration-200 ${show && mode !== 'view' ? 'opacity-100' : 'opacity-0'}`}
        />
      </motion.div>
    </>
  )
}
