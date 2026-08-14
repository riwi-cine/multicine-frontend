import Reveal from '@/components/reveal'
import MovieArtwork from '@/features/movies/components/MovieArtwork'
import { featuredMovie } from '@/features/movies/data/movies.mock'
import type { Benefit } from '@/features/movies/data/movies.mock'

interface ExperienceSectionProps {
  benefits: Benefit[]
  id?: string
}

export default function ExperienceSection({ benefits, id }: ExperienceSectionProps) {
  const highlights = benefits.slice(0, 3)

  return (
    <section id={id} className="w-full py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <Reveal className="overflow-hidden rounded-2xl border border-white/5">
          <div className="aspect-[4/3] sm:aspect-[16/9]">
            <MovieArtwork palette={featuredMovie.palette} variant="backdrop" />
          </div>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-4">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            La experiencia Multicine
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Salas de última generación, sonido envolvente y comodidades pensadas
            para que cada función se sienta como un estreno.
          </p>

          <ul className="flex flex-col gap-2.5">
            {highlights.map((benefit) => (
              <li
                key={benefit.id}
                className="flex items-center gap-2.5 text-sm text-foreground/90"
              >
                <span className="size-1.5 shrink-0 rounded-full bg-primary" />
                {benefit.title}
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Conocer más
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
