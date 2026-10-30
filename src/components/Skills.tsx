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
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(420px_circle_at_var(--x)_var(--y),rgba(125,96,54,0.08),transparent_45%)]" />
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
                  <h3 className="font-display text-2xl font-semibold text-ink">{g.title}</h3>
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
                      className="cursor-default rounded-xl border border-line bg-canvas px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-line-strong hover:bg-tag"
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

      <div className="relative space-y-4 py-4 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {marquee.map((row, r) => (
          <div key={r} className="flex overflow-hidden">
            {/* Two identical copies slide by exactly one copy's width, so the loop point is invisible.
                Each copy repeats the row so it is wider than any screen and the row never shows a gap. */}
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className={`flex shrink-0 gap-3 pr-3 ${r % 2 ? 'animate-marquee-rev' : 'animate-marquee'}`}
              >
                {[...row, ...row, ...row].map((t, i) => (
                  <li
                    key={`${t.name}-${i}`}
                    className="flex items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-canvas px-5 py-2.5 text-sm font-medium text-ink sm:text-base"
                  >
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color, boxShadow: `0 0 10px ${t.color}80` }} />
                    {t.name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
