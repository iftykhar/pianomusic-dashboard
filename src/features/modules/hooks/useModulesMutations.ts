import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createModuleApi,
  updateModuleApi,
  deleteModuleApi,
} from "../api/modules.api";
import { toast } from "sonner";
import { AxiosError } from "axios";

export const useModulesMutations = (instrumentId?: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createModuleApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["modules", instrumentId] });
      toast.success(data.message || "Module created successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error?.response?.data?.message || "Operation failed";
      toast.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateModuleApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["modules", instrumentId] });
      toast.success(data.message || "Module updated successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to update module");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteModuleApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["modules", instrumentId] });
      toast.success(data.message || "Module deleted successfully");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error?.response?.data?.message || "Failed to delete module");
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
