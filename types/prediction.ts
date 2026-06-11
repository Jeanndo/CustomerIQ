export type SubscriptionPlan = "basic" | "pro" | "premium";
export type UsageFrequency = "rarely" | "monthly" | "weekly" | "daily";

export type PredictionInput = {
  satisfaction_rating: number;
  retention_intent: number;
  nps_score: number;
  usage_frequency: UsageFrequency;
  support_rating: number;
  recent_issue_flag: number;
  support_contacts: number;
  ease_of_use: number;
  value_for_money: number;
  subscription_plan: SubscriptionPlan;
};

export type PredictionResponse = {
  customer_health_score: number;
  risk_level: string;
  satisfaction_score: number;
  recommendation: string;
  recommendations: string[];
};

export type PredictionRecord = PredictionInput & {
  id: number;
  created_at: string;
  customer_health_score: number;
  satisfaction_score: number;
  risk_level: string;
};

export type HistoryResponse = {
  items: PredictionRecord[];
  total: number;
  page: number;
  page_size: number;
};

export type StatsResponse = {
  total_responses: number;
  average_customer_health: number;
  excellent_count: number;
  healthy_count: number;
  needs_attention_count: number;
  at_risk_count: number;
};

export type AnalyticsResponse = {
  stats: StatsResponse;
  risk_distribution: { name: string; value: number }[];
  customer_health_history: { date: string; value: number }[];
  subscription_plan_analysis: { subscription_plan: string; average_customer_health: number }[];
};
