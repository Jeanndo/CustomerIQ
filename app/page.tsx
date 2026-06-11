import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Compass,
  HeartPulse,
  LineChart,
  LockKeyhole,
  MessageSquareText,
  PieChart,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  type LucideIcon
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { PlatformStatsSection } from "@/components/landing/platform-stats";
import { ProductPreview } from "@/components/landing/product-preview";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const values: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: MessageSquareText, title: "Collect Customer Feedback", body: "Create structured surveys that make it easy for customers to share clear, useful feedback." },
  { icon: LineChart, title: "Measure Satisfaction Over Time", body: "Track satisfaction, NPS, and response trends so your team can see what is improving." },
  { icon: Users, title: "Understand Customer Needs", body: "Organize feedback around recurring themes, customer groups, and moments in the customer journey." },
  { icon: TrendingUp, title: "Identify Emerging Trends", body: "Spot shifts in sentiment, service quality, engagement, and product experience before they become harder to address." },
  { icon: HeartPulse, title: "Improve Customer Experience", body: "Turn responses into practical next steps for support, success, onboarding, and leadership teams." },
  { icon: Compass, title: "Make Better Business Decisions", body: "Give teams a shared view of what customers are saying and where to focus next." }
];

const steps = [
  { icon: ClipboardList, title: "Create a Survey", body: "Choose question types that match the feedback you want to collect." },
  { icon: Send, title: "Share It With Customers", body: "Publish a simple link and send it through the channels your customers already use." },
  { icon: MessageSquareText, title: "Collect Feedback", body: "Bring responses into one workspace for review, analysis, and reporting." },
  { icon: LockKeyhole, title: "Keep Analytics Private", body: "Review trends and recommendations inside the authenticated business dashboard." }
];

const previewItems = [
  ["Public survey links", "Share customer-safe forms without exposing reports."],
  ["Private dashboards", "Keep analytics behind authenticated company access."],
  ["PostgreSQL records", "Persist survey responses and insights in the database."],
  ["Action workflows", "Move from feedback to follow-up inside the workspace."],
  ["Role-aware actions", "Scope survey management to the owning company."],
  ["Customer clarity", "Show customers a clean survey and thank-you flow."]
];

const testimonials = [
  ["Northstar Cloud", "We finally have a clear way to understand what customers are telling us across surveys and onboarding."],
  ["Luma Finance", "The dashboard gives our team a weekly view of satisfaction trends and customer priorities."],
  ["BrightDesk", "The insights helped us improve support workflows without spending days reading raw responses."]
];

const resources = [
  ["Customer Satisfaction", "Learn how to measure satisfaction consistently across the customer journey."],
  ["Survey Best Practices", "Design surveys that customers can complete quickly and honestly."],
  ["Understanding NPS", "Use NPS to understand loyalty, advocacy, and customer experience momentum."],
  ["Collecting Better Feedback", "Ask better questions and turn responses into clearer decisions."],
  ["Customer Experience Trends", "Explore common patterns teams monitor as they improve customer experience."]
];

const faqs = [
  ["Who is this platform for?", "Teams that want a practical way to collect customer feedback, understand satisfaction, and make better customer experience decisions."],
  ["Do customers see internal analytics?", "No. Customers complete a survey and see a simple thank-you message. Insights stay inside the business workspace."],
  ["Can I invite team members?", "Yes. Workspaces are designed for owners, managers, analysts, and admins."],
  ["Can surveys be customized?", "Yes. Surveys support ratings, NPS, yes/no, dropdowns, multiple choice, and open text responses."]
];

