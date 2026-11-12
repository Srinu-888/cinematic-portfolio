import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import { companies, projects, sectionIndex, type Project, type StatusTone } from '../data/content'
import { Brackets } from './ui/Brackets'
import { ActionButton } from './ui/Button'
import { SectionHeader } from './ui/SectionHeader'
import { SpotlightCard } from './ui/SpotlightCard'

const EASE = [0.16, 1, 0.3, 1] as const

const toneClass: Record<StatusTone, string> = {
  done: 'border-gilt bg-gilt text-black',
  progress: 'border-gilt/70 bg-gilt/10 text-gilt',
}

const flowList: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } }
const flowStep: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
}

/** Animated process stepper: shows how the system moves work from start to finish. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <motion.ol
      variants={flowList}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      aria-label="Process flow"
      className="mb-5 flex flex-wrap items-center gap-y-2 rounded-sm border border-bronze/25 bg-[#080605] p-3"
    >
      {steps.map((s, i) => (
        <motion.li key={s} variants={flowStep} className="flex items-center">
          <span className="flex items-center gap-2 rounded-sm border border-bronze/30 bg-[#14110E] px-2.5 py-1">
            <span className="font-mono text-[9px] font-bold text-gilt">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-[10.5px] font-medium tracking-wide text-[#E8D7C5]">{s}</span>
          </span>
          {i < steps.length - 1 && <span aria-hidden className="mx-1.5 h-px w-3 bg-gradient-to-r from-gilt to-bronze/30" />}
        </motion.li>
      ))}
    </motion.ol>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const company = companies.find((c) => c.id === project.company)
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="h-full"
    >
      <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-bronze/40 bg-[#0E0C0A] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.85)] transition-colors duration-500 hover:border-gilt/80 sm:p-8">
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gilt/70 to-transparent" />
        <Brackets size={13} thick={1} />

        <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gilt">{project.industry}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bronze">{company?.short}</span>
          <span className={`ml-auto rounded-sm border px-2.5 py-1 font-mono text-[9px] font-semibold tracking-[0.2em] ${toneClass[project.status.tone]}`}>
            {project.status.label}
          </span>
        </div>

        <h3 className="display-xl mb-3 text-[clamp(2rem,3.4vw,2.7rem)] leading-[0.95] text-white transition-colors duration-500 group-hover:text-champagne">
          {project.title}
        </h3>
        {project.meta && <p className="mono-label mb-3 !text-bronze">{project.meta}</p>}
        <p className="mb-5 text-[13px] font-light leading-[1.8] text-[#BDB0A4]">{project.summary}</p>

        {project.flow && <Flow steps={project.flow} />}

        <ul className="mb-6 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li key={t} className="rounded-sm border border-bronze/35 bg-[#16120E] px-2.5 py-1 text-[9.5px] font-medium uppercase tracking-[0.14em] text-[#E8D7C5]">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-bronze/20 pt-4">
          {company?.site ? (
            <a href={company.site} target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-gilt">
              {company.name} ↗
            </a>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">{company?.name}</span>
          )}
          <a
            href="#contact"
            onClick={() => window.dispatchEvent(new CustomEvent('contact:prefill', { detail: project.ask }))}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-gilt transition-colors hover:text-champagne"
          >
            Request a walkthrough ↗
          </a>
        </div>
      </SpotlightCard>
    </motion.article>
  )
}

function CompanyPanel({ id, wide }: { id: string; wide: boolean }) {
  const c = companies.find((x) => x.id === id)
  if (!c) return null
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className={`relative flex flex-col justify-between gap-8 overflow-hidden rounded-sm border border-gilt/50 bg-gradient-to-br from-gilt/[0.10] via-[#0E0C0A] to-[#0E0C0A] p-7 sm:p-10 ${wide ? 'lg:col-span-2 lg:flex-row lg:items-end' : ''}`}
    >
      <Brackets size={16} />
      <div>
        <p className="mono-label mb-3 !text-gilt">{c.industry}</p>
        <h3 className="display-xl text-gold glow-gold text-[clamp(2.4rem,4.4vw,3.6rem)] leading-[0.95]">{c.name}</h3>
        <p className="mono-label mt-3 !text-bronze">MY ROLE: {c.role.toUpperCase()}</p>
      </div>
      <div className={wide ? 'lg:max-w-md' : ''}>
        <p className="mb-5 text-[13px] font-light leading-[1.8] text-[#CDBFB1]">{c.blurb}</p>
        {c.site && (
          <a href={c.site} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-gilt transition-colors hover:text-champagne">
            Visit website ↗
          </a>
        )}
      </div>
    </motion.div>
  )
}

/** Projects grouped by company and industry. Filtering by company reveals everything delivered there. */
export function Projects() {
  const [filter, setFilter] = useState<string>('all')
  const [showAll, setShowAll] = useState(false)

  // Experience entries can jump straight to a company's projects
  useEffect(() => {
    const onFilter = (e: Event) => setFilter((e as CustomEvent<string>).detail)
    window.addEventListener('projects:filter', onFilter)
    return () => window.removeEventListener('projects:filter', onFilter)
  }, [])

  const list = useMemo(
    () => (filter === 'all' ? (showAll ? projects : projects.filter((p) => p.featured)) : projects.filter((p) => p.company === filter)),
    [filter, showAll],
  )

  const chips = [
    { id: 'all', label: 'All', sub: 'Featured', count: projects.filter((p) => p.featured).length },
    ...companies.map((c) => ({ id: c.id, label: c.short, sub: c.industry, count: projects.filter((p) => p.company === c.id).length })),
  ]

  return (
    <section id="work" className="relative overflow-hidden bg-black px-6 pb-24 pt-24 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute left-1/3 top-1/4 h-[36rem] w-[36rem] rounded-full bg-gilt/5 blur-[180px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader index={sectionIndex.work} label="PROJECTS" silver="WORK ACROSS" gold="INDUSTRIES." className="mb-10">
          {projects.length} projects across fleet and logistics, financial services, manufacturing, IT consulting and Zoho consulting. Pick a company to see everything delivered there.
        </SectionHeader>

        <div role="tablist" aria-label="Filter projects by company" className="no-scrollbar -mx-6 mb-10 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {chips.map((c) => {
            const on = filter === c.id
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setFilter(c.id)
                  setShowAll(false)
                }}
                className={`group shrink-0 rounded-sm border px-4 py-3 text-left transition-all duration-300 ${
                  on ? 'border-gilt bg-gilt text-black' : 'border-bronze/35 bg-[#120F0C] text-[#E8D7C5] hover:border-gilt/60'
                }`}
              >
                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
                  {c.label}
                  <span className={`font-mono text-[9px] ${on ? 'text-black/70' : 'text-gilt'}`}>{c.count}</span>
                </span>
                <span className={`mt-0.5 block max-w-[11rem] truncate font-mono text-[9px] tracking-wide ${on ? 'text-black/70' : 'text-muted'}`}>{c.sub}</span>
              </button>
            )
          })}
        </div>

        <motion.div layout className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filter !== 'all' && <CompanyPanel key={`co-${filter}`} id={filter} wide={list.length > 1} />}
            {list.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filter === 'all' && (
          <div className="mt-10 flex justify-center">
            <ActionButton variant="ghost" icon={showAll ? '↑' : '↓'} onClick={() => setShowAll((v) => !v)}>
              {showAll ? 'Show featured only' : `Show all ${projects.length} projects`}
            </ActionButton>
          </div>
        )}
      </div>
    </section>
  )
}
