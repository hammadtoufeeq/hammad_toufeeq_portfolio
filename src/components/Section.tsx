import type { ReactNode } from 'react'
import { motion } from 'motion/react'

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({ eyebrow, title, accent, subtitle }: { eyebrow: string; title: string; accent: string; subtitle?: string }) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-fuchsia-300">
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
        {eyebrow}
      </p>
      <h2 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
        {title} <span className="text-gradient">{accent}</span>
      </h2>
      {subtitle && <p className="mt-5 text-lg leading-relaxed text-white/60">{subtitle}</p>}
    </Reveal>
  )
}

export function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8 ${className}`}>
      {children}
    </section>
  )
}
