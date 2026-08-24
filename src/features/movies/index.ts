export { default as MovieArtwork } from './components/MovieArtwork'
export { moviesApi } from './api/movies.api'
export { useMovies } from './hooks/useMovies'

export type {
  Movie,
  MovieStatus,
  MoviePalette,
  Promotion,
  Benefit,
} from '@/features/movies/types/movies.types'

export type {
  ExtendedMovie,
  MovieFunctionSchedule,
  MovieSchedule,
} from './types'

export {
  featuredMovie,
  featuredMovies,
  nowShowing,
  comingSoon,
  promotions,
  benefits,
  fallbackFeaturedMovie,
} from '@/features/movies/types/movies.types'