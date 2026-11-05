import { motion, useMotionValue, useSpring, type Variants } from 'framer-motion'
import heroCutout from '../assets/hero-cutout.webp'
import heroCutoutSm from '../assets/hero-cutout-sm.webp'
import { heroCopy, profile } from '../data/content'
import { GoldDust } from './GoldDust'
import { Emblem } from './ui/Emblem'
import { LinkButton } from './ui/Button'
import { Magnetic } from './ui/Magnetic'

const EASE = [0.16, 1, 0.3, 1] as const

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 22, filter: 'blur(6px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: EASE } },
}
const maskLine: Variants = {
  hidden: { y: '112%' },
  visible: { y: 0, transition: { duration: 1.2, ease: EASE } },
}

const tones = ['text-silver', 'text-gold', 'text-bronze-grad']

export function Hero({ ready }: { ready: boolean }) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 60, damping: 20 })
  const py = useSpring(my, { stiffness: 60, damping: 20 })
  const gx = useSpring(mx, { stiffness: 30, damping: 20 })

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black"
      onPointerMove={(e) => {
        if (e.pointerType !== 'mouse') return
        const r = e.currentTarget.getBoundingClientRect()
        mx.set(((e.clientX - r.left) / r.width - 0.5) * -26)
        my.set(((e.clientY - r.top) / r.height - 0.5) * -14)
      }}
    >
      {/* ---------- Stage lighting ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div
          className="absolute inset-0 opacity-90 blur-[22px]"
          style={{
            background:
              'conic-gradient(from 168deg at 80% -14%, transparent 0deg, rgba(247,231,196,0) 4deg, rgba(247,231,196,.2) 13deg, rgba(247,231,196,.03) 24deg, transparent 30deg)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(60% 70% at 76% 42%, rgba(140,109,79,.20), transparent 70%)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(48% 12% at 76% 100%, rgba(212,175,55,.28), transparent 72%)' }}
        />
      </div>
      <GoldDust className="absolute inset-0 -z-10 h-full w-full" />

      {/* ghost word behind the portrait */}
      <motion.div
        aria-hidden
        style={{ x: gx }}
        className="pointer-events-none absolute right-[1vw] top-[12%] -z-10 hidden select-none font-display leading-none text-transparent lg:block"
      >
        <span
          className="block text-[15vw] opacity-[0.1] [-webkit-text-stroke:1.5px_#C99E5D]"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, #000 45%)' }}
        >
          ERP
        </span>
      </motion.div>

      {/* ---------- Copy ---------- */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? 'visible' : 'hidden'}
        className="relative z-20 flex flex-1 flex-col justify-center px-6 pb-2 pt-24 sm:px-12 sm:pt-28 lg:px-16 lg:pb-16"
      >
        <div className="max-w-[44rem] lg:max-w-[46vw]">
          <motion.p variants={rise} className="mono-label mb-6 flex items-center gap-3 !text-[#C4B29E]">
            <span className="pulse-dot h-2 w-2 rounded-full bg-gilt" />
            {heroCopy.kicker} / {profile.location.toUpperCase()}
          </motion.p>

          <h1 className="display-xl mb-5 select-none [filter:drop-shadow(0_8px_26px_rgba(201,158,93,0.22))] text-[clamp(3.6rem,16.5vw,6.5rem)] md:text-[clamp(5rem,12vw,8rem)] lg:text-[clamp(3.8rem,8.4vw,8.4rem)]">
            <span className="sr-only">{heroCopy.lines.join(' ')}</span>
            {heroCopy.lines.map((line, i) => (
              <span key={line} aria-hidden className="block overflow-hidden pb-[0.05em]">
                <motion.span variants={maskLine} className={`block ${tones[i]}`}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={rise}
            className="mb-4 text-[10px] font-normal uppercase tracking-[0.28em] text-[#C4B29E] sm:text-[11px] md:text-xs"
          >
            {heroCopy.roles.map((r, i) => (
              <span key={r}>
                {i > 0 && <span className="mx-1.5 text-bronze">•</span>}
                {r}
              </span>
            ))}
          </motion.p>

          <motion.p variants={rise} className="body-copy mb-6 max-w-lg text-[13px] sm:mb-8 text-[#A8988B] sm:text-sm">
            {heroCopy.description}
          </motion.p>

          <motion.div variants={rise} className="flex flex-wrap items-center gap-3 sm:gap-5">
            <Magnetic>
              <LinkButton href="#work" icon="↗">
                Explore my work
              </LinkButton>
            </Magnetic>
            <LinkButton href={profile.resumeHref} target="_blank" rel="noopener noreferrer" variant="ghost" icon="↓">
              Download résumé
            </LinkButton>
          </motion.div>

          <motion.div variants={rise} className="mt-10 hidden items-end gap-5 md:flex">
            <div>
              <span className="mb-2 block font-serif text-xl leading-none text-brass">“</span>
              <div className="mb-3 space-y-1 text-[9.5px] font-medium uppercase tracking-[0.24em] text-[#E0D3C5]">
                {heroCopy.quote.map((q) => (
                  <p key={q}>{q}</p>
                ))}
              </div>
              <div className="mb-2 h-px w-28 bg-gradient-to-r from-gilt via-[#E8D7C5]/70 to-transparent shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
              <p className="-ml-0.5 font-script text-[2.6rem] leading-none text-[#D8AB64]">{profile.signature}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* ---------- Portrait ---------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 30 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 1.6, ease: EASE, delay: 0.1 }}
        className="relative z-10 mx-auto -mt-4 aspect-[1004/1350] w-[min(88vw,440px)] lg:absolute lg:bottom-0 lg:right-[1vw] lg:z-10 lg:mt-0 lg:h-[min(92vh,980px)] lg:w-auto xl:right-[3vw]"
      >
        <motion.div style={{ x: px, y: py }} className="relative h-full w-full">
          <img
            src={heroCutout}
            srcSet={`${heroCutoutSm} 702w, ${heroCutout} 1004w`}
            sizes="(min-width:1024px) 40vw, 88vw"
            width={1004}
            height={1350}
            alt="Srinivasa Reddy Mithana, Zoho Technical Lead"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-contain object-bottom [filter:contrast(1.05)_saturate(.96)_brightness(.97)]"
            style={{ maskImage: 'linear-gradient(to top, transparent 0%, #000 13%)' }}
          />
          {/* rim light clipped to the portrait's own silhouette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background: 'linear-gradient(105deg, transparent 45%, rgba(247,214,140,.55) 100%)',
              maskImage: `url(${heroCutout}), linear-gradient(to top, transparent 0%, #000 13%)`,
              maskComposite: 'intersect',
              maskSize: '100% 100%',
              WebkitMaskComposite: 'source-in',
              opacity: 0.32,
            }}
          />
        </motion.div>
      </motion.div>

      <Emblem className="absolute bottom-6 right-4 z-20 h-24 w-24 sm:right-8 lg:bottom-10 lg:right-[2.5vw] lg:h-32 lg:w-32" />

      {/* scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-bronze transition-colors hover:text-gilt md:flex"
      >
        <span className="relative h-10 w-px overflow-hidden bg-bronze/30">
          <span className="absolute inset-x-0 top-0 h-full bg-gilt" style={{ animation: 'scroll-cue 2s ease-in-out infinite' }} />
        </span>
        SCROLL
      </a>
    </section>
  )
}
