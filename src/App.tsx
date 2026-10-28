import { useEffect } from 'react'
import Lenis from 'lenis'
import { MotionConfig } from 'motion/react'
import Background from './components/Background'
import CursorGlow from './components/CursorGlow'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = smooth ? new Lenis({ duration: 1.1 }) : null
    let frame = 0
    const raf = (time: number) => {
      lenis?.raf(time)
      frame = requestAnimationFrame(raf)
    }
    if (lenis) frame = requestAnimationFrame(raf)

    // In-page links: land each section's content (past its top padding) just below the floating navbar.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()

      let y = 0
      if (id !== 'top') {
        const section = target.tagName === 'SECTION' ? target : (target.querySelector('section') ?? target)
        const navBottom = document.querySelector('header nav')?.getBoundingClientRect().bottom ?? 0
        const padding = parseFloat(getComputedStyle(section).paddingTop) || 0
        y = section.getBoundingClientRect().top + window.scrollY + padding - navBottom - 24
      }
      history.replaceState(null, '', `#${id}`)
      if (lenis) lenis.scrollTo(Math.max(0, y))
      else window.scrollTo({ top: Math.max(0, y) })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      lenis?.destroy()
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="noise relative min-h-screen overflow-x-clip">
        <Background />
        <CursorGlow />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
