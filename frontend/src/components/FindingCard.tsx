/**
 * FindingCard Component.
 *
 * Displays a single curiosity finding with its type badge,
 * description, affected columns, and curiosity score.
 * Used by InvestigationPage to show what the system found interesting.
 */

import type { CuriosityFinding } from '../types/investigation'

interface FindingCardProps {
  finding: CuriosityFinding
}

export default function FindingCard({ finding }: FindingCardProps) {
  // TODO: Render finding type badge, description, score indicator
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <span className="text-xs font-medium uppercase text-blue-600">
        {finding.finding_type}
      </span>
      <p className="mt-2 text-gray-800">{finding.description}</p>
    </div>
  )
}
