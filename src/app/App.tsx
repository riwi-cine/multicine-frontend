import AppRoutes from '@/routes'
import { Toaster } from '@/components/sonner'

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" richColors />
    </>
  )
}

export default App
