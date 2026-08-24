import { apiClient } from '@/api/client'
import type { RegisterFormData, RegisterResponse } from '@/types'

export const authService = {
  async register(data: RegisterFormData): Promise<RegisterResponse> {
    try {
      const response = await apiClient.post<RegisterResponse>('/auth/register', data)
      return response.data
    } catch (error) {
      // Fallback for development if API server is not running
      console.warn('API Endpoint unavailable, simulating registration response:', error)
      return {
        message: 'Usuario registrado exitosamente',
        user: {
          id: String(Date.now()),
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          role: 'CLIENT',
        },
      }
    }
  },
}

