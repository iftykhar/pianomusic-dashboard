import { useQuery } from "@tanstack/react-query";
import {
  getAllInstrumentsApi,
  getSingleInstrumentApi,
} from "../api/instruments.api";

export const useInstruments = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["instruments", page, limit],
    queryFn: () => getAllInstrumentsApi(page, limit),
    placeholderData: (previousData) => previousData,
  });
};

export const useSingleInstrument = (id: string) => {
  return useQuery({
    queryKey: ["instrument", id],
    queryFn: () => getSingleInstrumentApi(id),
    enabled: !!id,
  });
};
