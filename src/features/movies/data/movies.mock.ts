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
  title: 'Abismo Silente',
  genres: ['Ciencia ficción', 'Thriller', 'Aventura'],
  duration: '2h 14min',
  rating: 'PG-13',
  score: 8.6,
  description:
    'Cuando una expedición desciende al punto más profundo del océano, descubren una señal que no debería existir. El silencio del abismo guarda un secreto que cambiará la historia de la humanidad.',
  status: 'Premiere',
  format: 'IMAX · Dolby Atmos',
  palette: { from: '#04222f', to: '#0e5f7a', glow: '#39d0f2' },
}

export const nowShowing: Movie[] = [
  {
    id: 'abismo-silente',
    title: 'Abismo Silente',
    genres: ['Ciencia ficción', 'Thriller'],
    duration: '2h 14min',
    rating: 'PG-13',
    score: 8.6,
    description:
      'Una expedición al punto más profundo del océano descubre una señal que no debería existir.',
    status: 'Premiere',
    format: 'IMAX · Dolby Atmos',
    palette: { from: '#04222f', to: '#0e5f7a', glow: '#39d0f2' },
  },
  {
    id: 'luz-de-medianoche',
    title: 'Luz de Medianoche',
    genres: ['Drama', 'Romance'],
    duration: '1h 58min',
    rating: 'PG',
    score: 8.1,
    description:
      'Dos extraños se encuentran en un faro abandonado y descubren que el pasado se ilumina cuando lo miran juntos.',
    status: 'Today',
    format: '4K',
    palette: { from: '#33080f', to: '#e03a5a', glow: '#ff7a95' },
  },
  {
    id: 'profundidad-9',
    title: 'Profundidad 9',
    genres: ['Acción', 'Aventura'],
    duration: '2h 21min',
    rating: 'PG-13',
    score: 8.9,
    description:
      'Un equipo de rescate submarino se enfrenta a una criatura legendaria en una batalla por llegar a la superficie.',
    status: 'Today',
    format: '4DX · Dolby Atmos',
    palette: { from: '#062e22', to: '#0f9d6f', glow: '#5af2b8' },
  },
  {
    id: 'ultimo-horizonte',
    title: 'El Último Horizonte',
    genres: ['Ciencia ficción', 'Drama'],
    duration: '2h 38min',
    rating: 'R',
    score: 9.0,
    description:
      'La última tripulación que viaja más allá del sistema solar decide si regresar o continuar hacia lo desconocido.',
    status: 'Today',
    format: 'IMAX',
    palette: { from: '#12103a', to: '#4f46e5', glow: '#9aa2ff' },
  },
  {
    id: 'coral',
    title: 'Coral',
    genres: ['Animación', 'Familiar'],
    duration: '1h 44min',
    rating: 'G',
    score: 7.9,
    description:
      'Una joven estrella de mar emprende la búsqueda del arrecife perdido para salvar su hogar de la oscuridad.',
    status: 'Premiere',
    format: '4K',
    palette: { from: '#04262e', to: '#06b6d4', glow: '#7ae8ff' },
  },
  {
    id: 'resaca-azul',
    title: 'Resaca Azul',
    genres: ['Comedia'],
    duration: '1h 52min',
    rating: 'PG-13',
    score: 7.4,
    description:
      'Cuatro amigos despiertan en una isla desierta sin recordar cómo llegaron, con solo una brújula rota.',
    status: 'Coming Soon',
    format: '4K',
    palette: { from: '#2b1506', to: '#d97706', glow: '#ffc37a' },
  },
]

