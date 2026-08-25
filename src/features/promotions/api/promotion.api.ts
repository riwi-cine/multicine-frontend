import { apiClient } from '@/api'
import type { Promotion } from '@/features/movies'

export const promotionApi = {
  getAll: async (): Promise<Promotion[]> => {
    const response = await apiClient.get<Promotion[]>('/promotions')
    return response.data
  },

  getActive: async (): Promise<Promotion[]> => {
    const response = await apiClient.get<Promotion[]>('/promotions/active')
    return response.data
  },

  getById: async (id: string): Promise<Promotion> => {
    const response = await apiClient.get<Promotion>(`/promotions/${id}`)
    return response.data
  },
}