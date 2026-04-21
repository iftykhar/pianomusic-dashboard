"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  NotebookText,
  LogOut,
  BarChart3,
  FolderKanban,
  FileText,
  Dumbbell,
  ClipboardCheck,
  UserPlus,
  Settings,
} from "lucide-react";
import { useState } from "react";

import { signOut } from "next-auth/react";
import Image from "next/image";
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

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Students Progress",
    href: "/dashboard/students-progress",
    icon: BarChart3,
  },
  { name: "Instruments", href: "/dashboard/instruments", icon: NotebookText },
  // { name: "Manage Course", href: "/dashboard/manage-course", icon: BookOpen },
  {
    name: "Manage Module",
    href: "/dashboard/manage-module",
    icon: FolderKanban,
  },
  { name: "Manage Lessons", href: "/dashboard/manage-lessons", icon: FileText },
  {
    name: "Manage Exercise",
    href: "/dashboard/manage-exercise",
    icon: Dumbbell,
  },
  { name: "Quizzes", href: "/dashboard/quiz-management", icon: ClipboardCheck },
  { name: "Members", href: "/dashboard/members", icon: UserPlus },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // NextAuth signOut with redirect to login page
    signOut({ callbackUrl: "/login" });
    setOpen(false);
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-[#0F1829] border-r border-gray-200 fixed">
      {/* Logo */}
      <div className="flex  items-center py-5 justify-center px-6">
        <Link href="/dashboard" className="flex items-center ">
          <Image
            src="/images/logo.png"
            alt="Company Logo"
            width={150}
            height={150}
            className="cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto  px-3 py-4 space-y-6">
        {navigation.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg p-3 text-base font-semibold transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-white hover:bg-white/10 hover:text-white",
              )}
            >
              {/* Use 'currentColor' or no specific text color class to inherit from parent Link */}
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-3">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 px-4 cursor-pointer rounded-lg font-medium text-[#e5102e] hover:bg-[#feecee] hover:text-[#e5102e] transition-all duration-200"
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex justify-end gap-2">
              <Button
                className="cursor-pointer"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="cursor-pointer"
                variant="destructive"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
