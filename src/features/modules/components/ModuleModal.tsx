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
import { Module } from "../type";
import { Instrument } from "@/features/instruments/type";
import { ImagePlus, Loader2, X } from "lucide-react";
import Image from "next/image";

const moduleSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  instrumentId: z.string().min(1, "Please select an instrument"),
  order: z.number().min(1, "Order must be at least 1"),
});

type FormValues = z.infer<typeof moduleSchema>;

interface ModuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  initialData?: Module | null;
  instruments: Instrument[];
}

const ModuleModal: React.FC<ModuleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
  instruments,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(moduleSchema),
    defaultValues: {
      title: "",
      description: "",
      instrumentId: "",
      order: 1,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          title: initialData.title,
          description: initialData.description,
          instrumentId:
            typeof initialData.instrumentId === "string"
              ? initialData.instrumentId
              : (initialData.instrumentId as Instrument)._id,
          order: initialData.order,
        });
        const previewUrl = initialData.images?.[0]?.url || null;
        if (imagePreview !== previewUrl) {
          setTimeout(() => setImagePreview(previewUrl), 0);
        }
        setTimeout(() => setImageFile(null), 0);
      } else {
        form.reset({
          title: "",
          description: "",
          instrumentId: form.getValues("instrumentId") || "",
          order: 1,
        });
        if (imagePreview !== null) {
          setTimeout(() => setImagePreview(null), 0);
        }
        setTimeout(() => setImageFile(null), 0);
      }
    }
  }, [initialData, form, isOpen, imagePreview]);

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
    // According to Postman, wrap non-file fields in 'data' as stringified JSON
    const jsonData = {
      instrumentId: values.instrumentId,
      title: values.title,
      description: values.description,
      order: values.order,
    };
    formData.append("data", JSON.stringify(jsonData));

    if (imageFile) {
      formData.append("images", imageFile); // Postman uses 'images' for the file field
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            {initialData ? "Update Module" : "Create New Module"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-6 pt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">
                    Module Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Mastering the C Major Scale"
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
                name="instrumentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">
                      Instrument
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="border-gray-200">
                          <SelectValue placeholder="Select instrument" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {instruments.map((inst) => (
                          <SelectItem key={inst._id} value={inst._id}>
                            {inst.instrumentTitle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold text-gray-700">
                      Order
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.valueAsNumber || 0)
                        }
                        className="border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the module content..."
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
                Module Image
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
                  "Update Module"
                ) : (
                  "Create Module"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModuleModal;
