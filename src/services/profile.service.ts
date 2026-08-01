import { apiClient } from '@/api/client'
import type { ApiResponse } from '@/types/ApiResponse'
import type { User } from '@/types/User'

export interface UpdateProfileData {
  name?: string
  email?: string
}

export interface ChangePasswordData {
  currentPassword: string
  newPassword: string
}

export const profileService = {
  async getProfile(): Promise<User> {
    const { data } = await apiClient.get<ApiResponse<User>>('/profile')
    return data.data
  },

  async updateProfile(payload: UpdateProfileData): Promise<User> {
    const { data } = await apiClient.patch<ApiResponse<User>>(
      '/profile',
      payload,
    )
    return data.data
  },

  async changePassword(payload: ChangePasswordData): Promise<void> {
    await apiClient.patch('/profile/password', payload)
  },
}
