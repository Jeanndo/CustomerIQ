"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type React from "react";
import { Activity, AlertTriangle, BarChart3, HeartPulse, LineChartIcon, LogOut, MessageSquareText, Percent, ShieldCheck, Sparkles } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentSession, useLogout } from "@/hooks/use-auth";
import { useDashboardOverview } from "@/hooks/use-tenant";

const colors = ["#14b8a6", "#22c55e", "#f59e0b", "#ef4444"];

export default function DashboardPage() {
  const router = useRouter();
  const logout = useLogout();
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(Boolean(window.localStorage.getItem("access_token"))), []);

  const session = useCurrentSession();
  const { data, isLoading, isError } = useDashboardOverview(ready);

  function signOut() {
    logout();
    router.push("/login");
  }

  return (
    <AppShell>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        {!ready && (
          <Card>
            <CardContent className="grid gap-4 p-8 text-center">
              <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
              <div>
                <h1 className="text-2xl font-semibold">Login required</h1>
                <p className="mt-2 text-muted-foreground">Business intelligence dashboards are private to each company workspace.</p>
              </div>
              <div className="flex justify-center gap-2">
                <Button asChild><Link href="/login">Sign in</Link></Button>
                <Button asChild variant="outline"><Link href="/register">Create workspace</Link></Button>
              </div>
            </CardContent>
          </Card>
        )}

        {ready && (
          <>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{session.data?.company.name ?? "Company workspace"}</p>
                <h1 className="text-3xl font-semibold">Customer Intelligence Dashboard</h1>
                <p className="mt-2 text-muted-foreground">Monitor customer health, satisfaction, loyalty signals, sentiment, and recommendations.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {session.data?.company.slug && (
                  <Button asChild variant="outline">
                    <Link href={`/workspace/${session.data.company.slug}/surveys`}><MessageSquareText className="h-4 w-4" />Surveys</Link>
                  </Button>
                )}
                <Button variant="outline" onClick={signOut}><LogOut className="h-4 w-4" />Sign out</Button>
              </div>
            </div>

            {(isLoading || session.isLoading) && <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading secure workspace analytics...</CardContent></Card>}
            {(isError || session.isError) && <Card><CardContent className="p-6 text-sm text-destructive">Unable to load your workspace. Please sign in again.</CardContent></Card>}

            {data && (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {[
                    { icon: MessageSquareText, label: "Total Responses", value: data.stats.total_responses },
                    { icon: Activity, label: "Average Satisfaction", value: `${Math.round(data.stats.average_satisfaction)}%` },
                    { icon: HeartPulse, label: "Average Customer Health", value: Math.round(data.stats.average_health_score) },
                    { icon: LineChartIcon, label: "NPS Score", value: Math.round(data.stats.nps_score) },
                    { icon: AlertTriangle, label: "At-Risk Customers", value: data.stats.at_risk_customers },
                    { icon: Percent, label: "Survey Completion Rate", value: `${Math.round(data.stats.response_rate)}%` },
                    { icon: ShieldCheck, label: "Customer Experience Score", value: Math.round(data.stats.customer_experience_score) },
                    { icon: Sparkles, label: "Business Insights", value: data.insights.length }
                  ].map(({ icon: Icon, label, value }) => (
                    <Card key={label}>
                      <CardHeader className="flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                        <Icon className="h-4 w-4 text-primary" />
                      </CardHeader>
                      <CardContent><p className="text-3xl font-semibold">{value}</p></CardContent>
                    </Card>
                  ))}
                </div>

                <div className="grid gap-6 xl:grid-cols-2">
                  <ChartCard title="Satisfaction Trend">
                    <LineChart data={data.satisfaction_trend}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="value" stroke="#14b8a6" strokeWidth={3} /></LineChart>
                  </ChartCard>
                  <ChartCard title="Loyalty Indicator Trend">
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
                    <Sparkles className="h-5 w-5 text-primary" />
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
              </>
            )}
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
