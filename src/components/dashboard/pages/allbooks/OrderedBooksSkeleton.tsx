import { Skeleton } from "@/components/ui/skeleton";

const OrderedBooksSkeleton = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-8 w-32 rounded-full" />
      </div>

      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col"
          >
            {/* Image Skeleton */}
            <Skeleton className="h-56 w-full rounded-none" />

            <div className="p-5 flex flex-col flex-grow">
              {/* Title & Meta */}
              <div className="space-y-2 mb-4">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>

              <div className="space-y-4 mt-auto">
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <div className="space-y-2 text-right">
                    <Skeleton className="h-3 w-20 ml-auto" />
                    <Skeleton className="h-4 w-24 ml-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderedBooksSkeleton;
