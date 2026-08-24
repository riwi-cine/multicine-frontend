import { Route, Routes } from 'react-router-dom'

import LandingPage, { SelectLocationPage } from '@/features/landing'
import RequireLocation from '@/routes/RequireLocation'

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center text-lg text-muted-foreground">
      404 - Page not found
    </div>
  )
}

function AppRoutes() {
  return (
    <RequireLocation>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/location" element={<SelectLocationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RequireLocation>
  )
}

export default AppRoutes
