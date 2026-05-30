Berdasarkan keempat permasalahan yang telah dianalisis, perbaikan desain interaksi My Academic UNIKOM perlu dilakukan secara menyeluruh dan tidak hanya bersifat kosmetik. Perubahan tambal sulam pada satu aspek tidak akan cukup apabila aspek-aspek lainnya dibiarkan. Oleh karena itu, rekomendasi berikut dirancang sebagai paket perbaikan yang mencakup navigasi, usability, aksesibilitas, dan integrasi teknologi modern secara terintegrasi.
1. Perbaikan Navigasi Sistem
a. Restrukturisasi Menu Berbasis Konteks Tugas
Struktur menu yang ada perlu dirombak dengan pendekatan task-based navigation, di mana menu dikelompokkan bukan berdasarkan kategori teknis sistem, melainkan berdasarkan tugas nyata yang ingin diselesaikan pengguna. Pengelompokan yang diusulkan mencakup empat kategori utama: Akademik (KRS, jadwal kuliah, nilai, absensi), Keuangan (tagihan, riwayat pembayaran), Layanan (surat keterangan, pengajuan izin, beasiswa), dan Profil (data pribadi, pengaturan akun).
Pendekatan ini dilandasi oleh prinsip bahwa pengguna mengorganisasi pemikiran mereka berdasarkan tujuan, bukan berdasarkan arsitektur internal sistem. Ketika navigasi mencerminkan cara pengguna berpikir, mereka dapat menemukan apa yang dicari tanpa perlu mempelajari logika teknis yang mendasarinya [1].
Alasan Pemilihan Solusi
Restrukturisasi navigasi berbasis konteks tugas langsung menjawab permasalahan kesulitan menemukan menu yang diidentifikasi pada Soal 1. Dengan menyejajarkan struktur informasi sistem dengan model mental pengguna, proses pencarian menu menjadi lebih intuitif.
Manfaat bagi Pengguna
Mahasiswa dapat menemukan fitur yang dibutuhkan dengan lebih cepat, termasuk pengguna baru yang belum familier dengan sistem. Jumlah langkah navigasi untuk mencapai fitur tertentu berkurang secara signifikan.
Argumentasi Akademik
Shneiderman menegaskan bahwa konsistensi dan kejelasan struktur navigasi merupakan dua faktor yang paling berpengaruh terhadap efisiensi penggunaan sistem. Pengguna yang dihadapkan pada navigasi yang logis dan konsisten tidak perlu mengeluarkan upaya kognitif ekstra untuk menemukan jalannya [1].
b. Implementasi Global Search dengan Kemampuan Prediksi
Sistem perlu dilengkapi dengan fitur pencarian global yang dapat diakses dari seluruh halaman, mampu memproses kata kunci dalam bahasa natural, dan menampilkan hasil yang diperkaya dengan konteks — bukan sekadar daftar tautan. Ketika pengguna mengetik "isi KRS", sistem langsung menampilkan pintasan menuju halaman KRS beserta informasi singkat tentang status KRS pengguna saat ini.
Argumentasi Akademik
Nielsen menempatkan kemampuan menemukan informasi secara efisien sebagai salah satu indikator utama usability sistem. Fitur pencarian yang cerdas secara dramatis menurunkan biaya interaksi (interaction cost) yang harus dibayar pengguna untuk mencapai tujuannya [3].
c. Dashboard Berbasis Prioritas Dinamis
Halaman utama dirancang ulang sebagai dashboard informatif yang menampilkan ringkasan status akademik terkini — jadwal kuliah hari ini, tagihan yang belum dibayar, pengumuman terbaru, dan tenggat waktu yang akan datang. Informasi disajikan dalam format kartu (card) yang ringkas, dengan tautan langsung ke halaman detail masing-masing.
Argumentasi Akademik
Prinsip Reduce Short-Term Memory Load dari Shneiderman secara langsung mendukung pendekatan ini: informasi yang paling dibutuhkan harus tersaji di permukaan, tanpa mengharuskan pengguna mengingat di mana menemukannya [1].

