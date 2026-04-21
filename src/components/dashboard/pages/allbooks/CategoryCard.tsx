"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Layers } from "lucide-react";
import { toast } from "sonner";
import { CategoryContent } from "@/features/category-page/types";
import { useDeleteCategory } from "@/features/dashboard/hooks/useCategory";

import EditCategory from "./EditCategory";

interface CategoryCardProps {
  category: CategoryContent;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    deleteCategory(category._id, {
      onSuccess: () => {
        toast.success("Category deleted successfully");
        setIsDeleteDialogOpen(false);
      },
      onError: () => toast.error("Failed to delete category"),
    });
  };

  return (
    <Card className="group relative h-full w-full bg-white border border-slate-200 rounded-[1.75rem] overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-[#ff7a00]/30 shadow-sm">
      <Link
        href={`/category/${category.type}`}
        className="absolute inset-0 z-10"
      />

      {/* 1. Square Aspect Ratio (1:1) */}
      <div className="relative w-full aspect-square overflow-hidden rounded-[1.25rem] m-2 mb-0 border border-slate-100 bg-slate-50">
        <Image
          src={category.image || "/no-image.jpg"}
          alt={category.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Cybernetic Overlay Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 hover:bg-[#ff7a00] hover:text-white transition-all hover:scale-110 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Edit className="w-3.5 h-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-slate-900 max-w-lg p-6">
              <DialogHeader>
                <DialogTitle>Edit Protocol</DialogTitle>
              </DialogHeader>
              <EditCategory
                category={category}
                onSuccess={() => setIsEditDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-xl bg-red-50 text-red-500 border border-red-100 hover:bg-red-600 hover:text-white transition-all hover:scale-110 shadow-lg"
                onClick={(e) => e.stopPropagation()}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-slate-900 max-w-sm p-6">
              <DialogHeader>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogDescription className="text-slate-500 text-xs">
                  Are you sure? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" size="sm" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Badge Overlay */}
        <div className="absolute top-3 left-3 z-10">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md border border-slate-200 group-hover:border-[#ff7a00]/30 transition-colors shadow-sm">
            <Layers size={10} className="text-[#ff7a00]" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-slate-700">
              {category.type}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between relative z-10">
        <div className="space-y-1">
          <CardTitle className="text-sm font-bold text-slate-900 tracking-wide line-clamp-1 group-hover:text-[#ff7a00] transition-colors duration-300">
            {category.title}
          </CardTitle>
          {category.subtitle && (
            <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed font-medium">
              {category.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute -inset-px rounded-[1.75rem] border-2 border-transparent group-hover:border-[#ff7a00]/10 pointer-events-none transition-all duration-500" />
    </Card>
  );
};

export default CategoryCard;
