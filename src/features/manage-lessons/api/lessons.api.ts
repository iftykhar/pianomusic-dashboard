import { api } from "@/lib/api";
import {
  GetLessonsResponse,
  SingleLessonResponse,
  CreateUpdateLessonResponse,
  DeleteLessonResponse,
} from "../type";

export const getLessonsByModuleApi = async (moduleId: string) => {
  const res = await api.get<GetLessonsResponse>(
    `/lesson/get-lessons-by-module/${moduleId}`,
  );
  return res.data;
};

export const getSingleLessonApi = async (id: string) => {
  const res = await api.get<SingleLessonResponse>(
    `/lesson/get-single-lesson/${id}`,
  );
  return res.data;
};

export const createLessonApi = async (data: FormData) => {
  const res = await api.post<CreateUpdateLessonResponse>(
    "/lesson/create-lesson",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const updateLessonApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const res = await api.patch<CreateUpdateLessonResponse>(
    `/lesson/update/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const deleteLessonApi = async (id: string) => {
  const res = await api.delete<DeleteLessonResponse>(`/lesson/delete/${id}`);
  return res.data;
};
