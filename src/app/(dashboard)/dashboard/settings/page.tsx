"use client";

import React, { useState, useEffect } from "react";
import PersonalInformation from "@/components/account/pages/PersonalInformation";
import ChangePassword from "@/components/account/pages/ChangePassword";
import { User, Lock, Settings as SettingsIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = globalThis.location.hash;
      if (hash === "#security") {
        setActiveTab("security");
      } else if (hash === "#profile") {
        setActiveTab("profile");
      }
    };

    // Set initial tab based on hash
    handleHashChange();

    // Listen for hash changes
    globalThis.addEventListener("hashchange", handleHashChange);
    return () => globalThis.removeEventListener("hashchange", handleHashChange);
  }, []);

  const tabs = [
    {
      id: "profile",
      label: "Personal Info",
      icon: User,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    {
      id: "security",
      label: "Security",
      icon: Lock,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
          <div className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl">
            <SettingsIcon size={24} />
          </div>
          Dashboard Settings
        </h1>
        <p className="text-slate-500 font-medium text-lg">
          Configure your account preferences and security protocols.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap gap-4 mb-10 bg-gray-100/50 p-2 rounded-4xl w-fit border border-gray-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "profile" | "security")}
              className={cn(
                "flex items-center gap-3 px-8 py-4 rounded-3xl text-sm font-bold transition-all duration-500 relative overflow-hidden group",
                isActive
                  ? "bg-white text-slate-900 shadow-xl shadow-slate-200/50 scale-105"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/50",
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-xl transition-colors duration-500",
                  isActive ? tab.bg : "bg-gray-100 group-hover:bg-gray-200",
                )}
              >
                <Icon
                  size={18}
                  className={isActive ? tab.color : "text-gray-400"}
                />
              </div>
              {tab.label}

              {isActive && (
                <div
                  className={cn(
                    "absolute bottom-0 left-0 w-full h-1",
                    tab.id === "profile" ? "bg-blue-500" : "bg-orange-500",
                  )}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="relative">
        <div
          className={cn(
            "transition-all duration-700 transform",
            activeTab === "profile"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none absolute inset-0",
          )}
        >
          {activeTab === "profile" && <PersonalInformation />}
        </div>

        <div
          className={cn(
            "transition-all duration-700 transform",
            activeTab === "security"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none absolute inset-0",
          )}
        >
          {activeTab === "security" && <ChangePassword />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
