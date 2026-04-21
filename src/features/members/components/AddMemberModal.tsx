"use client";
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useRegisterUserMutation,
  useBulkRegisterMutation,
} from "../hooks/useMembersMutations";
import { UserPlus, FileUp, Upload, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"manual" | "bulk">("manual");
  const [manualData, setManualData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const registerMutation = useRegisterUserMutation();
  const bulkRegisterMutation = useBulkRegisterMutation();

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerMutation.mutateAsync(manualData);
      setManualData({ name: "", email: "", username: "", password: "" });
      onClose();
    } catch {
      // Error handled in hook
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      // Simple regex to find all emails in the file
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      const emails = Array.from(new Set(content.match(emailRegex) || []));

      if (emails.length === 0) {
        toast.error("No valid email addresses found in the file.");
        setIsParsing(false);
        return;
      }

      try {
        await bulkRegisterMutation.mutateAsync(emails);
        onClose();
      } catch {
        // Error handled in hook
      } finally {
        setIsParsing(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read file.");
      setIsParsing(false);
    };
    reader.readAsText(file);
  };

  const isPending =
    registerMutation.isPending || bulkRegisterMutation.isPending || isParsing;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
        <div className="bg-linear-to-br from-primary/10 via-white to-primary/5 p-1">
          <div className="bg-white rounded-[calc(1.5rem-0.25rem)] p-6">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-xl">
                  <UserPlus className="w-6 h-6 text-primary" />
                </div>
                Add New Member
              </DialogTitle>
              <p className="text-sm text-gray-500 italic mt-1 text-left">
                Expand your community by adding members manually or in bulk.
              </p>
            </DialogHeader>

            {/* Custom Tabs */}
            <div className="flex bg-gray-100/50 p-1 rounded-2xl mb-8">
              <button
                onClick={() => setActiveTab("manual")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "manual"
                    ? "bg-white text-primary shadow-sm ring-1 ring-gray-200/50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                }`}
              >
                <UserPlus className="w-4 h-4" />
                Manual Entry
              </button>
              <button
                onClick={() => setActiveTab("bulk")}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "bulk"
                    ? "bg-white text-primary shadow-sm ring-1 ring-gray-200/50"
                    : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                }`}
              >
                <FileUp className="w-4 h-4" />
                Bulk Import
              </button>
            </div>

            {activeTab === "manual" ? (
              <form onSubmit={handleManualSubmit} className="space-y-5">
                <div className="space-y-4">
                  <div className="grid gap-2 text-left">
                    <Label
                      htmlFor="name"
                      className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Nayem Sarkar"
                      value={manualData.name}
                      onChange={(e) =>
                        setManualData({ ...manualData, name: e.target.value })
                      }
                      className="h-12 rounded-xl border-gray-200 focus:ring-primary shadow-sm placeholder:text-gray-300"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2 text-left">
                      <Label
                        htmlFor="username"
                        className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1"
                      >
                        Username
                      </Label>
                      <Input
                        id="username"
                        placeholder="nayem12"
                        value={manualData.username}
                        onChange={(e) =>
                          setManualData({
                            ...manualData,
                            username: e.target.value,
                          })
                        }
                        className="h-12 rounded-xl border-gray-200 focus:ring-primary shadow-sm placeholder:text-gray-300"
                        required
                      />
                    </div>
                    <div className="grid gap-2 text-left">
                      <Label
                        htmlFor="password"
                        className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1"
                      >
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="********"
                        value={manualData.password}
                        onChange={(e) =>
                          setManualData({
                            ...manualData,
                            password: e.target.value,
                          })
                        }
                        className="h-12 rounded-xl border-gray-200 focus:ring-primary shadow-sm placeholder:text-gray-300"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-2 text-left">
                    <Label
                      htmlFor="email"
                      className="text-sm font-black text-gray-700 uppercase tracking-wider ml-1"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nayem@example.com"
                      value={manualData.email}
                      onChange={(e) =>
                        setManualData({ ...manualData, email: e.target.value })
                      }
                      className="h-12 rounded-xl border-gray-200 focus:ring-primary shadow-sm placeholder:text-gray-300"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-black rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-4"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register Member"
                  )}
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-3xl p-10 flex flex-col items-center justify-center gap-4 bg-gray-50/50 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group"
                >
                  <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:shadow-md transition-shadow group-hover:scale-110 duration-300">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="font-black text-gray-900">
                      Click to upload CSV or Excel
                    </p>
                    <p className="text-xs text-gray-400 mt-1 italic">
                      We&apos;ll extract all email addresses from your file
                    </p>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".csv,.xlsx,.xls,.txt"
                  />
                </div>

                <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-4 flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-[13px] font-bold text-orange-800">
                      Pro Tip
                    </p>
                    <p className="text-xs text-orange-700 leading-relaxed italic">
                      Upload any file containing email addresses. Our system
                      will intelligently identify and extract them for bulk
                      invitations.
                    </p>
                  </div>
                </div>

                {isParsing && (
                  <div className="flex items-center justify-center gap-3 text-primary font-bold animate-pulse">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Parsing data...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
