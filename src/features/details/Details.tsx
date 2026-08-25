import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Clock3, Film, MapPin, Star, Ticket } from 'lucide-react'

import { Button } from '@/components/button'
import { MovieArtwork } from '@/features/movies'
import type { Movie } from '@/features/movies'
import { featuredMovies } from '@/features/movies/types/movies.types'
import { LOCATIONS } from '@/features/landing/data/locations'

import Footer from '../landing/components/Footer'
import Navbar from '../landing/components/Navbar'

type LocationOption = {
  country: string
  city: string
  venue: string
}

const getAllLocations = (): LocationOption[] =>
  Object.entries(LOCATIONS).flatMap(([country, cities]) =>
    Object.entries(cities).flatMap(([city, venues]) =>
      venues.map((venue) => ({ country, city, venue })),
    ),
  )

const getDateOptions = () => {
  const today = new Date()

  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() + index)

    return {
      label: ['HOY', 'LUN', 'MAR', 'MIÉ', 'JUE'][index] ?? `D${index + 1}`,
      day: date.getDate(),
      value: date.toISOString(),
    }
  })
}

const buildRandomTimes = () => {
  const times = ['12:00 PM', '2:45 PM', '5:30 PM', '8:15 PM', '10:20 PM']
  const shuffled = [...times].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 5)
}

const roomTypes = ['3D - DOB', 'Ultra 2D - DOB', '2D - DOB']

