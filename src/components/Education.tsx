import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { certificates, education } from '../data'
import { ArrowIcon } from './Icons'
import { Reveal, Section, SectionTitle } from './Section'

const onTheJob = [
  {
    where: 'Axcel',
    what: 'MERN in production',
    detail: 'Shipping a real multi-role product taught me typed APIs, auth, testing and deployment.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Jest', 'Vercel'],
  },
  {
    where: 'FFC',
    what: 'SAP ERP, MM & FI',
    detail: 'Hands-on with procure-to-pay and finance postings inside a large enterprise.',
    tags: ['SAP MM', 'SAP FI', 'T-codes', 'Procure-to-pay'],
  },
]

function GpaRing({ value, max = 4 }: { value: number; max?: number }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })
  const r = 42
  const c = 2 * Math.PI * r
  return (
    <div className="relative grid h-32 w-32 shrink-0 place-items-center">
      <svg ref={ref} viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
        <defs>
          <linearGradient id="gpa" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--color-accent)" />
            <stop offset="0.5" stopColor="var(--color-accent-deep)" />
            <stop offset="1" stopColor="var(--color-accent)" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-line)" strokeWidth="7" />
        <motion.circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="url(#gpa)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={inView ? { strokeDashoffset: c * (1 - value / max) } : undefined}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="text-center">
        <p className="font-display text-3xl font-bold text-ink">{value.toFixed(2)}</p>
        <p className="text-[11px] uppercase tracking-widest text-muted">CGPA / {max}</p>
      </div>
    </div>
  )
}

const card = 'glass relative h-full overflow-hidden rounded-3xl p-6 sm:p-8'

export default function Education() {
  const showGlowBot = () => {
    window.dispatchEvent(new CustomEvent('show-project', { detail: 'GlowBot' }))
    document.querySelector<HTMLAnchorElement>('a[href="#projects"]')?.click()
  }

  return (
    <Section id="education">
      <SectionTitle
        eyebrow="Education & certificates"
        title="Always"
        accent="learning."
        subtitle="A CS degree for the foundations, real jobs for the practice, and courses to keep up with what's next."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 [&>*]:min-w-0">
        {/* Degree */}
        <Reveal className="lg:col-span-2">
          <div className={`${card} gradient-border`}>
            <span className="pointer-events-none absolute -right-4 -top-6 select-none text-[8rem] leading-none opacity-[0.07]">🎓</span>
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Bachelor's degree</p>
                <h3 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">{education.degree}</h3>
                <p className="mt-2 text-lg text-muted">{education.school}</p>
                <p className="text-muted">{education.location}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Data Structures & Algorithms', 'Databases', 'Software Engineering', 'Web Development'].map((t) => (
                    <span key={t} className="rounded-full bg-canvas px-3 py-1 text-xs text-muted ring-1 ring-line">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <GpaRing value={Number(education.gpa)} />
            </div>
          </div>
        </Reveal>

        {/* Final year project */}
        <Reveal delay={0.1}>
          <div className={card}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-line/60 blur-3xl" />
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-tag text-2xl">✨</span>
            <p className="relative mt-5 font-mono text-xs uppercase tracking-[0.2em] text-accent">Final year project</p>
            <h3 className="relative mt-2 font-display text-2xl font-bold text-ink">GlowBot</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted">
              AI skin analysis from a photo, with treatment ideas, diet plans and nearby dermatologist booking.
            </p>
            <button
              onClick={showGlowBot}
              className="group relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-ink"
            >
              View project <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>
          </div>
        </Reveal>

        {/* Certificates */}
        <Reveal delay={0.15}>
          <div className={card}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Certificates</p>
            <div className="mt-5 space-y-3">
              {certificates.map((c) => (
                <a
                  key={c.title}
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-canvas p-4 transition hover:-translate-y-0.5 hover:border-accent/50"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-tag text-xl">🤖</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold leading-snug text-ink">{c.title}</p>
                    <p className="text-sm text-muted">{c.issuer}</p>
                  </div>
                  <ArrowIcon className="h-4 w-4 shrink-0 text-muted transition group-hover:rotate-45 group-hover:text-ink" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted">Click to verify the credential on Coursera.</p>
          </div>
        </Reveal>

        {/* Learned on the job */}
        <Reveal delay={0.2} className="lg:col-span-2">
          <div className={card}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Learned on the job</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {onTheJob.map((j) => (
                <div key={j.where} className="rounded-2xl border border-line bg-canvas p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-display text-lg font-semibold text-ink">{j.what}</h4>
                    <span className="shrink-0 font-mono text-xs text-muted">@ {j.where}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{j.detail}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {j.tags.map((t) => (
                      <span key={t} className="rounded-md bg-canvas px-2 py-0.5 font-mono text-[11px] text-muted ring-1 ring-line">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
