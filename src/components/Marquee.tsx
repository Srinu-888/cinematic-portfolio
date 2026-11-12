import { useRef } from 'react'
import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { marquee } from '../data/content'
import { prefersReducedMotion } from '../hooks/useMediaQuery'

const wrap = (min: number, max: number, v: number) => {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

/** Capability ticker that speeds up and reverses with scroll velocity. Static for reduced-motion users. */
export function Marquee() {
  const x = useMotionValue(0)
  const dir = useRef(1)
  const { scrollY } = useScroll()
  const smooth = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const boost = useTransform(smooth, [-2000, 0, 2000], [-6, 0, 6], { clamp: false })
  const still = prefersReducedMotion()

  useAnimationFrame((_, delta) => {
    if (still) return
    const b = boost.get()
    if (b < -0.2) dir.current = -1
    else if (b > 0.2) dir.current = 1
    const move = dir.current * (0.35 + Math.abs(b)) * (delta / 1000) * 4
    x.set(wrap(-50, 0, x.get() - move))
  })
  const transform = useTransform(x, (v) => `translateX(${v}%)`)

  return (
    <div aria-hidden className="relative overflow-hidden border-y border-bronze/20 bg-[#070605] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
      <motion.div style={{ transform }} className="flex w-max items-center will-change-transform">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center">
            {marquee.map((item, i) => (
              <li key={`${dup}-${item}`} className="flex items-center">
                <span
                  className={`font-display px-8 text-4xl uppercase leading-none tracking-wide sm:text-5xl ${
                    i % 2 ? 'text-gold' : 'text-transparent [-webkit-text-stroke:1px_rgba(201,158,93,0.65)]'
                  }`}
                >
                  {item}
                </span>
                <span className="text-sm text-gilt/70">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </motion.div>
    </div>
  )
}
