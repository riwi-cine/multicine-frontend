import { useState } from 'react'
import Reveal from '@/components/reveal'
import type { Movie } from '@/features/movies/data/movies.mock'
import MovieCard from './MovieCard'

interface ComingSoonGridProps {
  movies: Movie[]
  title: string
  id?: string
}

export default function ComingSoonGrid({ movies, title, id }: ComingSoonGridProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <section
  id={id}
  onMouseMove={handleMouseMove}
  className="relative w-full overflow-hidden bg-[#E3E7EF] py-20 sm:py-28"
>
      {/* Micro-Grilla interactiva visible únicamente mediante máscara radial alrededor del cursor */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          backgroundImage: `radial-gradient(rgba(15, 23, 42, 0.16) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`,
          maskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black 20%, transparent 100%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </Reveal>

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
      </div>
    </section>
  )
}