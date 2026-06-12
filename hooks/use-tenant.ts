import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCompany,
  createSurvey,
  getAdminMetrics,
  getCompanyResponses,
  getDashboardOverview,
  getCompany,
  getPlatformStats,
  getPublicSurvey,
  getSurveys,
  getWorkspaceAnalytics,
  publishSurvey,
  submitPublicSurvey
} from "@/services/tenant";

export function usePlatformStats() {
  return useQuery({ queryKey: ["platform-stats"], queryFn: getPlatformStats });
}

export function useCompany(slug: string) {
  return useQuery({ queryKey: ["company", slug], queryFn: () => getCompany(slug), enabled: Boolean(slug) });
}

export function useWorkspaceAnalytics(slug: string) {
  return useQuery({ queryKey: ["workspace-analytics", slug], queryFn: () => getWorkspaceAnalytics(slug), enabled: Boolean(slug) });
}

export function useDashboardOverview(enabled: boolean) {
  return useQuery({ queryKey: ["dashboard-overview"], queryFn: getDashboardOverview, enabled });
}

export function useSurveys(slug: string) {
  return useQuery({ queryKey: ["surveys", slug], queryFn: () => getSurveys(slug), enabled: Boolean(slug) });
}

export function useCompanyResponses(slug: string | undefined) {
  return useQuery({
    queryKey: ["company-responses", slug],
    queryFn: () => getCompanyResponses(slug ?? ""),
    enabled: Boolean(slug)
  });
}

export function useCreateCompany() {
  return useMutation({ mutationFn: createCompany });
}

export function useCreateSurvey(companySlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Parameters<typeof createSurvey>[1]) => createSurvey(companySlug, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["surveys", companySlug] })
  });
}

export function usePublishSurvey(companySlug: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (surveyId: number) => publishSurvey(companySlug, surveyId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["surveys", companySlug] })
  });
}

export function usePublicSurvey(companySlug: string, surveySlug: string) {
  return useQuery({
    queryKey: ["public-survey", companySlug, surveySlug],
    queryFn: () => getPublicSurvey(companySlug, surveySlug),
    enabled: Boolean(companySlug && surveySlug)
  });
}

export function useSubmitPublicSurvey(companySlug: string, surveySlug: string) {
  return useMutation({
    mutationFn: (payload: Parameters<typeof submitPublicSurvey>[2]) => submitPublicSurvey(companySlug, surveySlug, payload)
  });
}

export function useAdminMetrics() {
  return useQuery({ queryKey: ["admin-metrics"], queryFn: getAdminMetrics });
}
