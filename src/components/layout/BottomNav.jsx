import { NavLink } from 'react-router-dom'
import { LayoutDashboard, BookOpen, CreditCard, FileText, User } from 'lucide-react'

const items = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/akademik', icon: BookOpen, label: 'Akademik' },
  { to: '/keuangan', icon: CreditCard, label: 'Keuangan' },
  { to: '/layanan', icon: FileText, label: 'Layanan' },
  { to: '/profil', icon: User, label: 'Profil' },
]

export default function BottomNav() {
  return (
    <nav aria-label="Navigasi bawah" className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-gray-200 bg-white px-2 pb-safe dark:border-gray-700 dark:bg-gray-900 lg:hidden">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          aria-label={item.label}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-medium transition-colors ${
              isActive
                ? 'text-primary'
                : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
            }`
          }
        >
          <item.icon size={20} aria-hidden="true" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
