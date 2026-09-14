import { apiClient } from '@/api'
import type { MovieFunction } from '@/types'
import type { Movie } from '@/features/movies/types/movies.types'
import { withTrailerFallback } from '@/features/movies/types/movies.types'
import type { ExtendedMovie } from '@/features/movies/types'

type ApiMovie = Omit<Movie, 'status'> & {
  status: Movie['status'] | 'ComingSoon'
}

const normalizeMovie = (movie: ApiMovie): Movie => {
  const trailerIsPlaceholder = movie.trailerUrl?.includes('/example')
  const normalized = {
    ...movie,
    status: movie.status === 'ComingSoon' ? 'Coming Soon' : movie.status,
    trailerUrl: trailerIsPlaceholder ? undefined : movie.trailerUrl,
  }

  return withTrailerFallback(normalized) as Movie
}

export const moviesApi = {
  getAll: async (location?: {
    cityId?: string
    cinemaId?: string
  }): Promise<Movie[]> => {
    const hasRegionalFilter = Boolean(location?.cityId || location?.cinemaId)
    const response = hasRegionalFilter
      ? await apiClient.get<ApiMovie[]>('/movies/filter', { params: location })
      : await apiClient.get<ApiMovie[]>('/movies')
    return response.data.map(normalizeMovie)
  },

  getById: async (id: string): Promise<Movie> => {
    const response = await apiClient.get<ApiMovie>(`/movies/${id}`)
    return normalizeMovie(response.data)
  },

  getToday: async (cityId?: string): Promise<ExtendedMovie[]> => {
    const response = await apiClient.get<ExtendedMovie[]>('/movies/today', {
      params: cityId ? { cityId } : undefined,
    })
    return response.data
  },

  getWeekly: async (cityId?: string): Promise<ExtendedMovie[]> => {
    const response = await apiClient.get<ExtendedMovie[]>('/movies/weekly', {
      params: cityId ? { cityId } : undefined,
    })
    return response.data
  },

  getFunctionsByMovie: async (movieId: string): Promise<MovieFunction[]> => {
    const response = await apiClient.get<MovieFunction[]>(
      `/movies/${movieId}/functions`,
    )
    return response.data
  },

  getRecommendations: async (id: string): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>(`/movies/${id}/recommendations`)
    return response.data
  },

  filter: async (params: {
    cityId?: string
    date?: string
    genre?: string
    classification?: string
    language?: string
    roomType?: string
    format?: string
    cinemaId?: string
    availableOnly?: boolean
  }): Promise<Movie[]> => {
    const response = await apiClient.get<ApiMovie[]>('/movies/filter', { params })
    return response.data.map(normalizeMovie)
  },
}
