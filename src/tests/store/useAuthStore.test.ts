import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/store/useAuthStore'

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
