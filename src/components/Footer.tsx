import { profile } from '../data'
import { brand, GitHubIcon, LinkedInIcon, MailIcon, WhatsAppIcon } from './Icons'

const nav = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const socials = [
  { href: profile.github, label: 'GitHub', icon: <GitHubIcon className="h-4 w-4" />, color: brand.github },
  { href: profile.linkedin, label: 'LinkedIn', icon: <LinkedInIcon className="h-4 w-4" />, color: brand.linkedin },
  { href: `mailto:${profile.email}`, label: 'Email', icon: <MailIcon className="h-4 w-4" />, color: brand.email },
  { href: profile.whatsapp, label: 'WhatsApp', icon: <WhatsAppIcon className="h-4 w-4" />, color: brand.whatsapp },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-canvas">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display text-sm font-bold text-canvas">
              HT
            </span>
            <span>
              <span className="block font-display text-lg font-semibold text-ink">{profile.name}</span>
              <span className="block text-sm text-muted">{profile.title}</span>
            </span>
          </a>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            Building full-stack web apps with React, Node.js, Express and MongoDB. Open to full-time roles, onsite in Lahore or remote.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                style={{ backgroundColor: s.color }}
                className="grid h-10 w-10 place-items-center rounded-full text-white ring-1 ring-line transition hover:-translate-y-0.5 hover:brightness-110"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Navigate</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm md:grid-cols-1">
            {nav.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-muted transition hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Get in touch</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2.5 text-muted transition hover:text-ink">
                <MailIcon className="h-4 w-4 shrink-0 text-[#EA4335]" /> {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 text-muted transition hover:text-ink">
                <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" /> {profile.phone}
              </a>
            </li>
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 font-semibold text-canvas transition hover:bg-accent">
                Resume
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <a href="#top" className="transition hover:text-ink">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
