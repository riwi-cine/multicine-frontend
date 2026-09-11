import { Navigate, useLocation } from 'react-router-dom'
import { useLocationStore } from '@/store'

/**
 * Guard de ubicación evaluado durante el render (no en useEffect):
 * evita el flash del contenido protegido y los fetches desperdiciados
 * antes del redirect. Preserva la ruta de origen en `state.from`.
 */
export default function RequireLocation({ children }: { children: React.ReactNode }) {
    const location = useLocation()
    const hasLocation = Boolean(useLocationStore((state) => state.location))

    if (!hasLocation && location.pathname !== '/location') {
        return (
            <Navigate
                to="/location"
                replace
                state={{ from: location.pathname }}
            />
        )
    }

    return <>{children}</>
}