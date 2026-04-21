import React from "react";

const ModulesTableSkeleton = () => {
  return (
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
                {[1, 2, 3, 4, 5, 6].map((cell) => (
                  <td key={cell} className="px-6 py-4">
                    <div className="h-10 w-full bg-gray-50 animate-pulse rounded-lg" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModulesTableSkeleton;
