import type { ReactNode } from 'react'

interface SectionCardProps {
  title: string
  subtitle?: string
  children: ReactNode
  accent?: 'cyan' | 'violet' | 'emerald' | 'amber'
}

const borderMap: Record<NonNullable<SectionCardProps['accent']>, string> = {
  cyan: 'from-cyan-400/25 via-sky-500/20 to-slate-950',
  violet: 'from-violet-500/25 via-fuchsia-500/20 to-slate-950',
  emerald: 'from-emerald-400/25 via-cyan-500/20 to-slate-950',
  amber: 'from-amber-400/25 via-orange-500/20 to-slate-950',
}

export default function SectionCard({
  title,
  subtitle,
  children,
  accent = 'cyan',
}: SectionCardProps) {
  return (
    <div className={`relative overflow-hidden rounded-[28px] bg-gradient-to-br ${borderMap[accent]} p-[1px] shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_24px_70px_-26px_rgba(34,211,238,0.55)] transition duration-300 hover:-translate-y-0.5`}>
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="rounded-[27px] border border-white/10 bg-slate-950/80 p-5 backdrop-blur-xl sm:p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm leading-6 text-slate-400">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </div>
  )
}