export const premieres: Movie[] = [
  featuredMovie,
  {
    id: 'ultimo-horizonte',
    title: 'El Último Horizonte',
    genres: ['Ciencia ficción', 'Drama'],
    duration: '2h 38min',
    rating: 'R',
    score: 9.0,
    description:
      'La última tripulación que viaja más allá del sistema solar decide si regresar o continuar hacia lo desconocido.',
    status: 'Premiere',
    format: 'IMAX',
    palette: { from: '#12103a', to: '#4f46e5', glow: '#9aa2ff' },
  },
  {
    id: 'mareas-de-marte',
    title: 'Mareas de Marte',
    genres: ['Ciencia ficción'],
    duration: '2h 6min',
    rating: 'PG-13',
    score: 8.4,
    description:
      'En la primera colonia marciana, un océano subterráneo despierta algo que esperaba ser encontrado.',
    status: 'Premiere',
    format: 'IMAX · 4DX',
    palette: { from: '#2e0628', to: '#d6249f', glow: '#ff7ae0' },
  },
  {
    id: 'ojo-de-tormenta',
    title: 'Ojo de la Tormenta',
    genres: ['Thriller'],
    duration: '1h 47min',
    rating: 'R',
    score: 8.0,
    description:
      'Un meteorólogo atrapado en el ojo de un huracán descubre que la tormenta no es natural.',
    status: 'Premiere',
    format: '4K · Dolby Atmos',
    palette: { from: '#051a3a', to: '#2563eb', glow: '#7aa7ff' },
  },
  {
    id: 'ciudad-sumergida',
    title: 'La Ciudad Sumergida',
    genres: ['Aventura'],
    duration: '2h 12min',
    rating: 'PG-13',
    score: 8.3,
    description:
      'Un arqueólogo encuentra una ciudad perdida bajo el mar con tecnología ancestral intacta.',
    status: 'Premiere',
    format: 'IMAX',
    palette: { from: '#0f172a', to: '#475569', glow: '#94a3b8' },
  },
  {
    id: 'noche-de-sirenas',
    title: 'Noche de Sirenas',
    genres: ['Fantasía'],
    duration: '1h 55min',
    rating: 'PG',
    score: 7.8,
    description:
      'Una vez al año, las sirenas suben a la superficie para reclamar un tesoro robado siglos atrás.',
    status: 'Premiere',
    format: '4K',
    palette: { from: '#3a0e2a', to: '#ff6f61', glow: '#ff8a7a' },
  },
  {
    id: 'senales-del-abismo',
    title: 'Señales del Abismo',
    genres: ['Thriller'],
    duration: '2h 2min',
    rating: 'R',
    score: 8.2,
    description:
      'Un grabador de sonido marino capta frecuencias imposibles bajo la Fosa de las Marianas.',
    status: 'Premiere',
    format: 'Dolby Atmos',
    palette: { from: '#2b1506', to: '#d97706', glow: '#ffc37a' },
  },
  {
    id: 'punto-de-ebullicion',
    title: 'Punto de Ebullición',
    genres: ['Acción'],
    duration: '1h 49min',
    rating: 'PG-13',
    score: 7.9,
    description:
      'Un volcán submarino amenaza la costa y solo un equipo de vulcanólogos puede detener la erupción.',
    status: 'Premiere',
    format: '4DX',
    palette: { from: '#33080f', to: '#e03a5a', glow: '#ff7a95' },
  },
  {
    id: 'faro-en-la-niebla',
    title: 'Faro en la Niebla',
    genres: ['Drama', 'Misterio'],
    duration: '1h 58min',
    rating: 'PG-13',
    score: 8.5,
    description:
      'El nuevo guardián de un faro remoto descubre cartas de su predecesor anunciando su propia llegada.',
    status: 'Premiere',
    format: '4K',
    palette: { from: '#062a3a', to: '#0d6e8c', glow: '#39d0f2' },
  },
]

