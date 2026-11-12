import { useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/** Full-screen image viewer: Esc / backdrop / Close to dismiss, focus moves to Close on open. */
export function ImageLightbox({
  src,
  alt,
  label,
  onClose,
  children,
  imageClass = 'bg-white',
}: {
  src: string
  alt: string
  label: string
  onClose: () => void
  children?: ReactNode
  imageClass?: string
}) {
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
      aria-label={label}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-8"
      onClick={onClose}
      data-lenis-prevent
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 0.92, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[80vh] w-auto max-w-full rounded-sm shadow-[0_0_80px_rgba(212,175,55,0.2)] ${imageClass}`}
      />
      <div className="mt-5 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
        {children}
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
