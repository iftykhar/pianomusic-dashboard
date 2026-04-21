import { api } from "@/lib/api";

// Get content with dynamic params
export async function getContent(params: Record<string, unknown>) {
  try {
    const res = await api.get("/content", { params });
    return res.data;
  } catch (err) {
    console.error("Error fetching content:", err);
    throw new Error("Failed to fetch content");
  }
}
