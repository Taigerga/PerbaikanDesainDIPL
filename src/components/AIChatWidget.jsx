import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Mail, Phone } from 'lucide-react'
import { chatbotResponses, mahasiswa } from '../data/dummyData'

const intentMap = [
  { keywords: ['krs', 'rencana studi', 'kartu studi', 'semester', 'sks', 'matkul'], label: 'Cara isi KRS' },
  { keywords: ['jadwal', 'jam', 'ruang', 'kelas', 'hari'], label: 'Jadwal kuliah' },
  { keywords: ['nilai', 'ipk', 'ips', 'uts', 'uas', 'ujian', 'transkrip'], label: 'Lihat nilai' },
  { keywords: ['pembayaran', 'bayar', 'tagihan', 'spp', 'biaya', 'uang'], label: 'Jadwal pembayaran' },
  { keywords: ['admin', 'hubungi', 'kontak', 'telepon', 'email'], label: 'Hubungi admin' },
  { keywords: ['surat', 'layanan', 'izin', 'cuti', 'beasiswa', 'ajukan'], label: 'Hubungi admin' },
]

function levenshtein(a, b) {
  const m = a.length, n = b.length
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
  return dp[m][n]
}

function tokenFuzzyMatch(word, keywords) {
  const w = word.toLowerCase()
  if (w.length < 3) return false
  for (const kw of keywords) {
    if (kw.includes(w) || w.includes(kw)) return true
    if (levenshtein(w, kw.slice(0, w.length)) <= 2) return true
    if (levenshtein(w, kw) <= Math.ceil(kw.length * 0.3)) return true
  }
  return false
}

function getResponse(msg) {
  const lower = msg.toLowerCase()
  const tokens = lower.split(/\s+/).filter(t => t.length > 2)
  const matched = new Set()

  intentMap.forEach(({ keywords, label }) => {
    const exactMatch = keywords.some(kw => lower.includes(kw) || lower.includes(kw.replace(/ /g, '')))
    const fuzzyMatch = tokens.some(t => tokenFuzzyMatch(t, keywords))
    if (exactMatch || fuzzyMatch) matched.add(label)
  })

  const labels = [...matched]
  if (labels.length === 0) return null
  if (labels.length === 1) return chatbotResponses[labels[0]]
  return labels.map(l => chatbotResponses[l]).filter(Boolean).join('\n\n---\n\n')
}

const quickPrompts = [
  '📋 Cara isi KRS',
  '📅 Jadwal kuliah',
  '📊 Lihat nilai',
  '💳 Info pembayaran',
  '📄 Buat surat',
]

export default function AIChatWidget() {
  const [open, setOpen] = useState(false)
  const [showHandoff, setShowHandoff] = useState(false)
  const [handoffForm, setHandoffForm] = useState({ nama: mahasiswa.nama, email: mahasiswa.email, pesan: '' })
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Halo ${mahasiswa.nama.split(' ')[0]}! Saya asisten akademik virtual Anda (Semester ${mahasiswa.semester}, ${mahasiswa.prodi}). Saya dapat membantu menjawab pertanyaan seputar KRS, jadwal, nilai, dan layanan akademik lainnya. Silakan pilih topik di bawah atau ketik pertanyaan Anda.` },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const send = (text) => {
    if (!text.trim()) return
    const userText = text.replace(/^[^\s]+\s/, '').trim() || text
    setMessages((prev) => [...prev, { from: 'user', text: userText }])
    setInput('')
    setShowHandoff(false)
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const reply = getResponse(userText)
      if (reply) {
        setMessages((prev) => [...prev, { from: 'bot', text: reply }])
      } else {
        setShowHandoff(true)
        setMessages((prev) => [...prev, {
          from: 'bot',
          text: `Maaf, saya belum bisa menjawab pertanyaan tersebut. Silakan isi form di bawah untuk menghubungi admin kami.`,
        }])
      }
    }, 600)
  }

  const submitHandoff = () => {
    setMessages((prev) => [...prev, {
      from: 'bot',
      text: `Terima kasih ${handoffForm.nama}! Pesan Anda telah dikirim ke admin. Kami akan menghubungi Anda melalui ${handoffForm.email} dalam 1x24 jam.`,
    }])
    setShowHandoff(false)
  }

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(true)}
        aria-label="Buka chatbot"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark"
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 flex w-80 flex-col rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="flex items-center justify-between rounded-t-2xl bg-primary px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <Bot size={18} />
                <span className="text-sm font-semibold">Asisten Akademik 🎓</span>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Tutup chatbot">
                <X size={18} />
              </button>
            </div>

            <div className="h-[340px] space-y-3 overflow-y-auto p-4">
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

              {showHandoff && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2 rounded-xl border border-primary/20 bg-blue-50 p-3 dark:border-primary/30 dark:bg-blue-900/10"
                >
                  <p className="text-[10px] font-semibold text-primary">Hubungi Admin</p>
                  <input
                    value={handoffForm.nama}
                    onChange={(e) => setHandoffForm(f => ({ ...f, nama: e.target.value }))}
                    placeholder="Nama"
                    aria-label="Nama"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    value={handoffForm.email}
                    onChange={(e) => setHandoffForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="Email"
                    aria-label="Email"
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <textarea
                    value={handoffForm.pesan}
                    onChange={(e) => setHandoffForm(f => ({ ...f, pesan: e.target.value }))}
                    placeholder="Tulis pesan Anda..."
                    aria-label="Pesan"
                    rows={2}
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-none"
                  />
                  <button
                    onClick={submitHandoff}
                    className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-white hover:bg-primary-dark"
                  >
                    <Send size={12} />
                    Kirim ke Admin
                  </button>
                </motion.div>
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
                aria-label="Pertanyaan"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
