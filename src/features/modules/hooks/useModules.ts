import { useQuery } from "@tanstack/react-query";
import {
  getModulesByInstrumentApi,
  getSingleModuleApi,
} from "../api/modules.api";

export const useModules = (instrumentId: string, page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["modules", instrumentId, page, limit],
    queryFn: () => getModulesByInstrumentApi(instrumentId, page, limit),
    enabled: !!instrumentId,
    placeholderData: (previousData) => previousData,
  });
};

export const useSingleModule = (id: string) => {
  return useQuery({
    queryKey: ["module", id],
    queryFn: () => getSingleModuleApi(id),
    enabled: !!id,
  });
};
