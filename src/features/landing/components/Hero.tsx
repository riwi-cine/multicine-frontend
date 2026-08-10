import { Play, Ticket } from 'lucide-react'

import Reveal from '@/reutilizables/components/Reveal'
import { Button } from '@/components/ui/button'
import MovieArtwork from '@/features/movies/components/MovieArtwork'
import { featuredMovie } from '@/features/movies/data/movies.mock'

const FEATURED_YEAR = 2026

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 -z-10 bg-background" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="flex flex-col gap-5">
          <Reveal>
            <h1 className="font-heading text-4xl font-bold tracking-tighter text-foreground sm:text-5xl lg:text-6xl leading-tight">
              {featuredMovie.title}
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <p className="font-mono text-sm text-muted-foreground">
              {FEATURED_YEAR} · {featuredMovie.genres[0]} · {featuredMovie.duration}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              {featuredMovie.description}
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button size="lg" className="h-12 rounded-xl px-7 text-base">
                <Ticket data-icon="inline-start" />
                Ver funciones
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="h-12 rounded-xl px-7 text-base text-foreground"
              >
                <Play data-icon="inline-start" className="fill-current" />
                Ver tráiler
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160} className="overflow-hidden rounded-2xl border border-white/5">
          <div className="aspect-[4/3] lg:aspect-square">
            <MovieArtwork palette={featuredMovie.palette} variant="backdrop" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
