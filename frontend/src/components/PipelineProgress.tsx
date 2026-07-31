/**
 * PipelineProgress Component.
 *
 * Visual step indicator showing which pipeline stage is active.
 * Used by InvestigationPage to show Observer → Curiosity → Hypothesis → Seeker progress.
 */

interface PipelineProgressProps {
  currentStage: string
}

const STAGES = [
  'Observer',
  'Curiosity Engine',
  'Hypothesis Generator',
  'Information Seeker',
]

export default function PipelineProgress({ currentStage }: PipelineProgressProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {STAGES.map((stage) => {
        const isActive = stage === currentStage
        const isComplete = STAGES.indexOf(stage) < STAGES.indexOf(currentStage)

        return (
          <div key={stage} className={`rounded-full border px-3 py-1 text-sm ${isActive ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-300' : isComplete ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200' : 'border-white/10 bg-slate-900/70 text-slate-400'}`}>
            {isComplete ? '✓ ' : ''}{stage}
          </div>
        )
      })}
    </div>
  )
}
