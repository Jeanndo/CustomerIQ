import { api } from "@/lib/api";
import type {
  AdminMetrics,
  Company,
  PlatformStats,
  PublicSurveyResult,
  PublicSurveySubmission,
  Survey,
  SurveyCreate,
  SurveyResponse,
  WorkspaceAnalytics
} from "@/types/tenant";

export async function getPlatformStats() {
  const { data } = await api.get<PlatformStats>("/api/public/stats");
  return data;
}

export async function createCompany(payload: { name: string; slug: string; industry?: string }) {
  const { data } = await api.post<Company>("/api/companies", payload);
  return data;
}

export async function getCompany(slug: string) {
  const { data } = await api.get<Company>(`/api/companies/${slug}`);
  return data;
}

export async function getWorkspaceAnalytics(companySlug: string) {
  const { data } = await api.get<WorkspaceAnalytics>(`/api/companies/${companySlug}/analytics`);
  return data;
}

export async function getDashboardOverview() {
  const { data } = await api.get<WorkspaceAnalytics>("/api/dashboard/overview");
  return data;
}

export async function getSurveys(companySlug: string) {
  const { data } = await api.get<Survey[]>(`/api/companies/${companySlug}/surveys`);
  return data;
}

export async function getCompanyResponses(companySlug: string) {
  const { data } = await api.get<SurveyResponse[]>(`/api/companies/${companySlug}/responses`);
  return data;
}

export async function createSurvey(companySlug: string, payload: SurveyCreate) {
  const { data } = await api.post<Survey>(`/api/companies/${companySlug}/surveys`, payload);
  return data;
}

export async function publishSurvey(companySlug: string, surveyId: number) {
  const { data } = await api.post<Survey>(`/api/companies/${companySlug}/surveys/${surveyId}/publish`);
  return data;
}

export async function getPublicSurvey(companySlug: string, surveySlug: string) {
  const { data } = await api.get<Survey>(`/api/public/surveys/${companySlug}/${surveySlug}`);
  return data;
}

export async function submitPublicSurvey(companySlug: string, surveySlug: string, payload: PublicSurveySubmission) {
  const { data } = await api.post<PublicSurveyResult>(`/api/public/surveys/${companySlug}/${surveySlug}/responses`, payload);
  return data;
}

export async function getAdminMetrics() {
  const { data } = await api.get<AdminMetrics>("/api/admin/metrics");
  return data;
}
