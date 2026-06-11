import { useMutation, useQuery } from "@tanstack/react-query";
import { createPrediction, getAnalytics, getHistory } from "@/services/predictions";

export function useCreatePrediction() {
  return useMutation({ mutationFn: createPrediction });
}

export function useAnalytics() {
  return useQuery({ queryKey: ["analytics"], queryFn: getAnalytics });
}

export function useHistory(params: Record<string, string | number | undefined>) {
  return useQuery({ queryKey: ["history", params], queryFn: () => getHistory(params) });
}
