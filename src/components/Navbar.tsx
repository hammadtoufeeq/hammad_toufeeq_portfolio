import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { profile } from '../data'

const links = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4"
    >
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 sm:px-4 ${
          scrolled ? 'glass shadow-2xl shadow-ink/10' : 'border border-transparent'
        }`}
      >
        <a href="#top" className="flex items-center gap-2.5 pl-1" aria-label="Back to top">
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-ink font-display text-sm font-bold text-canvas">
            HT
          </span>
          <span className="hidden font-display text-lg font-semibold text-ink sm:block">{profile.firstName}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === l.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {active === l.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-tag ring-1 ring-line"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-ink px-5 py-2 text-sm font-semibold text-canvas transition hover:scale-105 hover:bg-accent sm:block"
          >
            Resume
          </a>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-canvas lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <div className="relative h-3.5 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            className="glass mx-auto mt-2 max-w-5xl rounded-3xl p-3 lg:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`block rounded-2xl px-4 py-3 text-base font-medium ${active === l.id ? 'bg-tag text-ink' : 'text-muted'}`}
              >
                {l.label}
              </motion.a>
            ))}
            <a href={profile.resume} target="_blank" rel="noreferrer" className="mt-2 block rounded-2xl bg-ink px-4 py-3 text-center font-semibold text-canvas">
              Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
