import {
  Armchair,
  BadgePercent,
  CalendarClock,
  Crown,
  CupSoda,
  MonitorPlay,
  Popcorn,
  Smartphone,
  Ticket,
  Waves,
  type LucideIcon,
} from 'lucide-react'

import Reveal from '@/components/reveal'
import type { Promotion } from '@/features/movies'
import { cn } from '@/utils/cn'

const iconMap: Record<string, LucideIcon> = {
  Ticket,
  BadgePercent,
  Crown,
  Popcorn,
  MonitorPlay,
  Waves,
  Armchair,
  Smartphone,
  CalendarClock,
  CupSoda,
}

interface PromotionsSectionProps {
  promotions: Promotion[]
  title: string
  id?: string
}

export default function PromotionsSection({
  promotions,
  title,
  id,
}: PromotionsSectionProps) {
  return (
    <section id={id} className="w-full py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {promotions.map((promo, index) => {
            const Icon = iconMap[promo.icon] ?? Ticket
            return (
              <Reveal
                key={promo.id}
                delay={Math.min(index * 80, 320)}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-card/50"
              >
                <div
                  className={cn(
                    'flex aspect-video items-center justify-center bg-linear-to-br',
                    promo.accent,
                  )}
                >
                  <Icon className="size-10 text-primary" strokeWidth={1.6} />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span
                    className={cn(
                      'font-mono text-[0.65rem] tracking-[0.2em] uppercase',
                      promo.text,
                    )}
                  >
                    {promo.tag}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-foreground">
                    {promo.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {promo.description}
                  </p>
                  <a
                    href="#"
                    className="mt-auto pt-3 text-sm font-medium text-primary hover:underline"
                  >
                    Ver promoción
                  </a>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
