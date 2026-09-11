import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/features/movies/api'
import type { Movie } from '@/features/movies/types/movies.types'
import { useLocationStore } from '@/store'

export const useMovies = () => {
  const location = useLocationStore((state) => state.location)

  return useQuery<Movie[], Error>({
    queryKey: ['movies', location],
    queryFn: () =>
      moviesApi.getAll(
        location
          ? { cityId: location.cityId, cinemaId: location.cinemaId }
          : undefined,
      ),
    enabled: Boolean(location),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}
