// features/auth/hooks/useresetpassword.ts
"use client";
import { useState } from "react";
import { isAxiosError } from "axios";
import { resetPassword as resetPasswordApi } from "../api/resetpassword.api";

export function useResetPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleResetPassword = async (data: { newPassword: string; confirmPassword: string; resetToken: string }) => {
        console.log("=== useResetPassword handleResetPassword ===");
        console.log("Data:", data);
        console.log("Token received:", data.resetToken);
        console.log("Token type:", typeof data.resetToken);

        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            console.log("Calling resetPasswordApi...");
            const response = await resetPasswordApi(data);
            console.log("resetPasswordApi response:", response);
            setSuccess(true);
            return response;
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.message || "Something went wrong");
            } else {
                setError("An unexpected error occurred");
            }
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { handleResetPassword, loading, error, success };
}
