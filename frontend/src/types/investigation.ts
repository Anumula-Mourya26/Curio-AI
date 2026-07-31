/**
 * Frontend Type Definitions.
 *
 * Mirror the backend Pydantic schemas (app/models/) so the frontend
 * can type-check API responses. Keep in sync when backend models change.
 */

export type InvestigationStage =
  | 'upload'
  | 'investigating'
  | 'question'
  | 'report'

export interface ColumnProfile {
  name: string
  dtype: string
}

export interface ObservationReport {
  session_id: string
  row_count: number
  column_count: number
  columns: ColumnProfile[]
}

export type FindingType =
  | 'anomaly'
  | 'uncertainty'
  | 'contradiction'
  | 'interesting_pattern'

export interface CuriosityFinding {
  id: string
  finding_type: FindingType
  description: string
  affected_columns: string[]
  curiosity_score: number
}

export interface CuriosityFindings {
  session_id: string
  findings: CuriosityFinding[]
}

export interface Hypothesis {
  id: string
  finding_id: string
  explanation: string
  confidence: number
  supporting_evidence: string[]
}

export interface HypothesisSet {
  session_id: string
  hypotheses: Hypothesis[]
}

export interface InvestigationQuestion {
  session_id: string
  question_text: string
  target_finding_id: string
  target_hypothesis_ids: string[]
  expected_information_gain: number
}

export interface UserAnswer {
  session_id: string
  question_id: string
  answer_text: string
}

export interface DiscoveryInsight {
  title: string
  description: string
  confidence: number
  supporting_hypothesis_id: string
}

export interface InvestigationReport {
  session_id: string
  summary: string
  insights: DiscoveryInsight[]
  hypotheses_final: Record<string, unknown>[]
}

export interface SessionStatus {
  session_id: string
  stage: string
}
