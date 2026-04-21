import { api } from "@/lib/api";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export async function submitContactForm(data: ContactFormData) {
  try {
    const res = await api.post("/contact/submit", data);
    return res.data;
  } catch (err) {
    console.error("Error submitting contact form:", err);
    throw err;
  }
}
