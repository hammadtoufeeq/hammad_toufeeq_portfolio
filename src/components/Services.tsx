import { motion } from 'motion/react'
import { services } from '../data'
import { ArrowIcon } from './Icons'
import { Reveal, Section } from './Section'

export default function Services() {
  return (
    <Section id="services">
      <Reveal className="mx-auto mb-14 max-w-2xl text-center">
        <span className="mx-auto mb-5 block h-12 w-px bg-[repeating-linear-gradient(to_bottom,#e879f9_0_6px,transparent_6px_12px)]" />
        <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
          My <span className="text-gradient">Services</span>
        </h2>
        <p className="mt-4 text-white/60 sm:text-lg">
          From pixel-perfect interfaces to secure APIs and admin CRMs, here's how I can help bring your product to life.
        </p>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
            className="h-full"
          >
            <div className="group relative z-10 h-full rounded-3xl bg-[#100e1c] p-7 ring-1 ring-white/10 transition duration-300 ease-out hover:scale-[1.03] hover:bg-[#14121f] hover:shadow-2xl hover:shadow-black/50">
              <div className="flex items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/[0.06] text-2xl ring-1 ring-white/10">{s.icon}</span>
                <ArrowIcon className="h-5 w-5 text-white/40 transition duration-300 group-hover:rotate-45 group-hover:text-white/80" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
