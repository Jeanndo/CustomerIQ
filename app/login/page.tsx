"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/use-auth";

export default function LoginPage() {
  const router = useRouter();
  const mutation = useLogin();
  const [form, setForm] = useState({ email: "", password: "" });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate(form, { onSuccess: () => router.push("/dashboard") });
  }

  return (
    <AppShell>
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_440px] lg:items-center">
          <section>
            <p className="text-sm font-medium text-primary">Business workspace</p>
            <h1 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Sign in to your customer intelligence dashboard.</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Review customer health, satisfaction trends, loyalty indicators, and recommendations from one secure workspace.
            </p>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={submit}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="email" className="pl-9" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="password" className="pl-9" type="password" required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
                  </div>
                </div>
                {mutation.isError && <p className="text-sm text-destructive">Invalid email or password.</p>}
                <Button type="submit" disabled={mutation.isPending}>{mutation.isPending ? "Signing in..." : "Sign in"}</Button>
                <p className="text-sm text-muted-foreground">
                  New to CustomerIQ? <Link className="font-medium text-primary" href="/register">Create a workspace</Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </AppShell>
  );
}
