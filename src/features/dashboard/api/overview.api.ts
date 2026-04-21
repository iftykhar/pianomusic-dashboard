// features/dashboard/api/overview.api.ts

import { api } from "@/lib/api";

export async function getOverviewData() {
    try {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        
        const res = await api.get("/progress/admin-stats", {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        
        return res.data;
    } catch (error) {
        console.error("Error fetching overview data:", error);
        throw error;
    }
}
