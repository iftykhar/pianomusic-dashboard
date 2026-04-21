// features/auth/component/login.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useLogin } from "../hooks/uselogin";

const Login = () => {
  const { loading, error, handleLogin } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  // Get callback URL from search params (for redirecting after login)
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await handleLogin(email, password);
    if (res && !res.error) {
      // Redirect to callback URL (e.g., /create-book) or home
      router.push(callbackUrl);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full bg-black/40  rounded-xl shadow-lg p-10">

        <div className="text-start">

          {/* Title */}
          <h2 className=" text-primary text-2xl font-semibold mb-2">
            Welcome
          </h2>
          <p className=" text-sm text-white mb-8">
            Manage your orders, track shipments, and configure products easily.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={onSubmit}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm text-white mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="hello@example.com"
              className="w-full px-4 py-3 border rounded-md text-sm text-white  focus:outline-none focus:ring-2 focus:bg-primary/5 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          
            <label className="block text-sm text-white/90 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-1"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>

          {/* Options */}
          <div className="flex items-center justify-between text-base mt-2 px-1">
            <label className="flex items-center gap-2 text-white cursor-pointer select-none">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary accent-primary transition-all cursor-pointer"
              />
              Remember me
            </label>

            <Link
              href="/reset-password"
              title="reset password"
              className="text-primary font-medium hover:text-primary/80 transition-all hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* <div className="text-center text-sm text-white mt-4">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-semibold hover:text-primary/80 transition-all hover:underline"
            >
              Create an account
            </Link>
          </div> */}

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-primary cursor-pointer hover:bg-primary/90 text-white font-semibold py-3 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
