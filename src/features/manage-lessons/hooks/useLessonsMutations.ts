import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createLessonApi,
  updateLessonApi,
  deleteLessonApi,
} from "../api/lessons.api";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useCreateLessonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createLessonApi,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson created successfully");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to create lesson");
    },
  });
};

export const useUpdateLessonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateLessonApi,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson updated successfully");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
      queryClient.invalidateQueries({ queryKey: ["lesson"] });
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to update lesson");
    },
  });
};

export const useDeleteLessonMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteLessonApi,
    onSuccess: (data) => {
      toast.success(data.message || "Lesson deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to delete lesson");
    },
  });
};
