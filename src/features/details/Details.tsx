import { useEffect, useState } from 'react'
import { Ticket, Star } from 'lucide-react'

import { Button } from '@/components/button'
import { MovieArtwork } from '@/features/movies'
import type { Movie } from '@/features/movies'
import { featuredMovies } from '@/features/movies/types/movies.types'

import Footer from '../landing/components/Footer'
import Navbar from '../landing/components/Navbar'

const Details = () => {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const movieToShow = featuredMovies.find(
      (movie) => movie.id === 'dune-part-two',
    )

    setMovie(movieToShow ?? null)
  }, [])

  if (!movie) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">
          Película no encontrada
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">

      {/* =========================
          HERO / DETALLE PRINCIPAL
          ========================= */}
      <section className="relative isolate min-h-[700px] overflow-hidden">

        <nav>
            <Navbar/>
        </nav>

        {/* Imagen de fondo */}
        <div className="absolute inset-0 -z-20">
          <MovieArtwork
            palette={movie.palette}
            image={movie.image}
            variant="backdrop"
            className="h-full w-full"
          />
        </div>

        {/* Overlay principal */}
        <div
          className="
            absolute inset-0 -z-10
            bg-linear-to-r
            from-black/95
            via-black/75
            to-black/30
          "
        />

        {/* Overlay inferior */}
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

        {/* Contenido */}
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

            {/* =========================
                POSTER
                ========================= */}
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

            {/* =========================
                INFORMACIÓN
                ========================= */}
            <div className="max-w-3xl text-center md:text-left">

              {/* Estado */}
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

              {/* Título */}
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

              {/* Información rápida */}
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
                      <Star
                        size={16}
                        className="fill-accent text-accent"
                      />
                      {movie.score.toFixed(1)}
                    </span>
                  </>
                )}
              </div>

              {/* Géneros */}
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

              {/* Sinopsis */}
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

              {/* Botón */}
              <div className="mt-8 flex justify-center md:justify-start">
                <Button
                  size="lg"
                  className="
                    h-12
                    rounded-xl
                    bg-linear-to-r
                    from-[#800021]
                    to-primary
                    px-7
                    text-base
                    text-white
                    shadow-lg
                    shadow-primary/25
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:shadow-xl
                    hover:shadow-primary/35
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

      {/* =========================
          INFORMACIÓN ADICIONAL
          ========================= */}
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
          <h2
            className="
              font-heading
              text-xl
              font-bold
              tracking-tight
              text-foreground
            "
          >
            Información de la película
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {/* Clasificación */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Clasificación
              </p>

              <p className="mt-2 font-semibold text-foreground">
                {movie.rating}
              </p>
            </div>

            {/* Duración */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Duración
              </p>

              <p className="mt-2 font-semibold text-foreground">
                {movie.duration}
              </p>
            </div>

            {/* Formato */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Formato
              </p>

              <p className="mt-2 font-semibold text-foreground">
                {movie.format}
              </p>
            </div>

            {/* Estreno */}
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
        <Footer/>
      </footer>
    </main>
    
  )
}

export default Details