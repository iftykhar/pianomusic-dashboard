"use client";
import { useEffect, useState, useCallback } from "react";
import { getAllOrders } from "../api/allOrders.api";

export interface Order {
    _id: string;
    userId: {
        name: string;
        email: string;
    };
    totalAmount: number;
    status: string;
    deliveryStatus: string;
    createdAt: string;
    updatedAt: string;
    book?: string;
    title?: string;
    deliveryType?: string;
    pageCount?: number;
}

export function useAllOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getAllOrders();
            setOrders(res.data || []);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        loading,
        error,
        refetch: fetchOrders,
    };
}
