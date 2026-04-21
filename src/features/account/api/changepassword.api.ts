// features/account/api/changepassword.api.ts
import { api } from "@/lib/api";

export const changePassword = async (data: { oldPassword: string; newPassword: string; confirmPassword: string }, accessToken: string) => {
    const response = await api.patch("/auth/update-password", data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
};
