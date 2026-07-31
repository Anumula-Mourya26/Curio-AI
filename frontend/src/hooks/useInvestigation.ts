/**
 * useInvestigation Hook.
 *
 * Encapsulates the investigation workflow state machine.
 * Manages session ID, current stage, loading/error states, and
 * provides actions to advance through the pipeline.
 *
 * Used by: App.tsx and page components to drive the UI flow.
 */

import { useState, useCallback } from 'react'
import type { InvestigationStage } from '../types/investigation'
import * as api from '../api/client'

export function useInvestigation() {
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [stage, setStage] = useState<InvestigationStage>('upload')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const upload = useCallback(async (file: File) => {
    setLoading(true)
    setError(null)
    try {
      const { session_id } = await api.uploadDataset(file)
      setSessionId(session_id)
      setStage('investigating')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setLoading(false)
    }
  }, [])

  const submitAnswer = useCallback(
    async (answerText: string) => {
      if (!sessionId) return
      setLoading(true)
      setError(null)
      try {
        await api.submitAnswer(sessionId, {
          session_id: sessionId,
          question_id: '', // TODO: track question ID from getQuestion response
          answer_text: answerText,
        })
        setStage('report')
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Submit failed')
      } finally {
        setLoading(false)
      }
    },
    [sessionId],
  )

  return { sessionId, stage, loading, error, upload, submitAnswer, setStage }
}
