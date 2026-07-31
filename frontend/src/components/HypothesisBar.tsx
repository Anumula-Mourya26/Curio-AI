/**
 * HypothesisBar Component.
 *
 * Recharts bar chart showing hypothesis confidence scores.
 * Used by ReportPage to visualize final hypothesis rankings.
 */

interface HypothesisBarProps {
  hypotheses: { explanation: string; confidence: number }[]
}

export default function HypothesisBar({ hypotheses }: HypothesisBarProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">Hypothesis Confidence</h3>
      <div className="space-y-3">
        {hypotheses.map((hypothesis) => (
          <div key={hypothesis.explanation} className="rounded-2xl border border-white/10 bg-slate-950/60 p-3">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>{hypothesis.explanation}</span>
              <span className="font-semibold text-cyan-300">{hypothesis.confidence}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" style={{ width: `${Math.min(100, hypothesis.confidence)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