const Details = () => {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [allLocations, setAllLocations] = useState<LocationOption[]>([])
  const [selectedLocation, setSelectedLocation] =
    useState<LocationOption | null>(null)
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(
    null,
  )
  const [selectedRoomType, setSelectedRoomType] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const dateOptions = useMemo(() => getDateOptions(), [])

  useEffect(() => {
    const movieToShow = featuredMovies.find(
      (item) => item.id === 'dune-part-two',
    )
    setMovie(movieToShow ?? null)

    const locations = getAllLocations()
    setAllLocations(locations)

    try {
      const stored = localStorage.getItem('selectedLocation')
      if (stored) {
        const parsed = JSON.parse(stored) as {
          country?: string
          city?: string
          venue?: string
        }
        if (parsed.country && parsed.city && parsed.venue) {
          const matched = locations.find(
            (location) =>
              location.country === parsed.country &&
              location.city === parsed.city &&
              location.venue === parsed.venue,
          )

          if (matched) {
            setSelectedLocation(matched)
            return
          }
        }
      }

      setSelectedLocation(locations[0] ?? null)
    } catch {
      setSelectedLocation(locations[0] ?? null)
    }
  }, [])

  useEffect(() => {
    if (!selectedLocation) {
      return
    }

    localStorage.setItem(
      'selectedLocation',
      JSON.stringify({
        country: selectedLocation.country,
        city: selectedLocation.city,
        venue: selectedLocation.venue,
      }),
    )
  }, [selectedLocation])

  const locationOptionsForSelection = useMemo(() => {
    if (!selectedLocation) {
      return allLocations
    }

    return allLocations.filter(
      (location) => location.city === selectedLocation.city,
    )
  }, [allLocations, selectedLocation])

  const scheduleByVenue = useMemo<
    Record<string, Record<string, string[]>>
  >(() => {
    const schedule: Record<string, Record<string, string[]>> = {}

    allLocations.forEach((location) => {
      schedule[location.venue] = {}
      roomTypes.forEach((roomType) => {
        schedule[location.venue][roomType] = buildRandomTimes()
      })
    })

    return schedule
  }, [allLocations])

  useEffect(() => {
    if (!selectedLocation) {
      setSelectedRoomType('')
      setSelectedTime('')
      return
    }

    const allowedLocations = locationOptionsForSelection.map(
      (location) => location.venue,
    )
    const isValidVenue = allowedLocations.includes(selectedLocation.venue)

    if (!isValidVenue) {
      setSelectedLocation(locationOptionsForSelection[0] ?? null)
    }

    if (selectedRoomType && !roomTypes.includes(selectedRoomType)) {
      setSelectedRoomType('')
    }

    setSelectedTime('')
  }, [locationOptionsForSelection, selectedLocation, selectedRoomType])

  const isSelectionComplete =
    !!selectedLocation &&
    selectedDateIndex !== null &&
    !!selectedRoomType &&
    !!selectedTime

  const scrollToShowtimes = () => {
    document.getElementById('showtimes-section')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const handleContinue = () => {
    if (!isSelectionComplete) {
      return
    }

    setConfirmed(true)
  }

  if (!movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Película no encontrada</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="relative isolate min-h-[700px] overflow-hidden">
        <nav>
          <Navbar />
        </nav>

        <div className="absolute inset-0 -z-20">
          <MovieArtwork
            palette={movie.palette}
            image={movie.image}
            variant="backdrop"
            className="h-full w-full"
          />
        </div>

        <div
          className="
            absolute inset-0 -z-10
            bg-linear-to-r
            from-black/95
            via-black/75
            to-black/30
          "
        />

        <div
          className="
            absolute inset-x-0 bottom-0 -z-10
            h-72
            bg-linear-to-t
            from-background
            via-background/70
            to-transparent
          "
        />

        <div
          className="
            mx-auto flex min-h-[700px]
            max-w-7xl items-center
            px-4 py-24
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              flex w-full
              flex-col
              gap-10
              md:flex-row
              md:items-center
              md:gap-12
            "
          >
            <div className="mx-auto w-56 shrink-0 sm:w-64 md:mx-0 lg:w-72">
              <div
                className="
                  overflow-hidden
                  rounded-2xl
                  border border-white/20
                  bg-black/20
                  shadow-2xl
                  shadow-black/50
                "
              >
                <MovieArtwork
                  palette={movie.palette}
                  image={movie.image}
                  variant="poster"
                  className="aspect-2/3"
                />
              </div>
            </div>

            <div className="max-w-3xl text-center md:text-left">
              <span
                className="
                  inline-flex
                  rounded-full
                  border border-primary/40
                  bg-primary/15
                  px-3 py-1
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-white
                "
              >
                {movie.status === 'Today'
                  ? 'En cartelera'
                  : movie.status === 'Premiere'
                    ? 'Estreno'
                    : 'Próximamente'}
              </span>

              <h1
                className="
                  mt-5
                  font-heading
                  text-4xl
                  font-bold
                  leading-tight
                  tracking-tight
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                {movie.title}
              </h1>

              <div
                className="
                  mt-5
                  flex
                  flex-wrap
                  items-center
                  justify-center
                  gap-x-5
                  gap-y-3
                  text-sm
                  text-white/80
                  md:justify-start
                "
              >
                <span>{movie.rating}</span>
                <span className="text-white/30">•</span>
                <span>{movie.duration}</span>
                <span className="text-white/30">•</span>
                <span>{movie.format}</span>

                {movie.score > 0 && (
                  <>
                    <span className="text-white/30">•</span>
                    <span className="flex items-center gap-1 font-semibold text-white">
                      <Star size={16} className="fill-accent text-accent" />
                      {movie.score.toFixed(1)}
                    </span>
                  </>
                )}
              </div>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  justify-center
                  gap-2
                  md:justify-start
                "
              >
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="
                      rounded-full
                      border border-white/20
                      bg-white/10
                      px-3 py-1.5
                      text-xs
                      font-medium
                      text-white/90
                      backdrop-blur-sm
                    "
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <p
                className="
                  mt-7
                  max-w-2xl
                  text-sm
                  leading-7
                  text-white/75
                  sm:text-base
                "
              >
                {movie.description}
              </p>

              <div className="mt-8 flex justify-center md:justify-start">
                <Button
                  size="lg"
                  onClick={scrollToShowtimes}
                  className="
                    h-12
                    rounded-xl
                    border-0
                    bg-linear-to-r from-[#800021] to-[#C24366]
                    px-7
                    text-base
                    text-white
                    shadow-md shadow-[#C24366]/20
                    transition-all duration-200
                    hover:-translate-y-0.5
                    hover:shadow-lg hover:shadow-[#C24366]/30
                    md:inline-flex
                  "
                >
                  <Ticket data-icon="inline-start" />
                  Ver funciones
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="showtimes-section"
        className="relative mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-[30px] border border-[#eadfe1] bg-[#f8f5f5] p-4 shadow-[0_10px_30px_rgba(35,20,22,0.08)] sm:p-6">
          <div className="relative mb-5 overflow-x-auto pb-1">
            <div className="relative mx-auto min-w-[420px] max-w-[780px]">
              <div className="absolute left-[12.5%] right-[12.5%] top-1/2 h-[2px] -translate-y-1/2 bg-[#e0d0d5]" />
              <div
                className={`absolute left-[12.5%] top-1/2 h-[2px] -translate-y-1/2 bg-[#C24366] transition-all duration-300 ${
                  selectedTime
                    ? 'w-[75%]'
                    : selectedRoomType
                      ? 'w-[50%]'
                      : selectedDateIndex !== null
                        ? 'w-[25%]'
                        : !!selectedLocation
                          ? 'w-[12.5%]'
                          : 'w-0'
                }`}
              />

              <div className="relative z-10 grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((step) => {
                  const isCompleted =
                    (step === 1 && !!selectedLocation) ||
                    (step === 2 && selectedDateIndex !== null) ||
                    (step === 3 && !!selectedRoomType) ||
                    (step === 4 && !!selectedTime)

                  const isCurrent =
                    (step === 1 && !selectedLocation) ||
                    (step === 2 &&
                      !!selectedLocation &&
                      selectedDateIndex === null) ||
                    (step === 3 &&
                      selectedDateIndex !== null &&
                      !selectedRoomType) ||
                    (step === 4 && !!selectedRoomType && !selectedTime)

                  return (
                    <div key={step} className="flex justify-center">
                      <div
                        className={`flex h-7 w-7 -translate-y-[1px] items-center justify-center rounded-full border text-[10px] font-bold ${
                          isCompleted
                            ? 'border-[#800021] bg-linear-to-r from-[#800021] to-[#C24366] text-white shadow-md shadow-[#C24366]/20'
                            : isCurrent
                              ? 'border-[#800021] bg-white text-[#800021] shadow-sm shadow-[#C24366]/10'
                              : 'border-[#d9c8cb] bg-white text-[#7d5d62]'
                        }`}
                      >
                        {step}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            <div className="rounded-[22px] border border-[#e8dfe2] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F7E6EB]">
                  <MapPin className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#800021]">
                  Paso 1
                </span>
              </div>

              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5c5f]">
                Debe elegir la sede
              </p>

              <label className="block">
                <span className="sr-only">Sede</span>
                <div className="relative">
                  <select
                    value={
                      selectedLocation
                        ? `${selectedLocation.city} - ${selectedLocation.venue}`
                        : ''
                    }
                    onChange={(event) => {
                      const nextValue = event.target.value
                      const nextLocation = locationOptionsForSelection.find(
                        (location) =>
                          `${location.city} - ${location.venue}` === nextValue,
                      )

                      if (nextLocation) {
                        setSelectedLocation(nextLocation)
                      }
                    }}
                    className="w-full appearance-none rounded-xl border border-[#eadfe1] bg-[#f7f4f4] px-3 py-3 pr-10 text-sm font-medium text-[#2d1d20] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="" className="bg-white text-[#2d1d20]">
                      Selecciona una sede
                    </option>
                    {locationOptionsForSelection.map((location) => (
                      <option
                        key={`${location.city}-${location.venue}`}
                        value={`${location.city} - ${location.venue}`}
                        className="bg-white text-[#2d1d20]"
                      >
                        {location.city} · {location.venue}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-primary">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4"
                    >
                      <path d="M5.25 7.5 10 12.25 14.75 7.5h-9.5Z" />
                    </svg>
                  </span>
                </div>
              </label>
            </div>

            <div className="rounded-[22px] border border-[#e8dfe2] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F7E6EB]">
                  <CalendarDays className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#800021]">
                  Paso 2
                </span>
              </div>

              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5c5f]">
                Elegir la fecha
              </p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5">
                {dateOptions.map((date, index) => (
                  <button
                    key={`${date.value}-${index}`}
                    type="button"
                    onClick={() => setSelectedDateIndex(index)}
                    className={`rounded-xl border px-2 py-2 text-center transition-all ${
                      selectedDateIndex === index
                        ? 'border-[#800021] bg-linear-to-r from-[#800021] to-[#C24366] text-white shadow-md shadow-[#C24366]/20'
                        : 'border-[#eadfe1] bg-[#f9f5f5] text-[#2d1d20] hover:border-[#C24366]/50 hover:text-[#800021]'
                    }`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.14em]">
                      {date.label}
                    </div>
                    <div className="mt-1 text-sm font-bold">{date.day}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[22px] border border-[#e8dfe2] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F7E6EB]">
                  <Film className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#800021]">
                  Paso 3
                </span>
              </div>

              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5c5f]">
                Elegir la sala
              </p>

              <div className="space-y-2">
                {roomTypes.map((roomType) => (
                  <button
                    key={roomType}
                    type="button"
                    onClick={() => setSelectedRoomType(roomType)}
                    className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-all ${
                      selectedRoomType === roomType
                        ? 'border-[#800021] bg-linear-to-r from-[#800021] to-[#C24366] text-white shadow-md shadow-[#C24366]/20'
                        : 'border-[#eadfe1] bg-[#f9f5f5] text-[#2d1d20] hover:border-[#C24366]/50 hover:text-[#800021]'
                    }`}
                  >
                    {roomType}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[22px] border border-[#e8dfe2] bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-primary">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F7E6EB]">
                  <Clock3 className="h-3.5 w-3.5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#800021]">
                  Paso 4
                </span>
              </div>

              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6f5c5f]">
                Elegir el horario
              </p>

              {selectedLocation && selectedRoomType ? (
                <div className="flex flex-wrap gap-2">
                  {(
                    scheduleByVenue[selectedLocation.venue]?.[
                      selectedRoomType
                    ] ?? []
                  ).map((time) => (
                    <button
                      key={`${selectedLocation.venue}-${selectedRoomType}-${time}`}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-xl border px-2.5 py-2 text-sm font-semibold transition-all ${
                        selectedTime === time
                          ? 'border-[#800021] bg-linear-to-r from-[#800021] to-[#C24366] text-white shadow-md shadow-[#C24366]/20'
                          : 'border-[#eadfe1] bg-[#f9f5f5] text-[#2d1d20] hover:border-[#C24366]/50 hover:text-[#800021]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[#e7d1d7] bg-[#faf7f7] p-3 text-sm text-[#7d5d62]">
                  Elige primero la sede y la sala
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end">
            <Button
              type="button"
              onClick={handleContinue}
              disabled={!isSelectionComplete}
              className="
                h-12
                rounded-xl
                border-0
                bg-linear-to-r from-[#800021] to-[#C24366]
                px-7
                text-base
                font-semibold
                text-white
                shadow-md shadow-[#C24366]/20
                transition-all duration-200
                hover:-translate-y-0.5
                hover:shadow-lg hover:shadow-[#C24366]/30
                disabled:cursor-not-allowed disabled:opacity-40
              "
            >
              {confirmed ? 'Función confirmada' : 'Continuar'}
            </Button>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div
          className="
            rounded-2xl
            border border-border
            bg-card
            p-6
            shadow-sm
            sm:p-8
          "
        >
          <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
            Información de la película
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Clasificación
              </p>
              <p className="mt-2 font-semibold text-foreground">
                {movie.rating}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Duración
              </p>
              <p className="mt-2 font-semibold text-foreground">
                {movie.duration}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Formato
              </p>
              <p className="mt-2 font-semibold text-foreground">
                {movie.format}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Fecha de estreno
              </p>
              <p className="mt-2 font-semibold text-foreground">
                {movie.releaseDate ?? 'No disponible'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <Footer />
      </footer>
    </main>
  )
}

export default Details
