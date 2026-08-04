import { ChevronDown, Clock, Play, Star, Ticket } from 'lucide-react'

import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { featuredMovie } from '../data/movies'
import MovieArtwork from './MovieArtwork'

function Hero() {
  const movie = featuredMovie

  return (
    <section
      id="home"
      className="relative isolate flex min-h-svh items-end overflow-hidden pb-24 pt-32 lg:items-center lg:pb-28"
    >
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <MovieArtwork variant="backdrop" palette={movie.palette} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-background/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/35 to-transparent" />
        <div className="absolute -left-24 top-1/3 size-96 rounded-full bg-ocean-500/25 blur-3xl animate-pulse-glow" />
        <div className="absolute top-24 right-8 size-72 rounded-full bg-coral-500/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-10 left-1/3 size-64 rounded-full bg-teal-500/15 blur-3xl animate-drift" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="gap-1.5 border-white/15 bg-white/5 text-coral-300 [&>svg]:size-3">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-coral-400" />
                </span>
                THIS WEEK'S PREMIERE
              </Badge>
              <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground uppercase">
                IN THEATERS · {movie.format}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-5 font-heading text-4xl font-bold tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
              {movie.title}
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {movie.description}
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 font-mono text-sm text-coral-400">
                <Star className="size-4 fill-current" />
                {movie.score.toFixed(1)}
              </span>
              <span className="font-mono text-xs text-muted-foreground">·</span>
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/80"
                >
                  {genre}
                </span>
              ))}
              <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-ocean-300">
                {movie.rating}
              </span>
              <span className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-white/80">
                <Clock className="size-3.5" />
                {movie.duration}
              </span>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="group relative h-12 overflow-hidden rounded-xl px-7 text-base shadow-glow-coral hover:scale-[1.03] active:scale-[0.99]"
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  aria-hidden="true"
                />
                <Ticket data-icon="inline-start" />
                Buy tickets
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-xl border-white/20 bg-white/5 px-7 text-base text-white backdrop-blur-md hover:border-ocean-400/60 hover:bg-ocean-500/15 hover:text-white"
              >
                <Play data-icon="inline-start" className="fill-current" />
                Watch trailer
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      <a
        href="#showtimes"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-white sm:flex"
      >
        <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase">
          Discover showtimes
        </span>
        <ChevronDown className="size-4 animate-bob" />
      </a>
    </section>
  )
}

export default Hero
