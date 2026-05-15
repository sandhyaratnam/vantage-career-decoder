import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight, GitCompareArrows, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { careers, scoreCareers } from "@/lib/career-data";
import { useAppState } from "@/lib/store";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare — Vantage" },
      { name: "description", content: "Side-by-side career comparison: fit, salary, day-in-life, core skills, and adjacent tangents." },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { state, update } = useAppState();
  const ranked = useMemo(() => scoreCareers(state.answers), [state.answers]);
  const fitMap = Object.fromEntries(ranked.map((r) => [r.career.id, r.fit]));
  const selected = state.compareIds.map((id) => careers.find((c) => c.id === id)).filter(Boolean) as typeof careers;

  const remove = (id: string) => update((s) => ({ ...s, compareIds: s.compareIds.filter((x) => x !== id) }));
  const add = (id: string) => update((s) => {
    if (s.compareIds.includes(id)) return s;
    const next = [...s.compareIds, id];
    return { ...s, compareIds: next.slice(-3) };
  });

  if (selected.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-6">
        <div className="max-w-md text-center">
          <div className="size-14 rounded-2xl bg-brand-soft text-brand-accent grid place-items-center mx-auto mb-6">
            <GitCompareArrows className="size-6" />
          </div>
          <h2 className="font-display text-2xl font-bold mb-3">Nothing to compare yet</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">Add 2–3 careers from your matches and we'll lay them out side by side.</p>
          <Link to="/matches">
            <Button size="lg" className="rounded-full bg-brand text-brand-foreground hover:bg-brand-accent">
              Pick from matches <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const rows: { label: string; render: (c: typeof careers[number]) => React.ReactNode }[] = [
    { label: "Fit score", render: (c) => <span className="font-display text-3xl font-bold text-brand-accent">{fitMap[c.id] ?? "—"}%</span> },
    { label: "Family", render: (c) => <span className="text-sm text-muted-foreground">{c.family}</span> },
    { label: "Salary", render: (c) => <span className="font-mono text-sm">${c.salaryLow}k–${c.salaryHigh}k</span> },
    { label: "Growth", render: (c) => <Pill tone={c.growth === "Hot" ? "success" : "muted"}>{c.growth}</Pill> },
    { label: "Work mode", render: (c) => <span className="text-sm">{c.remote}</span> },
    { label: "Day in life", render: (c) => <p className="text-sm text-muted-foreground leading-relaxed">{c.dayInLife}</p> },
    {
      label: "Core skills",
      render: (c) => (
        <ul className="space-y-1.5">{(c.coreSkills ?? []).map((s) => <li key={s} className="text-sm flex gap-2"><span className="text-brand-accent">·</span>{s}</li>)}</ul>
      ),
    },
    {
      label: "Tangents",
      render: (c) => (
        <div className="flex flex-wrap gap-1.5">{(c.tangents ?? []).map((t) => <span key={t} className="text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-accent text-accent-foreground">{t}</span>)}</div>
      ),
    },
  ];

  const candidates = careers.filter((c) => !state.compareIds.includes(c.id));

  return (
    <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-semibold mb-3">Phase 03 · Side-by-side</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Compare paths.</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">Up to 3 at a time. Tradeoffs you'd otherwise have to hold in your head.</p>
        </div>
        <Link to="/jd-analysis">
          <Button variant="outline" className="rounded-full h-11">Next: JD analysis <ArrowRight className="size-4 ml-1.5" /></Button>
        </Link>
      </header>

      <div className="overflow-x-auto -mx-6 md:mx-0 px-6 md:px-0 pb-2">
        <table className="w-full min-w-[700px] border-separate border-spacing-3">
          <thead>
            <tr>
              <th className="w-32 align-bottom text-left">
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Attribute</span>
              </th>
              {selected.map((c) => (
                <th key={c.id} className="align-bottom text-left">
                  <div className="bg-card border border-border rounded-2xl p-5 relative">
                    <button onClick={() => remove(c.id)} className="absolute top-3 right-3 size-7 rounded-full hover:bg-accent grid place-items-center text-muted-foreground hover:text-foreground">
                      <X className="size-4" />
                    </button>
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2">{c.family}</div>
                    <div className="font-display text-xl font-bold text-foreground pr-6">{c.title}</div>
                  </div>
                </th>
              ))}
              {selected.length < 3 && (
                <th className="align-bottom text-left">
                  <div className="rounded-2xl border-2 border-dashed border-border p-5 min-h-[110px]">
                    <select
                      onChange={(e) => e.target.value && add(e.target.value)}
                      value=""
                      className="w-full bg-transparent text-sm font-medium outline-none"
                    >
                      <option value="">+ Add a career</option>
                      {candidates.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                    </select>
                  </div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="align-top pt-4">
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">{row.label}</span>
                </td>
                {selected.map((c) => (
                  <td key={c.id} className="align-top">
                    <div className="bg-card border border-border rounded-xl p-4">{row.render(c)}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 rounded-2xl bg-brand-soft border border-brand-accent/20 p-6 flex flex-col md:flex-row md:items-center gap-4 justify-between">
        <div className="flex items-start gap-4">
          <div className="size-10 rounded-lg bg-brand-accent text-brand-foreground grid place-items-center shrink-0">
            <Sparkles className="size-5" />
          </div>
          <div>
            <div className="font-semibold mb-1">Got a job description for one of these?</div>
            <p className="text-sm text-muted-foreground">Paste it into the JD analyzer to see how the role's actual requirements line up with your survey.</p>
          </div>
        </div>
        <Link to="/jd-analysis">
          <Button className="rounded-full bg-brand text-brand-foreground hover:bg-brand-accent">Analyze a JD <ArrowRight className="size-4 ml-1.5" /></Button>
        </Link>
      </div>
    </div>
  );
}

function Pill({ tone, children }: { tone: "success" | "muted"; children: React.ReactNode }) {
  return (
    <span className={`text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold ${
      tone === "success" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
    }`}>{children}</span>
  );
}
