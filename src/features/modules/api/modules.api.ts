import { api } from "@/lib/api";
import {
  GetModulesResponse,
  SingleModuleResponse,
  CreateUpdateModuleResponse,
  DeleteModuleResponse,
} from "../type";

export const getModulesByInstrumentApi = async (
  instrumentId: string,
  page = 1,
  limit = 10,
) => {
  const res = await api.get<GetModulesResponse>(
    `/module/get-modules/${instrumentId}?page=${page}&limit=${limit}`,
  );
  return res.data;
};

export const getSingleModuleApi = async (id: string) => {
  const res = await api.get<SingleModuleResponse>(
    `/module/get-single-module/${id}`,
  );
  return res.data;
};

export const createModuleApi = async (data: FormData) => {
  const res = await api.post<CreateUpdateModuleResponse>(
    "/module/create-module",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const updateModuleApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const res = await api.patch<CreateUpdateModuleResponse>(
    `/module/update/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const deleteModuleApi = async (id: string) => {
  const res = await api.delete<DeleteModuleResponse>(`/module/delete/${id}`);
  return res.data;
};
