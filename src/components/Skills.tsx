import { motion, type Variants } from 'framer-motion'
import { coreSkills, skillBlocks } from '../data/content'
import { Brackets } from './ui/Brackets'
import { SectionHeader } from './ui/SectionHeader'
import { SpotlightCard } from './ui/SpotlightCard'

const EASE = [0.16, 1, 0.3, 1] as const
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } } }
const card: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: EASE } },
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-black px-6 pb-24 pt-24 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute left-1/4 top-1/3 h-[34rem] w-[34rem] rounded-full bg-gilt/5 blur-[170px]" />
      <div aria-hidden className="pointer-events-none absolute bottom-10 right-1/4 h-[28rem] w-[28rem] rounded-full bg-bronze/5 blur-[160px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader index="03" label="TECH MATRIX" silver="ARCHITECTURAL MASTERY." gold="PRECISION APPLIED." className="mb-12" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          {skillBlocks.map((b) => (
            <motion.div key={b.title} variants={card} whileHover={{ y: -5, transition: { duration: 0.25 } }} className={b.span}>
              <SpotlightCard className="group relative h-full overflow-hidden rounded-sm border border-bronze/35 bg-[#100D0B]/85 p-8 backdrop-blur-xl transition-[border-color,box-shadow] duration-500 hover:border-gilt/80 hover:shadow-[0_16px_45px_rgba(212,175,55,0.14)] sm:p-9">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gilt/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Brackets size={12} thick={1} />
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gilt transition-colors group-hover:text-[#F3DBB3]">{b.badge}</span>
                  <span className="border border-bronze/40 bg-[#17130F] px-2.5 py-0.5 font-mono text-[10px] text-[#C4B5A5] transition-colors group-hover:border-gilt/50 group-hover:text-white">
                    {b.stat}
                  </span>
                </div>
                <h3 className="display-xl mb-3 text-3xl tracking-wide text-white transition-colors group-hover:text-champagne sm:text-4xl">{b.title}</h3>
                <p className="mb-7 max-w-xl text-xs font-light leading-relaxed text-muted transition-colors group-hover:text-[#D5CBC0] sm:text-sm">{b.description}</p>
                <ul className="flex flex-wrap gap-2 border-t border-bronze/20 pt-4">
                  {b.items.map((t) => (
                    <li
                      key={t}
                      className="rounded-sm border border-bronze/35 bg-[#171310] px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#E8D7C5] transition-colors duration-300 group-hover:border-gilt/50 group-hover:bg-[#1F1914] group-hover:text-white"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Core skills strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mt-6 grid grid-cols-2 divide-bronze/20 border border-bronze/25 bg-[#0A0806] sm:grid-cols-4 sm:divide-x"
        >
          {coreSkills.map((s, i) => (
            <div key={s} className={`flex flex-col gap-1 p-5 sm:p-6 ${i % 2 ? 'border-l border-bronze/20 sm:border-l-0' : ''} ${i > 1 ? 'border-t border-bronze/20 sm:border-t-0' : ''}`}>
              <span className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-bronze">CORE SKILL</span>
              <span className="display-xl text-2xl leading-none text-[#F4EBE2] sm:text-3xl">{s}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
