export interface ExerciseImage {
  url: string;
  public_id: string;
}

export interface Exercise {
  _id: string;
  title: string;
  description: string;
  images: ExerciseImage | null;
  ExerciseContent: string[]; // Array of IDs
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ExerciseContentMedia {
  url: string;
  public_id: string;
}

export interface ExerciseContent {
  _id: string;
  title: string;
  description: string;
  exerciseId: string;
  image: ExerciseContentMedia | null;
  audio: ExerciseContentMedia | null;
  keyNotes: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface ExerciseFormData {
  title: string;
  description: string;
  image?: File;
}

export interface ExerciseContentFormData {
  title: string;
  description: string;
  keyNotes: string[];
  image?: File;
  audio?: File;
  exerciseId: string;
}

// API Responses
export interface GetExercisesResponse {
  success: boolean;
  message: string;
  data: Exercise[];
}

export interface SingleExerciseResponse {
  success: boolean;
  message: string;
  data: Exercise;
}

export interface CreateExerciseResponse {
  success: boolean;
  message: string;
  data: Exercise;
}

export interface UpdateExerciseResponse {
  success: boolean;
  message: string;
  data: Exercise;
}

export interface DeleteExerciseResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    id: string;
  };
}

// Content API Responses
export interface GetExerciseContentsResponse {
  success: boolean;
  message: string;
  data: ExerciseContent[];
}

export interface SingleExerciseContentResponse {
  success: boolean;
  message: string;
  data: ExerciseContent;
}

export interface CreateExerciseContentResponse {
  success: boolean;
  message: string;
  data: ExerciseContent;
}

export interface UpdateExerciseContentResponse {
  success: boolean;
  message: string;
  data: ExerciseContent;
}

export interface DeleteExerciseContentResponse {
  success: boolean;
  message: string;
  data: unknown;
}
