import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createQuizApi,
  updateQuizApi,
  deleteQuizApi,
} from "../api/quizzes.api";
import { toast } from "sonner";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useQuizMutations = () => {
  const queryClient = useQueryClient();

  const createQuizMutation = useMutation({
    mutationFn: createQuizApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      toast.success(data.message || "Quiz created successfully");
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || "Failed to create quiz");
    },
  });

  const updateQuizMutation = useMutation({
    mutationFn: updateQuizApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
      toast.success(data.message || "Quiz updated successfully");
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || "Failed to update quiz");
    },
  });

  const deleteQuizMutation = useMutation({
    mutationFn: deleteQuizApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
      toast.success(data.message || "Quiz deleted successfully");
    },
    onError: (error: ApiError) => {
      toast.error(error?.response?.data?.message || "Failed to delete quiz");
    },
  });

  return {
    createQuizMutation,
    updateQuizMutation,
    deleteQuizMutation,
  };
};
