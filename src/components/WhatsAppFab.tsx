import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { waLink } from '../data/content'

const MESSAGE = 'Hello Srinivasa, I found your portfolio and would like to discuss a Zoho project.'

/** Floating WhatsApp shortcut that appears once the visitor has scrolled past the hero. */
export function WhatsAppFab() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <aside aria-label="Quick contact">
    <AnimatePresence>
      {show && (
        <motion.a
          href={waLink(MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[60] flex items-center gap-3 rounded-full border border-gilt/70 bg-black/80 py-3 pl-4 pr-4 text-[#F3DBB3] shadow-[0_10px_35px_rgba(212,175,55,0.25)] backdrop-blur-md transition-colors hover:bg-gilt hover:text-black sm:pr-5"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M4 20l1.4-4.1A8 8 0 1 1 8.2 18.7L4 20z" />
            <path d="M9 10.2c.3 1.7 2.1 3.5 3.8 3.9l1.1-1.1-1.6-.9-.7.5c-.8-.4-1.4-1-1.8-1.8l.5-.7-.9-1.6L9 10.2z" fill="currentColor" stroke="none" />
          </svg>
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.2em] sm:inline">Chat on WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
    </aside>
  )
}
