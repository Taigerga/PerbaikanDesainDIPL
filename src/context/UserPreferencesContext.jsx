import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const UserPreferencesContext = createContext()

const menuItems = [
  { route: '/akademik', label: 'KRS', icon: 'BookOpen' },
  { route: '/akademik', label: 'Jadwal Kuliah', icon: 'Calendar' },
  { route: '/akademik', label: 'Nilai', icon: 'TrendingUp' },
  { route: '/keuangan', label: 'Pembayaran', icon: 'CreditCard' },
  { route: '/layanan', label: 'Layanan', icon: 'FileText' },
  { route: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { route: '/profil', label: 'Profil', icon: 'User' },
  { route: '/bantuan', label: 'Bantuan', icon: 'HelpCircle' },
]

const FONT_SIZE_KEY = 'pref-font-size'
const HIDDEN_CARDS_KEY = 'pref-hidden-cards'

function loadFromStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

export function UserPreferencesProvider({ children }) {
  const [frequencies, setFrequencies] = useState(() => loadFromStorage('nav-frequencies', {}))
  const [bookmarks, setBookmarks] = useState(() => loadFromStorage('nav-bookmarks', []))
  const [fontSize, setFontSizeState] = useState(() => loadFromStorage(FONT_SIZE_KEY, 'normal'))
  const [hiddenCards, setHiddenCards] = useState(() => loadFromStorage(HIDDEN_CARDS_KEY, []))

  useEffect(() => {
    localStorage.setItem('nav-frequencies', JSON.stringify(frequencies))
  }, [frequencies])

  useEffect(() => {
    localStorage.setItem('nav-bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    localStorage.setItem(FONT_SIZE_KEY, JSON.stringify(fontSize))
    document.documentElement.setAttribute('data-font-size', fontSize)
  }, [fontSize])

  useEffect(() => {
    localStorage.setItem(HIDDEN_CARDS_KEY, JSON.stringify(hiddenCards))
  }, [hiddenCards])

  const trackClick = useCallback((route) => {
    setFrequencies((prev) => ({
      ...prev,
      [route]: (prev[route] || 0) + 1,
    }))
  }, [])

  const toggleBookmark = useCallback((route) => {
    setBookmarks((prev) =>
      prev.includes(route)
        ? prev.filter((r) => r !== route)
        : [...prev, route]
    )
  }, [])

  const isBookmarked = useCallback((route) => bookmarks.includes(route), [bookmarks])

  const getFrequentlyUsed = useCallback((limit = 4) => {
    const sorted = Object.entries(frequencies)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
    return sorted.map(([route]) => menuItems.find((m) => m.route === route)).filter(Boolean)
  }, [frequencies])

  const getBookmarked = useCallback(() => {
    return bookmarks.map((route) => menuItems.find((m) => m.route === route)).filter(Boolean)
  }, [bookmarks])

  const setFontSize = useCallback((size) => {
    setFontSizeState(size)
  }, [])

  const toggleDashboardCard = useCallback((cardId) => {
    setHiddenCards((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    )
  }, [])

  const isDashboardCardHidden = useCallback((cardId) => hiddenCards.includes(cardId), [hiddenCards])

  return (
    <UserPreferencesContext.Provider value={{
      menuItems, frequencies, bookmarks,
      trackClick, toggleBookmark, isBookmarked,
      getFrequentlyUsed, getBookmarked,
      fontSize, setFontSize,
      hiddenCards, toggleDashboardCard, isDashboardCardHidden,
    }}>
      {children}
    </UserPreferencesContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useUserPreferences = () => useContext(UserPreferencesContext)
