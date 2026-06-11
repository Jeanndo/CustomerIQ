"use client";

import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminMetrics } from "@/hooks/use-tenant";

export default function AdminPage() {
  const { data, isLoading } = useAdminMetrics();

  return (
    <AppShell>
      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm text-muted-foreground">Platform owner</p>
          <h1 className="text-3xl font-semibold">Super Admin Dashboard</h1>
        </div>
        {isLoading && <Card><CardContent className="p-6 text-sm text-muted-foreground">Loading platform metrics...</CardContent></Card>}
        {data && (
          <>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Total Companies", data.companies_using_platform],
                ["Active Companies", data.active_companies],
                ["Monthly Active Users", data.monthly_active_users],
                ["Surveys Created", data.surveys_created],
                ["Responses Collected", data.total_survey_responses],
                ["Insights Generated", data.insights_generated],
                ["Revenue", `$${Math.round(data.revenue)}`],
                ["Avg Satisfaction", `${Math.round(data.average_customer_satisfaction)}%`]
              ].map(([label, value]) => (
                <Card key={label}>
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">{label}</CardTitle></CardHeader>
                  <CardContent><p className="text-3xl font-semibold">{value}</p></CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader><CardTitle>Top Companies</CardTitle></CardHeader>
              <CardContent className="grid gap-3">
                {data.top_companies.map((company) => (
                  <div key={company.name} className="flex items-center justify-between rounded-md border p-3 text-sm">
                    <span>{company.name}</span>
                    <span className="font-semibold">{company.responses} responses</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </AppShell>
  );
}
