export interface MovieFunctionSchedule {
  functionId: number
  startsAt: string
  time: string
  cinemaId: number
  cinemaName: string
  roomId: number
  roomName: string
  roomType: string
  format: string
  language: string
  availableSeats: number
  isSoldOut: boolean
}

export interface MovieSchedule {
  date: string
  functions: MovieFunctionSchedule[]
}

export interface ExtendedMovie {
  movieId: number
  title: string
  posterUrl: string
  genres: string[]
  classification: string
  durationMin: number
  director: string
  language: string
  dubbedOrSubtitled: string
  formats: string[]
  schedules: MovieSchedule[]
  rating: number
  isNewRelease: boolean
  isSoldOut: boolean
}

/* Types for Postman mock data compatibility */
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
  image: string
  trailerUrl?: string
  palette: MoviePalette
}

/* Mock data compatible with Postman - se usará cuando el backend no esté disponible */
/* Types for Postman mock data compatibility */
export interface Promotion {
  id: string
  icon: string
  accent: string
  text: string
  tag?: string
  title: string
  description: string
}

export interface Benefit {
  id: string
  icon: string
  title: string
  description: string
}
export const featuredMovie: Movie = {
  id: 'spider-man-brand-new-day',
  title: 'Spider-Man: Brand New Day',
  genres: ['Acción', 'Aventura', 'Ciencia ficción'],
  duration: '2h 25min',
  rating: 'PG-13',
  score: 0,
  description:
    'Peter Parker vive completamente solo y se dedica a tiempo completo a proteger Nueva York como Spider-Man. Pero una nueva amenaza y una misteriosa transformación pondrán a prueba todo lo que creía conocer.',
  status: 'Premiere',
  releaseDate: '31 de jul 2026',
  format: 'IMAX · Dolby Atmos',
  image: 'https://image.tmdb.org/t/p/original/vjMvFSmGUxEtqVdaZgvFee9XkZl.jpg',
  trailerUrl: 'https://www.youtube.com/embed/62bIsvRcPv0',
  palette: {
    from: '#090b18',
    to: '#8b1e2d',
    glow: '#ef4444',
  },
}

export const featuredMovies: Movie[] = [
  {
    id: 'dune-part-two',
    title: 'Dune: Parte Dos',
    genres: ['Ciencia ficción', 'Aventura', 'Drama'],
    duration: '2h 47min',
    rating: 'PG-13',
    score: 8.7,
    description:
      'Paul Atreides se une a Chani y a los Fremen mientras busca vengarse de quienes destruyeron a su familia.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/mFnF8tpPMqEwti2J2aMhYGZYdv0.jpg',
    palette: {
      from: '#1c1208',
      to: '#c27b32',
      glow: '#f4c16d',
    },
  },

  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    genres: ['Drama', 'Historia'],
    duration: '3h 1min',
    rating: 'R',
    score: 8.6,
    description:
      'La historia del físico J. Robert Oppenheimer y su papel fundamental en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/bMwjsrY3tR6BZEy9dhEAhS9FqKk.jpg',
    palette: {
      from: '#160909',
      to: '#9f251f',
      glow: '#ff6b4a',
    },
  },

  {
    id: 'top-gun-maverick',
    title: 'Top Gun: Maverick',
    genres: ['Acción', 'Drama'],
    duration: '2h 11min',
    rating: 'PG-13',
    score: 8.3,
    description:
      'Después de décadas como uno de los mejores pilotos de la Armada, Maverick debe entrenar a una nueva generación para una misión peligrosa.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/7CxL8W0J8bzpIVVznQ0whiOKeDH.jpg',
    palette: {
      from: '#07111f',
      to: '#155e75',
      glow: '#38bdf8',
    },
  },

  {
    id: 'spider-man-no-way-home',
    title: 'Spider-Man: Sin camino a casa',
    genres: ['Acción', 'Aventura', 'Ciencia ficción'],
    duration: '2h 28min',
    rating: 'PG-13',
    score: 8.2,
    description:
      'La identidad de Peter Parker queda expuesta y su intento de recuperar su vida normal termina abriendo las puertas del multiverso.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    palette: {
      from: '#0b1026',
      to: '#b91c1c',
      glow: '#60a5fa',
    },
  },
]

