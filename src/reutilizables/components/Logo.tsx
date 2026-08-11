import { cn } from '@/utils/cn'

interface LogoProps {
  className?: string
  showText?: boolean
}

function Logo({ className, showText = true }: LogoProps) {
  return (
    <a
      href="#home"
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

        <span
          className="
            absolute -right-1 -bottom-1
            size-2.5 rounded-full
            bg-[#FF69B4]
            ring-2 ring-white/70
          "
        />
      </span>

      {showText && (
        <span className="font-heading text-lg font-bold tracking-tight text-foreground">
          MINE<span className="text-primary">ROYAL</span>
        </span>
      )}
    </a>
  )
}

export default Logo