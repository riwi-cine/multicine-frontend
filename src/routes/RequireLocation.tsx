import { Navigate, useLocation } from 'react-router-dom'

const LOCATION_STORAGE_KEY = 'selectedLocation'

/**
 * Guard de ubicación evaluado durante el render (no en useEffect):
 * evita el flash del contenido protegido y los fetches desperdiciados
 * antes del redirect. Preserva la ruta de origen en `state.from`.
 */
export default function RequireLocation({ children }: { children: React.ReactNode }) {
    const location = useLocation()

    const hasLocation = (() => {
        try {
            return Boolean(localStorage.getItem(LOCATION_STORAGE_KEY))
        } catch {
            // Storage no disponible (modo privado/lockdown): tratar como sin
            // ubicación para que el usuario pueda llegar a la página de selección.
            return false
        }
    })()

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