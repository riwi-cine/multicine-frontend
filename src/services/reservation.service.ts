import { apiClient } from '@/api/client'
import type { ApiResponse } from '@/types/ApiResponse'
import type { Reservation } from '@/types/Reservation'

export interface CreateReservationData {
  scheduleId: number
  seats: string[]
}

export const reservationService = {
  async createReservation(
    payload: CreateReservationData,
  ): Promise<Reservation> {
    const { data } = await apiClient.post<ApiResponse<Reservation>>(
      '/reservations',
      payload,
    )
    return data.data
  },

  async getMyReservations(): Promise<Reservation[]> {
    const { data } =
      await apiClient.get<ApiResponse<Reservation[]>>('/reservations/mine')
    return data.data
  },

  async getReservation(id: number): Promise<Reservation> {
    const { data } = await apiClient.get<ApiResponse<Reservation>>(
      `/reservations/${id}`,
    )
    return data.data
  },

  async cancelReservation(id: number): Promise<Reservation> {
    const { data } = await apiClient.patch<ApiResponse<Reservation>>(
      `/reservations/${id}/cancel`,
    )
    return data.data
  },
}
