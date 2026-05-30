import { useState } from 'react'
import { Info } from 'lucide-react'

export default function Tooltip({ text, position = 'top' }) {
  const [show, setShow] = useState(false)

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-gray-800',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-l-4 border-t-transparent border-b-transparent border-l-gray-800',
    right: 'right-full top-1/2 -translate-y-1/2 border-t-4 border-b-4 border-r-4 border-t-transparent border-b-transparent border-r-gray-800',
  }

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
    >
      <button
        type="button"
        aria-label="Informasi"
        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-primary hover:text-white dark:bg-gray-600 dark:text-gray-400"
      >
        <Info size={10} />
      </button>
      {show && (
        <span className={`absolute z-50 ${positionClasses[position]}`}>
          <span className="block whitespace-nowrap rounded-lg bg-gray-800 px-3 py-1.5 text-[10px] font-medium text-white shadow-lg dark:bg-gray-700">
            {text}
          </span>
          <span className={`absolute ${arrowClasses[position]}`} />
        </span>
      )}
    </span>
  )
}
