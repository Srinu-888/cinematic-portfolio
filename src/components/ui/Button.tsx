import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost'
interface Common {
  variant?: Variant
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const styles: Record<Variant, string> = {
  primary:
    'border-bronze bg-[#120F0C]/80 text-[#EAD8C7] hover:border-gilt hover:text-[#FFF5EB] shadow-[0_0_25px_rgba(212,175,55,0.18)]',
  ghost: 'border-bronze/40 text-[#BFA895] hover:border-bronze hover:text-[#EAD8C7]',
}

const base =
  'group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden border px-5 py-3.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-[color,border-color,background-color] duration-300 sm:px-7 sm:tracking-[0.24em]'

function Inner({ children, icon, variant }: Pick<Common, 'children' | 'icon' | 'variant'>) {
  return (
    <>
      {variant === 'primary' && (
        <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E8D7C5]/40 to-transparent" />
      )}
      {/* sweep highlight */}
      <span
        aria-hidden
        className="absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-gilt/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-[330%]"
      />
      <span className="relative">{children}</span>
      {icon && (
        <span className="relative text-xs transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  )
}

export function LinkButton({ variant = 'primary', icon, children, className = '', ...rest }: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={`${base} ${styles[variant]} ${className}`} {...rest}>
      <Inner variant={variant} icon={icon}>{children}</Inner>
    </a>
  )
}

export function ActionButton({ variant = 'primary', icon, children, className = '', ...rest }: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...rest}>
      <Inner variant={variant} icon={icon}>{children}</Inner>
    </button>
  )
}
