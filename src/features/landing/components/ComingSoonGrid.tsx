import { useRef } from 'react'
import Reveal from '@/components/reveal'
import type { Movie } from '@/features/movies'
import MovieCard from './MovieCard'
import MovieCardSkeleton from './MovieCardSkeleton'
import CarteleraEmptyState from './CarteleraEmptyState'

interface ComingSoonGridProps {
  movies: Movie[]
  title: string
  id?: string
  isLoading?: boolean
  isError?: boolean
}

export default function ComingSoonGrid({
  movies,
  title,
  id,
  isLoading = false,
  isError = false,
}: ComingSoonGridProps) {
  // La máscara radial se muta directamente sobre el nodo (sin estado):
  // el mousemove ya no dispara re-renders del grid completo.
  const gridRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const grid = gridRef.current
    if (!grid) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const mask = `radial-gradient(300px circle at ${x}px ${y}px, black 20%, transparent 100%)`

    grid.style.setProperty('-webkit-mask-image', mask)
    grid.style.setProperty('mask-image', mask)
  }

  return (
    <section
      id={id}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-[#E3E7EF] py-20 sm:py-28"
    >
      {/* Micro-Grilla interactiva visible únicamente mediante máscara radial alrededor del cursor */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.16) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </Reveal>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <CarteleraEmptyState message="No pudimos cargar los próximos estrenos. Verifica tu conexión e intenta de nuevo." />
        ) : movies.length === 0 ? (
          <CarteleraEmptyState message="Por ahora no hay estrenos programados. Vuelve pronto." />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {movies.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                actionLabel="Ver más"
                meta={movie.releaseDate ? `Estreno: ${movie.releaseDate}` : undefined}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}