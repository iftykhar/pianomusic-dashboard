import { api } from "@/lib/api";
import {
  GetAllQuizzesResponse,
  SingleQuizResponse,
  CreateUpdateQuizResponse,
  DeleteQuizResponse,
  Quiz,
} from "../type";

export const getAllQuizzesApi = async (page = 1, limit = 10) => {
  const res = await api.get<GetAllQuizzesResponse>(
    `/quiz/get-all-quizzes/?page=${page}&limit=${limit}`,
  );
  return res.data;
};

export const getSingleQuizApi = async (id: string) => {
  const res = await api.get<SingleQuizResponse>(`/quiz/single-quiz/${id}`);
  return res.data;
};

export const createQuizApi = async (data: Partial<Quiz>) => {
  const res = await api.post<CreateUpdateQuizResponse>(
    "/quiz/create_quiz",
    data,
  );
  return res.data;
};

export const updateQuizApi = async ({
  id,
  data,
}: {
  id: string;
  data: Partial<Quiz>;
}) => {
  const res = await api.put<CreateUpdateQuizResponse>(
    `/quiz/update-quiz/${id}`,
    data,
  );
  return res.data;
};

export const deleteQuizApi = async (id: string) => {
  const res = await api.delete<DeleteQuizResponse>(`/quiz/delete-quiz/${id}`);
  return res.data;
};
