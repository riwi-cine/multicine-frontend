import {
  Armchair,
  BadgePercent,
  CalendarClock,
  Crown,
  CupSoda,
  MonitorPlay,
  Popcorn,
  Smartphone,
  Ticket,
  Waves,
  type LucideIcon,
} from 'lucide-react'

export type MovieStatus = 'Premiere' | 'Today' | 'Coming Soon'

export interface MoviePalette {
  from: string
  to: string
  glow: string
}

export interface Movie {
  id: string
  title: string
  genres: string[]
  duration: string
  rating: string
  score: number
  description: string
  status: MovieStatus
  releaseDate?: string
  format: string
  palette: MoviePalette
}

export interface Promotion {
  id: string
  icon: LucideIcon
  accent: string
  text: string
  tag: string
  title: string
  description: string
}

export interface Benefit {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

export const featuredMovie: Movie = {
  id: 'abismo-silente',
  title: 'Silent Abyss',
  genres: ['Sci-Fi', 'Thriller', 'Adventure'],
  duration: '2h 14m',
  rating: 'PG-13',
  score: 8.6,
  description:
    'When an expedition descends to the deepest point of the ocean, they discover a signal that should not exist. The silence of the abyss holds a secret that will change human history.',
  status: 'Premiere',
  format: 'IMAX · Dolby Atmos',
  palette: { from: '#04222f', to: '#0e5f7a', glow: '#39d0f2' },
}

export const nowShowing: Movie[] = [
  {
    id: 'abismo-silente',
    title: 'Silent Abyss',
    genres: ['Sci-Fi', 'Thriller'],
    duration: '2h 14m',
    rating: 'PG-13',
    score: 8.6,
    description:
      'An expedition to the deepest point of the ocean discovers a signal that should not exist.',
    status: 'Premiere',
    format: 'IMAX · Dolby Atmos',
    palette: { from: '#04222f', to: '#0e5f7a', glow: '#39d0f2' },
  },
  {
    id: 'luz-de-medianoche',
    title: 'Midnight Light',
    genres: ['Drama', 'Romance'],
    duration: '1h 58m',
    rating: 'PG',
    score: 8.1,
    description:
      'Two strangers meet at an abandoned lighthouse and discover the past illuminates when they look together.',
    status: 'Today',
    format: '4K',
    palette: { from: '#33080f', to: '#e03a5a', glow: '#ff7a95' },
  },
  {
    id: 'profundidad-9',
    title: 'Depth 9',
    genres: ['Action', 'Adventure'],
    duration: '2h 21m',
    rating: 'PG-13',
    score: 8.9,
    description:
      'An underwater rescue team faces a legendary creature in a battle for the surface.',
    status: 'Today',
    format: '4DX · Dolby Atmos',
    palette: { from: '#062e22', to: '#0f9d6f', glow: '#5af2b8' },
  },
  {
    id: 'ultimo-horizonte',
    title: 'The Last Horizon',
    genres: ['Sci-Fi', 'Drama'],
    duration: '2h 38m',
    rating: 'R',
    score: 9.0,
    description:
      'The last crew traveling beyond the solar system decides whether to return or continue into the unknown.',
    status: 'Today',
    format: 'IMAX',
    palette: { from: '#12103a', to: '#4f46e5', glow: '#9aa2ff' },
  },
  {
    id: 'coral',
    title: 'Coral',
    genres: ['Animation', 'Family'],
    duration: '1h 44m',
    rating: 'G',
    score: 7.9,
    description:
      'A young starfish embarks on a quest to find the lost reef and save her home from darkness.',
    status: 'Premiere',
    format: '4K',
    palette: { from: '#04262e', to: '#06b6d4', glow: '#7ae8ff' },
  },
  {
    id: 'resaca-azul',
    title: 'Blue Hangover',
    genres: ['Comedy'],
    duration: '1h 52m',
    rating: 'PG-13',
    score: 7.4,
    description:
      'Four friends wake up on a deserted island with no memory of how they got there and only a broken compass.',
    status: 'Coming Soon',
    format: '4K',
    palette: { from: '#2b1506', to: '#d97706', glow: '#ffc37a' },
  },
]

export const premieres: Movie[] = [
  featuredMovie,
  {
    id: 'ultimo-horizonte',
    title: 'The Last Horizon',
    genres: ['Sci-Fi', 'Drama'],
    duration: '2h 38m',
    rating: 'R',
    score: 9.0,
    description:
      'The last crew traveling beyond the solar system decides whether to return or continue into the unknown.',
    status: 'Premiere',
    format: 'IMAX',
    palette: { from: '#12103a', to: '#4f46e5', glow: '#9aa2ff' },
  },
  {
    id: 'mareas-de-marte',
    title: 'Tides of Mars',
    genres: ['Sci-Fi'],
    duration: '2h 6m',
    rating: 'PG-13',
    score: 8.4,
    description:
      'In the first Martian colony, a subterranean ocean awakens something that was waiting to be found.',
    status: 'Premiere',
    format: 'IMAX · 4DX',
    palette: { from: '#2e0628', to: '#d6249f', glow: '#ff7ae0' },
  },
  {
    id: 'ojo-de-tormenta',
    title: 'Eye of the Storm',
    genres: ['Thriller'],
    duration: '1h 47m',
    rating: 'R',
    score: 8.0,
    description:
      'A meteorologist trapped in the eye of a hurricane discovers the storm is not natural.',
    status: 'Premiere',
    format: '4K · Dolby Atmos',
    palette: { from: '#051a3a', to: '#2563eb', glow: '#7aa7ff' },
  },
  {
    id: 'ciudad-sumergida',
    title: 'The Submerged City',
    genres: ['Adventure'],
    duration: '2h 12m',
    rating: 'PG-13',
    score: 8.3,
    description:
      'An archaeologist finds a lost city under the sea with ancient technology intact.',
    status: 'Premiere',
    format: 'IMAX',
    palette: { from: '#0f172a', to: '#475569', glow: '#94a3b8' },
  },
  {
    id: 'noche-de-sirenas',
    title: 'Mermaid Night',
    genres: ['Fantasy'],
    duration: '1h 55m',
    rating: 'PG',
    score: 7.8,
    description:
      'Once a year, mermaids swim to the surface to reclaim a treasure stolen centuries ago.',
    status: 'Premiere',
    format: '4K',
    palette: { from: '#3a0e2a', to: '#ff6f61', glow: '#ff8a7a' },
  },
  {
    id: 'senales-del-abismo',
    title: 'Signals from the Abyss',
    genres: ['Thriller'],
    duration: '2h 2m',
    rating: 'R',
    score: 8.2,
    description:
      'A marine sound recordist captures impossible frequencies beneath the Mariana Trench.',
    status: 'Premiere',
    format: 'Dolby Atmos',
    palette: { from: '#2b1506', to: '#d97706', glow: '#ffc37a' },
  },
  {
    id: 'punto-de-ebullicion',
    title: 'Boiling Point',
    genres: ['Action'],
    duration: '1h 49m',
    rating: 'PG-13',
    score: 7.9,
    description:
      'An underwater volcano threatens the coast and only a team of volcanologists can stop the eruption.',
    status: 'Premiere',
    format: '4DX',
    palette: { from: '#33080f', to: '#e03a5a', glow: '#ff7a95' },
  },
  {
    id: 'faro-en-la-niebla',
    title: 'Lighthouse in the Fog',
    genres: ['Drama', 'Mystery'],
    duration: '1h 58m',
    rating: 'PG-13',
    score: 8.5,
    description:
      'The new keeper of a remote lighthouse discovers letters from his predecessor announcing his own arrival.',
    status: 'Premiere',
    format: '4K',
    palette: { from: '#062a3a', to: '#0d6e8c', glow: '#39d0f2' },
  },
]

export const comingSoon: Movie[] = [
  {
    id: 'aurora-boreal',
    title: 'Northern Lights',
    genres: ['Sci-Fi'],
    duration: '2h 8m',
    rating: 'PG-13',
    score: 8.7,
    description:
      'The northern lights stop over the Arctic and time begins to spiral.',
    status: 'Coming Soon',
    releaseDate: '05 Sep 2026',
    format: 'IMAX · Dolby Atmos',
    palette: { from: '#062e22', to: '#0f9d6f', glow: '#5af2b8' },
  },
  {
    id: 'canto-del-coral',
    title: 'The Coral Song',
    genres: ['Animation'],
    duration: '1h 36m',
    rating: 'G',
    score: 7.6,
    description:
      'A guardian coral gathers reef inhabitants to save their home from bleaching.',
    status: 'Coming Soon',
    releaseDate: '12 Sep 2026',
    format: '4K',
    palette: { from: '#04262e', to: '#06b6d4', glow: '#7ae8ff' },
  },
  {
    id: 'profundidad-cero',
    title: 'Depth Zero',
    genres: ['Thriller'],
    duration: '1h 50m',
    rating: 'R',
    score: 8.1,
    description:
      'A rescue diver gets trapped in an underwater canyon at zero depth for salvation.',
    status: 'Coming Soon',
    releaseDate: '19 Sep 2026',
    format: '4DX · Dolby Atmos',
    palette: { from: '#04222f', to: '#0e5f7a', glow: '#39d0f2' },
  },
  {
    id: 'reina-de-las-mareas',
    title: 'Queen of Tides',
    genres: ['Drama'],
    duration: '2h 3m',
    rating: 'PG',
    score: 8.0,
    description:
      'A marine biologist inherits a lighthouse and a family secret tied to the rhythm of the tides.',
    status: 'Coming Soon',
    releaseDate: '26 Sep 2026',
    format: '4K',
    palette: { from: '#3a0e2a', to: '#ff6f61', glow: '#ff8a7a' },
  },
  {
    id: 'hidra',
    title: 'Hydra',
    genres: ['Action'],
    duration: '2h 16m',
    rating: 'PG-13',
    score: 8.8,
    description:
      'A secret agent pursues an organization that controls the world\'s oceans.',
    status: 'Coming Soon',
    releaseDate: '03 Oct 2026',
    format: 'IMAX · 4DX',
    palette: { from: '#2e0628', to: '#d6249f', glow: '#ff7ae0' },
  },
  {
    id: 'vela-blanca',
    title: 'White Sail',
    genres: ['Romance'],
    duration: '1h 46m',
    rating: 'PG',
    score: 7.7,
    description:
      'A transoceanic regatta brings two rivals together who discover the sea plays its own cards.',
    status: 'Coming Soon',
    releaseDate: '10 Oct 2026',
    format: '4K',
    palette: { from: '#051a3a', to: '#2563eb', glow: '#7aa7ff' },
  },
]

export const promotions: Promotion[] = [
  {
    id: 'dos-por-uno',
    icon: Ticket,
    accent: 'from-coral-500 to-coral-600',
    text: 'text-coral-400',
    tag: 'EVERY MONDAY',
    title: '2x1 Tickets',
    description:
      'Buy one ticket and bring a guest free to any showtime, every Monday.',
  },
  {
    id: 'martes-descuento',
    icon: BadgePercent,
    accent: 'from-ocean-500 to-ocean-600',
    text: 'text-ocean-400',
    tag: '50% OFF',
    title: 'Discount Tuesdays',
    description:
      'All tickets 50% off on Tuesdays. A perfect plan at half price.',
  },
  {
    id: 'membresia-vip',
    icon: Crown,
    accent: 'from-gold-400 to-amber-600',
    text: 'text-gold-400',
    tag: 'EARLY ACCESS',
    title: 'VIP Membership',
    description:
      'Early access to premieres, premium theaters, points per purchase and exclusive benefits.',
  },
  {
    id: 'combos-comida',
    icon: Popcorn,
    accent: 'from-teal-400 to-teal-600',
    text: 'text-teal-400',
    tag: 'UP TO 30% OFF',
    title: 'Food Combos',
    description:
      'Sweet or salty popcorn, drinks and premium snacks to accompany your show at the best price.',
  },
]

export const benefits: Benefit[] = [
  {
    id: 'imax',
    icon: MonitorPlay,
    title: 'IMAX Theaters',
    description:
      'Giant screens with 4K laser projection and total immersion.',
  },
  {
    id: 'dolby-atmos',
    icon: Waves,
    title: 'Dolby Atmos',
    description:
      'Three-dimensional sound that moves around you in every scene.',
  },
  {
    id: 'cuatro-dx',
    icon: Armchair,
    title: '4DX Experience',
    description:
      'Motion, wind, scent and special effects right in your seat.',
  },
  {
    id: 'compra-online',
    icon: Smartphone,
    title: 'Online Purchase',
    description:
      'Reserve and pay for tickets from any device, no lines.',
  },
  {
    id: 'reserva-anticipada',
    icon: CalendarClock,
    title: 'Advance Booking',
    description:
      'Pick your favorite seat days before the premiere.',
  },
  {
    id: 'snacks-premium',
    icon: CupSoda,
    title: 'Premium Snacks',
    description: 'Gourmet combos, specialty coffee and artisanal confectionery.',
  },
]