export default function Home() {
  return (
    <AppShell>
      <main>
        <section className="analytics-grid border-b bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.16),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
          <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border bg-card px-3 py-1 text-sm text-muted-foreground shadow-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                Customer feedback intelligence
              </div>
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-normal text-foreground sm:text-6xl">
                Understand Your Customers Through Feedback and Insights
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Create surveys, collect customer feedback, uncover trends, and make informed business decisions from a single platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="shadow-sm">
                  <Link href="/register">Get Started <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
            <ProductPreview />
          </div>
        </section>

        <PlatformStatsSection />

        <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <Badge>Product value</Badge>
            <h2 className="mt-4 text-3xl font-semibold">Why Businesses Use Our Platform</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Give teams a reliable way to listen to customers, understand needs, and decide what to improve next.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="shadow-sm transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent><p className="text-sm leading-6 text-muted-foreground">{body}</p></CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="solutions" className="border-y bg-card">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <Badge>How it works</Badge>
              <h2 className="mt-4 text-3xl font-semibold">A simple workflow for better feedback</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {steps.map(({ icon: Icon, title, body }, index) => (
                <div key={title} className="rounded-lg border bg-background p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground">{index + 1}</span>
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-5 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <Badge>Privacy-first design</Badge>
            <h2 className="mt-4 text-3xl font-semibold">Public feedback collection without public business intelligence</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Customers get a focused survey experience. Teams get the analytics only after signing into the company workspace.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {previewItems.map(([label, value]) => (
              <div key={label} className="rounded-md border bg-card p-4 shadow-sm">
                <p className="text-sm font-semibold">{label}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y bg-card">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
            <div>
              <Badge>Business dashboard</Badge>
              <h2 className="mt-4 text-3xl font-semibold">Insights stay where they belong</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                Satisfaction, health, loyalty, and recommendation views live in protected company dashboards, not on the public landing page.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Customers", "Answer the survey and receive a simple thank-you screen."],
                ["Businesses", "Sign in to review responses, dashboards, and recommendations."],
                ["Platform", "Keeps collection public and intelligence private by default."]
              ].map(([title, body]) => (
                <div key={title} className="rounded-md border bg-background p-5 shadow-sm">
                  <LockKeyhole className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <Badge>Social proof</Badge>
            <h2 className="mt-4 text-3xl font-semibold">Built for teams that care about customer experience</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.map(([company, quote]) => (
              <Card key={company} className="shadow-sm">
                <CardHeader><CardTitle>{company}</CardTitle></CardHeader>
                <CardContent><p className="text-sm leading-6 text-muted-foreground">"{quote}"</p></CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-5">
            {["Northstar", "Luma", "BrightDesk", "Orbit", "Helio"].map((logo) => (
              <div key={logo} className="rounded-md border bg-card px-4 py-3 text-center text-sm font-medium text-muted-foreground">{logo}</div>
            ))}
          </div>
        </section>

        <section id="resources" className="border-y bg-card">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 max-w-2xl">
              <Badge>Resources</Badge>
              <h2 className="mt-4 text-3xl font-semibold">Learn how to collect better feedback</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              {resources.map(([title, body]) => (
                <Link key={title} href="#" className="rounded-lg border bg-background p-5 shadow-sm transition-colors hover:bg-muted">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Badge>About</Badge>
              <h2 className="mt-4 text-3xl font-semibold">Designed for thoughtful customer listening</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                The platform helps early teams and growing companies create a repeatable feedback practice without overwhelming customers or internal teams.
              </p>
            </div>
            <div className="grid gap-4">
              {faqs.map(([question, answer]) => (
                <div key={question} className="rounded-lg border bg-card p-5 shadow-sm">
                  <h3 className="font-medium">{question}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t bg-foreground text-background">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_auto] lg:items-center lg:px-8">
            <div>
              <div className="flex items-center gap-2 text-sm text-background/70">
                <PieChart className="h-4 w-4" />
                Customer feedback, satisfaction analytics, and team insights
              </div>
              <h2 className="mt-4 max-w-2xl text-3xl font-semibold">Start Collecting Customer Feedback Today</h2>
              <p className="mt-3 max-w-2xl text-background/70">
                Create surveys, gather responses, and discover insights that help your business grow.
              </p>
            </div>
            <Button asChild>
              <Link href="/register">Get Started <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="border-t bg-card py-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 text-sm text-muted-foreground sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="font-medium text-foreground">CustomerIQ</p>
            <p className="mt-1">Customer feedback and customer experience analytics platform.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {["Features", "Resources", "Documentation", "Privacy", "Terms", "Contact"].map((item) => (
              <Link key={item} href={item === "Features" ? "/#features" : item === "Resources" ? "/#resources" : "#"} className="hover:text-foreground">{item}</Link>
            ))}
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <CheckCircle2 className="h-4 w-4" />
            Built to help teams listen, learn, and improve customer experience.
          </div>
        </div>
      </footer>
    </AppShell>
  );
}
