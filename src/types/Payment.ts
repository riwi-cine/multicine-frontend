export type PaymentStatus = 'pending' | 'paid' | 'failed'

export interface Payment {
  id: number
  reservationId: number
  amount: number
  status: PaymentStatus
  createdAt: string
}
