// features/auth/api/resetpassword.api.ts
import { api } from "@/lib/api";

export const resetPassword = async (data: { newPassword: string; confirmPassword: string; resetToken: string }) => {
    const formData = new FormData();
    formData.append("newPassword", data.newPassword);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("resetToken", data.resetToken);

    try {
        const res = await api.post('/auth/reset-password', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
