export interface Movie {
  id: number
  title: string
  synopsis: string
  genre: string
  durationMinutes: number
  rating: number
  posterUrl: string
  trailerUrl?: string
  releaseDate: string
  isNowShowing: boolean
}
