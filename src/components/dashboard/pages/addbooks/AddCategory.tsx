"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner"; // or your preferred toast library
import { ImagePlus, Type, AlignLeft, Layers, Zap } from "lucide-react";
import Image from "next/image";
import { useCreateCategory } from '@/features/dashboard/hooks/useCategory';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  subtitle: z.string().min(2, "Subtitle is required"),
  type: z.string().min(2, "Type is required (e.g., adult, pet)"),
  image: z.any().refine((file) => file?.length > 0, "Image is required"),
});

const AddCategory = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate: createCategory, isPending } = useCreateCategory();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", subtitle: "", type: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("subtitle", values.subtitle);
    formData.append("type", values.type);
    formData.append("image", values.image[0]);

    createCategory(formData, {
      onSuccess: () => {
        toast.success("Category created successfully");
        form.reset();
        setPreview(null);
      },
      //eslint-disable-next-line
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    });
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      form.setValue("image", e.target.files);
    }
  };

  return (
    // <div className="group/settings relative p-10 rounded-[3rem] overflow-hidden border border-white/10 transition-all duration-700 hover:shadow-[#ff7a00]/5 mb-12">
    <div className=" cursor-pointer">
      {/* Decorative Floating Orbs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff7a00] rounded-full blur-[100px] opacity-20 animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="category-creator" className="border-none">
          <div className="group/settings relative rounded-[3rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 transition-all duration-700 hover:shadow-[#ff7a00]/5 mb-12">
            {/* Animated Background Layers */}
            <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff7a00]/5 via-transparent to-blue-500/5" />

            {/* Decorative Floating Orbs */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#ff7a00] rounded-full blur-[100px] opacity-20 animate-pulse" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Tech Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <AccordionTrigger className="relative z-10 px-10 py-8 cursor-pointer hover:no-underline group/trigger">
              <div className="flex flex-col items-start space-y-2 text-left w-full">
                <div className="flex items-center gap-4">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#ff7a00]" />
                  <span className="text-2xl md:text-3xl font-black text-[#ff7a00] uppercase tracking-[0.2em] group-hover/trigger:tracking-[0.3em] transition-all duration-500">
                    Category Creator
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <h2 className="text-lg md:text-xl font-bold text-white/40 tracking-tight">
                    New <span className="text-white italic">Classification</span>
                  </h2>
                </div>
              </div>
            </AccordionTrigger>

            <AccordionContent className="relative z-10 px-10 pb-10">
              <div className="space-y-10">
                <p className="text-white text-sm font-medium max-w-lg border-l-2 border-[#ff7a00]/30 pl-4 py-1">
                  Initialize a new data node in the classification grid. Define metadata and visual markers for global distribution.
                </p>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Title Input */}
                        <div className="group/field relative space-y-3">
                          <div className="flex items-center justify-between px-1">
                            <label className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-[#ff7a00] transition-colors">
                              <Type size={12} /> Title
                            </label>
                          </div>
                          <div className="relative">
                            <FormField
                              control={form.control}
                              name="title"
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormControl>
                                    <Input
                                      placeholder="e.g. Premium Selection"
                                      {...field}
                                      className="bg-black/20 backdrop-blur-md border border-white/10 rounded-[1.25rem] px-6 py-7 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-[#ff7a00]/30 focus-visible:border-[#ff7a00]/50 transition-all duration-500 shadow-2xl"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-[10px] pt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Type Select */}
                        <div className="group/field relative space-y-3">
                          <div className="flex items-center justify-between px-1">
                            <label className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-[#ff7a00] transition-colors">
                              <Layers size={12} /> Type
                            </label>
                          </div>
                          <div className="relative">
                            <FormField
                              control={form.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="bg-black/20 backdrop-blur-md border border-white/10 rounded-[1.25rem] px-6 py-7 text-white placeholder:text-white/50 focus:ring-2 focus:ring-[#ff7a00]/30 focus:border-[#ff7a00]/50 transition-all duration-500 shadow-2xl">
                                        <SelectValue placeholder="Select classification" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                                      <SelectItem value="kids" className="focus:bg-[#ff7a00]/20 focus:text-white">Kids</SelectItem>
                                      <SelectItem value="pets" className="focus:bg-[#ff7a00]/20 focus:text-white">Pets</SelectItem>
                                      <SelectItem value="memory" className="focus:bg-[#ff7a00]/20 focus:text-white">Memory</SelectItem>
                                      <SelectItem value="adults" className="focus:bg-[#ff7a00]/20 focus:text-white">Adults</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage className="text-[10px] pt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>

                        {/* Subtitle Input */}
                        <div className="group/field relative space-y-3 md:col-span-2">
                          <div className="flex items-center justify-between px-1">
                            <label className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 group-focus-within/field:text-[#ff7a00] transition-colors">
                              <AlignLeft size={12} /> Subtitle
                            </label>
                          </div>
                          <div className="relative">
                            <FormField
                              control={form.control}
                              name="subtitle"
                              render={({ field }) => (
                                <FormItem className="space-y-0">
                                  <FormControl>
                                    <Input
                                      placeholder="Describe this category node..."
                                      {...field}
                                      className="bg-black/20 backdrop-blur-md border border-white/10 rounded-[1.25rem] px-6 py-7 text-white placeholder:text-white/50 focus-visible:ring-2 focus-visible:ring-[#ff7a00]/30 focus-visible:border-[#ff7a00]/50 transition-all duration-500 shadow-2xl"
                                    />
                                  </FormControl>
                                  <FormMessage className="text-[10px] pt-1" />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Image Upload Area */}
                      <div className="lg:col-span-4 space-y-3">
                        <label className="text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-2 px-1">
                          <ImagePlus size={12} /> Visual Marker
                        </label>
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-[2rem] p-4 hover:bg-white/5 transition-all duration-500 relative h-[240px] shadow-2xl bg-black/10 overflow-hidden">
                          {preview ? (
                            <div className="relative w-full h-full group/preview">
                              <Image src={preview} alt="Preview" fill className="object-contain rounded-xl" />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="rounded-xl font-bold uppercase tracking-wider text-[10px]"
                                  onClick={() => { setPreview(null); form.setValue("image", undefined); }}
                                >
                                  Reset Marker
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center cursor-pointer group/upload w-full h-full justify-center">
                              <div className="p-5 rounded-full bg-white/5 group-hover/upload:bg-[#ff7a00]/10 transition-colors duration-500 mb-4">
                                <ImagePlus className="w-8 h-8 text-white/40 group-hover/upload:text-[#ff7a00] transition-colors" />
                              </div>
                              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover/upload:text-white transition-colors">Capture Visual Data</span>
                              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </label>
                          )}
                        </div>
                        {form.formState.errors.image && (
                          <p className="text-red-500 text-[10px] uppercase font-bold tracking-tight px-1">{form.formState.errors.image.message as string}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/5">
                      <button
                        type="submit"
                        disabled={isPending}
                        className="relative group/btn cursor-pointer w-full md:w-auto px-16 py-5 rounded-2xl overflow-hidden transition-all duration-500 active:scale-95"
                      >
                        <div className="absolute inset-0 bg-[#ff7a00] group-hover/btn:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

                        <div className="relative flex items-center justify-center gap-3 text-white font-black uppercase tracking-[0.2em] text-xs">
                          {isPending ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Zap size={16} fill="currentColor" />
                              Commit Classification
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
    // </div>

  );
};

export default AddCategory;
