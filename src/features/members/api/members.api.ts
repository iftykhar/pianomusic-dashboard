import { api } from "@/lib/api";
import {
  Member,
  GetAllUsersResponse,
  BulkRegistrationResponse,
  RegistrationResponse,
} from "../type";

export const getAllUsersApi = async () => {
  const res = await api.get<GetAllUsersResponse>("/auth/get-all-users");
  return res.data;
};

export const registerUserApi = async (
  data: Partial<Member> & { password?: string },
) => {
  const res = await api.post<RegistrationResponse>("/auth/registration", data);
  return res.data;
};

export const bulkRegisterUsersApi = async (emails: string[]) => {
  const res = await api.post<BulkRegistrationResponse>(
    "/auth/registration-bulk-users",
    { usersEmail: emails },
  );
  return res.data;
};
