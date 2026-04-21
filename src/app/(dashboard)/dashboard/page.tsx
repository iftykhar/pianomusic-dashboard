"use client";

import React, { useState } from "react";
import { useStudentProgress } from "@/features/student-progress/hooks/useStudentProgress";
import StudentProgressTable from "@/features/student-progress/components/StudentProgressTable";
import StudentProgressSkeleton from "@/features/student-progress/components/StudentProgressSkeleton";
import Cards from "@/components/dashboard/pages/overviews/Cards";

const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 5; // Limiting to top 5 for the dashboard view

  const { data, isLoading, error } = useStudentProgress(
    page,
    limit,
    searchTerm,
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Analytics Dashboard Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 mb-1">Analytics Dashboard</h1>
        <p className="text-slate-500 font-medium tracking-tight">
          Overview of your Total Students and Lesson completion Rate.
        </p>
      </div>

      {/* Stats Cards Section */}
      <Cards />

      {/* Chart Placeholder Section - As no charting library was found in package.json */}
      {/* <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-gray-900 text-lg">Total joining Students</h3>
          <div className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-medium text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            This Week
          </div>
        </div> */}

        {/* Placeholder for Area Chart */}
        {/* <div className="w-full h-[300px] bg-slate-50/50 rounded-2xl flex items-center justify-center border border-dashed border-slate-200">
          <div className="text-center">
            <p className="text-slate-400 font-medium">Chart visualization will appear here</p>
            <p className="text-xs text-slate-300 mt-1">Integrate with Recharts for live data</p>
          </div>
        </div> */}
      {/* </div> */}

      {/* Top Performing Students / Progress Table Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900">Top Performing Students</h2>
        </div>

        {error ? (
          <div className="p-6 bg-red-50 rounded-3xl border border-red-100 text-center">
            <p className="text-red-600 font-medium">Error loading student progress reports</p>
          </div>
        ) : isLoading ? (
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
              setPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
