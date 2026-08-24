import { apiClient } from '@/api'
import type { MovieFunction } from '@/types'
import type { Movie } from '@/features/movies/types/movies.types'
import type { ExtendedMovie } from '@/features/movies/types'

export const moviesApi = {
  getAll: async (): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>('/movies')
    return response.data
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
