"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingBag, Lock, LogOut, UserCircle } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Specific items for User Profile settings
const profileNavigation = [
  { name: "My Orders", href: "/profile/orders", icon: ShoppingBag },
  { name: "Change Password", href: "/profile/change-password", icon: Lock },
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-100 bg-white p-4">
      {/* Profile Header */}
      <div className="mb-8 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <UserCircle className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-gray-900">Account</h2>
          <p className="text-xs text-gray-500">Manage your profile</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {profileNavigation.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-100 text-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-gray-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout at bottom */}
      <div className="mt-auto pt-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-3 text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sign Out</DialogTitle>
              <DialogDescription>
                Are you sure you want to sign out of your account?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleLogout}>Confirm Logout</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}