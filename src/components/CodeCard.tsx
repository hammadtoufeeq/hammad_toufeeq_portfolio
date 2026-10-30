import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

type Token = [text: string, className?: string]

const k = 'text-accent' // keyword
const p = 'text-ink' // property
const s = 'text-accent-deep' // string
const n = 'text-accent' // number / boolean
const m = 'text-muted' // punctuation

const lines: Token[][] = [
  [['const ', k], ['developer', 'text-accent'], [' = {', m]],
  [['  name', p], [': ', m], ["'Hammad Toufeeq'", s], [',', m]],
  [['  role', p], [': ', m], ["'MERN Stack Developer'", s], [',', m]],
  [['  location', p], [': ', m], ["'Lahore, PK'", s], [',', m]],
  [['  stack', p], [': ', m], ["'MERN + TypeScript'", s], [',', m]],
  [['  shipped', p], [': ', m], ["'Influence Platform'", s], [',', m]],
  [['  remote', p], [': ', m], ['true', n], [',', m]],
  [['  hireable', p], [': ', m], ['true', n], [',', m]],
  [['}', m]],
]

const total = lines.reduce((sum, l) => sum + l.reduce((a, [t]) => a + t.length, 0) + 1, 0)

export default function CodeCard() {
  const [shown, setShown] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  // Start typing only once the card is actually on screen, and only the first time
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setShown(total)
    let tick = 0
    const start = setTimeout(() => {
      tick = setInterval(() => {
        setShown((v) => {
          if (v + 2 >= total) clearInterval(tick)
          return Math.min(total, v + 2)
        })
      }, 30)
    }, 250)
    return () => {
      clearTimeout(start)
      clearInterval(tick)
    }
  }, [inView])

  let left = shown
  return (
    <div ref={ref} className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl shadow-ink/10">
      <div className="flex items-center gap-2 border-b border-line bg-canvas px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="h-3 w-3 rounded-full bg-line-strong" />
        <span className="ml-3 font-mono text-xs text-muted">developer.ts</span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-6 min-[400px]:text-[12.5px] sm:p-5 sm:text-sm sm:leading-7">
        {lines.map((line, i) => {
          const visible = left > 0
          const parts = line.map(([text, cls], j) => {
            const take = Math.max(0, Math.min(text.length, left))
            left -= take
            return take ? <span key={j} className={cls}>{text.slice(0, take)}</span> : null
          })
          left -= 1
          const typing = visible && left < 0 && shown < total
          return (
            <div key={i} className="flex">
              <span className="mr-3 w-4 shrink-0 select-none text-right text-line-strong sm:mr-4 sm:w-5">{i + 1}</span>
              <span className="whitespace-pre">
                {parts}
                {(typing || (i === lines.length - 1 && shown >= total)) && (
                  <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent" />
                )}
              </span>
            </div>
          )
        })}
      </pre>
    </div>
  )
}
