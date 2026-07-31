import { useCallback, useRef, useState } from 'react'
import { CSV_ACCEPT, isCsvFile } from '../api/upload'

interface FileUploadProps {
  onFileSelect: (file: File) => void
  disabled?: boolean
}

export default function FileUpload({ onFileSelect, disabled = false }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [localError, setLocalError] = useState<string | null>(null)

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file || disabled) return

      setLocalError(null)

      if (!isCsvFile(file)) {
        setLocalError('Only CSV files are accepted. Please select a file with a .csv extension.')
        return
      }

      onFileSelect(file)
    },
    [disabled, onFileSelect],
  )

  const onDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setIsDragging(true)
    },
    [disabled],
  )

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (disabled) return
      handleFile(e.dataTransfer.files[0])
    },
    [disabled, handleFile],
  )

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFile(e.target.files?.[0])
      e.target.value = ''
    },
    [handleFile],
  )

  const borderClass = isDragging
    ? 'border-cyan-400 bg-gradient-to-br from-cyan-500/20 via-sky-500/10 to-violet-500/10 shadow-[0_0_0_1px_rgba(34,211,238,0.2),0_20px_60px_-24px_rgba(34,211,238,0.7)]'
    : disabled
      ? 'border-white/10 bg-slate-900/50 cursor-not-allowed'
      : 'border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-950/90 hover:border-cyan-400/50 hover:shadow-[0_20px_60px_-30px_rgba(59,130,246,0.55)] cursor-pointer'

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload CSV file"
        aria-disabled={disabled}
        className={`rounded-[30px] border p-10 text-center transition-all duration-300 ${borderClass}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            inputRef.current?.click()
          }
        }}
      >
        <input ref={inputRef} type="file" accept={CSV_ACCEPT} className="hidden" disabled={disabled} onChange={onInputChange} />

        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/25 via-violet-500/20 to-slate-700/80 text-cyan-300 shadow-[0_0_30px_-10px_rgba(34,211,238,0.5)]">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <p className="text-xl font-semibold text-white">
          {isDragging ? 'Drop your CSV file here' : 'Drag & drop a CSV file here'}
        </p>
        <p className="mt-2 text-sm text-slate-400">or click to browse your dataset</p>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">CSV files only · structured data · up to 50 MB</p>
      </div>

      {localError && (
        <p className="mt-3 text-center text-sm text-rose-300" role="alert">
          {localError}
        </p>
      )}
    </div>
  )
}
