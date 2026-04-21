// features/dashboard/api/statuschange.api.ts

import { api } from "@/lib/api";

export async function changeOrderStatus(orderId: string, deliveryStatus: string) {
  try {
    const res = await api.patch("/order/update-delivery-status", {
      orderId,
      deliveryStatus,
    });
    
    return res.data;
  } catch (error) {
    console.error("Error changing order status:", error);
    throw error;
  }
}