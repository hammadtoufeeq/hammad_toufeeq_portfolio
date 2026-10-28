import { motion } from 'motion/react'
import { certificates, education } from '../data'
import { ArrowIcon } from './Icons'
import { Reveal, Section, SectionTitle } from './Section'

export default function Education() {
  return (
    <Section id="education">
      <SectionTitle eyebrow="Education & certificates" title="Always" accent="learning." />

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="glass gradient-border relative h-full overflow-hidden rounded-3xl p-8">
            <motion.span
              className="absolute -right-6 -top-6 text-[9rem] leading-none opacity-10"
              animate={{ rotate: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              🎓
            </motion.span>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-300">Bachelor's degree</p>
            <h3 className="mt-3 font-display text-3xl font-bold text-white">{education.degree}</h3>
            <p className="mt-2 text-lg text-white/75">{education.school}</p>
            <p className="text-white/45">{education.location}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="block text-xs text-white/45">CGPA</span>
                <span className="font-display text-2xl font-bold text-gradient">{education.gpa}</span>
              </span>
              <span className="max-w-xs rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <span className="block text-xs text-white/45">Final year project</span>
                <span className="font-semibold text-white">GlowBot: AI skin analysis & care</span>
              </span>
            </div>
          </div>
        </Reveal>

        <div className="space-y-4">
          {certificates.map((c, i) => (
            <Reveal key={c.title} delay={0.1 + i * 0.1}>
              <a
                href={c.link}
                target="_blank"
                rel="noreferrer"
                className="glass group flex items-center gap-4 rounded-3xl p-6 transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-2xl">🤖</span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-semibold text-white">{c.title}</p>
                  <p className="text-sm text-white/50">{c.issuer}</p>
                  <p className="mt-1 text-xs font-medium text-cyan-300">Verify credential</p>
                </div>
                <ArrowIcon className="h-5 w-5 text-white/40 transition group-hover:rotate-45 group-hover:text-white" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
