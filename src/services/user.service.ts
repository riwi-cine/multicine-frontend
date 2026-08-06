import { apiClient } from '@/api'
import type { User } from '@/types'

export const authService = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/login', { email, password })
    return response.data
  },

  register: async (data: { email: string; password: string; name: string }): Promise<{ user: User; token: string }> => {
    const response = await apiClient.post<{ user: User; token: string }>('/auth/register', data)
    return response.data
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/profile')
    return response.data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/auth/logout')
  },

  refreshToken: async (): Promise<string> => {
    const response = await apiClient.post<{ token: string }>('/auth/refresh')
    return response.data.token
  },
}

export const userService = {
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

type Membership = {
  id: string
  userId: string
  type: string
  points: number
  expiresAt: string
}