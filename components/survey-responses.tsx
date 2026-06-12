"use client";

import { Clock, HeartPulse, MessageSquareText, SmilePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SurveyResponse } from "@/types/tenant";

const answerLabels: Record<string, string> = {
  satisfaction_rating: "Satisfaction",
  retention_intent: "Continue using",
  nps_score: "Recommendation",
  usage_frequency: "Usage",
  support_rating: "Support",
  recent_issue_flag: "Recent issue",
  support_contacts: "Support contacts",
  ease_of_use: "Ease of use",
  value_for_money: "Value for money",
  subscription_plan: "Plan",
  open_feedback: "Open feedback"
};

export function SurveyResponses({ responses, isLoading }: { responses?: SurveyResponse[]; isLoading?: boolean }) {
  return (
    <section className="grid gap-4">
      <div className="flex items-center gap-2">
        <MessageSquareText className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Customer Survey Responses</h2>
      </div>
      {isLoading && (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">Loading customer responses...</CardContent>
        </Card>
      )}
      {!isLoading && responses?.length === 0 && (
        <Card>
          <CardContent className="p-6 text-sm text-muted-foreground">No customer responses yet.</CardContent>
        </Card>
      )}
      <div className="grid gap-4">
        {responses?.map((response) => (
          <Card key={response.id}>
            <CardHeader className="gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle className="text-base">{response.survey_title}</CardTitle>
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {new Date(response.submitted_at).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="gap-1 bg-background"><HeartPulse className="h-3.5 w-3.5" />Health {response.customer_health_score ?? "-"}</Badge>
                <Badge className="gap-1 bg-background"><SmilePlus className="h-3.5 w-3.5" />Satisfaction {response.satisfaction_score ?? "-"}%</Badge>
                <Badge>{response.risk_level ?? "Pending"}</Badge>
                <Badge className="bg-muted">{response.sentiment ?? "Unknown"}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {Object.entries(response.answers).map(([key, value]) => (
                  <div key={key} className="rounded-md border bg-background p-3">
                    <p className="text-xs font-medium uppercase tracking-normal text-muted-foreground">{answerLabels[key] ?? key.replaceAll("_", " ")}</p>
                    <p className="mt-1 break-words text-sm font-medium">{String(value)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
