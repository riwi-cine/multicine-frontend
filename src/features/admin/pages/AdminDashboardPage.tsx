import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import { apiClient } from '@/api'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { moviesApi } from '@/features/movies'
import type { Movie } from '@/features/movies'
import { promotionApi } from '@/features/promotions'

type AdminPromotion = {
  id: string
  title: string
  description: string
  code?: string
  discount?: number
  active?: boolean
}

export default function AdminDashboardPage() {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')

  const moviesQuery = useQuery({
    queryKey: ['admin-movies'],
    queryFn: () => moviesApi.getAll(),
  })
  const promotionsQuery = useQuery({
    queryKey: ['admin-promotions'],
    queryFn: async () => (await promotionApi.getAll()) as AdminPromotion[],
  })
  const createMovie = useMutation({
    mutationFn: (movieTitle: string) => apiClient.post<Movie>('/movies', {
      title: movieTitle,
      genres: [],
      duration: 'Por definir',
      rating: 'NR',
      score: 0,
      description: '',
      status: 'Coming Soon',
      format: '2D',
      image: '',
      palette: { from: '#111827', to: '#374151', glow: '#9ca3af' },
    }),
    onSuccess: () => {
      setTitle('')
      queryClient.invalidateQueries({ queryKey: ['admin-movies'] })
    },
  })
  const createPromotion = useMutation({
    mutationFn: (promotion: Omit<AdminPromotion, 'id' | 'active'>) =>
      apiClient.post<AdminPromotion>('/promotions', { ...promotion, active: true }),
    onSuccess: () => {
      setEmail('')
      queryClient.invalidateQueries({ queryKey: ['admin-promotions'] })
    },
  })

  return (
    <main className="min-h-screen bg-background px-4 py-10 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Administración</p>
            <h1 className="mt-2 font-heading text-3xl font-bold">Operación del cine</h1>
            <p className="mt-1 text-sm text-muted-foreground">Gestiona cartelera y promociones desde el backend local.</p>
          </div>
          <Link to="/" className="text-sm font-semibold text-primary hover:underline">Volver al sitio</Link>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold">Películas</h2>
            <div className="mt-4 flex gap-2">
              <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Título de película" />
              <Button disabled={!title.trim() || createMovie.isPending} onClick={() => createMovie.mutate(title.trim())}>Agregar</Button>
            </div>
            <div className="mt-5 space-y-2">
              {moviesQuery.data?.map((movie) => (
                <div key={movie.id} className="flex items-center justify-between rounded-xl border p-3 text-sm">
                  <span className="font-medium">{movie.title}</span>
                  <span className="text-xs text-muted-foreground">{movie.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold">Promociones</h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
              <Input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Código promocional" />
              <Button disabled={!email.trim() || createPromotion.isPending} onClick={() => createPromotion.mutate({ title: 'Nueva promoción', description: 'Promoción creada desde administración.', code: email.trim().toUpperCase(), discount: 10 })}>Crear 10%</Button>
            </div>
            <div className="mt-5 space-y-2">
              {promotionsQuery.data?.map((promotion) => (
                <div key={promotion.id} className="flex items-center justify-between rounded-xl border p-3 text-sm">
                  <span className="font-medium">{promotion.title}</span>
                  <span className="text-xs text-muted-foreground">{promotion.discount ?? 0}%</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
