"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const InstrumentsTableSkeleton = () => {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-10 w-[120px]" />
      </div>
      <div className="p-0">
        <div className="h-12 border-b border-gray-100 flex items-center px-6 gap-4 bg-gray-50/50">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            className="h-16 border-b border-gray-100 flex items-center px-6 gap-4"
          >
            <Skeleton className="h-10 w-10 rounded-lg" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-8 w-16 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>
        ))}
      </div>
      <div className="p-4 flex items-center justify-between">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
};

export default InstrumentsTableSkeleton;
