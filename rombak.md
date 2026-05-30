# Prompt: Prototype Redesign My Academic UNIKOM

## Konteks Proyek

Buat **React single-page application (SPA)** tanpa database sebagai **prototype interaktif** redesign sistem akademik My Academic UNIKOM. Seluruh data bersifat statis/hardcoded. Aplikasi harus bisa di-deploy langsung ke **GitHub Pages** menggunakan `gh-pages` atau output folder `dist/` dari Vite. Tidak boleh ada backend, tidak ada API eksternal, tidak ada autentikasi nyata.

---

## Tech Stack

- **React 19** dengan **Vite** sebagai build tool
- **React Router v7** untuk navigasi antar halaman (HashRouter agar kompatibel dengan GitHub Pages)
- **Tailwind CSS** untuk styling utility-first
- **Lucide React** untuk ikon
- **Framer Motion** untuk animasi transisi halaman dan micro-interaction
- Tidak boleh pakai Redux — cukup `useState` dan `useContext`
- Tidak boleh pakai database apapun

---

## Struktur Halaman (Routes)

Buat 7 halaman utama yang dapat diakses melalui navigasi:

| Route | Halaman | Keterangan |
|---|---|---|
| `/` atau `/#/` | Login | Halaman masuk sistem |
| `/#/dashboard` | Dashboard | Halaman utama setelah login |
| `/#/akademik` | Akademik | KRS, Jadwal, Nilai, Absensi |
| `/#/keuangan` | Keuangan | Tagihan dan Riwayat Pembayaran |
| `/#/layanan` | Layanan | Surat Keterangan, Pengajuan |
| `/#/profil` | Profil | Data Mahasiswa, Pengaturan |
| `/#/bantuan` | Bantuan / Chatbot | Help Center + Chatbot simulasi |

---

## Desain Visual

### Palet Warna

```
Primary    : #1D4ED8  (biru UNIKOM — kepercayaan, akademis)
Primary Dark: #1E3A8A
Accent     : #F59E0B  (kuning emas — sorotan, CTA)
Success    : #10B981  (hijau — konfirmasi, keberhasilan)
Danger     : #EF4444  (merah — peringatan, error)
Neutral 50 : #F8FAFC  (background utama)
Neutral 100: #F1F5F9  (background card)
Neutral 200: #E2E8F0  (border)
Neutral 600: #475569  (teks sekunder)
Neutral 900: #0F172A  (teks utama)
Dark Mode BG: #0F172A
Dark Mode Surface: #1E293B
Dark Mode Border: #334155
```

### Tipografi

```
Font utama   : 'Plus Jakarta Sans' (Google Fonts) — modern, bersih, akademis
Font mono    : 'JetBrains Mono' — untuk kode, NIM, angka data
Ukuran dasar : 14px body, 16px input, 24–32px heading halaman
Line height  : 1.6 untuk body, 1.2 untuk heading
```

### Tone Desain

Clean dan profesional dengan sentuhan modern. Bukan korporat kaku, bukan juga terlalu playful. Bayangkan versi yang lebih segar dari sistem akademik kampus: kartu-kartu bersih dengan shadow lembut, ikon yang bermakna, warna biru sebagai anchor kepercayaan, dan aksen kuning emas untuk elemen yang perlu perhatian pengguna. Semua corner radius konsisten di 8px (kartu) dan 6px (tombol/input).

---

## Komponen Global (Wajib Ada)

### 1. Sidebar Navigasi

- Posisi: fixed di sisi kiri, lebar 240px di desktop
- Tampilkan logo "MyAcademic" dengan ikon buku kecil di atasnya
- Di bawah logo: nama mahasiswa dan NIM dengan avatar bulat berisi inisial
- Menu navigasi dikelompokkan dengan label kategori:
  - **MENU UTAMA**: Dashboard
  - **AKADEMIK & KEUANGAN**: Akademik, Keuangan, Layanan
  - **AKUN**: Profil, Bantuan
- Setiap item menu: ikon (Lucide) + label teks + active indicator berupa bar biru di sisi kiri
- Hover state: background biru sangat muda (`#EFF6FF`) dengan teks biru
- Di paling bawah sidebar: tombol **Keluar** dengan ikon `LogOut`
- Di mobile: sidebar disembunyikan, diganti hamburger menu yang membuka drawer dari kiri

