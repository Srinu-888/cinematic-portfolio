import { motion } from 'framer-motion'
import { heroCopy } from '../../data/content'

/** Rotating certification seal: the animated "watermark emblem" from the reference, made meaningful. */
export function Emblem({ className = '' }: { className?: string }) {
  const r = 52
  const circ = Math.round(2 * Math.PI * r)
  return (
    <div className={className}>
    <motion.div
      aria-label="Certified Zoho Creator Developer"
      role="img"
      animate={{ y: [-3, 3, -3] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      className="relative h-full w-full"
    >
      <span aria-hidden className="absolute inset-2 rounded-full bg-black/80 blur-xl" />
      <svg viewBox="0 0 140 140" className="relative h-full w-full drop-shadow-[0_0_14px_rgba(212,175,55,0.3)]">
        <defs>
          <linearGradient id="seal-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F7E7C4" />
            <stop offset="0.55" stopColor="#C99E5D" />
            <stop offset="1" stopColor="#7a5a2c" />
          </linearGradient>
          <path id="seal-path" d={`M 70,70 m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`} />
        </defs>
        <circle cx="70" cy="70" r="67" fill="#070605" stroke="#8C6D4F" strokeOpacity=".55" />
        <circle cx="70" cy="70" r="38" fill="none" stroke="#D4AF37" strokeOpacity=".5" />
        <g style={{ transformOrigin: '70px 70px', animation: 'spin-slow 26s linear infinite' }}>
          <text fill="#D8C3A5" fontSize="8.4" fontFamily="'JetBrains Mono Variable', monospace" letterSpacing="1">
            <textPath href="#seal-path" textLength={circ - 4} lengthAdjust="spacing">
              {heroCopy.badgeRing}
            </textPath>
          </text>
        </g>
        <path d="M49 91V49h8.5L70 70.5 82.5 49H91v42h-8.5V63L70 84 57.5 63v28z" fill="url(#seal-g)" transform="translate(0 -1) scale(1)" />
      </svg>
    </motion.div>
    </div>
  )
}
