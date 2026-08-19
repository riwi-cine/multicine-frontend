import { useEffect, useMemo, useState } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedMovies from './components/FeaturedMovies'
import MovieCarousel from './components/MovieCarousel'
import CarteleraFilters from './components/CarteleraFilters'
import CarteleraEmptyState from './components/CarteleraEmptyState'
import MovieCardSkeleton from './components/MovieCardSkeleton'
import ComingSoonGrid from './components/ComingSoonGrid'
import PromotionsSection from './components/PromotionsSection'
import ExperienceSection from './components/ExperienceSection'
import Footer from './components/Footer'
import AmbientSpotlight from '@/components/ui/AmbientSpotlight'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import {
  featuredMovies,
  nowShowing,
  comingSoon,
  promotions,
  benefits,
  type Movie,
} from '@/features/movies/data/movies.mock'

export default function LandingPage() {
  const [genre, setGenre] = useState<string | null>(null)
  const [classification, setClassification] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [isLoadingCartelera, setIsLoadingCartelera] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoadingCartelera(false), 900)
    return () => clearTimeout(timer)
  }, [])

  // Resultado del filtrado + posible error, calculados juntos para no
  // disparar setState como efecto secundario dentro del useMemo.
  const { movies: filteredNowShowing, error: carteleraError } = useMemo<{
    movies: Movie[]
    error: string | null
  }>(() => {
    try {
      const source = nowShowing ?? []

      const result = source.filter((movie) => {
        // Defensive: The fields for each movie might be incomplete; without this, a malformed data entry (e.g., `genres` undefined) would cause the entire “What's Playing” section to fail.
        const movieGenres = movie?.genres ?? []
        const movieTitle = movie?.title ?? ''

        const matchesGenre = !genre || movieGenres.includes(genre)
        const matchesClassification =
          !classification || movie?.rating === classification
        const matchesSearch =
          !search || movieTitle.toLowerCase().includes(search.toLowerCase())

        return matchesGenre && matchesClassification && matchesSearch
      })

      return { movies: result, error: null }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('[Cartelera] Error al filtrar películas:', error)
      }
      return {
        movies: [],
        error: 'No pudimos cargar la cartelera. Intenta de nuevo.',
      }
    }
  }, [genre, classification, search])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F3F5F8] text-foreground">
      {/* Luz reactiva global */}
      <AmbientSpotlight />

      <Navbar />

      <main className="relative z-10 flex min-h-screen flex-col">
        <Hero />
        <FeaturedMovies
          id="destacadas"
          title="Películas destacadas"
          description="Lo mejor del cine en pantalla ahora mismo. Las historias que más están dando de qué hablar, elegidas por nuestro público."
          movies={featuredMovies}
        />

        <section id="cartelera" className="w-full bg-[#E3E7EF] pt-10 sm:pt-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading mb-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Cartelera
            </h2>
            <CarteleraFilters
              movies={nowShowing}
              genre={genre}
              classification={classification}
              search={search}
              onGenreChange={setGenre}
              onClassificationChange={setClassification}
              onSearchChange={setSearch}
            />
          </div>

          <ErrorBoundary message="Ocurrió un problema mostrando la Cartelera.">
            {isLoadingCartelera ? (
              <div className="mx-auto flex max-w-7xl gap-4 overflow-hidden px-4 pb-10 sm:px-6 lg:px-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <MovieCardSkeleton key={i} />
                ))}
              </div>
            ) : carteleraError ? (
              <CarteleraEmptyState message={carteleraError} />
            ) : filteredNowShowing.length === 0 ? (
              <CarteleraEmptyState />
            ) : (
              <MovieCarousel title="" movies={filteredNowShowing} />
            )}
          </ErrorBoundary>
        </section>

        <ComingSoonGrid
          id="proximamente"
          title="Próximamente"
          movies={comingSoon}
        />

        <PromotionsSection
          id="promociones"
          title="Promociones"
          promotions={promotions}
        />

        <ExperienceSection
          id="experiencia"
          benefits={benefits}
        />
      </main>

      <Footer />
    </div>
  )
}