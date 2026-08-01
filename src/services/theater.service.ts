import { apiClient } from '@/api/client'
import type { ApiResponse } from '@/types/ApiResponse'
import type { Theater } from '@/types/Theater'

export const theaterService = {
  async getTheaters(): Promise<Theater[]> {
    const { data } = await apiClient.get<ApiResponse<Theater[]>>('/theaters')
    return data.data
  },

  async getTheater(id: number): Promise<Theater> {
    const { data } = await apiClient.get<ApiResponse<Theater>>(
      `/theaters/${id}`,
    )
    return data.data
  },
}
