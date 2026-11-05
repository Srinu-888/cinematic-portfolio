import { motion } from 'framer-motion'
import lockup from '../assets/arcenvo-lockup.webp'
import { venture } from '../data/content'
import { Brackets } from './ui/Brackets'
import { LinkButton } from './ui/Button'
import { SectionHeader } from './ui/SectionHeader'

const EASE = [0.16, 1, 0.3, 1] as const

/** Founder announcement for Arcenvo Technologies Private Limited (launching soon). */
export function Venture() {
  return (
    <section id="venture" className="relative overflow-hidden bg-black px-6 pb-24 pt-20 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute right-[8%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#0a8fff]/[0.07] blur-[160px]" />
      <div aria-hidden className="pointer-events-none absolute left-[10%] bottom-0 h-[26rem] w-[26rem] rounded-full bg-gilt/[0.05] blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader index="06" label="VENTURE" silver="FOUNDER OF" gold="ARCENVO." className="mb-14" />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="lg:col-span-6"
          >
            <p className="mono-label mb-5 flex items-center gap-3 !text-gilt">
              <span className="pulse-dot h-2 w-2 rounded-full bg-gilt" />
              {venture.status}
            </p>
            <p className="body-copy mb-8 max-w-lg text-[13px] sm:text-sm md:text-[14.5px]">{venture.description}</p>

            <p className="mono-label mb-3">SERVICES • COMING SOON</p>
            <ul className="mb-6 flex flex-wrap gap-2">
              {venture.services.map((s) => (
                <li key={s} className="rounded-sm border border-gilt/60 bg-gilt/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#F3DBB3]">
                  {s}
                </li>
              ))}
            </ul>
            <ul className="mb-9 flex flex-wrap gap-2">
              {venture.tagline.map((t) => (
                <li key={t} className="rounded-sm border border-bronze/35 bg-[#171310] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#E8D7C5]">
                  {t}
                </li>
              ))}
            </ul>

            <LinkButton
              href="#contact"
              icon="↗"
              onClick={() => window.dispatchEvent(new CustomEvent('contact:prefill', { detail: venture.ask }))}
            >
              Talk about Arcenvo
            </LinkButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.1, ease: EASE }}
            className="group relative lg:col-span-6"
          >
            <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-2xl bg-[conic-gradient(from_90deg,rgba(10,143,255,.35),rgba(212,175,55,.25),transparent_60%,rgba(10,143,255,.35))] opacity-40 blur-2xl transition-opacity duration-700 group-hover:opacity-70" />
            <div className="relative rounded-sm border border-bronze/40 bg-[#050912] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.95)] transition-colors duration-500 group-hover:border-gilt/70 sm:p-4">
              <Brackets size={20} />
              <img
                src={lockup}
                width={586}
                height={220}
                loading="lazy"
                decoding="async"
                alt="Arcenvo Technologies Private Limited logo: Simplify, Automate, Accelerate"
                className="mx-auto block h-auto w-full max-w-[560px] rounded-[10px]"
              />
              <span className="absolute -top-3 right-5 border border-gilt bg-black px-3 py-1 font-mono text-[9.5px] tracking-[0.3em] text-gilt">
                {venture.status}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
