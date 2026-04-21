import { useQuery } from "@tanstack/react-query";
import { getStudentReportsApi } from "../api/progress.api";

export const useStudentProgress = (page = 1, limit = 10, searchTerm = "") => {
  return useQuery({
    queryKey: ["student-reports", page, limit, searchTerm],
    queryFn: () => getStudentReportsApi(page, limit, searchTerm),
    placeholderData: (previousData) => previousData,
  });
};
