import { Skeleton } from "@/components/ui/skeleton";

export default function HeroSkeleton() {
  return (
    <section className="relative px-6 py-12 md:py-16 lg:px-12 bg-accent">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6">
            {/* Title Skeleton */}
            <Skeleton className="h-12 md:h-16 w-3/4 bg-gray-200/50" />
            
            {/* Description Skeleton */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-gray-200/50" />
              <Skeleton className="h-4 w-5/6 bg-gray-200/50" />
              <Skeleton className="h-4 w-4/6 bg-gray-200/50" />
            </div>

            {/* Button Skeleton */}
            <Skeleton className="h-12 w-48 rounded-md bg-gray-200/50" />

            <div className="flex flex-wrap gap-8 pt-2">
              {/* Stats Skeleton 1 */}
              <div className="flex gap-3 items-center">
                <Skeleton className="h-10 w-16 bg-gray-200/50" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-12 bg-gray-200/50" />
                  <Skeleton className="h-3 w-12 bg-gray-200/50" />
                </div>
              </div>
              {/* Stats Skeleton 2 */}
              <div className="flex gap-3 items-center">
                <Skeleton className="h-10 w-16 bg-gray-200/50" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-12 bg-gray-200/50" />
                  <Skeleton className="h-3 w-12 bg-gray-200/50" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative max-h-full">
            {/* Image Skeleton */}
            <Skeleton className="w-full aspect-square rounded-2xl bg-gray-200/50" />
          </div>
        </div>
      </section>
  )
}
