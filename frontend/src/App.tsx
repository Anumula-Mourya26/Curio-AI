import { useState } from 'react'
import UploadPage from './pages/UploadPage'
import type { InvestigationStage } from './types/investigation'

function App() {
  const [stage] = useState<InvestigationStage>('upload')

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_28%),radial-gradient(circle_at_20%_20%,_rgba(59,130,246,0.24),_transparent_22%),radial-gradient(circle_at_80%_0%,_rgba(168,85,247,0.24),_transparent_26%),linear-gradient(135deg,_#020617_0%,_#071126_35%,_#111827_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-3 py-3 sm:px-6 lg:px-8 lg:py-4">
        <header className="sticky top-3 z-20 mb-5 rounded-full border border-cyan-400/20 bg-slate-950/70 px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_20px_70px_-24px_rgba(34,211,238,0.65)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Curio
              </p>
              <h1 className="text-[15px] font-semibold text-white sm:text-base">
                AI that questions your thinking.
              </h1>
            </div>
            <div className="rounded-full border border-white/10 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 px-3 py-1 text-sm text-slate-200 shadow-[0_0_30px_-12px_rgba(59,130,246,0.5)]">
              Second-opinion critique for startups and strategy
            </div>
          </div>
        </header>

        <main className="flex-1">
          <section className="mb-5 overflow-hidden rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_80px_-24px_rgba(59,130,246,0.7)] sm:p-8 lg:p-10">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-200 shadow-[0_0_25px_-12px_rgba(34,211,238,0.6)]">
                  New • AI second opinion for sharp teams
                </div>
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
                  Turn rough ideas into sharper decisions.
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Curio pressure-tests your idea in seconds, exposing the assumptions, blind spots, risks and questions that usually show up too late.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="#idea-input"
                    className="rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_rgba(34,211,238,0.95)] transition hover:-translate-y-0.5"
                  >
                    Try Curio on an idea
                  </a>
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                    Built for founders, PMs and operators
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl shadow-[0_18px_60px_-24px_rgba(59,130,246,0.55)]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
                  What Curio surfaces
                </p>
                <div className="mt-4 space-y-2.5 text-sm text-slate-300">
                  <div className="flex items-center justify-between rounded-2xl border border-cyan-400/15 bg-slate-900/70 px-3 py-2.5">
                    <span>Hidden assumptions</span>
                    <span className="text-cyan-300">01</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-violet-400/15 bg-slate-900/70 px-3 py-2.5">
                    <span>Blind spots</span>
                    <span className="text-violet-300">02</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-emerald-400/15 bg-slate-900/70 px-3 py-2.5">
                    <span>Risks and questions</span>
                    <span className="text-emerald-300">03</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {stage === 'upload' && <UploadPage />}
        </main>
      </div>
    </div>
  )
}

export default App
