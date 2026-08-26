import { lazy, Suspense, useEffect } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

import LandingPage, { SelectLocationPage } from '@/features/landing'
import MovieDetailSkeleton from '@/features/details/MovieDetailSkeleton'
import RequireLocation from '@/routes/RequireLocation'

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