import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { experience } from '../data'
import { Reveal, Section, SectionTitle } from './Section'

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <Section id="experience">
      <SectionTitle eyebrow="Experience" title="Where I've been" accent="getting real." subtitle="Two internships, one shipped production platform." />

      <div ref={ref} className="relative pl-8 md:pl-12">
        <div className="absolute bottom-0 left-[7px] top-0 w-0.5 bg-tag md:left-[11px]" />
        <motion.div style={{ height }} className="absolute left-[7px] top-0 w-0.5 bg-accent md:left-[11px]" />

        <div className="space-y-10">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.1} className="relative">
              <span className="absolute -left-8 top-8 grid h-4 w-4 place-items-center md:-left-12 md:h-6 md:w-6">
                <span className="absolute h-full w-full rounded-full bg-line/60 blur-sm" />
                <span className="relative h-3 w-3 rounded-full border-2 border-ink bg-accent md:h-4 md:w-4" />
              </span>

              <article className={`glass rounded-3xl p-6 md:p-8 ${e.current ? 'gradient-border' : ''}`}>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">{e.role}</h3>
                    <p className="mt-1 text-lg font-medium text-accent">{e.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas px-3.5 py-1.5 font-mono text-xs text-ink">
                      {e.current && <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />}
                      {e.period}
                    </p>
                    <p className="mt-2 text-sm text-muted">{e.location}</p>
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-muted">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span className="leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded-full bg-canvas px-3 py-1 font-mono text-xs text-muted ring-1 ring-line">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
