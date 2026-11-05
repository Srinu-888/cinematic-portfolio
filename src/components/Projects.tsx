import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { projects, type Project } from '../data/content'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Brackets } from './ui/Brackets'
import { LinkButton } from './ui/Button'
import { SectionHeader } from './ui/SectionHeader'
import { SpotlightCard } from './ui/SpotlightCard'

function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="group relative overflow-hidden rounded-sm border border-bronze/50 bg-[#0E0C0A] p-7 shadow-[0_25px_70px_rgba(0,0,0,0.98)] transition-colors duration-500 hover:border-gilt sm:p-10 lg:p-12">
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gilt/80 to-transparent" />
      <Brackets size={16} />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-3 select-none font-display text-[8rem] leading-none text-[#EAD8C7]/[0.05] sm:text-[11rem]"
      >
        {project.number}
      </span>

      <div className="relative z-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-xs font-bold text-gilt">{project.number} //</span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-muted">{project.category}</span>
            </div>
            <h3 className="display-xl mb-3 text-[clamp(2.3rem,5.2vw,3.9rem)] leading-[0.92] text-white transition-colors duration-500 group-hover:text-champagne">
              {project.title}
            </h3>
            <p className="mono-label mb-5 !text-bronze">{project.period}</p>
            <p className="mb-8 max-w-2xl text-xs font-light leading-[1.85] tracking-wide text-[#BDB0A4] sm:text-[14px]">{project.description}</p>
          </div>
          <ul className="flex flex-wrap gap-2 border-t border-bronze/25 pt-6">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-sm border border-bronze/40 bg-[#16120E] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-[#E8D7C5] transition-colors duration-300 group-hover:border-gilt/50"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex h-full flex-col justify-between gap-6 lg:col-span-5 lg:border-l lg:border-bronze/25 lg:pl-8">
          <div className="space-y-3">
            <span className="mb-2 block font-mono text-[9.5px] uppercase tracking-[0.25em] text-bronze">{'// SYSTEM SNAPSHOT'}</span>
            {project.snapshot.map((m) => (
              <div key={m.label} className="flex items-center justify-between gap-4 rounded-sm border border-bronze/25 bg-[#050403] p-3.5">
                <span className="font-mono text-[10px] text-muted">{m.label}</span>
                <span className="text-right font-mono text-[11px] font-medium text-champagne">{m.value}</span>
              </div>
            ))}
          </div>
          <LinkButton
            href="#contact"
            icon="↗"
            variant="primary"
            className="w-full hover:!bg-gilt hover:!text-black"
            onClick={() => window.dispatchEvent(new CustomEvent('contact:prefill', { detail: project.ask }))}
          >
            Request a walkthrough
          </LinkButton>
        </div>
      </div>
    </SpotlightCard>
  )
}

function StackItem({ project, i, n, progress }: { project: Project; i: number; n: number; progress: MotionValue<number> }) {
  const last = i === n - 1
  const from = i / (n - 1)
  const scale = useTransform(progress, last ? [0, 1] : [from, 1], last ? [1, 1] : [1, 1 - (n - 1 - i) * 0.04])
  const dim = useTransform(progress, last ? [0, 1] : [from, 1], last ? [1, 1] : [1, 0.62])
  const filter = useTransform(dim, (v) => `brightness(${v})`)

  return (
    <div className="sticky top-0 flex h-[100svh] items-start pt-24">
      <motion.div style={{ scale, filter, top: i * 22 }} className="relative w-full origin-top">
        <ProjectCard project={project} />
      </motion.div>
    </div>
  )
}

export function Projects() {
  const listRef = useRef<HTMLDivElement>(null)
  const stacked = useMediaQuery('(min-width: 1024px) and (min-height: 700px)')
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="relative overflow-x-clip bg-black px-6 pb-16 pt-20 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute left-1/3 top-1/4 h-[36rem] w-[36rem] rounded-full bg-gilt/5 blur-[180px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-1/4 right-1/4 h-[30rem] w-[30rem] rounded-full bg-bronze/5 blur-[170px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader index="02" label="SELECTED WORK" silver="SELECTED WORKS." gold="ENGINEERED VALUE." className="mb-14 lg:mb-0">
          Systems I have designed and delivered. Client data, credentials and internal links are never shown, and full walkthroughs are available on request.
        </SectionHeader>

        {stacked ? (
          <div ref={listRef}>
            {projects.map((p, i) => (
              <StackItem key={p.number} project={p} i={i} n={projects.length} progress={scrollYProgress} />
            ))}
          </div>
        ) : (
          <div ref={listRef} className="space-y-6">
            {projects.map((p) => (
              <motion.div key={p.number} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.8 }}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
