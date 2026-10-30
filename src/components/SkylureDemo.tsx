import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

// Illustrative recreation of the Skylure Jet admin CRM receiving inquiries (sample data).
const inquiries = [
  { name: 'Harrison V.', type: 'Buy', detail: 'Super-Midsize · $10M–$20M', status: 'New' },
  { name: 'Amelia R.', type: 'Sell', detail: 'Light Jet · 2018 · Pre-owned', status: 'Quoted' },
  { name: 'Omar K.', type: 'Buy', detail: 'Heavy Jet · 12–14 pax', status: 'In review' },
  { name: 'Sofia M.', type: 'Buy', detail: 'Midsize · Either (Flexible)', status: 'New' },
]

const statusStyle: Record<string, string> = {
  New: 'bg-tag text-accent ring-line',
  Quoted: 'bg-ink text-canvas ring-ink',
  'In review': 'bg-canvas text-muted ring-line-strong',
}

export default function SkylureDemo() {
  const [count, setCount] = useState(1)
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c >= inquiries.length ? 1 : c + 1)), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-line/60 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-line bg-surface shadow-2xl">
        <div className="flex items-center gap-2 border-b border-line bg-canvas px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-line-strong" />
          <span className="h-3 w-3 rounded-full bg-line-strong" />
          <span className="h-3 w-3 rounded-full bg-line-strong" />
          <span className="ml-3 truncate rounded-md bg-canvas px-3 py-1 font-mono text-[11px] text-muted">skylurejet.com / crm / inquiries</span>
        </div>

        <div className="p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">Skylure CRM</p>
              <p className="font-serif text-lg tracking-wide text-ink">Aircraft inquiries</p>
            </div>
            <div className="flex gap-1 rounded-lg border border-line p-1 text-[11px] font-semibold tracking-widest">
              <span className="rounded-md bg-tag px-2.5 py-1 text-accent">BUY</span>
              <span className="px-2.5 py-1 text-muted">SELL</span>
            </div>
          </div>

          {/* All rows stay in the layout (only fading in and out) so the card never changes height. */}
          <div className="space-y-2">
            {inquiries.map((q, i) => (
              <motion.div
                key={q.name}
                initial={false}
                animate={i < count ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 rounded-xl border border-line bg-canvas px-3 py-2.5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tag text-xs font-bold text-accent">{q.name[0]}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">
                    {q.name} <span className="ml-1 text-[11px] font-medium text-accent">{q.type}</span>
                  </p>
                  <p className="truncate text-[11px] text-muted">{q.detail}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ${statusStyle[q.status]}`}>{q.status}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-tag px-3 py-2.5 text-xs">
            <span className="min-w-0 truncate text-muted">Quote · Super-Midsize, 8–10 pax</span>
            <span className="shrink-0 whitespace-nowrap font-semibold text-accent">Send quote →</span>
          </div>
        </div>
      </div>
      <p className="relative mt-3 text-center font-mono text-[11px] text-muted">Illustration of the admin CRM · sample data</p>
    </div>
  )
}
