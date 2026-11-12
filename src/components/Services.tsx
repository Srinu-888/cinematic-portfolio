import { motion, type Variants } from 'framer-motion'
import { processCopy, sectionIndex, servicesCopy } from '../data/content'
import { Brackets } from './ui/Brackets'
import { SectionHeader } from './ui/SectionHeader'
import { SpotlightCard } from './ui/SpotlightCard'

const EASE = [0.16, 1, 0.3, 1] as const
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

/** What I build, how we work, and why work with me: the conversion-focused heart of the page. */
export function Services() {
  const c = servicesCopy
  return (
    <section id="services" className="relative overflow-hidden bg-black px-6 pb-24 pt-24 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute left-[15%] top-1/4 h-[32rem] w-[32rem] rounded-full bg-gilt/[0.05] blur-[170px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader index={sectionIndex.services} label="SERVICES" silver={c.silver} gold={c.gold} className="mb-12">
          {c.intro}
        </SectionHeader>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mb-24 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {c.items.map((s, i) => (
            <motion.li key={s.title} variants={item} whileHover={{ y: -5, transition: { duration: 0.25 } }}>
              <SpotlightCard className="group relative flex h-full flex-col overflow-hidden rounded-sm border border-bronze/35 bg-[#100D0B]/85 p-7 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-gilt/80 hover:shadow-[0_16px_45px_rgba(212,175,55,0.14)]">
                <Brackets size={11} thick={1} />
                <span className="mb-5 font-mono text-[11px] font-bold tracking-[0.2em] text-gilt">{String(i + 1).padStart(2, '0')} //</span>
                <h3 className="display-xl mb-3 text-3xl leading-[0.95] text-white transition-colors group-hover:text-champagne sm:text-[2rem]">{s.title}</h3>
                <p className="mb-5 text-[13px] font-light leading-relaxed text-[#B3A497] lg:min-h-[4.9rem]">{s.text}</p>
                <ul className="mb-7 space-y-2 border-t border-bronze/20 pt-5">
                  {s.points.map((p) => (
                    <li key={p} className="relative pl-5 text-[12px] font-light leading-snug text-[#D5CBC0] before:absolute before:left-0 before:top-[0.65em] before:h-px before:w-3 before:bg-gilt/70">
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  onClick={() => window.dispatchEvent(new CustomEvent('contact:prefill', { detail: s.ask }))}
                  className="mt-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-gilt transition-colors hover:text-champagne"
                >
                  Discuss this
                  <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              </SpotlightCard>
            </motion.li>
          ))}
        </motion.ul>

        {/* Process */}
        <div>
          <p className="mono-label mb-8 !text-gilt">{processCopy.title}</p>
          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
          >
            <span aria-hidden className="absolute left-0 right-0 top-[1.05rem] hidden h-px bg-gradient-to-r from-gilt/60 via-bronze/30 to-transparent lg:block" />
            {processCopy.steps.map((st, i) => (
              <motion.li key={st.title} variants={item} className="relative">
                <span className="relative mb-5 flex h-9 w-9 items-center justify-center rounded-full border border-gilt/70 bg-black font-mono text-[11px] font-bold text-gilt">
                  {i + 1}
                </span>
                <h3 className="display-xl mb-2 text-3xl text-[#F4EBE2]">{st.title}</h3>
                <p className="max-w-[16rem] text-[12.5px] font-light leading-relaxed text-muted">{st.text}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
