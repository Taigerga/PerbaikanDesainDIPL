import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Download, ClipboardList, GraduationCap, FileText, HelpCircle, ChevronDown, Bot, User, Mail as MailIcon, ExternalLink, PlayCircle, MessageCircle } from 'lucide-react'
import { layananList, riwayatLayanan, kuesionerList, syaratWisuda, chatbotResponses } from '../data/dummyData'
import ConfirmDialog from '../components/common/ConfirmDialog'
import SuccessPage from '../components/common/SuccessPage'
import OnboardingTour from '../components/OnboardingTour'

const tabs = [
  { id: 'layanan', label: 'Layanan', icon: FileText },
  { id: 'kuesioner', label: 'Kuesioner', icon: ClipboardList },
  { id: 'wisuda', label: 'Syarat Wisuda', icon: GraduationCap },
  { id: 'faq', label: 'Bantuan', icon: HelpCircle },
  { id: 'chatbot', label: 'Chatbot', icon: MessageCircle },
]

const faqs = [
  { q: 'Bagaimana cara mengisi KRS?', a: 'Pengisian KRS dapat dilakukan melalui menu Akademik → KRS. Pastikan Anda mengisinya sebelum batas waktu yang tertera di banner notifikasi. Jika KRS sudah terkunci, artinya pengisian sudah berhasil disimpan.' },
  { q: 'Kapan batas waktu pengisian KRS semester ini?', a: 'Batas waktu pengisian KRS semester ini adalah 5 Juni 2026. Setelah tanggal tersebut, KRS akan otomatis terkunci dan tidak dapat diubah.' },
  { q: 'Mengapa nilai saya belum muncul?', a: 'Nilai akan muncul setelah dosen melakukan input nilai dan divalidasi oleh BAA. Jika sudah melebihi batas waktu yang ditentukan, silakan hubungi dosen pengampu atau BAA.' },
  { q: 'Bagaimana cara mengajukan surat keterangan?', a: 'Pengajuan surat dapat dilakukan di menu Layanan. Pilih jenis surat yang dibutuhkan, isi form pengajuan, dan kirim. Estimasi selesai adalah 3–5 hari kerja.' },
  { q: 'Apa yang harus dilakukan jika lupa password?', a: 'Hubungi Bagian Administrasi Akademik (BAA) untuk mereset password Anda. Siapkan NIM dan data diri untuk verifikasi.' },
  { q: 'Bagaimana cara melihat jadwal kuliah?', a: 'Jadwal kuliah lengkap tersedia di menu Akademik → Jadwal Kuliah. Anda dapat melihatnya dalam tampilan kalender mingguan. Notifikasi perubahan jadwal akan dikirimkan secara otomatis.' },
  { q: 'Apakah data akademik saya aman?', a: 'Keamanan data akademik adalah prioritas utama. Sistem menggunakan enkripsi dan device binding untuk memastikan hanya Anda yang dapat mengakses akun.' },
  { q: 'Bagaimana cara menghubungi dosen?', a: 'Untuk menghubungi dosen, Anda dapat menggunakan email resmi yang tersedia di profil masing-masing dosen atau melalui BAA.' },
]

const quickPrompts = [
  '📋 Cara isi KRS',
  '📅 Jadwal kuliah',
  '📊 Lihat nilai',
  '💳 Info pembayaran',
  '📄 Buat surat',
]