export const nowShowing: Movie[] = [
  featuredMovie,

  {
    id: 'dune-part-two',
    title: 'Dune: Parte Dos',
    genres: ['Ciencia ficción', 'Aventura', 'Drama'],
    duration: '2h 47min',
    rating: 'PG-13',
    score: 8.7,
    description:
      'Paul Atreides se une a Chani y a los Fremen mientras busca vengarse de quienes destruyeron a su familia.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/mFnF8tpPMqEwti2J2aMhYGZYdv0.jpg',
    palette: {
      from: '#1c1208',
      to: '#c27b32',
      glow: '#f4c16d',
    },
  },

  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    genres: ['Drama', 'Historia'],
    duration: '3h 1min',
    rating: 'R',
    score: 8.6,
    description:
      'La historia del físico J. Robert Oppenheimer y su papel fundamental en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/bMwjsrY3tR6BZEy9dhEAhS9FqKk.jpg',
    palette: {
      from: '#160909',
      to: '#9f251f',
      glow: '#ff6b4a',
    },
  },

  {
    id: 'deadpool-wolverine',
    title: 'Deadpool & Wolverine',
    genres: ['Acción', 'Comedia', 'Ciencia ficción'],
    duration: '2h 8min',
    rating: 'R',
    score: 7.8,
    description:
      'Deadpool se ve obligado a unir fuerzas con Wolverine para enfrentarse a una amenaza que podría cambiar el destino de ambos.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/zjGVwDFpHLKueusW5TF9r4gn8Er.jpg',
    palette: {
      from: '#250509',
      to: '#b91c1c',
      glow: '#ef4444',
    },
  },

  {
    id: 'godzilla-x-kong',
    title: 'Godzilla x Kong: El nuevo imperio',
    genres: ['Acción', 'Aventura', 'Ciencia ficción'],
    duration: '1h 55min',
    rating: 'PG-13',
    score: 6.5,
    description:
      'Godzilla y Kong deben unir fuerzas para enfrentarse a una amenaza colosal escondida en las profundidades de la Tierra.',
    status: 'Premiere',
    format: '4DX · IMAX',
    image:
      'https://media.themoviedb.org/t/p/w220_and_h330_face/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
    palette: {
      from: '#06151a',
      to: '#075985',
      glow: '#38bdf8',
    },
  },

  {
    id: 'the-batman',
    title: 'The Batman',
    genres: ['Acción', 'Crimen', 'Drama'],
    duration: '2h 56min',
    rating: 'PG-13',
    score: 7.8,
    description:
      'Batman investiga una serie de asesinatos en Gotham y descubre una conspiración que está conectada con el pasado de la ciudad.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/lqGqvmqHr8T2Ll8w7mzAtNshUpb.jpg',
    palette: {
      from: '#08090d',
      to: '#450a0a',
      glow: '#ef4444',
    },
  },

  {
    id: 'spider-man-no-way-home',
    title: 'Spider-Man: Sin camino a casa',
    genres: ['Acción', 'Aventura', 'Ciencia ficción'],
    duration: '2h 28min',
    rating: 'PG-13',
    score: 8.2,
    description:
      'La identidad de Peter Parker queda expuesta y su intento de recuperar su vida normal termina abriendo las puertas del multiverso.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    palette: {
      from: '#0b1026',
      to: '#b91c1c',
      glow: '#60a5fa',
    },
  },

  {
    id: 'avatar-way-of-water',
    title: 'Avatar: El camino del agua',
    genres: ['Ciencia ficción', 'Aventura', 'Fantasía'],
    duration: '3h 12min',
    rating: 'PG-13',
    score: 7.6,
    description:
      'Jake Sully y Neytiri forman una familia y buscan refugio junto a un nuevo clan mientras una antigua amenaza regresa a Pandora.',
    status: 'Today',
    format: 'IMAX · 4DX',
    image:
      'https://image.tmdb.org/t/p/original/ckeTumMS4G31UQ9NNkmtW2QhfMF.jpg',
    palette: {
      from: '#032b3a',
      to: '#0284c7',
      glow: '#67e8f9',
    },
  },

  {
    id: 'top-gun-maverick',
    title: 'Top Gun: Maverick',
    genres: ['Acción', 'Drama'],
    duration: '2h 11min',
    rating: 'PG-13',
    score: 8.3,
    description:
      'Después de décadas como uno de los mejores pilotos de la Armada, Maverick debe entrenar a una nueva generación para una misión peligrosa.',
    status: 'Today',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/7CxL8W0J8bzpIVVznQ0whiOKeDH.jpg',
    palette: {
      from: '#07111f',
      to: '#155e75',
      glow: '#38bdf8',
    },
  },

  {
    id: 'inside-out-2',
    title: 'Intensamente 2',
    genres: ['Animación', 'Comedia', 'Aventura'],
    duration: '1h 36min',
    rating: 'PG',
    score: 7.6,
    description:
      'Riley entra en la adolescencia y nuevas emociones llegan al centro de control, cambiando por completo su mundo interior.',
    status: 'Today',
    format: '4K · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg',
    palette: {
      from: '#18133b',
      to: '#7c3aed',
      glow: '#c084fc',
    },
  },
]

