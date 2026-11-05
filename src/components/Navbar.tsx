import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { nav, profile } from '../data/content'
import { useScroller } from '../hooks/useScroller'

const SECTION_IDS = ['home', ...nav.map((n) => n.id), 'contact']

export function Navbar({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('home')
  const { stop, start } = useScroller()

  // solid background + hide on scroll down / reveal on scroll up
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 60)
      setHidden(y > last && y > 480)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // scroll-spy
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  // lock scroll while the mobile menu is open
  useEffect(() => {
    if (open) stop()
    else start()
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => window.removeEventListener('keydown', esc)
  }, [open, stop, start])

  const close = () => setOpen(false)

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -100 : 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid || open ? 'border-b border-bronze/15 bg-black/65 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-6 sm:px-12 lg:px-16">
          <a href="#home" onClick={close} className="relative z-[60] text-xs font-semibold tracking-[0.35em] text-[#EAD8C7] transition-opacity hover:opacity-75 sm:text-sm">
            {profile.brand}.
          </a>

          <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-[11px] font-light tracking-[0.28em] text-[#C4B5A5] lg:flex xl:gap-10">
            {nav.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={active === item.id ? 'true' : undefined}
                className={`group relative py-1 transition-colors duration-300 hover:text-[#FFF5EB] ${active === item.id ? 'text-[#FFF5EB]' : ''}`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-gilt transition-all duration-300 ${active === item.id ? 'w-full' : 'w-0 group-hover:w-full group-hover:bg-gilt/50'}`}
                />
              </a>
            ))}
          </nav>

          <div className="relative z-[60] flex items-center gap-3">
            <a
              href="#contact"
              onClick={close}
              className="group hidden items-center gap-2 border border-bronze/50 px-4 py-2 text-[11px] font-light uppercase tracking-[0.24em] text-[#EAD8C7] backdrop-blur-sm transition-colors duration-300 hover:border-gilt sm:flex"
            >
              Let&apos;s talk
              <span className="text-xs transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <span className={`h-px w-6 bg-[#EAD8C7] transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`h-px w-6 bg-[#EAD8C7] transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 pt-16"
          >
            <div aria-hidden className="pointer-events-none absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-gilt/10 blur-[140px]" />
            <nav aria-label="Mobile" className="relative flex flex-col gap-1">
              {[...nav, { label: 'CONTACT', href: '#contact', id: 'contact' }].map((item, i) => (
                <div key={item.id} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={close}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline gap-4 py-1"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-bronze">0{i + 1}</span>
                    <span className={`display-xl text-[clamp(3rem,13vw,4.5rem)] ${active === item.id ? 'text-gold' : 'text-silver'}`}>{item.label}</span>
                  </motion.a>
                </div>
              ))}
            </nav>
            <div className="relative mt-12 space-y-1 font-mono text-[11px] tracking-wider text-muted">
              <a href={`mailto:${profile.email}`} className="block hover:text-gilt">{profile.email}</a>
              <a href={`tel:${profile.phoneSa.tel}`} className="block hover:text-gilt">{profile.phoneSa.display}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
