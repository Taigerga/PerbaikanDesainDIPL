import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn, User, Lock, GraduationCap, Shield, Smartphone } from 'lucide-react'

export default function Login() {
  const [nim, setNim] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!nim.trim() || !password.trim()) {
      setError('Harap isi NIM dan Password')
      return
    }

    if (nim.trim() !== '10123030' || password !== '12345') {
      setError('NIM atau password salah. Silakan coba lagi.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      sessionStorage.setItem('jt-login', 'true')
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden flex-1 flex-col justify-between bg-gradient-to-br from-blue-800 to-blue-600 p-12 lg:flex lg:w-[55%]">
        <div>
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}img/logo-unikom.png`} alt="UNIKOM" className="h-14 w-auto" />
            <div>
              <h2 className="text-2xl font-bold text-white">UNIKOM</h2>
              <p className="text-sm text-white/70">Universitas Komputer Indonesia</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-white">
              Sistem Akademik<br />Terintegrasi
            </h1>
            <p className="mt-3 max-w-md text-base text-white/70">
              Akses informasi akademik, KRS, nilai, dan layanan kampus dalam satu portal.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              { icon: GraduationCap, title: 'Akademik Terintegrasi', desc: 'KRS, jadwal, nilai, dan absensi dalam satu tempat' },
              { icon: Shield, title: 'Data Aman & Terenkripsi', desc: 'Keamanan data akademik Anda adalah prioritas kami' },
              { icon: Smartphone, title: 'Responsif di Semua Perangkat', desc: 'Akses dari laptop, tablet, maupun smartphone' },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <item.icon size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-white/40">&copy; 2026 Universitas Komputer Indonesia</p>
      </div>

      <div className="flex w-full items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 px-6 lg:w-[45%] lg:bg-white lg:dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl lg:border-gray-200 lg:bg-white lg:shadow-xl lg:dark:border-gray-700 lg:dark:bg-gray-800">
            <div className="mb-8 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-2 shadow-lg">
                <img src={`${import.meta.env.BASE_URL}img/logo-unikom.png`} alt="UNIKOM" className="h-full w-full object-contain" />
              </div>
              <h1 className="text-2xl font-bold text-white lg:text-gray-900 lg:dark:text-white">
                Selamat Datang
              </h1>
              <p className="mt-1 text-sm text-white/70 lg:text-gray-500 lg:dark:text-gray-400">
                Masuk ke My Academic UNIKOM
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="nim" className="mb-1.5 block text-xs font-medium text-white/80 lg:text-gray-700 lg:dark:text-gray-300">
                  NIM
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 lg:text-gray-400" />
                  <input
                    id="nim"
                    type="text"
                    value={nim}
                    onChange={(e) => setNim(e.target.value)}
                    placeholder="Contoh: 10123030"
                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm transition-all focus:border-white/40 focus:ring-2 focus:ring-white/20 lg:border-gray-200 lg:bg-gray-50 lg:text-gray-900 lg:placeholder-gray-400 lg:focus:border-primary lg:focus:ring-primary lg:dark:border-gray-600 lg:dark:bg-gray-700 lg:dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-white/80 lg:text-gray-700 lg:dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 lg:text-gray-400" />
                  <input
                    id="password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-10 text-sm text-white placeholder-white/50 outline-none backdrop-blur-sm transition-all focus:border-white/40 focus:ring-2 focus:ring-white/20 lg:border-gray-200 lg:bg-gray-50 lg:text-gray-900 lg:placeholder-gray-400 lg:focus:border-primary lg:focus:ring-primary lg:dark:border-gray-600 lg:dark:bg-gray-700 lg:dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    aria-label={showPass ? 'Sembunyikan password' : 'Tampilkan password'}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white lg:text-gray-400 lg:hover:text-gray-600"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 lg:text-red-500 text-center"
                >
                  {error}
                </motion.p>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white shadow-lg transition-all hover:bg-primary-dark disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Memproses...
                  </>
                ) : (
                  <>
                    <LogIn size={18} />
                    Masuk
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-4 text-center text-xs text-white/50 lg:text-gray-400">
              Lupa password? Hubungi BAA
            </p>
            <p className="mt-2 text-center text-[10px] text-white/30 lg:text-gray-400">
              Pengguna baru? Sistem akan memandumu saat pertama masuk.
            </p>

            <p className="mt-6 text-center text-xs text-white/30 lg:text-gray-400 lg:dark:text-gray-500">
              &copy; 2026 Universitas Komputer Indonesia &middot; Simulasi Prototype
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
