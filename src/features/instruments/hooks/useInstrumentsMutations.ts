import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createInstrumentApi,
  updateInstrumentApi,
  deleteInstrumentApi,
} from "../api/instruments.api";
import { toast } from "sonner";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useInstrumentsMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createInstrumentApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["instruments"] });
      toast.success(data.message || "Instrument created successfully");
    },
    onError: (error: ApiError) => {
      const message = error?.response?.data?.message || "Operation failed";
      toast.error(message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateInstrumentApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["instruments"] });
      toast.success(data.message || "Instrument updated successfully");
    },
    onError: (error: ApiError) => {
      toast.error(
        error?.response?.data?.message || "Failed to update instrument",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteInstrumentApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["instruments"] });
      toast.success(data.message || "Instrument deleted successfully");
    },
    onError: (error: ApiError) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete instrument",
      );
    },
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  };
};
