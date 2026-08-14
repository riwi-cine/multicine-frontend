import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedMovies from './components/FeaturedMovies'
import MovieCarousel from './components/MovieCarousel'
import ComingSoonGrid from './components/ComingSoonGrid'
import PromotionsSection from './components/PromotionsSection'
import ExperienceSection from './components/ExperienceSection'
import Footer from './components/Footer'
import {
  featuredMovies,
  nowShowing,
  comingSoon,
  promotions,
  benefits,
} from '@/features/movies/data/movies.mock'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />

      <main className="relative flex flex-col min-h-screen space-y-8">
        <Hero />
        <FeaturedMovies
          id="destacadas"
          title="Películas destacadas"
          description="Lo mejor del cine en pantalla ahora mismo. Las historias que más están dando de qué hablar, elegidas por nuestro público."
          movies={featuredMovies}
        />
        <MovieCarousel id="cartelera" title="Cartelera" movies={nowShowing} />
        <ComingSoonGrid id="proximamente" title="Próximamente" movies={comingSoon} />
        <PromotionsSection id="promociones" title="Promociones" promotions={promotions} />
        <ExperienceSection id="experiencia" benefits={benefits} />
      </main>

      <Footer />
    </div>
  )
}
