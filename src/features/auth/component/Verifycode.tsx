// features/auth/component/Verifycode.tsx
"use client";
import Image from 'next/image'
import React, { useState, useEffect, useMemo } from 'react'
import { useVerifyCode } from '../hooks/useverifycode';
import { useForgotPassword } from '../hooks/useforgotpassword';
import { useRouter, useSearchParams } from 'next/navigation';
import { TimerIcon } from 'lucide-react';

const Verifycode = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60);
    const canResend = timer === 0;

    // Get email from URL query parameters using useMemo to avoid cascading renders
    const email = useMemo(() => searchParams.get('email') || '', [searchParams]);

    const { verifyCode, loading, error, success } = useVerifyCode();
    const {
        forgotPassword,
        error: resendError,
        success: resendSuccess
    } = useForgotPassword();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (value: string, index: number) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const codeString = otp.join("");
        const codeNum = Number(codeString);
        if (codeString.length === 6 && !isNaN(codeNum) && email) {
            const data = await verifyCode(codeNum, email);
            console.log("Verifycode - API Response data:", data);
            console.log("Verifycode - resetToken:", data?.resetToken);
            if (data?.resetToken) {
                // Store resetToken in localStorage or searchParams for NextPassword
                localStorage.setItem('resetToken', data.resetToken);
                const redirectUrl = `/newpassword?email=${encodeURIComponent(email)}&resetToken=${encodeURIComponent(data.resetToken)}`;
                console.log("Verifycode - Redirecting to:", redirectUrl);
                router.push(redirectUrl);
            } else {
                console.error("Verifycode - No resetToken in response!");
            }
        }
    };

    const handleResend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        await forgotPassword(email);
        setTimer(60);
    };

    // Remove the automatic redirect useEffect since we handle it in handleVerify

    return (
        <div className="min-h-screen flex items-center justify-center  px-4">
            <div className="w-full bg-black/40  rounded-xl shadow-md px-10 py-12">



                <div className="flex flex-col justify-start items-center mb-6">
                    {/* Heading */}
                    <h2 className="text-start text-2xl font-semibold text-primary mb-1">
                        Verify Your Account
                    </h2>
                    <p className="text-start text-sm text-white mb-8">
                        Enter the 6-digit code sent to your email to continue.
                    </p>

                </div>
                <div className="bg-transparent w-full max-w-xl ">
                    <div className="mb-4 text-center">
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        {success && <p className="text-green-500 text-sm">{success}</p>}
                        {resendError && <p className="text-red-500 text-sm">Resend failed: {resendError}</p>}
                        {resendSuccess && <p className="text-green-500 text-sm">Code resent successfully!</p>}
                    </div>
                    <form onSubmit={handleVerify}>
                        {/* OTP Inputs */}
                        <div className="flex items-center gap-3 justify-center mb-4">
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    id={`otp-${i}`}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className={`w-14 h-14 text-2xl text-center text-white border rounded-lg outline-none transition
                ${digit
                                            ? "border-primary text-primary"
                                            : "border-gray-300 text-gray-700"
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Timer + Resend */}
                        <div className="flex justify-between items-center text-sm text-white mb-6">
                            <div className="flex items-center gap-2">
                                <TimerIcon className="w-5 h-5 text-gray-500" />
                                <span>{String(timer).padStart(2, "0")} Second</span>
                            </div>

                            <div className="items-end">
                                <span className="text-white text-md mr-2 mb-1">
                                    Didn&apos;t get a code?
                                </span>

                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={!canResend}
                                    className={`font-medium ${canResend
                                        ? "text-primary hover:underline cursor-pointer"
                                        : "text-gray-400 cursor-not-allowed"
                                        }`}
                                >
                                    Resend
                                </button>
                            </div>
                        </div>


                        <button
                            className={`w-full bg-primary text-white py-3 rounded-md text-lg font-medium transition
    ${loading ? "opacity-60 cursor-not-allowed" : "hover:bg-primary/80 cursor-pointer"}
  `}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </button>
                    </form>
                </div>


            </div>
        </div >
    )
}

export default Verifycode