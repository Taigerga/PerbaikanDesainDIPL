import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react'

const LOGIN_FLAG_KEY = 'jt-login'

const steps = [
  {
    title: 'Selamat Datang di My Academic',
    description: 'Dashboard adalah pusat kendali Anda. Lihat ringkasan status akademik, akses cepat ke fitur utama, dan pantau aktivitas penting — semuanya dalam satu halaman.',
    icon: '\u{1F44B}',
  },
  {
    title: 'Navigasi Sidebar',
    description: 'Gunakan sidebar untuk berpindah antar halaman. Menu dikelompokkan berdasarkan kategori: Akademik, Keuangan, Profil & Akun, dan Lainnya. Klik grup untuk memperluas sub-menu.',
    icon: '\u{1F4F1}',
  },
  {
    title: 'Fitur Akademik',
    description: 'Di menu Akademik, Anda bisa mengisi KRS (Rencana Studi), melihat jadwal kuliah, mengecek nilai dan absensi, serta melakukan pengisian kelas.',
    icon: '\u{1F4DA}',
  },
  {
    title: 'Chatbot & Bantuan',
    description: 'Butuh bantuan cepat? Gunakan chatbot Asisten Akademik (ikon pesan di pojok kanan bawah) atau buka halaman Bantuan untuk FAQ, panduan, dan kontak layanan.',
    icon: '\u{1F916}',
  },
]

export default function OnboardingTour({ autoShow = false, open: controlledOpen, onComplete, onSkip }) {
  const [internalOpen, setInternalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  useEffect(() => {
    if (autoShow && sessionStorage.getItem(LOGIN_FLAG_KEY) === 'true') {
      sessionStorage.removeItem(LOGIN_FLAG_KEY)
      setInternalOpen(true)
    }
  }, [autoShow])

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
    }
  }, [isOpen])

  const close = () => {
    if (controlledOpen !== undefined) {
      onSkip?.()
    } else {
      setInternalOpen(false)
    }
  }

  const complete = () => {
    if (controlledOpen !== undefined) {
      onComplete?.()
    } else {
      setInternalOpen(false)
    }
  }

  const skip = () => {
    close()
  }

  const next = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      complete()
    }
  }

  const prev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }

  const step = steps[currentStep]
  const isLast = currentStep === steps.length - 1
  const isFirst = currentStep === 0

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          role="dialog"
          aria-label="Tur panduan fitur"
          aria-modal="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-800"
          >
            <div className="absolute right-3 top-3 z-10">
              <button
                onClick={skip}
                aria-label="Tutup tur panduan"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex flex-col items-center px-8 pt-10 pb-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-4xl">
                {step.icon}
              </div>
              <h2 className="mt-5 text-xl font-bold text-gray-800 dark:text-white">
                {step.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>

            <div className="flex items-center justify-center gap-1.5 pb-4">
              {steps.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? 'w-6 bg-primary'
                      : i < currentStep
                      ? 'w-2 bg-primary/40'
                      : 'w-2 bg-gray-200 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4 dark:border-gray-700">
              <button
                onClick={prev}
                disabled={isFirst}
                aria-label="Langkah sebelumnya"
                className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  isFirst
                    ? 'cursor-not-allowed text-gray-300 dark:text-gray-600'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <ChevronLeft size={16} />
                Kembali
              </button>

              {!isLast && (
                <button
                  onClick={skip}
                  className="text-xs text-gray-400 underline underline-offset-2 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  Lewati tur
                </button>
              )}

              <button
                onClick={next}
                aria-label={isLast ? 'Selesai' : 'Langkah selanjutnya'}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all ${
                  isLast
                    ? 'bg-success hover:bg-emerald-600'
                    : 'bg-primary hover:bg-primary-dark'
                }`}
              >
                {isLast ? (
                  <>
                    Selesai
                    <Check size={16} />
                  </>
                ) : (
                  <>
                    Selanjutnya
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function hasSeenOnboarding() {
  return true
}
