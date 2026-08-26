import { lazy, Suspense, useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

import LandingPage, { SelectLocationPage } from '@/features/landing'
import MovieDetailSkeleton from '@/features/details/MovieDetailSkeleton'
import RequireLocation from '@/routes/RequireLocation'
import ProtectedRoute from '@/routes/ProtectedRoute'
import { RegisterPage } from '@/pages/RegisterPage'
import { LoginPage } from '@/pages/LoginPage'

function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <div className="w-full max-w-md text-center p-6 space-y-4 rounded-xl border bg-card text-card-foreground shadow-lg">
        <h2 className="text-2xl font-bold">Perfil Privado de Usuario</h2>
        <p className="text-sm text-muted-foreground">¡Bienvenido a tu área privada protegida!</p>
        <Link to="/" className="inline-block w-full py-2 px-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
          Volver al Inicio
        </Link>
      </div>
    </div>
  )
}

const Details = lazy(() => import('@/features/details/Details'))

/**
 * Restaura la posición de scroll en cada cambio de ruta. Si la URL trae
 * hash (p. ej. "/#cartelera"), delega el scroll al efecto de LandingPage.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
      <p className="font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
        404
      </p>
      <p className="text-lg text-muted-foreground">
        La página que buscas no existe o fue movida.
      </p>
      <Link
        to="/"
        className="
          mt-2 inline-flex items-center gap-2 rounded-lg
          bg-primary px-5 py-2.5 text-sm font-semibold
          text-primary-foreground transition-all duration-200
          hover:bg-secondary hover:shadow-md
        "
      >
        Volver al inicio
      </Link>
    </main>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="*" element={<CinemaRoutes />} />
    </Routes>
  )
}

function CinemaRoutes() {
  return (
    <RequireLocation>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/location" element={<SelectLocationPage />} />
        <Route
          path="/movie/:id"
          element={
            <Suspense fallback={<MovieDetailSkeleton />}>
              <Details />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RequireLocation>
  )
}

export default AppRoutes
