import type { ReactNode } from 'react'

interface MetricCardProps {
  label: string
  value: string
  detail?: string
  accent?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose'
  icon?: ReactNode
}

const toneMap: Record<NonNullable<MetricCardProps['accent']>, string> = {
  cyan: 'from-cyan-400/30 via-sky-500/20 to-slate-950',
  violet: 'from-violet-500/30 via-fuchsia-500/20 to-slate-950',
  emerald: 'from-emerald-400/25 via-cyan-500/20 to-slate-950',
  amber: 'from-amber-400/25 via-orange-500/20 to-slate-950',
  rose: 'from-rose-400/25 via-pink-500/20 to-slate-950',
}

export default function MetricCard({
  label,
  value,
  detail,
  accent = 'cyan',
  icon,
}: MetricCardProps) {
  return (
    <div className={`group rounded-[22px] bg-gradient-to-br ${toneMap[accent]} p-[1px] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_22px_60px_-18px_rgba(59,130,246,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_28px_70px_-18px_rgba(34,211,238,0.65)]`}>
      <div className="rounded-[21px] border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-slate-400">
              {label}
            </p>
            <p className="mt-2 text-xl font-semibold text-white">{value}</p>
          </div>
          {icon ? (
            <div className="rounded-xl border border-white/10 bg-white/10 p-2 text-cyan-300">
              {icon}
            </div>
          ) : null}
        </div>
        {detail ? <p className="mt-3 text-sm leading-6 text-slate-400">{detail}</p> : null}
      </div>
    </div>
  )
}
