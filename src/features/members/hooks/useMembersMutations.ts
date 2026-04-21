import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { registerUserApi, bulkRegisterUsersApi } from "../api/members.api";

interface ApiErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const useRegisterUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUserApi,
    onSuccess: (data) => {
      toast.success(data.message || "User registered successfully");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error: ApiErrorResponse) => {
      toast.error(error.response?.data?.message || "Failed to register user");
    },
  });
};

export const useBulkRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkRegisterUsersApi,
    onSuccess: (data) => {
      toast.success(data.message || "Bulk registration completed");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error: ApiErrorResponse) => {
      toast.error(error.response?.data?.message || "Bulk registration failed");
    },
  });
};
