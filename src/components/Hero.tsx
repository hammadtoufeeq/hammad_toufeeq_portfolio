import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { profile } from '../data'
import Magnetic from './Magnetic'
import { ArrowIcon, brand, GitHubIcon, LinkedInIcon, MailIcon, PinIcon, WhatsAppIcon } from './Icons'

const ease = [0.22, 1, 0.36, 1] as const
const up = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
})

function Typewriter({ words }: { words: string[] }) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[i % words.length]
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setI((n) => n + 1)
      return
    }
    const t = setTimeout(
      () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
      deleting ? 40 : 85,
    )
    return () => clearTimeout(t)
  }, [text, deleting, i, words])

  return (
    <span className="whitespace-nowrap text-accent">
      {text}
      <span className="ml-0.5 inline-block w-[3px] translate-y-[0.1em] animate-pulse bg-accent" style={{ height: '0.95em' }} />
    </span>
  )
}

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-2 [&>*]:min-w-0">
        <div className="relative z-10">
          <motion.span
            {...up(0.2)}
            className="relative inline-block rounded-md bg-tag px-4 py-1.5 text-sm font-semibold text-accent after:absolute after:-bottom-[7px] after:left-6 after:h-0 after:w-0 after:border-x-[7px] after:border-t-[8px] after:border-x-transparent after:border-t-tag"
          >
            Hello, I am
          </motion.span>

          <motion.h1 {...up(0.35)} className="mt-7 font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl xl:text-7xl">
            <span className="text-gradient">Hammad</span> Toufeeq
          </motion.h1>

          {/* Fixed height (2 lines on phones, 1 above) so typing never moves the content below */}
          <motion.p {...up(0.5)} className="mt-5 h-[3.75rem] font-display text-xl font-medium leading-snug text-ink sm:h-9 sm:text-2xl">
            A Professional <br className="sm:hidden" />
            <Typewriter words={profile.roles} />
          </motion.p>

          <motion.p {...up(0.6)} className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            {profile.intro}
          </motion.p>

          <motion.div {...up(0.7)} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-4 font-semibold text-canvas shadow-lg shadow-ink/10 transition hover:bg-accent"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                My Work
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-accent bg-transparent px-7 py-4 font-semibold text-accent backdrop-blur transition hover:bg-tag"
              >
                Resume <ArrowIcon className="h-4 w-4" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div {...up(0.8)} className="mt-10 flex flex-wrap items-center gap-3 text-muted">
            <span className="h-px w-10 bg-accent" />
            {[
              { href: profile.github, icon: <GitHubIcon />, label: 'GitHub', color: brand.github },
              { href: profile.linkedin, icon: <LinkedInIcon />, label: 'LinkedIn', color: brand.linkedin },
              { href: `mailto:${profile.email}`, icon: <MailIcon />, label: 'Email', color: brand.email },
              { href: profile.whatsapp, icon: <WhatsAppIcon />, label: 'WhatsApp', color: brand.whatsapp },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                style={{ backgroundColor: s.color }}
                className="grid h-11 w-11 place-items-center rounded-full text-white shadow-lg shadow-ink/10 ring-1 ring-line transition hover:-translate-y-1 hover:brightness-110"
              >
                {s.icon}
              </a>
            ))}
            <span className="ml-1 inline-flex items-center gap-1.5 text-sm">
              <PinIcon /> {profile.location}
            </span>
          </motion.div>
        </div>

        {/* Monogram composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3, ease }}
          className="relative mx-auto aspect-square w-full max-w-[26rem]"
        >
          <div className="absolute inset-[10%] rounded-full bg-line/70 blur-3xl" />
          <div className="absolute inset-[8%] grid place-items-center overflow-hidden rounded-[2rem] border border-line bg-surface/70">
            <div className="grid-bg absolute inset-0 opacity-60" />
            <span className="text-outline relative select-none font-display text-[8rem] font-bold leading-none sm:text-[10rem]">HT</span>
          </div>

          {/* slowly rotating line triangles */}
          <svg viewBox="0 0 400 400" className="animate-spin-tri pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <defs>
              <linearGradient id="tri-a" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="var(--color-accent)" />
                <stop offset="1" stopColor="var(--color-line-strong)" />
              </linearGradient>
            </defs>
            <polygon points="40,70 370,40 220,300" stroke="url(#tri-a)" strokeOpacity="0.6" strokeWidth="1.2" />
          </svg>
          <svg viewBox="0 0 400 400" className="animate-spin-rev pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <polygon points="90,380 330,250 60,170" stroke="var(--color-line-strong)" strokeWidth="1" />
          </svg>

          <div className="animate-float absolute -right-1 bottom-[14%] rounded-2xl border border-line bg-surface px-4 py-3 shadow-xl backdrop-blur sm:-right-4">
            <p className="font-display text-2xl font-bold text-ink">MERN</p>
            <p className="text-xs text-muted">+ TypeScript</p>
          </div>
          <div className="animate-float absolute -left-1 top-[14%] rounded-2xl bg-tag px-4 py-3 shadow-xl shadow-ink/10 [animation-delay:1.5s] sm:-left-4">
            <p className="text-xs font-medium text-ink">Open to</p>
            <p className="text-sm font-semibold text-ink">New Roles</p>
          </div>
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="flex h-11 w-7 justify-center rounded-full border-2 border-line-strong pt-2">
          <span className="animate-scroll-dot block h-2.5 w-1 rounded-full bg-accent" />
        </span>
      </a>
    </section>
  )
}
