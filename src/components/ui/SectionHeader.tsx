import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.16, 1, 0.3, 1] as const

/** Eyebrow + two-tone cinematic headline. Each line rises out of a mask as it enters the viewport. */
export function SectionHeader({
  index,
  label,
  silver,
  gold,
  children,
  className = '',
}: {
  index: string
  label: string
  silver: string
  gold: string
  children?: ReactNode
  className?: string
}) {
  const line = (text: string, tone: string, delay: number) => (
    <motion.span
      className="block overflow-hidden pb-[0.06em]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      <motion.span
        className={`block ${tone}`}
        variants={{ hidden: { y: '112%' }, visible: { y: 0, transition: { duration: 1.05, ease: EASE, delay } } }}
      >
        {text}
      </motion.span>
    </motion.span>
  )

  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mb-6 flex items-center gap-4"
      >
        <span className="eyebrow">
          {index} / {label}
        </span>
        <span className="h-px w-20 bg-gradient-to-r from-gilt/80 via-bronze/40 to-transparent" />
      </motion.div>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="display-xl glow-gold select-none text-[clamp(2.9rem,8.2vw,5.5rem)]">
          {line(silver, 'text-silver', 0)}
          {line(gold, 'text-gold', 0.12)}
        </h2>
        {children && <div className="max-w-sm text-sm font-light leading-relaxed text-muted">{children}</div>}
      </div>
    </div>
  )
}
