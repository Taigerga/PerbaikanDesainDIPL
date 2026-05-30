import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft, Eye } from 'lucide-react'

export default function SuccessPage({
  title = 'Berhasil disimpan!',
  message = '',
  summaryItems = [],
  nextSteps = '',
  primaryAction = null,
  secondaryAction = null,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/50 dark:bg-emerald-900/10"
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
          <CheckCircle size={32} className="text-emerald-600" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-emerald-800 dark:text-emerald-200">{title}</h2>
        {message && (
          <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">{message}</p>
        )}
      </div>

      {summaryItems.length > 0 && (
        <div className="mt-5 space-y-2 rounded-xl bg-white/60 p-4 dark:bg-gray-800/60">
          {summaryItems.map((item, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">{item.label}</span>
              <span className="font-medium text-gray-800 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      {nextSteps && (
        <div className="mt-4 rounded-xl bg-blue-50 p-4 dark:bg-blue-900/10">
          <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
            Langkah selanjutnya: {nextSteps}
          </p>
        </div>
      )}

      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
            >
              <ArrowLeft size={16} />
              {primaryAction.label}
            </button>
          )}
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="flex items-center gap-2 rounded-xl border border-emerald-300 px-5 py-2.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
            >
              <Eye size={16} />
              {secondaryAction.label}
            </button>
          )}
        </div>
      )}
    </motion.div>
  )
}
