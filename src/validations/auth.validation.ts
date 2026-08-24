import { z } from 'zod'

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, { message: 'El nombre completo es obligatorio' })
      .min(3, { message: 'El nombre debe tener al menos 3 caracteres' }),
    email: z
      .string()
      .min(1, { message: 'El correo electrónico es obligatorio' })
      .email({ message: 'Ingrese un correo electrónico válido' }),
    phone: z
      .string()
      .min(1, { message: 'El número de teléfono es obligatorio' })
      .regex(/^[0-9+\s-]{7,15}$/, {
        message: 'Ingrese un número de teléfono válido (ej: 987654321)',
      }),
    password: z
      .string()
      .min(1, { message: 'La contraseña es obligatoria' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .regex(/[A-Z]/, { message: 'Debe contener al menos una letra mayúscula' })
      .regex(/[0-9]/, { message: 'Debe contener al menos un número' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Debe confirmar su contraseña' }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Debe aceptar los términos y condiciones para continuar',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El correo electrónico es obligatorio' })
    .email({ message: 'Ingrese un correo electrónico válido' }),
  password: z
    .string()
    .min(1, { message: 'La contraseña es obligatoria' }),
  rememberMe: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

