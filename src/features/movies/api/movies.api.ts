import { apiClient } from '@/api'
import type { MockMovie } from '@/features/movies/data/mappers'

export const moviesApi = {
  getAll: async (): Promise<MockMovie[]> => {
    const response = await apiClient.get<MockMovie[]>('/movies')
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/movies/${id}`)
    return response.data
  },

  getToday: async (cityId: string) => {
    const response = await apiClient.get('/movies/today', {
      params: { cityId },
    })
    return response.data
  },

  getWeekly: async (cityId: string) => {
    const response = await apiClient.get('/movies/weekly', {
      params: { cityId },
    })
    return response.data
  },

  getFunctionsByMovie: async (movieId: string) => {
    const response = await apiClient.get(`/movies/${movieId}/functions`)
    return response.data
  },

  getRecommendations: async (id: string) => {
    const response = await apiClient.get(`/movies/${id}/recommendations`)
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
  }) => {
    const response = await apiClient.get('/movies/filter', { params })
    return response.data
  },
}
