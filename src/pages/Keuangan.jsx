import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Wallet, AlertTriangle, DollarSign } from 'lucide-react'
import { pembayaran } from '../data/dummyData'

const tabs = [
  { id: 'tagihan', label: 'Tagihan', icon: DollarSign },
  { id: 'riwayat', label: 'Riwayat Pembayaran', icon: Wallet },
]

function TagihanContent() {
  const tagihanAktif = 3500000
  const totalTahun = pembayaran.reduce((sum, p) => sum + p.jumlah, 0)

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-red-700 p-5 text-white shadow-sm"
        >
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-white/80">Tagihan Aktif</p>
                <p className="mt-1 text-3xl font-bold">Rp {tagihanAktif.toLocaleString('id-ID')}</p>
              </div>
              <AlertTriangle size={24} className="text-white/50" />
            </div>
            <p className="mt-2 text-xs text-white/70">
              SPP Semester VI — Jatuh tempo: 10 Juni 2026
            </p>
            <button className="mt-4 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-red-600 shadow-lg transition-all hover:bg-white/90">
              Bayar Sekarang
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800"
        >
          <div className="flex items-center gap-2">
            <Wallet size={18} className="text-primary" />
            <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Ringkasan Pembayaran</h2>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Total Pembayaran Tahun Ini</span>
              <span className="text-sm font-bold text-gray-800 dark:text-white">Rp {totalTahun.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Jumlah Transaksi</span>
              <span className="text-sm font-bold text-gray-800 dark:text-white">{pembayaran.length}x</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400">Status</span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-medium text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                {pembayaran.filter(p => p.status === 'Lunas').length} Lunas
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function RiwayatContent() {
  const [filter, setFilter] = useState('Semua')

  const filtered = filter === 'Semua'
    ? pembayaran
    : pembayaran.filter((p) => p.status === filter)

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white">Riwayat Pembayaran</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
        >
          <option>Semua</option>
          <option>Lunas</option>
          <option>Belum Lunas</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">Tanggal</th>
              <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">Keterangan</th>
              <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">Jumlah</th>
              <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
              <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-gray-50 dark:border-gray-700">
                <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300">{p.tanggal}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{p.keterangan}</td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-800 dark:text-white">
                  Rp {p.jumlah.toLocaleString('id-ID')}
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                    p.status === 'Lunas'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {p.status === 'Lunas' ? 'Lunas ✓' : p.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {p.status === 'Lunas' && (
                    <button className="flex items-center gap-1 text-[10px] font-medium text-primary hover:text-primary-dark">
                      <Download size={12} />
                      Unduh
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function Keuangan() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'tagihan')

  useEffect(() => {
    if (location.state?.tab) setActiveTab(location.state?.tab)
  }, [location.state?.tab])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Keuangan</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Status tagihan dan riwayat pembayaran
        </p>
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-2xl bg-gray-100 p-1 dark:bg-gray-800">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? 'text-primary'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="keuangan-tab-indicator"
                  className="absolute inset-0 rounded-xl bg-white shadow-sm dark:bg-gray-700"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <tab.icon size={16} className="relative z-10" />
              <span className="relative z-10">{tab.label}</span>
            </button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === 'tagihan' && <TagihanContent />}
          {activeTab === 'riwayat' && <RiwayatContent />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
