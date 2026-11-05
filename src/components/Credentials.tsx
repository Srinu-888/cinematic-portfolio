import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import certFull from '../assets/zoho-certificate.webp'
import certSm from '../assets/zoho-certificate-sm.webp'
import { credential, education, interests, languages, profile } from '../data/content'
import { Brackets } from './ui/Brackets'
import { LinkButton, ActionButton } from './ui/Button'
import { SectionHeader } from './ui/SectionHeader'
import { useScroller } from '../hooks/useScroller'

const EASE = [0.16, 1, 0.3, 1] as const

function Lightbox({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    closeRef.current?.focus()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [onClose])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Zoho Creator Developer Associate certificate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.img
        src={certFull}
        alt="Zoho Creator Developer - Associate certificate issued to Mithana Srinivasa Reddy, ID ZCCA2764"
        initial={{ scale: 0.9, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] w-auto max-w-full rounded-sm bg-white shadow-[0_0_80px_rgba(212,175,55,0.2)]"
      />
      <div className="mt-5 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        <LinkButton href={profile.certificateHref} download variant="primary" icon="↓">
          Download PDF
        </LinkButton>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="border border-bronze/40 px-6 py-3.5 text-[11px] uppercase tracking-[0.24em] text-[#BFA895] transition-colors hover:border-bronze hover:text-[#EAD8C7] sm:px-7"
        >
          Close
        </button>
      </div>
    </motion.div>
  )
}

export function Credentials() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const { stop, start } = useScroller()
  const cardRef = useRef<HTMLButtonElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { damping: 20, stiffness: 180 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { damping: 20, stiffness: 180 })
  const shine = useMotionValue(50)
  const shineBg = useTransform(shine, (v) => `linear-gradient(115deg, transparent ${v - 22}%, rgba(255,240,200,0.28) ${v}%, transparent ${v + 22}%)`)

  useEffect(() => {
    if (open) stop()
    else start()
  }, [open, stop, start])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText('ZCCA2764')
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable: the ID stays visible for manual copy */
    }
  }

  return (
    <section id="credentials" className="relative overflow-hidden bg-black px-6 pb-24 pt-24 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute right-[10%] top-1/4 h-[32rem] w-[32rem] rounded-full bg-gilt/[0.06] blur-[170px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeader index="05" label="CREDENTIALS" silver="CERTIFIED." gold="ON THE RECORD." className="mb-14">
          Official Zoho accreditation, plus the education and languages behind the work.
        </SectionHeader>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Certificate */}
          <div className="flex justify-center lg:col-span-5" style={{ perspective: 1400 }}>
            <motion.button
              ref={cardRef}
              type="button"
              data-cursor="view"
              aria-label="Open certificate full size"
              onClick={() => setOpen(true)}
              onPointerMove={(e) => {
                if (e.pointerType !== 'mouse' || !cardRef.current) return
                const r = cardRef.current.getBoundingClientRect()
                mx.set((e.clientX - r.left) / r.width - 0.5)
                my.set((e.clientY - r.top) / r.height - 0.5)
                shine.set(((e.clientX - r.left) / r.width) * 100)
              }}
              onPointerLeave={() => {
                mx.set(0)
                my.set(0)
                shine.set(50)
              }}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, ease: EASE }}
              className="group relative w-full max-w-[380px] rounded-sm border border-bronze/40 bg-[#120F0C]/80 p-3 text-left shadow-[0_30px_80px_rgba(0,0,0,0.95)] transition-colors duration-500 hover:border-gilt/80"
            >
              <Brackets size={22} />
              <div className="relative overflow-hidden rounded-[2px] bg-white">
                <img
                  src={certSm}
                  srcSet={`${certSm} 720w, ${certFull} 1573w`}
                  sizes="380px"
                  width={720}
                  height={1017}
                  loading="lazy"
                  decoding="async"
                  alt="Zoho Creator Developer - Associate certificate, ID ZCCA2764"
                  className="block h-auto w-full"
                />
                <motion.div aria-hidden style={{ background: shineBg }} className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.button>
          </div>

          {/* Details */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              <p className="mono-label mb-3 !text-gilt">{credential.subtitle.toUpperCase()}</p>
              <h3 className="display-xl glow-gold mb-8 text-[clamp(2.4rem,5.4vw,4rem)]">
                {credential.title.split(' - ').map((t, i) => (
                  <span key={t} className={`block ${i ? 'text-gold' : 'text-silver'}`}>
                    {t}
                  </span>
                ))}
              </h3>

              <dl className="mb-8 divide-y divide-bronze/20 border-y border-bronze/25">
                {credential.facts.map((f) => (
                  <div key={f.label} className="flex items-center justify-between gap-4 py-3.5">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-bronze">{f.label}</dt>
                    <dd className="flex items-center gap-3 text-right text-[13px] font-medium text-[#EAD8C7]">
                      <span className={f.copy ? 'font-mono tracking-[0.15em]' : ''}>{f.value}</span>
                      {f.copy && (
                        <button
                          type="button"
                          onClick={copy}
                          aria-label="Copy certificate ID"
                          className="border border-bronze/40 px-2 py-0.5 font-mono text-[9px] tracking-[0.2em] text-muted transition-colors hover:border-gilt hover:text-gilt"
                        >
                          {copied ? 'COPIED' : 'COPY'}
                        </button>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mb-12 flex flex-wrap gap-3 sm:gap-5">
                <ActionButton icon="⤢" onClick={() => setOpen(true)}>
                  View certificate
                </ActionButton>
                <LinkButton href={profile.certificateHref} download variant="ghost" icon="↓">
                  Download PDF
                </LinkButton>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { k: 'EDUCATION', big: education.degree, small: `${education.school}, ${education.years}`, extra: education.grade },
                { k: 'LANGUAGES', big: languages.join(', '), small: '3 languages' },
                { k: 'OUTSIDE WORK', big: interests.join(', '), small: 'Interests' },
              ].map((c, i) => (
                <motion.div
                  key={c.k}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                  className="group relative rounded-sm border border-bronze/30 bg-[#0E0C0A] p-5 transition-colors duration-500 hover:border-gilt/60"
                >
                  <Brackets size={9} thick={1} />
                  <p className="font-mono text-[9.5px] uppercase tracking-[0.25em] text-bronze">{c.k}</p>
                  <p className="display-xl mt-2 text-2xl leading-[1.02] text-[#F4EBE2]">{c.big}</p>
                  <p className="mt-2 text-[11px] font-light leading-snug text-muted">{c.small}</p>
                  {c.extra && <p className="mt-1 font-mono text-[11px] text-gilt">{c.extra}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>{open && <Lightbox onClose={() => setOpen(false)} />}</AnimatePresence>
    </section>
  )
}
