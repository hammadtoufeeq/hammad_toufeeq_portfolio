import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <p className="select-none text-center font-display text-[15vw] font-bold leading-none tracking-tighter text-white/[0.04] md:text-[11rem]">HAMMAD</p>
        <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. Built with React, TypeScript, Tailwind & Motion.</p>
          <a href="#top" className="rounded-full border border-white/10 px-4 py-2 transition hover:border-white/30 hover:text-white">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
