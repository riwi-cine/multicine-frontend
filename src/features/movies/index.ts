export { default as MovieArtwork } from './components/MovieArtwork'
export { moviesApi } from './api/movies.api'
export { useMovies } from './hooks/useMovies'

export type {
  Movie,
  MovieStatus,
  MoviePalette,
  Promotion,
  Benefit,
} from './data/movies.mock'

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
} from './data/movies.mock'
