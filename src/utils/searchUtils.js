import { mahasiswa, statusKRS, pembayaran, jadwalHariIni, jadwalKuliah, absensi, persetujuanDosen, pengisianKelas } from '../data/dummyData'

const synonymMap = {
  krs: ['isi krs', 'rencana studi', 'kartu rencana studi', 'pilih mata kuliah', 'kartu studi', 'krs online', 'mata kuliah semester'],
  jadwal: ['jadwal kuliah', 'jadwal prodi', 'jam kuliah', 'mata kuliah hari ini'],
  nilai: ['lihat nilai', 'nilai ujian', 'nilai uts', 'nilai uas', 'nilai akhir', 'ipk', 'ips', 'transkrip'],
  absensi: ['presensi', 'kehadiran', 'hadir', 'absen'],
  tagihan: ['bayar', 'pembayaran', 'spp', 'biaya kuliah', 'uang kuliah', 'tagihan spp'],
  riwayat: ['riwayat pembayaran', 'history bayar', 'histori', 'pembayaran sebelumnya'],
  kuesioner: ['survey', 'evaluasi', 'angket', 'kuisioner'],
  wisuda: ['syarat wisuda', 'kelulusan', 'skta', 'sidang', 'skripsi', 'tugas akhir'],
  layanan: ['surat', 'surat keterangan', 'pengajuan', 'izin', 'cuti', 'beasiswa'],
  profil: ['biodata', 'data diri', 'data pribadi', 'akun'],
  password: ['ganti password', 'ubah password', 'reset password', 'keamanan'],
  tampilan: ['theme', 'tema', 'mode gelap', 'dark mode', 'ukuran teks', 'bahasa'],
  bantuan: ['help', 'faq', 'tanya', 'petunjuk', 'panduan', 'pertanyaan umum', 'chatbot'],
  dashboard: ['beranda', 'home', 'utama', 'halaman utama'],
  kelas: ['pengisian kelas', 'pilih kelas', 'kelas perkuliahan'],
}

const synonymToLabels = {
  krs: ['KRS'],
  jadwal: ['Jadwal Kuliah'],
  nilai: ['Nilai'],
  absensi: ['Absensi'],
  tagihan: ['Tagihan'],
  riwayat: ['Riwayat Pembayaran'],
  kuesioner: ['Kuesioner'],
  wisuda: ['Syarat Wisuda'],
  layanan: ['Layanan/Surat'],
  profil: ['Profil'],
  password: ['Akun & Kontak'],
  tampilan: ['Tampilan'],
  bantuan: ['Bantuan'],
  dashboard: ['Dashboard'],
  kelas: ['Pengisian Kelas'],
}

const contextProviders = {
  'KRS': () => {
    const k = statusKRS
    const bayar = k.pembayaran === 'lunas' ? 'Lunas' : 'Belum'
    const dosen = persetujuanDosen.status === 'disetujui' ? 'Disetujui' : 'Menunggu'
    return `${bayar} | Maks ${k.batasSKS} SKS | Dosen: ${dosen} | ${k.periodeMulai} \u2013 ${k.periodeSelesai}`
  },
  'Nilai': () => `IPK ${mahasiswa.ipk} | Semester ${mahasiswa.semester} | ${mahasiswa.sksLulus} SKS lulus`,
  'Tagihan': () => {
    const total = pembayaran.reduce((a, b) => a + b.jumlah, 0)
    return `Total dibayar Rp ${total.toLocaleString('id-ID')} | ${pembayaran.length}x pembayaran`
  },
  'Dashboard': () => `${jadwalHariIni.length} jadwal hari ini | Kehadiran ${mahasiswa.kehadiran}% | IPK ${mahasiswa.ipk}`,
  'Absensi': () => {
    const avg = absensi.length > 0 ? Math.round(absensi.reduce((a, b) => a + b.persen, 0) / absensi.length) : 0
    return `${avg}% rata-rata | ${absensi.length} mata kuliah`
  },
  'Jadwal Kuliah': () => {
    const total = jadwalKuliah.reduce((a, h) => a + h.kuliah.length, 0)
    return `${total} pertemuan/minggu | ${jadwalKuliah.filter((h) => h.kuliah.length > 0).length} hari aktif`
  },
  'Riwayat Pembayaran': () => `${pembayaran.length} transaksi | Terakhir: ${pembayaran[0]?.tanggal}`,
  'Pengisian Kelas': () => `${pengisianKelas ? pengisianKelas.length : 0} mata kuliah tersedia`,
}

export function searchWithContext(query, items) {
  if (!query.trim()) return []

  const q = query.toLowerCase().trim()
  const tokens = q.split(/\s+/).filter((t) => t.length > 1)
  const matchedLabels = new Set()

  items.forEach((item) => {
    if (item.label.toLowerCase().includes(q)) {
      matchedLabels.add(item.label)
    }
  })

  Object.entries(synonymMap).forEach(([key, syns]) => {
    const fullMatch = syns.some((syn) => syn.includes(q))
    const tokenMatch = tokens.length > 0 && tokens.some((t) => syns.some((syn) => syn.includes(t)))
    if (fullMatch || tokenMatch) {
      ;(synonymToLabels[key] || []).forEach((label) => matchedLabels.add(label))
    }
  })

  tokens.forEach((t) => {
    items.forEach((item) => {
      if (item.label.toLowerCase().includes(t)) {
        matchedLabels.add(item.label)
      }
    })
  })

  return items
    .filter((item) => matchedLabels.has(item.label))
    .map((item) => ({
      ...item,
      context: contextProviders[item.label]?.() || null,
    }))
}
