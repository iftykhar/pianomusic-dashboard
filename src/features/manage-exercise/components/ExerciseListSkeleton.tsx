import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ExerciseListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="overflow-hidden border-gray-200">
          <div className="h-40 bg-gray-100 relative">
            <Skeleton className="h-full w-full" />
          </div>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/4 mb-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
              <Skeleton className="h-3 w-1/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
