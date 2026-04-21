import React from "react";

const StudentProgressSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-md" />
          <div className="h-4 w-64 bg-gray-100 animate-pulse rounded-md" />
        </div>
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg" />
      </div>

      <div className="w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <th key={i} className="px-6 py-4">
                    <div className="h-4 w-24 bg-gray-200 animate-pulse rounded" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row}>
                  {[1, 2, 3, 4, 5, 6].map((col) => (
                    <td key={col} className="px-6 py-6">
                      <div className="h-4 w-full bg-gray-100 animate-pulse rounded" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
          <div className="h-4 w-48 bg-gray-200 animate-pulse rounded" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-8 w-8 bg-gray-200 animate-pulse rounded-md"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProgressSkeleton;
