// src/features/dashboard/types/pricing.types.ts

export type DeliveryType = "digital" | "print" | "print&digital";

export interface PricingPayload {
    deliveryType: DeliveryType;
    pricePerPage: number;
    currency: string;
}

export interface PricingData {
    _id: string;
    deliveryType: DeliveryType;
    pricePerPage: number;
    currency: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface PricingResponse {
    success: boolean;
    message: string;
    data: PricingData;
}
