import { useMutation } from "@tanstack/react-query";
import { submitContactForm, ContactFormData } from "../api/contact.api";
import { toast } from "sonner";

export const useContactMutation = () => {
  return useMutation({
    mutationFn: (data: ContactFormData) => submitContactForm(data),
    onSuccess: () => {
      toast.success("Your message has been sent successfully!");
    },
    onError: (error) => {
      toast.error("Failed to send message.");
      console.error(error);
    },
  });
};
