import { useQuery } from '@tanstack/react-query'

import type { Promotion } from '@/features/movies'

import { promotionApi } from '../api'

export const usePromotions = () => {
  return useQuery<Promotion[], Error>({
    queryKey: ['promotions'],
    queryFn: () => promotionApi.getActive(),
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })
}