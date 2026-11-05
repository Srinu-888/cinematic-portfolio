import { useEffect, useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { Brackets } from './ui/Brackets'
import { ActionButton, LinkButton } from './ui/Button'

const EASE = [0.16, 1, 0.3, 1] as const
const topics = ['ERP system', 'Workflow automation', 'API integration', 'Something else']

const fieldClass =
  'w-full rounded-sm border border-bronze/30 bg-[#120F0C] px-4 py-3 text-xs text-white outline-none transition-colors placeholder:text-bronze/50 focus:border-gilt'

const channels = [
  { k: 'EMAIL', v: profile.email, href: `mailto:${profile.email}` },
  { k: 'CALL', v: profile.phoneCall.display, href: `tel:${profile.phoneCall.tel}` },
  { k: 'WHATSAPP', v: profile.whatsapp.display, href: `https://wa.me/${profile.whatsapp.wa}`, ext: true },
  { k: 'LINKEDIN', v: 'mithana-srinivasa-reddy', href: profile.linkedin, ext: true },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', topic: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [honey, setHoney] = useState('')

  // "Request a walkthrough" on a project card pre-fills the message
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const ask = (e as CustomEvent<string>).detail
      setStatus('idle')
      setForm((f) => ({ ...f, message: f.message || `Hello Srinivasa, I would like ${ask}.` }))
    }
    window.addEventListener('contact:prefill', onPrefill)
    return () => window.removeEventListener('contact:prefill', onPrefill)
  }, [])

  const set = (key: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const body = () =>
    [form.message.trim(), form.topic && `Topic: ${form.topic}`, `${form.name.trim()}${form.email ? ` (${form.email.trim()})` : ''}`]
      .filter(Boolean)
      .join('\n\n')

  const whatsapp = `https://wa.me/${profile.whatsapp.wa}?text=${encodeURIComponent(body())}`
  const subject = `Portfolio enquiry${form.topic ? `: ${form.topic}` : ''} from ${form.name.trim()}`
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body())}`

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    if (honey) return setStatus('sent') // bot filled the hidden field: pretend success, send nothing
    setStatus('sending')
    try {
      const res = await fetch(profile.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          topic: form.topic || 'Not specified',
          message: form.message.trim(),
          _subject: subject,
          _template: 'table',
          _captcha: 'false',
        }),
      })
      const data = await res.json().catch(() => null)
      const ok = res.ok && data && (data.success === true || data.success === 'true')
      setStatus(ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer id="contact" className="relative overflow-hidden bg-black px-6 pb-10 pt-24 sm:px-12 lg:px-20">
      <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-[30rem] w-[30rem] rounded-full bg-gilt/[0.06] blur-[170px]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mb-6 flex items-center gap-4"
            >
              <span className="eyebrow">07 / CONTACT</span>
              <span className="h-px w-16 bg-gradient-to-r from-gilt/80 via-bronze/40 to-transparent" />
            </motion.div>

            <h2 className="display-xl glow-gold mb-8 select-none text-[clamp(2.9rem,8vw,5.2rem)]">
              {[
                ['LET’S BUILD', 'text-silver'],
                ['SOMETHING', 'text-gold'],
                ['THAT WORKS.', 'text-gold'],
              ].map(([t, tone], i) => (
                <motion.span key={t} className="block overflow-hidden pb-[0.06em]" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <motion.span
                    className={`block ${tone}`}
                    variants={{ hidden: { y: '112%' }, visible: { y: 0, transition: { duration: 1.05, ease: EASE, delay: i * 0.1 } } }}
                  >
                    {t}
                  </motion.span>
                </motion.span>
              ))}
            </h2>

            <p className="mb-9 max-w-md text-[13px] font-light leading-relaxed text-muted">
              Zoho consulting, ERP development, workflow automation, Creator apps, CRM systems or API integrations: tell me about the process you want to improve.
            </p>

            <ul className="max-w-md divide-y divide-bronze/20 border-y border-bronze/25">
              {channels.map((c) => (
                <li key={c.k}>
                  <a
                    href={c.href}
                    target={c.ext ? '_blank' : undefined}
                    rel={c.ext ? 'noopener noreferrer' : undefined}
                    className="group flex items-center justify-between gap-4 py-4"
                  >
                    <span className="font-mono text-[10px] tracking-[0.25em] text-bronze">{c.k}</span>
                    <span className="flex items-center gap-3 text-[13px] text-[#EAD8C7] transition-colors group-hover:text-champagne">
                      <span className="break-all text-right">{c.v}</span>
                      <span className="text-gilt transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mono-label mt-5 flex items-center gap-3 !text-muted">
              <span className="pulse-dot h-2 w-2 rounded-full bg-gilt" />
              {profile.location} • Open to remote and international projects
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="group relative w-full overflow-hidden rounded-sm border border-bronze/40 bg-[#0A0806] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.9)] sm:p-10 lg:col-span-7"
          >
            <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gilt/70 to-transparent" />
            <Brackets size={12} thick={1} />

            {status === 'sent' ? (
              <div className="space-y-5 py-12 text-center" role="status">
                <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gilt text-gilt">✓</span>
                <h3 className="display-xl text-4xl text-white">Message sent</h3>
                <p className="mx-auto max-w-sm text-xs font-light leading-relaxed text-muted">
                  Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}. Your message is in my inbox and I will reply to {form.email || 'your email'} soon.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <LinkButton href={whatsapp} target="_blank" rel="noopener noreferrer" icon="↗">
                    Also message on WhatsApp
                  </LinkButton>
                  <ActionButton
                    variant="ghost"
                    onClick={() => {
                      setForm({ name: '', email: '', topic: '', message: '' })
                      setStatus('idle')
                    }}
                  >
                    Send another
                  </ActionButton>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <input
                  type="text"
                  name="_honey"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block font-mono text-[9.5px] uppercase tracking-[0.2em] text-bronze">{'// Your name'}</span>
                    <input required name="name" autoComplete="name" value={form.name} onChange={set('name')} placeholder="Enter your name" className={fieldClass} />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-mono text-[9.5px] uppercase tracking-[0.2em] text-bronze">{'// Your email'}</span>
                    <input required type="email" name="email" autoComplete="email" value={form.email} onChange={set('email')} placeholder="Enter your email" className={fieldClass} />
                  </label>
                </div>

                <fieldset>
                  <legend className="mb-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-bronze">{'// I need help with'}</legend>
                  <div className="flex flex-wrap gap-2">
                    {topics.map((t) => {
                      const on = form.topic === t
                      return (
                        <button
                          key={t}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setForm((f) => ({ ...f, topic: on ? '' : t }))}
                          className={`rounded-sm border px-3.5 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                            on ? 'border-gilt bg-gilt text-black' : 'border-bronze/35 bg-[#171310] text-[#E8D7C5] hover:border-gilt/60'
                          }`}
                        >
                          {t}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <label className="block">
                  <span className="mb-2 block font-mono text-[9.5px] uppercase tracking-[0.2em] text-bronze">{'// Your message'}</span>
                  <textarea required name="message" rows={5} value={form.message} onChange={set('message')} placeholder="Tell me about the process, system or integration you have in mind..." className={`${fieldClass} resize-none`} />
                </label>

                {status === 'error' && (
                  <div role="alert" className="rounded-sm border border-gilt/50 bg-gilt/[0.07] p-4 text-xs font-light leading-relaxed text-[#E8D7C5]">
                    The message could not be sent automatically. Please try again, or use{' '}
                    <a href={mailto} className="font-medium text-gilt underline underline-offset-4">
                      your email app
                    </a>{' '}
                    or WhatsApp. Your text is kept.
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <ActionButton type="submit" icon={status === 'sending' ? '…' : '↗'} disabled={status === 'sending'} className="flex-1 disabled:opacity-60">
                    {status === 'sending' ? 'Sending' : status === 'error' ? 'Try again' : 'Send message'}
                  </ActionButton>
                  <LinkButton href={whatsapp} target="_blank" rel="noopener noreferrer" variant="ghost" icon="↗" className="flex-1">
                    WhatsApp
                  </LinkButton>
                </div>
                <p className="text-center font-mono text-[9.5px] tracking-[0.12em] text-dim">Delivered straight to my inbox. This site stores nothing.</p>
              </form>
            )}
          </motion.div>
        </div>

        {/* Footer line */}
        <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-bronze/15 pt-8 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-bronze">{profile.name} • {profile.title}</p>
            <p className="mt-1 font-mono text-[10px] text-dim">© {new Date().getFullYear()} All rights reserved</p>
          </div>
          <nav aria-label="Footer" className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-bronze">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gilt">LinkedIn</a>
            <a href={profile.resumeHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gilt">Résumé</a>
            <a href={profile.certificateHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gilt">Certificate</a>
            <a href="#home" className="transition-colors hover:text-gilt">Back to top ↑</a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
