import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Phone, Lock, Eye, EyeOff, Film, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { registerSchema, type RegisterFormData } from '@/validations/auth.validation'
import { authService } from '@/services/auth.service'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface RegisterFormProps {
  onSuccess?: () => void
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: { fullName: '', email: '', phone: '', password: '', confirmPassword: '', acceptTerms: false },
  })

  const watchPassword = watch('password', '')
  const watchAcceptTerms = watch('acceptTerms', false)
  const hasMinLength = watchPassword.length >= 8
  const hasUppercase = /[A-Z]/.test(watchPassword)
  const hasNumber = /[0-9]/.test(watchPassword)

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null)
    try {
      const response = await authService.register(data)
      setIsSuccess(true)
      toast.success('¡Registro exitoso!', { description: response.message || 'Tu cuenta ha sido creada.' })
      if (onSuccess) onSuccess()
      else setTimeout(() => navigate('/login'), 2000)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al registrar usuario.'
      setServerError(msg)
      toast.error('Error en el registro', { description: msg })
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md border-primary/20 shadow-xl bg-card/95">
        <CardContent className="pt-8 pb-8 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold">¡Bienvenido a CINE!</h3>
          <p className="text-muted-foreground text-sm">Tu cuenta ha sido creada exitosamente.</p>
          <Button className="w-full mt-4" onClick={() => navigate('/login')}>Ir a Iniciar Sesión</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-xl bg-card/95">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="mx-auto inline-flex p-2.5 rounded-full bg-primary/10 text-primary mb-1">
          <Film className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
        <CardDescription className="text-xs">Regístrate para reservar entradas y acceder a beneficios exclusivos.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
          {serverError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{serverError}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-1">
            <Label htmlFor="fullName" className="text-xs font-semibold">Nombre Completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="fullName" placeholder="Juan Pérez" className="pl-9" {...register('fullName')} />
            </div>
            {errors.fullName && <p className="text-xs text-destructive">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs font-semibold">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="correo@ejemplo.com" className="pl-9" {...register('email')} />
            </div>
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="phone" className="text-xs font-semibold">Teléfono</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="phone" type="tel" placeholder="987654321" className="pl-9" {...register('phone')} />
            </div>
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password" className="text-xs font-semibold">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-9 pr-10" {...register('password')} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
            <div className="flex gap-2 pt-0.5 text-[11px] text-muted-foreground">
              <span className={hasMinLength ? 'text-emerald-600 font-medium' : ''}>✓ 8+ car.</span>
              <span className={hasUppercase ? 'text-emerald-600 font-medium' : ''}>✓ Mayúscula</span>
              <span className={hasNumber ? 'text-emerald-600 font-medium' : ''}>✓ Número</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="confirmPassword" className="text-xs font-semibold">Confirmar Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-9 pr-10" {...register('confirmPassword')} />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>}
          </div>

          <div className="pt-1">
            <div className="flex items-center space-x-2">
              <Checkbox id="acceptTerms" checked={watchAcceptTerms} onCheckedChange={(checked) => setValue('acceptTerms', checked === true, { shouldValidate: true })} />
              <Label htmlFor="acceptTerms" className="text-xs text-muted-foreground cursor-pointer">
                Acepto los <span className="underline text-primary">términos y condiciones</span>
              </Label>
            </div>
            {errors.acceptTerms && <p className="text-xs text-destructive">{errors.acceptTerms.message}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
            {isSubmitting ? <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Registrando...</span> : 'Crear Cuenta'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t py-3 text-xs text-muted-foreground">
        ¿Ya tienes una cuenta? <Link to="/login" className="ml-1 font-semibold text-primary hover:underline">Inicia sesión</Link>
      </CardFooter>
    </Card>
  )
}
