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
            <stop offset="0" stopColor="#c084fc" />
            <stop offset="0.5" stopColor="#f472b6" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
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
        <p className="font-display text-3xl font-bold text-white">{value.toFixed(2)}</p>
        <p className="text-[11px] uppercase tracking-widest text-white/45">CGPA / {max}</p>
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
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-300">Bachelor's degree</p>
                <h3 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">{education.degree}</h3>
                <p className="mt-2 text-lg text-white/75">{education.school}</p>
                <p className="text-white/45">{education.location}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {['Data Structures & Algorithms', 'Databases', 'Software Engineering', 'Web Development'].map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/65 ring-1 ring-white/10">
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
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-pink-500/30 to-amber-400/20 blur-3xl" />
            <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-pink-500 to-amber-400 text-2xl">✨</span>
            <p className="relative mt-5 font-mono text-xs uppercase tracking-[0.2em] text-pink-300">Final year project</p>
            <h3 className="relative mt-2 font-display text-2xl font-bold text-white">GlowBot</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-white/60">
              AI skin analysis from a photo, with treatment ideas, diet plans and nearby dermatologist booking.
            </p>
            <button
              onClick={showGlowBot}
              className="group relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-white"
            >
              View project <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>
          </div>
        </Reveal>

        {/* Certificates */}
        <Reveal delay={0.15}>
          <div className={card}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Certificates</p>
            <div className="mt-5 space-y-3">
              {certificates.map((c) => (
                <a
                  key={c.title}
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:-translate-y-0.5 hover:border-cyan-400/40"
                >
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl">🤖</span>
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-semibold leading-snug text-white">{c.title}</p>
                    <p className="text-sm text-white/50">{c.issuer}</p>
                  </div>
                  <ArrowIcon className="h-4 w-4 shrink-0 text-white/40 transition group-hover:rotate-45 group-hover:text-white" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/40">Click to verify the credential on Coursera.</p>
          </div>
        </Reveal>

        {/* Learned on the job */}
        <Reveal delay={0.2} className="lg:col-span-2">
          <div className={card}>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-300">Learned on the job</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {onTheJob.map((j) => (
                <div key={j.where} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h4 className="font-display text-lg font-semibold text-white">{j.what}</h4>
                    <span className="shrink-0 font-mono text-xs text-white/45">@ {j.where}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{j.detail}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {j.tags.map((t) => (
                      <span key={t} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/65 ring-1 ring-white/10">
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
