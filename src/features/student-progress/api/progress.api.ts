import { api } from "@/lib/api";
import { GetStudentReportsResponse } from "../type";

export const getStudentReportsApi = async (
  page = 1,
  limit = 10,
  searchTerm = "",
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (searchTerm) {
    params.append("searchTerm", searchTerm);
  }

  const res = await api.get<GetStudentReportsResponse>(
    `/progress/admin/student-reports?${params.toString()}`,
  );
  return res.data;
};
