import Reveal from '@/components/reveal'
import type { Movie } from '@/features/movies/data/movies.mock'
import MovieCard from './MovieCard'

interface ComingSoonGridProps {
  movies: Movie[]
  title: string
  id?: string
}

export default function ComingSoonGrid({ movies, title, id }: ComingSoonGridProps) {
  return (
    <section id={id} className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
