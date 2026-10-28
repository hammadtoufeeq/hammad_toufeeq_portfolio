import { motion } from 'motion/react'
import { glowbot, influence, skylure } from '../data'
import AgreementDemo from './AgreementDemo'
import { ArrowIcon, GitHubIcon } from './Icons'
import SkylureDemo from './SkylureDemo'
import { Reveal, Section, SectionTitle } from './Section'

export default function Projects() {
  return (
    <Section id="projects">
      <SectionTitle
        eyebrow="Featured work"
        title="Things I've"
        accent="built."
        subtitle="Real products with real users, real roles and real data, not tutorial clones."
      />

      {/* Influence Platform */}
      <Reveal>
        <article className="glass gradient-border overflow-hidden rounded-[2rem] p-4 sm:p-8 md:p-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">Flagship</span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">● Live in production</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">Built at Axcel</span>
              </div>
              <h3 className="font-display text-4xl font-bold text-white md:text-5xl">{influence.name}</h3>
              <p className="mt-3 text-xl font-medium text-gradient">{influence.tagline}</p>
              <p className="mt-5 leading-relaxed text-white/65">{influence.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={influence.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:scale-105"
                >
                  Visit live site <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </a>
                <a
                  href={influence.frontend}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-white/40"
                >
                  <GitHubIcon className="h-4 w-4" /> Frontend
                </a>
                <a
                  href={influence.backend}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 font-semibold text-white transition hover:border-white/40"
                >
                  <GitHubIcon className="h-4 w-4" /> Backend
                </a>
              </div>
            </div>

            <AgreementDemo />
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {influence.highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-fuchsia-400/40 hover:bg-white/[0.06]"
              >
                <span className="text-2xl">{h.icon}</span>
                <h4 className="mt-3 font-display text-lg font-semibold text-white">{h.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{h.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">// tech stack</p>
              <div className="space-y-4">
                {Object.entries(influence.stack).map(([group, items]) => (
                  <div key={group}>
                    <p className="mb-2 text-sm font-semibold text-white/80">{group}</p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((t) => (
                        <span key={t} className="rounded-lg bg-white/5 px-2.5 py-1 font-mono text-xs text-white/70 ring-1 ring-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">// api request flow (MVC)</p>
              <ol className="space-y-2">
                {influence.flow.map((f, i) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 font-mono text-xs font-bold text-white">{i + 1}</span>
                    <span className="font-mono text-sm text-white/80">{f}</span>
                  </motion.li>
                ))}
              </ol>
              <p className="mt-4 text-xs leading-relaxed text-white/45">Every request is validated with Zod and answers in one consistent JSON shape for success and errors.</p>
            </div>
          </div>
        </article>
      </Reveal>

      {/* Skylure Jet (client) */}
      <Reveal className="mt-8">
        <article className="glass relative overflow-hidden rounded-[2rem] border-[#c9a96e]/30 p-4 sm:p-8 md:p-12">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-amber-400/25 to-yellow-700/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-gradient-to-br from-yellow-600/15 to-stone-500/10 blur-3xl" />

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
            <div>
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gradient-to-r from-[#e3c891] to-[#a8844a] px-3 py-1 text-xs font-bold uppercase tracking-wider text-black">{skylure.label}</span>
                <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">● Live in production</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">Built solo</span>
              </div>
              <h3 className="font-display text-4xl font-bold text-white md:text-5xl">{skylure.name}</h3>
              <p className="mt-3 text-xl font-medium text-[#e3c891]">{skylure.tagline}</p>
              <p className="mt-5 leading-relaxed text-white/65">{skylure.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {skylure.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-3 py-1 font-mono text-xs text-white/60 ring-1 ring-white/10">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={skylure.live}
                target="_blank"
                rel="noreferrer"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e3c891] to-[#c9a96e] px-6 py-3 font-semibold text-black transition hover:scale-105"
              >
                Visit skylurejet.com <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
              </a>
            </div>

            <SkylureDemo />
          </div>

          <div className="relative mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skylure.highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#c9a96e]/50 hover:bg-white/[0.06]"
              >
                <span className="text-2xl">{h.icon}</span>
                <h4 className="mt-3 font-display text-lg font-semibold text-white">{h.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{h.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-10 rounded-2xl border border-white/10 bg-black/20 p-6">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-white/40">// lead lifecycle</p>
            <ol className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {skylure.flow.map((f, i) => (
                <motion.li
                  key={f.step}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-xl border border-white/10 bg-white/[0.03] p-3"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-[#e3c891] to-[#8a6d3b] font-mono text-xs font-bold text-black">{i + 1}</span>
                  <p className="mt-2.5 text-sm font-medium leading-snug text-white/85">{f.step}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#c9a96e]/80">{f.who}</p>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="relative mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr] [&>*]:min-w-0">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">// pages</p>
              <div className="flex flex-wrap gap-2">
                {skylure.pages.map((pg) => (
                  <span key={pg} className="rounded-lg bg-white/5 px-2.5 py-1.5 font-mono text-xs text-white/75 ring-1 ring-white/10">
                    {pg}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-white/45">Public pages for buyers and sellers, plus a private CRM area for the admin.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/40">// what I delivered, end to end</p>
              <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {skylure.scope.map((sc) => (
                  <li key={sc} className="flex items-start gap-2.5 text-sm text-white/75">
                    <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#c9a96e]/20 text-[10px] text-[#e3c891]">✓</span>
                    {sc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>

      {/* GlowBot */}
      <Reveal className="mt-8">
        <article className="glass relative overflow-hidden rounded-[2rem] p-4 sm:p-8 md:p-12">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-to-br from-pink-500/30 to-amber-400/20 blur-3xl" />
          <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] [&>*]:min-w-0">
            <div className="relative mx-auto grid aspect-square w-full max-w-xs place-items-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-pink-400/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-amber-300/30"
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
              />
              <div className="relative grid h-40 w-40 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-pink-500 via-rose-400 to-amber-300 text-7xl shadow-2xl shadow-pink-500/30">
                ✨
                <motion.div
                  className="absolute inset-x-0 h-1 bg-white/90 shadow-[0_0_20px_6px_rgba(255,255,255,0.6)]"
                  animate={{ top: ['8%', '92%', '8%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
              {['Acne', 'Dark circles', 'Pigmentation'].map((t, i) => (
                <motion.span
                  key={t}
                  className={`absolute whitespace-nowrap rounded-full border border-white/15 bg-[#141126]/85 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur ${
                    ['left-0 top-6', 'right-0 top-1/2', 'bottom-4 left-6'][i]
                  }`}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>

            <div>
              <span className="rounded-full bg-gradient-to-r from-pink-500 to-amber-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{glowbot.label}</span>
              <h3 className="mt-5 font-display text-4xl font-bold text-white md:text-5xl">{glowbot.name}</h3>
              <p className="mt-3 text-xl font-medium text-pink-300">{glowbot.tagline}</p>
              <p className="mt-5 leading-relaxed text-white/65">{glowbot.description}</p>
              <ul className="mt-6 space-y-3">
                {glowbot.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/75">
                    <span className="text-xl">{f.icon}</span>
                    <span className="leading-relaxed">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </Reveal>

      <Reveal className="mt-10 text-center">
        <a
          href="https://github.com/hammadtoufeeq"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 font-semibold text-white/70 transition hover:text-white"
        >
          More on my GitHub <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </a>
      </Reveal>
    </Section>
  )
}
