import { apiClient } from '@/api'
import type { Country, City, Cinema, Room, Seat } from '@/types'

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