### 2. Header Atas (Top Bar)

- Posisi: fixed di atas area konten (bukan di atas sidebar)
- Kiri: judul halaman aktif (dinamis sesuai route)
- Tengah/Kanan: global search bar dengan placeholder "Cari menu, fitur, informasi..."
- Kanan: ikon notifikasi dengan badge angka merah, toggle dark mode (ikon matahari/bulan), avatar mahasiswa

### 3. Global Search Bar

- Saat diklik/diketik, muncul dropdown hasil pencarian yang menampilkan menu relevan
- Data pencarian hardcoded: array berisi `{ label, route, icon, kategori }`
- Contoh: ketik "KRS" → muncul hasil "Pengisian KRS" di kategori Akademik
- Ketik "bayar" → muncul "Tagihan & Pembayaran" di kategori Keuangan
- Navigasi dengan klik item langsung berpindah ke halaman yang sesuai

### 4. Chatbot Widget

- Tombol chat mengambang (Floating Action Button) di pojok kanan bawah semua halaman
- Ikon `MessageCircle` warna putih di atas latar biru
- Klik membuka panel chat slide-up dengan tinggi 420px
- Header panel: "Asisten Akademik 🎓" + tombol close
- Tampilkan 3–4 pertanyaan cepat (quick reply chips) di awal:
  - "Cara isi KRS?"
  - "Jadwal pembayaran?"
  - "Lihat nilai saya"
  - "Hubungi admin"
- Simulasi respons: setiap pertanyaan quick reply memiliki jawaban statis yang sudah di-mapping
- Input teks bebas: tampilkan pesan "Maaf, saya belum memahami pertanyaan tersebut. Silakan pilih salah satu topik bantuan di atas."
- Animasi gelembung chat muncul dengan delay 600ms untuk mensimulasikan "typing"

### 5. Notifikasi Panel

- Klik ikon bel di header membuka dropdown notifikasi
- Tampilkan 4–5 notifikasi hardcoded:
  - "Batas waktu pengisian KRS: 5 Juni 2026" (warna aksen kuning)
  - "Tagihan SPP bulan Juni belum dibayar" (warna merah)
  - "Nilai UTS Mata Kuliah DIPL telah dirilis" (warna hijau)
  - "Jadwal kuliah Selasa diubah ke Ruang B204" (warna biru)
  - "Pengajuan surat keterangan aktif telah selesai" (warna hijau)
- Setiap notifikasi: ikon warna sesuai + teks + waktu relatif ("2 jam lalu")

### 6. Dark Mode Toggle

- Simpan preferensi di `localStorage`
- Gunakan Tailwind `dark:` variants
- Transisi warna smooth 200ms di semua elemen saat toggle

---

## Halaman 1: Login

### Layout
- Halaman penuh tanpa sidebar, tanpa header
- Split dua kolom: kiri 55% panel dekoratif, kanan 45% form login
- Di mobile: hanya tampilkan panel form

### Panel Kiri (Dekoratif)
- Background gradient: `from-blue-800 to-blue-600`
- Tampilkan logo besar "UNIKOM" dan tagline "Universitas Komputer Indonesia"
- Di bawah: 3 kartu kecil berjajar yang menampilkan fitur unggulan:
  - 🎓 "Akademik Terintegrasi"
  - 🔒 "Data Aman & Terenkripsi"
  - 📱 "Responsif di Semua Perangkat"
- Ilustrasi sederhana menggunakan SVG inline (gambar buku, laptop, atau kampus abstrak)

### Panel Kanan (Form)
- Judul: "Selamat Datang" (besar) + "Masuk ke My Academic UNIKOM" (kecil)
- Input NIM: label "NIM", placeholder "Contoh: 10123030", ikon `User` di dalam input
- Input Password: label "Password", placeholder "Masukkan password", ikon `Lock`, tombol show/hide password
- Tombol **Masuk** full-width, warna primary biru, dengan loading spinner saat diklik
- Simulasi login: NIM apapun + password apapun → setelah 1.2 detik langsung redirect ke dashboard
- Di bawah tombol: teks kecil "Lupa password? Hubungi BAA" (tidak perlu fungsional)
- Onboarding notice kecil di bawah: "Pengguna baru? Sistem akan memandumu saat pertama masuk."

