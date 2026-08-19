import { apiClient } from '@/api'
import type { User, Membership } from '@/types'

export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>('/users')
    return response.data
  },

  getById: async (id: string): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },

  create: async (data: Omit<User, 'id'>): Promise<User> => {
    const response = await apiClient.post<User>('/users', data)
    return response.data
  },

  update: async (id: string, data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/users/${id}`)
  },

  getMemberships: async (userId: string): Promise<Membership[]> => {
    const response = await apiClient.get<Membership[]>(`/memberships?userId=${userId}`)
    return response.data
  },

  createMembership: async (data: Omit<Membership, 'id'>): Promise<Membership> => {
    const response = await apiClient.post<Membership>('/memberships', data)
    return response.data
  },
}
