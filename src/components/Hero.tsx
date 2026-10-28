import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data'
import CodeCard from './CodeCard'
import Magnetic from './Magnetic'
import { ArrowIcon, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from './Icons'

const floatingChips = [
  { label: 'React', className: '-left-12 -top-6', color: 'from-cyan-400 to-blue-500', d: 0 },
  { label: 'Node.js', className: '-right-10 top-[38%]', color: 'from-lime-400 to-emerald-500', d: 0.6 },
  { label: 'TypeScript', className: '-left-14 -bottom-6', color: 'from-blue-400 to-indigo-500', d: 1.2 },
]

const roleColors = ['text-fuchsia-300', 'text-cyan-300', 'text-amber-300', 'text-pink-300']

function RotatingRole() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600)
    return () => clearInterval(t)
  }, [])
  return (
    <span className="relative inline-flex h-[1.5em] items-center overflow-hidden align-bottom leading-normal">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.roles[i]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className={`whitespace-nowrap ${roleColors[i % roleColors.length]}`}
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const word = {
  hidden: { y: '110%' },
  show: (i: number) => ({ y: 0, transition: { delay: 0.3 + i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } }),
}

export default function Hero() {
  return (
    <section id="top" className="relative mx-auto flex min-h-screen max-w-7xl items-center px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="grid w-full items-center gap-16 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Available for full-time roles · Onsite & Remote
          </motion.div>

          <h1 className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl xl:text-8xl">
            {["Hi, I'm", 'Hammad', 'Toufeeq.'].map((w, i) => (
              <span key={w} className="mr-4 inline-block overflow-hidden pb-2 align-top">
                <motion.span custom={i} variants={word} initial="hidden" animate="show" className={`inline-block ${i === 1 ? 'text-gradient' : ''}`}>
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-6 font-display text-2xl font-medium text-white/90 sm:text-3xl"
          >
            <RotatingRole />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/60"
          >
            {profile.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-7 py-4 font-semibold text-white shadow-lg shadow-fuchsia-600/30 transition hover:shadow-fuchsia-500/50"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                See my work
                <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.resume}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
              >
                <DownloadIcon /> Download CV
              </a>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.25 }}
            className="mt-10 flex flex-wrap items-center gap-3 text-white/60"
          >
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
            <span className="ml-2 inline-flex items-center gap-1.5 text-sm">
              <PinIcon /> {profile.location}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-fuchsia-600/40 via-violet-600/25 to-cyan-500/30 blur-3xl" />
          <CodeCard />

          {floatingChips.map((c) => (
            <motion.div
              key={c.label}
              className={`absolute hidden xl:block ${c.className}`}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: c.d }}
            >
              <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-[#141126]/90 px-3.5 py-2 text-sm font-semibold text-white shadow-xl shadow-black/40 backdrop-blur">
                <span className={`h-2.5 w-2.5 rounded-full bg-gradient-to-br ${c.color}`} />
                {c.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-11 w-7 justify-center rounded-full border-2 border-white/25 pt-2">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/80"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </div>
      </motion.a>
    </section>
  )
}
