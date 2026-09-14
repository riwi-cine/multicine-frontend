import { useMemo, useState, type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  Loader2,
  MapPin,
  Ticket,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { MovieArtwork, moviesApi } from '@/features/movies'
import { featuredMovies } from '@/features/movies/types/movies.types'
import { bookingApi } from '@/features/reservations'
import { useAuthStore, useLocationStore } from '@/store'
import type { MovieFunction, Payment, Seat, SeatLock, Ticket as TicketType } from '@/types'

const PAYMENT_METHODS = [
  { value: 'card', label: 'Tarjeta débito o crédito' },
  { value: 'pse', label: 'PSE' },
  { value: 'cash', label: 'Pago en taquilla' },
]

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value)

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))

export default function PurchasePage() {
  const { id: movieId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const location = useLocationStore((state) => state.location)

  const [selectedFunctionId, setSelectedFunctionId] = useState('')
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([])
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [step, setStep] = useState<'function' | 'seats' | 'checkout' | 'success'>('function')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [payment, setPayment] = useState<Payment | null>(null)
  const [tickets, setTickets] = useState<TicketType[]>([])

  const movieQuery = useQuery({
    queryKey: ['purchase-movie', movieId],
    queryFn: async () => {
      if (!movieId) throw new Error('Película no especificada')
      try {
        return await moviesApi.getById(movieId)
      } catch {
        return featuredMovies.find((movie) => movie.id === movieId) ?? featuredMovies[0]
      }
    },
    enabled: Boolean(movieId),
  })

  const functionsQuery = useQuery<MovieFunction[]>({
    queryKey: ['purchase-functions', movieId],
    queryFn: () => bookingApi.getFunction(movieId as string),
    enabled: Boolean(movieId),
  })

  const seatsQuery = useQuery({
    queryKey: ['purchase-seats', selectedFunctionId],
    queryFn: async () => {
      const [seats, locks] = await Promise.all([
        bookingApi.getSeatsByFunction(selectedFunctionId),
        bookingApi.getSeatLocks(selectedFunctionId),
      ])
      return { seats, locks }
    },
    enabled: Boolean(selectedFunctionId),
  })

  const promotionsQuery = useQuery({
    queryKey: ['purchase-promotions'],
    queryFn: () => bookingApi.getPromotions(),
    enabled: step === 'checkout',
  })

  const selectedFunction = functionsQuery.data?.find(
    (item) => String(item.functionId) === selectedFunctionId,
  )
  const lockedSeatIds = useMemo(
    () => new Set((seatsQuery.data?.locks ?? []).map((lock: SeatLock) => lock.seatId)),
    [seatsQuery.data?.locks],
  )
  const selectedSeats = (seatsQuery.data?.seats ?? []).filter((seat: Seat) =>
    selectedSeatIds.includes(seat.id),
  )
  const unavailableSeatIds = useMemo(
    () => new Set(
      (seatsQuery.data?.seats ?? [])
        .filter((seat: Seat) => seat.status === 'occupied')
        .map((seat: Seat) => seat.id),
    ),
    [seatsQuery.data?.seats],
  )
  const hasPrice = typeof selectedFunction?.basePrice === 'number'
  const subtotal = hasPrice
    ? selectedSeats.length * (selectedFunction?.basePrice ?? 0)
    : 0
  const discount = appliedPromo ? subtotal * (appliedPromo.discount / 100) : 0
  const total = Math.max(0, subtotal - discount)

  const setError = (message: unknown) => {
    setErrorMessage(message instanceof Error ? message.message : 'No pudimos completar la operación.')
  }

  const chooseFunction = (functionItem: MovieFunction) => {
    setSelectedFunctionId(String(functionItem.functionId))
    setSelectedSeatIds([])
    setErrorMessage(null)
    setStep('seats')
  }

  const toggleSeat = (seat: Seat) => {
    if (lockedSeatIds.has(seat.id) || unavailableSeatIds.has(seat.id)) return
    setSelectedSeatIds((current) =>
      current.includes(seat.id)
        ? current.filter((id) => id !== seat.id)
        : [...current, seat.id],
    )
  }

  const continueToCheckout = async () => {
    if (!user || !selectedFunction || selectedSeatIds.length === 0) return

    setIsSubmitting(true)
    setErrorMessage(null)
    const createdLockIds: string[] = []
    try {
      for (const seatId of selectedSeatIds) {
        const lock = await bookingApi.createSeatLock({
            seatId,
            functionId: String(selectedFunction.functionId),
            userId: user.id,
        })
        createdLockIds.push(lock.id)
      }
      setStep('checkout')
    } catch (error) {
      await Promise.all(
        createdLockIds.map((lockId) => bookingApi.deleteSeatLock(lockId)),
      )
      setError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const applyPromotion = () => {
    const normalizedCode = promoCode.trim().toLowerCase()
    const promotion = promotionsQuery.data?.find(
      (item) => item.active && item.code?.toLowerCase() === normalizedCode,
    )

    if (!promotion || typeof promotion.discount !== 'number' || !promotion.code) {
      setAppliedPromo(null)
      setErrorMessage('El mock actual solo expone promociones informativas, sin códigos aplicables.')
      return
    }

    setAppliedPromo({ code: promotion.code, discount: promotion.discount })
    setErrorMessage(null)
  }

  const completePurchase = async () => {
    if (!user || !selectedFunction || selectedSeatIds.length === 0) return

    setIsSubmitting(true)
    setErrorMessage(null)
    try {
      const cart = await bookingApi.createCart(user.id)
      const order = await bookingApi.createOrder({
        userId: user.id,
        cartId: cart.id,
        total,
        status: 'pending_payment',
      })
      const paymentResponse = await bookingApi.createPayment({
        orderId: order.id,
        amount: total,
        method: paymentMethod,
        status: 'approved',
        transactionId: `MOCK-${Date.now()}`,
      })
      const createdTickets = await bookingApi.createTickets(
        selectedSeatIds.map((seatId) => ({
          orderId: order.id,
          functionId: String(selectedFunction.functionId),
          seatId,
          price: selectedFunction.basePrice ?? 0,
          qrCode: `MULTICINE-${order.id}-${seatId}`,
          status: 'confirmed',
        })),
      )

      setPayment(paymentResponse)
      setTickets(createdTickets)
      setStep('success')
    } catch (error) {
      setError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (movieQuery.isLoading || functionsQuery.isLoading) {
    return <PurchaseShell><LoadingState label="Cargando funciones disponibles..." /></PurchaseShell>
  }

  if (movieQuery.error || functionsQuery.error || !movieQuery.data) {
    return (
      <PurchaseShell>
        <EmptyState message="No pudimos cargar la información de compra." onBack={() => navigate(-1)} />
      </PurchaseShell>
    )
  }

  const movie = movieQuery.data

  return (
    <PurchaseShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Volver a la película
        </button>

        <div className="mb-8 flex flex-col gap-6 rounded-2xl border bg-card p-5 shadow-sm sm:flex-row sm:items-center">
          <MovieArtwork
            palette={movie.palette}
            image={movie.image}
            variant="poster"
            className="h-36 w-24 shrink-0 rounded-xl"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Compra de entradas</p>
            <h1 className="mt-2 font-heading text-3xl font-bold tracking-tight">{movie.title}</h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {location ? `${location.city} · ${location.venue}` : 'Ubicación seleccionada'}
            </p>
          </div>
        </div>

        <PurchaseProgress step={step} />
        {errorMessage && <div className="mb-6 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">{errorMessage}</div>}

        {step === 'function' && (
          <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
            <SectionTitle title="Selecciona una función" description="Elige el horario que prefieras para continuar." />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(functionsQuery.data ?? []).map((functionItem) => (
                <button
                    key={functionItem.functionId}
                    disabled={functionItem.isSoldOut || functionItem.availableSeats === 0}
                  type="button"
                  onClick={() => chooseFunction(functionItem)}
                  className="rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{formatDateTime(functionItem.startsAt)}</span>
                    <Ticket className="size-4 text-primary" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{functionItem.format} · {functionItem.language}</p>
                    <p className="mt-3 font-semibold text-primary">{functionItem.isSoldOut || functionItem.availableSeats === 0 ? 'Agotada' : functionItem.basePrice != null ? formatCurrency(functionItem.basePrice) : 'Tarifa pendiente'}</p>
                </button>
              ))}
            </div>
            {functionsQuery.data?.length === 0 && <p className="text-sm text-muted-foreground">No hay funciones disponibles para esta película.</p>}
          </section>
        )}

        {step === 'seats' && (
          <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
            <SectionTitle title="Selecciona tus asientos" description="Los asientos ocupados o bloqueados no están disponibles." />
            {seatsQuery.isLoading ? <LoadingState label="Cargando mapa de sala..." /> : (
              <>
                <div className="mb-6 rounded-xl bg-muted/50 p-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Pantalla</div>
                <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                  {(seatsQuery.data?.seats ?? []).map((seat) => {
                    const isLocked = lockedSeatIds.has(seat.id) || unavailableSeatIds.has(seat.id)
                    const isSelected = selectedSeatIds.includes(seat.id)
                    return <button key={seat.id} type="button" disabled={isLocked} onClick={() => toggleSeat(seat)} className={`rounded-lg border px-2 py-3 text-xs font-semibold transition-colors ${isLocked ? 'cursor-not-allowed border-border bg-muted text-muted-foreground/50' : isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background hover:border-primary hover:text-primary'}`}>{seat.row}{seat.number}</button>
                  })}
                </div>
                <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t pt-5 sm:flex-row sm:items-center">
                  <p className="text-sm text-muted-foreground">{selectedSeatIds.length} asiento(s) seleccionado(s)</p>
                  <Button disabled={!selectedSeatIds.length || isSubmitting} onClick={continueToCheckout}>{isSubmitting && <Loader2 className="animate-spin" />} Continuar al resumen</Button>
                </div>
              </>
            )}
          </section>
        )}

        {step === 'checkout' && selectedFunction && (
          <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
              <SectionTitle title="Finaliza tu compra" description="Revisa los datos y elige el método de pago." />
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold" htmlFor="promo">Código promocional</label>
                  <div className="flex gap-2"><Input id="promo" value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Ingresa tu código" /><Button type="button" variant="outline" onClick={applyPromotion}>Aplicar</Button></div>
                  <p className="mt-2 text-xs text-muted-foreground">Las promociones actuales del mock son informativas y todavía no incluyen códigos aplicables.</p>
                </div>
                <fieldset>
                  <legend className="mb-2 text-sm font-semibold">Método de pago</legend>
                  <div className="space-y-2">{PAYMENT_METHODS.map((method) => <label key={method.value} className="flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm hover:border-primary"><input type="radio" name="paymentMethod" value={method.value} checked={paymentMethod === method.value} onChange={(event) => setPaymentMethod(event.target.value)} />{method.label}</label>)}</div>
                </fieldset>
                <Button className="w-full" size="lg" disabled={isSubmitting || !hasPrice} onClick={completePurchase}>{isSubmitting ? <><Loader2 className="animate-spin" /> Procesando compra...</> : !hasPrice ? 'Pago pendiente de tarifa' : <><CreditCard /> Confirmar y pagar</>}</Button>
              </div>
            </div>
            <OrderSummary selectedFunction={selectedFunction} selectedSeats={selectedSeats} subtotal={subtotal} discount={discount} total={total} />
          </section>
        )}

        {step === 'success' && (
          <section className="mx-auto max-w-2xl rounded-2xl border border-emerald-200 bg-card p-6 text-center shadow-sm sm:p-10">
            <CheckCircle2 className="mx-auto size-14 text-emerald-600" />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-emerald-700">Compra confirmada</p>
            <h2 className="mt-2 font-heading text-3xl font-bold">Tus entradas están listas</h2>
            <p className="mt-3 text-sm text-muted-foreground">Pago {payment?.status === 'approved' ? 'aprobado' : 'registrado'} · {tickets.length} ticket(s)</p>
            <div className="mt-6 space-y-3 text-left">{tickets.map((ticket) => <div key={ticket.id} className="rounded-xl border bg-muted/20 p-4"><p className="font-semibold">Asiento {ticket.seatId}</p><p className="mt-1 break-all font-mono text-xs text-muted-foreground">Código: {ticket.qrCode}</p></div>)}</div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"><Button onClick={() => navigate('/profile')}>Ir a mi perfil</Button><Button variant="outline" onClick={() => navigate('/')}>Volver al inicio</Button></div>
          </section>
        )}
      </div>
    </PurchaseShell>
  )
}

function PurchaseShell({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-background text-foreground">{children}</main>
}

function LoadingState({ label }: { label: string }) {
  return <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-muted-foreground"><Loader2 className="size-4 animate-spin" />{label}</div>
}

function EmptyState({ message, onBack }: { message: string; onBack: () => void }) {
  return <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-4 text-center"><p className="text-muted-foreground">{message}</p><Button variant="outline" onClick={onBack}>Volver</Button></div>
}

function SectionTitle({ title, description }: { title: string; description: string }) {
  return <div className="mb-6"><h2 className="font-heading text-2xl font-bold">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{description}</p></div>
}

function PurchaseProgress({ step }: { step: 'function' | 'seats' | 'checkout' | 'success' }) {
  const steps = ['function', 'seats', 'checkout', 'success'] as const
  const labels = ['Función', 'Asientos', 'Resumen y pago', 'Confirmación']
  const activeIndex = steps.indexOf(step)
  return <div className="mb-8 grid grid-cols-4 gap-2">{labels.map((label, index) => <div key={label} className={`border-t-2 pt-2 text-center text-xs font-semibold ${index <= activeIndex ? 'border-primary text-primary' : 'border-border text-muted-foreground'}`}><span className="hidden sm:inline">{index + 1}. </span>{label}</div>)}</div>
}

function OrderSummary({ selectedFunction, selectedSeats, subtotal, discount, total }: { selectedFunction: MovieFunction; selectedSeats: Seat[]; subtotal: number; discount: number; total: number }) {
  return <aside className="h-fit rounded-2xl border bg-card p-5 shadow-sm sm:p-6"><h2 className="font-heading text-xl font-bold">Resumen de compra</h2><div className="mt-5 space-y-3 text-sm"><div className="flex items-start justify-between gap-4"><span className="text-muted-foreground"><Clock3 className="mr-1 inline size-4" />Función</span><span className="text-right font-medium">{formatDateTime(selectedFunction.startsAt)}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Cine</span><span className="text-right font-medium">{selectedFunction.cinemaName}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Sala</span><span className="font-medium">{selectedFunction.roomName}</span></div><div className="flex justify-between gap-4"><span className="text-muted-foreground">Asientos</span><span className="font-medium">{selectedSeats.map((seat) => `${seat.row}${seat.number}`).join(', ')}</span></div><div className="border-t pt-3"><div className="flex justify-between"><span>Subtotal</span><span>{selectedFunction.basePrice != null ? formatCurrency(subtotal) : 'No disponible'}</span></div>{discount > 0 && <div className="mt-2 flex justify-between text-emerald-700"><span>Descuento</span><span>-{formatCurrency(discount)}</span></div>}<div className="mt-3 flex justify-between text-lg font-bold"><span>Total</span><span>{selectedFunction.basePrice != null ? formatCurrency(total) : 'Pendiente'}</span></div></div></div></aside>
}
