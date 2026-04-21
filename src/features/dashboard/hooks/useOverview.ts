"use client";
import { useEffect, useState } from "react";
import { getOverviewData } from "../api/overview.api";

interface OverviewData {
  totalEnrolledStudents: number;
  totalLessonsCompleted: number;
  totalModulesPassed: number;
  completedCourses: number;
}

export function useOverview() {
  const [data, setData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    async function fetchOverview() {
      try {
        const res = await getOverviewData();
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOverview();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
