import { SearchX } from 'lucide-react'

interface CarteleraEmptyStateProps {
  message?: string
}

export default function CarteleraEmptyState({
  message = 'No se encontraron películas con los filtros seleccionados.',
}: CarteleraEmptyStateProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-16 text-center sm:px-6 lg:px-8">
      <SearchX className="size-10 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  )
}