import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'motion/react'
import { focusAreas, profile, stats } from '../data'
import CodeCard from './CodeCard'
import { ArrowIcon } from './Icons'
import { Reveal, Section } from './Section'

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, to])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 [&>*]:min-w-0">
        <Reveal className="relative sm:pb-14">
          <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-fuchsia-600/25 via-violet-600/15 to-cyan-500/20 blur-2xl" />
          <div className="relative">
            <CodeCard />
          </div>

          {/* experience badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative mt-4 w-40 rounded-2xl border border-white/15 bg-[#141126]/95 p-5 shadow-2xl shadow-black/50 backdrop-blur sm:absolute sm:bottom-0 sm:right-6 sm:mt-0"
          >
            <div className="mb-3 flex gap-1.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} className="h-3 w-1.5 rounded-sm bg-gradient-to-b from-fuchsia-400 to-cyan-400" />
              ))}
            </div>
            <p className="font-display text-4xl font-bold text-white">
              <Counter to={2} suffix="" />
            </p>
            <p className="mt-1 text-sm font-semibold leading-tight text-white/80">
              Internships
              <br />& counting
            </p>
          </motion.div>
        </Reveal>

        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-300">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
              About me
            </p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Read About My
              <br />
              <span className="text-gradient">Developer Journey!</span>
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-white/65">
              {profile.about.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 space-y-6">
            {focusAreas.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.08}>
                <div className="flex justify-between gap-4 text-xs font-semibold uppercase tracking-wide">
                  <span className="text-white/85">{s.name}</span>
                  <span className="whitespace-nowrap text-fuchsia-300">{s.level}</span>
                </div>
                <div className="mt-2.5 h-[3px] w-full rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.width}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
                  >
                    <span className="absolute -right-1 -top-[3px] h-[9px] w-[9px] rounded-full bg-cyan-300 shadow-[0_0_10px_#67e8f9]" />
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-fuchsia-600/30 transition hover:-translate-y-0.5"
            >
              Hire Me!
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
            >
              Resume <ArrowIcon className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="glass group h-full rounded-3xl p-6 transition hover:-translate-y-1 hover:border-fuchsia-400/30">
              <p className="font-display text-4xl font-bold text-white md:text-5xl">
                <span className="text-gradient">
                  <Counter to={s.value} suffix={s.suffix} />
                </span>
              </p>
              <p className="mt-2 text-sm text-white/55">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
