"use client";

import Link from "next/link";
import { ArrowRight, ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function SurveyPage() {
  const [status, setStatus] = useState("Preparing demo survey...");
  const [surveyUrl, setSurveyUrl] = useState("/s/acme-retention/customer-satisfaction-q1");

  useEffect(() => {
    api.post<{ survey_url: string }>("/api/demo/bootstrap")
      .then(({ data }) => {
        setSurveyUrl(data.survey_url);
        setStatus("Demo survey is ready.");
      })
      .catch(() => setStatus("Open the generated survey after running migrations and backend API."));
  }, []);

  return (
    <AppShell>
      <main className="mx-auto grid max-w-4xl gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <ClipboardList className="h-6 w-6" />
              </div>
              <div>
                <Badge>Customer survey</Badge>
                <CardTitle className="mt-3 text-3xl">Shareable feedback collection</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-5">
            <p className="leading-7 text-muted-foreground">
              This is the customer-facing entry point. Customers only see a clean feedback form and a thank-you message. In production, every business gets a generated public URL like
              <span className="font-medium text-foreground"> /s/company-slug/customer-satisfaction-q1</span>.
            </p>
            <div className="rounded-md border bg-background p-4 text-sm text-muted-foreground">
              {status}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href={surveyUrl}>Open Customer Survey <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/workspace/acme-retention">Open Owner Workspace</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}
