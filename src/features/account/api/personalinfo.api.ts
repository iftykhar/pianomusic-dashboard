// features/account/api/personalinfo.api.ts
import { api } from "@/lib/api";

export const updatePersonalInfo = async (formData: FormData, accessToken: string) => {
    try {
        const response = await api.patch("/auth/update-user", formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getUserProfile = async (accessToken: string) => {
    try {
        const response = await api.get(`/auth/get-my-profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
