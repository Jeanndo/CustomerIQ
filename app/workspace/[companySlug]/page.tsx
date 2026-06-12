"use client";

import Link from "next/link";
import { use } from "react";
import type React from "react";
import { BarChart3, ClipboardList, CreditCard, Users } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { SurveyResponses } from "@/components/survey-responses";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompanyResponses, useWorkspaceAnalytics } from "@/hooks/use-tenant";

const colors = ["#14b8a6", "#22c55e", "#f59e0b", "#ef4444"];

export default function WorkspacePage({ params }: { params: Promise<{ companySlug: string }> }) {
  const { companySlug } = use(params);
  const { data, isLoading, isError } = useWorkspaceAnalytics(companySlug);
  const responses = useCompanyResponses(companySlug);

  return (
    <AppShell>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Workspace / {companySlug}</p>
            <h1 className="text-3xl font-semibold">Customer Intelligence Dashboard</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline"><Link href={`/workspace/${companySlug}/surveys`}><ClipboardList className="h-4 w-4" />Surveys</Link></Button>
            <Button asChild variant="outline"><Link href={`/workspace/${companySlug}/team`}><Users className="h-4 w-4" />Team</Link></Button>
            <Button asChild variant="outline"><Link href={`/workspace/${companySlug}/billing`}><CreditCard className="h-4 w-4" />Billing</Link></Button>
          </div>
        </div>

        {isLoading && <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading workspace analytics...</CardContent></Card>}
        {isError && <Card><CardContent className="p-6 text-sm text-destructive">Unable to load workspace analytics.</CardContent></Card>}

        {data && (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Total Responses", data.stats.total_responses],
                ["Average Satisfaction", `${Math.round(data.stats.average_satisfaction)}%`],
                ["Average Customer Health", Math.round(data.stats.average_health_score)],
                ["NPS Score", Math.round(data.stats.nps_score)],
                ["At-Risk Customers", data.stats.at_risk_customers],
                ["Survey Completion Rate", `${Math.round(data.stats.response_rate)}%`],
                ["Customer Experience Score", Math.round(data.stats.customer_experience_score)],
                ["Business Insights", data.insights.length]
              ].map(([label, value]) => (
                <Card key={label}>
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{label}</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-semibold">{value}</p></CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <ChartCard title="Satisfaction Trend">
                <LineChart data={data.satisfaction_trend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} /></LineChart>
              </ChartCard>
              <ChartCard title="NPS Trend">
                <LineChart data={data.nps_trend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} /></LineChart>
              </ChartCard>
              <ChartCard title="Customer Health Distribution">
                <PieChart><Pie data={data.risk_distribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>{data.risk_distribution.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}</Pie><Tooltip /></PieChart>
              </ChartCard>
              <ChartCard title="Usage Frequency Distribution">
                <BarChart data={data.usage_frequency_distribution}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#0f766e" radius={[4, 4, 0, 0]} /></BarChart>
              </ChartCard>
              <ChartCard title="Subscription Plan Comparison">
                <BarChart data={data.subscription_plan_comparison}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} /></BarChart>
              </ChartCard>
            </div>

            <section className="grid gap-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Business Insights</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {data.insights.map((insight) => (
                  <Card key={insight.title}>
                    <CardHeader><CardTitle>{insight.title}</CardTitle></CardHeader>
                    <CardContent><p className="text-sm leading-6 text-muted-foreground">{insight.summary}</p></CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <SurveyResponses responses={responses.data} isLoading={responses.isLoading} />
          </>
        )}
      </main>
    </AppShell>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactElement }) {
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
