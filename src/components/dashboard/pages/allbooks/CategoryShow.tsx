"use client";

import React, { useEffect } from "react";
import { useContent } from "@/features/category-page/hooks/use-content";
import { useCategoryHeader, usePostCategoryHeader } from "@/features/category-page/hooks/use-categoryheader";
import { CategoryContent } from "@/features/category-page/types";
import { ShieldCheck, Database, Type, Activity, MonitorX } from "lucide-react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CategoryCard from './CategoryCard';
import AddCategory from "../addbooks/AddCategory";
import CategoryHeaderForm from "./CategoryHeaderForm";

export function CategoryShow() {
  const { data: contentData, isLoading, error } = useContent({ limit: 50 });
  const { data: headerData } = useCategoryHeader();
  const { mutate: postHeader, isPending } = usePostCategoryHeader();

  // Resolution Gate Logic
  useEffect(() => {
    const checkResolution = () => {
      if (window.innerWidth < 720) {
        toast.message("Low Resolution Detected", {
          description: "For the best administrative experience, please switch to a workstation.",
          icon: <MonitorX className="w-4 h-4 text-amber-500" />,
        });
      }
    };

    checkResolution();
    // Debounced resize listener could be better, but simple check on mount/resize works for now
    window.addEventListener('resize', checkResolution);
    return () => window.removeEventListener('resize', checkResolution);
  }, []);


  const categories = contentData?.data || [];

  if (error) {
    return (
      <section className="py-24 px-6 bg-slate-950 flex justify-center items-center min-h-[50vh]">
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl flex items-center gap-4 backdrop-blur-md">
          <ShieldCheck className="w-6 h-6 animate-pulse" />
          <span className="font-mono tracking-widest uppercase text-xs">System Failure: Could not load categories.</span>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 relative overflow-hidden py-10 selection:bg-[#ff7a00]/30 selection:text-[#ff7a00]">
      <div className="container mx-auto px-6 space-y-12 relative z-10">

        {/* Global Command Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 pointer-events-none" />

          <div className="space-y-3 relative z-10">
            <div className="flex items-center gap-3">
              <span className="flex h-2 w-2 rounded-full bg-[#ff7a00] shadow-[0_0_10px_#ff7a00] animate-pulse"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Cybernetic Control Hub</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">
              Category <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a00] to-orange-400">Command</span>
            </h1>
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1 group/stat hover:border-[#ff7a00]/30 transition-colors duration-300">
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Database size={12} className="text-[#ff7a00]" /> Indices
              </div>
              <div className="text-2xl font-mono text-slate-900 tracking-widest group-hover/stat:text-[#ff7a00] transition-colors">
                {isLoading ? "..." : categories.length.toString().padStart(2, '0')}
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-1 group/stat hover:border-green-500/30 transition-colors duration-300">
              <div className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity size={12} className="text-green-500" /> Status
              </div>
              <div className="text-2xl font-mono text-green-600 tracking-widest group-hover/stat:text-green-500 transition-colors animate-pulse">active</div>
            </div>
          </div>
        </div>

        {/* Category Header Settings & Add Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Settings Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="system-parameters" className="border-none">
              <div className="group/settings relative rounded-[2rem] bg-white border border-slate-200 transition-all duration-500 hover:border-[#ff7a00]/30 hover:shadow-lg overflow-hidden">

                <AccordionTrigger className="relative z-10 px-8 py-6 cursor-pointer hover:no-underline group/trigger">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-[#ff7a00]/10 text-[#ff7a00]">
                      <Type size={18} />
                    </div>
                    <div className="text-left">
                      <h2 className="text-lg font-bold text-slate-900 tracking-tight group-hover/trigger:text-[#ff7a00] transition-colors">
                        Header Parameters
                      </h2>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="relative z-10 px-8 pb-8">
                  <CategoryHeaderForm
                    key={headerData?.data?.data ? "loaded" : "loading"}
                    initialTitle={headerData?.data?.data?.title || ""}
                    initialSubtitle={headerData?.data?.data?.subtitle || ""}
                    isPending={isPending}
                    onSubmit={(data) => {
                      postHeader(data, {
                        onSuccess: () => toast.success("System parameters updated"),
                        onError: (error) => toast.error("Update failed: " + error.message)
                      });
                    }}
                  />
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>

          {/* Add Category Card */}
          <AddCategory />
        </div>


        {/* Content Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-square rounded-[1.75rem] bg-slate-100 border border-slate-200 animate-pulse"></div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-dashed border-slate-200">
            <Database className="mx-auto h-10 w-10 text-slate-400 mb-4 opacity-50" />
            <p className="text-lg font-bold text-slate-400 uppercase tracking-widest">Digital Void Empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category: CategoryContent) => (
              <CategoryCard key={category._id} category={category} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}