---

## Halaman 2: Dashboard

### Layout
- Area utama 3 kolom di desktop, 1 kolom di mobile
- Bagian atas: greeting banner

### Greeting Banner
- "Selamat datang, Budi Santoso 👋" dengan sub-teks tanggal hari ini
- Teks dinamis berdasarkan waktu: Pagi (06–11), Siang (11–15), Sore (15–18), Malam (18–06)
- Background kartu: gradient biru lembut dengan ilustrasi SVG sederhana

### Onboarding Tooltip (Simulasi)
- Muncul sekali saat pertama masuk (cek flag di `localStorage`)
- Spotlight/highlight pada komponen Quick Access dengan tooltip "Mulai dari sini! Akses fitur utama dengan cepat."
- Tombol "Mengerti, lanjutkan" untuk menutup dan menyimpan flag

### Kartu Status Akademik (4 kartu statistik)
Tampilkan dalam grid 2x2 (mobile) atau 4 kolom (desktop):

| Kartu | Nilai | Ikon | Warna Aksen |
|---|---|---|---|
| SKS Ditempuh | 87 SKS | `GraduationCap` | Biru |
| IPK Kumulatif | 3.42 | `TrendingUp` | Hijau |
| Semester Aktif | VI | `Calendar` | Kuning |
| Kehadiran Rata-rata | 89% | `CheckCircle` | Hijau |

Setiap kartu: angka besar di tengah, label di bawah, ikon kecil di kanan atas, thin colored top-border.

### Quick Access Panel
- Grid 6 ikon besar (3x2):
  - 📋 Isi KRS → route akademik
  - 📅 Jadwal Kuliah → route akademik
  - 📊 Lihat Nilai → route akademik
  - 💳 Bayar Tagihan → route keuangan
  - 📄 Buat Surat → route layanan
  - 🤖 Tanya Chatbot → buka chatbot widget
- Setiap item: ikon besar di atas + label teks di bawah + warna background berbeda-beda pastel

### Jadwal Kuliah Hari Ini
- Kartu list dengan timeline vertikal
- Data hardcoded 3–4 mata kuliah:
  - 07.30 – 09.10 | Desain Interaksi Perangkat Lunak | Ruang A301 | Hadir ✓
  - 09.30 – 11.10 | Pemrograman Web | Ruang Lab C102 | Hadir ✓
  - 13.00 – 14.40 | Basis Data Lanjut | Ruang B205 | Akan datang
  - 15.00 – 16.40 | Sistem Informasi | Ruang A302 | Akan datang
- Setiap item: waktu | nama MK | ruang | badge status (Selesai/Sedang Berlangsung/Akan Datang)

### Banner Peringatan (Jika Ada Deadline)
- Kartu berwarna kuning/orange di atas konten utama jika ada tenggat:
  - "⚠️ Pengisian KRS ditutup dalam 3 hari. Klik di sini untuk mengisi sekarang."
- Bisa ditutup dengan tombol X

### Riwayat Aktivitas Terbaru
- List 5 item aktivitas terakhir:
  - "Anda berhasil melihat nilai UTS" — 2 jam lalu
  - "Perubahan jadwal diterima oleh sistem" — 1 hari lalu
  - "KRS semester VI berhasil dikunci" — 3 hari lalu
  - "Pembayaran SPP berhasil dikonfirmasi" — 5 hari lalu
  - "Pengajuan surat keterangan dikirim" — 1 minggu lalu

---

## Halaman 3: Akademik

### Layout
- Tab navigation horizontal di atas: **KRS**, **Jadwal Kuliah**, **Nilai**, **Absensi**
- Konten di bawah berganti sesuai tab yang dipilih (gunakan state, bukan route baru)

### Tab 1: KRS (Kartu Rencana Studi)
- Banner status KRS: "Status KRS Anda: TERKUNCI ✓" dalam kartu hijau
- Tabel daftar mata kuliah yang diambil semester ini (6 MK):

