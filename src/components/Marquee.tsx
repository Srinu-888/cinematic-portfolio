import { marquee } from '../data/content'

/** Infinite capability ticker between hero and about. Pure CSS animation; pauses on hover. */
export function Marquee() {
  return (
    <div aria-hidden className="marquee relative overflow-hidden border-y border-bronze/20 bg-[#070605] py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-black to-transparent" />
      <div className="marquee-track flex items-center">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center">
            {marquee.map((item, i) => (
              <li key={`${dup}-${item}`} className="flex items-center">
                <span
                  className={`font-display px-8 text-4xl uppercase leading-none tracking-wide sm:text-5xl ${
                    i % 2 ? 'text-gold' : 'text-transparent [-webkit-text-stroke:1px_rgba(201,158,93,0.65)]'
                  }`}
                >
                  {item}
                </span>
                <span className="text-sm text-gilt/70">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
