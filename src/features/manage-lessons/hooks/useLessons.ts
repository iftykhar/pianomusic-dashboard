import { useQuery } from "@tanstack/react-query";
import { getLessonsByModuleApi, getSingleLessonApi } from "../api/lessons.api";

export const useLessons = (moduleId: string) => {
  return useQuery({
    queryKey: ["lessons", moduleId],
    queryFn: () => getLessonsByModuleApi(moduleId),
    enabled: !!moduleId,
  });
};

export const useSingleLesson = (id: string) => {
  return useQuery({
    queryKey: ["lesson", id],
    queryFn: () => getSingleLessonApi(id),
    enabled: !!id,
  });
};
