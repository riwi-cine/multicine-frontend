export interface Country {
  id: string
  name: string
  code: string
  active: boolean
}

export interface Department {
  id: string
  countryId: string
  name: string
  active: boolean
}

export interface City {
  id: string
  departmentId: string
  name: string
  active: boolean
}

export interface Cinema {
  id: string
  cityId: string
  name: string
  address: string
  active: boolean
}

export interface Room {
  id: string
  cinemaId: string
  name: string
  roomType: string
  capacity: number
}

export interface Seat {
  id: string
  roomId: string
  row: string
  number: string
  seatType: string
}

export interface Movie {
  id: string
  title: string
  synopsis: string
  genre: string
  classification: string
  durationMin: number
  director: string
  posterUrl: string
  trailerUrl: string
  status: string
  rating: number
}

export interface MovieRelease {
  id: string
  countryId: string
  movieId: string
  releaseDate: string
}

export interface MovieFunction {
  id: string
  movieId: string
  roomId: string
  startsAt: string
  format: string
  language: string
  audioType: string
  basePrice: number
  status: string
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  role: string
}

export interface Membership {
  id: string
  userId: string
  type: string
  points: number
  expiresAt: string
}

export interface Cart {
  id: string
  userId: string
  createdAt: string
  updatedAt: string
}

export interface SeatLock {
  id: string
  seatId: string
  functionId: string
  userId: string
  expiresAt: string
}

export interface Snack {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  category: string
}

export interface CartSnack {
  id: string
  cartId: string
  snackId: string
  quantity: number
}

export interface Order {
  id: string
  userId: string
  cartId: string
  total: number
  status: string
  createdAt: string
}

export interface Payment {
  id: string
  orderId: string
  amount: number
  method: string
  status: string
  transactionId: string
  createdAt: string
}

export interface Ticket {
  id: string
  orderId: string
  functionId: string
  seatId: string
  price: number
  qrCode: string
  status: string
}

export interface Promotion {
  id: string
  title: string
  description: string
  discount: number
  code: string
  validFrom: string
  validTo: string
  active: boolean
}

export interface GiftCard {
  id: string
  code: string
  balance: number
  expiresAt: string
  active: boolean
}