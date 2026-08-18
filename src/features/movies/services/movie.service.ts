import { apiClient } from '@/api'
import type { Movie, MovieFunction, MovieRelease } from '@/types'

export const movieService = {
  getAll: async (): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>('/movies')
    return response.data
  },

  getById: async (id: string): Promise<Movie> => {
    const response = await apiClient.get<Movie>(`/movies/${id}`)
    return response.data
  },

  getNowShowing: async (): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>('/movies?status=En Cartelera')
    return response.data
  },

  getUpcoming: async (): Promise<Movie[]> => {
    const response = await apiClient.get<Movie[]>('/movies?status=Próximo Estreno')
    return response.data
  },

  getFunctionsByMovie: async (movieId: string): Promise<MovieFunction[]> => {
    const response = await apiClient.get<MovieFunction[]>(`/movies/${movieId}/functions`)
    return response.data
  },

  getFunctions: async (): Promise<MovieFunction[]> => {
    const response = await apiClient.get<MovieFunction[]>('/functions')
    return response.data
  },

  getFunctionById: async (id: string): Promise<MovieFunction> => {
    const response = await apiClient.get<MovieFunction>(`/functions/${id}`)
    return response.data
  },
}

export const movieReleaseService = {
  getByCountry: async (countryId: string): Promise<MovieRelease[]> => {
    const response = await apiClient.get<MovieRelease[]>(`/movieReleases?countryId=${countryId}`)
    return response.data
  },

  getByMovie: async (movieId: string): Promise<MovieRelease[]> => {
    const response = await apiClient.get<MovieRelease[]>(`/movieReleases?movieId=${movieId}`)
    return response.data
  },
}