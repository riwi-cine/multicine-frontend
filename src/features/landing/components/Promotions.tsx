import { ArrowRight } from 'lucide-react'

import Reveal from '@/components/Reveal'
import { cn } from '@/utils/cn'
import { promotions } from '../data/movies'
import SectionHeading from './SectionHeading'

function Promotions() {
  return (
    <section id="promotions" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Offers & Benefits"
          title="Promotions You'll Love"
          description="Discounts and experiences designed to make movies a plan for everyone. Take advantage of current offers."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {promotions.map((promo, index) => {
            const Icon = promo.icon
            return (
              <Reveal key={promo.id} delay={index * 80}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-xl hover:shadow-black/40">
                  <div
                    className={cn(
                      'pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30',
                      promo.accent,
                    )}
                    aria-hidden="true"
                  />
                  <div
                    className={cn(
                      'grid size-12 place-items-center rounded-xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3',
                      promo.accent,
                    )}
                  >
                    <Icon className="size-6" />
                  </div>

                  <p
                    className={cn(
                      'mt-5 font-mono text-[0.65rem] tracking-[0.25em] uppercase',
                      promo.text,
                    )}
                  >
                    {promo.tag}
                  </p>
                  <h3 className="mt-1.5 font-heading text-lg font-semibold tracking-tight text-white">
                    {promo.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {promo.description}
                  </p>

                  <a
                    href="#showtimes"
                    className="mt-auto flex items-center gap-1.5 pt-5 font-mono text-xs tracking-wider text-white/70 uppercase transition-colors group-hover:text-white"
                  >
                    View promotion
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Promotions
