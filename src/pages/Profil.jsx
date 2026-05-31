import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Shield, Smartphone, Eye, Moon, Camera, LayoutDashboard, CheckCircle, TrendingUp, AlertTriangle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useUserPreferences } from '../context/UserPreferencesContext'
import { mahasiswa } from '../data/dummyData'
import ConfirmDialog from '../components/common/ConfirmDialog'
import SuccessPage from '../components/common/SuccessPage'

const tabs = [
  { id: 'data-diri', label: 'Data Diri' },
  { id: 'keamanan', label: 'Keamanan' },
  { id: 'tampilan', label: 'Tampilan' },
]

export default function Profil() {
  const navigate = useNavigate()
  const location = useLocation()
  const { dark, toggleDark } = useTheme()
  const { fontSize, setFontSize, hiddenCards, toggleDashboardCard, isDashboardCardHidden, frequencies, menuItems } = useUserPreferences()
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'data-diri')

  useEffect(() => {
    if (location.state?.tab) setActiveTab(location.state?.tab)
  }, [location.state?.tab])
  const [confirmOpen, setConfirmOpen] = useState(null)
  const [success, setSuccess] = useState(null)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Profil</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Data diri dan pengaturan akun</p>
      </div>

      {success && (
        <SuccessPage
          title={success.title}
          message={success.message}
          summaryItems={success.summaryItems}
          nextSteps={success.nextSteps}
          primaryAction={{ label: 'Kembali ke Dashboard', onClick: () => navigate('/dashboard') }}
          secondaryAction={{ label: 'Kembali ke Profil', onClick: () => setSuccess(null) }}
        />
      )}

      {!success && <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-gray-800"
          >
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-3xl font-bold text-white shadow-md">
              {mahasiswa.nama.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-800 dark:text-white">{mahasiswa.nama}</h2>
            <p className="font-mono-custom text-sm text-gray-500 dark:text-gray-400">{mahasiswa.nim}</p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{mahasiswa.prodi}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">Semester {mahasiswa.semester}</p>
            <span className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
              {mahasiswa.status}
            </span>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              <Camera size={14} />
              Edit Foto
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800"
          >
            <div className="mb-3 flex items-center gap-2">
              <Smartphone size={16} className="text-primary" />
              <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Perangkat Terdaftar</h3>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30">
                <Smartphone size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{mahasiswa.device.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{mahasiswa.device.os}</p>
              </div>
              <Shield size={16} className="text-emerald-500" />
            </div>
          </motion.div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="flex gap-1 overflow-x-auto rounded-2xl bg-gray-100 p-1 dark:bg-gray-800">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    isActive ? 'bg-white text-primary shadow-sm dark:bg-gray-700' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="profil-tab"
                      className="absolute inset-0 rounded-xl bg-white shadow-sm dark:bg-gray-700"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              )
            })}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800"
          >
            {activeTab === 'data-diri' && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InfoField label="Nama Lengkap" value={mahasiswa.nama} icon={User} />
                  <InfoField label="NIM" value={mahasiswa.nim} icon={BookOpen} />
                  <InfoField label="Tempat/Tanggal Lahir" value={`${mahasiswa.tempatLahir}, ${mahasiswa.tanggalLahir}`} icon={Calendar} />
                  <InfoField label="Email" value={mahasiswa.email} icon={Mail} />
                  <InfoField label="No. HP" value={mahasiswa.noHp} icon={Phone} />
                  <InfoField label="Alamat" value={mahasiswa.alamat} icon={MapPin} />
                </div>
                <button
                  onClick={() => setConfirmOpen({ tab: 'data-diri' })}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
                >
                  Perbarui Data
                </button>
              </div>
            )}

            {activeTab === 'keamanan' && (
              <div className="space-y-5">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-300">Password Lama</label>
                  <input type="password" placeholder="Masukkan password lama" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-300">Password Baru</label>
                  <input type="password" placeholder="Masukkan password baru" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-300">Konfirmasi Password</label>
                  <input type="password" placeholder="Konfirmasi password baru" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white" />
                </div>
                <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4 dark:bg-blue-900/10">
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-primary" />
                    <p className="text-xs text-blue-700 dark:text-blue-300">2FA meningkatkan keamanan akun Anda secara signifikan</p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-primary peer-checked:after:translate-x-full" />
                  </label>
                </div>
                <button
                  onClick={() => setConfirmOpen({ tab: 'keamanan' })}
                  className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark"
                >
                  Simpan Perubahan
                </button>
              </div>
            )}

            {activeTab === 'tampilan' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">Mode Gelap</span>
                  </div>
                  <button
                    onClick={toggleDark}
                    role="switch"
                    aria-checked={dark}
                    aria-label="Mode gelap"
                    className={`relative inline-flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${dark ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                  >
                    <span className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${dark ? 'translate-x-full' : 'translate-x-0'}`} />
                  </button>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Eye size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">Ukuran Teks</span>
                  </div>
                  <p className="mb-3 text-xs text-gray-400">Sesuaikan besar kecilnya teks di seluruh aplikasi.</p>
                  <div className="flex gap-2">
                    {['kecil', 'normal', 'besar'].map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        aria-pressed={fontSize === size}
                        className={`rounded-xl px-4 py-2 text-xs font-medium transition-all ${
                          fontSize === size
                            ? 'bg-primary text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <LayoutDashboard size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">Elemen Dashboard</span>
                  </div>
                  <p className="mb-3 text-xs text-gray-400">Sembunyikan kartu yang tidak ingin Anda lihat di dashboard.</p>
                  <div className="space-y-2">
                    {[
                      { id: 'stats', label: 'Kartu Statistik', icon: TrendingUp },
                      { id: 'aktivitas', label: 'Aktivitas Akademik Penting', icon: AlertTriangle },
                      { id: 'persetujuan', label: 'Persetujuan Dosen', icon: CheckCircle },
                      { id: 'akses-cepat', label: 'Akses & Favorit', icon: LayoutDashboard },
                    ].map((card) => (
                      <label
                        key={card.id}
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <card.icon size={16} className="text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-200">{card.label}</span>
                        </div>
                        <button
                          onClick={() => toggleDashboardCard(card.id)}
                          role="switch"
                          aria-checked={!isDashboardCardHidden(card.id)}
                          aria-label={`Tampilkan ${card.label}`}
                          className={`relative h-5 w-9 rounded-full transition-colors ${
                            isDashboardCardHidden(card.id) ? 'bg-gray-300 dark:bg-gray-600' : 'bg-primary'
                          }`}
                        >
                          <span
                            className="absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200"
                            style={{ left: isDashboardCardHidden(card.id) ? 2 : 18 }}
                          />
                        </button>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp size={18} className="text-gray-400" />
                    <span className="text-sm text-gray-700 dark:text-gray-200">Data Aktivitasku</span>
                  </div>
                  <p className="mb-3 text-xs text-gray-400">Sistem mencatat halaman yang sering Anda kunjungi untuk menyesuaikan tampilan dashboard. Data ini hanya disimpan di perangkat Anda.</p>
                  <div className="space-y-1.5">
                    {[...menuItems]
                      .sort((a, b) => (frequencies[b.route] || 0) - (frequencies[a.route] || 0))
                      .filter((item) => (frequencies[item.route] || 0) > 0)
                      .slice(0, 6)
                      .map((item) => (
                        <div key={item.label} className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700/50">
                          <span className="text-xs text-gray-600 dark:text-gray-300">{item.label}</span>
                          <span className="text-[10px] text-gray-400">{frequencies[item.route]}x diklik</span>
                        </div>
                      ))}
                    {Object.keys(frequencies).filter(k => frequencies[k] > 0).length === 0 && (
                      <p className="text-xs text-gray-400 italic">Belum ada data aktivitas. Mulai gunakan fitur-fitur di sidebar.</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg" role="img" aria-label="Bahasa">{'\u{1F310}'}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-200">Bahasa</span>
                  </div>
                  <select className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-600 outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    <option>Indonesia</option>
                    <option>English</option>
                  </select>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>}

      <ConfirmDialog
        open={!!confirmOpen}
        title="Konfirmasi Perubahan"
        description={confirmOpen?.tab === 'keamanan' ? 'Apakah Anda yakin ingin mengubah password?' : 'Apakah Anda yakin ingin menyimpan perubahan data diri?'}
        confirmText="Simpan"
        onConfirm={() => {
          const tab = confirmOpen?.tab || 'data-diri'
          setConfirmOpen(null)
          setSuccess({
            title: tab === 'keamanan' ? 'Password berhasil diubah!' : 'Data berhasil diperbarui!',
            message: tab === 'keamanan' ? 'Password akun Anda telah berhasil diperbarui.' : 'Perubahan data diri berhasil disimpan.',
            summaryItems: tab === 'keamanan'
              ? [{ label: 'Jenis', value: 'Ubah Password' }]
              : [{ label: 'Jenis', value: 'Update Biodata' }],
            nextSteps: tab === 'keamanan' ? 'Gunakan password baru Anda untuk login selanjutnya.' : 'Data diri Anda telah diperbarui di sistem.',
          })
        }}
        onCancel={() => setConfirmOpen(null)}
      />
    </div>
  )
}

function InfoField({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 dark:border-gray-700">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-primary dark:bg-blue-900/30">
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-wider text-gray-400">{label}</p>
        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{value}</p>
      </div>
    </div>
  )
}