function FaqContent() {
  const [openFaq, setOpenFaq] = useState(null)
  const [showTour, setShowTour] = useState(false)

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-3">
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white sm:w-[calc(50%-6px)] dark:border-gray-700 dark:bg-gray-800"
          >
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-primary dark:bg-blue-900/30">
                  <HelpCircle size={16} />
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">{faq.q}</span>
              </div>
              <motion.div
                animate={{ rotate: openFaq === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} className="text-gray-400" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openFaq === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-100 px-5 py-4 dark:border-gray-700">
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{faq.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="w-full rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-5 text-white sm:w-[calc(50%-6px)]">
        <h3 className="text-sm font-semibold">Butuh Bantuan Langsung?</h3>
        <p className="mt-1 text-xs text-white/70">Kunjungi Bagian Akademik atau hubungi melalui email.</p>
        <div className="mt-3 space-y-2">
          <a href="#" className="flex items-center gap-2 text-xs text-white/80 hover:text-white">
            <MailIcon size={14} />
            admin@unikom.ac.id
          </a>
          <a href="#" className="flex items-center gap-2 text-xs text-white/80 hover:text-white">
            <FileText size={14} />
            Panduan Pengguna (PDF)
            <ExternalLink size={10} />
          </a>
          <button
            onClick={() => setShowTour(true)}
            className="flex items-center gap-2 text-xs text-white/80 hover:text-white"
          >
            <PlayCircle size={14} />
            Lihat tur panduan lagi
          </button>
        </div>
      </div>
      <OnboardingTour open={showTour} onComplete={() => setShowTour(false)} onSkip={() => setShowTour(false)} />
    </div>
  )
}

function ChatbotContent() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Halo! Saya asisten akademik virtual. Saya dapat membantu menjawab pertanyaan seputar KRS, jadwal, nilai, dan layanan akademik lainnya.' },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const getChatResponse = (msg) => {
    const lower = msg.toLowerCase()
    if (lower.includes('krs')) return chatbotResponses['Cara isi KRS']
    if (lower.includes('jadwal')) return chatbotResponses['Jadwal kuliah']
    if (lower.includes('nilai')) return chatbotResponses['Lihat nilai']
    if (lower.includes('pembayaran') || lower.includes('bayar') || lower.includes('tagihan')) return chatbotResponses['Jadwal pembayaran']
    if (lower.includes('admin') || lower.includes('hubungi') || lower.includes('kontak')) return chatbotResponses['Hubungi admin']
    if (lower.includes('surat') || lower.includes('layanan')) return chatbotResponses['Hubungi admin']
    return 'Maaf, saya belum memahami pertanyaan tersebut. Silakan pilih salah satu topik di atas.'
  }

  const send = (text) => {
    if (!text.trim()) return
    const userText = text.replace(/^[^\s]+\s/, '').trim() || text
    setMessages((prev) => [...prev, { from: 'user', text: userText }])
    setInput('')
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { from: 'bot', text: getChatResponse(userText) }])
    }, 600)
  }

  return (
    <div className="flex flex-col rounded-2xl bg-white shadow-sm dark:bg-gray-800">
      <div className="flex items-center gap-2 rounded-t-2xl bg-primary px-5 py-3 text-white">
        <Bot size={18} />
        <div>
          <p className="text-sm font-semibold">Asisten Akademik</p>
          <p className="text-[10px] text-white/70">Online</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4" style={{ maxHeight: '440px' }}>
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i === messages.length - 1 ? 0.6 : 0 }}
            className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] items-start gap-2 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                m.from === 'user' ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-600'
              }`}>
                {m.from === 'user' ? <User size={12} className="text-white" /> : <Bot size={12} />}
              </div>
              <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                m.from === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200'
              }`}>
                {m.text}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex items-start gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
              <Bot size={12} />
            </div>
            <div className="rounded-2xl bg-gray-100 px-3.5 py-2.5 dark:bg-gray-700">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        {!isTyping && messages.length === 1 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {quickPrompts.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-gray-200 px-3 py-1.5 text-xs text-gray-500 transition-colors hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-400"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 p-3 dark:border-gray-700">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send(input)}
          placeholder="Ketik pertanyaan..."
          aria-label="Pertanyaan chatbot"
          className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none transition-all focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
        />
        <button
          onClick={() => send(input)}
          aria-label="Kirim pesan"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-white hover:bg-primary-dark"
        >
          <Send size={14} />
        </button>
      </div>
    </div>
  )
}

