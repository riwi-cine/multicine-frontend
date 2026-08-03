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

export type MovieStatus = 'Estreno' | 'Hoy' | 'Próximamente'

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
  genres: ['Ciencia ficción', 'Suspenso', 'Aventura'],
  duration: '2h 14m',
  rating: 'PG-13',
  score: 8.6,
  description:
    'Cuando una expedición desciende al punto más profundo del océano, descubre una señal que no debería existir. El silencio del abismo guarda un secreto que cambiará la historia de la humanidad.',
  status: 'Estreno',
  format: 'IMAX · Dolby Atmos',
  palette: { from: '#04222f', to: '#0e5f7a', glow: '#39d0f2' },
}

export const nowShowing: Movie[] = [
  {
    id: 'abismo-silente',
    title: 'Abismo Silente',
    genres: ['Ciencia ficción', 'Suspenso'],
    duration: '2h 14m',
    rating: 'PG-13',
    score: 8.6,
    description:
      'Una expedición al punto más profundo del océano descubre una señal que no debería existir.',
    status: 'Estreno',
    format: 'IMAX · Dolby Atmos',
    palette: { from: '#04222f', to: '#0e5f7a', glow: '#39d0f2' },
  },
  {
    id: 'luz-de-medianoche',
    title: 'Luz de Medianoche',
    genres: ['Drama', 'Romance'],
    duration: '1h 58m',
    rating: 'PG',
    score: 8.1,
    description:
      'Dos desconocidos se encuentran en un faro abandonado y descubren que el pasado se ilumina al mirar juntos.',
    status: 'Hoy',
    format: '4K',
    palette: { from: '#33080f', to: '#e03a5a', glow: '#ff7a95' },
  },
  {
    id: 'profundidad-9',
    title: 'Profundidad 9',
    genres: ['Acción', 'Aventura'],
    duration: '2h 21m',
    rating: 'PG-13',
    score: 8.9,
    description:
      'Un equipo de rescate submarino enfrenta a una criatura legendaria en una batalla por la superficie.',
    status: 'Hoy',
    format: '4DX · Dolby Atmos',
    palette: { from: '#062e22', to: '#0f9d6f', glow: '#5af2b8' },
  },
  {
    id: 'ultimo-horizonte',
    title: 'El Último Horizonte',
    genres: ['Ciencia ficción', 'Drama'],
    duration: '2h 38m',
    rating: 'R',
    score: 9.0,
    description:
      'La última tripulación que viaja más allá del sistema solar decide si regresar o seguir hacia lo desconocido.',
    status: 'Hoy',
    format: 'IMAX',
    palette: { from: '#12103a', to: '#4f46e5', glow: '#9aa2ff' },
  },
  {
    id: 'coral',
    title: 'Coral',
    genres: ['Animación', 'Familiar'],
    duration: '1h 44m',
    rating: 'G',
    score: 7.9,
    description:
      'Una joven estrella de mar parte en busca del arrecife perdido para salvar su hogar de la oscuridad.',
    status: 'Estreno',
    format: '4K',
    palette: { from: '#04262e', to: '#06b6d4', glow: '#7ae8ff' },
  },
  {
    id: 'resaca-azul',
    title: 'Resaca Azul',
    genres: ['Comedia'],
    duration: '1h 52m',
    rating: 'PG-13',
    score: 7.4,
    description:
      'Cuatro amigos despiertan en una isla desierta sin recordar cómo llegaron y solo con una brújula rota.',
    status: 'Próximamente',
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
    duration: '2h 38m',
    rating: 'R',
    score: 9.0,
    description:
      'La última tripulación que viaja más allá del sistema solar decide si regresar o seguir hacia lo desconocido.',
    status: 'Estreno',
    format: 'IMAX',
    palette: { from: '#12103a', to: '#4f46e5', glow: '#9aa2ff' },
  },
  {
    id: 'mareas-de-marte',
    title: 'Mareas de Marte',
    genres: ['Ciencia ficción'],
    duration: '2h 6m',
    rating: 'PG-13',
    score: 8.4,
    description:
      'En la primera colonia marciana, un océano subterráneo despierta algo que esperaba a ser encontrado.',
    status: 'Estreno',
    format: 'IMAX · 4DX',
    palette: { from: '#2e0628', to: '#d6249f', glow: '#ff7ae0' },
  },
  {
    id: 'ojo-de-tormenta',
    title: 'Ojo de Tormenta',
    genres: ['Thriller'],
    duration: '1h 47m',
    rating: 'R',
    score: 8.0,
    description:
      'Un meteorólogo atrapado en el ojo de un huracán descubre que la tormenta no es natural.',
    status: 'Estreno',
    format: '4K · Dolby Atmos',
    palette: { from: '#051a3a', to: '#2563eb', glow: '#7aa7ff' },
  },
  {
    id: 'ciudad-sumergida',
    title: 'La Ciudad Sumergida',
    genres: ['Aventura'],
    duration: '2h 12m',
    rating: 'PG-13',
    score: 8.3,
    description:
      'Una arqueóloga encuentra una ciudad perdida bajo el mar con tecnología milenaria intacta.',
    status: 'Estreno',
    format: 'IMAX',
    palette: { from: '#0f172a', to: '#475569', glow: '#94a3b8' },
  },
  {
    id: 'noche-de-sirenas',
    title: 'Noche de Sirenas',
    genres: ['Fantasía'],
    duration: '1h 55m',
    rating: 'PG',
    score: 7.8,
    description:
      'Una noche al año las sirenas nadan hacia la superficie para recuperar un tesoro robado hace siglos.',
    status: 'Estreno',
    format: '4K',
    palette: { from: '#3a0e2a', to: '#ff6f61', glow: '#ff8a7a' },
  },
  {
    id: 'senales-del-abismo',
    title: 'Señales del Abismo',
    genres: ['Suspenso'],
    duration: '2h 2m',
    rating: 'R',
    score: 8.2,
    description:
      'Una sonidista marina capta frecuencias imposibles bajo la fosa de las Marianas.',
    status: 'Estreno',
    format: 'Dolby Atmos',
    palette: { from: '#2b1506', to: '#d97706', glow: '#ffc37a' },
  },
  {
    id: 'punto-de-ebullicion',
    title: 'Punto de Ebullición',
    genres: ['Acción'],
    duration: '1h 49m',
    rating: 'PG-13',
    score: 7.9,
    description:
      'Un volcán submarino amenaza la costa y solo un equipo de vulcanólogos puede detener la erupción.',
    status: 'Estreno',
    format: '4DX',
    palette: { from: '#33080f', to: '#e03a5a', glow: '#ff7a95' },
  },
  {
    id: 'faro-en-la-niebla',
    title: 'Faro en la Niebla',
    genres: ['Drama', 'Misterio'],
    duration: '1h 58m',
    rating: 'PG-13',
    score: 8.5,
    description:
      'El nuevo guardián de un faro remoto descubre las cartas de su predecesor que anunciaban su propia llegada.',
    status: 'Estreno',
    format: '4K',
    palette: { from: '#062a3a', to: '#0d6e8c', glow: '#39d0f2' },
  },
]

