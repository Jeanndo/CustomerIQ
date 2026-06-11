export type QuestionType = "rating" | "yes_no" | "multiple_choice" | "text" | "nps" | "dropdown" | "number";

export type Company = {
  id: number;
  name: string;
  slug: string;
  industry?: string | null;
  created_at: string;
};

export type SurveyQuestion = {
  id?: number;
  prompt: string;
  question_type: QuestionType;
  field_key: string;
  options?: string[] | null;
  required: boolean;
  position: number;
};

export type Survey = {
  id: number;
  company_id: number;
  title: string;
  slug: string;
  description?: string | null;
  status: string;
  response_count: number;
  created_at: string;
  published_at?: string | null;
  questions: SurveyQuestion[];
};

export type SurveyCreate = {
  title: string;
  slug: string;
  description?: string;
  questions: Omit<SurveyQuestion, "id">[];
};

export type PublicSurveySubmission = {
  answers: Record<string, string | number | boolean>;
  completion_seconds?: number;
};

export type PublicSurveyResult = {
  response_id: number;
  satisfaction_score: number;
  customer_health_score: number;
  risk_level: string;
  sentiment: string;
};

export type WorkspaceAnalytics = {
  stats: {
    total_responses: number;
    average_satisfaction: number;
    average_health_score: number;
    nps_score: number;
    active_surveys: number;
    response_rate: number;
    at_risk_customers: number;
    customer_experience_score: number;
  };
  satisfaction_trend: { date: string; value: number }[];
  nps_trend: { date: string; value: number }[];
  risk_distribution: { name: string; value: number }[];
  survey_completion_trend: { date: string; value: number }[];
  customer_segments: { name: string; value: number }[];
  usage_frequency_distribution: { name: string; value: number }[];
  subscription_plan_comparison: { name: string; value: number }[];
  insights: { title: string; summary: string; severity: string }[];
};

export type PlatformStats = {
  companies_using_platform: number;
  total_survey_responses: number;
  insights_generated: number;
  customer_feedback_collected: number;
  average_customer_satisfaction: number;
};

export type AdminMetrics = PlatformStats & {
  active_companies: number;
  monthly_active_users: number;
  surveys_created: number;
  revenue: number;
  top_companies: { name: string; responses: number }[];
  growth_trends: { date: string; companies: number; responses: number }[];
};
