import type { HTMLAttributes, PointerEvent } from 'react'

/** Card whose gold spotlight follows the cursor. Writes CSS variables directly: zero re-renders. */
export function SpotlightCard({ className = '', onPointerMove, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const handle = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
    onPointerMove?.(e)
  }
  return <div className={`spot ${className}`} onPointerMove={handle} {...rest} />
}