| No | Kode MK | Nama Mata Kuliah | SKS | Dosen | Hari/Jam | Ruang | Aksi |
|---|---|---|---|---|---|---|---|
| 1 | IF601 | Desain Interaksi Perangkat Lunak | 3 | Alif Finandhita, M.T. | Senin 07.30 | A301 | Lihat |
| 2 | IF602 | Pemrograman Web | 3 | Budi Hartono, M.Kom | Senin 09.30 | Lab C102 | Lihat |
| 3 | IF603 | Basis Data Lanjut | 3 | Sari Dewi, M.T. | Selasa 13.00 | B205 | Lihat |
| 4 | IF604 | Sistem Informasi | 3 | Rizky Pratama, M.Kom | Selasa 15.00 | A302 | Lihat |
| 5 | IF605 | Jaringan Komputer | 2 | Ahmad Fauzi, M.T. | Rabu 08.00 | Lab D201 | Lihat |
| 6 | IF606 | Kewirausahaan | 2 | Dewi Rahmawati, M.M. | Kamis 10.00 | B101 | Lihat |

- Footer tabel: Total SKS = 16 SKS
- Tombol "Unduh KRS PDF" (tidak perlu fungsional, cukup tampil)

### Tab 2: Jadwal Kuliah
- Tampilan weekly calendar grid (Senin–Sabtu, jam 07.00–17.00)
- Setiap slot mata kuliah ditampilkan sebagai blok berwarna berbeda
- Setiap blok berisi: nama MK singkat + ruang
- Di bawah kalender: legend warna sesuai nama mata kuliah

### Tab 3: Nilai
- Pilihan semester (dropdown): Semester I – VI
- Default tampilkan Semester VI (terkini)
- Tabel nilai:

| Kode | Nama Mata Kuliah | SKS | Nilai Huruf | Nilai Angka | Bobot |
|---|---|---|---|---|---|
| IF601 | Desain Interaksi Perangkat Lunak | 3 | A | 4.0 | 12.0 |
| IF502 | Rekayasa Perangkat Lunak | 3 | B+ | 3.5 | 10.5 |
| IF503 | Pemrograman Mobile | 3 | A- | 3.7 | 11.1 |
| IF504 | Manajemen Proyek IT | 2 | B | 3.0 | 6.0 |
| IF505 | Statistika | 2 | B+ | 3.5 | 7.0 |

- Footer: IP Semester = 3.54 | Total SKS = 13
- Kartu ringkasan IPK kumulatif di samping tabel (desktop) atau di bawah (mobile)
- Bar chart sederhana (CSS-only, tanpa library chart) yang menampilkan distribusi nilai A/B/C

### Tab 4: Absensi
- Tabel absensi per mata kuliah:

| Mata Kuliah | Total Pertemuan | Hadir | Izin | Alpha | % Kehadiran | Status |
|---|---|---|---|---|---|---|
| Desain Interaksi PL | 14 | 13 | 1 | 0 | 92% | Aman ✓ |
| Pemrograman Web | 14 | 12 | 0 | 2 | 86% | Aman ✓ |
| Basis Data Lanjut | 14 | 11 | 1 | 2 | 79% | Perhatian ⚠ |

- Badge status: hijau (≥80%), kuning (75–79%), merah (<75%)
- Info box di atas: "Minimum kehadiran: 75% dari total pertemuan"

---

## Halaman 4: Keuangan

### Layout
- Dua kolom di desktop: kiri ringkasan status, kanan riwayat transaksi

### Kartu Status Keuangan
- Kartu besar di atas:
  - "Tagihan Aktif: Rp 3.500.000" dalam teks besar merah
  - Sub-teks: "SPP Semester VI — Jatuh tempo: 10 Juni 2026"
  - Tombol "Bayar Sekarang" warna primary (tidak fungsional)
- Kartu kecil di sampingnya: "Total Pembayaran Tahun Ini: Rp 10.500.000"

### Riwayat Pembayaran
- Tabel/list:

| Tanggal | Keterangan | Jumlah | Status |
|---|---|---|---|
| 05 Mar 2026 | SPP Semester VI (Cicilan 1) | Rp 3.500.000 | Lunas ✓ |
| 10 Jan 2026 | SPP Semester V | Rp 3.500.000 | Lunas ✓ |
| 15 Aug 2025 | SPP Semester IV | Rp 3.500.000 | Lunas ✓ |

- Filter dropdown: "Semua" / "Lunas" / "Belum Bayar"
- Tombol "Unduh Bukti Pembayaran" di setiap baris (tidak fungsional)

---

## Halaman 5: Layanan

