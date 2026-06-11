"use client";

import Link from "next/link";
import { Copy, GripVertical, Plus, Send } from "lucide-react";
import { use, useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateSurvey, usePublishSurvey, useSurveys } from "@/hooks/use-tenant";
import type { SurveyCreate } from "@/types/tenant";

const coreQuestions: SurveyCreate["questions"] = [
  { prompt: "How satisfied are you with our product or service?", question_type: "rating", field_key: "satisfaction_rating", required: true, position: 0 },
  { prompt: "How likely are you to continue using our product or service?", question_type: "rating", field_key: "retention_intent", required: true, position: 1 },
  { prompt: "How likely are you to recommend us to a friend or colleague?", question_type: "nps", field_key: "nps_score", required: true, position: 2 },
  { prompt: "How often do you use our product or service?", question_type: "multiple_choice", field_key: "usage_frequency", options: ["Rarely", "Monthly", "Weekly", "Daily"], required: true, position: 3 },
  { prompt: "How would you rate our customer support?", question_type: "rating", field_key: "support_rating", required: true, position: 4 },
  { prompt: "Have you experienced any issues recently?", question_type: "yes_no", field_key: "recent_issue_flag", required: true, position: 5 },
  { prompt: "How many times have you contacted support in the last month?", question_type: "number", field_key: "support_contacts", required: true, position: 6 },
  { prompt: "How easy is our product or service to use?", question_type: "rating", field_key: "ease_of_use", required: true, position: 7 },
  { prompt: "Do you feel you receive good value for the money you spend?", question_type: "rating", field_key: "value_for_money", required: true, position: 8 },
  { prompt: "Subscription Plan", question_type: "dropdown", field_key: "subscription_plan", options: ["Basic", "Pro", "Premium"], required: true, position: 9 },
  { prompt: "Open feedback", question_type: "text", field_key: "open_feedback", required: false, position: 10 }
];

export default function SurveysPage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = use(params);
  const [title, setTitle] = useState("Customer Satisfaction Q1");
  const [slug, setSlug] = useState("customer-satisfaction-q1");
  const [customized, setCustomized] = useState(false);
  const { data: surveys } = useSurveys(companySlug);
  const createMutation = useCreateSurvey(companySlug);
  const publishMutation = usePublishSurvey(companySlug);

  useEffect(() => {
    if (!surveys?.length || customized) return;
    const existingSlugs = new Set(surveys.map((survey) => survey.slug));
    if (!existingSlugs.has(slug)) return;
    const nextNumber = surveys.length + 1;
    setTitle(`Customer Satisfaction Q${nextNumber}`);
    setSlug(`customer-satisfaction-q${nextNumber}`);
  }, [customized, slug, surveys]);

  const createDefaultSurvey = () => {
    createMutation.mutate({
      title,
      slug,
      description: "Core customer feedback survey for customer intelligence.",
      questions: coreQuestions
    });
  };

  return (
    <AppShell>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Workspace / {companySlug}</p>
            <h1 className="text-3xl font-semibold">Survey Builder</h1>
          </div>
          <Button asChild variant="outline"><Link href={`/workspace/${companySlug}`}>Back to dashboard</Link></Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <Card>
            <CardHeader><CardTitle>Create survey</CardTitle></CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label>Survey title</Label>
                <Input value={title} onChange={(event) => { setCustomized(true); setTitle(event.target.value); }} />
              </div>
              <div className="grid gap-2">
                <Label>Public URL slug</Label>
                <Input value={slug} onChange={(event) => { setCustomized(true); setSlug(event.target.value); }} />
              </div>
              <div className="grid gap-2">
                <Label>Question order</Label>
                <div className="grid gap-2">
                  {coreQuestions.map((question, index) => (
                    <div key={question.field_key} className="flex items-center gap-2 rounded-md border bg-background p-2 text-sm">
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-muted text-xs">{index + 1}</span>
                      <span className="line-clamp-1">{question.prompt}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button type="button" onClick={createDefaultSurvey} disabled={createMutation.isPending}>
                <Plus className="h-4 w-4" />Create Survey
              </Button>
              {createMutation.isError && (
                <p className="text-sm text-destructive">Could not create this survey. Use a unique public URL slug and try again.</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Surveys</CardTitle></CardHeader>
            <CardContent className="grid gap-3">
              {surveys?.map((survey) => {
                const publicUrl = `/s/${companySlug}/${survey.slug}`;
                return (
                  <div key={survey.id} className="grid gap-3 rounded-md border p-4 md:grid-cols-[1fr_auto] md:items-center">
                    <div>
                      <p className="font-medium">{survey.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{survey.status} / {survey.response_count} responses</p>
                      <p className="mt-1 text-xs text-muted-foreground">{publicUrl}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {survey.status !== "published" && (
                        <Button size="sm" onClick={() => publishMutation.mutate(survey.id)}><Send className="h-4 w-4" />Publish</Button>
                      )}
                      <Button asChild size="sm" variant="outline"><Link href={publicUrl}><Copy className="h-4 w-4" />Open</Link></Button>
                    </div>
                  </div>
                );
              })}
              {surveys?.length === 0 && <p className="text-sm text-muted-foreground">No surveys yet. Create the default customer satisfaction survey to get started.</p>}
            </CardContent>
          </Card>
        </div>
      </main>
    </AppShell>
  );
}
