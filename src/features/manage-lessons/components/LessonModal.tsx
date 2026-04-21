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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Lesson } from "../type";
import { Loader2, X, ImagePlus, Music, FileAudio } from "lucide-react";
import Image from "next/image";
import { convertToMp3 } from "@/lib/audioConverter";

// Represents an image preview: either an existing server URL or a newly selected file
interface ImageItem {
  id: string; // unique key for React rendering
  url: string; // preview URL (server URL or data URL)
  file?: File; // only present for newly added images
  isExisting: boolean; // true if this came from the server
}

const lessonSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  content: z.string().min(5, "Content must be at least 5 characters"),
  moduleId: z.string().min(1, "Module ID is required"),
  order: z.number().min(1, "Order must be at least 1"),
  isExercise: z.boolean().optional(),
});

type FormValues = z.infer<typeof lessonSchema>;

interface LessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  initialData?: Lesson | null;
  moduleId: string;
}

const LessonModal: React.FC<LessonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
  moduleId,
}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      content: "",
      moduleId: moduleId,
      order: 1,
      isExercise: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          title: initialData.title,
          content: initialData.content,
          moduleId: initialData.moduleId || moduleId,
          order: initialData.order,
          isExercise: initialData.isExercise,
        });

        // Initialize all existing images from initialData
        const existingImages: ImageItem[] =
          initialData.media?.images?.map((img, i) => ({
            id: `existing-${img._id || i}`,
            url: img.url,
            isExisting: true,
          })) || [];
        setImages(existingImages);

        const audUrl = initialData.media?.audio?.url || null;
        setAudioPreview(audUrl);
        setAudioFile(null);
      } else {
        form.reset({
          title: "",
          content: "",
          moduleId: moduleId,
          order: 1,
          isExercise: false,
        });
        setImages([]);
        setAudioPreview(null);
        setAudioFile(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData, isOpen, moduleId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [
          ...prev,
          {
            id: `new-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            url: reader.result as string,
            file,
            isExisting: false,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });

    // Reset the input so the same file(s) can be re-selected
    e.target.value = "";
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioPreview(URL.createObjectURL(file));
    }
  };

  const onFormSubmit = async (values: FormValues) => {
    const formData = new FormData();
    const jsonData: Record<string, unknown> = {
      moduleId: values.moduleId,
      title: values.title,
      content: values.content,
      isExercise: values.isExercise,
      order: values.order,
    };

    const newImages = images.filter((img) => !img.isExisting);
    const existingImages = images.filter((img) => img.isExisting);

    // Handle removal of all images
    if (images.length === 0) {
      jsonData.removeImage = true;
    }

    // Pass the existing image URLs that should be kept
    if (existingImages.length > 0) {
      jsonData.existingImages = existingImages.map((img) => img.url);
    }

    if (!audioPreview && !audioFile) {
      jsonData.removeAudio = true;
    }

    formData.append("data", JSON.stringify(jsonData));

    // Append all new image files
    newImages.forEach((img) => {
      if (img.file) {
        formData.append("images", img.file);
      }
    });

    if (audioFile) {
      setIsConverting(true);
      try {
        const convertedAudio = await convertToMp3(audioFile);
        formData.append("audio", convertedAudio);
      } finally {
        setIsConverting(false);
      }
    }

    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-linear-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            {initialData ? "Update Lesson" : "Create New Lesson"}
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
                    Lesson Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Introduction to Scales"
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
              <FormField
                control={form.control}
                name="isExercise"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Is Exercise?</FormLabel>
                      <FormDescription>
                        Check this if this lesson is an exercise.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-700">
                    Content
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Lesson content or description..."
                      className="min-h-[100px] border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload - Multiple */}
            <div className="space-y-4">
              <FormLabel className="font-bold text-gray-700">
                Lesson Images
              </FormLabel>
              <div className="flex flex-col gap-4 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                {/* Image Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className="relative aspect-video rounded-xl overflow-hidden group border border-gray-200"
                      >
                        <Image
                          src={img.url}
                          alt="Preview"
                          fill
                          className="object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="absolute top-1.5 right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        {img.isExisting && (
                          <span className="absolute bottom-1.5 left-1.5 text-[9px] bg-black/60 text-white px-1.5 py-0.5 rounded-full font-medium">
                            Saved
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button - Always Visible */}
                <label className="flex flex-col items-center justify-center cursor-pointer w-full py-4 border border-dashed border-gray-300 rounded-xl hover:border-orange-400 transition-colors">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-2">
                    <ImagePlus className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {images.length > 0
                      ? "Add more images"
                      : "Click to upload images"}
                  </span>
                  <span className="text-xs text-gray-400 mt-0.5">
                    You can select multiple files
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* Audio Upload */}
            <div className="space-y-4">
              <FormLabel className="font-bold text-gray-700">
                Lesson Audio
              </FormLabel>
              <div className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                {audioPreview ? (
                  <div className="w-full flex items-center justify-between bg-white p-3 rounded-xl border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Music className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
                        {audioFile?.name || "Uploaded Audio"}
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        setAudioFile(null);
                        setAudioPreview(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer w-full py-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-3">
                      <FileAudio className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      Click to upload audio
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="audio/*"
                      onChange={handleAudioChange}
                    />
                  </label>
                )}
                {audioPreview && !audioFile && (
                  <audio controls src={audioPreview} className="w-full mt-2" />
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
                {isLoading || isConverting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isConverting ? "Converting Audio..." : "Saving..."}
                  </>
                ) : initialData ? (
                  "Update Lesson"
                ) : (
                  "Create Lesson"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LessonModal;
