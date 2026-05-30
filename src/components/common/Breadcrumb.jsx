import { useLocation, Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const routeLabels = {
  dashboard: 'Dashboard',
  akademik: 'Akademik',
  keuangan: 'Keuangan',
  layanan: 'Layanan',
  profil: 'Profil',
  bantuan: 'Bantuan',
}

export default function Breadcrumb() {
  const { pathname } = useLocation()
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
      <Link to="/dashboard" className="flex items-center gap-1 hover:text-primary transition-colors">
        <Home size={12} />
        <span>Dashboard</span>
      </Link>
      {segments.map((seg, i) => {
        const label = routeLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1)
        const isLast = i === segments.length - 1
        const path = '/' + segments.slice(0, i + 1).join('/')
        return (
          <span key={seg} className="flex items-center gap-1.5">
            <ChevronRight size={10} />
            {isLast ? (
              <span className="font-medium text-gray-600 dark:text-gray-300">{label}</span>
            ) : (
              <Link to={path} className="hover:text-primary transition-colors">{label}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
