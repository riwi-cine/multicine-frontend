import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MovieCarousel from './components/MovieCarousel'
import ComingSoonGrid from './components/ComingSoonGrid'
import PromotionsSection from './components/PromotionsSection'
import ExperienceSection from './components/ExperienceSection'
import Footer from './components/Footer'
import AmbientSpotlight from '@/components/ui/AmbientSpotlight'
import {
  nowShowing,
  comingSoon,
  promotions,
  benefits,
} from '@/features/movies/data/movies.mock'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F3F5F8] text-foreground">
      {/* Luz reactiva global */}
      <AmbientSpotlight />

      <Navbar />

      <main className="relative z-10 flex min-h-screen flex-col">
        <Hero />

        <MovieCarousel
          id="cartelera"
          title="Cartelera"
          movies={nowShowing}
        />

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