2. Peningkatan Usability
a. Sistem Onboarding Bertahap untuk Pengguna Baru
Sistem onboarding dirancang sebagai tur interaktif yang dipicu secara otomatis saat pengguna pertama kali masuk ke sistem setelah registrasi. Tur ini terdiri dari beberapa tahap singkat yang memperkenalkan fitur-fitur utama secara berurutan, disertai dengan elemen highlight visual yang menunjukkan dengan tepat elemen antarmuka yang sedang dijelaskan. Pengguna dapat melewati tur ini kapan saja, tetapi selalu dapat mengaksesnya kembali melalui menu bantuan.
Alasan Pemilihan Solusi
Onboarding merespons langsung permasalahan Kasus 2 tentang lamanya waktu adaptasi mahasiswa baru. Dengan memberikan panduan yang terstruktur sejak awal, sistem memperpendek kurva pembelajaran secara signifikan.
Manfaat bagi Pengguna
Mahasiswa baru dapat segera produktif menggunakan sistem tanpa perlu mengandalkan bantuan eksternal. Waktu yang dibutuhkan untuk memahami alur sistem dasar dapat dipangkas dari hari menjadi menit.
Argumentasi Akademik
Nielsen mendefinisikan learnability sebagai kemampuan pengguna untuk dengan cepat mencapai tingkat kinerja yang memuaskan saat pertama kali menggunakan sistem. Onboarding yang dirancang dengan baik adalah investasi desain yang berdampak langsung pada dimensi usability ini [3].
b. Standarisasi Komponen Antarmuka (Design System)
Seluruh komponen visual sistem — tombol, formulir, ikon, kartu, dan pola navigasi — perlu distandarisasi dalam sebuah design system yang diterapkan secara konsisten di seluruh halaman. Ini berarti tombol dengan fungsi yang sama harus tampil identik di mana pun letaknya, dan pola interaksi untuk tugas-tugas serupa harus mengikuti alur yang sama.
Argumentasi Akademik
Konsistensi antarmuka memungkinkan pengguna mentransfer pengetahuan yang diperoleh di satu bagian sistem ke bagian lainnya. Shneiderman menyebut ini sebagai salah satu mekanisme utama yang membuat sistem menjadi mudah dipelajari dan mudah digunakan [1].
c. Pesan Kesalahan yang Edukatif dan Umpan Balik yang Bermakna
Setiap pesan kesalahan yang ditampilkan sistem perlu diubah dari format teknis yang tidak informatif ("Error 500") menjadi pesan yang menjelaskan apa yang terjadi, mengapa hal itu terjadi, dan apa yang perlu dilakukan pengguna. Begitu pula, setiap aksi yang berhasil diselesaikan harus mendapatkan konfirmasi yang jelas dan spesifik.
Argumentasi Akademik
Norman berpendapat bahwa feedback yang efektif adalah yang memberikan informasi yang cukup bagi pengguna untuk memahami kondisi sistem dan memutuskan tindakan selanjutnya. Pesan kesalahan yang baik bukan hanya memberitahu bahwa ada yang salah, tetapi juga memberdayakan pengguna untuk memperbaikinya [2].

3. Peningkatan Aksesibilitas
a. Kepatuhan terhadap Standar WCAG 2.1
Sistem perlu diaudit dan diperbaiki agar memenuhi standar Web Content Accessibility Guidelines (WCAG) 2.1 pada tingkat AA. Ini mencakup pemenuhan rasio kontras warna minimum 4.5:1 untuk teks berukuran normal, penyediaan teks alternatif untuk seluruh elemen visual yang bermakna, dukungan navigasi penuh menggunakan keyboard saja, dan kompatibilitas dengan teknologi bantu seperti pembaca layar (screen reader) [6].
Alasan Pemilihan Solusi
Kepatuhan WCAG bukan hanya soal melayani pengguna dengan disabilitas — ia juga meningkatkan pengalaman seluruh pengguna dengan menciptakan antarmuka yang lebih bersih, lebih terstruktur, dan lebih mudah dipahami.
Manfaat bagi Pengguna
Mahasiswa dengan gangguan penglihatan, disleksia, atau keterbatasan motorik dapat menggunakan sistem dengan mandiri. Sistem yang aksesibel juga memberikan pengalaman yang lebih baik bagi semua pengguna, termasuk mereka yang mengakses melalui perangkat lawas atau dalam kondisi pencahayaan yang tidak ideal.
Argumentasi Akademik
WCAG 2.1 dibangun di atas prinsip POUR: Perceivable (dapat dirasakan), Operable (dapat dioperasikan), Understandable (dapat dipahami), dan Robust (tangguh). Keempat prinsip ini membentuk fondasi aksesibilitas digital yang komprehensif [6].
b. Desain Responsif dengan Pendekatan Mobile-First
Mengingat tingginya proporsi mahasiswa yang mengakses sistem melalui ponsel, desain baru harus menerapkan pendekatan mobile-first — yaitu merancang untuk layar terkecil terlebih dahulu, kemudian memperluas desain untuk layar yang lebih besar. Ini memastikan bahwa pengalaman di ponsel bukan merupakan versi terdegradasi dari tampilan desktop, melainkan pengalaman yang dirancang khusus untuk konteks penggunaan mobile.
Argumentasi Akademik
ISO 9241-210 menekankan pentingnya mempertimbangkan konteks penggunaan yang beragam sejak awal proses desain. Pendekatan mobile-first merupakan respons langsung terhadap konteks penggunaan dominan yang ada dalam kenyataan [5].
c. Fitur Kustomisasi Tampilan oleh Pengguna
Pengguna perlu diberikan kendali untuk menyesuaikan aspek-aspek tampilan yang memengaruhi kenyamanan mereka: pilihan antara mode terang dan gelap, pengaturan ukuran teks dalam rentang yang ditentukan sistem, dan kemungkinan menyembunyikan elemen-elemen dashboard yang tidak relevan.
Argumentasi Akademik
Prinsip support internal locus of control dari Shneiderman menegaskan bahwa pengguna harus merasa memiliki kendali atas sistem, bukan dikontrol oleh sistem. Kustomisasi tampilan adalah salah satu cara paling konkret untuk mewujudkan prinsip ini [1].

