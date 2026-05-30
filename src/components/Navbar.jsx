import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { Search, Bell, Moon, Sun, Menu, ChevronDown, LogOut, User, LayoutDashboard, BookOpen, FileText, HelpCircle, Calendar, Award, CheckCircle, ClipboardList, DollarSign, Wallet, GraduationCap, Shield, Eye, MessageCircle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useUserPreferences } from '../context/UserPreferencesContext'
import NotificationPanel, { getUnreadCount } from './NotificationPanel'
import { motion, AnimatePresence } from 'framer-motion'
import { mahasiswa } from '../data/dummyData'
import { searchWithContext } from '../utils/searchUtils'

const searchData = [
  { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard, kategori: 'MENU UTAMA' },
  { label: 'KRS', route: '/akademik', icon: BookOpen, kategori: 'AKADEMIK', tab: 'krs' },
  { label: 'Jadwal Kuliah', route: '/akademik', icon: Calendar, kategori: 'AKADEMIK', tab: 'jadwal' },
  { label: 'Nilai', route: '/akademik', icon: Award, kategori: 'AKADEMIK', tab: 'nilai' },
  { label: 'Absensi', route: '/akademik', icon: CheckCircle, kategori: 'AKADEMIK', tab: 'absensi' },
  { label: 'Pengisian Kelas', route: '/akademik', icon: ClipboardList, kategori: 'AKADEMIK', tab: 'kelas' },
  { label: 'Tagihan', route: '/keuangan', icon: DollarSign, kategori: 'KEUANGAN', tab: 'tagihan' },
  { label: 'Riwayat Pembayaran', route: '/keuangan', icon: Wallet, kategori: 'KEUANGAN', tab: 'riwayat' },
  { label: 'Kuesioner', route: '/layanan', icon: ClipboardList, kategori: 'LAINNYA', tab: 'kuesioner' },
  { label: 'Syarat Wisuda', route: '/layanan', icon: GraduationCap, kategori: 'LAINNYA', tab: 'wisuda' },
  { label: 'Layanan/Surat', route: '/layanan', icon: FileText, kategori: 'LAINNYA', tab: 'layanan' },
  { label: 'Bantuan', route: '/layanan', icon: HelpCircle, kategori: 'LAINNYA', tab: 'faq' },
  { label: 'Chatbot', route: '/layanan', icon: MessageCircle, kategori: 'LAINNYA', tab: 'chatbot' },
  { label: 'Profil', route: '/profil', icon: User, kategori: 'PROFIL', tab: 'data-diri' },
  { label: 'Akun & Kontak', route: '/profil', icon: Shield, kategori: 'PROFIL', tab: 'keamanan' },
  { label: 'Tampilan', route: '/profil', icon: Eye, kategori: 'PROFIL', tab: 'tampilan' },
]

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/akademik': 'Akademik',
  '/keuangan': 'Keuangan',
  '/layanan': 'Layanan & Bantuan',
  '/profil': 'Profil',
  '/bantuan': 'Layanan & Bantuan',
}

export default function Navbar({ onMenuClick, searchRef }) {
  const { dark, toggleDark } = useTheme()
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [search, setSearch] = useState('')
  const [showSearchResults, setShowSearchResults] = useState(false)
  const internalRef = useRef(null)
  const searchContainerRef = searchRef || internalRef
  const navigate = useNavigate()
  const location = useLocation()
  const { trackClick } = useUserPreferences()

  const pageTitle = pageTitles[location.pathname] || 'My Academic'

  function HighlightedText({ text, query }) {
    if (!query.trim()) return text
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i} className="bg-primary/10 text-primary rounded px-0.5 font-semibold">{part}</mark>
        : part
    )
  }

  const enrichedResults = searchWithContext(search, searchData)

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [searchContainerRef])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/80 px-4 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/80">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Buka menu"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-2">
        <div ref={searchContainerRef} role="search" aria-label="Pencarian global" className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setShowSearchResults(true)
            }}
            onFocus={() => setShowSearchResults(true)}
            placeholder="Cari menu, fitur, informasi..."
            aria-label="Pencarian global"
            className="w-64 rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          <AnimatePresence>
            {showSearchResults && enrichedResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="px-4 pt-2 pb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Hasil Pencarian</span>
                </div>
                {enrichedResults.map((item) => (
                  <Link
                    key={item.label}
                    to={item.route}
                    state={item.tab ? { tab: item.tab } : {}}
                    onClick={() => { setSearch(''); setShowSearchResults(false); trackClick(item.route) }}
                    className="flex items-start gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                      <item.icon size={14} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800 dark:text-white">
                          <HighlightedText text={item.label} query={search} />
                        </span>
                        <span className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          {item.kategori}
                        </span>
                      </div>
                      {item.context && (
                        <p className="mt-0.5 truncate text-[11px] text-gray-500 dark:text-gray-400">
                          {item.context}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleDark}
          aria-label={dark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
          className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            aria-label="Notifikasi"
            className="relative rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell size={18} />
            {getUnreadCount() > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">
                {getUnreadCount()}
              </span>
            )}
          </button>
          <NotificationPanel open={showNotif} onClose={() => setShowNotif(false)} />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            aria-label="Profil"
            className="flex items-center gap-2 rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
              {mahasiswa.nama.charAt(0)}
            </div>
            <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 md:block">
              {mahasiswa.nama.split(' ')[0]}
            </span>
            <ChevronDown size={14} className="hidden text-gray-400 md:block" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="border-b border-gray-100 p-3 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">{mahasiswa.nama}</p>
                  <p className="text-xs text-gray-500">{mahasiswa.nim}</p>
                </div>
                <button
                  onClick={() => { setShowProfile(false); trackClick('/profil'); navigate('/profil') }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <User size={16} /> Profil
                </button>
                <button onClick={() => navigate('/')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut size={16} /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <span className="hidden rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold text-accent sm:inline-block">
          PROTOTYPE
        </span>
      </div>
    </header>
  )
}
