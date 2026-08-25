import { Ticket } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/button'
import Reveal from '@/components/reveal'
import type { Movie } from '@/features/movies'
import { MovieArtwork } from '@/features/movies'
import TrailerDialog from './TrailerDialog'

const FEATURED_YEAR = 2026
const FALLBACK_TRAILER = 'https://www.youtube.com/embed/62bIsvRcPv0'

interface HeroProps {
  movie?: Movie
}

export default function Hero({ movie }: HeroProps) {
  const navigate = useNavigate()

  if (!movie) return null
  return (
    <section
      id="inicio"
      className="relative isolate min-h-125 overflow-hidden pt-16 sm:min-h-150 lg:min-h-170"
    >
      {/* Imagen de fondo */}
      <div className="absolute inset-0 -z-20">
        <MovieArtwork
          palette={movie.palette}
          image={movie.image}
          variant="backdrop"
          className="h-full w-full"
        />
      </div>

      {/* Overlay cinematográfico */}
      <div
        className="
          absolute inset-0 -z-10
          bg-linear-to-r
          from-black/80
          via-black/55
          to-black/15
        "
      />

      {/* Degradado inferior */}
      <div
        className="
          absolute inset-x-0 bottom-0 -z-10
          h-48
          bg-linear-to-t
          from-black/45
          to-transparent
        "
      />

      {/* Contenido */}
      <div
        className="
          mx-auto flex min-h-125
          max-w-7xl items-center
          px-4 py-20
          sm:min-h-150 sm:px-6 sm:py-28
          lg:min-h-170 lg:px-8
        "
      >
        <div className="flex max-w-2xl flex-col gap-5">
          <Reveal>
            <h1
              className="
                font-heading
                text-4xl font-bold
                leading-tight tracking-tighter
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
               {movie.title}
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-mono text-sm text-white/75">
              {FEATURED_YEAR} · {movie.genres[0] || 'Género'} ·{' '}
              {movie.duration}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              {movie.description}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button
                size="lg"
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="
                  h-12 rounded-xl px-7
                  bg-linear-to-r
                  from-[#800021]
                  to-[#C24366]
                  text-base text-white
                  shadow-lg
                  shadow-[#C24366]/25
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  hover:shadow-[#C24366]/35
                "
              >
                <Ticket data-icon="inline-start" />
                Ver funciones
              </Button>

              <TrailerDialog
                trailerUrl={movie.trailerUrl ?? FALLBACK_TRAILER}
                movieTitle={movie.title}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}