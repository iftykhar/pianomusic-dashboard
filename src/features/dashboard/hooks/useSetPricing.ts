// src/features/dashboard/hooks/useSetPricing.ts
import { useState } from "react";
import { CreatePricing } from "../api/setpricing.api";
import { PricingPayload } from "../types/pricing.types";

export function useSetPricing() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const createPricing = async (data: PricingPayload) => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const res = await CreatePricing(data);
            if (res.success) {
                setSuccess(res.message);
            }
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } }; message?: string };
            setError(err?.response?.data?.message || err?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { createPricing, loading, error, success, setSuccess };
}