import { Search } from 'lucide-react'
import { memo, useMemo } from 'react'

import { Input } from '@/components/input'
import { cn } from '@/utils/cn'
import type { Movie } from '@/features/movies/data/movies.mock'

const CLASSIFICATIONS = ['G', 'PG', 'PG-13', 'R']

interface CarteleraFiltersProps {
  movies: Movie[]
  genre: string | null
  classification: string | null
  search: string
  onGenreChange: (genre: string | null) => void
  onClassificationChange: (classification: string | null) => void
  onSearchChange: (search: string) => void
}

function CarteleraFilters({
  movies,
  genre,
  classification,
  search,
  onGenreChange,
  onClassificationChange,
  onSearchChange,
}: CarteleraFiltersProps) {
  const allGenres = useMemo(() => {
    const safeMovies = movies ?? []
    const set = new Set<string>()
    safeMovies.forEach((movie) => (movie?.genres ?? []).forEach((g) => set.add(g)))
    return Array.from(set).sort()
  }, [movies])

  const hasActiveFilters = genre !== null || classification !== null || search !== ''

  return (
    <div className="mb-8 flex flex-col gap-4">
      <div className="relative max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar película por nombre..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Género
        </span>
        {allGenres.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => onGenreChange(genre === g ? null : g)}
            className={cn(
              'rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors',
              genre === g
                ? 'border-primary bg-primary/15 text-primary'
                : 'border-border bg-background text-muted-foreground hover:bg-muted',
            )}
          >
            {g}
          </button>
        ))}

        <span className="mx-2 h-5 w-px bg-border" aria-hidden="true" />

        <span className="mr-1 font-mono text-xs tracking-wider text-muted-foreground uppercase">
          Clasificación
        </span>
        {CLASSIFICATIONS.map((rating) => (
          <button
            key={rating}
            type="button"
            onClick={() =>
              onClassificationChange(classification === rating ? null : rating)
            }
            className={cn(
              'rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors',
              classification === rating
                ? 'border-primary bg-primary/15 text-primary'
                : 'border-border bg-background text-muted-foreground hover:bg-muted',
            )}
          >
            {rating}
          </button>
        ))}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              onGenreChange(null)
              onClassificationChange(null)
              onSearchChange('')
            }}
            className="ml-1 font-mono text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  )
}

export default memo(CarteleraFilters)