4. Integrasi Teknologi Modern
a. Chatbot Akademik dengan Kemampuan Pemrosesan Bahasa Natural
Chatbot yang diusulkan dirancang bukan sebagai pengganti agen layanan manusia, melainkan sebagai lapisan pertama bantuan yang mampu menangani pertanyaan-pertanyaan yang bersifat rutin dan berulang. Dengan membebaskan staf layanan akademik dari beban pertanyaan yang sama, mereka dapat memberikan perhatian lebih pada kasus-kasus yang membutuhkan pertimbangan manusia. Chatbot dilengkapi dengan kemampuan handoff yang mulus, yaitu kemampuan untuk mengalihkan percakapan kepada manusia ketika pertanyaan melampaui kemampuan sistem.
Alasan Pemilihan Solusi
Chatbot merespons langsung permasalahan Kasus 3 tentang absennya fitur bantuan kontekstual. Ia juga menjadi implementasi konkret dari integrasi AI yang dibahas di Soal 3.
Manfaat bagi Pengguna
Mahasiswa mendapatkan bantuan yang responsif tanpa harus mengantri di loket layanan atau menunggu balasan email. Bantuan tersedia selama 24 jam, termasuk di luar jam kerja kampus.
Argumentasi Akademik
Russell dan Norvig menjelaskan bahwa agen AI yang efektif adalah yang mampu memaksimalkan nilai yang diberikan kepada pengguna berdasarkan konteks yang dipahaminya [10]. Chatbot akademik yang baik memenuhi kriteria ini dengan memahami konteks pertanyaan mahasiswa dan memberikan jawaban yang relevan secara langsung.
b. Sistem Notifikasi Berbasis Prioritas dan Preferensi Pengguna
Sistem notifikasi dirancang ulang agar tidak sekadar mengirimkan semua notifikasi ke semua pengguna, melainkan memprioritaskan dan mempersonalisasi notifikasi berdasarkan relevansi untuk masing-masing pengguna. Mahasiswa semester akhir, misalnya, akan menerima notifikasi yang lebih banyak berkaitan dengan persyaratan kelulusan, sementara mahasiswa baru akan diprioritaskan mendapatkan pengingat tentang tenggat pengisian KRS.
Argumentasi Akademik
Notifikasi yang relevan meningkatkan nilai informasi yang diterima pengguna tanpa menambah beban kognitif akibat kelebihan informasi (information overload). Ini sejalan dengan prinsip bahwa sistem yang baik menyampaikan informasi yang tepat kepada orang yang tepat pada waktu yang tepat [2].
c. Personalisasi Dashboard Berbasis Pembelajaran Mesin
Memanfaatkan data pola penggunaan yang dikumpulkan dari waktu ke waktu, sistem secara gradual menyesuaikan tampilan dashboard untuk mencerminkan prioritas dan kebiasaan masing-masing pengguna. Proses personalisasi ini bersifat transparan — pengguna dapat melihat dan mengedit preferensi yang disimpan sistem kapan saja — sehingga mereka tetap memiliki kendali penuh atas pengalaman mereka.
Argumentasi Akademik
Norman menjelaskan bahwa sistem yang beradaptasi terhadap kebutuhan pengguna memberikan pengalaman yang terasa lebih alami dan kurang menegangkan dibandingkan sistem yang memaksa pengguna menyesuaikan diri dengannya [2]. Personalisasi yang transparan dan dapat dikontrol pengguna juga menjawab kekhawatiran etis yang diangkat Friedman dan Hendry tentang penghormatan terhadap otonomi pengguna [9].
