export const mahasiswa = {
  nama: 'Muhammad Rizki',
  nim: '10123030',
  jurusan: 'Teknik Informatika',
  fakultas: 'Teknik dan Ilmu Komputer',
  prodi: 'Teknik Informatika',
  angkatan: 2023,
  semester: 'VI',
  ipk: 3.42,
  sksLulus: 87,
  sksAktif: 16,
  kehadiran: 89,
  status: 'Aktif',
  email: '10123030@mahasiswa.unikom.ac.id',
  noHp: '0812-3456-7890',
  tempatLahir: 'Bandung',
  tanggalLahir: '15 Mei 2005',
  alamat: 'Jl. Dipati Ukur No. 114, Bandung',
  pembimbing: 'Dr. Alif Finandhita, S.Kom., M.T.',
  photo: null,
  device: {
    id: 'DEV-A1B2C3D4',
    name: 'Xiaomi Redmi Note 13',
    os: 'Android 14',
    isTrusted: true,
    lastLogin: '2026-05-30 08:15:00',
  },
}

export const mataKuliahKRS = [
  { id: 1, kode: 'IF601', nama: 'Desain Interaksi Perangkat Lunak', sks: 3, dosen: 'Alif Finandhita, M.T.', jadwal: 'Senin 07.30', ruang: 'A301', selected: false },
  { id: 2, kode: 'IF602', nama: 'Pemrograman Web', sks: 3, dosen: 'Budi Hartono, M.Kom', jadwal: 'Senin 09.30', ruang: 'Lab C102', selected: false },
  { id: 3, kode: 'IF603', nama: 'Basis Data Lanjut', sks: 3, dosen: 'Sari Dewi, M.T.', jadwal: 'Selasa 13.00', ruang: 'B205', selected: false },
  { id: 4, kode: 'IF604', nama: 'Sistem Informasi', sks: 3, dosen: 'Rizky Pratama, M.Kom', jadwal: 'Selasa 15.00', ruang: 'A302', selected: false },
  { id: 5, kode: 'IF605', nama: 'Jaringan Komputer', sks: 2, dosen: 'Ahmad Fauzi, M.T.', jadwal: 'Rabu 08.00', ruang: 'Lab D201', selected: false },
  { id: 6, kode: 'IF606', nama: 'Kewirausahaan', sks: 2, dosen: 'Dewi Rahmawati, M.M.', jadwal: 'Kamis 10.00', ruang: 'B101', selected: false },
]

export const daftarNilai = [
  { kode: 'IF601', matkul: 'Desain Interaksi Perangkat Lunak', sks: 3, nilaiHuruf: 'A', nilaiAngka: 4.0, bobot: 12.0, semester: 'VI' },
  { kode: 'IF502', matkul: 'Rekayasa Perangkat Lunak', sks: 3, nilaiHuruf: 'B+', nilaiAngka: 3.5, bobot: 10.5, semester: 'V' },
  { kode: 'IF503', matkul: 'Pemrograman Mobile', sks: 3, nilaiHuruf: 'A-', nilaiAngka: 3.7, bobot: 11.1, semester: 'V' },
  { kode: 'IF504', matkul: 'Manajemen Proyek IT', sks: 2, nilaiHuruf: 'B', nilaiAngka: 3.0, bobot: 6.0, semester: 'V' },
  { kode: 'IF505', matkul: 'Statistika', sks: 2, nilaiHuruf: 'B+', nilaiAngka: 3.5, bobot: 7.0, semester: 'V' },
]

export const jadwalKuliah = [
  { hari: 'Senin', kuliah: [
    { jam: '07.30 - 09.10', matkul: 'Desain Interaksi Perangkat Lunak', ruang: 'A301', dosen: 'Alif Finandhita, M.T.' },
    { jam: '09.30 - 11.10', matkul: 'Pemrograman Web', ruang: 'Lab C102', dosen: 'Budi Hartono, M.Kom' },
  ]},
  { hari: 'Selasa', kuliah: [
    { jam: '13.00 - 14.40', matkul: 'Basis Data Lanjut', ruang: 'B205', dosen: 'Sari Dewi, M.T.' },
    { jam: '15.00 - 16.40', matkul: 'Sistem Informasi', ruang: 'A302', dosen: 'Rizky Pratama, M.Kom' },
  ]},
  { hari: 'Rabu', kuliah: [
    { jam: '08.00 - 09.40', matkul: 'Jaringan Komputer', ruang: 'Lab D201', dosen: 'Ahmad Fauzi, M.T.' },
  ]},
  { hari: 'Kamis', kuliah: [
    { jam: '10.00 - 11.40', matkul: 'Kewirausahaan', ruang: 'B101', dosen: 'Dewi Rahmawati, M.M.' },
  ]},
  { hari: 'Jumat', kuliah: [] },
  { hari: 'Sabtu', kuliah: [] },
]

