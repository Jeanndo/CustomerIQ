"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PredictionInput } from "@/types/prediction";

const schema = z.object({
  satisfaction_rating: z.coerce.number().min(1, "Score must be at least 1.").max(10, "Score cannot exceed 10."),
  retention_intent: z.coerce.number().min(1, "Score must be at least 1.").max(10, "Score cannot exceed 10."),
  nps_score: z.coerce.number().min(0, "NPS must be at least 0.").max(10, "NPS cannot exceed 10."),
  usage_frequency: z.enum(["rarely", "monthly", "weekly", "daily"], { required_error: "Choose a usage frequency." }),
  support_rating: z.coerce.number().min(1, "Score must be at least 1.").max(10, "Score cannot exceed 10."),
  recent_issue_flag: z.coerce.number().min(0).max(1),
  support_contacts: z.coerce.number().min(0, "Support contacts cannot be negative."),
  ease_of_use: z.coerce.number().min(1, "Score must be at least 1.").max(10, "Score cannot exceed 10."),
  value_for_money: z.coerce.number().min(1, "Score must be at least 1.").max(10, "Score cannot exceed 10."),
  subscription_plan: z.enum(["basic", "pro", "premium"], { required_error: "Choose a subscription plan." })
});

type FormValues = z.infer<typeof schema>;

const numericFields: { name: keyof FormValues; label: string; min?: number; max?: number }[] = [
  { name: "satisfaction_rating", label: "Satisfaction Rating", min: 1, max: 10 },
  { name: "retention_intent", label: "Continue Using Score", min: 1, max: 10 },
  { name: "nps_score", label: "Recommendation Score", min: 0, max: 10 },
  { name: "support_rating", label: "Support Rating", min: 1, max: 10 },
  { name: "support_contacts", label: "Support Contacts Last Month", min: 0 },
  { name: "ease_of_use", label: "Ease of Use", min: 1, max: 10 },
  { name: "value_for_money", label: "Value for Money", min: 1, max: 10 }
];

export function PredictionForm({
  onSubmit,
  isLoading,
  submitLabel = "Generate Health Summary"
}: {
  onSubmit: (values: PredictionInput) => void;
  isLoading: boolean;
  submitLabel?: string;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      satisfaction_rating: 8,
      retention_intent: 8,
      nps_score: 8,
      usage_frequency: "weekly",
      support_rating: 8,
      recent_issue_flag: 0,
      support_contacts: 1,
      ease_of_use: 8,
      value_for_money: 8,
      subscription_plan: "pro",
    }
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2">
        {numericFields.map((field) => (
          <div key={field.name} className="grid gap-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input id={field.name} type="number" min={field.min} max={field.max} step="any" {...form.register(field.name)} />
            {form.formState.errors[field.name] && (
              <p className="text-xs text-destructive">{form.formState.errors[field.name]?.message}</p>
            )}
          </div>
        ))}
        <div className="grid gap-2">
          <Label>Usage Frequency</Label>
          <Select value={form.watch("usage_frequency")} onValueChange={(value) => form.setValue("usage_frequency", value as FormValues["usage_frequency"])}>
            <SelectTrigger><SelectValue placeholder="Select frequency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rarely">Rarely</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Recent Issue</Label>
          <Select value={String(form.watch("recent_issue_flag"))} onValueChange={(value) => form.setValue("recent_issue_flag", Number(value) as FormValues["recent_issue_flag"])}>
            <SelectTrigger><SelectValue placeholder="Select an answer" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No</SelectItem>
              <SelectItem value="1">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label>Subscription Plan</Label>
          <Select value={form.watch("subscription_plan")} onValueChange={(value) => form.setValue("subscription_plan", value as FormValues["subscription_plan"])}>
            <SelectTrigger><SelectValue placeholder="Select plan" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {submitLabel}
      </Button>
    </form>
  );
}
