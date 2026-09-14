import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuthStore } from '@/store/useAuthStore'
import { authService } from '@/services/auth.service'

vi.mock('@/services/auth.service', () => ({
  authService: {
    login: vi.fn(),
    logout: vi.fn(),
    getProfile: vi.fn(),
  },
}))

describe('useAuthStore', () => {
  beforeEach(() => {
    localStorage.clear()
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    })
  })

  it('should initialize with empty state when localStorage is clear', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(state.isAuthenticated).toBe(false)
  })

  it('should login successfully and save token and user in localStorage', async () => {
    const credentials = { email: 'juan@ejemplo.com', password: 'Password123' }
    vi.mocked(authService.login).mockResolvedValueOnce({
      message: 'Inicio de sesión exitoso',
      token: 'test-token',
      user: { id: 'user-1', fullName: 'Juan Ejemplo', email: credentials.email, role: 'CLIENT' },
    })
    const response = await useAuthStore.getState().login(credentials)

    expect(response.token).toBeDefined()
    expect(response.user.email).toBe('juan@ejemplo.com')

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(true)
    expect(state.token).toBe(response.token)
    expect(localStorage.getItem('multicine_token')).toBe(response.token)
  })

  it('should logout cleanly and clear localStorage', async () => {
    // Perform login first
    vi.mocked(authService.login).mockResolvedValueOnce({
      message: 'Inicio de sesión exitoso',
      token: 'test-token',
      user: { id: 'user-2', fullName: 'Test User', email: 'test@ejemplo.com', role: 'CLIENT' },
    })
    vi.mocked(authService.logout).mockResolvedValueOnce()
    await useAuthStore.getState().login({ email: 'test@ejemplo.com', password: 'Password123' })
    expect(useAuthStore.getState().isAuthenticated).toBe(true)

    // Logout
    await useAuthStore.getState().logout()

    const state = useAuthStore.getState()
    expect(state.isAuthenticated).toBe(false)
    expect(state.user).toBeNull()
    expect(state.token).toBeNull()
    expect(localStorage.getItem('multicine_token')).toBeNull()
  })
})
