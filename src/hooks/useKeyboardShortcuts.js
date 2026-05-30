import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const shortcuts = [
  { key: 'G', shift: true, route: '/dashboard' },
  { key: 'A', shift: true, route: '/akademik' },
  { key: 'K', shift: true, route: '/keuangan' },
  { key: 'L', shift: true, route: '/layanan' },
  { key: 'P', shift: true, route: '/profil' },
  { key: 'B', shift: true, route: '/bantuan' },
]

export default function useKeyboardShortcuts(searchInputRef) {
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e) => {
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      if (e.key === '/') {
        e.preventDefault()
        searchInputRef?.current?.focus()
        return
      }

      if (e.key === 'Escape') {
        const active = document.activeElement
        if (active && active !== document.body) {
          active.blur()
        }
        return
      }

      const shortcut = shortcuts.find((s) => s.key === e.key.toUpperCase() && s.shift === e.shiftKey)
      if (shortcut) {
        e.preventDefault()
        navigate(shortcut.route)
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, searchInputRef])
}