export const comingSoon: Movie[] = [
  {
    id: 'aurora-boreal',
    title: 'Aurora Boreal',
    genres: ['Ciencia ficción'],
    duration: '2h 8m',
    rating: 'PG-13',
    score: 8.7,
    description:
      'La aurora boreal se detiene sobre el Ártico y el tiempo empieza a doblarse en espiral.',
    status: 'Próximamente',
    releaseDate: '05 Sep 2026',
    format: 'IMAX · Dolby Atmos',
    palette: { from: '#062e22', to: '#0f9d6f', glow: '#5af2b8' },
  },
  {
    id: 'canto-del-coral',
    title: 'El Canto del Coral',
    genres: ['Animación'],
    duration: '1h 36m',
    rating: 'G',
    score: 7.6,
    description:
      'Un coral guardián reúne a los habitantes del arrecife para salvar su hogar del blanqueo.',
    status: 'Próximamente',
    releaseDate: '12 Sep 2026',
    format: '4K',
    palette: { from: '#04262e', to: '#06b6d4', glow: '#7ae8ff' },
  },
  {
    id: 'profundidad-cero',
    title: 'Profundidad 0',
    genres: ['Suspenso'],
    duration: '1h 50m',
    rating: 'R',
    score: 8.1,
    description:
      'Un buzo de rescate queda atrapado en un cañón submarino a profundidad cero de salvación.',
    status: 'Próximamente',
    releaseDate: '19 Sep 2026',
    format: '4DX · Dolby Atmos',
    palette: { from: '#04222f', to: '#0e5f7a', glow: '#39d0f2' },
  },
  {
    id: 'reina-de-las-mareas',
    title: 'Reina de las Mareas',
    genres: ['Drama'],
    duration: '2h 3m',
    rating: 'PG',
    score: 8.0,
    description:
      'Una bióloga marina hereda un faro y un secreto familiar ligado al ritmo de las mareas.',
    status: 'Próximamente',
    releaseDate: '26 Sep 2026',
    format: '4K',
    palette: { from: '#3a0e2a', to: '#ff6f61', glow: '#ff8a7a' },
  },
  {
    id: 'hidra',
    title: 'Hidra',
    genres: ['Acción'],
    duration: '2h 16m',
    rating: 'PG-13',
    score: 8.8,
    description:
      'Un agente secreto persigue a una organización que controla los océanos del mundo.',
    status: 'Próximamente',
    releaseDate: '03 Oct 2026',
    format: 'IMAX · 4DX',
    palette: { from: '#2e0628', to: '#d6249f', glow: '#ff7ae0' },
  },
  {
    id: 'vela-blanca',
    title: 'Vela Blanca',
    genres: ['Romance'],
    duration: '1h 46m',
    rating: 'PG',
    score: 7.7,
    description:
      'Un regata transoceánica reúne a dos rivales que descubren que el mar juega sus propias cartas.',
    status: 'Próximamente',
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
    tag: 'TODOS LOS LUNES',
    title: '2x1 en Entradas',
    description:
      'Compra una entrada y lleva a una persona gratis a cualquier función, todos los lunes.',
  },
  {
    id: 'martes-descuento',
    icon: BadgePercent,
    accent: 'from-ocean-500 to-ocean-600',
    text: 'text-ocean-400',
    tag: '50% OFF',
    title: 'Martes de Descuento',
    description:
      'Los martes todas las entradas con 50% de descuento. Un plan perfecto a mitad de precio.',
  },
  {
    id: 'membresia-vip',
    icon: Crown,
    accent: 'from-gold-400 to-amber-600',
    text: 'text-gold-400',
    tag: 'ACCESO ANTICIPADO',
    title: 'Membresía VIP',
    description:
      'Acceso anticipado a estrenos, salas premium, puntos por cada compra y beneficios exclusivos.',
  },
  {
    id: 'combos-comida',
    icon: Popcorn,
    accent: 'from-teal-400 to-teal-600',
    text: 'text-teal-400',
    tag: 'HASTA 30% OFF',
    title: 'Combos de Comida',
    description:
      'Popcorn dulce o salado, bebidas y snacks premium para acompañar tu función al mejor precio.',
  },
]

export const benefits: Benefit[] = [
  {
    id: 'imax',
    icon: MonitorPlay,
    title: 'Salas IMAX',
    description:
      'Pantallas gigantes con proyección láser 4K y una inmersión total.',
  },
  {
    id: 'dolby-atmos',
    icon: Waves,
    title: 'Dolby Atmos',
    description:
      'Sonido tridimensional que se mueve a tu alrededor en cada escena.',
  },
  {
    id: 'cuatro-dx',
    icon: Armchair,
    title: 'Experiencia 4DX',
    description:
      'Movimiento, viento, aroma y efectos especiales dentro de tu butaca.',
  },
  {
    id: 'compra-online',
    icon: Smartphone,
    title: 'Compra Online',
    description:
      'Reserva y paga tus entradas desde cualquier dispositivo, sin filas.',
  },
  {
    id: 'reserva-anticipada',
    icon: CalendarClock,
    title: 'Reserva Anticipada',
    description:
      'Elige tu asiento favorito con días de anticipación al estreno.',
  },
  {
    id: 'snacks-premium',
    icon: CupSoda,
    title: 'Snacks Premium',
    description: 'Combos gourmet, café de especialidad y dulcería de autor.',
  },
]