export const absensi = [
  { matkul: 'Desain Interaksi Perangkat Lunak', total: 14, hadir: 13, izin: 1, alpha: 0, persen: 92 },
  { matkul: 'Pemrograman Web', total: 14, hadir: 12, izin: 0, alpha: 2, persen: 86 },
  { matkul: 'Basis Data Lanjut', total: 14, hadir: 11, izin: 1, alpha: 2, persen: 79 },
]

export const pembayaran = [
  { id: 1, tanggal: '05 Mar 2026', keterangan: 'SPP Semester VI (Cicilan 1)', jumlah: 3500000, status: 'Lunas' },
  { id: 2, tanggal: '10 Jan 2026', keterangan: 'SPP Semester V', jumlah: 3500000, status: 'Lunas' },
  { id: 3, tanggal: '15 Aug 2025', keterangan: 'SPP Semester IV', jumlah: 3500000, status: 'Lunas' },
]

export const layananList = [
  { id: 1, icon: '📄', judul: 'Surat Keterangan Aktif', deskripsi: 'Surat bukti status mahasiswa aktif' },
  { id: 2, icon: '🎓', judul: 'Surat Keterangan Lulus', deskripsi: 'Untuk keperluan pendaftaran kerja' },
  { id: 3, icon: '📋', judul: 'Transkrip Nilai', deskripsi: 'Rekap nilai seluruh semester' },
  { id: 4, icon: '🏥', judul: 'Surat Rekomendasi Beasiswa', deskripsi: 'Untuk pengajuan beasiswa' },
  { id: 5, icon: '✈️', judul: 'Izin Tidak Hadir', deskripsi: 'Pengajuan izin ketidakhadiran resmi' },
  { id: 6, icon: '📝', judul: 'Pengajuan Cuti', deskripsi: 'Permohonan cuti akademik' },
]

export const riwayatLayanan = [
  { id: 1, jenis: 'Surat Keterangan Aktif', tanggal: '20 Mei 2026', status: 'Selesai' },
  { id: 2, jenis: 'Transkrip Nilai', tanggal: '01 Apr 2026', status: 'Selesai' },
  { id: 3, jenis: 'Izin Tidak Hadir', tanggal: '15 Mar 2026', status: 'Selesai' },
]

export const aktivitasTerbaru = [
  { id: 1, teks: 'Anda berhasil melihat nilai UTS', waktu: '2 jam lalu' },
  { id: 2, teks: 'Perubahan jadwal diterima oleh sistem', waktu: '1 hari lalu' },
  { id: 3, teks: 'KRS semester VI berhasil dikunci', waktu: '3 hari lalu' },
  { id: 4, teks: 'Pembayaran SPP berhasil dikonfirmasi', waktu: '5 hari lalu' },
  { id: 5, teks: 'Pengajuan surat keterangan dikirim', waktu: '1 minggu lalu' },
]

export const notifikasi = [
  { id: 1, judul: 'Batas waktu pengisian KRS: 5 Juni 2026', pesan: 'Segera isi KRS Anda sebelum batas akhir.', waktu: '2 jam lalu', dibaca: false, warna: 'kuning' },
  { id: 2, judul: 'Tagihan SPP bulan Juni belum dibayar', pesan: 'Segera lakukan pembayaran SPP.', waktu: '1 hari lalu', dibaca: false, warna: 'merah' },
  { id: 3, judul: 'Nilai UTS Mata Kuliah DIPL telah dirilis', pesan: 'Nilai UTS dapat dilihat di menu akademik.', waktu: '3 hari lalu', dibaca: false, warna: 'hijau' },
  { id: 4, judul: 'Jadwal kuliah Selasa diubah ke Ruang B204', pesan: 'Perhatikan perubahan jadwal terbaru.', waktu: '5 hari lalu', dibaca: true, warna: 'biru' },
  { id: 5, judul: 'Pengajuan surat keterangan aktif telah selesai', pesan: 'Silakan unduh surat di menu layanan.', waktu: '1 minggu lalu', dibaca: true, warna: 'hijau' },
]

