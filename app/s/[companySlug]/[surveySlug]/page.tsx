"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePublicSurvey, useSubmitPublicSurvey } from "@/hooks/use-tenant";

export default function PublicSurveyPage({ params }: { params: Promise<{ companySlug: string; surveySlug: string }> }) {
  const { companySlug, surveySlug } = use(params);
  const { data: survey, isLoading, isError } = usePublicSurvey(companySlug, surveySlug);
  const mutation = useSubmitPublicSurvey(companySlug, surveySlug);
  const [answers, setAnswers] = useState<Record<string, string | number | boolean>>({});
  const [formError, setFormError] = useState<string | null>(null);

  const setAnswer = (key: string, value: string | number | boolean) => {
    setFormError(null);
    setAnswers((current) => ({ ...current, [key]: value }));
  };

  if (mutation.data) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <CardTitle>Thank you for your feedback</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <p className="text-sm leading-6 text-muted-foreground">
              Your response was submitted successfully. We appreciate you taking the time to help us improve.
            </p>
            <Button asChild variant="outline"><Link href="/">Return home</Link></Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-10">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle>{isLoading ? "Loading survey..." : survey?.title ?? "Survey unavailable"}</CardTitle>
          {survey?.description && <p className="text-sm text-muted-foreground">{survey.description}</p>}
        </CardHeader>
        <CardContent>
          {isError && <p className="text-sm text-destructive">This survey is not available.</p>}
          {survey && (
            <form
              className="grid gap-5"
              onSubmit={(event) => {
                event.preventDefault();
                const missing = survey.questions.filter((question) => {
                  const value = answers[question.field_key];
                  return question.required && (value === undefined || value === "");
                });
                if (missing.length) {
                  setFormError("Please answer all required questions before submitting.");
                  return;
                }
                mutation.mutate({ answers, completion_seconds: 120 });
              }}
            >
              {[...survey.questions].sort((a, b) => a.position - b.position).map((question) => (
                <div key={question.field_key} className="grid gap-2">
                  <Label>{question.prompt}</Label>
                  {question.question_type === "text" ? (
                    <Input required={question.required} value={String(answers[question.field_key] ?? "")} onChange={(event) => setAnswer(question.field_key, event.target.value)} />
                  ) : question.question_type === "yes_no" ? (
                    <Select onValueChange={(value) => setAnswer(question.field_key, value)}>
                      <SelectTrigger><SelectValue placeholder="Select an answer" /></SelectTrigger>
                      <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
                    </Select>
                  ) : question.options?.length ? (
                    <Select onValueChange={(value) => setAnswer(question.field_key, value)}>
                      <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                      <SelectContent>{question.options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectContent>
                    </Select>
                  ) : (
                    <Input required={question.required} type="number" min={question.question_type === "nps" ? 0 : 1} max={10} onChange={(event) => setAnswer(question.field_key, Number(event.target.value))} />
                  )}
                </div>
              ))}
              {formError && <p className="text-sm text-destructive">{formError}</p>}
              {mutation.isError && <p className="text-sm text-destructive">Unable to submit this response. Please check your answers and try again.</p>}
              <Button type="submit" disabled={mutation.isPending}>Submit Feedback</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
