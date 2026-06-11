"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type React from "react";
import { Building2, LockKeyhole, Mail, UserRound } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/use-auth";

export default function RegisterPage() {
  const router = useRouter();
  const mutation = useRegister();
  const [form, setForm] = useState({ full_name: "", email: "", password: "", company_name: "", industry: "" });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate(form, { onSuccess: () => router.push("/dashboard") });
  }

  return (
    <AppShell>
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_460px] lg:items-center">
          <section>
            <p className="text-sm font-medium text-primary">Create company workspace</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Turn every customer response into retention intelligence.</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Launch surveys, collect customer feedback, and give your team a private dashboard for health scores, trends, and recommendations.
            </p>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Start your workspace</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={submit}>
                <Field icon={<UserRound className="h-4 w-4" />} label="Full name" value={form.full_name} onChange={(value) => setForm({ ...form, full_name: value })} />
                <Field icon={<Building2 className="h-4 w-4" />} label="Company name" value={form.company_name} onChange={(value) => setForm({ ...form, company_name: value })} />
                <Field icon={<Mail className="h-4 w-4" />} label="Email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} />
                <Field icon={<Building2 className="h-4 w-4" />} label="Industry" required={false} value={form.industry} onChange={(value) => setForm({ ...form, industry: value })} />
                <Field icon={<LockKeyhole className="h-4 w-4" />} label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} />
                {mutation.isError && <p className="text-sm text-destructive">Could not create this workspace. Try another email address.</p>}
                <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Creating workspace..." : "Create workspace"}</Button>
                <p className="text-sm text-muted-foreground">
                  Already have an account? <Link className="font-medium text-primary" href="/login">Sign in</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </AppShell>
  );
}

function Field({
  icon,
  label,
  value,
  onChange,
  type = "text",
  required = true
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-muted-foreground">{icon}</span>
        <Input id={id} className="pl-9" type={type} required={required} minLength={type === "password" ? 8 : undefined} value={value} onChange={(event) => onChange(event.target.value)} />
      </div>
    </div>
  );
}
