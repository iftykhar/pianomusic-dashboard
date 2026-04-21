// features/auth/api/register.api.ts
import { api } from "@/lib/api";
import { RegisterFormData } from "../types";


export const registeruser = async (data: RegisterFormData) => {
    try {
        const response = await api.post("/auth/registration", data);
        return response.data;
    } catch (error) {
        throw error;
    }
};