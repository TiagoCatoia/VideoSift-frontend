import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AppConfig } from "../types/config-type";
import { getTextProcessing } from "../utils/getTextProcessing";

export const useFetch = (newConfig: AppConfig): UseQueryResult => {
  return useQuery({
    queryKey: [newConfig],
    queryFn: () => getTextProcessing(newConfig),
  });
};
