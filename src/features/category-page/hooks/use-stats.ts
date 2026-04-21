import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../api/stats.api";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
