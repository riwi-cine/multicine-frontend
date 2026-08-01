import { apiClient } from '@/api/client'
import type { ApiResponse } from '@/types/ApiResponse'
import type { Movie } from '@/types/Movie'
import type { PaginatedResponse } from '@/types/Pagination'

export interface MovieFilters {
  page?: number
  limit?: number
  search?: string
  genre?: string
}

export const movieService = {
  async getMovies(
    filters: MovieFilters = {},
  ): Promise<PaginatedResponse<Movie>> {
    const { data } = await apiClient.get<ApiResponse<PaginatedResponse<Movie>>>(
      '/movies',
      {
        params: filters,
      },
    )
    return data.data
  },

  async getMovie(id: number): Promise<Movie> {
    const { data } = await apiClient.get<ApiResponse<Movie>>(`/movies/${id}`)
    return data.data
  },

  async getNowShowing(): Promise<Movie[]> {
    const { data } = await apiClient.get<ApiResponse<Movie[]>>(
      '/movies/now-showing',
    )
    return data.data
  },

  async getComingSoon(): Promise<Movie[]> {
    const { data } = await apiClient.get<ApiResponse<Movie[]>>(
      '/movies/coming-soon',
    )
    return data.data
  },
}
