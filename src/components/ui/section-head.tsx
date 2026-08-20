import { cn } from '@/utils/cn'
import { Eyebrow } from './eyebrow'

interface SectionHeadProps {
  eyebrow: string
  title: string
  subtitle?: string
  controls?: React.ReactNode
  className?: string
}

export function SectionHead({ eyebrow, title, subtitle, controls, className }: SectionHeadProps) {
  return (
    <div className={cn('section-head', className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
      </div>
      {controls && <div className="rail-controls">{controls}</div>}
    </div>
  )
}