import { memo } from 'react'
import { Skeleton } from "@/components/skeleton";

function MovieCardSkeleton() {
  return (
    <div className="w-40 shrink-0 sm:w-55 lg:w-60">
      <Skeleton className="aspect-2/3 w-full rounded-2xl" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-4 w-3/4 rounded-md" />
        <Skeleton className="h-3 w-1/2 rounded-md" />
      </div>
    </div>
  )
}

export default memo(MovieCardSkeleton)