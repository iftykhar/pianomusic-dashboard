// src/features/dashboard/api/setpricing.api.ts

import { api } from "@/lib/api";
import { PricingPayload, PricingResponse } from "../types/pricing.types";

export async function CreatePricing(data: PricingPayload): Promise<PricingResponse> {
    try {
        const res = await api.post("pricing/admin/set-price", data);
        return res.data;
    } catch (error) {
        console.error("Error setting pricing:", error);
        throw error;
    }
}