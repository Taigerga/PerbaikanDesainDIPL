import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, TrendingUp, Calendar, CheckCircle, BookOpen, Clock, FileText, CreditCard, HelpCircle, X, AlertTriangle, DollarSign, Info, Star } from 'lucide-react'
import AIChatWidget from '../components/AIChatWidget'
import OnboardingTour from '../components/OnboardingTour'
import { useUserPreferences } from '../context/UserPreferencesContext'
import { mahasiswa, jadwalHariIni, aktivitasTerbaru, aktivitasPenting, persetujuanDosen } from '../data/dummyData'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 11) return 'Pagi'
  if (h < 15) return 'Siang'
  if (h < 18) return 'Sore'
  return 'Malam'
}

const today = new Date().toLocaleDateString('id-ID', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
})

const welcomeGradients = {
  Pagi: 'from-amber-400 to-orange-500',
  Siang: 'from-blue-500 to-cyan-500',
  Sore: 'from-purple-500 to-pink-500',
  Malam: 'from-indigo-700 to-blue-900',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { trackClick, toggleBookmark, isBookmarked, bookmarks, getFrequentlyUsed, isDashboardCardHidden, frequencies } = useUserPreferences()
  const [showWarning, setShowWarning] = useState(true)
  const greeting = getGreeting()
  const frequentlyUsed = getFrequentlyUsed(4)

  const stats = [
    { icon: GraduationCap, label: 'SKS Ditempuh', value: `${mahasiswa.sksLulus} SKS`, color: 'blue' },
    { icon: TrendingUp, label: 'IPK Kumulatif', value: mahasiswa.ipk, color: 'green' },
    { icon: Calendar, label: 'Semester Aktif', value: mahasiswa.semester, color: 'yellow' },
    { icon: CheckCircle, label: 'Kehadiran Rata-rata', value: `${mahasiswa.kehadiran}%`, color: 'green' },
  ]

  const quickAccess = [
    { id: 'isi-krs', icon: BookOpen, label: 'Isi KRS', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30', to: '/akademik' },
    { id: 'jadwal', icon: Calendar, label: 'Jadwal Kuliah', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30', to: '/akademik' },
    { id: 'nilai', icon: TrendingUp, label: 'Lihat Nilai', color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30', to: '/akademik' },
    { id: 'tagihan', icon: CreditCard, label: 'Bayar Tagihan', color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30', to: '/keuangan' },
    { id: 'surat', icon: FileText, label: 'Buat Surat', color: 'bg-rose-100 text-rose-600 dark:bg-rose-900/30', to: '/layanan' },
    { id: 'bantuan', icon: HelpCircle, label: 'Bantuan', color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30', to: '/layanan' },
    { id: 'chatbot', icon: HelpCircle, label: 'Tanya Chatbot', color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30', to: '' },
  ]

  const bookmarkedItems = bookmarks.map((id) => quickAccess.find((q) => q.id === id)).filter(Boolean)

  const sortedQuickAccess = [...quickAccess].sort((a, b) => {
    const aCount = a.to ? (frequencies[a.to] || 0) : 0
    const bCount = b.to ? (frequencies[b.to] || 0) : 0
    return bCount - aCount
  })

  const statusBadge = (status) => {
    if (status === 'Hadir') return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
    if (status === 'Akan datang') return 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
    return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
  }

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/10"
          >
            <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-600" />
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Pengisian KRS ditutup dalam 3 hari. Klik di sini untuk mengisi sekarang.
              </p>
            </div>
            <button onClick={() => setShowWarning(false)} aria-label="Tutup peringatan" className="text-amber-400 hover:text-amber-600">
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${welcomeGradients[greeting]} p-6 text-white`}
      >
        <div className="relative z-10">
          <h1 className="text-2xl font-bold">
            Selamat {greeting}, {mahasiswa.nama.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-sm text-white/80">{today}</p>
        </div>
        <div className="absolute right-4 top-4 text-6xl opacity-10">
          {greeting === 'Pagi' && '☀️'}
          {greeting === 'Siang' && '🌤️'}
          {greeting === 'Sore' && '🌅'}
          {greeting === 'Malam' && '🌙'}
        </div>
      </motion.div>

      {!isDashboardCardHidden('stats') && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
            >
              <div className={`absolute left-0 top-0 h-1 w-full rounded-t-2xl ${
                stat.color === 'blue' ? 'bg-primary' :
                stat.color === 'green' ? 'bg-success' :
                'bg-accent'
              }`} />
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                </div>
                <div className={`rounded-lg p-2 ${
                  stat.color === 'blue' ? 'bg-blue-100 text-primary dark:bg-blue-900/30' :
                  stat.color === 'green' ? 'bg-emerald-100 text-success dark:bg-emerald-900/30' :
                  'bg-amber-100 text-accent dark:bg-amber-900/30'
                }`}>
                  <stat.icon size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!isDashboardCardHidden('aktivitas') && (
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Aktivitas Akademik Penting</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {aktivitasPenting.map((item) => {
              const Icon = item.warna === 'kuning' ? AlertTriangle : item.warna === 'merah' ? DollarSign : item.warna === 'biru' ? Info : CheckCircle
              const borderColor = item.warna === 'kuning' ? 'border-l-amber-500' : item.warna === 'merah' ? 'border-l-red-500' : item.warna === 'biru' ? 'border-l-blue-500' : 'border-l-emerald-500'
              const iconBg = item.warna === 'kuning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30' : item.warna === 'merah' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : item.warna === 'biru' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
              return (
                <div key={item.id} className={`flex items-center gap-3 rounded-xl border border-gray-100 border-l-4 ${borderColor} bg-white p-4 dark:border-gray-700 dark:bg-gray-800`}>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconBg}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.label}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {!isDashboardCardHidden('persetujuan') && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900/50 dark:bg-emerald-900/10"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
              <CheckCircle size={24} className="text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-emerald-800 dark:text-emerald-200">
                Persetujuan Dosen Wali: {persetujuanDosen.status === 'disetujui' ? '✅ Disetujui' : '⏳ Menunggu'}
              </p>
              <p className="mt-1 text-sm text-emerald-700 dark:text-emerald-300">
                Oleh: {persetujuanDosen.dosen}
              </p>
              <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">
                Disetujui pada: {persetujuanDosen.tanggal}
              </p>
              <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
                "{persetujuanDosen.catatan}"
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <OnboardingTour autoShow />

      {!isDashboardCardHidden('akses-cepat') && (
        <>
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Akses Cepat</h2>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
            {sortedQuickAccess.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ y: -4, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { if (item.to) { trackClick(item.to); navigate(item.to) } else { document.querySelector('[aria-label="Buka chatbot"]')?.click() } }}
                className="relative flex flex-col items-center gap-2 rounded-2xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
              >
                {item.to && (
                  <span
                    onClick={(e) => { e.stopPropagation(); toggleBookmark(item.id) }}
                    className="absolute right-1.5 top-1.5 cursor-pointer"
                  >
                    <Star
                      size={12}
                      className={isBookmarked(item.id) ? 'fill-accent text-accent' : 'text-gray-300 dark:text-gray-600'}
                    />
                  </span>
                )}
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon size={22} />
                </div>
                <span className="text-[11px] font-medium text-gray-600 dark:text-gray-300">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {bookmarkedItems.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Favorit Saya</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {bookmarkedItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => { trackClick(item.route); navigate(item.route) }}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Star size={16} className="fill-accent text-accent" />
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {frequentlyUsed.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Sering Diakses</h2>
            <div className="flex flex-wrap gap-2">
              {frequentlyUsed.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigate(item.route)}
                  className="rounded-full bg-primary/10 px-4 py-2 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {frequentlyUsed.length > 0 && (
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Berdasarkan Aktivitasku</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {frequentlyUsed.slice(0, 4).map((item) => {
                const qa = quickAccess.find((q) => q.to === item.route)
                return (
                  <button
                    key={item.label}
                  onClick={() => { if (item.to) { trackClick(item.to); navigate(item.to) } }}
                    className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
                  >
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${qa?.color || 'bg-primary/10 text-primary'}`}>
                      {qa ? <qa.icon size={16} /> : <Star size={16} className="text-primary" />}
                    </div>
                    <div className="min-w-0 text-left">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{item.label}</span>
                      <p className="text-[10px] text-gray-400">{frequencies[item.route] || 0}x diklik</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
        </>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Jadwal Kuliah Hari Ini</h2>
          </div>
          <div className="space-y-0">
            {jadwalHariIni.map((item, i) => (
              <div key={i} className="flex items-start gap-4 border-b border-gray-50 py-3 last:border-0 dark:border-gray-700">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    {item.waktu.split(' – ')[0]}
                  </div>
                  {i < jadwalHariIni.length - 1 && (
                    <div className="mt-1 h-full w-0.5 bg-gray-200 dark:bg-gray-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{item.matkul}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.ruang} &middot; {item.waktu}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${statusBadge(item.status)}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
          <div className="mb-4 flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Riwayat Aktivitas Terbaru</h2>
          </div>
          <div className="space-y-0">
            {aktivitasTerbaru.map((item) => (
              <div key={item.id} className="flex items-start gap-3 border-b border-gray-50 py-3 last:border-0 dark:border-gray-700">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-200">{item.teks}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">{item.waktu}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AIChatWidget />
    </div>
  )
}
