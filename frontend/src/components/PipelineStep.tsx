import type { ReactNode } from 'react'

interface PipelineStepProps {
  title: string
  description: string
  icon: ReactNode
  active?: boolean
  last?: boolean
}

export default function PipelineStep({
  title,
  description,
  icon,
  active = false,
}: PipelineStepProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-[20px] border p-3 transition-all duration-300 hover:scale-[1.01] ${
        active
          ? 'border-cyan-400/40 bg-slate-900/90 shadow-[0_0_30px_-12px_rgba(34,211,238,0.55)]'
          : 'border-white/10 bg-slate-900/70'
      }`}
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
          active
            ? 'border-cyan-400/50 bg-cyan-500/15 text-cyan-300'
            : 'border-white/10 bg-white/5 text-slate-400'
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="truncate text-sm font-semibold text-white">
          {title}
        </h3>

        <p className="truncate text-xs text-slate-400">
          {description}
        </p>
      </div>

      <div
        className={`ml-auto h-3 w-3 rounded-full ${
          active ? 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)] animate-pulse' : 'bg-slate-600'
        }`}
      />
    </div>
  )
}