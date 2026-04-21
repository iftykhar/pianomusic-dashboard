// features/account/hooks/useOrderlist.ts
import { useQuery } from "@tanstack/react-query";
import { getOrderList } from "../api/orderlist.api";

export const useOrderList = (userId: string, pageCount: number = 15, deliveryType: string = "print&digital") => {
  return useQuery({
    queryKey: ["orders", userId, pageCount, deliveryType],
    queryFn: () => getOrderList(userId, { pageCount, deliveryType }),
    enabled: !!userId,
  });
};
