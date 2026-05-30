import { motion } from 'framer-motion'

const gradients = {
  blue: 'from-blue-500 to-blue-700',
  gold: 'from-yellow-400 to-orange-500',
  green: 'from-emerald-400 to-teal-600',
  purple: 'from-purple-500 to-indigo-600',
}

export default function DashboardCard({ icon: Icon, title, value, description, color = 'blue', onClick }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg dark:bg-gray-800"
    >
      <div className={`bg-gradient-to-r ${gradients[color]} p-5`}>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-white/80">{title}</p>
          <Icon size={24} className="text-white/90" />
        </div>
        <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      </div>
      <div className="px-5 py-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </motion.div>
  )
}
