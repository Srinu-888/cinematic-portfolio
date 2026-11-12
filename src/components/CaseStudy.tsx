import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import activity from '../assets/dash-activity.webp'
import map from '../assets/dash-map.webp'
import monthly from '../assets/dash-monthly.webp'
import overview from '../assets/dash-overview.webp'
import repchart from '../assets/dash-repchart.webp'
import reps from '../assets/dash-reps.webp'
import sources from '../assets/dash-sources.webp'
import menu1 from '../assets/menu-1.webp'
import menu2 from '../assets/menu-2.webp'
import menu3 from '../assets/menu-3.webp'
import menu4 from '../assets/menu-4.webp'
import { caseStudyCopy as c } from '../data/content'
import { useScroller } from '../hooks/useScroller'
import { Brackets } from './ui/Brackets'
import { ImageLightbox } from './ui/ImageLightbox'
import { SectionHeader } from './ui/SectionHeader'

const EASE = [0.16, 1, 0.3, 1] as const
const images: Record<string, { src: string; w: number; h: number }> = {
  overview: { src: overview, w: 1595, h: 767 },
  reps: { src: reps, w: 1580, h: 667 },
  activity: { src: activity, w: 1512, h: 632 },
  monthly: { src: monthly, w: 1596, h: 637 },
  repchart: { src: repchart, w: 1545, h: 637 },
  sources: { src: sources, w: 1577, h: 412 },
  map: { src: map, w: 1582, h: 747 },
}
const menus = [
  { src: menu1, w: 222, h: 780, alt: 'Fleet & Employee Management menu: dashboards and master lists' },
  { src: menu2, w: 221, h: 722, alt: 'Fleet & Employee Management menu: reports, history and employee requests' },
  { src: menu3, w: 215, h: 421, alt: 'Fleet & Employee Management menu: vehicle requests' },
  { src: menu4, w: 231, h: 597, alt: 'Fleet & Employee Management menu: maintenance, reports and admin tools' },
]

function FleetPanel() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <p className="body-copy mb-7 text-[13px] sm:text-sm">{c.fleetText}</p>
        <ul className="divide-y divide-bronze/20 border-y border-bronze/25">
          {c.fleetGroups.map((g) => (
            <li key={g.title} className="flex items-baseline gap-4 py-3">
              <span className="w-8 font-mono text-[11px] font-bold text-gilt">{String(g.count).padStart(2, '0')}</span>
              <span className="flex-1">
                <span className="block text-[13px] font-medium text-[#EAD8C7]">{g.title}</span>
                <span className="block text-[11px] font-light text-muted">{g.sample}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mono-label mt-5 !text-bronze">ALSO LIVE: {c.alsoLive.join(' • ').toUpperCase()}</p>
      </div>
      <div className="lg:col-span-7">
        <div className="group relative rounded-sm border border-bronze/40 bg-[#0A0806] p-4 sm:p-6">
          <Brackets size={18} />
          <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto sm:gap-4">
            {menus.map((m, i) => (
              <img
                key={m.src}
                src={m.src}
                width={m.w}
                height={m.h}
                loading="lazy"
                decoding="async"
                alt={m.alt}
                className={`h-auto w-[44%] shrink-0 snap-start self-start rounded-sm border border-bronze/25 sm:w-[calc(25%-12px)] ${i % 2 ? 'sm:mt-10' : ''}`}
              />
            ))}
          </div>
          <p className="mono-label mt-5 !text-muted">LIVE APPLICATION MENU • ENGLISH & ARABIC</p>
        </div>
      </div>
    </div>
  )
}

function DashboardPanel() {
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  const { stop, start } = useScroller()
  const shot = c.shots[active]
  const img = images[shot.id]

  useEffect(() => {
    if (open) stop()
    else start()
  }, [open, stop, start])

  return (
    <div>
      <ul className="mb-8 flex flex-wrap gap-2">
        {c.points.map((p) => (
          <li key={p} className="rounded-sm border border-bronze/35 bg-[#171310] px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#E8D7C5]">
            {p}
          </li>
        ))}
      </ul>
      <div className="group relative rounded-sm border border-bronze/40 bg-[#0E0C0A] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.95)] sm:p-4">
        <Brackets size={20} />
        <div className="mb-3 flex items-center gap-2 px-1">
          <span className="h-2 w-2 rounded-full bg-bronze/60" />
          <span className="h-2 w-2 rounded-full bg-bronze/40" />
          <span className="h-2 w-2 rounded-full bg-bronze/25" />
          <span className="ml-3 truncate font-mono text-[10px] tracking-[0.18em] text-muted">SALES PIPELINE DASHBOARD • ZOHO CREATOR WIDGET</span>
        </div>
        <button
          type="button"
          data-cursor="view"
          onClick={() => setOpen(true)}
          aria-label={`Open ${shot.title} full size`}
          className="relative block w-full overflow-hidden rounded-[3px] bg-[#f4f5f7]"
          style={{ aspectRatio: '1595 / 767' }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={shot.id}
              src={img.src}
              width={img.w}
              height={img.h}
              alt={`Sales Pipeline dashboard: ${shot.title}`}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute inset-0 h-full w-full object-contain"
            />
          </AnimatePresence>
        </button>
        <div className="mt-4 flex flex-col gap-1 px-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
          <h3 className="display-xl text-3xl text-[#F4EBE2]">{shot.title}</h3>
          <p className="max-w-xl text-xs font-light leading-relaxed text-muted sm:text-right">{shot.text}</p>
        </div>
        <ul className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Dashboard views">
          {c.shots.map((s, i) => (
            <li key={s.id} className="shrink-0">
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={s.title}
                onClick={() => setActive(i)}
                className={`block w-24 overflow-hidden rounded-[3px] border bg-[#f4f5f7] transition-all duration-300 sm:w-32 ${
                  i === active ? 'border-gilt opacity-100' : 'border-bronze/30 opacity-55 hover:opacity-90'
                }`}
                style={{ aspectRatio: '16 / 9' }}
              >
                <img src={images[s.id].src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="mono-label mt-4 !text-dim">PERSONAL NAMES ARE REDACTED • CLICK THE DASHBOARD TO ENLARGE</p>
      <AnimatePresence>
        {open && (
          <ImageLightbox src={img.src} alt={`Sales Pipeline dashboard: ${shot.title}`} label={`Dashboard: ${shot.title}`} imageClass="bg-[#f4f5f7]" onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

const tabs = [
  { id: 'fleet', label: 'Application menu' },
  { id: 'dash', label: 'Executive dashboards' },
] as const

/** One section, two views: the biggest application's anatomy, and the dashboards built on top of it. */
export function CaseStudy() {
  const [tab, setTab] = useState<(typeof tabs)[number]['id']>('fleet')
  return (
    <section id="casestudy" className="relative overflow-hidden bg-black px-6 pb-24 pt-24 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute right-[6%] top-[18%] h-[32rem] w-[32rem] rounded-full bg-gilt/[0.06] blur-[170px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader index={c.index} label={c.label} silver={c.silver} gold={c.gold} className="mb-10">
          {c.intro}
        </SectionHeader>

        <div role="tablist" aria-label="Case study views" className="mb-10 flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-sm border px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 ${
                tab === t.id ? 'border-gilt bg-gilt text-black' : 'border-bronze/35 bg-[#120F0C] text-[#E8D7C5] hover:border-gilt/60'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            {tab === 'fleet' ? <FleetPanel /> : <DashboardPanel />}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
