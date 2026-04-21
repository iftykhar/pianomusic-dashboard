import { api } from "@/lib/api";
import { DashboardStatsResponse } from "../types";

// Get dashboard stats
export async function getDashboardStats() {
  try {
    const res = await api.get<DashboardStatsResponse>("/order/admin/dashboard-stats");
    return res.data.data;
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    throw new Error("Failed to fetch dashboard stats");
  }
}
