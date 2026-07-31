interface DatasetPreviewProps {
  columns: string[]
  rows: Record<string, unknown>[]
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) {
    return '—'
  }
  return String(value)
}

export default function DatasetPreview({ columns, rows }: DatasetPreviewProps) {
  if (columns.length === 0) {
    return null
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10 text-sm">
          <thead className="bg-white/5">
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col" className="whitespace-nowrap px-4 py-3 text-left font-semibold text-slate-200">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="transition hover:bg-white/5">
                {columns.map((col) => (
                  <td key={col} className="whitespace-nowrap px-4 py-3 text-slate-300">
                    {formatCell(row[col])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length === 0 && <p className="px-4 py-6 text-center text-sm text-slate-400">No preview rows available.</p>}
    </div>
  )
}