### Layout
- Grid kartu layanan di atas, di bawahnya tabel riwayat pengajuan

### Kartu Layanan (6 kartu dalam grid 3x2)
Setiap kartu berisi ikon besar + judul + deskripsi singkat + tombol "Ajukan":

1. 📄 **Surat Keterangan Aktif** — Surat bukti status mahasiswa aktif
2. 🎓 **Surat Keterangan Lulus** — Untuk keperluan pendaftaran kerja
3. 📋 **Transkrip Nilai** — Rekap nilai seluruh semester
4. 🏥 **Surat Rekomendasi Beasiswa** — Untuk pengajuan beasiswa
5. ✈️ **Izin Tidak Hadir** — Pengajuan izin ketidakhadiran resmi
6. 📝 **Pengajuan Cuti** — Permohonan cuti akademik

### Modal Pengajuan (Simulasi)
- Klik tombol "Ajukan" pada kartu mana pun → buka modal dialog
- Modal berisi: judul layanan, form sederhana (tujuan penggunaan + catatan), tombol Kirim
- Klik Kirim → modal tertutup, muncul toast notification hijau "Pengajuan berhasil dikirim! Estimasi selesai: 3–5 hari kerja"
- Tambahkan item baru ke tabel riwayat dengan status "Diproses"

### Tabel Riwayat Pengajuan

| No | Jenis Layanan | Tanggal Ajuan | Status | Aksi |
|---|---|---|---|---|
| 1 | Surat Keterangan Aktif | 20 Mei 2026 | Selesai ✓ | Unduh |
| 2 | Transkrip Nilai | 01 Apr 2026 | Selesai ✓ | Unduh |
| 3 | Izin Tidak Hadir | 15 Mar 2026 | Selesai ✓ | Unduh |

---

## Halaman 6: Profil

### Layout
- Dua kolom: kiri kartu profil, kanan tab pengaturan

### Kartu Profil
- Avatar bulat besar (inisial "BS" di latar biru)
- Nama: Budi Santoso
- NIM: 10123030
- Program Studi: Teknik Informatika
- Semester: VI
- Status: Aktif (badge hijau)
- Tombol "Edit Foto" (tidak fungsional)

### Tab Pengaturan (3 tab)
**Tab Data Diri:**
- Form read-only dengan field: Nama Lengkap, NIM, Tempat/Tanggal Lahir, Email, No. HP, Alamat
- Tombol "Perbarui Data" → muncul toast "Perubahan berhasil disimpan"

**Tab Keamanan:**
- Form ganti password: Password Lama, Password Baru, Konfirmasi Password
- Toggle: "Aktifkan Verifikasi Dua Langkah (2FA)" — bisa toggle on/off
- Info box biru: "2FA meningkatkan keamanan akun Anda secara signifikan"

**Tab Tampilan:**
- Toggle dark mode (sinkron dengan toggle di header)
- Slider ukuran teks: Kecil / Normal / Besar (simpan ke localStorage)
- Pilihan bahasa: Indonesia / English (tidak fungsional, cukup tampil)

---

## Halaman 7: Bantuan & Chatbot

### Layout
- Dua kolom: kiri FAQ accordion, kanan panel chatbot penuh

### FAQ Accordion (Kiri)
- Judul: "Pertanyaan yang Sering Diajukan"
- 8 item accordion:
  1. "Bagaimana cara mengisi KRS?"
  2. "Kapan batas waktu pengisian KRS semester ini?"
  3. "Mengapa nilai saya belum muncul?"
  4. "Bagaimana cara mengajukan surat keterangan?"
  5. "Apa yang harus dilakukan jika lupa password?"
  6. "Bagaimana cara melihat jadwal kuliah?"
  7. "Apakah data akademik saya aman?"
  8. "Bagaimana cara menghubungi dosen?"
- Setiap item klik → expand dengan animasi smooth, tampilkan jawaban teks

### Panel Chatbot Penuh (Kanan)
- Header: avatar robot + "Asisten Akademik" + status "Online"
- Area pesan dengan scroll
- Pesan sambutan otomatis saat halaman dimuat:
  > "Halo Budi! 👋 Saya asisten akademik virtual Anda. Saya dapat membantu menjawab pertanyaan seputar KRS, jadwal, nilai, dan layanan akademik lainnya. Silakan pilih topik di bawah atau ketik pertanyaan Anda."