export const comingSoon: Movie[] = [
  {
    id: 'aurora-boreal',
    title: 'Aurora Boreal',
    genres: ['Ciencia ficción'],
    duration: '2h 8min',
    rating: 'PG-13',
    score: 8.7,
    description:
      'La aurora boreal se detiene sobre el Ártico y el tiempo empieza a girar en espiral.',
    status: 'Coming Soon',
    releaseDate: '05 de sep 2026',
    format: 'IMAX · Dolby Atmos',
    palette: { from: '#062e22', to: '#0f9d6f', glow: '#5af2b8' },
  },
  {
    id: 'canto-del-coral',
    title: 'El Canto del Coral',
    genres: ['Animación'],
    duration: '1h 36min',
    rating: 'G',
    score: 7.6,
    description:
      'Un coral guardián reúne a los habitantes del arrecife para salvar su hogar del blanqueamiento.',
    status: 'Coming Soon',
    releaseDate: '12 de sep 2026',
    format: '4K',
    palette: { from: '#04262e', to: '#06b6d4', glow: '#7ae8ff' },
  },
  {
    id: 'profundidad-cero',
    title: 'Profundidad Cero',
    genres: ['Thriller'],
    duration: '1h 50min',
    rating: 'R',
    score: 8.1,
    description:
      'Un buzo de rescate queda atrapado en un cañón submarino en su carrera contra el tiempo.',
    status: 'Coming Soon',
    releaseDate: '19 de sep 2026',
    format: '4DX · Dolby Atmos',
    palette: { from: '#04222f', to: '#0e5f7a', glow: '#39d0f2' },
  },
  {
    id: 'reina-de-las-mareas',
    title: 'Reina de las Mareas',
    genres: ['Drama'],
    duration: '2h 3min',
    rating: 'PG',
    score: 8.0,
    description:
      'Una bióloga marina hereda un faro y un secreto familiar atado al ritmo de las mareas.',
    status: 'Coming Soon',
    releaseDate: '26 de sep 2026',
    format: '4K',
    palette: { from: '#3a0e2a', to: '#ff6f61', glow: '#ff8a7a' },
  },
  {
    id: 'hidra',
    title: 'Hidra',
    genres: ['Acción'],
    duration: '2h 16min',
    rating: 'PG-13',
    score: 8.8,
    description:
      'Un agente secreto persigue a una organización que controla los océanos del mundo.',
    status: 'Coming Soon',
    releaseDate: '03 de oct 2026',
    format: 'IMAX · 4DX',
    palette: { from: '#2e0628', to: '#d6249f', glow: '#ff7ae0' },
  },
  {
    id: 'vela-blanca',
    title: 'Vela Blanca',
    genres: ['Romance'],
    duration: '1h 46min',
    rating: 'PG',
    score: 7.7,
    description:
      'Una regata transoceánica une a dos rivales que descubren que el mar tiene sus propias reglas.',
    status: 'Coming Soon',
    releaseDate: '10 de oct 2026',
    format: '4K',
    palette: { from: '#051a3a', to: '#2563eb', glow: '#7aa7ff' },
  },
]

export const promotions: Promotion[] = [
  {
    id: 'dos-por-uno',
    icon: Ticket,
    accent: 'from-primary to-primary/70',
    text: 'text-primary',
    tag: 'TODOS LOS LUNES',
    title: '2x1 en Boletas',
    description:
      'Compra una boleta y lleva a un acompañante gratis a cualquier función, todos los lunes.',
  },
  {
    id: 'martes-descuento',
    icon: BadgePercent,
    accent: 'from-primary to-primary/70',
    text: 'text-primary',
    tag: '50% DE DESCUENTO',
    title: 'Martes de Descuento',
    description: 'Todas las boletas con 50% de descuento los martes. El plan perfecto a mitad de precio.',
  },
  {
    id: 'membresia-vip',
    icon: Crown,
    accent: 'from-primary to-primary/70',
    text: 'text-primary',
    tag: 'ACCESO ANTICIPADO',
    title: 'Membresía VIP',
    description:
      'Acceso anticipado a estrenos, salas premium, puntos por compra y beneficios exclusivos.',
  },
  {
    id: 'combos-comida',
    icon: Popcorn,
    accent: 'from-primary to-primary/70',
    text: 'text-primary',
    tag: 'HASTA 30% DE DESCUENTO',
    title: 'Combos de Comida',
    description:
      'Crispetas dulces o saladas, bebidas y snacks premium para acompañar tu función al mejor precio.',
  },
]

export const benefits: Benefit[] = [
  {
    id: 'imax',
    icon: MonitorPlay,
    title: 'Salas IMAX',
    description: 'Pantallas gigantes con proyección láser 4K e inmersión total.',
  },
  {
    id: 'dolby-atmos',
    icon: Waves,
    title: 'Dolby Atmos',
    description: 'Sonido tridimensional que se mueve alrededor de ti en cada escena.',
  },
  {
    id: 'cuatro-dx',
    icon: Armchair,
    title: 'Experiencia 4DX',
    description: 'Movimiento, viento, aroma y efectos especiales justo en tu asiento.',
  },
  {
    id: 'compra-online',
    icon: Smartphone,
    title: 'Compra en línea',
    description: 'Reserva y paga tus boletas desde cualquier dispositivo, sin filas.',
  },
  {
    id: 'reserva-anticipada',
    icon: CalendarClock,
    title: 'Reserva anticipada',
    description: 'Elige tu asiento favorito días antes del estreno.',
  },
  {
    id: 'snacks-premium',
    icon: CupSoda,
    title: 'Snacks premium',
    description: 'Combos gourmet, café de especialidad y repostería artesanal.',
  },
]
