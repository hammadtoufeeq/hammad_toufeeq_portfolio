import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// Illustrative recreation of the Skylure Jet admin CRM receiving inquiries (sample data).
const inquiries = [
  { name: 'Harrison V.', type: 'Buy', detail: 'Super-Midsize · $10M–$20M', status: 'New' },
  { name: 'Amelia R.', type: 'Sell', detail: 'Light Jet · 2018 · Pre-owned', status: 'Quoted' },
  { name: 'Omar K.', type: 'Buy', detail: 'Heavy Jet · 12–14 pax', status: 'In review' },
  { name: 'Sofia M.', type: 'Buy', detail: 'Midsize · Either (Flexible)', status: 'New' },
]

const statusStyle: Record<string, string> = {
  New: 'bg-amber-400/15 text-amber-300 ring-amber-300/30',
  Quoted: 'bg-emerald-400/15 text-emerald-300 ring-emerald-300/30',
  'In review': 'bg-sky-400/15 text-sky-300 ring-sky-300/30',
}

export default function SkylureDemo() {
  const [count, setCount] = useState(1)
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c >= inquiries.length ? 1 : c + 1)), 1800)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-amber-500/25 via-yellow-700/10 to-stone-500/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-[#c9a96e]/25 bg-[#0d0c0a]/95 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-white/45">skylurejet.com / crm / inquiries</span>
        </div>

        <div className="p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#c9a96e]">Skylure CRM</p>
              <p className="font-serif text-lg tracking-wide text-white">Aircraft inquiries</p>
            </div>
            <div className="flex gap-1 rounded-lg border border-white/10 p-1 text-[11px] font-semibold tracking-widest">
              <span className="rounded-md bg-[#c9a96e]/20 px-2.5 py-1 text-[#e3c891]">BUY</span>
              <span className="px-2.5 py-1 text-white/50">SELL</span>
            </div>
          </div>

          <div className="space-y-2">
            <AnimatePresence initial={false}>
              {inquiries.slice(0, count).map((q) => (
                <motion.div
                  key={q.name}
                  layout
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2.5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#e3c891] to-[#8a6d3b] text-xs font-bold text-black">{q.name[0]}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {q.name} <span className="ml-1 text-[11px] font-medium text-[#c9a96e]">{q.type}</span>
                    </p>
                    <p className="truncate text-[11px] text-white/45">{q.detail}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ${statusStyle[q.status]}`}>{q.status}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-[#c9a96e]/20 bg-[#c9a96e]/[0.06] px-3 py-2.5 text-xs">
            <span className="min-w-0 truncate text-white/60">Quote · Super-Midsize, 8–10 pax</span>
            <span className="shrink-0 whitespace-nowrap font-semibold text-[#e3c891]">Send quote →</span>
          </div>
        </div>
      </div>
      <p className="relative mt-3 text-center font-mono text-[11px] text-white/35">Illustration of the admin CRM · sample data</p>
    </div>
  )
}
