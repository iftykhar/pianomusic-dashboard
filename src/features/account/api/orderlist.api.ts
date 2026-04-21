// features/account/api/orderlist.api.ts
import { api } from "@/lib/api";

export const getOrderList = async (userId: string, data: { pageCount: number; deliveryType: string }) => {
    try {
        const response = await api.get(`/order/user/${userId}`, {
            data: data, // Sending body with GET as per user requirement/curl
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
