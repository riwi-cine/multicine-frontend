import { describe, it, expect } from 'vitest'
import { registerSchema, loginSchema } from '@/validations/auth.validation'

describe('auth.validation - registerSchema', () => {
  it('should validate a valid registration form data', () => {
    const validData = {
      fullName: 'Carlos Mendoza',
      email: 'carlos@example.com',
      phone: '987654321',
      password: 'Password123',
      confirmPassword: 'Password123',
      acceptTerms: true,
    }

    const result = registerSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject invalid email', () => {
    const invalidData = {
      fullName: 'Carlos Mendoza',
      email: 'correo-invalido',
      phone: '987654321',
      password: 'Password123',
      confirmPassword: 'Password123',
      acceptTerms: true,
    }

    const result = registerSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Ingrese un correo electrónico válido')
    }
  })

  it('should reject non-matching passwords', () => {
    const mismatchData = {
      fullName: 'Carlos Mendoza',
      email: 'carlos@example.com',
      phone: '987654321',
      password: 'Password123',
      confirmPassword: 'DifferentPassword456',
      acceptTerms: true,
    }

    const result = registerSchema.safeParse(mismatchData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Las contraseñas no coinciden')
    }
  })

  it('should require terms acceptance', () => {
    const noTermsData = {
      fullName: 'Carlos Mendoza',
      email: 'carlos@example.com',
      phone: '987654321',
      password: 'Password123',
      confirmPassword: 'Password123',
      acceptTerms: false,
    }

    const result = registerSchema.safeParse(noTermsData)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Debe aceptar los términos y condiciones para continuar')
    }
  })
})

describe('auth.validation - loginSchema', () => {
  it('should validate valid login credentials', () => {
    const validData = {
      email: 'usuario@ejemplo.com',
      password: 'Password123',
      rememberMe: true,
    }

    const result = loginSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject empty or invalid email', () => {
    const emptyEmail = { email: '', password: 'Password123' }
    const res1 = loginSchema.safeParse(emptyEmail)
    expect(res1.success).toBe(false)

    const invalidEmail = { email: 'formato-invalido', password: 'Password123' }
    const res2 = loginSchema.safeParse(invalidEmail)
    expect(res2.success).toBe(false)
  })

  it('should reject empty password', () => {
    const emptyPassword = { email: 'usuario@ejemplo.com', password: '' }
    const result = loginSchema.safeParse(emptyPassword)
    expect(result.success).toBe(false)
  })
})

