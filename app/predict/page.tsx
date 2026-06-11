"use client";

import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { PredictionForm } from "@/components/forms/prediction-form";
import { RiskResult } from "@/components/risk-result";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreatePrediction } from "@/hooks/use-predictions";
import type { PredictionInput } from "@/types/prediction";

export default function PredictPage() {
  const [lastInput, setLastInput] = useState<PredictionInput | null>(null);
  const mutation = useCreatePrediction();

  return (
    <AppShell>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-semibold">Customer Health Assessment</h1>
          <p className="mt-2 text-muted-foreground">Review customer satisfaction, engagement level, loyalty signals, and recommended actions.</p>
        </div>
        <div className="grid gap-6 xl:grid-cols-[1fr_480px]">
          <Card>
            <CardHeader><CardTitle>Customer Inputs</CardTitle></CardHeader>
            <CardContent>
              <PredictionForm
                isLoading={mutation.isPending}
                onSubmit={(values) => {
                  setLastInput(values);
                  mutation.mutate(values);
                }}
              />
              {mutation.isError && <p className="mt-4 text-sm text-destructive">Assessment failed. Confirm the API is running.</p>}
            </CardContent>
          </Card>
          <div>
            {mutation.data && lastInput ? (
              <RiskResult result={mutation.data} customer={lastInput} />
            ) : (
              <Card>
                <CardHeader><CardTitle>Customer Intelligence Preview</CardTitle></CardHeader>
                <CardContent className="text-sm leading-6 text-muted-foreground">
                  Submit the form to see customer health, satisfaction, recommendations, and exportable customer details.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </AppShell>
  );
}