export const comingSoon: Movie[] = [
  {
    id: 'sinners',
    title: 'Sinners',
    genres: ['Terror', 'Thriller'],
    duration: '2h 18min',
    rating: 'R',
    score: 8.1,
    description:
      'Dos hermanos gemelos regresan a su ciudad natal para comenzar una nueva vida, pero terminan enfrentándose a una amenaza sobrenatural.',
    status: 'Coming Soon',
    releaseDate: '2025',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/u8L5FEUcO8ygXAMwk06aWMqdSrl.jpg',
    palette: {
      from: '#160605',
      to: '#7f1d1d',
      glow: '#f87171',
    },
  },

  {
    id: 'f1',
    title: 'F1: La película',
    genres: ['Acción', 'Drama'],
    duration: '2h 36min',
    rating: 'PG-13',
    score: 7.8,
    description:
      'Un antiguo piloto de Fórmula 1 regresa a las pistas para entrenar a un joven talento y enfrentarse a una última oportunidad de gloria.',
    status: 'Coming Soon',
    releaseDate: '2025',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/9PXZIUsSDh4alB80jheWX4fhZmy.jpg',
    palette: {
      from: '#090d18',
      to: '#b91c1c',
      glow: '#f97316',
    },
  },

  {
    id: 'black-widow',
    title: 'Black Widow',
    genres: ['Acción', 'Aventura', 'Thriller'],
    duration: '2h 14min',
    rating: 'PG-13',
    score: 6.7,
    description:
      'Natasha Romanoff se enfrenta a su pasado cuando una peligrosa conspiración la obliga a reunirse con figuras de su antigua familia.',
    status: 'Coming Soon',
    releaseDate: '2021',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/6azpBJGcLx9SKif8h9VMnflBfa.jpg',
    palette: {
      from: '#15080d',
      to: '#9f1239',
      glow: '#fb7185',
    },
  },

  {
    id: 'a-quiet-place-part-two',
    title: 'Un lugar en silencio: Parte II',
    genres: ['Terror', 'Thriller', 'Ciencia ficción'],
    duration: '1h 37min',
    rating: 'PG-13',
    score: 7.2,
    description:
      'La familia Abbott debe abandonar su hogar y enfrentarse a nuevas amenazas mientras busca un lugar seguro en un mundo dominado por criaturas letales.',
    status: 'Coming Soon',
    releaseDate: '2021',
    format: 'Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/ojtkat19816bUNfpvCjn6KqWn5G.jpg',
    palette: {
      from: '#07130e',
      to: '#365314',
      glow: '#a3e635',
    },
  },

  {
    id: 'avatar-way-of-water',
    title: 'Avatar: El camino del agua',
    genres: ['Ciencia ficción', 'Aventura', 'Fantasía'],
    duration: '3h 12min',
    rating: 'PG-13',
    score: 7.6,
    description:
      'Jake Sully y Neytiri forman una familia y buscan refugio junto a un nuevo clan mientras una antigua amenaza regresa a Pandora.',
    status: 'Coming Soon',
    releaseDate: '2022',
    format: 'IMAX · 4DX',
    image:
      'https://image.tmdb.org/t/p/original/ckeTumMS4G31UQ9NNkmtW2QhfMF.jpg',
    palette: {
      from: '#032b3a',
      to: '#0284c7',
      glow: '#67e8f9',
    },
  },

  {
    id: 'dune',
    title: 'Dune',
    genres: ['Ciencia ficción', 'Aventura', 'Drama'],
    duration: '2h 35min',
    rating: 'PG-13',
    score: 8.0,
    description:
      'Paul Atreides viaja al planeta más peligroso del universo mientras su familia se ve envuelta en una lucha por el recurso más valioso de la galaxia.',
    status: 'Coming Soon',
    releaseDate: '2021',
    format: 'IMAX · Dolby Atmos',
    image:
      'https://image.tmdb.org/t/p/original/dhroRryMGr6V2JPAPQSvoVYVeG8.jpg',
    palette: {
      from: '#17100a',
      to: '#92400e',
      glow: '#f59e0b',
    },
  },
]

