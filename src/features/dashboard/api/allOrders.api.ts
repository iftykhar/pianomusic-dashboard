import { api } from "@/lib/api";

export async function getAllOrders() {
  try {
    const res = await api.get("order/admin/all-orders");
    return res.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
}

