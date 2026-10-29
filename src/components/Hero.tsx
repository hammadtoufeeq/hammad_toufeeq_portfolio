import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { profile } from '../data'
import Magnetic from './Magnetic'
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons'

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
    <span className="whitespace-nowrap text-fuchsia-300">
      {text}
      <span className="ml-0.5 inline-block w-[3px] translate-y-[0.1em] animate-pulse bg-fuchsia-400" style={{ height: '0.95em' }} />
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
            className="relative inline-block rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-1.5 text-sm font-semibold text-white after:absolute after:-bottom-[7px] after:left-6 after:h-0 after:w-0 after:border-x-[7px] after:border-t-[8px] after:border-x-transparent after:border-t-violet-600"
          >
            Hello, I am
          </motion.span>

          <motion.h1 {...up(0.35)} className="mt-7 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl">
            <span className="text-gradient">Hammad</span> Toufeeq
          </motion.h1>

          {/* Fixed height (2 lines on phones, 1 above) so typing never moves the content below */}
          <motion.p {...up(0.5)} className="mt-5 h-[3.75rem] font-display text-xl font-medium leading-snug text-white/90 sm:h-9 sm:text-2xl">
            A Professional <br className="sm:hidden" />
            <Typewriter words={profile.roles} />
          </motion.p>

          <motion.p {...up(0.6)} className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
            {profile.intro}
          </motion.p>

          <motion.div {...up(0.7)} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-7 py-4 font-semibold text-white shadow-lg shadow-fuchsia-600/30 transition hover:shadow-fuchsia-500/50"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                My Work
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
              >
                Resume <ArrowIcon className="h-4 w-4" />
              </a>
            </Magnetic>
          </motion.div>

          <motion.div {...up(0.8)} className="mt-10 flex flex-wrap items-center gap-3 text-white/60">
            <span className="h-px w-10 bg-gradient-to-r from-fuchsia-500 to-cyan-400" />
            {[
              { href: profile.github, icon: <GitHubIcon />, label: 'GitHub' },
              { href: profile.linkedin, icon: <LinkedInIcon />, label: 'LinkedIn' },
              { href: `mailto:${profile.email}`, icon: <MailIcon />, label: 'Email' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-fuchsia-400/60 hover:text-white"
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
          <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-fuchsia-600/40 via-violet-600/25 to-cyan-500/30 blur-3xl" />
          <div className="absolute inset-[8%] grid place-items-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
            <div className="grid-bg absolute inset-0 opacity-60" />
            <span className="text-outline relative select-none font-display text-[8rem] font-bold leading-none sm:text-[10rem]">HT</span>
          </div>

          {/* slowly rotating line triangles */}
          <svg viewBox="0 0 400 400" className="animate-spin-tri pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <defs>
              <linearGradient id="tri-a" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#c084fc" />
                <stop offset="1" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
            <polygon points="40,70 370,40 220,300" stroke="url(#tri-a)" strokeOpacity="0.6" strokeWidth="1.2" />
          </svg>
          <svg viewBox="0 0 400 400" className="animate-spin-rev pointer-events-none absolute inset-0 h-full w-full" fill="none" aria-hidden>
            <polygon points="90,380 330,250 60,170" stroke="rgba(244,114,182,0.45)" strokeWidth="1" />
          </svg>

          <div className="animate-float absolute -right-1 bottom-[14%] rounded-2xl border border-white/15 bg-[#141126]/90 px-4 py-3 shadow-xl backdrop-blur sm:-right-4">
            <p className="font-display text-2xl font-bold text-white">MERN</p>
            <p className="text-xs text-white/55">+ TypeScript</p>
          </div>
          <div className="animate-float absolute -left-1 top-[14%] rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 shadow-xl shadow-fuchsia-600/30 [animation-delay:1.5s] sm:-left-4">
            <p className="text-xs font-medium text-white/85">Open to</p>
            <p className="text-sm font-semibold text-white">New Roles</p>
          </div>
        </motion.div>
      </div>

      <a href="#about" aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <span className="flex h-11 w-7 justify-center rounded-full border-2 border-white/25 pt-2">
          <span className="animate-scroll-dot block h-2.5 w-1 rounded-full bg-fuchsia-400" />
        </span>
      </a>
    </section>
  )
}
