import { apiClient } from '@/api'
import type { Movie, MovieFunction, MovieRelease, Country, City, Cinema, Room, Seat } from '@/types'

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
    const response = await apiClient.get<MovieFunction[]>(`/functions?movieId=${movieId}`)
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

export const locationService = {
  getCountries: async (): Promise<Country[]> => {
    const response = await apiClient.get<Country[]>('/countries')
    return response.data
  },

  getDepartments: async (countryId?: string): Promise<City[]> => {
    const url = countryId ? `/departments?countryId=${countryId}` : '/departments'
    const response = await apiClient.get<City[]>(url)
    return response.data
  },

  getCities: async (departmentId?: string): Promise<City[]> => {
    const url = departmentId ? `/cities?departmentId=${departmentId}` : '/cities'
    const response = await apiClient.get<City[]>(url)
    return response.data
  },

  getCinemas: async (cityId?: string): Promise<Cinema[]> => {
    const url = cityId ? `/cinemas?cityId=${cityId}` : '/cinemas'
    const response = await apiClient.get<Cinema[]>(url)
    return response.data
  },

  getCinemaById: async (id: string): Promise<Cinema> => {
    const response = await apiClient.get<Cinema>(`/cinemas/${id}`)
    return response.data
  },

  getRoomsByCinema: async (cinemaId: string): Promise<Room[]> => {
    const response = await apiClient.get<Room[]>(`/rooms?cinemaId=${cinemaId}`)
    return response.data
  },

  getSeatsByRoom: async (roomId: string): Promise<Seat[]> => {
    const response = await apiClient.get<Seat[]>(`/seats?roomId=${roomId}`)
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