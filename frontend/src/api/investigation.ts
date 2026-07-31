/**
 * Investigation API Client.
 *
 * Sends an idea to Curio for critique and follow-up analysis.
 */

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000'

const INVESTIGATION_URL = `${API_URL}/api/v1/investigate`

export interface IdeaReviewRequest {
  idea: string
  focus?: string
}

export async function investigate(idea: string, focus?: string) {
  const response = await fetch(INVESTIGATION_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idea,
      focus,
    } as IdeaReviewRequest),
  })

  if (!response.ok) {
    throw new Error('Failed to investigate idea')
  }

  return await response.json()
}