import { useMemo, useState } from 'react'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedMovies from './components/FeaturedMovies'
import MovieCarousel from './components/MovieCarousel'
import CarteleraFilters from './components/CarteleraFilters'
import ComingSoonGrid from './components/ComingSoonGrid'
import PromotionsSection from './components/PromotionsSection'
import ExperienceSection from './components/ExperienceSection'
import Footer from './components/Footer'
import AmbientSpotlight from '@/components/ui/AmbientSpotlight'
import {
  featuredMovies,
  nowShowing,
  comingSoon,
  promotions,
  benefits,
} from '@/features/movies/data/movies.mock'

export default function LandingPage() {
  const [genre, setGenre] = useState<string | null>(null)
  const [classification, setClassification] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filteredNowShowing = useMemo(() => {
    return nowShowing.filter((movie) => {
      const matchesGenre = !genre || movie.genres.includes(genre)
      const matchesClassification =
        !classification || movie.rating === classification
      const matchesSearch =
        !search ||
        movie.title.toLowerCase().includes(search.toLowerCase())
      return matchesGenre && matchesClassification && matchesSearch
    })
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

          {filteredNowShowing.length === 0 ? (
            <p className="mx-auto max-w-7xl px-4 py-12 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
              No se encontraron películas con los filtros seleccionados.
            </p>
          ) : (
            <MovieCarousel title="" movies={filteredNowShowing} />
          )}
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