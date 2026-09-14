import { apiClient } from '@/api/client'
import type { RegisterFormData } from '@/validations/auth.validation'
import type { RegisterResponse, LoginCredentials, LoginResponse, User } from '@/types'

export const authService = {
  async register(data: RegisterFormData): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>('/auth/register', data)
    return response.data
  },

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
    return response.data
  },

  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>('/auth/profile')
    return response.data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
    localStorage.removeItem('multicine_token')
    localStorage.removeItem('multicine_user')
  },
}


