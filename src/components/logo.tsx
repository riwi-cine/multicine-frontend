import { Link } from 'react-router-dom'

import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
  showText?: boolean
}

function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Multicine - home"
      className={cn(
        'group inline-flex items-center gap-2.5',
        className,
      )}
    >
      <span
        className="
          relative grid size-10 shrink-0
          place-items-center
          overflow-hidden
          rounded-xl
          transition-transform duration-300
          group-hover:scale-105
        "
      >
        <img
          src="/images/logo-Photoroom.png"
          alt="Logo Multicine"
          className="size-full object-contain"
        />
        
      </span>
      {showText && (
        <span className="font-heading text-base font-bold tracking-tight text-foreground xs:text-lg lg:text-xl">
          MINE<span className="text-primary">ROYAL</span>
        </span>
      )}
    </Link>
  )
}

export default Logo