import { useQuery } from '@tanstack/react-query'

import type { Promotion } from '@/features/movies'
import { promotions as fallbackPromotions } from '@/features/movies'

import { promotionApi } from '../api'

/**
 * Promociones activas desde la API con respaldo estático: mientras el
 * backend/mock no exponga el endpoint (o falle), se renderiza el catálogo
 * local para no degradar la sección.
 */
export const usePromotions = () => {
  return useQuery<Promotion[], Error>({
    queryKey: ['promotions'],
    queryFn: async () => {
      try {
        const active = await promotionApi.getActive()
        if (Array.isArray(active) && active.length > 0) return active
      } catch {
        // Endpoint ausente o error de red → fallback
      }
      return fallbackPromotions
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}