"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Lock,
  ShieldCheck,
  Loader2,
  KeyRound,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { useChangePassword } from "@/features/account/hooks/useChangepasswordUser";
import { useSession } from "next-auth/react";

const ChangePassword = () => {
  const { data: session } = useSession();
  const { loading, error, handleChangePassword } = useChangePassword();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error("User session not found. Please log in again.");
      return;
    }

    const res = await handleChangePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });

    if (res) {
      toast.success("Security Credentials Updated", {
        description: "Your password protocol has been synchronized.",
        icon: <ShieldCheck className="text-green-500" />,
      });
      setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
    }
  };

  return (
    <div className="min-h-screen bg-transparent space-y-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-1000" >
      {/* Security Command Header */}

      {/* Password Update Form */}
      <div className="max-w-2xl mx-auto">
        <Card className="group bg-white border-2 border-gray-100 rounded-4xl transition-all duration-500 hover:border-[#ff7a00]/30 hover:shadow-2xl focus-within:border-[#ff7a00]/50">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-4 p-8">
              <div className="flex items-center justify-between">
                <div className="p-4 rounded-2xl bg-gray-50 group-hover:bg-[#ff7a00]/10 transition-colors duration-500">
                  <KeyRound className="w-8 h-8 text-[#ff7a00]" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-900 text-white rounded-full">
                  Identity Verified
                </span>
              </div>
              <CardTitle className="text-3xl font-black text-gray-900 tracking-tight">
                Update Credentials
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 px-8">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  {error}
                </div>
              )}

              {/* Current Password */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                  Current Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#ff7a00] transition-colors"
                    size={20}
                  />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={formData.oldPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, oldPassword: e.target.value })
                    }
                    required
                    className="h-16 pl-12 text-xl font-medium border-2 border-gray-100 bg-gray-50/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#ff7a00]/10 focus:border-[#ff7a00] transition-all"
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                  New Secure Password
                </Label>
                <div className="relative">
                  <Lock
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-[#ff7a00] transition-colors"
                    size={20}
                  />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create strong password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, newPassword: e.target.value })
                    }
                    required
                    className="h-16 pl-12 pr-12 text-xl font-medium border-2 border-gray-100 bg-gray-50/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-[#ff7a00]/10 focus:border-[#ff7a00] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-8 pb-10">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-16 bg-gray-900 hover:bg-black text-white text-lg font-black rounded-2xl shadow-xl transition-all active:scale-[0.98] group/btn overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    "Authorize Password Update"
                  )}
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-[#ff7a00] to-[#ff9500] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ChangePassword;
