import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createExerciseApi,
  updateExerciseApi,
  deleteExerciseApi,
  createExerciseContentApi,
  updateExerciseContentApi,
  deleteExerciseContentApi,
} from "../api/exercise.api";

interface ApiResponse {
  message: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useCreateExerciseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExerciseApi,
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message || "Exercise created successfully");
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to create exercise");
    },
  });
};

export const useUpdateExerciseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExerciseApi,
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message || "Exercise updated successfully");
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to update exercise");
    },
  });
};

export const useDeleteExerciseMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExerciseApi,
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message || "Exercise deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "Failed to delete exercise");
    },
  });
};

// Content Mutations

export const useCreateExerciseContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExerciseContentApi,
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message || "Exercise content created successfully");
      queryClient.invalidateQueries({ queryKey: ["exercise-contents"] });
      // Might also need to invalidate the specific exercise if it contains the content list
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.message || "Failed to create exercise content",
      );
    },
  });
};

export const useUpdateExerciseContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExerciseContentApi,
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message || "Exercise content updated successfully");
      queryClient.invalidateQueries({ queryKey: ["exercise-contents"] });
      queryClient.invalidateQueries({ queryKey: ["exercise-content"] });
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.message || "Failed to update exercise content",
      );
    },
  });
};

export const useDeleteExerciseContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExerciseContentApi,
    onSuccess: (data: ApiResponse) => {
      toast.success(data.message || "Exercise content deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["exercise-contents"] });
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.message || "Failed to delete exercise content",
      );
    },
  });
};
