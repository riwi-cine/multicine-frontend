import { apiClient } from '@/api'
import type { MovieFunction, Seat, SeatLock, Cart, CartSnack, Snack, Order, Payment, Ticket, Promotion, GiftCard } from '@/types'

export const bookingService = {
  getFunction: async (id: string): Promise<MovieFunction> => {
    const response = await apiClient.get<MovieFunction>(`/functions/${id}`)
    return response.data
  },

  getSeatsByFunction: async (functionId: string): Promise<Seat[]> => {
    const response = await apiClient.get<Seat[]>(`/seats?functionId=${functionId}`)
    return response.data
  },

  getSeatLocks: async (functionId: string): Promise<SeatLock[]> => {
    const response = await apiClient.get<SeatLock[]>(`/seatLocks?functionId=${functionId}`)
    return response.data
  },

  createSeatLock: async (data: { seatId: string; functionId: string; userId: string }): Promise<SeatLock> => {
    const response = await apiClient.post<SeatLock>('/seatLocks', data)
    return response.data
  },

  deleteSeatLock: async (id: string): Promise<void> => {
    await apiClient.delete(`/seatLocks/${id}`)
  },

  getCart: async (userId: string): Promise<Cart | null> => {
    const response = await apiClient.get<Cart[]>(`/carts?userId=${userId}`)
    return response.data[0] || null
  },

  createCart: async (userId: string): Promise<Cart> => {
    const response = await apiClient.post<Cart>('/carts', { userId, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() })
    return response.data
  },

  updateCart: async (id: string, data: Partial<Cart>): Promise<Cart> => {
    const response = await apiClient.patch<Cart>(`/carts/${id}`, { ...data, updatedAt: new Date().toISOString() })
    return response.data
  },

  getCartSnacks: async (cartId: string): Promise<CartSnack[]> => {
    const response = await apiClient.get<CartSnack[]>(`/cartSnacks?cartId=${cartId}`)
    return response.data
  },

  addCartSnack: async (data: Omit<CartSnack, 'id'>): Promise<CartSnack> => {
    const response = await apiClient.post<CartSnack>('/cartSnacks', data)
    return response.data
  },

  removeCartSnack: async (id: string): Promise<void> => {
    await apiClient.delete(`/cartSnacks/${id}`)
  },

  getSnacks: async (): Promise<Snack[]> => {
    const response = await apiClient.get<Snack[]>('/snacks')
    return response.data
  },

  createOrder: async (data: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    const response = await apiClient.post<Order>('/orders', { ...data, createdAt: new Date().toISOString() })
    return response.data
  },

  getOrdersByUser: async (userId: string): Promise<Order[]> => {
    const response = await apiClient.get<Order[]>(`/orders?userId=${userId}`)
    return response.data
  },

  createPayment: async (data: Omit<Payment, 'id' | 'createdAt'>): Promise<Payment> => {
    const response = await apiClient.post<Payment>('/payments', { ...data, createdAt: new Date().toISOString() })
    return response.data
  },

  createTickets: async (tickets: Omit<Ticket, 'id'>[]): Promise<Ticket[]> => {
    const response = await apiClient.post<Ticket[]>('/tickets', tickets)
    return response.data
  },

  getTicketsByOrder: async (orderId: string): Promise<Ticket[]> => {
    const response = await apiClient.get<Ticket[]>(`/tickets?orderId=${orderId}`)
    return response.data
  },

  getPromotions: async (): Promise<Promotion[]> => {
    const response = await apiClient.get<Promotion[]>('/promotions')
    return response.data
  },

  getGiftCards: async (): Promise<GiftCard[]> => {
    const response = await apiClient.get<GiftCard[]>('/giftCards')
    return response.data
  },

  validateGiftCard: async (code: string): Promise<GiftCard | null> => {
    const response = await apiClient.get<GiftCard[]>(`/giftCards?code=${code}&active=true`)
    return response.data[0] || null
  },
}