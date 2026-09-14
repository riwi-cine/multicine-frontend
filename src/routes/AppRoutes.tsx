import { lazy, Suspense, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, Route, Routes, useLocation } from 'react-router-dom'

import LandingPage, { SelectLocationPage } from '@/features/landing'
import MovieDetailSkeleton from '@/features/details/MovieDetailSkeleton'
import RequireLocation from '@/routes/RequireLocation'
import ProtectedRoute from '@/routes/ProtectedRoute'
import { RegisterPage } from '@/pages/RegisterPage'
import { LoginPage } from '@/pages/LoginPage'
import { bookingApi } from '@/features/reservations'
import { useAuthStore } from '@/store'

function ProfilePage() {
  const user = useAuthStore((state) => state.user)
  const ordersQuery = useQuery({
    queryKey: ['profile-orders', user?.id],
    queryFn: () => bookingApi.getOrdersByUser(user?.id ?? ''),
    enabled: Boolean(user?.id),
  })

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Mi cuenta</p>
            <h1 className="mt-2 font-heading text-3xl font-bold">{user?.fullName ?? 'Usuario'}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <Link to="/" className="text-sm font-semibold text-primary hover:underline">Volver al inicio</Link>
        </header>

        <section className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="font-heading text-xl font-bold">Mis compras</h2>
          {ordersQuery.isLoading && <p className="mt-4 text-sm text-muted-foreground">Cargando compras...</p>}
          {ordersQuery.isError && <p className="mt-4 text-sm text-destructive">No pudimos cargar tus compras.</p>}
          {!ordersQuery.isLoading && !ordersQuery.isError && ordersQuery.data?.length === 0 && (
            <p className="mt-4 text-sm text-muted-foreground">Todavía no tienes compras registradas.</p>
          )}
          <div className="mt-4 grid gap-3">
            {ordersQuery.data?.map((order) => (
              <article key={order.id} className="flex flex-col justify-between gap-3 rounded-xl border p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="font-semibold">Orden {order.id}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString('es-CO')}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-semibold">${order.total.toLocaleString('es-CO')}</p>
                  <p className="text-xs uppercase text-primary">{order.status}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

const Details = lazy(() => import('@/features/details/Details'))
const PurchasePage = lazy(() => import('@/features/checkout/pages/PurchasePage'))

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
          path="/purchase/:id"
          element={
            <ProtectedRoute>
              <Suspense fallback={<MovieDetailSkeleton />}>
                <PurchasePage />
              </Suspense>
            </ProtectedRoute>
          }
        />
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
