export interface LessonMedia {
  audio: {
    url: string;
    public_id: string;
  } | null;
  images: {
    url: string;
    public_id: string;
    _id: string;
  }[];
}

export interface Lesson {
  _id: string;
  moduleId: string;
  title: string;
  content: string;
  isExercise: boolean;
  order: number;
  media: LessonMedia;
  quizId: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isCompleted?: boolean;
  isUnlocked?: boolean;
}

export interface LessonFormData {
  moduleId: string;
  title: string;
  content: string;
  isExercise: boolean;
  order: number;
  images?: File;
  audio?: File;
}

export interface GetLessonsResponse {
  success: boolean;
  message: string;
  data: Lesson[];
}

export interface SingleLessonResponse {
  success: boolean;
  message: string;
  data: Lesson;
}

export interface CreateUpdateLessonResponse {
  success: boolean;
  message: string;
  data: Lesson;
}

export interface DeleteLessonResponse {
  success: boolean;
  message: string;
  data: null;
}
