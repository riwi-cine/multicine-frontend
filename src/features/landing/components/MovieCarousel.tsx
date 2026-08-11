import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/button'
import Reveal from '@/reutilizables/components/Reveal'
import type { Movie } from '@/features/movies/data/movies.mock'
import MovieCard from './MovieCard'

interface MovieCarouselProps {
  movies: Movie[]
  title: string
  id?: string
}

export default function MovieCarousel({
  movies,
  title,
  id,
}: MovieCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollByCard = (direction: 'left' | 'right') => {
    const node = trackRef.current

    if (!node) return

    const card = node.querySelector<HTMLElement>('[data-card]')
    const step = (card?.offsetWidth ?? 240) + 24

    node.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    })
  }

  return (
    <section id={id} className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </Reveal>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="
            scrollbar-none
            flex
            gap-4
            overflow-x-auto
            scroll-smooth
            px-4
            pb-4
            sm:gap-6
            sm:px-6
            lg:px-8
          "
        >
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              data-card
              className="
                w-[72vw]
                max-w-[280px]
                shrink-0
                sm:w-[30vw]
                sm:max-w-[280px]
                lg:w-[21vw]
                lg:max-w-[280px]
              "
            >
              <MovieCard
                movie={movie}
                actionLabel="Ver funciones"
                index={index}
              />
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Anterior"
          onClick={() => scrollByCard('left')}
          className="
            absolute
            left-1
            top-1/2
            hidden
            -translate-y-1/2
            bg-background/80
            backdrop-blur-md
            sm:flex
          "
        >
          <ChevronLeft />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-label="Siguiente"
          onClick={() => scrollByCard('right')}
          className="
            absolute
            right-1
            top-1/2
            hidden
            -translate-y-1/2
            bg-background/80
            backdrop-blur-md
            sm:flex
          "
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  )
}