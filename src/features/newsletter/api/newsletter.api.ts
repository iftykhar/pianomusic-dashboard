import { api } from "@/lib/api";

export async function subscribeToNewsletter(email: string) {
  try {
    const res = await api.post("/guest/subscribe", { email });
    return res.data;
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } }; message?: string };
    console.error("Error subscribing to newsletter:", err);
    const message =
      err instanceof Error ? err.message : "Failed to subscribe to newsletter";
    throw new Error(message);
  }
}
