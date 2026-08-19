export { default as MovieArtwork } from './components/MovieArtwork'
export { moviesApi } from './api/movies.api'
export type { MockMovie } from './data/mappers'
export { mapMockMoviesToLocal } from './data/mappers'
export { useMovies } from './hooks/useMovies'

export type {
  Movie,
  MovieStatus,
  MoviePalette,
  Promotion,
  Benefit,
} from './data/movies.mock'

export {
  featuredMovie,
  featuredMovies,
  nowShowing,
  comingSoon,
  promotions,
  benefits,
} from './data/movies.mock'
