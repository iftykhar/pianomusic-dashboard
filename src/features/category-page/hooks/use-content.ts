import { useQuery } from "@tanstack/react-query";
import { getContent } from "@/features/category-page/api/category.api";

type ContentParams = {
  type?: string;
  page?: number;
  limit?: number;
  [key: string]: unknown;
};

export const useContent = (params: ContentParams = {}) => {
  return useQuery({
    queryKey: ["content", params],
    queryFn: () => getContent(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
