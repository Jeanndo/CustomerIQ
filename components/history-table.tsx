"use client";

import { useState } from "react";
import { ArrowDownUp, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHistory } from "@/hooks/use-predictions";

export function HistoryTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [riskLevel, setRiskLevel] = useState<string | undefined>();
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const { data, isLoading } = useHistory({
    page,
    page_size: 8,
    search: search || undefined,
    risk_level: riskLevel,
    sort_by: sortBy,
    sort_order: sortOrder,
  });

  const totalPages = data ? Math.max(1, Math.ceil(data.total / data.page_size)) : 1;

  return (
    <div className="rounded-lg border bg-card">
      <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search plan, contract, segment" value={search} onChange={(event) => { setPage(1); setSearch(event.target.value); }} />
        </div>
        <div className="flex flex-wrap gap-2">
          <Select value={riskLevel ?? "all"} onValueChange={(value) => { setPage(1); setRiskLevel(value === "all" ? undefined : value); }}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All segments</SelectItem>
              <SelectItem value="Excellent">Excellent</SelectItem>
              <SelectItem value="Healthy">Healthy</SelectItem>
              <SelectItem value="Needs Attention">Needs Attention</SelectItem>
              <SelectItem value="At Risk">At Risk</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={(value) => { setPage(1); setSortBy(value); }}>
            <SelectTrigger className="w-40"><ArrowDownUp className="h-4 w-4" /><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="health">Customer health</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortOrder} onValueChange={(value) => { setPage(1); setSortOrder(value as "asc" | "desc"); }}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[840px] text-sm">
          <thead className="bg-muted/60 text-left text-muted-foreground">
            <tr>
              <th className="p-3 font-medium">Date</th>
              <th className="p-3 font-medium">Plan</th>
              <th className="p-3 font-medium">Customer Health</th>
              <th className="p-3 font-medium">Satisfaction</th>
              <th className="p-3 font-medium">Usage</th>
              <th className="p-3 font-medium">Engagement Level</th>
              <th className="p-3 font-medium">Support Contacts</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td className="p-4 text-muted-foreground" colSpan={7}>Loading customer intelligence history...</td></tr>}
            {data?.items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-3">{new Date(item.created_at).toLocaleDateString()}</td>
                <td className="p-3 capitalize">{item.subscription_plan}</td>
                <td className="p-3">{item.customer_health_score}</td>
                <td className="p-3">{item.satisfaction_score}%</td>
                <td className="p-3 capitalize">{item.usage_frequency}</td>
                <td className="p-3">{item.risk_level}</td>
                <td className="p-3">{item.support_contacts}</td>
              </tr>
            ))}
            {data && data.items.length === 0 && <tr><td className="p-4 text-muted-foreground" colSpan={7}>No feedback records found.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t p-4 text-sm text-muted-foreground">
        <span>Page {page} of {totalPages}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((value) => value - 1)}><ChevronLeft className="h-4 w-4" />Previous</Button>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((value) => value + 1)}>Next<ChevronRight className="h-4 w-4" /></Button>
        </div>
      </div>
    </div>
  );
}
