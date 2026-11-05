import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { journey, type Stop } from '../data/content'
import { SectionHeader } from './ui/SectionHeader'

function Node({ stop }: { stop: Stop }) {
  if (stop.upcoming) {
    return (
      <span className="absolute left-[19px] top-[6px] z-10 flex -translate-x-1/2 items-center justify-center md:left-[210px]">
        <span className="pulse-dot absolute h-3 w-3 rounded-full" />
        <span className="h-3 w-3 rounded-full border border-dashed border-gilt bg-black" />
      </span>
    )
  }
  if (stop.milestone) {
    return (
      <span className="absolute left-[19px] top-[9px] z-10 h-3 w-3 -translate-x-1/2 rotate-45 border border-gilt bg-gilt shadow-[0_0_14px_#D4AF37] md:left-[210px]" />
    )
  }
  return (
    <span className="absolute left-[19px] top-[7px] z-10 flex -translate-x-1/2 items-center justify-center md:left-[210px]">
      <span className="absolute h-6 w-6 rounded-full border border-gilt/0 transition-all duration-700 ease-out group-hover:scale-150 group-hover:border-gilt/40" />
      {stop.current && <span className="pulse-dot absolute h-2.5 w-2.5 rounded-full" />}
      <span
        className={`h-2.5 w-2.5 rounded-full border transition-colors duration-300 group-hover:border-gilt group-hover:bg-gilt group-hover:shadow-[0_0_12px_#D4AF37] ${
          stop.current ? 'border-gilt bg-gilt shadow-[0_0_12px_#D4AF37]' : 'border-bronze bg-[#120F0C]'
        }`}
      />
    </span>
  )
}

export function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 65%', 'end 75%'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative overflow-hidden bg-black px-6 pb-24 pt-24 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gilt/[0.04] blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <SectionHeader index="04" label="EXPERIENCE" silver="EXPERIENCE &" gold="MILESTONES." className="mb-16" />

        <div ref={ref} className="relative w-full">
          <div aria-hidden className="absolute bottom-6 left-[19px] top-3 w-px bg-bronze/20 md:left-[210px]" />
          <motion.div
            aria-hidden
            style={{ height }}
            className="absolute left-[19px] top-3 w-[2px] -translate-x-[0.5px] origin-top bg-gradient-to-b from-gilt via-brass to-bronze/10 shadow-[0_0_10px_#D4AF37] md:left-[210px]"
          />

          <ol className="space-y-14">
            {journey.map((stop, idx) => (
              <motion.li
                key={stop.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8, delay: Math.min(idx, 2) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group relative md:grid md:grid-cols-[210px_1fr]"
              >
                <div className="hidden pr-10 pt-1 text-right md:block">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-bronze transition-colors group-hover:text-gilt">{stop.period}</span>
                  {stop.current && <span className="mt-2 block font-mono text-[9px] tracking-[0.25em] text-gilt">CURRENT ROLE</span>}
                  {stop.upcoming && <span className="mt-2 block font-mono text-[9px] tracking-[0.25em] text-gilt">NEW VENTURE</span>}
                </div>
                <Node stop={stop} />

                <div className="ml-14 md:ml-0 md:pl-12">
                  <div className="mb-1.5 flex items-center gap-3 md:hidden">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-gilt">{stop.period}</span>
                    {stop.current && <span className="border border-gilt/50 px-1.5 py-0.5 font-mono text-[8px] tracking-[0.2em] text-gilt">CURRENT</span>}
                  </div>
                  <h3 className="display-xl mb-1 text-3xl leading-none tracking-wide text-white transition-colors group-hover:text-champagne sm:text-4xl">{stop.title}</h3>
                  <p className="mb-1 text-sm font-medium tracking-wide text-[#D8C3A5]">
                    {stop.org}
                    {stop.orgAlt && (
                      <span lang="ar" dir="rtl" className="ml-3 inline-block text-[13px] font-normal text-bronze">
                        {stop.orgAlt}
                      </span>
                    )}
                  </p>
                  {stop.type && <p className="mono-label mb-4">{stop.type}</p>}
                  <ul className="max-w-2xl space-y-2">
                    {stop.points.map((p) => (
                      <li
                        key={p}
                        className="relative pl-5 text-xs font-light leading-[1.75] text-muted transition-colors group-hover:text-[#D5CBC0] sm:text-[13px] before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-3 before:bg-gilt/60"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
