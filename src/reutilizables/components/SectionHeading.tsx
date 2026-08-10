import Reveal from '@/reutilizables/components/Reveal'
import { cn } from '@/utils/cn'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.28em] text-muted-foreground uppercase">
        <span className="h-px w-6 bg-border" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  )
}

export default SectionHeading
