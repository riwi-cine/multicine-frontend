import { apiClient } from '@/api'
import type { Movie, MovieFunction } from '@/types'

export const movieService = {

  // ✅ GET /api/movies — igual, está bien
  getAll: async (): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>('/movies')
    return response.data
  },

  // ✅ GET /api/movies/:id — igual, está bien
  getById: async (id: string): Promise<Movie> => {
    const response = await apiClient.get<Movie>(`/movies/${id}`)
    return response.data
  },

  getToday: async (cityId: string): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>('/movies/today', {
      params: { cityId }
    })
    return response.data
  },

  getWeekly: async (cityId: string): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>('/movies/weekly', {
      params: { cityId }
    })
    return response.data
  },

  // ✅ GET /api/movies/:id/functions — igual, está bien
  getFunctionsByMovie: async (movieId: string): Promise<MovieFunction[]> => {
    const response = await apiClient.get<MovieFunction[]>(`/movies/${movieId}/functions`)
    return response.data
  },

  // ✅ NUEVO: GET /api/movies/:id/recommendations
  getRecommendations: async (id: string): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>(`/movies/${id}/recommendations`)
    return response.data
  },

  // ✅ NUEVO: GET /api/movies/filter
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