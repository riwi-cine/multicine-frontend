import { cn } from '@/utils/cn'

interface LinkArrowProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function LinkArrow({ href, children, className, onClick }: LinkArrowProps) {
  return (
    <a href={href} className={cn('link-arrow', className)} onClick={onClick}>
      {children}
      <span aria-hidden="true">→</span>
    </a>
  )
}