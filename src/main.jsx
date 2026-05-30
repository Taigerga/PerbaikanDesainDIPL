import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import { UserPreferencesProvider } from './context/UserPreferencesContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <UserPreferencesProvider>
        <App />
      </UserPreferencesProvider>
    </ThemeProvider>
  </StrictMode>,
)
