import { useCallback, useEffect, useMemo, useState } from 'react'

import Reveal from '@/reutilizables/components/Reveal'
import type { Movie } from '@/features/movies/data/movies.mock'
import MovieCard from './MovieCard'

interface MovieCarouselProps {
  movies: Movie[]
  title: string
  id?: string
}

const AUTO_PLAY_INTERVAL = 3500

// Ancho base de la card
const CARD_WIDTH = 240

// Relación de aspecto de un póster estándar (2:3)
const POSTER_RATIO = 3 / 2

// Espacio reservado para la información de la card activa
const DETAIL_PANEL_HEIGHT = 110

// Altura total del escenario del carrusel
const STAGE_HEIGHT =
  CARD_WIDTH * POSTER_RATIO + DETAIL_PANEL_HEIGHT

// Distancia horizontal desde el centro
const POSITION_DISTANCE = {
  1: 280,
  2: 500,
  3: 680,
}

const POSITION_SCALE = {
  0: 1,
  1: 0.82,
  2: 0.66,
  3: 0.52,
}

const POSITION_OPACITY = {
  0: 1,
  1: 0.85,
  2: 0.65,
  3: 0.4,
}

export default function MovieCarousel({
  movies,
  title,
  id,
}: MovieCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const totalMovies = movies.length

  const visibleMovies = useMemo(() => {
    if (!totalMovies) return []

    return movies
      .map((movie, index) => {
        let relativePosition = index - activeIndex
        const half = Math.floor(totalMovies / 2)

        if (relativePosition > half) {
          relativePosition -= totalMovies
        }

        if (relativePosition < -half) {
          relativePosition += totalMovies
        }

        return {
          movie,
          index,
          relativePosition,
        }
      })
      .filter(
        ({ relativePosition }) => Math.abs(relativePosition) <= 3,
      )
  }, [movies, activeIndex, totalMovies])

  const goToMovie = useCallback(
    (index: number) => {
      if (!totalMovies) return

      setActiveIndex((index + totalMovies) % totalMovies)
    },
    [totalMovies],
  )

  const goNext = useCallback(() => {
    if (!totalMovies) return

    setActiveIndex((current) => (current + 1) % totalMovies)
  }, [totalMovies])

  useEffect(() => {
    if (totalMovies <= 1 || isPaused) return

    const interval = window.setInterval(
      goNext,
      AUTO_PLAY_INTERVAL,
    )

    return () => window.clearInterval(interval)
  }, [goNext, isPaused, totalMovies])

  if (!movies.length) return null

  return (
    <section
      id={id}
      className="relative z-30 w-full py-10 sm:py-12"
    >
      {/* Título */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative z-40 mb-6">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </Reveal>
      </div>

      {/* Viewport del carrusel */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false)
          setHoveredIndex(null)
        }}
      >
        {/* Escenario */}
        <div
          className="relative w-full"
          style={{ height: `${STAGE_HEIGHT}px` }}
        >
          {visibleMovies.map(
            ({ movie, index, relativePosition }) => {
              const absolutePosition = Math.abs(relativePosition)
              const isActive = relativePosition === 0
              const isHovered = hoveredIndex === index

              const distance =
                absolutePosition === 0
                  ? 0
                  : POSITION_DISTANCE[
                      absolutePosition as keyof typeof POSITION_DISTANCE
                    ]

              const direction =
                relativePosition < 0 ? -1 : 1

              const scale =
                POSITION_SCALE[
                  absolutePosition as keyof typeof POSITION_SCALE
                ]

              const opacity =
                POSITION_OPACITY[
                  absolutePosition as keyof typeof POSITION_OPACITY
                ]

              const hoverScale =
                isHovered && !isActive
                  ? scale + 0.06
                  : scale

              return (
                <div
                  key={movie.id}
                  className="
                    absolute
                    left-1/2
                    top-0
                    w-55
                    -translate-x-1/2
                    cursor-pointer
                    transition-all
                    duration-700
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    sm:w-57.5
                    lg:w-60
                  "
                  style={{
                    transform: `translate(calc(-50% + ${
                      direction * distance
                    }px), 0) scale(${hoverScale})`,
                    opacity,
                    zIndex: isActive
                      ? 30
                      : isHovered
                        ? 20
                        : 10 - absolutePosition,
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onClick={() => goToMovie(index)}
                >
                  <MovieCard
                    movie={movie}
                    actionLabel="Ver funciones"
                    index={index}
                    variant={isActive ? 'active' : 'side'}
                  />
                </div>
              )
            },
          )}
        </div>
      </div>
    </section>
  )
}