/**
 * Upload API response types.
 * Mirrors backend app/models/upload.py
 */

export interface UploadResponse {
  upload_id: string
  filename: string
  row_count: number
  column_count: number
  columns: string[]
  preview: Record<string, unknown>[]
}

export interface ApiError {
  detail: string
}
