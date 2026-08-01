import { apiClient } from '@/api/client'
import type { ApiResponse } from '@/types/ApiResponse'
import type { Payment } from '@/types/Payment'

export type PaymentMethod = 'card' | 'cash'

export interface CreatePaymentData {
  reservationId: number
  paymentMethod: PaymentMethod
}

export const paymentService = {
  async createPayment(payload: CreatePaymentData): Promise<Payment> {
    const { data } = await apiClient.post<ApiResponse<Payment>>(
      '/payments',
      payload,
    )
    return data.data
  },

  async getPayment(id: number): Promise<Payment> {
    const { data } = await apiClient.get<ApiResponse<Payment>>(
      `/payments/${id}`,
    )
    return data.data
  },
}
