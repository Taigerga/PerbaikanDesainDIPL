import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserPreferences } from '../context/UserPreferencesContext'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, CreditCard, FileText, HelpCircle, User, LogOut, Book, X,
  Calendar, Award, CheckCircle, ClipboardList, DollarSign, Wallet, Shield, Eye, GraduationCap, ChevronDown, MessageCircle,
} from 'lucide-react'
import { mahasiswa } from '../data/dummyData'

const menuGroups = [
  {
    label: 'MENU UTAMA',
    icon: LayoutDashboard,
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ],
  },
  {
    label: 'Akademik',
    icon: BookOpen,
    items: [
      { to: '/akademik', icon: BookOpen, label: 'Rencana Studi (KRS)', tab: 'krs' },
      { to: '/akademik', icon: Calendar, label: 'Jadwal Kuliah', tab: 'jadwal' },
      { to: '/akademik', icon: Award, label: 'Riwayat Nilai', tab: 'nilai' },
      { to: '/akademik', icon: CheckCircle, label: 'Kehadiran', tab: 'absensi' },
      { to: '/akademik', icon: ClipboardList, label: 'Pengisian Kelas', tab: 'kelas' },
    ],
  },
  {
    label: 'Keuangan',
    icon: CreditCard,
    items: [
      { to: '/keuangan', icon: DollarSign, label: 'Tagihan', tab: 'tagihan' },
      { to: '/keuangan', icon: Wallet, label: 'Riwayat Pembayaran', tab: 'riwayat' },
    ],
  },
  {
    label: 'Profil & Akun',
    icon: User,
    items: [
      { to: '/profil', icon: User, label: 'Data Akademik', tab: 'data-diri' },
      { to: '/profil', icon: Shield, label: 'Keamanan', tab: 'keamanan' },
      { to: '/profil', icon: Eye, label: 'Tampilan', tab: 'tampilan' },
    ],
  },
  {
    label: 'Lainnya',
    icon: FileText,
    items: [
      { to: '/layanan', icon: FileText, label: 'Layanan', tab: 'layanan' },
      { to: '/layanan', icon: ClipboardList, label: 'Kuesioner', tab: 'kuesioner' },
      { to: '/layanan', icon: GraduationCap, label: 'Syarat Wisuda', tab: 'wisuda' },
      { to: '/layanan', icon: HelpCircle, label: 'Bantuan', tab: 'faq' },
      { to: '/layanan', icon: MessageCircle, label: 'Chatbot', tab: 'chatbot' },
    ],
  },
]

function isGroupActive(pathname, group) {
  return group.items.some((item) => pathname.startsWith(item.to))
}

export default function Sidebar({ open, onClose }) {
  const [isDesktop, setIsDesktop] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()
  const { trackClick } = useUserPreferences()

  const [expanded, setExpanded] = useState(() => {
    const initial = {}
    menuGroups.forEach((g) => {
      initial[g.label] = true
    })
    return initial
  })

  useEffect(() => {
    const active = menuGroups.find((g) => isGroupActive(location.pathname, g))
    if (active) {
      setExpanded((prev) => ({ ...prev, [active.label]: true }))
    }
  }, [location.pathname])

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const toggleGroup = (label) => {
    setExpanded((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <AnimatePresence>
      {!isDesktop && open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isDesktop ? 0 : open ? 0 : -280 }}
        aria-label="Sidebar navigasi"
        className={`fixed left-0 top-0 z-50 flex h-full flex-col border-r border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 ${
          isDesktop ? 'w-60' : 'w-60'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-lg font-bold text-white">
              <Book size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 dark:text-white">MyAcademic</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">Academic Portal</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Tutup sidebar" className="text-gray-400 hover:text-gray-600 lg:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-3 dark:border-gray-700">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {mahasiswa.nama.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-800 dark:text-white">{mahasiswa.nama}</p>
            <p className="font-mono-custom text-[10px] text-gray-500 dark:text-gray-400">{mahasiswa.nim}</p>
          </div>
        </div>

        <nav role="navigation" aria-label="Menu navigasi utama" className="flex-1 overflow-y-auto px-3 py-4">
          {menuGroups.map((group) => {
            const isOpen = expanded[group.label]
            return (
              <div key={group.label} className="mb-1">
                <button
                  onClick={() => {
                    if (group.items.length === 1) {
                      const item = group.items[0]
                      trackClick(item.to)
                      navigate(item.to, item.tab ? { state: { tab: item.tab } } : {})
                      if (!isDesktop) onClose()
                    } else {
                      toggleGroup(group.label)
                    }
                  }}
                  aria-expanded={group.items.length > 1 ? isOpen : undefined}
                  aria-label={`${group.label}${group.items.length > 1 ? `, ${isOpen ? 'terbuka' : 'tertutup'}` : ''}`}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-all hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <group.icon
                    size={18}
                    className="text-gray-400 dark:text-gray-500"
                  />
                  <span className="flex-1 text-left">{group.label}</span>
                  {group.items.length > 1 && (
                    <ChevronDown
                      size={14}
                      className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}
                    />
                  )}
                </button>

                {group.items.length > 1 && (
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="ml-2 mt-0.5 space-y-0.5 border-l-2 border-gray-100 pl-3 dark:border-gray-700">
                          {group.items.map((item) => {
                            const active = location.pathname === item.to && (
                              !item.tab || location.state?.tab === item.tab || (!location.state?.tab && item.tab === group.items[0].tab)
                            )
                            const isActuallyActive = (() => {
                              if (location.pathname !== item.to) return false
                              if (!item.tab) return true
                              const currentTab = location.state?.tab
                              if (!currentTab && item.tab === group.items[0]?.tab) return true
                              return currentTab === item.tab
                            })()
                            return (
                              <button
                                key={item.label}
                                onClick={() => {
                                  trackClick(item.to)
                                  navigate(item.to, item.tab ? { state: { tab: item.tab } } : {})
                                  if (!isDesktop) onClose()
                                }}
                                aria-current={isActuallyActive ? 'page' : undefined}
                                className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-all ${
                                  isActuallyActive
                                    ? 'bg-primary/10 font-semibold text-primary'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                              >
                                <item.icon size={14} className={isActuallyActive ? 'text-primary' : 'text-gray-400 dark:text-gray-500'} />
                                <span>{item.label}</span>
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-3 dark:border-gray-700">
          <button onClick={() => navigate('/')} aria-label="Keluar dari aplikasi" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400">
            <LogOut size={18} />
            Keluar
          </button>
          <p className="mt-2 text-center text-[10px] text-gray-400 dark:text-gray-500">
            v2.0.1 &middot; My Academic UNIKOM
          </p>
        </div>
      </motion.aside>
    </AnimatePresence>
  )
}
