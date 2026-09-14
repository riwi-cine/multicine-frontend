import { collection } from '../store.js'

export const getMovieFunctions = (movieId: string) => {
  const cinemas = collection('cinemas')
  const rooms = collection('rooms')
  const cinema = cinemas[0]
  if (!cinema) return []

  return rooms.filter((room) => room.cinemaId === cinema.id).slice(0, 2).map((room, index) => ({
    functionId: 101 + index,
    movieId,
    startsAt: `2026-09-${15 + index}T${19 + index}:30:00.000Z`,
    time: `${19 + index}:30`,
    cinemaId: cinema.id,
    cinemaName: cinema.name,
    roomId: room.id,
    roomName: room.name,
    roomType: room.roomType,
    format: index === 0 ? 'IMAX' : '4DX',
    language: 'Español',
    availableSeats: collection('seats').filter((seat) => seat.roomId === room.id && seat.status === 'available').length,
    isSoldOut: false,
    basePrice: index === 0 ? 28000 : 32000,
    status: 'available',
  }))
}

export const getMovieRecommendations = (movieId: string) =>
  collection('movies').filter((movie) => movie.id !== movieId)
