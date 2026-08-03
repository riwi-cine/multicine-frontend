import { ArrowUpRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { nowShowing } from '../data/movies'
import MovieCard from './MovieCard'
import SectionHeading from './SectionHeading'

function NowShowing() {
  return (
    <section id="cartelera" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Ahora en salas"
            title="En Cartelera"
            description="Las historias que están brillando en las pantallas de Multicine esta semana. Elige tu función y vive el océano en grande."
          />
          <Button
            variant="outline"
            className="hidden shrink-0 rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            Ver cartelera completa
            <ArrowUpRight data-icon="inline-end" />
          </Button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {nowShowing.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default NowShowing
