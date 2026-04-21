import { useQuery } from "@tanstack/react-query";
import { getAllQuizzesApi, getSingleQuizApi } from "../api/quizzes.api";

export const useQuizzes = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["quizzes", page, limit],
    queryFn: () => getAllQuizzesApi(page, limit),
    placeholderData: (previousData) => previousData,
  });
};

export const useSingleQuiz = (id: string) => {
  return useQuery({
    queryKey: ["quiz", id],
    queryFn: () => getSingleQuizApi(id),
    enabled: !!id,
  });
};
