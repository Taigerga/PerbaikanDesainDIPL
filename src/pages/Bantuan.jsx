import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Bantuan() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/layanan', { state: { tab: 'faq' }, replace: true })
  }, [navigate])
  return null
}
