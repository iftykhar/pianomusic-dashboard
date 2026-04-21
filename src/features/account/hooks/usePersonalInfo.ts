// src/features/account/hooks/usePersonalInfo.ts
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { getUserProfile, updatePersonalInfo } from "../api/personalinfo.api";

export const usePersonalInfo = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!session?.accessToken) return;

    try {
      setLoading(true);
      const res = await getUserProfile(session.accessToken);
      if (res.success) {
        setUser(res.data);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch profile",
      );
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleUpdateProfile = async (formData: FormData) => {
    if (!session?.accessToken) {
      setError("Session expired. Please log in again.");
      return;
    }

    try {
      setUpdating(true);
      setError(null);
      const res = await updatePersonalInfo(formData, session.accessToken);
      if (res.success) {
        setUser(res.data);
        return res;
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to update profile";
      setError(message);
      throw new Error(message);
    } finally {
      setUpdating(false);
    }
  };

  return {
    user,
    loading,
    updating,
    error,
    handleUpdateProfile,
    refreshProfile: fetchProfile,
  };
};
