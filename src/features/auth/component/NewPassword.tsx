"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { useResetPassword } from "../hooks/useResetPassword";

const NewPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Store URL params in local state
    const [resetToken, setResetToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const { handleResetPassword, loading, error: apiError } = useResetPassword();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [localError, setLocalError] = useState<string | null>(null);

    // Initialize state from URL params
    React.useEffect(() => {
        const emailParam = searchParams.get("email");
        const tokenParam = searchParams.get("resetToken");

        setEmail(emailParam);
        setResetToken(tokenParam);

        console.log("NewPassword - Email from params:", emailParam);
        console.log("NewPassword - ResetToken from params:", tokenParam);
        console.log("NewPassword - Full URL:", window.location.href);
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        console.log("=== NewPassword handleSubmit ===");
        console.log("Email:", email);
        console.log("ResetToken:", resetToken);
        console.log("ResetToken type:", typeof resetToken);
        console.log("ResetToken length:", resetToken?.length);

        if (!email || !resetToken) {
            setLocalError("Missing information. Please follow the link from your email again.");
            console.error("Missing email or resetToken!");
            return;
        }

        if (newPassword !== confirmPassword) {
            setLocalError("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setLocalError("Password must be at least 6 characters");
            return;
        }

        console.log("Calling handleResetPassword with:", { email, newPassword: "***", confirmPassword: "***", resetToken });
        const res = await handleResetPassword({
            newPassword: newPassword,
            confirmPassword: confirmPassword,
            resetToken: resetToken,
        });

        console.log("handleResetPassword response:", res);
        if (res) {
            alert("Password reset successfully");
            router.push("/login");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="w-full bg-black/40  rounded-xl shadow-md px-10 py-12">


                {/* Title */}
                <h2 className="text-center text-primary text-3xl font-bold mb-2">
                    Reset Your Password
                </h2>
                <p className="text-center text-white mb-10 text-lg">
                    Set a strong password to secure your account.
                </p>

                {/* Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* New Password */}
                    <div>
                        <label className="block text-lg font-medium text-white mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-full px-4 py-3 border text-white border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E88741]/50 focus:border-[#E88741]"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-lg font-medium text-white mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="********"
                                className="w-full px-4 py-3 border text-white border-gray-200 rounded-lg text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#E88741]/50 focus:border-[#E88741]"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Errors */}
                    {(localError || apiError) && (
                        <div className="text-red-500 text-sm text-center">
                            {localError || apiError}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={handleSubmit}
                        className="w-full mt-8 bg-primary cursor-pointer hover:bg-primary/50 text-white text-lg font-medium py-4 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? "Saving Password..." : "Save Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewPassword;
