import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

// A looping, illustrative recreation of Influence Platform's two-party signing flow.
const steps = ['draft', 'business', 'talent', 'signed'] as const
type Step = (typeof steps)[number]

const milestones = [
  { name: 'Concept & script', amount: 'PKR 40,000' },
  { name: '2 Instagram reels', amount: 'PKR 80,000' },
  { name: 'Final report', amount: 'PKR 30,000' },
]

function Otp({ active, done }: { active: boolean; done: boolean }) {
  const code = '482913'
  const [n, setN] = useState(done ? 6 : 0)
  useEffect(() => {
    if (done) return setN(6)
    if (!active) return setN(0)
    setN(0)
    const t = setInterval(() => setN((v) => Math.min(v + 1, 6)), 140)
    return () => clearInterval(t)
  }, [active, done])
  return (
    <div className="flex gap-0.5 sm:gap-1">
      {code.split('').map((d, i) => (
        <span
          key={i}
          className={`grid h-6 w-5 place-items-center rounded-md font-mono text-[11px] transition-colors sm:h-7 sm:w-6 sm:text-xs ${
            i < n ? 'bg-fuchsia-500/25 text-white ring-1 ring-fuchsia-400/60' : 'bg-white/5 text-transparent ring-1 ring-white/10'
          }`}
        >
          {i < n ? d : '0'}
        </span>
      ))}
    </div>
  )
}

function Party({ who, name, avatar, state }: { who: string; name: string; avatar: string; state: 'waiting' | 'signing' | 'signed' }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
      <div className="flex items-center gap-2.5">
        <span className={`grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white ${avatar}`}>{name[0]}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">{name}</p>
          <p className="truncate text-[11px] text-white/45">{who}</p>
        </div>
        <span className="flex h-6 w-14 shrink-0 items-center justify-end">
        <AnimatePresence mode="wait">
          {state === 'signed' ? (
            <motion.span
              key="ok"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-xs text-white"
            >
              ✓
            </motion.span>
          ) : (
            <motion.span key="wait" className={`text-[11px] font-medium ${state === 'signing' ? 'text-fuchsia-300' : 'text-white/35'}`}>
              {state === 'signing' ? 'Signing…' : 'Waiting'}
            </motion.span>
          )}
        </AnimatePresence>
        </span>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
        <span className="text-[11px] leading-tight text-white/40">Email code</span>
        <Otp active={state === 'signing'} done={state === 'signed'} />
      </div>
    </div>
  )
}

export default function AgreementDemo() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % steps.length), 2400)
    return () => clearInterval(t)
  }, [])
  const step: Step = steps[i]
  const bizState = step === 'draft' ? 'waiting' : step === 'business' ? 'signing' : 'signed'
  const talentState = step === 'signed' ? 'signed' : step === 'talent' ? 'signing' : 'waiting'

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-fuchsia-600/30 via-violet-600/20 to-cyan-500/30 blur-2xl" />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0a18]/90 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
          <span className="ml-3 truncate rounded-md bg-white/5 px-3 py-1 font-mono text-[11px] text-white/45">influence-platform / agreements / AGR-1042</span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">Agreement</p>
              <p className="font-display text-base font-semibold text-white sm:text-lg">Ramadan Brand Campaign</p>
            </div>
            <motion.span
              key={step}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                step === 'signed' ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/40' : 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30'
              }`}
            >
              {step === 'signed' ? 'Active · Signed' : step === 'draft' ? 'Draft' : 'Awaiting signatures'}
            </motion.span>
          </div>

          <div className="space-y-2">
            {milestones.map((m, k) => (
              <div key={m.name} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-3 py-2 text-xs sm:text-sm">
                <span className="flex min-w-0 items-center gap-2 text-white/75">
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-white/10 font-mono text-[10px] text-white/60">{k + 1}</span>
                  {m.name}
                </span>
                <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-white/55 sm:text-xs">{m.amount}</span>
              </div>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Party who="Business · Verified" name="Nova Foods" avatar="from-orange-400 to-pink-500" state={bizState} />
            <Party who="Talent · Creator" name="Ayesha Khan" avatar="from-violet-500 to-cyan-400" state={talentState} />
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-emerald-400"
              animate={{ width: `${((i + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
      <p className="relative mt-3 text-center font-mono text-[11px] text-white/35">Illustration of the signing flow · sample data</p>
    </div>
  )
}
