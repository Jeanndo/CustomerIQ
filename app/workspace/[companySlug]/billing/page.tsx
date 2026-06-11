import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BillingPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <CardHeader><CardTitle>Billing</CardTitle></CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            Subscription records are stored per company and ready for payment provider integration.
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}
