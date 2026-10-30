import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { glowbot, influence, skylure } from '../data'
import AgreementDemo from './AgreementDemo'
import { ArrowIcon, GitHubIcon } from './Icons'
import SkylureDemo from './SkylureDemo'
import { Reveal, Section, SectionTitle } from './Section'

function InfluenceSlide() {
  return (
    <article className="glass gradient-border overflow-hidden rounded-[2rem] p-4 sm:p-8 md:p-12">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-tag px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">Flagship</span>
            <span className="rounded-full border border-line bg-tag px-3 py-1 text-xs font-semibold text-accent">● Live in production</span>
            <span className="rounded-full border border-line bg-canvas px-3 py-1 text-xs text-muted">Built at Axcel</span>
          </div>
          <h3 className="font-display text-4xl font-bold text-ink md:text-5xl">{influence.name}</h3>
          <p className="mt-3 text-xl font-medium text-gradient">{influence.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{influence.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={influence.live}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-canvas transition hover:scale-105"
            >
              Visit live site <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href={influence.frontend}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent bg-transparent px-5 py-3 font-semibold text-accent transition hover:bg-tag"
            >
              <GitHubIcon className="h-4 w-4" /> Frontend
            </a>
            <a
              href={influence.backend}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-accent bg-transparent px-5 py-3 font-semibold text-accent transition hover:bg-tag"
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
            className="rounded-2xl border border-line bg-canvas p-5 transition-colors hover:border-accent/50 hover:bg-tag"
          >
            <span className="text-2xl">{h.icon}</span>
            <h4 className="mt-3 font-display text-lg font-semibold text-ink">{h.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr] [&>*]:min-w-0">
        <div className="rounded-2xl border border-line bg-canvas p-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">// tech stack</p>
          <div className="space-y-4">
            {Object.entries(influence.stack).map(([group, items]) => (
              <div key={group}>
                <p className="mb-2 text-sm font-semibold text-ink">{group}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map((t) => (
                    <span key={t} className="rounded-lg bg-canvas px-2.5 py-1 font-mono text-xs text-muted ring-1 ring-line">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-canvas p-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">// api request flow (MVC)</p>
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
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-tag font-mono text-xs font-bold text-accent">{i + 1}</span>
                <span className="font-mono text-sm text-ink">{f}</span>
              </motion.li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-relaxed text-muted">Every request is validated with Zod and answers in one consistent JSON shape for success and errors.</p>
        </div>
      </div>
    </article>
  )
}

function SkylureSlide() {
  return (
    <article className="glass relative overflow-hidden rounded-[2rem] border-line p-4 sm:p-8 md:p-12">
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-line/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-tag/60 blur-3xl" />

      <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2 [&>*]:min-w-0">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-tag px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">{skylure.label}</span>
            <span className="rounded-full border border-line bg-tag px-3 py-1 text-xs font-semibold text-accent">● Live in production</span>
            <span className="rounded-full border border-line bg-canvas px-3 py-1 text-xs text-muted">Built solo</span>
          </div>
          <h3 className="font-display text-4xl font-bold text-ink md:text-5xl">{skylure.name}</h3>
          <p className="mt-3 text-xl font-medium text-accent">{skylure.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{skylure.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {skylure.tags.map((t) => (
              <span key={t} className="rounded-full bg-canvas px-3 py-1 font-mono text-xs text-muted ring-1 ring-line">
                {t}
              </span>
            ))}
          </div>

          <a
            href={skylure.live}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-canvas transition hover:scale-105 hover:bg-accent"
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
            className="rounded-2xl border border-line bg-canvas p-5 transition-colors hover:border-accent/50 hover:bg-tag"
          >
            <span className="text-2xl">{h.icon}</span>
            <h4 className="mt-3 font-display text-lg font-semibold text-ink">{h.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-10 rounded-2xl border border-line bg-canvas p-6">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">// lead lifecycle</p>
        <ol className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {skylure.flow.map((f, i) => (
            <motion.li
              key={f.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-xl border border-line bg-canvas p-3"
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-tag font-mono text-xs font-bold text-accent">{i + 1}</span>
              <p className="mt-2.5 text-sm font-medium leading-snug text-ink">{f.step}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-accent">{f.who}</p>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="relative mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr] [&>*]:min-w-0">
        <div className="rounded-2xl border border-line bg-canvas p-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">// pages</p>
          <div className="flex flex-wrap gap-2">
            {skylure.pages.map((pg) => (
              <span key={pg} className="rounded-lg bg-canvas px-2.5 py-1.5 font-mono text-xs text-muted ring-1 ring-line">
                {pg}
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">Public pages for buyers and sellers, plus a private CRM area for the admin.</p>
        </div>

        <div className="rounded-2xl border border-line bg-canvas p-6">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">// what I delivered, end to end</p>
          <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {skylure.scope.map((sc) => (
              <li key={sc} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-tag text-[10px] text-accent">✓</span>
                {sc}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function GlowBotSlide() {
  return (
    <article className="glass relative overflow-hidden rounded-[2rem] p-4 sm:p-8 md:p-12">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-line/60 blur-3xl" />
      <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.1fr] [&>*]:min-w-0">
        <div className="relative mx-auto grid aspect-square w-full max-w-xs place-items-center">
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-accent/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-8 rounded-full border border-accent/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative grid h-32 w-32 place-items-center overflow-hidden rounded-full bg-tag ring-1 ring-line-strong text-6xl sm:h-40 sm:w-40 sm:text-7xl shadow-2xl shadow-ink/10">
            ✨
            <motion.div
              className="absolute inset-x-0 h-1 bg-accent shadow-[0_0_12px_2px_rgba(26,23,20,0.12)]"
              animate={{ top: ['8%', '92%', '8%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          {['Acne', 'Dark circles', 'Pigmentation'].map((t, i) => (
            <motion.span
              key={t}
              className={`absolute whitespace-nowrap rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-ink backdrop-blur ${
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
          <span className="rounded-full bg-tag px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">{glowbot.label}</span>
          <h3 className="mt-5 font-display text-4xl font-bold text-ink md:text-5xl">{glowbot.name}</h3>
          <p className="mt-3 text-xl font-medium text-accent">{glowbot.tagline}</p>
          <p className="mt-5 leading-relaxed text-muted">{glowbot.description}</p>
          <ul className="mt-6 space-y-3">
            {glowbot.features.map((f) => (
              <li key={f.text} className="flex items-start gap-3 rounded-2xl border border-line bg-canvas px-4 py-3 text-muted">
                <span className="text-xl">{f.icon}</span>
                <span className="leading-relaxed">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

const slides = [
  { name: 'Influence Platform', short: 'Influence', Slide: InfluenceSlide },
  { name: 'Skylure Jet', short: 'Skylure Jet', Slide: SkylureSlide },
  { name: 'GlowBot', short: 'GlowBot', Slide: GlowBotSlide },
]

function NavButton({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'prev' ? 'Previous project' : 'Next project'}
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-accent bg-transparent text-accent transition hover:scale-105 hover:bg-tag"
    >
      <ArrowIcon className={`h-4 w-4 ${dir === 'prev' ? '-rotate-[135deg]' : 'rotate-45'}`} />
    </button>
  )
}

export default function Projects() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0])
  const sliderRef = useRef<HTMLDivElement>(null)

  // Other sections can open a specific project, e.g. Education's "View project" for GlowBot
  useEffect(() => {
    const onShow = (e: Event) => {
      const i = slides.findIndex((s) => s.name === (e as CustomEvent<string>).detail)
      if (i >= 0) setState(([cur]) => [i, i >= cur ? 1 : -1])
    }
    window.addEventListener('show-project', onShow)
    return () => window.removeEventListener('show-project', onShow)
  }, [])

  const go = (to: number) => {
    const next = (to + slides.length) % slides.length
    setState([next, to > index || (index === slides.length - 1 && next === 0) ? 1 : -1])
    // After a long slide, bring the start of the new one into view
    const top = sliderRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) window.scrollBy({ top: top - 110, behavior: 'smooth' })
  }

  const { Slide } = slides[index]

  const counter = (
    <span className="font-mono text-sm text-muted">
      {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
    </span>
  )

  // Phones: a full-width 3-way switcher (every project always visible) with arrows on the row below.
  // sm and up: project pills on the left, counter and arrows on the right.
  const controls = (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div role="tablist" aria-label="Projects" className="grid grid-cols-3 gap-1 rounded-full border border-line bg-canvas p-1 sm:flex sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0">
        {slides.map((s, i) => (
          <button
            key={s.name}
            role="tab"
            onClick={() => i !== index && go(i)}
            aria-selected={i === index}
            className={`min-w-0 truncate whitespace-nowrap rounded-full px-2 py-2 text-xs font-medium transition min-[380px]:text-sm sm:px-4 ${
              i === index ? 'bg-ink text-canvas' : 'text-muted hover:text-ink sm:border sm:border-line sm:bg-canvas'
            }`}
          >
            <span className="sm:hidden">{s.short}</span>
            <span className="hidden sm:inline">{s.name}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-3 sm:justify-end">
        {counter}
        <div className="flex items-center gap-3">
          <NavButton dir="prev" onClick={() => go(index - 1)} />
          <NavButton dir="next" onClick={() => go(index + 1)} />
        </div>
      </div>
    </div>
  )

  return (
    <Section id="projects">
      <SectionTitle
        eyebrow="Featured work"
        title="Things I've"
        accent="built."
        subtitle="Real products with real users, real roles and real data, not tutorial clones. Use the arrows or swipe to browse."
      />

      <div ref={sliderRef}>
        <Reveal className="mb-6">{controls}</Reveal>

        <div className="relative overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={{
                enter: (d: number) => ({ x: d >= 0 ? '12%' : '-12%', opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d: number) => ({ x: d >= 0 ? '-12%' : '12%', opacity: 0 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragDirectionLock
              onDragEnd={(_, { offset, velocity }) => {
                if (offset.x < -80 || velocity.x < -500) go(index + 1)
                else if (offset.x > 80 || velocity.x > 500) go(index - 1)
              }}
              className="cursor-grab active:cursor-grabbing"
            >
              <Slide />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={s.name}
                onClick={() => i !== index && go(i)}
                aria-label={`Show ${s.name}`}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-ink' : 'w-2 bg-muted hover:bg-ink'}`}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-muted sm:inline">Next: {slides[(index + 1) % slides.length].name}</span>
            <NavButton dir="prev" onClick={() => go(index - 1)} />
            <NavButton dir="next" onClick={() => go(index + 1)} />
          </div>
        </div>
      </div>

      <Reveal className="mt-10 text-center">
        <a
          href="https://github.com/hammadtoufeeq"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 font-semibold text-muted transition hover:text-ink"
        >
          More on my GitHub <ArrowIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
        </a>
      </Reveal>
    </Section>
  )
}
