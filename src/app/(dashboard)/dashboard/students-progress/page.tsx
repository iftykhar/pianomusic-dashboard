"use client";
import React, { useState } from "react";
import { useStudentProgress } from "@/features/student-progress/hooks/useStudentProgress";
import StudentProgressTable from "@/features/student-progress/components/StudentProgressTable";
import StudentProgressSkeleton from "@/features/student-progress/components/StudentProgressSkeleton";

const StudentProgressPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data, isLoading, error } = useStudentProgress(
    page,
    limit,
    searchTerm,
  );

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-red-50 rounded-3xl border border-red-100">
        <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Error loading progress reports
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We encountered an issue while fetching the student progress data.
          Please check your connection and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {isLoading ? (
        <StudentProgressSkeleton />
      ) : (
        <StudentProgressTable
          data={data?.data || []}
          pagination={{
            currentPage: data?.meta?.page || 1,
            totalPages: data?.meta?.totalPage || 1,
            totalItems: data?.meta?.total || 0,
            onPageChange: (p) => setPage(p),
          }}
          searchValue={searchTerm}
          onSearchChange={(v) => {
            setSearchTerm(v);
            setPage(1); // Reset to first page on search
          }}
        />
      )}
    </div>
  );
};

export default StudentProgressPage;
