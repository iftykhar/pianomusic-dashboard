import { api } from "@/lib/api";
import {
  GetExercisesResponse,
  SingleExerciseResponse,
  CreateExerciseResponse,
  UpdateExerciseResponse,
  DeleteExerciseResponse,
  GetExerciseContentsResponse,
  SingleExerciseContentResponse,
  CreateExerciseContentResponse,
  UpdateExerciseContentResponse,
  DeleteExerciseContentResponse,
} from "../types";

// Exercise APIs
export const getAllExercisesApi = async () => {
  const res = await api.get<GetExercisesResponse>(
    "/exercise/get-all-exercises",
  );
  return res.data;
};

export const getSingleExerciseApi = async (id: string) => {
  const res = await api.get<SingleExerciseResponse>(
    `/exercise/get-single-exercise/${id}`,
  );
  return res.data;
};

export const createExerciseApi = async (data: FormData) => {
  const res = await api.post<CreateExerciseResponse>(
    "/exercise/create-exercise",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const updateExerciseApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const res = await api.patch<UpdateExerciseResponse>(
    `/exercise/update-exercise/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const deleteExerciseApi = async (id: string) => {
  const res = await api.delete<DeleteExerciseResponse>(
    `/exercise/delete-exercise/${id}`,
  );
  return res.data;
};

// Exercise Content APIs
export const getAllExerciseContentsApi = async () => {
  const res = await api.get<GetExerciseContentsResponse>(
    "/exercise-content/get-all-exercise-content",
  );
  return res.data;
};

// Note: The Postman collection implies fetching content by ID, but we might want to filter by exerciseId.
// However, the current API seems to be generic "get all".
// We will use "get-all-exercise-content" and filter on client side if necessary,
// or check if there's a specific endpoint for content by exercise.
// Looking at the collection, there isn't a "get-content-by-exercise" endpoint visibly obvious in the list I saw earlier.
// I will assume for now we might need to filter or the backend handles it.
// Wait, for `ExerciseDetail`, we need content for *that* exercise.
// The `Exercise` object has `ExerciseContent` array of IDs.
// We might need to fetch all content and filter, or fetch individual items.
// Optimized approach: `get-all-exercise-content` might accept query params or we just filter.
// Let's stick to the visible API for now.

export const getSingleExerciseContentApi = async (id: string) => {
  const res = await api.get<SingleExerciseContentResponse>(
    `/exercise-content/get-single-exercise-content/${id}`,
  );
  return res.data;
};

export const createExerciseContentApi = async (data: FormData) => {
  const res = await api.post<CreateExerciseContentResponse>(
    "/exercise-content/create-exercise-content",
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const updateExerciseContentApi = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  const res = await api.patch<UpdateExerciseContentResponse>(
    `/exercise-content/update-exercise-content/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return res.data;
};

export const deleteExerciseContentApi = async (id: string) => {
  const res = await api.delete<DeleteExerciseContentResponse>(
    `/exercise-content/delete-exercise-content/${id}`,
  );
  return res.data;
};
