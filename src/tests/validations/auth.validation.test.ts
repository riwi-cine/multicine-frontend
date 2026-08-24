import { describe, it, expect } from 'vitest'
import { registerSchema } from '@/validations/auth.validation'

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
