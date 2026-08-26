import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { Ticket, Film, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react'

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background">
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted/30 border-r border-border/40 p-12 flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 pointer-events-none" />
        <div className="absolute -top-24 -left-24 size-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Film className="size-5" />
            </div>
            <span>MULTICINE</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" />
            <span>Acceso a tu Cuenta</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-foreground leading-tight">
            Disfruta la mejor experiencia de cine digital.
          </h1>

          <p className="text-muted-foreground text-base leading-relaxed">
            Inicia sesión para reservar tus boletos, acumular puntos de membresía y acceder a promociones exclusivas.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-background p-2 shadow-xs border border-border">
                <Ticket className="size-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Reserva Rápida y Fácil</h4>
                <p className="text-xs text-muted-foreground">Elige tus asientos preferidos y compra en segundos.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-background p-2 shadow-xs border border-border">
                <ShieldCheck className="size-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Transacciones Seguras</h4>
                <p className="text-xs text-muted-foreground">Tus pagos y datos de cuenta protegidos con la mejor seguridad.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Multicine. Todos los derechos reservados.
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8 lg:p-12 relative">
        <div className="w-full max-w-md mb-6 lg:hidden flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Film className="size-4" />
            </div>
            <span>MULTICINE</span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ArrowLeft className="size-3.5" />
            Inicio
          </Link>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
