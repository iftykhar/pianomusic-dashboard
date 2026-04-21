import { useQuery } from "@tanstack/react-query";
import {
  getAllExercisesApi,
  getSingleExerciseApi,
  getAllExerciseContentsApi,
  getSingleExerciseContentApi,
} from "../api/exercise.api";

export const useExercises = () => {
  return useQuery({
    queryKey: ["exercises"],
    queryFn: getAllExercisesApi,
  });
};

export const useSingleExercise = (id: string) => {
  return useQuery({
    queryKey: ["exercise", id],
    queryFn: () => getSingleExerciseApi(id),
    enabled: !!id,
  });
};

export const useExerciseContents = () => {
  return useQuery({
    queryKey: ["exercise-contents"],
    queryFn: getAllExerciseContentsApi,
  });
};

export const useSingleExerciseContent = (id: string) => {
  return useQuery({
    queryKey: ["exercise-content", id],
    queryFn: () => getSingleExerciseContentApi(id),
    enabled: !!id,
  });
};
