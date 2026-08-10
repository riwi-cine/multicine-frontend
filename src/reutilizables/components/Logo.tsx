import { Clapperboard } from 'lucide-react'

import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
  showText?: boolean
}

function Logo({ className, showText = true }: LogoProps) {
  return (
    <a
      href="#inicio"
      aria-label="Multicine - inicio"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span className="relative grid size-9 shrink-0 place-items-center rounded-xl bg-primary transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
        <Clapperboard className="size-5 text-primary-foreground" strokeWidth={2.2} />
        <span className="absolute -right-1 -bottom-1 size-2.5 rounded-full bg-primary/60 ring-2 ring-background" />
      </span>
      {showText && (
        <span className="font-heading text-lg font-bold tracking-tight text-foreground">
          MULTI<span className="text-primary">CINE</span>
        </span>
      )}
    </a>
  )
}

export default Logo
