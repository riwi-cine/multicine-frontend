import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Film, AlertCircle, Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { loginSchema, type LoginFormData } from '@/validations/auth.validation'
import { useAuthStore } from '@/store'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface LoginFormProps {
  onSuccess?: () => void
  redirectPath?: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, redirectPath }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((state) => state.login)

  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const fromLocation = (location.state as { from?: { pathname: string } })?.from?.pathname
  const targetPath = redirectPath || fromLocation || '/'

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const rememberMe = watch('rememberMe')

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null)
    try {
      const response = await login(data)
      toast.success('¡Bienvenido de nuevo!', {
        description: response.message || `Hola ${response.user.fullName}, inicio exitoso.`,
      })
      if (onSuccess) onSuccess()
      else navigate(targetPath, { replace: true })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Credenciales inválidas.'
      setServerError(msg)
      toast.error('Error al iniciar sesión', { description: msg })
    }
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-xl bg-card/95">
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Film className="size-6" />
        </div>
        <CardTitle className="text-2xl font-bold">Iniciar Sesión</CardTitle>
        <CardDescription>Ingresa tus datos para acceder a tu cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        {serverError && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
            <AlertCircle className="size-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Correo Electrónico</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="ejemplo@correo.com" className="pl-9" {...register('email')} />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="size-3" /> {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <button type="button" onClick={() => toast.info('Instrucciones enviadas a tu correo.')} className="text-xs text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pl-9 pr-9" {...register('password')} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="size-3" /> {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-2 pt-1">
            <Checkbox id="rememberMe" checked={rememberMe} onCheckedChange={(checked) => setValue('rememberMe', Boolean(checked))} />
            <Label htmlFor="rememberMe" className="text-xs font-normal text-muted-foreground cursor-pointer">Recordarme</Label>
          </div>
          <Button type="submit" className="w-full font-semibold" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="mr-2 size-4 animate-spin" /> : <LogIn className="mr-2 size-4" />}
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t py-3 text-xs text-muted-foreground">
        ¿No tienes una cuenta? <Link to="/register" className="ml-1 font-semibold text-primary hover:underline">Regístrate</Link>
      </CardFooter>
    </Card>
  )
}
