import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight, ClipboardList, GitCompareArrows, Plus, Check, TrendingUp, MapPin, DollarSign, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { scoreCareers } from "@/lib/career-data";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/matches")({
  head: () => ({
    meta: [
      { title: "Matches — Vantage" },
      { name: "description", content: "Ranked career matches based on your survey, with fit %, salary bands, and adjacent tangents." },
    ],
  }),
  component: MatchesPage,
});

function MatchesPage() {
  const { state, update } = useAppState();
  const ranked = useMemo(() => scoreCareers(state.answers).slice(0, 15), [state.answers]);
  const hasAnswers = Object.keys(state.answers).length > 0;
  const top = ranked[0];
  const rest = ranked.slice(1);

  const toggleCompare = (id: string) => {
    update((s) => {
      const exists = s.compareIds.includes(id);
      let next = exists ? s.compareIds.filter((x) => x !== id) : [...s.compareIds, id];
      if (next.length > 3) next = next.slice(-3);
      return { ...s, compareIds: next };
    });
  };

  if (!hasAnswers) {
    return (
      <EmptyState
        title="No matches yet"
        body="Take a minute to answer the survey — your matches need at least a few signals to be useful."
        cta={{ to: "/", label: "Start the survey", icon: ClipboardList }}
      />
    );
  }

  return (
    <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl">
          <div className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-semibold mb-3">Phase 02 · Ranked outcomes</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-3">Your career matches.</h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Top 15 matches from your {Object.keys(state.answers).length} answers. Pick a few to compare side-by-side, or jump straight into a job description.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {state.compareIds.length > 0 && (
            <Link to="/compare">
              <Button className="rounded-full h-11 bg-brand text-brand-foreground hover:bg-brand-accent">
                <GitCompareArrows className="size-4 mr-1.5" /> Compare ({state.compareIds.length})
              </Button>
            </Link>
          )}
          <Link to="/">
            <Button variant="outline" className="rounded-full h-11">Edit survey</Button>
          </Link>
        </div>
      </header>

      {/* Hero match */}
      <article className="rounded-3xl bg-gradient-to-br from-brand to-brand-accent text-brand-foreground p-8 md:p-12 mb-10 relative overflow-hidden shadow-elevated">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-brand-foreground/5 blur-3xl" />
        <div className="relative grid md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <div className="text-[11px] uppercase tracking-[0.22em] opacity-70 font-semibold mb-3">Best alignment</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-4">{top.career.title}</h2>
            <p className="text-brand-foreground/80 text-lg leading-relaxed max-w-xl mb-4">{top.career.blurb}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {top.career.industry.map((ind) => (
                <span key={ind} className="text-[11px] px-3 py-1 rounded-full bg-brand-foreground/20 border border-brand-foreground/30 font-semibold">{ind}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {top.career.tags.map((t) => (
                <span key={t} className="text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-brand-foreground/10 border border-brand-foreground/20">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toggleCompare(top.career.id)} variant="secondary" className="rounded-full h-11 bg-brand-foreground text-brand hover:bg-brand-foreground/90">
                {state.compareIds.includes(top.career.id) ? <><Check className="size-4 mr-1.5" /> In compare</> : <><Plus className="size-4 mr-1.5" /> Add to compare</>}
              </Button>
              <Link to="/jd-analysis">
                <Button variant="outline" className="rounded-full h-11 border-brand-foreground/30 bg-transparent text-brand-foreground hover:bg-brand-foreground/10">
                  Analyze a JD <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-3 mb-8">
              <div className="font-display text-7xl md:text-8xl font-bold tabular-nums">{top.fit}<span className="text-3xl opacity-70">%</span></div>
              <div className="text-xs uppercase tracking-[0.18em] opacity-70">Fit</div>
            </div>
            <dl className="space-y-4 text-sm">
              <Stat icon={DollarSign} label={top.career.tcNote ?? "Salary range"} value={`$${top.career.salaryLow}k – $${top.career.salaryHigh}k`} />
              <Stat icon={Clock} label="Transition" value={top.career.transitionTime} />
              <Stat icon={TrendingUp} label="Market" value={top.career.growth} />
              <Stat icon={MapPin} label="Work mode" value={top.career.remote} />
            </dl>
          </div>
        </div>

        {/* Next steps + watch out */}
        <div className="relative grid md:grid-cols-2 gap-4 mt-10 pt-8 border-t border-brand-foreground/15">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] opacity-70 font-semibold mb-3">Next-step ladder</div>
            <ul className="space-y-2">
              {top.career.nextSteps.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm">
                  <ChevronRight className="size-4 opacity-60" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-brand-foreground/10 border border-brand-foreground/15 p-4">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] opacity-80 font-semibold mb-2">
              <AlertTriangle className="size-3.5" /> Watch out
            </div>
            <p className="text-sm leading-relaxed opacity-90">{top.career.watchOut}</p>
          </div>
        </div>
      </article>

      {/* Remaining top matches */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((r) => {
          const inCompare = state.compareIds.includes(r.career.id);
          return (
            <article key={r.career.id} className="group rounded-2xl bg-card border border-border p-6 hover:border-brand-accent/40 hover:shadow-card transition-all flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">{r.career.family}</div>
                <div className="font-mono text-sm font-semibold text-brand-accent tabular-nums">{r.fit}%</div>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{r.career.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3 flex-1">{r.career.blurb}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {r.career.industry.map((ind) => (
                  <span key={ind} className="text-[10px] px-2 py-0.5 rounded-md bg-brand-soft text-brand-accent font-semibold tracking-wide">{ind}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {r.career.tags.slice(0, 3).map((t) => (
                  <Badge key={t} variant="secondary" className="text-[10px] uppercase tracking-wider font-medium">{t}</Badge>
                ))}
              </div>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px] mb-4 pt-4 border-t border-border">
                <div>
                  <dt className="uppercase tracking-wider text-muted-foreground/70 font-semibold">TC</dt>
                  <dd className="font-mono text-foreground/90 mt-0.5">${r.career.salaryLow}k–${r.career.salaryHigh}k</dd>
                </div>
                <div>
                  <dt className="uppercase tracking-wider text-muted-foreground/70 font-semibold">Transition</dt>
                  <dd className="text-foreground/90 mt-0.5">{r.career.transitionTime}</dd>
                </div>
              </dl>
              {r.career.nextSteps.length > 0 && (
                <div className="mb-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/70 font-semibold mb-1.5">Next steps</div>
                  <ul className="space-y-1">
                    {r.career.nextSteps.slice(0, 2).map((s) => (
                      <li key={s} className="text-xs text-foreground/80 flex items-start gap-1.5">
                        <ChevronRight className="size-3 mt-0.5 text-brand-accent shrink-0" /><span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-3 mb-4">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-amber-400 font-semibold mb-1">
                  <AlertTriangle className="size-3" /> Watch out
                </div>
                <p className="text-[11px] text-foreground/75 leading-relaxed line-clamp-3">{r.career.watchOut}</p>
              </div>
              <div className="flex items-center justify-end pt-3 border-t border-border">
                <Button
                  size="sm"
                  variant={inCompare ? "default" : "ghost"}
                  onClick={() => toggleCompare(r.career.id)}
                  className={`rounded-full h-8 text-xs ${inCompare ? "bg-brand text-brand-foreground hover:bg-brand-accent" : ""}`}
                >
                  {inCompare ? <><Check className="size-3 mr-1" /> Added</> : <><Plus className="size-3 mr-1" /> Compare</>}
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-9 rounded-lg bg-brand-foreground/10 grid place-items-center">
        <Icon className="size-4" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] opacity-60 font-semibold">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

function EmptyState({ title, body, cta }: { title: string; body: string; cta: { to: string; label: string; icon: React.ComponentType<{ className?: string }> } }) {
  const Icon = cta.icon;
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-6">
      <div className="max-w-md text-center">
        <div className="size-14 rounded-2xl bg-brand-soft text-brand-accent grid place-items-center mx-auto mb-6">
          <Icon className="size-6" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-3">{title}</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">{body}</p>
        <Link to={cta.to}>
          <Button size="lg" className="rounded-full bg-brand text-brand-foreground hover:bg-brand-accent">
            {cta.label} <ArrowRight className="size-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
