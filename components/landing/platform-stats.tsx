import { Database, LockKeyhole, ShieldCheck, UserCheck } from "lucide-react";

const assurances = [
  { icon: LockKeyhole, label: "Private dashboards", body: "Company analytics require an authenticated workspace session." },
  { icon: UserCheck, label: "Customer-safe links", body: "Public survey pages collect feedback without exposing internal reports." },
  { icon: Database, label: "Real persistence", body: "Responses and insights are stored in PostgreSQL, not browser fixtures." },
  { icon: ShieldCheck, label: "Role-aware access", body: "Business actions stay scoped to the company workspace." }
];

export function PlatformStatsSection() {
  return (
    <section className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground">Built for public feedback collection and private business analysis</p>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {assurances.map(({ icon: Icon, label, body }) => (
            <div key={label} className="rounded-md border bg-background px-4 py-5 shadow-sm">
              <Icon className="h-5 w-5 text-primary" />
              <p className="mt-3 font-semibold">{label}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
