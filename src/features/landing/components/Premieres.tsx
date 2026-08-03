import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { premieres } from '../data/movies'
import MovieCard from './MovieCard'
import SectionHeading from './SectionHeading'

function Premieres() {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({
      left: direction * Math.round(track.clientWidth * 0.75),
      behavior: 'smooth',
    })
  }

  return (
    <section id="estrenos" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Lo nuevo"
            title="Estrenos Destacados"
            description="Los títulos que acaban de aterrizar en las salas de Multicine."
          />
          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Ver estrenos anteriores"
              onClick={() => scrollBy(-1)}
              className="rounded-full border-white/15 bg-white/5 text-white hover:border-ocean-400/60 hover:bg-ocean-500/15 hover:text-white"
            >
              <ChevronLeft />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Ver próximos estrenos"
              onClick={() => scrollBy(1)}
              className="rounded-full border-white/15 bg-white/5 text-white hover:border-ocean-400/60 hover:bg-ocean-500/15 hover:text-white"
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scroll-smooth sm:px-6 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]"
      >
        {premieres.map((movie, index) => (
          <div key={movie.id} className="w-52 shrink-0 snap-start sm:w-60">
            <MovieCard movie={movie} index={index} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Premieres
