import { useRef } from 'react'
import { motion } from 'motion/react'
import { marquee, skillGroups } from '../data'
import { Section, SectionTitle } from './Section'

function SpotlightCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        ref.current!.style.setProperty('--x', `${e.clientX - r.left}px`)
        ref.current!.style.setProperty('--y', `${e.clientY - r.top}px`)
      }}
      className="glass group relative h-full overflow-hidden rounded-3xl p-7"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--x)_var(--y),rgba(236,72,153,0.14),transparent_45%)]" />
      {children}
    </div>
  )
}

export default function Skills() {
  return (
    <div id="skills">
      <Section id="skills-inner" className="pb-12 md:pb-16">
        <SectionTitle
          eyebrow="Tech stack"
          title="Tools I use to"
          accent="build & ship."
          subtitle="Comfortable across the whole MERN stack, with TypeScript on both sides and tests to back it up."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((g, gi) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
            >
              <SpotlightCard>
                <div className="relative mb-6 flex items-center gap-3">
                  <span className={`h-10 w-1.5 rounded-full bg-gradient-to-b ${g.color}`} />
                  <h3 className="font-display text-2xl font-semibold text-white">{g.title}</h3>
                </div>
                <div className="relative flex flex-wrap gap-2.5">
                  {g.items.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.1 + i * 0.04, type: 'spring', stiffness: 260, damping: 18 }}
                      whileHover={{ y: -3, scale: 1.06 }}
                      className="cursor-default rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:border-white/30 hover:bg-white/10"
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="overflow-hidden py-6">
      <div className="relative -mx-4 -rotate-2 border-y border-white/10 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-cyan-500/20 py-5">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="animate-marquee flex shrink-0 gap-10 pr-10">
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-semibold text-white/80 md:text-3xl">
                {m}
                <span className="text-fuchsia-400">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