export const promotions: Promotion[] = [
  {
    id: 'dos-por-uno',
    icon: 'Ticket',
    accent: 'from-primary to-primary/70',
    text: 'text-primary',
    tag: 'TODOS LOS LUNES',
    title: '2x1 en Boletas',
    description:
      'Compra una boleta y lleva a un acompañante gratis a cualquier función, todos los lunes.',
  },
  {
    id: 'martes-descuento',
    icon: 'BadgePercent',
    accent: 'from-primary to-primary/70',
    text: 'text-primary',
    tag: '50% DE DESCUENTO',
    title: 'Martes de Descuento',
    description: 'Todas las boletas con 50% de descuento los martes. El plan perfecto a mitad de precio.',
  },
  {
    id: 'membresia-vip',
    icon: 'Crown',
    accent: 'from-primary to-primary/70',
    text: 'text-primary',
    title: 'Membresía VIP',
    description:
      'Acceso anticipado a estrenos, salas premium, puntos por compra y beneficios exclusivos.',
  },
  {
    id: 'combos-comida',
    icon: 'Popcorn',
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
    icon: 'MonitorPlay',
    title: 'Salas IMAX',
    description: 'Pantallas gigantes con proyección láser 4K e inmersión total.',
  },
  {
    id: 'dolby-atmos',
    icon: 'Waves',
    title: 'Dolby Atmos',
    description: 'Sonido tridimensional que se mueve alrededor de ti en cada escena.',
  },
  {
    id: 'cuatro-dx',
    icon: 'Armchair',
    title: 'Experiencia 4DX',
    description: 'Movimiento, viento, aroma y efectos especiales justo en tu asiento.',
  },
  {
    id: 'compra-online',
    icon: 'Smartphone',
    title: 'Compra en línea',
    description: 'Reserva y paga tus boletas desde cualquier dispositivo, sin filas.',
  },
  {
    id: 'reserva-anticipada',
    icon: 'CalendarClock',
    title: 'Reserva anticipada',
    description: 'Elige tu asiento favorito días antes del estreno.',
  },
  {
    id: 'snacks-premium',
    icon: 'CupSoda',
    title: 'Snacks premium',
    description: 'Combos gourmet, café de especialidad y repostería artesanal.',
  },
]

/* Fallback: featuredMovie usado por ExperienceSection */
export const fallbackFeaturedMovie: Movie = {
  id: 'spider-man-brand-new-day',
  title: 'Spider-Man: Brand New Day',
  genres: ['Acción', 'Aventura', 'Ciencia ficción'],
  duration: '2h 25min',
  rating: 'PG-13',
  score: 0,
  description:
    'Peter Parker vive completamente solo y se dedica a tiempo completo a proteger Nueva York como Spider-Man. Pero una nueva amenaza y una misteriosa transformación pondrán a prueba todo lo que creía conocer.',
  status: 'Premiere',
  releaseDate: '31 de jul 2026',
  format: 'IMAX · Dolby Atmos',
  image: 'https://image.tmdb.org/t/p/original/vjMvFSmGUxEtqVdaZgvFee9XkZl.jpg',
  trailerUrl: 'https://www.youtube.com/embed/62bIsvRcPv0',
  palette: {
    from: '#090b18',
    to: '#8b1e2d',
    glow: '#ef4444',
  },
}