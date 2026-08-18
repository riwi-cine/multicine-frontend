import { Star, Ticket } from 'lucide-react'

import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import Reveal from '@/components/reveal'
import MovieArtwork from '@/features/movies/components/MovieArtwork'
import type { Movie } from '@/features/movies/data/movies.mock'
import MovieCard from './MovieCard'
import TrailerDialog from './TrailerDialog'

interface FeaturedMoviesProps {
  movies: Movie[]
  title: string
  description?: string
  id?: string
}

export default function FeaturedMovies({
  movies,
  title,
  description,
  id,
}: FeaturedMoviesProps) {
  const [featured, ...rest] = movies

  if (!featured) return null

  return (
    <section id={id} className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 flex flex-col gap-3">
          <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.28em] text-muted-foreground uppercase">
            <span className="h-px w-6 bg-border" aria-hidden="true" />
            Lo más visto
          </span>

          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>

          {description && (
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          )}
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Película destacada */}
          <Reveal className="h-full lg:col-span-3">
            <article className="group relative flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl border border-white/5 bg-card lg:min-h-[560px]">
              <div className="absolute inset-0">
                <MovieArtwork
                  palette={featured.palette}
                  image={featured.image}
                  variant="backdrop"
                  className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10" />

              <div className="relative flex flex-col gap-3 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="border border-white/15 bg-black/40 text-white backdrop-blur-md">
                    {featured.rating}
                  </Badge>

                  <Badge className="border border-white/15 bg-black/40 text-white backdrop-blur-md">
                    <Star
                      data-icon="inline-start"
                      className="fill-amber-400 text-amber-400"
                    />
                    {featured.score.toFixed(1)}
                  </Badge>
                </div>

                <h3 className="font-heading text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {featured.title}
                </h3>

                <p className="font-mono text-xs text-white/70">
                  {featured.genres[0] || 'Género'} · {featured.duration} ·{' '}
                  {featured.format}
                </p>

                <p className="line-clamp-3 max-w-md text-sm leading-relaxed text-white/80">
                  {featured.description}
                </p>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button
                    size="lg"
                    className="
                      h-12 rounded-xl px-7
                      bg-gradient-to-r from-[#800021] to-[#C24366]
                      text-base text-white
                      shadow-lg shadow-[#C24366]/25
                      transition-all duration-300
                      hover:-translate-y-0.5
                      hover:shadow-xl hover:shadow-[#C24366]/35
                    "
                  >
                    <Ticket data-icon="inline-start" />
                    Ver funciones
                  </Button>

                  {featured.trailerUrl && (
                    <TrailerDialog
                      trailerUrl={featured.trailerUrl}
                      movieTitle={featured.title}
                    />
                  )}
                </div>
              </div>
            </article>
          </Reveal>

          {/* Resto de destacadas */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-2">
            {rest.map((movie, index) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                actionLabel="Ver funciones"
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
