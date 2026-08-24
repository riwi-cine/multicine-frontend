export interface User {
  id: string
  fullName: string
  email: string
  phone?: string
  role?: string
}

export interface RegisterFormValues {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export interface RegisterResponse {
  message: string
  user?: User
  token?: string
}
