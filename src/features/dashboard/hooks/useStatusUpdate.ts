// features/dashboard/hooks/useStatusUpdate.ts

import { useState } from "react";
import { changeOrderStatus } from "../api/statuschange.api";

export function useStatusUpdate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const updateStatus = async (orderId: string, status: string) => {
    setLoading(true);
    setError(null);

    try {
      await changeOrderStatus(orderId, status);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    updateStatus,
    loading,
    error,
  };
}