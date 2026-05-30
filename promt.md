Buat aplikasi prototype frontend menggunakan React + Vite + Tailwind CSS untuk sistem akademik bernama "My Academic UNIKOM Redesign".

Ketentuan utama:
- Ini hanya prototype/desain UI dan UX.
- Jangan gunakan database.
- Jangan gunakan backend/API.
- Semua data menggunakan dummy JSON atau hardcoded state.
- Aplikasi harus dapat dijalankan dengan:
  npm install
  npm run dev
- Aplikasi harus dapat di-build dengan:
  npm run build
- Harus kompatibel untuk deploy ke GitHub Pages atau Vercel tanpa perubahan besar.
- Gunakan React Router DOM untuk navigasi antar halaman.
- Gunakan struktur folder yang rapi.
- Gunakan desain modern, minimalis, dan responsif.
- Gunakan icon dari lucide-react.
- Gunakan animasi ringan menggunakan framer-motion.
- Gunakan komponen reusable.

Struktur folder:

src/
 ├── components/
 │    ├── Sidebar.jsx
 │    ├── Navbar.jsx
 │    ├── DashboardCard.jsx
 │    ├── AIChatWidget.jsx
 │    ├── NotificationPanel.jsx
 │
 ├── pages/
 │    ├── Login.jsx
 │    ├── Dashboard.jsx
 │    ├── KRS.jsx
 │    ├── Jadwal.jsx
 │    ├── Nilai.jsx
 │    ├── Pembayaran.jsx
 │    ├── Profil.jsx
 │
 ├── data/
 │    └── dummyData.js
 │
 ├── App.jsx
 ├── main.jsx

Buat halaman berikut:

1. Login Page
- Logo UNIKOM di atas
- Input NIM
- Input password
- Tombol login
- Tombol login hanya simulasi
- Setelah klik login langsung pindah ke dashboard
- Tidak perlu autentikasi sungguhan

2. Dashboard
Header:
- Logo
- Smart Search
- Notifikasi
- Profil pengguna

Sidebar:
- Dashboard
- KRS
- Jadwal Kuliah
- Nilai
- Pembayaran
- Bantuan
- Pengaturan

Konten dashboard:
- Card KRS
- Card Jadwal Kuliah
- Card Nilai
- Card Pembayaran

Tambahkan panel:
- AI Assistant
- Pengumuman Akademik
- Deadline KRS
- Jadwal UTS

3. Halaman KRS
- Tampilkan tabel daftar mata kuliah dummy
- Checkbox pilih mata kuliah
- Total SKS otomatis bertambah
- Tampilkan validasi dummy:
"Maksimum SKS: 24"

4. Halaman Jadwal
- Tampilkan jadwal mingguan dengan card

5. Halaman Nilai
- Tampilkan tabel:
Mata Kuliah | Nilai | SKS

6. Halaman Pembayaran
- Tampilkan status pembayaran dummy:
"Lunas"
"Belum Lunas"

7. AI Assistant Widget
Buat chatbot dummy:
Jika user mengetik:
"KRS"
muncul:
"Silakan buka menu KRS"

Jika user mengetik:
"Nilai"
muncul:
"Silakan buka menu Nilai"

Jika user mengetik selain itu:
"Saya belum memahami pertanyaan Anda"

Fitur tambahan:
- Dark mode toggle
- Responsive mobile
- Hover effect
- Loading skeleton
- Smooth transition
- Gunakan warna utama:
  Biru: #0066CC
  Putih
  Abu-abu muda

Jangan menggunakan database, backend, local storage, atau autentikasi asli.

Di akhir berikan:
- daftar package yang digunakan
- command install
- command build
- langkah deploy ke GitHub Pages