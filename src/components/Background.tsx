import { motion, useScroll, useSpring } from 'motion/react'

const blobs = [
  { className: 'left-[-10%] top-[-10%] h-[40rem] w-[40rem] bg-line/60', x: [0, 120, -40, 0], y: [0, 80, 140, 0], d: 26 },
  { className: 'right-[-15%] top-[20%] h-[36rem] w-[36rem] bg-line/60', x: [0, -100, 40, 0], y: [0, 120, -60, 0], d: 30 },
  { className: 'bottom-[-20%] left-[25%] h-[34rem] w-[34rem] bg-line/60', x: [0, 80, -120, 0], y: [0, -100, 40, 0], d: 34 },
  { className: 'right-[20%] top-[60%] h-[24rem] w-[24rem] bg-line/60', x: [0, -60, 60, 0], y: [0, 60, -80, 0], d: 22 },
]

export default function Background() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-accent"
      />
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {blobs.map((b, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[120px] ${b.className}`}
            animate={{ x: b.x, y: b.y }}
            transition={{ duration: b.d, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
        <div className="grid-bg absolute inset-0" />
      </div>
    </>
  )
}
