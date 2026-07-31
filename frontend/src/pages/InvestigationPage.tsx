/**
 * InvestigationPage — Steps 2-5 (backend runs automatically).
 *
 * Displays progress while the backend pipeline executes:
 *   Observer → Curiosity Engine → Hypothesis Generator → Information Seeker
 *
 * Shows curiosity findings and generated hypotheses as they become available.
 * Transitions to QuestionPage once the Information Seeker selects a question.
 */

interface InvestigationPageProps {
  sessionId: string
}

export default function InvestigationPage({ sessionId }: InvestigationPageProps) {
  // TODO: Poll GET /investigate/{id}/status for pipeline progress
  // TODO: Fetch and display curiosity findings when available
  // TODO: Auto-transition to QuestionPage when stage === 'question_asked'

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Investigating Dataset
      </h2>
      <p className="text-gray-600">
        Session: {sessionId} — Analyzing data and generating hypotheses...
      </p>
      {/* TODO: Progress indicator, findings list, hypothesis cards */}
    </div>
  )
}
