import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data'
import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from './Icons'
import { Reveal, Section } from './Section'

// Web3Forms (https://web3forms.com) emails submissions to the inbox. Set VITE_WEB3FORMS_KEY in .env / Vercel.
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined
const TIMEOUT_MS = 15000

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [copied, setCopied] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('botcheck')) return
    if (!WEB3FORMS_KEY) {
      console.error('VITE_WEB3FORMS_KEY is not set')
      return setStatus('error')
    }

    setStatus('sending')
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio message from ${data.get('name')}`,
          from_name: 'Hammad Toufeeq Portfolio',
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
        }),
        signal: controller.signal,
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json.success) throw new Error(json.message ?? 'Send failed')
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      clearTimeout(timer)
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const channels = [
    { icon: <MailIcon />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: <PhoneIcon />, label: 'Phone / WhatsApp', value: profile.phone, href: profile.whatsapp },
    { icon: <LinkedInIcon />, label: 'LinkedIn', value: 'in/hammad-toufeeq', href: profile.linkedin },
    { icon: <GitHubIcon />, label: 'GitHub', value: 'hammadtoufeeq', href: profile.github },
  ]

  const input =
    'w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-white placeholder:text-white/30 outline-none transition focus:border-fuchsia-400/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-fuchsia-500/10'

  return (
    <Section id="contact">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-700/30 via-fuchsia-700/20 to-cyan-600/20 p-6 sm:p-10 md:p-14">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-fuchsia-500/30 blur-3xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 [&>*]:min-w-0">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-200">Let's talk</p>
              <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                Got a role or a project? <span className="text-gradient">Let's build it.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-white/70">
                I'm open to full-time MERN / full-stack roles, onsite in Lahore or remote. I usually reply within a day.
              </p>

              <button
                onClick={copyEmail}
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/20 py-2 pl-5 pr-2 font-mono text-sm text-white transition hover:border-white/50"
              >
                {profile.email}
                <span className="rounded-full bg-white px-3 py-1.5 font-sans text-xs font-semibold text-ink">{copied ? 'Copied ✓' : 'Copy'}</span>
              </button>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {channels.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:-translate-y-1 hover:border-white/30"
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white transition group-hover:bg-gradient-to-br group-hover:from-fuchsia-500 group-hover:to-cyan-500">
                      {c.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs text-white/50">{c.label}</span>
                      <span className="block truncate text-sm font-medium text-white">{c.value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <form onSubmit={onSubmit} className="glass rounded-3xl p-6 sm:p-8">
              <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/70">Your name</label>
                  <input id="name" name="name" required autoComplete="name" placeholder="Jane from Acme" className={input} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-white/70">Your email</label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className={input} />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-white/70">Message</label>
                  <textarea id="message" name="message" required rows={5} placeholder="Tell me about the role or project…" className={`${input} resize-none`} />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 py-4 font-semibold text-white shadow-lg shadow-fuchsia-600/30 transition hover:shadow-fuchsia-500/50 disabled:opacity-60"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              <AnimatePresence>
                {(status === 'sent' || status === 'error') && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    role="status"
                    className={`mt-4 text-center text-sm ${status === 'sent' ? 'text-emerald-300' : 'text-rose-300'}`}
                  >
                    {status === 'sent' ? "Thanks! Your message is on its way. I'll get back to you soon." : `Something went wrong. Please email me at ${profile.email}.`}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
