import { Play } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/dialog'
import { Button } from '@/components/button'
import { cn } from '@/utils/cn'

interface TrailerDialogProps {
  trailerUrl?: string
  movieTitle: string
  className?: string
  compact?: boolean
}

export default function TrailerDialog({
  trailerUrl,
  movieTitle,
  className,
  compact = false,
}: TrailerDialogProps) {
  if (!trailerUrl) {
    return (
      <Button
        size="lg"
        variant="ghost"
        disabled
        className="
          h-12 rounded-xl px-7
          text-base text-white/50
        "
      >
        <Play data-icon="inline-start" className="fill-current" />
        Tráiler no disponible
      </Button>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {compact ? (
          <Button
            size="sm"
            className="
              rounded-full border border-white/20 bg-black/50
              text-xs text-white backdrop-blur-md
              hover:bg-black/70 hover:text-white
            "
          >
            <Play data-icon="inline-start" className="fill-current" />
            Ver tráiler
          </Button>
        ) : (
          <Button
            size="lg"
            variant="ghost"
            className={cn(
              'h-12 rounded-xl px-7 text-base text-white',
              'hover:bg-white/10 hover:text-white',
              className,
            )}
          >
            <Play data-icon="inline-start" className="fill-current" />
            Ver tráiler
          </Button>
        )}
      </DialogTrigger>

      <DialogContent
        className="
          w-[90vw]
          max-w-[95vw]
          sm:max-w-250
          md:max-w-275!
          lg:max-w-300!
          border-white/10
          bg-black
          p-0
          overflow-hidden
        "
      >
        <DialogTitle className="sr-only">
          Tráiler de {movieTitle}
        </DialogTitle>

        <div className="relative aspect-video w-full">
          <iframe
            src={trailerUrl}
            title={`Tráiler de ${movieTitle}`}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}