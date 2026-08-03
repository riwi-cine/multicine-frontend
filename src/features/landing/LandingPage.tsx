import { Helmet } from 'react-helmet-async'

import Benefits from './components/Benefits'
import ComingSoon from './components/ComingSoon'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import NowShowing from './components/NowShowing'
import Premieres from './components/Premieres'
import Promotions from './components/Promotions'

function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <Helmet>
        <title>Multicine · Cine como en el océano</title>
        <meta
          name="description"
          content="Vive el cine como nunca en Multicine. Cartelera, estrenos, promociones y salas premium inspiradas en el océano profundo."
        />
      </Helmet>

      <Navbar />
      <main>
        <Hero />
        <NowShowing />
        <Premieres />
        <Promotions />
        <Benefits />
        <ComingSoon />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage
