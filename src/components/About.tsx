import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'motion/react'
import { profile, stats } from '../data'
import { Reveal, Section, SectionTitle } from './Section'

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

const facts = [
  { k: 'Based in', v: profile.location },
  { k: 'Currently', v: 'MERN Intern @ Axcel' },
  { k: 'Degree', v: 'BSCS, UCP Lahore' },
  { k: 'Speaks', v: profile.languages.join(' · ') },
  { k: 'Open to', v: 'Onsite & Remote' },
]

export default function About() {
  return (
    <Section id="about">
      <SectionTitle eyebrow="About me" title="Turning ideas into" accent="shipped products." />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-white/70">
          {profile.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="text-white/90">
            Now I'm looking for a team where I can keep shipping, keep learning and own features from{' '}
            <span className="text-gradient font-semibold">database to deploy</span>.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass gradient-border rounded-3xl p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">// quick facts</p>
            <dl className="divide-y divide-white/5">
              {facts.map((f) => (
                <div key={f.k} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-sm text-white/50">{f.k}</dt>
                  <dd className="text-right font-medium text-white">{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
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
