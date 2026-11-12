import { useEffect, useState } from 'react'
import { useScroller } from '../hooks/useScroller'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Projects' },
  { id: 'casestudy', label: 'Case study' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'hire', label: 'Work with me' },
  { id: 'contact', label: 'Contact' },
]

/** Fixed chapter navigator on the right edge (desktop only). */
export function SectionDots({ sectionsReady }: { sectionsReady: boolean }) {
  const [active, setActive] = useState('home')
  const { scrollTo } = useScroller()

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [sectionsReady])

  return (
    <nav aria-label="Page sections" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ul className="flex flex-col items-end gap-3.5">
        {SECTIONS.map((s) => {
          const on = active === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-label={s.label}
                aria-current={on ? 'true' : undefined}
                onClick={(e) => {
                  e.preventDefault()
                  const el = document.getElementById(s.id)
                  if (el) scrollTo(s.id === 'home' ? 0 : el)
                }}
                className="group flex items-center gap-3"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-gilt opacity-0 transition-opacity duration-300 group-hover:opacity-100">{s.label}</span>
                <span className={`block h-[2px] rounded-full transition-all duration-300 ${on ? 'w-7 bg-gilt shadow-[0_0_8px_#D4AF37]' : 'w-3 bg-bronze/50 group-hover:w-5 group-hover:bg-gilt/70'}`} />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
