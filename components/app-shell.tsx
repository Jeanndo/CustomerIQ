import Link from "next/link";
import { MessageSquareHeart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b bg-card/85 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground shadow-sm">
              <MessageSquareHeart className="h-5 w-5" />
            </span>
            CustomerIQ
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Button asChild variant="ghost">
              <Link href="/">Home</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/#features">Features</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/#solutions">Solutions</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/#resources">Resources</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/#about">About</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
          </nav>
          <Button asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </header>
      {children}
    </div>
  );
}
