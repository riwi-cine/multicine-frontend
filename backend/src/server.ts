import 'dotenv/config'
import cors from 'cors'
import express, { type Request, type Response } from 'express'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { config } from './config.js'
import { collection, createId, findById, publicUser, store, stringValue } from './store.js'
import { getMovieFunctions, getMovieRecommendations } from './services/movie.service.js'
import type { Collection, RecordData } from './types.js'

const data = store.data
const sessions = new Map<string, RecordData>()

const app = express()
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())

const save = store.save

function queryFilter(items: Collection, request: Request) {
  return items.filter((item) =>
    Object.entries(request.query).every(([key, value]) => {
      if (Array.isArray(value)) return true
      return !value || String(item[key]) === String(value)
    }),
  )
}

function currentUser(request: Request) {
  const token = request.header('authorization')?.replace(/^Bearer\s+/i, '')
  return token ? sessions.get(token) : undefined
}

function sendNotFound(response: Response, message = 'Registro no encontrado.') {
  return response.status(404).json({ message })
}

const loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) })
const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
})
const seatLockSchema = z.object({ seatId: z.string(), functionId: z.string(), userId: z.string() })

app.get('/api/health', (_request, response) => response.json({ status: 'ok', service: 'multicine-backend' }))

app.post('/api/auth/login', (request, response) => {
  const parsed = loginSchema.safeParse(request.body)
  if (!parsed.success) return response.status(400).json({ message: 'Datos de acceso inválidos.' })
  const user = collection('users').find((entry) => entry.email === parsed.data.email && entry.password === parsed.data.password)
  if (!user) return response.status(401).json({ message: 'Credenciales inválidas.' })
  const token = `local-${randomUUID()}`
  sessions.set(token, user)
  return response.json({ message: 'Inicio de sesión exitoso', token, user: publicUser(user) })
})

app.post('/api/auth/register', (request, response) => {
  const parsed = registerSchema.safeParse(request.body)
  if (!parsed.success) return response.status(400).json({ message: 'Datos de registro inválidos.' })
  if (collection('users').some((user) => user.email === parsed.data.email)) return response.status(409).json({ message: 'El correo ya está registrado.' })
  const user = { id: createId('user'), ...parsed.data, name: parsed.data.fullName, role: 'CLIENT' }
  data.users.push(user); save()
  const token = `local-${randomUUID()}`
  sessions.set(token, user)
  return response.status(201).json({ message: 'Usuario registrado exitosamente', token, user: publicUser(user) })
})

app.get('/api/auth/profile', (request, response) => {
  const user = currentUser(request)
  if (!user) return response.status(401).json({ message: 'Sesión no encontrada.' })
  return response.json(publicUser(user))
})
app.post('/api/auth/logout', (_request, response) => response.status(204).send())
app.post('/api/auth/refresh', (_request, response) => response.json({ token: `local-${randomUUID()}` }))

app.get('/api/movies', (_request, response) => response.json(collection('movies')))
app.post('/api/movies', (request, response) => {
  const movie = { id: createId('movie'), ...request.body }
  data.movies.push(movie); save(); return response.status(201).json(movie)
})
app.patch('/api/movies/:id', (request, response) => {
  const movie = findById(collection('movies'), request.params.id)
  if (!movie) return sendNotFound(response, 'Película no encontrada.')
  Object.assign(movie, request.body); save(); return response.json(movie)
})
app.delete('/api/movies/:id', (request, response) => {
  const movies = collection('movies').filter((movie) => movie.id !== request.params.id)
  data.movies.splice(0, data.movies.length, ...movies); save(); return response.status(204).send()
})
app.get('/api/movies/filter', (request, response) => response.json(collection('movies').filter(() => (!request.query.cityId || request.query.cityId === 'city-001') && (!request.query.cinemaId || request.query.cinemaId === 'cinema-001'))))
app.get('/api/movies/today', (_request, response) => response.json(collection('movies').filter((movie) => movie.status === 'Today')))
app.get('/api/movies/weekly', (_request, response) => response.json(collection('movies')))
app.get('/api/movies/:id/functions', (request, response) => response.json(getMovieFunctions(request.params.id)))
app.get('/api/movies/:id/recommendations', (request, response) => response.json(getMovieRecommendations(request.params.id)))
app.get('/api/movies/:id', (request, response) => {
  const movie = findById(collection('movies'), request.params.id)
  return movie ? response.json(movie) : sendNotFound(response, 'Película no encontrada.')
})

