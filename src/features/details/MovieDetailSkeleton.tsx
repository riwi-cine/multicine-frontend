import { Skeleton } from '@/components/skeleton'

export default function MovieDetailSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero section skeleton */}
      <section className="relative isolate min-h-[700px] overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Skeleton className="h-full w-full" />
        </div>

        <div className="mx-auto flex min-h-[700px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="flex w-full flex-col gap-10 md:flex-row md:items-center md:gap-12">
            {/* Poster skeleton */}
            <div className="mx-auto w-56 shrink-0 sm:w-64 md:mx-0 lg:w-72">
              <Skeleton className="aspect-2/3 w-full rounded-2xl" />
            </div>

            {/* Info skeleton */}
            <div className="max-w-3xl text-center md:text-left space-y-6">
              {/* Status badge */}
              <div className="flex justify-center md:justify-start">
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              {/* Title */}
              <Skeleton className="h-10 w-3/4 mx-auto md:mx-0" />

              {/* Quick info row */}
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:justify-start">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-2" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-2" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-2" />
                <Skeleton className="h-6 w-40" />
              </div>

              {/* Genres */}
              <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-8 w-28 rounded-full" />
              </div>

              {/* Synopsis */}
              <div className="space-y-2 max-w-2xl mx-auto md:mx-0">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* Button */}
              <div className="flex justify-center md:justify-start pt-4">
                <Skeleton className="h-12 w-40 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional info section skeleton */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
          <Skeleton className="h-6 w-48" />
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}