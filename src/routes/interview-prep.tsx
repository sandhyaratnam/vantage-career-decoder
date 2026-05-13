import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, MessagesSquare, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careers, scoreCareers } from "@/lib/career-data";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/interview-prep")({
  head: () => ({
    meta: [
      { title: "Interview Prep — Vantage" },
      { name: "description", content: "Tailored interview questions and tactical strike points for the careers you're seriously considering." },
    ],
  }),
  component: PrepPage,
});

function PrepPage() {
  const { state } = useAppState();
  const ranked = useMemo(() => scoreCareers(state.answers), [state.answers]);
  const defaultId = ranked[0]?.career.id ?? careers[0].id;
  const [activeId, setActiveId] = useState(defaultId);
  const career = careers.find((c) => c.id === activeId)!;
  const fit = ranked.find((r) => r.career.id === career.id)?.fit;

  return (
    <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
      <header className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-semibold mb-3">Phase 06 · Tactical prep</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Interview prep.</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Real questions interviewers ask for these roles, plus what they're actually listening for. Pick a career, study the strike points.</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Career picker */}
        <aside className="lg:col-span-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-3 px-2">Choose a role</div>
          <div className="space-y-1">
            {careers.map((c) => {
              const active = c.id === activeId;
              const f = ranked.find((r) => r.career.id === c.id)?.fit;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between gap-2 transition-colors ${
                    active ? "bg-brand text-brand-foreground" : "hover:bg-accent"
                  }`}
                >
                  <span className="truncate">{c.title}</span>
                  {f != null && (
                    <span className={`text-[10px] font-mono tabular-nums shrink-0 ${active ? "opacity-80" : "text-brand-accent"}`}>{f}%</span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Questions */}
        <div className="lg:col-span-9 space-y-6">
          <div className="rounded-2xl bg-card border border-border p-7">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2">{career.family}</div>
                <h2 className="font-display text-2xl font-bold">{career.title}</h2>
              </div>
              {fit != null && (
                <div className="text-right">
                  <div className="font-display text-3xl font-bold text-brand-accent tabular-nums">{fit}%</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Your fit</div>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{career.dayInLife}</p>
          </div>

          <div className="space-y-4">
            {career.interviewQuestions.map((q, i) => (
              <article key={i} className="rounded-2xl bg-card border border-border p-7 hover:border-brand-accent/40 transition-colors">
                <div className="flex items-start gap-4 mb-5">
                  <div className="size-9 rounded-lg bg-brand-soft text-brand-accent grid place-items-center shrink-0 font-mono text-sm font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-brand-accent font-semibold mb-2">{q.focus}</div>
                    <p className="text-lg font-display font-semibold leading-snug text-foreground">{q.q}</p>
                  </div>
                </div>
                <div className="ml-13 pl-13 border-l-2 border-brand-accent/30 pl-5 ml-12">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Lightbulb className="size-3.5 text-brand-accent" />
                    <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Strike point</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{q.tip}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="rounded-2xl bg-brand-soft border border-brand-accent/20 p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MessagesSquare className="size-5 text-brand-accent shrink-0" />
              <p className="text-sm">Got a specific JD? Run it through the analyzer to tailor these prompts to your real role.</p>
            </div>
            <Link to="/jd-analysis">
              <Button size="sm" className="rounded-full bg-brand text-brand-foreground hover:bg-brand-accent shrink-0">
                JD analysis <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
