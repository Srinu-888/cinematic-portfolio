import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { faq, hireCopy, profile, sectionIndex, waLink } from '../data/content'
import { Brackets } from './ui/Brackets'
import { LinkButton } from './ui/Button'
import { SectionHeader } from './ui/SectionHeader'

const EASE = [0.16, 1, 0.3, 1] as const

/** Two clear paths (client / recruiter) plus an FAQ that answers the common questions up front. */
export function Hire() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const c = hireCopy

  return (
    <section id="hire" className="relative overflow-hidden bg-black px-6 pb-24 pt-24 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute right-[10%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-gilt/[0.06] blur-[170px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader index={sectionIndex.hire} label="WORK WITH ME" silver={c.silver} gold={c.gold} className="mb-12">
          {c.intro}
        </SectionHeader>

        <div className="mb-24 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {c.cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: EASE }}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-bronze/40 bg-[#0E0C0A] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] transition-colors duration-500 hover:border-gilt/80 sm:p-10"
            >
              <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gilt/80 to-transparent" />
              <Brackets size={16} />
              <p className="mono-label mb-4 !text-gilt">{card.tag}</p>
              <h3 className="display-xl glow-gold mb-6 text-[clamp(2.4rem,4.6vw,3.6rem)] text-gold">{card.title}</h3>
              <ul className="mb-9 space-y-3 border-t border-bronze/25 pt-6">
                {card.points.map((p) => (
                  <li key={p} className="relative pl-6 text-[13px] font-light leading-snug text-[#D5CBC0] before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-3.5 before:bg-gilt/70">
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-3">
                <LinkButton href={waLink(card.message)} target="_blank" rel="noopener noreferrer" icon="↗">
                  {card.cta}
                </LinkButton>
                {i === 0 ? (
                  <LinkButton href={`tel:${profile.phoneCall.tel}`} variant="ghost" icon="☎">
                    Call me
                  </LinkButton>
                ) : (
                  <>
                    <LinkButton href={profile.resumeHref} target="_blank" rel="noopener noreferrer" variant="ghost" icon="↓">
                      Résumé
                    </LinkButton>
                    <LinkButton href={profile.linkedin} target="_blank" rel="noopener noreferrer" variant="ghost" icon="↗">
                      LinkedIn
                    </LinkButton>
                  </>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* FAQ */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="mono-label mb-4 !text-gilt">QUESTIONS</p>
            <h3 className="display-xl text-silver text-[clamp(2.4rem,4.4vw,3.4rem)]">
              GOOD TO <span className="text-gold">KNOW.</span>
            </h3>
          </div>
          <ul className="divide-y divide-bronze/20 border-y border-bronze/25 lg:col-span-8">
            {faq.map((f, i) => {
              const open = openIdx === i
              return (
                <li key={f.q}>
                  <h4>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpenIdx(open ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                    >
                      <span className={`text-[14px] font-medium transition-colors ${open ? 'text-champagne' : 'text-[#E8D7C5]'}`}>{f.q}</span>
                      <span aria-hidden className={`font-mono text-lg text-gilt transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
                        +
                      </span>
                    </button>
                  </h4>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-[13px] font-light leading-[1.8] text-muted">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
