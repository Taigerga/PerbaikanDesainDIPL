import { useState, useRef } from 'react'
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import BottomNav from './components/layout/BottomNav'
import Breadcrumb from './components/common/Breadcrumb'
import { ToastProvider } from './context/ToastContext'
import useKeyboardShortcuts from './hooks/useKeyboardShortcuts'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Akademik from './pages/Akademik'
import Keuangan from './pages/Keuangan'
import Layanan from './pages/Layanan'
import Profil from './pages/Profil'
import Bantuan from './pages/Bantuan'

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const searchRef = useRef(null)
  useKeyboardShortcuts(searchRef)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col lg:ml-60 pb-16 lg:pb-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} searchRef={searchRef} />
        <main role="main" className="flex-1 p-4 md:p-6 lg:p-8">
          <Breadcrumb />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Routes location={location}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/akademik" element={<Akademik />} />
                <Route path="/keuangan" element={<Keuangan />} />
                <Route path="/layanan" element={<Layanan />} />
                <Route path="/profil" element={<Profil />} />
                <Route path="/bantuan" element={<Bantuan />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        <BottomNav />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </ToastProvider>
    </HashRouter>
  )
}
