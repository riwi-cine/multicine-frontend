import Reveal from '@/reutilizables/components/Reveal'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/utils/cn'
import MovieArtwork from '@/features/movies/components/MovieArtwork'
import type { Movie } from '@/features/movies/data/movies.mock'

interface MovieCardProps {
  movie: Movie
  actionLabel: string
  meta?: string
  index?: number
  className?: string
}

export default function MovieCard({
  movie,
  actionLabel,
  meta,
  index = 0,
  className,
}: MovieCardProps) {
  return (
    <Reveal
      delay={Math.min(index * 60, 360)}
      className={cn('flex h-full flex-col', className)}
    >
      <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
        <div className="relative aspect-[2/3] overflow-hidden">
          <MovieArtwork
            palette={movie.palette}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <Badge className="absolute top-3 left-3 border border-white/10 bg-black/40 text-white/80 backdrop-blur-md">
            {movie.rating}
          </Badge>
        </div>

        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <h3 className="font-heading text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {movie.title}
          </h3>
          <p className="font-mono text-xs text-muted-foreground">
            {meta ?? `${movie.genres[0]} · ${movie.duration}`}
          </p>
          <a
            href="#"
            className="mt-auto pt-3 text-sm font-medium text-primary hover:underline"
          >
            {actionLabel}
          </a>
        </div>
      </div>
    </Reveal>
  )
}
