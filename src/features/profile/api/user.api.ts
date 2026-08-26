import { apiClient } from '@/api'
import type { DomainUser, Membership } from '@/types'

export const userApi = {
  getAll: async (): Promise<DomainUser[]> => {
    const response = await apiClient.get<DomainUser[]>('/users')
    return response.data
  },

  getById: async (id: string): Promise<DomainUser> => {
    const response = await apiClient.get<DomainUser>(`/users/${id}`)
    return response.data
  },

  create: async (data: Omit<DomainUser, 'id'>): Promise<DomainUser> => {
    const response = await apiClient.post<DomainUser>('/users', data)
    return response.data
  },

  update: async (id: string, data: Partial<DomainUser>): Promise<DomainUser> => {
    const response = await apiClient.patch<DomainUser>(`/users/${id}`, data)
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
