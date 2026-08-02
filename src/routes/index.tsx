import { Route, Routes } from 'react-router-dom'

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