export const chatbotResponses = {
  'Cara isi KRS': 'Pengisian KRS dapat dilakukan melalui menu Akademik → KRS. Pastikan Anda mengisinya sebelum batas waktu yang tertera di banner notifikasi. Jika KRS sudah terkunci, artinya pengisian sudah berhasil disimpan.',
  'Jadwal pembayaran': 'Status tagihan aktif dan riwayat pembayaran dapat dilihat di menu Keuangan. Untuk pembayaran, silakan hubungi bagian keuangan atau gunakan kanal pembayaran resmi kampus.',
  'Jadwal kuliah': 'Jadwal kuliah lengkap tersedia di menu Akademik → Jadwal Kuliah. Anda dapat melihatnya dalam tampilan kalender mingguan. Notifikasi perubahan jadwal akan dikirimkan secara otomatis.',
  'Lihat nilai': 'Nilai dapat dilihat di menu Akademik → Nilai. Pilih semester yang ingin Anda lihat dari dropdown. Nilai dirilis setelah dosen melakukan input dan divalidasi oleh BAA.',
  'Hubungi admin': 'Untuk menghubungi admin, silakan datang ke Bagian Administrasi Akademik (BAA) atau kirim email ke admin@unikom.ac.id. Jam layanan: Senin-Jumat, 08.00-16.00.',
}

export const aktivitasPenting = [
  { id: 1, label: 'Pengisian KRS', detail: 'Batas: 5 Juni 2026', warna: 'kuning' },
  { id: 2, label: 'Tagihan SPP', detail: 'Rp 3.500.000 belum dibayar', warna: 'merah' },
  { id: 3, label: 'UTS Genap 2025/2026', detail: '15 Maret 2026', warna: 'biru' },
  { id: 4, label: 'Nilai DIPL', detail: 'Telah dirilis', warna: 'hijau' },
]

export const statusKRS = {
  krsTerkunci: false,
  pembayaran: 'lunas',
  batasSKS: 24,
  ipsTerakhir: 3.5,
  persetujuanDosen: 'disetujui',
  periodeMulai: '12 Mei 2026',
  periodeSelesai: '5 Juni 2026',
  kurikulum: 'Kurikulum 2023',
}

export const persetujuanDosen = {
  status: 'disetujui',
  dosen: 'Dr. Alif Finandhita, S.Kom., M.T.',
  tanggal: '2 Juni 2026',
  catatan: 'Rencana studi sudah sesuai dengan kurikulum dan IPK Anda.',
}

export const kuesionerList = [
  { id: 1, judul: 'Evaluasi Dosen Semester VI', status: 'Belum diisi', tenggat: '10 Juni 2026' },
  { id: 2, judul: 'Survey Pelayanan Akademik', status: 'Sudah diisi', tenggat: '-' },
  { id: 3, judul: 'Survey Visi-Misi Prodi', status: 'Belum diisi', tenggat: '15 Juni 2026' },
]

export const syaratWisuda = [
  { item: 'IPK Minimal 2.00', status: '✅ Terpenuhi', nilai: '3.42' },
  { item: 'Bebas SPP', status: '✅ Lunas', nilai: '-' },
  { item: 'SKTA (Surat Keterangan Lulus)', status: '⏳ Proses', nilai: '-' },
  { item: 'Bimbingan Skripsi', status: '⏳ Semester Depan', nilai: '-' },
  { item: 'Publikasi Ilmiah', status: '❌ Belum', nilai: '-' },
]

export const pengisianKelas = [
  { id: 1, nama: 'Desain Interaksi Perangkat Lunak', kode: 'IF601', kelasTersedia: ['A', 'B', 'C'], sks: 3 },
  { id: 2, nama: 'Pemrograman Web', kode: 'IF602', kelasTersedia: ['A', 'B'], sks: 3 },
]

export const jadwalHariIni = [
  { waktu: '07.30 – 09.10', matkul: 'Desain Interaksi Perangkat Lunak', ruang: 'A301', status: 'Hadir' },
  { waktu: '09.30 – 11.10', matkul: 'Pemrograman Web', ruang: 'Lab C102', status: 'Hadir' },
  { waktu: '13.00 – 14.40', matkul: 'Basis Data Lanjut', ruang: 'B205', status: 'Akan datang' },
  { waktu: '15.00 – 16.40', matkul: 'Sistem Informasi', ruang: 'A302', status: 'Akan datang' },
]