- Quick reply chips:
  - "📋 Cara isi KRS"
  - "📅 Jadwal kuliah"
  - "📊 Lihat nilai"
  - "💳 Info pembayaran"
  - "📄 Buat surat"
- Mapping respons (hardcoded):

```
"Cara isi KRS" →
"Pengisian KRS dapat dilakukan melalui menu Akademik → KRS. 
Pastikan Anda mengisinya sebelum batas waktu yang tertera 
di banner notifikasi. Jika KRS sudah terkunci, artinya 
pengisian sudah berhasil disimpan."

"Jadwal kuliah" →
"Jadwal kuliah lengkap tersedia di menu Akademik → Jadwal 
Kuliah. Anda dapat melihatnya dalam tampilan kalender mingguan. 
Notifikasi perubahan jadwal akan dikirimkan secara otomatis."

"Lihat nilai" →
"Nilai dapat dilihat di menu Akademik → Nilai. Pilih semester 
yang ingin Anda lihat dari dropdown. Nilai dirilis setelah 
dosen melakukan input dan divalidasi oleh BAA."

"Info pembayaran" →
"Status tagihan aktif dan riwayat pembayaran dapat dilihat 
di menu Keuangan. Untuk pembayaran, silakan hubungi bagian 
keuangan atau gunakan kanal pembayaran resmi kampus."

"Buat surat" →
"Pengajuan surat dapat dilakukan di menu Layanan. Pilih 
jenis surat yang dibutuhkan, isi form pengajuan, dan kirim. 
Estimasi selesai adalah 3–5 hari kerja."
```

- Input teks di bawah + tombol kirim
- Input bebas (selain quick reply): respons fallback

---

## Fitur Lintas Halaman

### Breadcrumb Navigation
- Tampil di bawah header pada setiap halaman
- Format: `Dashboard > Akademik > Nilai`
- Setiap item yang bukan terakhir bisa diklik untuk navigasi

### Toast Notification System
- Komponen global di pojok kanan bawah
- Tipe: success (hijau), warning (kuning), error (merah), info (biru)
- Auto-dismiss setelah 4 detik dengan progress bar
- Bisa ditutup manual dengan tombol X
- Stack hingga 3 toast sekaligus

### Loading State
- Setiap perpindahan halaman: skeleton loader muncul 600ms sebelum konten tampil
- Skeleton: blok abu-abu dengan animasi pulse untuk meniru struktur konten halaman tujuan

### Feedback Konfirmasi
- Setiap aksi penting (simpan data, kirim pengajuan) → toast success
- Setiap aksi destruktif (misal: membatalkan pengajuan) → modal konfirmasi "Apakah Anda yakin?"

---

## Responsivitas

### Breakpoint

```
Mobile   : < 768px
Tablet   : 768px – 1024px
Desktop  : > 1024px
```

### Perilaku Per Breakpoint

**Mobile:**
- Sidebar disembunyikan, ganti dengan bottom navigation bar (5 ikon: Dashboard, Akademik, Keuangan, Layanan, Profil)
- Header hanya tampilkan logo + hamburger + notif
- Grid kartu berubah jadi 1 kolom
- Tabel berubah jadi card list yang bisa di-scroll horizontal

**Tablet:**
- Sidebar menyusut menjadi icon-only (lebar 64px)
- Hover ikon → tooltip muncul dengan label
- Grid 2 kolom untuk kartu

**Desktop:**
- Sidebar penuh 240px, selalu terlihat
- Grid 3–4 kolom untuk kartu statistik
- Tabel tampil penuh

---

## Animasi & Transisi

### Page Transition
- Setiap perpindahan halaman: fade-in + slide-up ringan (opacity 0→1, translateY 12px→0, duration 250ms)
- Gunakan Framer Motion `AnimatePresence` + `motion.div`

### Micro-interaction
- Tombol: scale 0.97 saat ditekan (active state)
- Kartu: box-shadow naik saat hover (shadow-md → shadow-lg)
- Tab aktif: animated underline yang bergeser menggunakan `layoutId`
- Chatbot bubble: muncul dengan slide-up + fade-in per pesan

### Sidebar Active Indicator
- Bar biru di sisi kiri item aktif menggunakan `layoutId` Framer Motion agar bergerak mulus saat berpindah menu

