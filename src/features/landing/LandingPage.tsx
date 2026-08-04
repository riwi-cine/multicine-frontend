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
        <title>Multicine · Cinema like the ocean</title>
        <meta
          name="description"
          content="Experience cinema like never before at Multicine. Showtimes, premieres, promotions and premium theaters inspired by the deep ocean."
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
