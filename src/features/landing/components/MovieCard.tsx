import { memo } from 'react'
import Reveal from '@/components/reveal'
import { Badge } from '@/components/badge'
import { cn } from '@/utils/cn'
import { MovieArtwork } from '@/features/movies'
import type { Movie } from '@/features/movies'

type MovieCardProps = {
  movie: Movie
  actionLabel: string
  meta?: string
  index?: number
}

function MovieCard({
  movie,
  actionLabel,
  index = 0,
}: MovieCardProps) {
  // Defensive safeguards: if the record is incomplete (missing data
  // from the backend, a malformed mock, etc.), we display a fallback value
  // instead of letting the entire card fail to render.
  const title = movie?.title ?? 'Título no disponible'
  const genres = movie?.genres ?? []
  const rating = movie?.rating ?? 'N/A'
  const duration = movie?.duration ?? '—'
  const score = typeof movie?.score === 'number' ? movie.score : null
  const description = movie?.description ?? 'Sinopsis no disponible.'
  const format = movie?.format ?? 'Formato no disponible'

  if (!movie) return null

  return (
    <Reveal
      delay={Math.min(index * 60, 360)}
      className={cn('group h-full shrink-0')}
    >
      <div
        className={cn(
          'relative rounded-2xl bg-linear-to-br from-primary via-accent to-secondary p-2px',
          'transition-all duration-300 ease-out',
          'hover:shadow-[0_0_28px_-6px_var(--accent)]',
        )}
      >
        <div className="overflow-hidden rounded-[calc(var(--radius-xl)-2px)] bg-card">
          {/* Poster */}
          <div className="relative aspect-2/3 overflow-hidden">
            <MovieArtwork
              palette={movie.palette}
              image={movie.image}
              className="transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />

            <Badge className="absolute top-3 left-3 border border-white/15 bg-black/40 text-white backdrop-blur-md">
              {rating}
            </Badge>
          </div>

          {/* Información desplegable */}
          <div
            className={cn(
              'grid grid-rows-[0fr] opacity-0',
              'transition-all duration-400 ease-out',
              'group-hover:grid-rows-[1fr] group-hover:opacity-100',
            )}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-3 px-4 py-4">
                {/* Título */}
                <div>
                  <h3 className="font-heading text-base font-bold leading-tight tracking-tight text-foreground">
                    {title}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {genres.length > 0 ? genres.join(' · ') : 'Sin género'}
                  </p>
                </div>

                {/* Datos principales */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 font-medium text-foreground">
                    {rating}
                  </span>

                  <span className="text-muted-foreground">{duration}</span>

                  <span className="font-semibold text-foreground">
                    ★ {score !== null ? score.toFixed(1) : 'N/A'}
                  </span>
                </div>

                {/* Sinopsis */}
                <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                  {description}
                </p>

                {/* Formato */}
                <div className="flex items-center justify-between gap-2 border-t border-border/60 pt-3">
                  <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                    Formato
                  </span>

                  <span className="text-right text-xs font-medium text-foreground">
                    {format}
                  </span>
                </div>

                {/* Acción */}
                <a
                  href="#"
                  className={cn(
                    'mt-1 inline-flex w-full items-center justify-center rounded-lg',
                    'bg-primary px-3 py-2.5',
                    'text-xs font-semibold text-primary-foreground',
                    'transition-all duration-200',
                    'hover:bg-secondary hover:shadow-md',
                  )}
                >
                  {actionLabel}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default memo(MovieCard, (prev, next) => {
  return (
    prev.movie?.id === next.movie?.id &&
    prev.index === next.index &&
    prev.actionLabel === next.actionLabel
  )
})