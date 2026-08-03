import { useState } from 'react'
import { Calendar, Heart } from 'lucide-react'
import { toast } from 'sonner'

import Reveal from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import { comingSoon } from '../data/movies'
import MovieArtwork from './MovieArtwork'
import SectionHeading from './SectionHeading'

function ComingSoon() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (id: string, title: string) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
        toast.info(`${title} se eliminó de tus favoritos`)
      } else {
        next.add(id)
        toast.success(`${title} agregado a favoritos`)
      }
      return next
    })
  }

  return (
    <section id="proximos" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Próximamente"
          title="Próximos Estrenos"
          description="Guarda las fechas de los lanzamientos que se vienen. Agrega tus favoritos y sé el primero en verlos."
        />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-6">
          {comingSoon.map((movie, index) => {
            const isFavorite = favorites.has(movie.id)
            return (
              <Reveal key={movie.id} delay={index * 70}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-lg hover:shadow-black/40">
                  <div className="relative aspect-[2/3] overflow-hidden">
                    <MovieArtwork
                      palette={movie.palette}
                      className="transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute top-3 left-3 flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/40 px-2 py-1 font-mono text-[0.65rem] tracking-wider text-teal-300 backdrop-blur-md">
                      <Calendar className="size-3" />
                      {movie.releaseDate}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-1.5 p-3.5">
                    <h3 className="font-heading text-sm font-semibold tracking-tight text-white">
                      {movie.title}
                    </h3>
                    <p className="font-mono text-[0.65rem] tracking-wide text-muted-foreground uppercase">
                      {movie.genres.join(' · ')}
                    </p>
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => toggleFavorite(movie.id, movie.title)}
                      className={cn(
                        'mt-2 w-full rounded-lg transition-colors',
                        isFavorite
                          ? 'bg-coral-500 text-white hover:bg-coral-600'
                          : 'border-white/15 bg-white/5 text-white hover:bg-white/10',
                      )}
                    >
                      <Heart
                        className={cn(
                          'transition-transform duration-300',
                          isFavorite && 'scale-110 fill-current',
                        )}
                      />
                      {isFavorite ? 'En favoritos' : 'Agregar a favoritos'}
                    </Button>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ComingSoon
