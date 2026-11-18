import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './fonts.css'
import './index.css'
import App from './App.tsx'
import { routeMarker } from './seo'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
)

// Ако HTML-ът е изрисуван предварително за този адрес — „съживяваме“ го;
// иначе (dev режим или друг адрес) рисуваме на чисто.
if (container.hasChildNodes() && container.dataset.route === routeMarker(window.location.pathname)) {
  hydrateRoot(container, app)
} else {
  container.textContent = ''
  createRoot(container).render(app)
}
