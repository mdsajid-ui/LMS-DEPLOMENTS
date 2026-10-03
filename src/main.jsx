import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initSecurityShield } from './utils/securityShield.js'

// Initialize Military-Grade Cybersecurity Shield (Anti-Clickjacking, Prototype Guard, Framebuster)
initSecurityShield();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
