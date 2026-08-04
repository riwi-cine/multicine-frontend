import { Clock, Star } from 'lucide-react'

import Reveal from '@/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'
import type { Movie, MovieStatus } from '../data/movies'
import MovieArtwork from './MovieArtwork'

const STATUS_STYLES: Record<MovieStatus, string> = {
  Premiere: 'bg-coral-500 text-white',
  Today: 'bg-ocean-500 text-white',
  'Coming Soon': 'bg-white/10 text-white/80 backdrop-blur-md',
}

interface MovieCardProps {
  movie: Movie
  className?: string
  index?: number
  showScore?: boolean
}

function MovieCard({
  movie,
  className,
  index = 0,
  showScore = true,
}: MovieCardProps) {
  return (
    <Reveal delay={Math.min(index * 70, 420)} className={className}>
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-xl hover:shadow-black/40">
        <div className="relative aspect-[2/3] overflow-hidden">
          <MovieArtwork
            palette={movie.palette}
            className="transition-transform duration-500 ease-out group-hover:scale-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/5 to-black/25 opacity-60 transition-opacity duration-300 group-hover:opacity-95"
            aria-hidden="true"
          />

          <Badge
            className={cn(
              'absolute top-3 left-3 font-mono tracking-wider uppercase',
              STATUS_STYLES[movie.status],
            )}
          >
            {movie.status}
          </Badge>

          {showScore && (
            <span className="absolute top-3 right-3 flex items-center gap-1 rounded-lg border border-white/15 bg-black/40 px-2 py-1 font-mono text-xs text-coral-300 backdrop-blur-md">
              <Star className="size-3 fill-current" />
              {movie.score.toFixed(1)}
            </span>
          )}

          <div className="absolute inset-x-0 bottom-0 translate-y-4 p-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <p className="line-clamp-3 text-xs leading-relaxed text-white/85">
              {movie.description}
            </p>
            <Button size="sm" className="mt-3 w-full rounded-lg">
              View details
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="font-heading text-base font-semibold tracking-tight text-white transition-colors group-hover:text-coral-300">
            {movie.title}
          </h3>
          <p className="font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            {movie.genres.join(' · ')}
          </p>
          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
            <span className="flex items-center gap-1.5 font-mono text-xs text-white/75">
              <Clock className="size-3.5 text-ocean-400" />
              {movie.duration}
            </span>
            <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[0.65rem] text-white/70">
              {movie.rating}
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default MovieCard
