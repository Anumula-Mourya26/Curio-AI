import { useEffect, useMemo, useState } from 'react'
import { investigate } from '../api/investigation'
import MetricCard from '../components/MetricCard'
import PipelineStep from '../components/PipelineStep'
import SectionCard from '../components/SectionCard'
import UploadProgress from '../components/UploadProgress'

type UploadState = 'idle' | 'submitting' | 'success' | 'error'

const pipelineSteps = [
  { title: 'Observer', description: 'Capturing the initial proposition', icon: '👁️' },
  { title: 'Assumption Miner', description: 'Surfacing hidden assumptions', icon: '🧩' },
  { title: 'Blind Spot Detector', description: 'Finding the gaps in the reasoning', icon: '🕳️' },
  { title: 'Risk Analyzer', description: 'Exposing the likely failure modes', icon: '⚠️' },
  { title: 'Curiosity Engine', description: 'Generating the hard questions', icon: '⚡' },
  { title: 'Idea Review', description: 'Compiling the critique into a review', icon: '📘' },
]

const emptyStateHighlights = [
  'Hidden assumptions you may be relying on',
  'Weak spots that deserve a closer look',
  'The next questions worth asking',
]

export default function UploadPage() {
  const [uploadState, setUploadState] = useState<UploadState>('idle')
  const [error, setError] = useState<string | null>(null)
  const [idea, setIdea] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)
  const [loadingAnalysis, setLoadingAnalysis] = useState(false)
  const [thinkingStageIndex, setThinkingStageIndex] = useState(0)
  const [thinkingMessage, setThinkingMessage] = useState('Initializing Curio')
  const [focusIssue, setFocusIssue] = useState<string | null>(null)
  const [focusLoading, setFocusLoading] = useState(false)
  const [focusInsight, setFocusInsight] = useState<any>(null)
  const [submittedIdea, setSubmittedIdea] = useState('')

  const handleSubmit = async () => {
    if (!idea.trim()) return

    setUploadState('submitting')
    setLoadingAnalysis(true)
    setThinkingStageIndex(0)
    setThinkingMessage('Initializing Curio')
    setError(null)
    setAnalysis(null)
    setFocusInsight(null)
    setFocusIssue(null)
    setSubmittedIdea(idea.trim())

    try {
      const response = await investigate(idea.trim())
      setAnalysis(response)
      setUploadState('success')
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Investigation failed')
      setUploadState('error')
    } finally {
      setLoadingAnalysis(false)
    }
  }

  const handleInvestigateFurther = async (issue: string) => {
    if (!submittedIdea) return

    setFocusLoading(true)
    setFocusIssue(issue)
    setError(null)

    try {
      const response = await investigate(submittedIdea, issue)
      setFocusInsight(response)
    } catch (err) {
      console.error(err)
      setError('Follow-up investigation failed')
    } finally {
      setFocusLoading(false)
    }
  }

  useEffect(() => {
    if (!loadingAnalysis) return

    const messages = [
      'Initializing Curio',
      'Mining hidden assumptions',
      'Scanning for blind spots',
      'Analyzing the likely risks',
      'Generating the challenging questions',
      'Preparing the idea review',
    ]

    const interval = window.setInterval(() => {
      setThinkingStageIndex((prev) => {
        const next = prev + 1
        if (next >= pipelineSteps.length) {
          return pipelineSteps.length - 1
        }
        return next
      })
    }, 800)

    const messageInterval = window.setInterval(() => {
      setThinkingMessage((prev) => {
        const currentIndex = messages.indexOf(prev)
        const nextIndex = (currentIndex + 1) % messages.length
        return messages[nextIndex]
      })
    }, 800)

    return () => {
      window.clearInterval(interval)
      window.clearInterval(messageInterval)
    }
  }, [loadingAnalysis])

  const loadingStageName = pipelineSteps[thinkingStageIndex]?.title ?? 'Idea Review'
  const loadingProgress = Math.round(((thinkingStageIndex + 1) / pipelineSteps.length) * 100)
  const showEmptyState = !analysis && !loadingAnalysis && uploadState !== 'submitting'

  const examinationScore = useMemo(() => {
    if (!analysis?.curiosity_score && analysis?.curiosity_score !== 0) {
      return 72
    }
    return Math.max(0, Math.min(100, analysis.curiosity_score))
  }, [analysis])

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] border border-cyan-400/20 bg-slate-950/70 p-5 shadow-[0_20px_70px_-24px_rgba(34,211,238,0.65)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 inline-flex rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-300">
              Curio challenge engine
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              What would you like Curio to challenge?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Paste your startup idea, research proposal, strategy memo or argument and let Curio expose the weak points early.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Status</p>
            <p className="mt-1 font-semibold text-white">
              {uploadState === 'submitting' ? 'Investigating idea' : uploadState === 'success' ? 'Ready for review' : 'Awaiting input'}
            </p>
          </div>
        </div>
      </div>

      <SectionCard title="Submit your idea" subtitle="A focused prompt that surfaces hidden assumptions and weak spots" accent="cyan">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Assumptions</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Blind spots</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Risks</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1">Questions</span>
          </div>
          <textarea
            id="idea-input"
            value={idea}
            onChange={(event) => setIdea(event.target.value)}
            placeholder="Paste your startup idea...\nPaste your business plan...\nPaste your research proposal...\nPaste your argument..."
            className="min-h-[150px] w-full rounded-[22px] border border-white/10 bg-slate-900/70 px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition focus:border-cyan-400/50 focus:shadow-[0_0_0_1px_rgba(34,211,238,0.3)]"
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-400">Curio will challenge the idea, not validate it.</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSubmit}
                disabled={!idea.trim() || loadingAnalysis}
                className="rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_14px_40px_-16px_rgba(34,211,238,0.9)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loadingAnalysis ? 'Investigating…' : 'Challenge it'}
              </button>
              <button
                type="button"
                onClick={() => setIdea('')}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:bg-white/10"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </SectionCard>

      {uploadState === 'submitting' && <UploadProgress percent={loadingProgress} label="Challenging the idea" />}

      {error && (
        <div className="rounded-[22px] border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      {showEmptyState && (
        <SectionCard title="What Curio will surface" subtitle="A sharper critique in seconds" accent="violet">
          <div className="grid gap-3 md:grid-cols-3">
            {emptyStateHighlights.map((item) => (
              <div key={item} className="rounded-[20px] border border-white/10 bg-slate-900/70 p-3 text-sm leading-6 text-slate-300">
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {loadingAnalysis && (
        <SectionCard title="Working through the critique" subtitle="Curio is isolating assumptions, blind spots and the next question worth asking" accent="violet">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400/40" />
                  <span className="relative h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span className="font-semibold text-white">{loadingStageName}</span>
              </div>
              <span className="text-cyan-300">{loadingProgress}%</span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-violet-500/15 to-slate-800" />
              <div className="relative h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500 transition-all duration-500" style={{ width: `${loadingProgress}%` }} />
            </div>
            <div className="rounded-[20px] border border-cyan-400/20 bg-cyan-500/10 px-4 py-3 text-sm text-slate-200">
              {thinkingMessage}
            </div>
          </div>
        </SectionCard>
      )}

      {analysis && (
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            <MetricCard label="Idea" value={submittedIdea.length > 28 ? `${submittedIdea.slice(0, 28)}…` : submittedIdea} detail="Submitted for critique" accent="cyan" />
            <MetricCard label="Assumptions" value={String(analysis.assumptions?.length ?? 0)} detail="Hidden premises" accent="violet" />
            <MetricCard label="Blind Spots" value={String(analysis.blind_spots?.length ?? 0)} detail="Unexamined gaps" accent="emerald" />
            <MetricCard label="Missing Knowledge" value={String(analysis.missing_knowledge?.length ?? 0)} detail="Evidence still missing" accent="amber" />
            <MetricCard label="Idea Examination Score" value={`${examinationScore}`} detail="Challenge intensity" accent="rose" />
          </div>

          <div className="rounded-[24px] border border-white/10 bg-slate-950/70 p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Progress</p>
                <p className="text-sm font-semibold text-white">Idea Examination Score</p>
              </div>
              <span className="text-sm font-semibold text-cyan-300">{examinationScore}/100</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-violet-500" style={{ width: `${examinationScore}%` }} />
            </div>
          </div>

          <SectionCard title="Investigation pipeline" subtitle="The challenge process behind the critique" accent="violet">
            <div className="space-y-2.5">
              {pipelineSteps.map((step, index) => (
                <PipelineStep
                  key={step.title}
                  title={step.title}
                  description={step.description}
                  icon={<span className="text-lg">{step.icon}</span>}
                  active={index <= pipelineSteps.length - 1}
                  last={index === pipelineSteps.length - 1}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Idea Review" subtitle="A compact critique of the proposal" accent="violet">
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-[20px] border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm font-semibold text-white">Recommended next investigation</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{analysis.recommended_next_step}</p>
              </div>
              <div className="rounded-[20px] border border-white/10 bg-slate-900/70 p-4">
                <p className="text-sm font-semibold text-white">Challenge intensity</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">The critique is designed to pressure-test assumptions rather than provide reassurance.</p>
              </div>
            </div>
          </SectionCard>

          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard title="Hidden Assumptions" subtitle="The premises waiting to be challenged" accent="cyan">
              <ul className="space-y-2">
                {(analysis.assumptions ?? []).map((item: string, index: number) => (
                  <li key={index} className="rounded-[18px] border border-white/10 bg-slate-900/70 px-3 py-2 text-sm leading-6 text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Blind Spots" subtitle="The areas the idea does not yet see" accent="emerald">
              <ul className="space-y-2">
                {(analysis.blind_spots ?? []).map((item: string, index: number) => (
                  <li key={index} className="rounded-[18px] border border-white/10 bg-slate-900/70 px-3 py-2 text-sm leading-6 text-slate-300">
                    <div className="flex items-start justify-between gap-3">
                      <span>{item}</span>
                      <button onClick={() => handleInvestigateFurther(item)} className="shrink-0 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/20">
                        {focusLoading && focusIssue === item ? 'Investigating…' : 'Investigate Further'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard title="Risks" subtitle="The weaknesses that deserve immediate attention" accent="violet">
              <ul className="space-y-2">
                {(analysis.risks ?? []).map((item: string, index: number) => (
                  <li key={index} className="rounded-[18px] border border-white/10 bg-slate-900/70 px-3 py-2 text-sm leading-6 text-slate-300">
                    <div className="flex items-start justify-between gap-3">
                      <span>{item}</span>
                      <button onClick={() => handleInvestigateFurther(item)} className="shrink-0 rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/20">
                        {focusLoading && focusIssue === item ? 'Investigating…' : 'Investigate Further'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Questions You Didn't Ask" subtitle="The difficult questions that should be asked" accent="cyan">
              <ul className="space-y-2">
                {(analysis.questions ?? []).map((item: string, index: number) => (
                  <li key={index} className="rounded-[18px] border border-white/10 bg-slate-900/70 px-3 py-2 text-sm leading-6 text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <SectionCard title="Missing Knowledge" subtitle="The evidence and context that are still absent" accent="amber">
              <ul className="space-y-2">
                {(analysis.missing_knowledge ?? []).map((item: string, index: number) => (
                  <li key={index} className="rounded-[18px] border border-white/10 bg-slate-900/70 px-3 py-2 text-sm leading-6 text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>

            {focusInsight && (
              <SectionCard title="Focused Follow-Up" subtitle={`Deepening the investigation around: ${focusIssue}`} accent="emerald">
                <div className="space-y-2">
                  <p className="rounded-[18px] border border-white/10 bg-slate-900/70 px-3 py-2 text-sm leading-6 text-slate-300">
                    {focusInsight.recommended_next_step}
                  </p>
                  <ul className="space-y-2">
                    {(focusInsight.questions ?? []).slice(0, 3).map((item: string, index: number) => (
                      <li key={index} className="rounded-[18px] border border-white/10 bg-slate-900/70 px-3 py-2 text-sm leading-6 text-slate-300">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SectionCard>
            )}
          </div>
        </div>
      )}
    </div>
  )
}