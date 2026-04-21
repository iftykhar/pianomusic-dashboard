"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Instrument } from "../type";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";

const instrumentSchema = z.object({
  instrumentTitle: z.string().min(2, "Title must be at least 2 characters"),
  instrumentDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  isActive: z.boolean().optional(),
});

type FormValues = z.infer<typeof instrumentSchema>;

interface InstrumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  initialData?: Instrument | null;
}

const InstrumentModal: React.FC<InstrumentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(instrumentSchema),
    defaultValues: {
      instrumentTitle: "",
      instrumentDescription: "",
      level: "beginner",
      isActive: true,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          instrumentTitle: initialData.instrumentTitle,
          instrumentDescription: initialData.instrumentDescription,
          level: initialData.level,
          isActive: initialData.isActive,
        });

        const timer = setTimeout(() => {
          setImagePreview(initialData.instrumentImage?.url || null);
        }, 0);
        return () => clearTimeout(timer);
      } else {
        form.reset({
          instrumentTitle: "",
          instrumentDescription: "",
          level: "beginner",
          isActive: true,
        });
        const timer = setTimeout(() => {
          setImagePreview(null);
          setImageFile(null);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [initialData, form, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (values: FormValues) => {
    const formData = new FormData();
    formData.append("instrumentTitle", values.instrumentTitle);
    formData.append("instrumentDescription", values.instrumentDescription);
    formData.append("level", values.level);
    formData.append("isActive", (values.isActive ?? true).toString());
    if (imageFile) {
      formData.append("image", imageFile);
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            {initialData ? "Update Instrument" : "Create New Instrument"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-6 pt-4"
          >
            <FormField
              control={form.control}
              name="instrumentTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">
                    Instrument Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Piano, Guitar..."
                      {...field}
                      className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">
                      Level
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-200">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={(val) => field.onChange(val === "true")}
                      defaultValue={(field.value ?? true).toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="border-gray-200">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="instrumentDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the instrument..."
                      className="min-h-[100px] border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <FormLabel className="font-bold text-gray-700">
                Instrument Image
              </FormLabel>
              <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                {imagePreview ? (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden group">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                      >
                        <X className="w-4 h-4 mr-2" /> Remove Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer w-full py-8">
                    <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-3">
                      <ImagePlus className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Click to upload image
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      Recommended: 1200x800px
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 shadow-lg shadow-orange-600/20"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : initialData ? (
                  "Update Instrument"
                ) : (
                  "Create Instrument"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InstrumentModal;
