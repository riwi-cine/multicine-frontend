import Reveal from '@/components/Reveal'
import { benefits } from '../data/movies'
import SectionHeading from './SectionHeading'

function Benefits() {
  return (
    <section
      id="beneficios"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="La experiencia"
          title="Beneficios de Multicine"
          description="Tecnología de vanguardia y comodidades premium para que cada visita al cine sea inolvidable."
          align="center"
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Reveal key={benefit.id} delay={index * 70}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ocean-400/40 hover:bg-white/[0.06] hover:shadow-glow-ocean">
                  <span className="absolute top-5 right-6 font-mono text-xs text-white/20 transition-colors duration-300 group-hover:text-ocean-400/60">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="grid size-12 place-items-center rounded-xl border border-ocean-400/30 bg-ocean-500/10 text-ocean-400 transition-all duration-300 group-hover:bg-ocean-500 group-hover:text-white group-hover:shadow-glow-ocean">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-base font-semibold tracking-tight text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {benefit.description}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Benefits
