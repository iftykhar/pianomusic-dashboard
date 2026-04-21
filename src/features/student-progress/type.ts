export interface StudentReport {
  student: {
    name: string;
    email: string;
    avatar?: string;
  };
  course: string;
  status: {
    currentModule: string;
    currentLesson: string;
    isCompleted: boolean;
  };
  metrics: {
    lessonsDone: number;
    modulesDone: number;
  };
  lastActivity: string;
}

export interface GetStudentReportsResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: StudentReport[];
}
