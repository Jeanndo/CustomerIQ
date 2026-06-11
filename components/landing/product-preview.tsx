import { CheckCircle2 } from "lucide-react";

export function ProductPreview() {
  return (
    <figure className="relative min-h-[420px] overflow-hidden rounded-lg border bg-card shadow-2xl shadow-slate-200/80">
      <img
        src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=85"
        alt="Happy customer smiling while sharing feedback with a support team"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.58)_100%)]" />
      <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
        <div className="max-w-md rounded-md border border-white/20 bg-white/12 p-4 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" />
            Customer feedback made simple
          </div>
          <p className="mt-2 text-sm leading-6 text-white/80">
            Give customers an easy way to share what is working, what is not, and what would make their experience better.
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
