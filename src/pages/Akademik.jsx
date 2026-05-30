import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Calendar, Award, CheckCircle, AlertTriangle, Info, XCircle, Download, Save, DollarSign, ClipboardList } from 'lucide-react'
import { mataKuliahKRS, jadwalKuliah, daftarNilai, absensi, mahasiswa, statusKRS, pengisianKelas } from '../data/dummyData'
import ConfirmDialog from '../components/common/ConfirmDialog'
import SuccessPage from '../components/common/SuccessPage'
import Tooltip from '../components/common/Tooltip'

const tabs = [
  { id: 'krs', label: 'KRS', icon: BookOpen },
  { id: 'jadwal', label: 'Jadwal Kuliah', icon: Calendar },
  { id: 'nilai', label: 'Nilai', icon: Award },
  { id: 'absensi', label: 'Absensi', icon: CheckCircle },
  { id: 'kelas', label: 'Pengisian Kelas', icon: ClipboardList },
]

const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
const jamSlots = ['07.00', '08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00', '17.00']

const warnaMK = [
  'bg-blue-500', 'bg-emerald-500', 'bg-purple-500', 'bg-amber-500',
  'bg-rose-500', 'bg-cyan-500',
]

function getStatusBadge(persen) {
  if (persen >= 80) return { label: 'Aman', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300', icon: CheckCircle }
  if (persen >= 75) return { label: 'Perhatian', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300', icon: AlertTriangle }
  return { label: 'Bahaya', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300', icon: XCircle }
}

function getNilaiColor(nilai) {
  if (nilai.startsWith('A')) return 'bg-emerald-500'
  if (nilai.startsWith('B')) return 'bg-blue-500'
  return 'bg-amber-500'
}

function KRSContent() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(mataKuliahKRS.map(() => false))
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [success, setSuccess] = useState(null)
  const [terkunci, setTerkunci] = useState(statusKRS.krsTerkunci)

  const toggleSelected = (i) => {
    setSelected((prev) => prev.map((v, j) => (j === i ? !v : v)))
  }

  const totalSelected = mataKuliahKRS.reduce((sum, mk, i) => sum + (selected[i] ? mk.sks : 0), 0)

  const stepBayar = statusKRS.pembayaran === 'lunas'
  const stepKRS = terkunci
  const stepApproval = statusKRS.persetujuanDosen === 'disetujui'
  const stepPilihKelas = false
  const allSteps = [
    { label: 'Bayar SPP', done: stepBayar },
    { label: 'Isi KRS', done: stepKRS },
    { label: 'Persetujuan Dosen', done: stepApproval },
    { label: 'Pilih Kelas', done: stepPilihKelas },
  ]

  const stepperIndex = allSteps.findIndex((s) => !s.done)

  const handleSimpan = () => {
    setConfirmOpen(false)
    setTerkunci(true)
    setSuccess({
      title: 'Rencana Studi berhasil disimpan!',
      message: 'KRS Anda telah dikunci dan siap diproses.',
      summaryItems: mataKuliahKRS
        .filter((_, i) => selected[i])
        .map((mk) => ({ label: mk.nama, value: `${mk.sks} SKS` }))
        .concat([{ label: 'Total SKS', value: `${totalSelected} SKS` }]),
      nextSteps: 'Tunggu persetujuan dosen wali. Status persetujuan dapat dilihat di dashboard.',
    })
  }

  if (success) {
    return (
      <div className="space-y-4">
        <SuccessPage
          title={success.title}
          message={success.message}
          summaryItems={success.summaryItems}
          nextSteps={success.nextSteps}
          primaryAction={{ label: 'Kembali ke Dashboard', onClick: () => navigate('/dashboard') }}
          secondaryAction={{ label: 'Lihat Status KRS', onClick: () => setSuccess(null) }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-900/50 dark:bg-emerald-900/10">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-emerald-600" />
            <span className="text-[10px] font-medium text-emerald-700 dark:text-emerald-300">Status Pembayaran</span>
          </div>
          <p className="mt-1 font-semibold text-emerald-800 dark:text-emerald-200">
            {statusKRS.pembayaran === 'lunas' ? '✅ Lunas' : '❌ Belum'}
          </p>
        </div>
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/10">
          <div className="flex items-center gap-2">
            <Info size={16} className="text-blue-600" />
            <span className="text-[10px] font-medium text-blue-700 dark:text-blue-300">Batas SKS</span>
            <Tooltip text="Berdasarkan IPS semester lalu: 3.50" />
          </div>
          <p className="mt-1 font-semibold text-blue-800 dark:text-blue-200">{statusKRS.batasSKS} SKS</p>
        </div>
        <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 dark:border-purple-900/50 dark:bg-purple-900/10">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-purple-600" />
            <span className="text-[10px] font-medium text-purple-700 dark:text-purple-300">Persetujuan Dosen</span>
            <Tooltip text="Dosen wali: Dr. Alif Finandhita, M.T." />
          </div>
          <p className="mt-1 font-semibold text-purple-800 dark:text-purple-200">
            {statusKRS.persetujuanDosen === 'disetujui' ? '✅ Disetujui' : '⏳ Menunggu'}
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-900/50 dark:bg-amber-900/10">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-amber-600" />
            <span className="text-[10px] font-medium text-amber-700 dark:text-amber-300">Periode Pengisian</span>
            <Tooltip text="Pengisian KRS di luar periode harus melalui prosedur perubahan KRS" />
          </div>
          <p className="mt-1 font-semibold text-amber-800 dark:text-amber-200">
            {statusKRS.periodeMulai} – {statusKRS.periodeSelesai}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800"
      >
        <div className="flex items-center justify-between">
          {allSteps.map((step, i) => {
            const isActive = i === stepperIndex
            const isDone = step.done
            return (
              <div key={step.label} className="flex items-center gap-2">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  isDone
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30'
                    : isActive
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-400 dark:bg-gray-700'
                }`}>
                  {isDone ? '✓' : i + 1}
                </div>
                <span className={`text-[11px] font-medium ${
                  isDone
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : isActive
                      ? 'text-primary font-semibold'
                      : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {step.label}
                </span>
                {i < allSteps.length - 1 && (
                  <div className={`mx-1 h-px w-6 sm:w-10 ${
                    isDone ? 'bg-emerald-300' : 'bg-gray-200 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
      </motion.div>

      {!terkunci && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/10"
        >
          <p className="text-xs text-blue-700 dark:text-blue-300">
            {statusKRS.kurikulum} — Program Studi {mahasiswa.prodi}
            <Tooltip text="Kurikulum yang berlaku sesuai angkatan Anda (2023)" />
          </p>
        </motion.div>
      )}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                {!terkunci && <th scope="col" className="px-4 py-3 w-10"><span className="sr-only">Pilih</span></th>}
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">No</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Kode MK</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                  Nama Mata Kuliah
                  <Tooltip text="Mata kuliah yang tersedia untuk semester ini" />
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">
                  SKS
                  <Tooltip text="Satuan Kredit Semester. 1 SKS = 50 menit/minggu" />
                </th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Dosen</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Hari/Jam</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Ruang</th>
              </tr>
            </thead>
            <tbody>
              {mataKuliahKRS.map((mk, i) => (
                <tr key={mk.id} className={`border-b border-gray-50 transition-colors dark:border-gray-700 ${
                  !terkunci && selected[i] ? 'bg-primary/5' : 'hover:bg-gray-50/50 dark:hover:bg-gray-700/30'
                }`}>
                  {!terkunci && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected[i]}
                        onChange={() => toggleSelected(i)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </td>
                  )}
                  <td className="px-4 py-3 text-xs text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 font-mono-custom text-xs text-gray-500 dark:text-gray-400">{mk.kode}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{mk.nama}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                      {mk.sks}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-gray-600 dark:text-gray-300 md:table-cell">{mk.dosen}</td>
                  <td className="hidden px-4 py-3 text-xs text-gray-500 dark:text-gray-400 lg:table-cell">{mk.jadwal}</td>
                  <td className="hidden px-4 py-3 text-xs text-gray-500 dark:text-gray-400 lg:table-cell">{mk.ruang}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {terkunci
              ? `Total SKS = ${mataKuliahKRS.reduce((s, mk) => s + mk.sks, 0)} SKS`
              : `Total SKS Dipilih = ${totalSelected} / ${statusKRS.batasSKS} SKS`
            }
          </p>
          <div className="flex gap-2">
            {!terkunci && (
              <button
                onClick={() => setConfirmOpen(true)}
                disabled={totalSelected === 0}
                className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save size={14} />
                Simpan KRS
              </button>
            )}
            <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
              <Download size={14} />
              Unduh KRS PDF
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Konfirmasi Rencana Studi"
        description="Apakah Anda yakin ingin menyimpan rencana studi berikut?"
        items={mataKuliahKRS
          .filter((_, i) => selected[i])
          .map((mk) => ({ label: mk.nama, value: `${mk.sks} SKS` }))
          .concat([{ label: 'Total SKS', value: `${totalSelected} SKS` }])
        }
        confirmText="Simpan"
        onConfirm={handleSimpan}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  )
}

function JadwalContent() {
  const getColorForMK = (matkul) => {
    const idx = jadwalKuliah.flatMap(j => j.kuliah).findIndex(k => k.matkul === matkul)
    return warnaMK[idx % warnaMK.length]
  }

  const allMK = jadwalKuliah.flatMap(j => j.kuliah)
  const legendColors = allMK.map(k => ({
    matkul: k.matkul,
    color: getColorForMK(k.matkul),
  }))

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-center text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <th scope="col" className="w-16 px-2 py-3 font-medium text-gray-500 dark:text-gray-400">Jam</th>
                {hariList.map((hari) => (
                  <th key={hari} scope="col" className="px-2 py-3 font-medium text-gray-500 dark:text-gray-400">{hari}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jamSlots.map((jam, i) => {
                const nextJam = jamSlots[i + 1] || '18.00'
                return (
                  <tr key={jam} className="border-b border-gray-50 dark:border-gray-700">
                    <td className="px-2 py-4 font-mono-custom text-[10px] text-gray-400">{jam}</td>
                    {hariList.map((hari) => {
                      const jadwal = jadwalKuliah.find(j => j.hari === hari)
                      const kuliah = jadwal?.kuliah.find(k => {
                        const start = k.jam.split(' - ')[0]
                        return start >= jam && start < nextJam
                      })
                      return (
                        <td key={hari} className="px-1 py-1">
                          {kuliah ? (
                            <div className={`mx-auto rounded-lg ${getColorForMK(kuliah.matkul)} px-2 py-2 text-white`}>
                              <p className="text-[10px] font-semibold leading-tight">{kuliah.matkul}</p>
                              <p className="text-[8px] opacity-80">{kuliah.ruang}</p>
                            </div>
                          ) : null}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 rounded-2xl bg-white p-4 shadow-sm dark:bg-gray-800">
        <p className="w-full text-xs font-semibold text-gray-500 dark:text-gray-400">Legenda:</p>
        {legendColors.map((l, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`h-3 w-3 rounded ${l.color}`} />
            <span className="text-[10px] text-gray-600 dark:text-gray-300">{l.matkul}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function NilaiContent() {
  const [selectedSemester, setSelectedSemester] = useState('VI')
  const semesters = ['I', 'II', 'III', 'IV', 'V', 'VI']

  const filtered = daftarNilai.filter(n => n.semester === selectedSemester)
  const ipSemester = filtered.length
    ? (filtered.reduce((sum, n) => sum + n.nilaiAngka * n.sks, 0) / filtered.reduce((sum, n) => sum + n.sks, 0)).toFixed(2)
    : '0.00'
  const totalSksSemester = filtered.reduce((sum, n) => sum + n.sks, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <label htmlFor="semester" className="text-sm font-medium text-gray-600 dark:text-gray-300">Semester:</label>
        <select
          id="semester"
          value={selectedSemester}
          onChange={(e) => setSelectedSemester(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          {semesters.map((s) => (
            <option key={s} value={s}>Semester {s}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-gradient-to-r from-emerald-400 to-teal-600 p-4 text-white">
          <p className="text-xs text-white/80">IP Semester</p>
          <p className="text-2xl font-bold">{ipSemester}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white">
          <p className="text-xs text-white/80">Total SKS</p>
          <p className="text-2xl font-bold">{totalSksSemester}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white">
          <p className="text-xs text-white/80">IPK Kumulatif</p>
          <p className="text-2xl font-bold">{mahasiswa.ipk}</p>
        </div>
        <div className="rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 p-4 text-white">
          <p className="text-xs text-white/80">SKS Lulus</p>
          <p className="text-2xl font-bold">{mahasiswa.sksLulus}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Kode</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Nama Mata Kuliah</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">SKS</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Nilai Huruf</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Nilai Angka</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Bobot</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((n, i) => (
                <tr key={i} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 dark:border-gray-700 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3 font-mono-custom text-xs text-gray-500">{n.kode}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{n.matkul}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">{n.sks}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex h-7 w-10 items-center justify-center rounded-lg text-xs font-bold text-white ${getNilaiColor(n.nilaiHuruf)}`}>
                      {n.nilaiHuruf}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-gray-600 dark:text-gray-300 sm:table-cell">{n.nilaiAngka}</td>
                  <td className="hidden px-4 py-3 text-sm text-gray-600 dark:text-gray-300 sm:table-cell">{n.bobot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function AbsensiContent() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 rounded-xl bg-blue-50 p-4 dark:bg-blue-900/10">
        <Info size={16} className="text-primary" />
        <p className="text-xs text-blue-700 dark:text-blue-300">
          Minimum kehadiran: 75% dari total pertemuan
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Mata Kuliah</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Total Pertemuan</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Hadir</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Izin</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Alpha</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">% Kehadiran</th>
                <th scope="col" className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {absensi.map((a, i) => {
                const status = getStatusBadge(a.persen)
                const StatusIcon = status.icon
                return (
                  <tr key={i} className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 dark:border-gray-700 dark:hover:bg-gray-700/30">
                    <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{a.matkul}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{a.total}</td>
                    <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400">{a.hadir}</td>
                    <td className="px-4 py-3 text-amber-600 dark:text-amber-400">{a.izin}</td>
                    <td className="px-4 py-3 text-red-600 dark:text-red-400">{a.alpha}</td>
                    <td className="px-4 py-3 font-medium text-gray-700 dark:text-gray-200">{a.persen}%</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-medium ${status.color}`}>
                        <StatusIcon size={10} />
                        {status.label}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function KelasContent() {
  const [selectedKelas, setSelectedKelas] = useState({})

  const toggleKelas = (mkId, kelas) => {
    setSelectedKelas((prev) => ({
      ...prev,
      [mkId]: prev[mkId] === kelas ? null : kelas,
    }))
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-blue-50 p-4 dark:bg-blue-900/10">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          Pilih kelas untuk setiap mata kuliah yang Anda ambil semester ini.
        </p>
      </div>

      <div className="space-y-3">
        {pengisianKelas.map((mk) => (
          <div
            key={mk.id}
            className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800 dark:text-white">{mk.nama}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{mk.kode} &middot; {mk.sks} SKS</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {mk.kelasTersedia.map((kelas) => {
                const terpilih = selectedKelas[mk.id] === kelas
                return (
                  <button
                    key={kelas}
                    onClick={() => toggleKelas(mk.id, kelas)}
                    className={`rounded-xl border px-4 py-2 text-xs font-medium transition-all ${
                      terpilih
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
                    }`}
                  >
                    Kelas {kelas}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {Object.values(selectedKelas).some(Boolean) && (
        <div className="flex justify-end">
          <button className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-dark">
            <Save size={16} />
            Simpan Pilihan Kelas
          </button>
        </div>
      )}
    </div>
  )
}

export default function Akademik() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'krs')

  useEffect(() => {
    if (location.state?.tab) setActiveTab(location.state?.tab)
  }, [location.state?.tab])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Akademik</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Kelola KRS, jadwal, nilai, dan absensi
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
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-xl bg-white shadow-sm dark:bg-gray-700"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <tab.icon size={16} className="relative z-10" />
              <span className="relative z-10 hidden sm:inline">{tab.label}</span>
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
          {activeTab === 'krs' && <KRSContent />}
          {activeTab === 'jadwal' && <JadwalContent />}
          {activeTab === 'nilai' && <NilaiContent />}
          {activeTab === 'absensi' && <AbsensiContent />}
          {activeTab === 'kelas' && <KelasContent />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
