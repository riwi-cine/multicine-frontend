export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Reservation {
  id: number
  movieId: number
  scheduleId: number
  seats: string[]
  status: ReservationStatus
  totalAmount: number
  createdAt: string
}
