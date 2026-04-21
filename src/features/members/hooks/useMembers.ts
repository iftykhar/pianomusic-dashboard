import { useQuery } from "@tanstack/react-query";
import { getAllUsersApi } from "../api/members.api";

export const useMembers = () => {
  return useQuery({
    queryKey: ["members"],
    queryFn: () => getAllUsersApi(),
  });
};
