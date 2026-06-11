import { api } from "@/lib/api";
import type { AnalyticsResponse, HistoryResponse, PredictionInput, PredictionResponse } from "@/types/prediction";

export async function createPrediction(payload: PredictionInput) {
  const { data } = await api.post<PredictionResponse>("/api/predict", payload);
  return data;
}

export async function getAnalytics() {
  const { data } = await api.get<AnalyticsResponse>("/api/analytics");
  return data;
}

export async function getHistory(params: Record<string, string | number | undefined>) {
  const cleanParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== "")
  );
  const { data } = await api.get<HistoryResponse>("/api/history", { params: cleanParams });
  return data;
}
