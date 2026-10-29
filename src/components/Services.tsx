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
        {services.map((s, i) => {
          const featured = i === 0
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl p-7 ring-1 transition-shadow duration-500 ${
                featured
                  ? 'bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 shadow-xl shadow-fuchsia-600/30 ring-white/20'
                  : 'bg-white/[0.04] ring-white/10 hover:shadow-xl hover:shadow-fuchsia-600/20'
              }`}
            >
              {/* gradient fill sweeps in on hover */}
              {!featured && (
                <span className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />
              )}
              <div className="relative flex items-start justify-between">
                <span
                  className={`grid h-14 w-14 place-items-center rounded-2xl text-2xl transition-colors duration-500 ${
                    featured ? 'bg-white/20' : 'bg-white/[0.06] ring-1 ring-white/10 group-hover:bg-white/20'
                  }`}
                >
                  {s.icon}
                </span>
                <ArrowIcon
                  className={`h-5 w-5 transition-all duration-500 group-hover:rotate-45 ${featured ? 'text-white' : 'text-fuchsia-300 group-hover:text-white'}`}
                />
              </div>
              <h3 className="relative mt-6 font-display text-xl font-semibold text-white">{s.title}</h3>
              <p className={`relative mt-2 text-sm leading-relaxed transition-colors duration-500 ${featured ? 'text-white/90' : 'text-white/60 group-hover:text-white/90'}`}>
                {s.text}
              </p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}
