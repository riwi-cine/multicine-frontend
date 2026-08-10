import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { QueryProvider } from '@/app/providers/QueryProvider'
import '@/styles/globals.css'
import App from '@/app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryProvider>
        <BrowserRouter>
          <App />
          <Toaster richColors />
        </BrowserRouter>
      </QueryProvider>
    </HelmetProvider>
  </StrictMode>,
)
