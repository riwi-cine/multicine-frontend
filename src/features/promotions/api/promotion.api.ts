import { apiClient } from '@/api'
import type { Promotion } from '@/types'

export const promotionApi = {
  getAll: async (): Promise<Promotion[]> => {
    const response = await apiClient.get<Promotion[]>('/promotions')
    return response.data
  },

  getActive: async (): Promise<Promotion[]> => {
    const response = await apiClient.get<Promotion[]>('/promotions?active=true')
    return response.data
  },

  getById: async (id: string): Promise<Promotion> => {
    const response = await apiClient.get<Promotion>(`/promotions/${id}`)
    return response.data
  },

  validateCode: async (code: string): Promise<Promotion | null> => {
    const response = await apiClient.get<Promotion[]>(`/promotions?code=${code}&active=true`)
    return response.data[0] || null
  },
}
