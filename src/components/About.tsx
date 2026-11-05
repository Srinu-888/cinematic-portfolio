import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type Variants } from 'framer-motion'
import aboutImg from '../assets/about-portrait.webp'
import { about, profile } from '../data/content'
import { Brackets } from './ui/Brackets'
import { CountUp } from './CountUp'

const EASE = [0.16, 1, 0.3, 1] as const
const container: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } } }
const rise: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1.1, ease: EASE } },
}

/** Renders **bold** segments as highlighted spans. */
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? (
      <strong key={i} className="font-medium text-[#F3DBB3]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

export function About() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const spotX = useMotionValue(200)
  const spotY = useMotionValue(200)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 18, stiffness: 200 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 18, stiffness: 200 })
  const spotlight = useTransform(
    [spotX, spotY],
    ([x, y]) => `radial-gradient(circle 240px at ${x}px ${y}px, rgba(255,255,255,0.3), rgba(212,175,55,0.16), transparent 80%)`,
  )

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width - 0.5)
    mouseY.set((e.clientY - r.top) / r.height - 0.5)
    spotX.set(e.clientX - r.left)
    spotY.set(e.clientY - r.top)
  }
  const onLeave = () => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section id="about" className="relative flex min-h-screen items-center overflow-hidden bg-black px-6 py-24 sm:px-12 lg:px-20 lg:py-32">
      <motion.div
        aria-hidden
        animate={{ scale: [1, 1.2, 1], opacity: [0.07, 0.15, 0.07] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-[12%] top-1/4 h-[32rem] w-[32rem] rounded-full bg-gilt blur-[160px]"
      />
      <div aria-hidden className="pointer-events-none absolute bottom-[12%] right-1/4 h-[28rem] w-[28rem] rounded-full bg-bronze/10 blur-[170px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="eyebrow">01 / ABOUT ME</span>
          <span className="h-px w-20 bg-gradient-to-r from-gilt/80 via-bronze/40 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <motion.h2 variants={rise} className="display-xl glow-gold mb-7 select-none text-[clamp(2.8rem,7.4vw,5.4rem)]">
              <span className="text-silver block">{about.headline[0]}</span>
              <span className="text-gold block">{about.headline[1]}</span>
            </motion.h2>

            <div className="mb-10 max-w-xl space-y-4">
              {about.paragraphs.map((p, i) => (
                <motion.p key={i} variants={rise} className={`body-copy text-[13px] sm:text-sm md:text-[14.5px] ${i === 0 ? 'text-[#c4b6a9]' : ''}`}>
                  {rich(p)}
                </motion.p>
              ))}
            </div>

            <motion.div variants={rise} className="mb-8 flex flex-wrap gap-2">
              <a
                href="#venture"
                className="flex items-center gap-2 rounded-sm border border-gilt/70 bg-gilt/10 px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#F3DBB3] transition-colors hover:bg-gilt hover:text-black"
              >
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-gilt" />
                {about.venturePill}
              </a>
              {about.competencies.map((c) => (
                <span key={c} className="rounded-sm border border-bronze/35 bg-[#171310] px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[#E8D7C5]">
                  {c}
                </span>
              ))}
            </motion.div>

            <motion.dl variants={rise} className="grid grid-cols-2 gap-6 border-t border-bronze/25 pb-2 pt-6 sm:grid-cols-4">
              {about.stats.map((s, i) => (
                <div key={s.label} className="flex flex-col">
                  <dd className={`order-1 font-display text-4xl font-light tracking-tight sm:text-5xl ${i % 2 ? 'text-gilt' : 'text-[#F4EBE2]'}`}>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="order-2 mt-1 text-[10px] font-medium uppercase leading-snug tracking-[0.2em] text-muted">{s.label}</dt>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Portrait */}
          <div className="relative flex items-center justify-center lg:col-span-5" style={{ perspective: 1400 }}>
            <motion.div
              aria-hidden
              animate={{ scale: hovered ? 1.15 : 1, opacity: hovered ? 0.35 : 0.15, rotate: hovered ? 180 : 0 }}
              transition={{ duration: 3, ease: 'easeOut' }}
              className="pointer-events-none absolute -inset-6 rounded-3xl bg-[conic-gradient(from_0deg,#D4AF37_0%,#8C6D4F_30%,transparent_60%,#D4AF37_100%)] blur-2xl"
            />
            <motion.div
              ref={cardRef}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onPointerMove={onMove}
              onPointerEnter={() => setHovered(true)}
              onPointerLeave={onLeave}
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
              className="group relative w-full max-w-[400px] rounded-sm border border-bronze/40 bg-[#120F0C]/80 p-3.5 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-xl transition-colors duration-500 hover:border-gilt/80"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-sm">
                <motion.div
                  animate={{ x: hovered ? ['-100%', '220%'] : '-100%' }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  className="h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-gilt/25 to-transparent"
                />
              </div>
              <Brackets size={24} thick={2} />

              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-black">
                <img
                  src={aboutImg}
                  width={1080}
                  height={1350}
                  loading="lazy"
                  decoding="async"
                  alt="Srinivasa Reddy Mithana at work with development screens"
                  className="h-full w-full object-cover object-[50%_20%] brightness-[0.92] contrast-[1.06] transition-all duration-700 ease-out group-hover:brightness-105 group-hover:contrast-[1.1]"
                />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
                  style={{ background: spotlight, opacity: hovered ? 1 : 0 }}
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute inset-x-4 bottom-3 z-20 flex items-end justify-between">
                  <span className="mono-label !text-[#C4B29E]">{about.caption}</span>
                  <span className="select-none font-script text-4xl text-[#F2D8A7] drop-shadow-[0_0_12px_rgba(242,216,167,0.5)] transition-colors duration-300 group-hover:text-white">
                    {profile.signature}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
