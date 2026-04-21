"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { KeyIcon, LogOut, Menu, User2Icon } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import HeaderTitle from "./Headertitle";
// import HeaderTitle from "../ReusableComponents/HeaderTitle";

import { usePersonalInfo } from "@/features/account/hooks/usePersonalInfo";

export default function DashboardHeader() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { user, loading } = usePersonalInfo();

  const handleLogout = () => {
    signOut();
    setLogoutDialogOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center space-x-4 p-5 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-3 w-[150px]" />
        </div>
      </div>
    );
  }

  return (
    <header className="w-full h-20 bg-white/70 backdrop-blur-lg border-b border-slate-200/60 sticky top-0 z-40 px-6 flex items-center justify-between transition-all duration-300">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2.5 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 transition-colors"
        >
          <Menu size={20} className="text-slate-600" />
        </button>

        <HeaderTitle
          title="My Dashboard"
          subtitle="Welcome back! Here’s what’s happening today...."
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">
        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative group flex items-center gap-3 h-auto py-1.5 px-2 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-200 shadow-none"
            >
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-slate-100 transition-transform group-hover:scale-105">
                  <AvatarImage
                    src={user?.avatar?.url || "/images/profile-mini.jpg"}
                    alt="User"
                  />
                  <AvatarFallback className="bg-orange-50 text-orange-700 font-bold uppercase">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
              </div>

              <div className="hidden sm:flex flex-col text-left">
                <span className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {user?.name || "User"}
                </span>
                <span className="text-[11px] font-medium text-slate-500">
                  {user?.email}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64 p-2 rounded-2xl border border-slate-200 shadow-xl animate-in fade-in zoom-in duration-200"
          >
            <div className="px-4 py-3 mb-2 border-b border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Account
              </p>
            </div>

            <Link href="/dashboard/settings">
              <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 transition-colors">
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <User2Icon size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Profile Settings
                </span>
              </DropdownMenuItem>
            </Link>

            <Link href="/dashboard/settings#security">
              <DropdownMenuItem className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-slate-50 focus:bg-slate-50 transition-colors">
                <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
                  <KeyIcon size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  Security
                </span>
              </DropdownMenuItem>
            </Link>

            <div className="my-2 border-t border-slate-100"></div>

            <DropdownMenuItem
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer text-red-600 hover:bg-red-50 focus:bg-red-50 transition-colors"
              onClick={() => setLogoutDialogOpen(true)}
            >
              <div className="p-2 rounded-lg bg-red-100 text-red-600">
                <LogOut size={18} />
              </div>
              <span className="text-sm font-bold">Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 border-none shadow-2xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>
          <DialogHeader className="pt-4">
            <div className="mx-auto w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <LogOut size={32} className="text-red-600" />
            </div>
            <DialogTitle className="text-2xl font-black text-center text-slate-900">
              Confirm Sign Out
            </DialogTitle>
            <DialogDescription className="text-center text-slate-500 text-base font-medium">
              Are you sure you want to end your session? You will need to sign
              in again to access the dashboard.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-xl border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Wait, go back
            </Button>
            <Button
              variant="destructive"
              className="flex-1 h-12 rounded-xl bg-red-600 hover:bg-red-700 shadow-md shadow-red-200 font-bold transition-all hover:scale-105"
              onClick={handleLogout}
            >
              Yes, Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
