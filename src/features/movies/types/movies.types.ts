export interface MovieFunctionSchedule {
  functionId: number
  startsAt: string
  time: string
  cinemaId: number
  cinemaName: string
  roomId: number
  roomName: string
  roomType: string
  format: string
  language: string
  availableSeats: number
  isSoldOut: boolean
}

export interface MovieSchedule {
  date: string
  functions: MovieFunctionSchedule[]
}

export interface ExtendedMovie {
  movieId: number
  title: string
  posterUrl: string
  genres: string[]
  classification: string
  durationMin: number
  director: string
  language: string
  dubbedOrSubtitled: string
  formats: string[]
  schedules: MovieSchedule[]
  rating: number
  isNewRelease: boolean
  isSoldOut: boolean
}
