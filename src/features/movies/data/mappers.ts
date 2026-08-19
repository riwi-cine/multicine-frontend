import type { Movie, MoviePalette, MovieStatus } from './movies.mock'

export interface MockMovie {
  id: number
  title: string
  genre: string
  classification: string
  language: string
  duration: number
  synopsis: string
  posterUrl: string
  rating: number
}

const formatDuration = (minutes: number): string => {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}min` : `${m}min`
}

const genrePalettes: Record<string, MoviePalette> = {
  Acción: { from: '#0f172a', to: '#7c3aed', glow: '#a78bfa' },
  Animación: { from: '#1e002b', to: '#ec4899', glow: '#f9a8d4' },
  'Ciencia Ficción': { from: '#020617', to: '#0ea5e9', glow: '#38bdf8' },
  Drama: { from: '#29110a', to: '#f97316', glow: '#fb9202' },
  Terror: { from: '#160909', to: '#ef4444', glow: '#f87171' },
  Comedia: { from: '#1a2a03', to: '#eab308', glow: '#facc15' },
  Aventura: { from: '#0c263b', to: '#1d9bf0', glow: '#60a5fa' },
  Fantasía: { from: '#130a26', to: '#8b5cf6', glow: '#c084fc' },
  Thriller: { from: '#0f0a1a', to: '#f59e0a', glow: '#fbbf24' },
  Crimen: { from: '#08090d', to: '#dc2626', glow: '#ef4444' },
}

const defaultPalette: MoviePalette = {
  from: '#0f172a',
  to: '#475569',
  glow: '#94a3b8',
}

const resolvePalette = (genre: string): MoviePalette =>
  genrePalettes[genre] ?? defaultPalette

const resolveStatus = (rating: number): MovieStatus =>
  rating >= 8 ? 'Premiere' : 'Today'

export const mapMockMovieToLocal = (movie: MockMovie): Movie => ({
  id: String(movie.id),
  title: movie.title,
  genres: [movie.genre],
  duration: formatDuration(movie.duration),
  rating: movie.classification,
  score: movie.rating,
  description: movie.synopsis,
  status: resolveStatus(movie.rating),
  format: `${movie.language} · 4K`,
  image: movie.posterUrl,
  palette: resolvePalette(movie.genre),
})

export const mapMockMoviesToLocal = (movies: MockMovie[]): Movie[] =>
  movies.map(mapMockMovieToLocal)
