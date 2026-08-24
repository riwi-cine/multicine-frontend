import { Route, Routes } from 'react-router-dom'

import LandingPage, { SelectLocationPage } from '@/features/landing'
import RequireLocation from '@/routes/RequireLocation'
import { RegisterPage } from '@/pages/RegisterPage'

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-md text-center p-6 space-y-4 rounded-xl border bg-card text-card-foreground shadow-lg">
        <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
        <p className="text-sm text-muted-foreground">Página de inicio de sesión en desarrollo.</p>
        <a href="/register" className="inline-block w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
          Volver al Registro
        </a>
      </div>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center text-lg text-muted-foreground">
      404 - Page not found
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <RequireLocation>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/location" element={<SelectLocationPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RequireLocation>
        }
      />
    </Routes>
  )
}

export default AppRoutes

