import { useMutation } from "@tanstack/react-query";
import { subscribeToNewsletter } from "../api/newsletter.api";
import { toast } from "sonner";

export const useNewsletterMutation = () => {
  return useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: (data) => {
      toast.success(data?.message || "Successfully subscribed to newsletter!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    },
  });
};
