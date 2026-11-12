import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../hooks/useMediaQuery'

interface P { x: number; y: number; r: number; vx: number; vy: number; a: number; ph: number }

/** Lightweight drifting gold-dust particles. Pauses offscreen / in background tabs; static for reduced motion. */
export function GoldDust({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    if (prefersReducedMotion()) return

    let w = 0, h = 0, raf = 0, visible = true, last = 0
    // one pre-rendered glow sprite instead of a gradient per particle per frame
    const sprite = document.createElement('canvas')
    sprite.width = sprite.height = 64
    const sc = sprite.getContext('2d')
    if (sc) {
      const g = sc.createRadialGradient(32, 32, 0, 32, 32, 32)
      g.addColorStop(0, 'rgba(247,214,140,1)')
      g.addColorStop(1, 'rgba(247,214,140,0)')
      sc.fillStyle = g
      sc.fillRect(0, 0, 64, 64)
    }
    let parts: P[] = []
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const seed = () => {
      const n = Math.min(70, Math.round((w * h) / 24000))
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.6) * 0.12,
        vy: -(Math.random() * 0.22 + 0.05),
        a: Math.random() * 0.5 + 0.2,
        ph: Math.random() * Math.PI * 2,
      }))
    }
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame)
      if (!visible || t - last < 33) return // ~30fps is plenty for slow dust
      last = t
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'
      for (const p of parts) {
        p.x += p.vx
        p.y += p.vy
        if (p.y < -4) { p.y = h + 4; p.x = Math.random() * w }
        if (p.x < -4) p.x = w + 4
        if (p.x > w + 4) p.x = -4
        // brighter toward the stage light (upper right), softly twinkling
        const lit = 0.35 + 0.65 * Math.max(0, 1 - Math.hypot(p.x / w - 0.8, (p.y / h) * 0.7) * 1.1)
        const tw = 0.7 + 0.3 * Math.sin(t / 900 + p.ph)
        ctx.globalAlpha = Math.min(1, p.a * lit * tw)
        const d = p.r * 8
        ctx.drawImage(sprite, p.x - d / 2, p.y - d / 2, d, d)
      }
    }

    resize()
    raf = requestAnimationFrame(frame)
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(canvas)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />
}
