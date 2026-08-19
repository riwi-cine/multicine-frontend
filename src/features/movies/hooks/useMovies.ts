import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/features/movies/api'
import { mapMockMoviesToLocal } from '@/features/movies/data/mappers'
import type { Movie } from '@/features/movies/data/movies.mock'

export const useMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: async () => {
      const data = await moviesApi.getAll()
      return mapMockMoviesToLocal(data)
    },
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}
