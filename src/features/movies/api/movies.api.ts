import { apiClient } from '@/api'
import type { MovieFunction } from '@/types'
import { nowShowing, type Movie } from '@/features/movies/types/movies.types'
import type { ExtendedMovie } from '@/features/movies/types'

const getFallbackMovies = (error?: unknown): Movie[] => {
  const status =
    typeof error === 'object' && error !== null
      ? ((('status' in error && typeof error.status === 'number')
          ? error.status
          : undefined) ??
        (('response' in error &&
          error.response &&
          typeof error.response === 'object' &&
          'status' in error.response &&
          typeof error.response.status === 'number')
          ? error.response.status
          : undefined))
      : undefined

  if (status === 404) {
    return nowShowing
  }

  if (
    error instanceof Error &&
    /network|failed to fetch|timeout/i.test(error.message)
  ) {
    return nowShowing
  }

  return nowShowing
}

export const moviesApi = {
  getAll: async (): Promise<Movie[]> => {
    try {
      const response = await apiClient.get<Movie[]>('/movies')
      return response.data
    } catch (error) {
      return getFallbackMovies(error)
    }
  },

  getById: async (id: string): Promise<Movie> => {
    const response = await apiClient.get<Movie>(`/movies/${id}`)
    return response.data
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
    const response = await apiClient.get<Movie[]>('/movies/filter', { params })
    return response.data
  },
}
