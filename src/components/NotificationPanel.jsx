import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Bell, AlertTriangle, DollarSign, Info, CheckCircle, Eye } from 'lucide-react'
import { notifikasi as notifData, mahasiswa } from '../data/dummyData'

const STORAGE_KEY = 'notif-read'

const iconMap = {
  kuning: { icon: AlertTriangle, bg: 'bg-yellow-100 dark:bg-yellow-900/30', color: 'text-yellow-600 dark:text-yellow-400' },
  merah: { icon: DollarSign, bg: 'bg-red-100 dark:bg-red-900/30', color: 'text-red-600 dark:text-red-400' },
  hijau: { icon: CheckCircle, bg: 'bg-emerald-100 dark:bg-emerald-900/30', color: 'text-emerald-600 dark:text-emerald-400' },
  biru: { icon: Info, bg: 'bg-blue-100 dark:bg-blue-900/30', color: 'text-blue-600 dark:text-blue-400' },
}

function loadReadState() {
  try {
    const val = localStorage.getItem(STORAGE_KEY)
    return val ? JSON.parse(val) : []
  } catch { return [] }
}

function getPriority(item) {
  const judul = item.judul.toLowerCase()
  const sem = parseInt(mahasiswa.semester) || 6
  let score = 0
  if (judul.includes('krs') || judul.includes('tagihan')) score += 30 - (sem * 2)
  if (judul.includes('nilai') || judul.includes('uts') || judul.includes('uas')) score += 20
  if (judul.includes('jadwal') || judul.includes('ruang')) score += 10
  if (item.warna === 'merah') score += 15
  if (item.warna === 'kuning') score += 10
  if (!item.dibaca) score += 25
  return score
}

export default function NotificationPanel({ open, onClose }) {
  const [readIds, setReadIds] = useState(loadReadState)

  useEffect(() => {
    if (open) {
      setReadIds(loadReadState())
    }
  }, [open])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readIds))
  }, [readIds])

  const markRead = useCallback((id) => {
    setReadIds((prev) => prev.includes(id) ? prev : [...prev, id])
  }, [])

  const sorted = [...notifData]
    .sort((a, b) => getPriority(b) - getPriority(a))

  const unreadCount = sorted.filter((n) => !n.dibaca && !readIds.includes(n.id)).length

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            className="absolute right-0 top-full z-50 mt-2 w-80 rounded-xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-primary" />
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Notifikasi</h3>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-danger px-1.5 py-0.5 text-[9px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              <button onClick={onClose} aria-label="Tutup notifikasi" className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {sorted.map((n) => {
                const meta = iconMap[n.warna] || iconMap.biru
                const Icon = meta.icon
                const isRead = n.dibaca || readIds.includes(n.id)
                return (
                  <div
                    key={n.id}
                    className={`border-b border-gray-50 px-4 py-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 ${
                      !isRead ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${meta.bg} ${meta.color}`}>
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm ${!isRead ? 'font-semibold text-gray-800 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                          {n.judul}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{n.pesan}</p>
                        <p className="mt-1 text-[10px] text-gray-400 dark:text-gray-500">{n.waktu}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-center gap-1">
                        {!isRead && (
                          <button
                            onClick={() => markRead(n.id)}
                            aria-label="Tandai sudah dibaca"
                            className="rounded-lg p-1 text-gray-300 transition-colors hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-600"
                          >
                            <Eye size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function getUnreadCount() {
  try {
    const readIds = loadReadState()
    return notifData.filter((n) => !n.dibaca && !readIds.includes(n.id)).length
  } catch { return 0 }
}
