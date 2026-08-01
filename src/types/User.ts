export type UserRole = 'admin' | 'client'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
  membershipId?: number | null
  createdAt: string
}
