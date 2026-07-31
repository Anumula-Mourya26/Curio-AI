/**
 * Backend API Client.
 *
 * Works for:
 * - Local development (http://localhost:8000)
 * - Production (Render backend via Vercel environment variable)
 */

import type {
  CuriosityFindings,
  InvestigationQuestion,
  InvestigationReport,
  SessionStatus,
  UserAnswer,
} from '../types/investigation'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const API_BASE = `${API_URL}/api/v1/investigate`

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

export async function uploadDataset(
  file: File,
): Promise<{ session_id: string }> {
  const formData = new FormData()
  formData.append('file', file)

  return request(`${API_BASE}/upload`, {
    method: 'POST',
    body: formData,
  })
}

export async function getSessionStatus(
  sessionId: string,
): Promise<SessionStatus> {
  return request(`${API_BASE}/${sessionId}/status`)
}

export async function getFindings(
  sessionId: string,
): Promise<CuriosityFindings> {
  return request(`${API_BASE}/${sessionId}/findings`)
}

export async function getQuestion(
  sessionId: string,
): Promise<InvestigationQuestion> {
  return request(`${API_BASE}/${sessionId}/question`)
}

export async function submitAnswer(
  sessionId: string,
  answer: UserAnswer,
): Promise<{ status: string }> {
  return request(`${API_BASE}/${sessionId}/answer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(answer),
  })
}

export async function getReport(
  sessionId: string,
): Promise<InvestigationReport> {
  return request(`${API_BASE}/${sessionId}/report`)
}