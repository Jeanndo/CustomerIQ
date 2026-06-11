import { AppShell } from "@/components/app-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TeamPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Card>
          <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
          <CardContent className="text-sm leading-6 text-muted-foreground">
            Workspace roles are designed for Owner, Manager, Analyst, and Admin access. Authentication can be connected here without changing the tenant data model.
          </CardContent>
        </Card>
      </main>
    </AppShell>
  );
}
