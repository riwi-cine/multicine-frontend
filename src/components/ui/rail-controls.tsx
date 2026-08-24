import { cn } from '@/utils/cn'

interface RailControlsProps {
  onPrev: () => void
  onNext: () => void
  className?: string
}

export function RailControls({ onPrev, onNext, className }: RailControlsProps) {
  return (
    <div className={cn('rail-controls', className)}>
      <button className="rail-btn" onClick={onPrev} aria-label="Anterior">
        ←
      </button>
      <button className="rail-btn" onClick={onNext} aria-label="Siguiente">
        →
      </button>
    </div>
  )
}