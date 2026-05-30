# Prompt Redesign: My Academic UNIKOM (my.unikom.ac.id)

## Konteks Sistem

Kamu adalah seorang UI/UX designer yang bertugas memperbaiki antarmuka sistem informasi akademik **My Academic UNIKOM** (https://my.unikom.ac.id). Sistem ini digunakan oleh mahasiswa Universitas Komputer Indonesia untuk aktivitas akademik seperti pengisian KRS, melihat jadwal kuliah, memantau nilai, kehadiran, dan pengelolaan profil.

Perbaikan yang diminta mengacu pada **4 permasalahan desain interaksi** berdasarkan prinsip **Shneiderman's Eight Golden Rules**.

---

## Kasus 1 — Struktur dan Pengelompokan Menu Kurang Konsisten

**Prinsip:** Strive for Consistency

**Permasalahan:**
Menu navigasi saat ini terdiri dari item-item yang tidak dikelompokkan berdasarkan kategori yang jelas:
- Profile
- Riwayat Nilai
- Jadwal Kuliah (submenu: Jadwal Prodi, Jadwal Anda)
- Pengisian Rencana Studi
- Pengisian Kelas
- Kehadiran Perkuliahan
- Kuesioner (submenu: Evaluasi, Pelayanan, Visi-Misi)
- Syarat Wisuda

Pengguna baru kesulitan menemukan fitur karena tidak ada pola pengelompokan yang konsisten.

**Yang harus dilakukan:**
- Kelompokkan menu ke dalam kategori utama berikut:
  - **Akademik** → Riwayat Nilai, Jadwal Kuliah, Pengisian KRS, Pengisian Kelas, Kehadiran
  - **Keuangan** → Informasi pembayaran (jika tersedia)
  - **Profil & Akun** → Profile, Ganti Password, Akun & Kontak
  - **Layanan** → Kuesioner, Syarat Wisuda
- Gunakan penamaan menu yang konsisten di seluruh halaman
- Tambahkan ikon yang seragam untuk setiap item menu
- Terapkan breadcrumb navigation di setiap halaman agar pengguna tahu posisi mereka

**Contoh struktur menu yang diharapkan:**
```
▼ Akademik
    - Jadwal Kuliah
    - Rencana Studi (KRS)
    - Pengisian Kelas
    - Riwayat Nilai
    - Kehadiran

▼ Profil & Akun
    - Data Akademik
    - Biodata
    - Akun & Kontak
    - Ganti Password

▼ Layanan
    - Kuesioner
    - Syarat Wisuda
```

---

## Kasus 2 — Tidak Ada Fitur Akses Cepat untuk Aktivitas yang Sering Digunakan

**Prinsip:** Enable Frequent Users to Use Shortcuts

**Permasalahan:**
Mahasiswa yang sudah terbiasa menggunakan sistem tetap harus menavigasi menu yang sama berulang kali untuk mengakses fitur rutin seperti KRS, jadwal, nilai, dan kehadiran. Tidak tersedia shortcut, favorit, atau quick access.

**Yang harus dilakukan:**
- Tambahkan **panel Quick Access** di halaman utama (dashboard) yang berisi tombol langsung ke:
  - Pengisian KRS
  - Jadwal Kuliah Saya
  - Riwayat Nilai
  - Kehadiran Perkuliahan
- Tambahkan fitur **"Tandai sebagai Favorit"** pada setiap menu agar pengguna bisa menyematkan fitur yang sering digunakan
- Tampilkan **"Fitur yang Sering Digunakan"** secara otomatis berdasarkan histori akses pengguna
- Sediakan **shortcut keyboard** untuk navigasi cepat (opsional untuk power user)

**Contoh tampilan dashboard yang diharapkan:**
```
+--------------------------------------------------+
|  Selamat datang, [Nama Mahasiswa]                |
|                                                  |
|  ⚡ Akses Cepat                                  |
|  [ KRS ]  [ Jadwal ]  [ Nilai ]  [ Kehadiran ]   |
|                                                  |
|  📌 Favorit Saya                                 |
|  [ Riwayat Nilai ]  [ Jadwal Kuliah Saya ]       |
+--------------------------------------------------+
```

---

## Kasus 3 — Pengguna Harus Mengingat Banyak Informasi Saat Menggunakan Sistem

**Prinsip:** Reduce Short-Term Memory Load

**Permasalahan:**
Proses pengisian KRS mengharuskan mahasiswa mengingat banyak informasi sekaligus:
- Jadwal pengisian KRS (tanggal buka/tutup)
- Status pembayaran
- Batas maksimum SKS berdasarkan IPS lalu
- Status persetujuan dosen wali
- Kurikulum yang berlaku
- Tahapan setelah KRS (pengisian kelas)

Informasi ini tidak ditampilkan secara terpusat, sehingga beban kognitif pengguna meningkat.

**Yang harus dilakukan:**
- Tampilkan **ringkasan informasi penting** di bagian atas halaman KRS dalam satu panel, meliputi:
  - Status pembayaran (✅ Lunas / ❌ Belum)
  - Batas SKS yang boleh diambil
  - Status persetujuan dosen wali
  - Periode pengisian KRS (tanggal mulai – selesai)
- Tambahkan **indikator progres (progress bar/stepper)** yang menunjukkan alur:
  ```
  [1. Bayar SPP] → [2. Isi KRS] → [3. Persetujuan Dosen] → [4. Pilih Kelas]
  ```
- Sediakan **wizard/panduan langkah demi langkah** untuk pengguna baru
- Tambahkan **tooltip** atau ikon "?" pada setiap field yang membutuhkan penjelasan tambahan
- Tampilkan informasi kurikulum yang berlaku secara otomatis sesuai angkatan mahasiswa

---

## Kasus 4 — Tidak Ada Konfirmasi yang Jelas Setelah Menyelesaikan Proses Penting

**Prinsip:** Design Dialogs to Yield Closure

**Permasalahan:**
Setelah mahasiswa menyimpan KRS atau memilih kelas, sistem tidak memberikan konfirmasi yang memadai secara langsung di halaman. Saat ini konfirmasi hanya dikirim melalui email, sehingga pengguna tidak segera tahu apakah proses berhasil atau tidak.

**Yang harus dilakukan:**
- Tampilkan **dialog konfirmasi** sebelum data disimpan, berisi ringkasan pilihan yang akan disimpan:
  ```
  Apakah Anda yakin ingin menyimpan rencana studi berikut?
  - Matematika Diskrit (3 SKS)
  - Basis Data I (3 SKS)
  - Pemrograman Berbasis OO (4 SKS)
  Total: 10 SKS
  [ Batal ]  [ Simpan ]
  ```
- Setelah berhasil disimpan, tampilkan **halaman/notifikasi sukses** yang jelas di dalam sistem (bukan hanya via email), berisi:
  - Status: "Rencana Studi berhasil disimpan ✅"
  - Ringkasan mata kuliah yang dipilih
  - Langkah selanjutnya yang harus dilakukan (misal: "Tunggu persetujuan dosen wali")
- Tampilkan **status real-time** persetujuan dosen wali langsung di dashboard tanpa harus masuk ke menu tertentu
- Sediakan tombol navigasi jelas setelah proses selesai: `[ Kembali ke Dashboard ]` atau `[ Lihat Status KRS ]`

---

## Catatan Tambahan untuk Developer/Designer

- Semua perubahan harus tetap **responsif** (mobile-friendly)
- Pertahankan struktur data dan alur backend yang sudah ada; perubahan ini bersifat **UI/UX layer**
- Prioritas implementasi disarankan: **Kasus 4 → Kasus 3 → Kasus 1 → Kasus 2**
- Lakukan **usability testing** dengan minimal 5 mahasiswa setelah perubahan diterapkan

---

*Dokumen ini dibuat berdasarkan analisis Eight Golden Rules of Interface Design (Shneiderman) terhadap sistem My Academic UNIKOM.*