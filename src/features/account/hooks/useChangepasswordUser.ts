// // features/account/hooks/useChangepasswordUser.ts
// import { useMutation } from "@tanstack/react-query";

// export const useChangepasswordUser = () => {
//     return useMutation({
//         mutationFn: (password: string) => changepasswordApi.mutateAsync({ password }),
//     });
// };

// features/auth/hooks/usechangepassword.ts
import { useState } from "react";
import { useSession } from "next-auth/react";
import { changePassword } from "../api/changepassword.api";

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { data: session } = useSession();

    const handleChangePassword = async (data: { oldPassword: string; newPassword: string; confirmPassword: string }) => {
        setLoading(true);
        setError(null);

        if (!session?.accessToken) {
            setError("You must be logged in to change your password.");
            setLoading(false);
            return;
        }

        try {
            const res = await changePassword(data, session.accessToken);
            return res;
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } }; message?: string };
            setError(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, handleChangePassword };
};