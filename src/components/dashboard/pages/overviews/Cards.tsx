"use client";
import React from "react";
import { useOverview } from "@/features/dashboard/hooks/useOverview";
import CardOverview from "./CardOverview";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, BookOpen, GraduationCap } from "lucide-react";

const Cards = () => {
  const { data, loading, error } = useOverview();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-44 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 text-red-500 rounded-2xl border border-red-100 font-medium text-center">
        Failed to load dashboard statistics.
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <CardOverview
        title="Total Students"
        numberInfo={data.totalEnrolledStudents.toLocaleString()}
        trend="+ 36%"
        isUp={true}
        Icon={Users}
        color="#8B7EF8"
        bgColor="#F0EFFF"
      />

      <CardOverview
        title="Lesson completion"
        numberInfo={`${Math.round((data.totalLessonsCompleted / (data.totalEnrolledStudents * 10 || 1)) * 100)}%`}
        trend="- 14%"
        isUp={false}
        Icon={BookOpen}
        color="#FF8B36"
        bgColor="#FFF5EF"
      />

      <CardOverview
        title="Passed Modules"
        numberInfo={data.totalModulesPassed.toLocaleString()}
        trend="+ 20%"
        isUp={true}
        Icon={GraduationCap}
        color="#10B981"
        bgColor="#EFFFF6"
      />
    </div>
  );
};

export default Cards;
