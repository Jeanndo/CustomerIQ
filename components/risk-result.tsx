"use client";

import { Download, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PredictionInput, PredictionResponse } from "@/types/prediction";

export function RiskResult({ result, customer }: { result: PredictionResponse; customer: PredictionInput }) {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (result.customer_health_score / 100) * circumference;
  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ result, customer }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "customer-health-summary.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Customer Health Summary</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={exportJson}>
          <Download className="h-4 w-4" />Export
        </Button>
      </CardHeader>
      <CardContent className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center justify-center">
          <svg width="160" height="160" viewBox="0 0 140 140">
            <circle cx="70" cy="70" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="14" />
            <circle
              cx="70"
              cy="70"
              r="54"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="14"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
            />
            <text x="70" y="75" textAnchor="middle" className="fill-foreground text-2xl font-semibold">{result.customer_health_score}</text>
          </svg>
          <Badge className="mt-3">
            {result.risk_level}
          </Badge>
          <p className="mt-2 text-sm text-muted-foreground">{result.satisfaction_score}% satisfaction score</p>
        </div>
        <div className="grid gap-5">
          <div>
            <h3 className="font-semibold">Recommended Actions</h3>
            <div className="mt-3 grid gap-2">
              {result.recommendations.map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-md border p-3 text-sm">
                  <PhoneCall className="h-4 w-4 text-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-3 rounded-md border p-4 text-sm sm:grid-cols-3">
            <div><p className="text-muted-foreground">Plan</p><p className="font-medium capitalize">{customer.subscription_plan}</p></div>
            <div><p className="text-muted-foreground">Usage</p><p className="font-medium capitalize">{customer.usage_frequency}</p></div>
            <div><p className="text-muted-foreground">Support Contacts</p><p className="font-medium">{customer.support_contacts}</p></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
