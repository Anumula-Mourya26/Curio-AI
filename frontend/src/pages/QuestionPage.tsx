/**
 * QuestionPage — Step 6 of the investigation workflow.
 *
 * Displays the single most useful question selected by the Information Seeker.
 * Collects the user's answer and submits it to trigger the Reasoning Engine
 * and Discovery Engine (steps 7-8).
 */

interface QuestionPageProps {
  sessionId: string
  onAnswer: (answer: string) => void
}

export default function QuestionPage({ sessionId, onAnswer }: QuestionPageProps) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-8 shadow-[0_25px_90px_-35px_rgba(2,6,23,0.95)]">
      <h2 className="text-2xl font-semibold text-white">Investigation Question</h2>
      <p className="mt-3 text-slate-400">
        The system needs your input to reduce uncertainty for session {sessionId}.
      </p>
      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm leading-7 text-slate-300">
        What would you like to confirm next to improve confidence in the investigation?
      </div>
      <button
        onClick={() => onAnswer('')}
        className="mt-6 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white"
      >
        Submit response
      </button>
    </div>
  )
}
