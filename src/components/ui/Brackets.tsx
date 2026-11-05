/** Four L-shaped gold corner marks, the reference design's signature framing device. */
export function Brackets({ size = 14, thick = 2, className = '' }: { size?: number; thick?: number; className?: string }) {
  const base = 'absolute border-gilt/70 transition-colors duration-500 group-hover:border-gilt pointer-events-none'
  const s = { width: size, height: size, borderWidth: 0 } as const
  return (
    <span aria-hidden className={className}>
      <span className={`${base} left-0 top-0`} style={{ ...s, borderTopWidth: thick, borderLeftWidth: thick }} />
      <span className={`${base} right-0 top-0`} style={{ ...s, borderTopWidth: thick, borderRightWidth: thick }} />
      <span className={`${base} bottom-0 left-0`} style={{ ...s, borderBottomWidth: thick, borderLeftWidth: thick }} />
      <span className={`${base} bottom-0 right-0`} style={{ ...s, borderBottomWidth: thick, borderRightWidth: thick }} />
    </span>
  )
}
