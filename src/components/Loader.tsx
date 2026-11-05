import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { prefersReducedMotion } from '../hooks/useMediaQuery'

const EASE = [0.76, 0, 0.24, 1] as const

interface Props {
  /** Resolves when critical hero imagery has decoded (so the reveal never shows a blank stage). */
  preload: Promise<unknown>
  /** Curtain starts lifting: begin hero animation. */
  onReveal: () => void
  /** Curtain fully gone: unmount. */
  onDone: () => void
}

/** Title-sequence intro: counter, gold hairline, split-curtain reveal. ~2.2s, skipped on repeat visits. */
export function Loader({ preload, onReveal, onDone }: Props) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'count' | 'fade' | 'open'>('count')
  const revealed = useRef(false)

  useEffect(() => {
    const duration = prefersReducedMotion() ? 250 : 1700
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 2.2)
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(tick)
      else preload.finally(() => setPhase('fade'))
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [preload])

  const open = phase === 'open'
  const panel = { duration: 1, ease: EASE }

  return (
    <div className="fixed inset-0 z-[100]" role="status" aria-label="Loading portfolio">
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 bg-ink"
        initial={{ y: 0 }}
        animate={{ y: open ? '-101%' : 0 }}
        transition={panel}
        onAnimationComplete={() => open && onDone()}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
        initial={{ y: 0 }}
        animate={{ y: open ? '101%' : 0 }}
        transition={panel}
      />

      {/* gold hairline on the seam */}
      <motion.div
        className="absolute left-0 top-[62%] h-px w-full origin-left bg-gradient-to-r from-transparent via-gilt to-transparent"
        style={{ scaleX: progress / 100 }}
        animate={{ opacity: phase === 'count' ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        animate={{ opacity: phase === 'count' ? 1 : 0, y: phase === 'count' ? 0 : -14 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        onAnimationComplete={() => {
          if (phase === 'fade' && !revealed.current) {
            revealed.current = true
            onReveal()
            setPhase('open')
          }
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mono-label mb-6 !text-bronze"
        >
          ZOHO TECHNICAL LEAD / BUSINESS AUTOMATION & ERP
        </motion.p>
        <div className="overflow-hidden pb-1">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.25, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="display-xl text-gold text-[clamp(2.6rem,9vw,6.5rem)]"
          >
            {profile.name}
          </motion.h1>
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-8 flex items-end justify-between px-6 sm:px-12 lg:px-16">
        <motion.span animate={{ opacity: phase === 'count' ? 1 : 0 }} className="font-mono text-xs tracking-[0.3em] text-bronze">
          LOADING
        </motion.span>
        <motion.span
          animate={{ opacity: phase === 'count' ? 1 : 0 }}
          className="font-display text-6xl leading-none text-champagne/90 tabular-nums sm:text-7xl"
        >
          {String(progress).padStart(3, '0')}
        </motion.span>
      </div>
    </div>
  )
}
