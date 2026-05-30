import { motion } from 'framer-motion'
import { AlertCircle, X } from 'lucide-react'

export default function ErrorMessage({
  title = 'Terjadi kesalahan',
  message = '',
  cause = '',
  solution = '',
  onDismiss = null,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/10"
    >
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-600" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-red-800 dark:text-red-200">{title}</p>
          {message && (
            <p className="mt-1 text-sm text-red-700 dark:text-red-300">{message}</p>
          )}
          {cause && (
            <p className="mt-2 text-xs text-red-600/80 dark:text-red-400/80">
              Penyebab: {cause}
            </p>
          )}
          {solution && (
            <p className="mt-0.5 text-xs font-medium text-red-600 dark:text-red-400">
              Solusi: {solution}
            </p>
          )}
        </div>
        {onDismiss && (
          <button onClick={onDismiss} aria-label="Tutup pesan error" className="text-red-400 hover:text-red-600">
            <X size={16} />
          </button>
        )}
      </div>
    </motion.div>
  )
}
