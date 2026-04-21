export interface Option {
  _id?: string;
  optionText: string;
  isCorrect: boolean;
}

export interface Question {
  _id?: string;
  questionText: string;
  options: Option[];
}

export interface Quiz {
  _id: string;
  quizName: string;
  instrumentId: string | { _id: string; name: string };
  moduleId: string | { _id: string; title: string };
  numberOfQuestionsToShow: number;
  timeLimit: number;
  passingPercentage: number;
  questions: Question[];
  totalMarks?: number;
  participatedStudents?: number;
  completionRate?: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizFilters {
  page?: number;
  limit?: number;
  searchTerm?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GetAllQuizzesResponse {
  success: boolean;
  message: string;
  meta: null;
  data: {
    meta: PaginationMeta;
    data: Quiz[];
  };
}

export interface SingleQuizResponse {
  success: boolean;
  message: string;
  meta: null;
  data: Quiz;
}

export interface CreateUpdateQuizResponse {
  success: boolean;
  message: string;
  meta: null;
  data: Quiz;
}

export interface DeleteQuizResponse {
  success: boolean;
  message: string;
  meta: null;
  data: unknown;
}
