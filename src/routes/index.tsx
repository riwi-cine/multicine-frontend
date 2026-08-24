import { Route, Routes, Navigate } from 'react-router-dom'
import { RegisterPage } from '@/pages/RegisterPage'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/20">
      <Card className="w-full max-w-md text-center p-6 space-y-4">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Página de inicio de sesión en desarrollo.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link to="/register">Volver al Registro</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center text-lg text-muted-foreground">
      404 - Página no encontrada
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

