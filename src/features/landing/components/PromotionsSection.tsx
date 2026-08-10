import Reveal from '@/reutilizables/components/Reveal'
import type { Promotion } from '@/features/movies/data/movies.mock'
import { cn } from '@/utils/cn'

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
            const Icon = promo.icon
            return (
              <Reveal
                key={promo.id}
                delay={Math.min(index * 80, 320)}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-card/50"
              >
                <div
                  className={cn(
                    'flex aspect-[16/9] items-center justify-center bg-gradient-to-br',
                    promo.accent,
                  )}
                >
                  <Icon className="size-10 text-primary" strokeWidth={1.6} />
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <span className={cn('font-mono text-[0.65rem] tracking-[0.2em] uppercase', promo.text)}>
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