app.get('/api/promotions/active', (_request, response) => response.json(collection('promotions').filter((promotion) => promotion.active !== false)))
app.post('/api/promotions', (request, response) => {
  const promotion = { id: createId('promotion'), ...request.body }
  data.promotions.push(promotion); save(); return response.status(201).json(promotion)
})
app.patch('/api/promotions/:id', (request, response) => {
  const promotion = findById(collection('promotions'), request.params.id)
  if (!promotion) return sendNotFound(response, 'Promoción no encontrada.')
  Object.assign(promotion, request.body); save(); return response.json(promotion)
})
app.delete('/api/promotions/:id', (request, response) => {
  const promotions = collection('promotions').filter((promotion) => promotion.id !== request.params.id)
  data.promotions.splice(0, data.promotions.length, ...promotions); save(); return response.status(204).send()
})
app.get('/api/promotions/:id', (request, response) => {
  const promotion = findById(collection('promotions'), request.params.id)
  return promotion ? response.json(promotion) : sendNotFound(response, 'Promoción no encontrada.')
})
app.get('/api/promotions', (_request, response) => response.json(collection('promotions')))

for (const resource of ['countries', 'departments', 'cities', 'cinemas', 'rooms']) {
  app.get(`/api/${resource}`, (request, response) => response.json(queryFilter(collection(resource), request)))
  app.get(`/api/${resource}/:id`, (request, response) => {
    const item = findById(collection(resource), request.params.id)
    return item ? response.json(item) : sendNotFound(response)
  })
}

app.get('/api/seats', (request, response) => {
  const functionId = stringValue(request.query.functionId)
  if (!functionId) return response.json(queryFilter(collection('seats'), request))
  const show = getMovieFunctions(stringValue(collection('movies')[0]?.id)).find((item) => String(item.functionId) === functionId)
  return response.json(collection('seats').filter((seat) => !show || seat.roomId === show.roomId))
})

app.get('/api/seatLocks', (request, response) => {
  const active = collection('seatLocks').filter((lock) => new Date(String(lock.expiresAt)) > new Date())
  const functionId = stringValue(request.query.functionId)
  return response.json(functionId ? active.filter((lock) => String(lock.functionId) === functionId) : active)
})
app.post('/api/seatLocks', (request, response) => {
  const parsed = seatLockSchema.safeParse(request.body)
  if (!parsed.success) return response.status(400).json({ message: 'Bloqueo inválido.' })
  const conflict = collection('seatLocks').some((lock) => lock.functionId === parsed.data.functionId && lock.seatId === parsed.data.seatId && new Date(String(lock.expiresAt)) > new Date())
  if (conflict) return response.status(409).json({ message: 'El asiento ya está bloqueado.' })
  const lock = { id: createId('lock'), ...parsed.data, expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString() }
  data.seatLocks.push(lock); save(); return response.status(201).json(lock)
})
app.delete('/api/seatLocks/:id', (request, response) => {
  data.seatLocks.splice(0, data.seatLocks.length, ...collection('seatLocks').filter((lock) => lock.id !== request.params.id)); save(); return response.status(204).send()
})

for (const resource of ['users', 'memberships', 'carts', 'cartSnacks', 'snacks', 'orders', 'payments', 'giftCards']) {
  app.get(`/api/${resource}`, (request, response) => response.json(queryFilter(collection(resource), request)))
  app.post(`/api/${resource}`, (request, response) => {
    const item = { id: createId(resource.slice(0, -1)), ...request.body }
    data[resource].push(item); save(); return response.status(201).json(item)
  })
  app.patch(`/api/${resource}/:id`, (request, response) => {
    const item = findById(collection(resource), request.params.id)
    if (!item) return sendNotFound(response)
    Object.assign(item, request.body); save(); return response.json(item)
  })
  app.delete(`/api/${resource}/:id`, (request, response) => {
    data[resource] = collection(resource).filter((entry) => entry.id !== request.params.id); save(); return response.status(204).send()
  })
}

app.post('/api/tickets', (request, response) => {
  const tickets = Array.isArray(request.body) ? request.body : [request.body]
  const created = tickets.map((ticket) => ({ id: createId('ticket'), ...ticket }))
  data.tickets.push(...created); save(); return response.status(201).json(created)
})
app.get('/api/tickets', (request, response) => response.json(queryFilter(collection('tickets'), request)))
app.get('/api/tickets/:id', (request, response) => {
  const ticket = findById(collection('tickets'), request.params.id)
  return ticket ? response.json(ticket) : sendNotFound(response)
})

app.use((_request, response) => response.status(404).json({ message: 'Ruta no encontrada.' }))
app.listen(config.port, () => console.log(`Multicine backend listening on http://localhost:${config.port}/api`))
