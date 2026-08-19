import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/features/movies/api'
import type { Movie } from '@/features/movies/data/movies.mock'

export const useMovies = () => {
  return useQuery<Movie[], Error>({
    queryKey: ['movies'],
    queryFn: () => moviesApi.getAll(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}
