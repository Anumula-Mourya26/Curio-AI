/**
 * CSV Upload API Client.
 *
 * POST /api/upload — uploads a CSV and returns dataset metadata + preview.
 */

import type { UploadResponse } from '../types/upload'

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:8000'

const UPLOAD_URL = `${API_URL}/api/upload`

function parseErrorResponse(xhr: XMLHttpRequest): string {
  try {
    const body = JSON.parse(xhr.responseText) as {
      detail?: string | { msg: string }[]
    }

    if (typeof body.detail === 'string') {
      return body.detail
    }

    if (Array.isArray(body.detail)) {
      return body.detail.map((d) => d.msg).join(', ')
    }
  } catch {}

  return xhr.statusText || 'Upload failed'
}

export function uploadCsv(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<UploadResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    const formData = new FormData()

    formData.append('file', file)

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        onProgress(Math.round((event.loaded / event.total) * 100))
      }
    })

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          resolve(JSON.parse(xhr.responseText) as UploadResponse)
        } catch {
          reject(new Error('Invalid response from server'))
        }
      } else {
        reject(new Error(parseErrorResponse(xhr)))
      }
    }

    xhr.onerror = () => {
      reject(new Error('Network error'))
    }

    xhr.onabort = () => {
      reject(new Error('Upload cancelled'))
    }

    xhr.open('POST', UPLOAD_URL)
    xhr.send(formData)
  })
}

export const CSV_ACCEPT = '.csv,text/csv'

export function isCsvFile(file: File): boolean {
  const name = file.name.toLowerCase()

  if (!name.endsWith('.csv')) {
    return false
  }

  if (
    file.type &&
    ![
      'text/csv',
      'application/csv',
      'application/vnd.ms-excel',
      'text/plain',
      '',
    ].includes(file.type)
  ) {
    return false
  }

  return true
}