function LayananContent({ onSuccess }) {
  const [modalOpen, setModalOpen] = useState(null)
  const [tujuan, setTujuan] = useState('')
  const [catatan, setCatatan] = useState('')
  const [riwayat, setRiwayat] = useState(riwayatLayanan)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleKirim = () => {
    const newItem = {
      id: riwayat.length + 1,
      jenis: modalOpen.judul,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'Diproses',
    }
    setRiwayat((prev) => [newItem, ...prev])
    setModalOpen(null)
    setTujuan('')
    setCatatan('')
    setConfirmOpen(false)
    onSuccess({
      title: 'Pengajuan berhasil dikirim!',
      message: 'Pengajuan Anda telah diterima oleh sistem.',
      summaryItems: [
        { label: 'Jenis Layanan', value: modalOpen.judul },
        { label: 'Tujuan', value: tujuan || '(tidak diisi)' },
        { label: 'Tanggal', value: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) },
      ],
      nextSteps: 'Pengajuan akan diproses dalam 3–5 hari kerja. Status pengajuan dapat dilihat di riwayat pengajuan di bawah.',
    })
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {layananList.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalOpen(item)}
            className="rounded-2xl bg-white p-5 text-left shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800"
          >
            <div className="mb-3 text-3xl">{item.icon}</div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-white">{item.judul}</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.deskripsi}</p>
            <span className="mt-3 inline-block rounded-lg bg-primary/10 px-3 py-1 text-[10px] font-medium text-primary">
              Ajukan
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setModalOpen(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{modalOpen.icon}</span>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">{modalOpen.judul}</h2>
                </div>
                <button onClick={() => setModalOpen(null)} aria-label="Tutup modal" className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="tujuan" className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-300">
                    Tujuan Penggunaan
                  </label>
                  <input
                    id="tujuan"
                    type="text"
                    value={tujuan}
                    onChange={(e) => setTujuan(e.target.value)}
                    placeholder="Contoh: Pendaftaran kerja"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="catatan" className="mb-1.5 block text-xs font-medium text-gray-600 dark:text-gray-300">
                    Catatan (opsional)
                  </label>
                  <textarea
                    id="catatan"
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    rows={3}
                    placeholder="Tambahkan catatan..."
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => setConfirmOpen(true)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-dark"
                >
                  <Send size={16} />
                  Kirim Pengajuan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmDialog
        open={confirmOpen}
        title="Konfirmasi Pengajuan"
        description="Periksa kembali data pengajuan Anda sebelum dikirim."
        items={[
          { label: 'Jenis Layanan', value: modalOpen?.judul || '-' },
          { label: 'Tujuan', value: tujuan || '(tidak diisi)' },
          { label: 'Catatan', value: catatan || '(tidak ada)' },
        ]}
        confirmText="Kirim"
        onConfirm={handleKirim}
        onCancel={() => setConfirmOpen(false)}
      />

      <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
        <h2 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">Riwayat Pengajuan</h2>
        <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">No</th>
                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">Jenis Layanan</th>
                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">Tanggal Ajuan</th>
                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th scope="col" className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {riwayat.map((r, i) => (
                <tr key={r.id} className="border-t border-gray-50 dark:border-gray-700">
                  <td className="px-4 py-3 text-xs text-gray-400">{i + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-white">{r.jenis}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300">{r.tanggal}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                      r.status === 'Selesai'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {r.status === 'Selesai' && (
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
    </>
  )
}

function KuesionerContent() {
  return (
    <div className="space-y-3">
      {kuesionerList.map((k) => (
        <div
          key={k.id}
          className="flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{k.judul}</p>
            <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              Tenggat: {k.tenggat}
            </p>
          </div>
          <span className={`ml-3 shrink-0 rounded-full px-3 py-1 text-[10px] font-medium ${
            k.status === 'Sudah diisi'
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
          }`}>
            {k.status}
          </span>
          {k.status === 'Belum diisi' && (
            <button className="ml-2 shrink-0 rounded-lg bg-primary px-3 py-1.5 text-[10px] font-medium text-white hover:bg-primary-dark">
              Isi
            </button>
          )}
        </div>
      ))}
    </div>
  )
}

function WisudaContent() {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-800">
      <h2 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">Checklist Persyaratan Wisuda</h2>
      <div className="space-y-3">
        {syaratWisuda.map((s, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-gray-100 p-4 dark:border-gray-700"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-800 dark:text-white">{s.item}</p>
              {s.nilai !== '-' && (
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{s.nilai}</p>
              )}
            </div>
            <span className="ml-3 shrink-0 text-xs font-medium">{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Layanan() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(location.state?.tab || 'layanan')
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    if (location.state?.tab) setActiveTab(location.state?.tab)
  }, [location.state?.tab])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Layanan</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Ajukan surat, layanan akademik, dan pusat bantuan
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
                  layoutId="layanan-tab-indicator"
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

      {success && (
        <SuccessPage
          title={success.title}
          message={success.message}
          summaryItems={success.summaryItems}
          nextSteps={success.nextSteps}
          primaryAction={{ label: 'Kembali ke Dashboard', onClick: () => navigate('/dashboard') }}
          secondaryAction={{ label: 'Kembali ke Layanan', onClick: () => setSuccess(null) }}
        />
      )}

      {!success && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === 'layanan' && <LayananContent onSuccess={setSuccess} />}
            {activeTab === 'kuesioner' && <KuesionerContent />}
            {activeTab === 'wisuda' && <WisudaContent />}
            {activeTab === 'faq' && <FaqContent />}
            {activeTab === 'chatbot' && <ChatbotContent />}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  )
}
