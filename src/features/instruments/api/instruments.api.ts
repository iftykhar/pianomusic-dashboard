import { api } from "@/lib/api";
import {
  GetAllInstrumentsResponse,
  SingleInstrumentResponse,
  CreateUpdateInstrumentResponse,
  DeleteInstrumentResponse,
} from "../type";

export const getAllInstrumentsApi = async (page = 1, limit = 10) => {
  const res = await api.get<GetAllInstrumentsResponse>(
    `/instrument/get-all-instruments?page=${page}&limit=${limit}`,
  );
  return res.data;
};

export const getSingleInstrumentApi = async (id: string) => {
  const res = await api.get<SingleInstrumentResponse>(
    `/instrument/get-single-instrument/${id}`,
  );
  return res.data;
};

export const createInstrumentApi = async (data: FormData) => {
  const res = await api.post<CreateUpdateInstrumentResponse>(
    "/instrument/create-instrument",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const updateInstrumentApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const res = await api.patch<CreateUpdateInstrumentResponse>(
    `/instrument/update-instrument/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const deleteInstrumentApi = async (id: string) => {
  const res = await api.delete<DeleteInstrumentResponse>(
    `/instrument/delete-instrument/${id}`,
  );
  return res.data;
};
