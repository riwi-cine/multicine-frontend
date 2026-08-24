import { create } from 'zustand'
import type { User, LoginCredentials, LoginResponse } from '@/types'
import { authService } from '@/services/auth.service'

interface AuthStoreState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<LoginResponse>
  logout: () => Promise<void>
  restoreSession: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthStoreState>((set, get) => {
  const initialToken = localStorage.getItem('multicine_token')
  const initialUserStr = localStorage.getItem('multicine_user')
  let initialUser: User | null = null
  try {
    if (initialUserStr) {
      initialUser = JSON.parse(initialUserStr)
    }
  } catch {
    initialUser = null
  }

  return {
    user: initialUser,
    token: initialToken,
    isAuthenticated: Boolean(initialToken && initialUser),
    isLoading: false,
    error: null,

    login: async (credentials: LoginCredentials) => {
      set({ isLoading: true, error: null })
      try {
        const response = await authService.login(credentials)
        const { token, user } = response

        localStorage.setItem('multicine_token', token)
        localStorage.setItem('multicine_user', JSON.stringify(user))

        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        })

        return response
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error al iniciar sesión'
        set({ error: message, isLoading: false })
        throw err
      }
    },

    logout: async () => {
      set({ isLoading: true })
      try {
        await authService.logout()
      } finally {
        localStorage.removeItem('multicine_token')
        localStorage.removeItem('multicine_user')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        })
      }
    },

    restoreSession: async () => {
      const token = localStorage.getItem('multicine_token')
      if (!token) {
        set({ user: null, token: null, isAuthenticated: false })
        return
      }

      set({ isLoading: true })
      try {
        const user = await authService.getProfile()
        localStorage.setItem('multicine_user', JSON.stringify(user))
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        })
      } catch {
        get().logout()
      }
    },

    clearError: () => set({ error: null }),
  }
})