---

## Aksesibilitas (WCAG 2.1 AA)

- Semua tombol dan link memiliki atribut `aria-label` yang deskriptif
- Input form dilengkapi `<label>` yang terhubung dengan `htmlFor`
- Kontras warna minimal 4.5:1 antara teks dan background (gunakan warna yang sudah ditetapkan)
- Fokus keyboard terlihat jelas: `focus-visible:ring-2 focus-visible:ring-blue-500`
- Modal mengimplementasikan focus trap saat terbuka
- Gambar dekoratif menggunakan `alt=""`
- Tabel menggunakan `<th scope="col">` dan `<caption>` yang tepat

---

## Struktur File Proyek

```
my-academic-unikom/
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── BottomNav.jsx        ← mobile only
│   │   │   └── Layout.jsx           ← wrapper utama
│   │   ├── common/
│   │   │   ├── Toast.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Skeleton.jsx
│   │   │   └── Breadcrumb.jsx
│   │   └── chatbot/
│   │       ├── ChatbotWidget.jsx     ← FAB + panel slide-up
│   │       └── ChatMessage.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Akademik.jsx
│   │   ├── Keuangan.jsx
│   │   ├── Layanan.jsx
│   │   ├── Profil.jsx
│   │   └── Bantuan.jsx
│   ├── data/
│   │   ├── mahasiswa.js             ← data profil hardcoded
│   │   ├── jadwal.js
│   │   ├── nilai.js
│   │   ├── keuangan.js
│   │   ├── notifikasi.js
│   │   └── chatbot-responses.js
│   ├── context/
│   │   ├── ThemeContext.jsx          ← dark mode state
│   │   └── ToastContext.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.js                   ← base: '/nama-repo/'
└── package.json
```

---

## Konfigurasi GitHub Pages

### `vite.config.js`
```js
export default {
  base: '/my-academic-unikom/',   // sesuaikan nama repository
  build: { outDir: 'dist' }
}
```

### `package.json` scripts tambahan
```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "deploy": "npm run build && gh-pages -d dist"
}
```

### HashRouter
Gunakan `HashRouter` dari `react-router-dom` agar routing berfungsi di GitHub Pages tanpa perlu konfigurasi server-side redirect:
```jsx
import { HashRouter } from 'react-router-dom';
```

---

## Data Mahasiswa (Hardcoded)

```js
// src/data/mahasiswa.js
export const mahasiswa = {
  nama: "Budi Santoso",
  nim: "10123030",
  prodi: "Teknik Informatika",
  fakultas: "Teknik dan Ilmu Komputer",
  semester: "VI",
  angkatan: "2023",
  status: "Aktif",
  email: "10123030@mahasiswa.unikom.ac.id",
  noHp: "0812-3456-7890",
  ipk: 3.42,
  sksLulus: 87,
  sksAktif: 16,
  kehadiran: 89,
  pembimbing: "Dr. Alif Finandhita, S.Kom., M.T."
};
```

---

## Catatan Implementasi

1. **Tidak ada autentikasi nyata** — form login hanya validasi "field tidak boleh kosong" lalu redirect
2. **Tidak ada API** — semua data dari file di `src/data/`
3. **Semua aksi form** menghasilkan toast notification tanpa benar-benar menyimpan data
4. **Dark mode** disimpan di `localStorage` dan diterapkan via class `dark` pada `<html>`
5. **Onboarding tooltip** muncul sekali, flag disimpan di `localStorage`
6. **Chatbot** hanya melakukan string matching terhadap quick reply chips, bukan AI sungguhan
7. **Responsive table** di mobile: gunakan teknik `overflow-x-auto` dengan wrapper `div`
8. **Prototype label** — tambahkan badge kecil "PROTOTYPE" di pojok kanan atas header agar jelas ini bukan sistem produksi

---

*Prompt ini dibuat sebagai bagian dari tugas UTS Desain Interaksi Perangkat Lunak, Program Studi Teknik Informatika, UNIKOM. Prototype yang dihasilkan merupakan representasi visual dari rekomendasi desain interaksi berbasis prinsip Eight Golden Rules (Shneiderman), Human-Centred Design (ISO 9241-210), dan standar aksesibilitas WCAG 2.1.*