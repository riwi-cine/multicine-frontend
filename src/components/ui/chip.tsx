import { cn } from '@/utils/cn'

interface ChipProps {
  children: React.ReactNode
  className?: string
}

export function Chip({ children, className }: ChipProps) {
  return (
    <span className={cn('chip', className)}>
      {children}
    </span>
  )
}