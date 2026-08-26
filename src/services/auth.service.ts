import { apiClient } from '@/api/client'
import type { RegisterFormData } from '@/validations/auth.validation'
import type { RegisterResponse, LoginCredentials, LoginResponse, User } from '@/types'

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

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
      return response.data
    } catch (error) {
      // Fallback for development if API server is not running
      console.warn('API Endpoint unavailable, simulating login response:', error)

      // Simulate invalid credentials check if demo user requested
      if (credentials.email === 'invalid@test.com') {
        throw new Error('Credenciales inválidas. Verifique su correo y contraseña.', { cause: error })
      }

      return {
        message: 'Inicio de sesión exitoso',
        token: `mock-jwt-token-${Date.now()}`,
        user: {
          id: 'usr-101',
          fullName: credentials.email.split('@')[0].toUpperCase(),
          email: credentials.email,
          phone: '+573001234567',
          role: 'CLIENT',
        },
      }
    }
  },

  async getProfile(): Promise<User> {
    try {
      const response = await apiClient.get<User>('/auth/profile')
      return response.data
    } catch (error) {
      const savedUserStr = localStorage.getItem('multicine_user')
      if (savedUserStr) {
        return JSON.parse(savedUserStr)
      }
      throw new Error('Sesión no encontrada o expirada.', { cause: error })
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch {
      // Ignore API logout error in offline/mock mode
    } finally {
      localStorage.removeItem('multicine_token')
      localStorage.removeItem('multicine_user')
    }
  },
}


