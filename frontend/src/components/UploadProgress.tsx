interface UploadProgressProps {
  percent: number
  label?: string
}

export default function UploadProgress({ percent, label = 'Uploading' }: UploadProgressProps) {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-[24px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_20px_60px_-25px_rgba(34,211,238,0.45)]">
      <div className="mb-3 flex items-center justify-between text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/40" />
            <span className="relative h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          <div>
            <p className="font-medium text-slate-200">{label}</p>
            <p className="text-xs text-slate-500">Building a sharper critique</p>
          </div>
        </div>
        <span className="font-semibold text-cyan-300">{percent}%</span>
      </div>
      <div className="relative h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/15 to-slate-800" />
        <div
          className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-slate-500">
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Assumptions</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Blind spots</span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Risks</span>
      </div>
    </div>
  )
}
