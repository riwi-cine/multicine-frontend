import Reveal from '@/components/reveal'
import { Badge } from '@/components/badge'
import { cn } from '@/utils/cn'
import MovieArtwork from '@/features/movies/components/MovieArtwork'
import type { Movie } from '@/features/movies/data/movies.mock'

type MovieCardVariant = 'side' | 'active'

interface MovieCardProps {
  movie: Movie
  actionLabel: string
  meta?: string
  index?: number
  className?: string
  variant?: MovieCardVariant
}

const variantStyles = {
  side: {
    info: 'max-h-0 overflow-hidden opacity-0 py-0',
  },
  active: {
    info: 'max-h-40 opacity-100',
  },
}

export default function MovieCard({
  movie,
  actionLabel,
  meta,
  index = 0,
  className,
  variant = 'side',
}: MovieCardProps) {
  const styles = variantStyles[variant]

  return (
    <Reveal
      delay={Math.min(index * 60, 360)}
      className={cn(
    'flex h-full shrink-0 flex-col transition-all duration-500 ease-out',
    className,
  )}
    >
      <div
        className={cn(
          'group h-full rounded-2xl bg-linear-to-br from-primary via-accent to-secondary p-[2px]',
          'transition-all duration-500 ease-out',
          'hover:shadow-[0_0_28px_-6px_var(--accent)]',
        )}
      >
        <div className="flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-xl)-2px)] bg-card">
          {/* Poster */}
          <div className="relative aspect-[2/3] overflow-hidden">
            <MovieArtwork
              palette={movie.palette}
              image={movie.image}
              className="transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            <Badge className="absolute top-3 left-3 border border-white/15 bg-black/40 text-white backdrop-blur-md">
              {movie.rating}
            </Badge>
          </div>

          {/* Información */}
          <div
            className={cn(
              'flex flex-1 flex-col gap-1.5 px-4 transition-all duration-500',
              styles.info,
            )}
          >
            <h3 className="font-heading text-base font-semibold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
              {movie.title}
            </h3>

            <p className="font-mono text-xs text-muted-foreground">
              {meta ?? `${movie.genres[0] || 'Género'} · ${movie.duration}`}
            </p>

            <a
              href="#"
              className="mt-auto pt-3 text-sm font-medium text-primary transition-colors hover:text-secondary hover:underline"
            >
              {actionLabel}
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}