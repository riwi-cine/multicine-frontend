import React from 'react'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { Ticket, Film, ShieldCheck, Sparkles } from 'lucide-react'

export const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-4 md:p-8">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Lado izquierdo: Información y beneficios del cine */}
        <div className="hidden lg:flex flex-col justify-center space-y-6 p-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold w-fit">
            <Sparkles className="h-3.5 w-3.5" /> Únete a Multicine
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Vive la mejor experiencia de cine.
          </h1>
          <p className="text-muted-foreground text-base">
            Crea tu cuenta hoy y accede a funciones exclusivas diseñadas para amantes del séptimo arte.
          </p>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <Ticket className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Reserva rápida de entradas</h4>
                <p className="text-xs text-muted-foreground">Selecciona tus asientos preferidos sin filas ni esperas.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <Film className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Historial de funciones</h4>
                <p className="text-xs text-muted-foreground">Gestiona tus entradas adquiridas y consulta tus compras pasadas.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Descuentos y promociones</h4>
                <p className="text-xs text-muted-foreground">Accede a ofertas especiales para miembros registrados.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lado derecho: Formulario de Registro */}
        <div className="flex justify-center w-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
