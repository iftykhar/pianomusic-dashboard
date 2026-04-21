"use client";

import React, { useState, useEffect } from "react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Calendar,
  Loader2,
  Camera,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { usePersonalInfo } from "@/features/account/hooks/usePersonalInfo";
import { Skeleton } from "@/components/ui/skeleton";

const PersonalInformation = () => {
  const { user, loading, updating, error, handleUpdateProfile } =
    usePersonalInfo();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isFilled = React.useRef(false);

  useEffect(() => {
    if (user && !isFilled.current) {
      React.startTransition(() => {
        setFormData({
          name: user.name || "",
          age: user.age?.toString() || "",
        });
        if (user.avatar?.url) {
          setImagePreview(user.avatar.url);
        }
      });
      isFilled.current = true;
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    try {
      await handleUpdateProfile(data);
      toast.success("Profile Synchronized", {
        description: "Your personal data has been updated on the main frame.",
        icon: <CheckCircle2 className="text-green-500" />,
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Update failed";
      toast.error("Process Failed", {
        description: errorMsg,
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <Skeleton className="h-48 w-full rounded-4xl" />
        <div className="max-w-2xl mx-auto space-y-6">
          <Skeleton className="h-96 w-full rounded-4xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent space-y-10 py-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Profile Header */}

      {/* Main Form container */}
      <div className="max-w-2xl mx-auto">
        <Card className="group bg-white border-2 border-gray-100 rounded-4xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-2xl focus-within:border-blue-500/50 overflow-hidden">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-4 p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative group/avatar">
                    <Avatar className="h-24 w-24 border-4 border-gray-50 shadow-inner group-hover:border-blue-100 transition-colors duration-500">
                      <AvatarImage
                        src={imagePreview || "/images/profile-mini.jpg"}
                      />
                      <AvatarFallback className="bg-blue-50 text-blue-700 text-2xl font-black">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-all scale-90 group-hover:scale-100 opacity-0 group-hover:opacity-100"
                    >
                      <Camera size={14} />
                      <input
                        type="file"
                        id="avatar-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-black text-gray-900 tracking-tight">
                      {user?.name || "User Profile"}
                    </CardTitle>
                    <p className="text-sm font-medium text-gray-500">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-gray-900 text-white rounded-full">
                  Status: Active
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 px-8">
              {/* Error Display */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                  {error}
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                  Display Name
                </Label>
                <div className="relative">
                  <User
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors"
                    size={20}
                  />
                  <Input
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="h-16 pl-12 text-xl font-medium border-2 border-gray-100 bg-gray-50/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                  Age
                </Label>
                <div className="relative">
                  <Calendar
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors"
                    size={20}
                  />
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                    className="h-16 pl-12 text-xl font-medium border-2 border-gray-100 bg-gray-50/50 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Email (Read-only) */}
              <div className="space-y-2 opacity-60">
                <Label className="text-xs font-bold text-gray-900 uppercase tracking-widest">
                  System Email
                </Label>
                <div className="relative">
                  <Mail
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <Input
                    value={user?.email || ""}
                    disabled
                    className="h-16 pl-12 text-xl font-medium border-2 border-gray-100 bg-gray-100 rounded-2xl cursor-not-allowed"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-8 pb-10">
              <Button
                type="submit"
                disabled={updating}
                className="w-full h-16 bg-gray-900 hover:bg-black text-white text-lg font-black rounded-2xl shadow-xl transition-all active:scale-[0.98] group/btn overflow-hidden relative"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {updating ? (
                    <Loader2 className="animate-spin h-6 w-6" />
                  ) : (
                    <>
                      Update Profile <Sparkles size={18} />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></div>
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PersonalInformation;
