import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, FileSearch, Sparkles, Plus, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { analyzeJD, careers } from "@/lib/career-data";
import { useAppState } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/jd-analysis")({
  head: () => ({
    meta: [
      { title: "JD Analysis — Vantage" },
      { name: "description", content: "Paste a job description and see fit, matched skills, and gaps before you spend time on the application." },
    ],
  }),
  component: JDPage,
});

const SAMPLE = `Senior Product Manager — Platform
We're hiring a senior PM to own roadmap and prioritization for our developer platform. You'll partner with engineering on architecture tradeoffs, lead user research with technical buyers, and run quarterly roadmap planning. Strong metrics literacy required. Background in API products and stakeholder management is a plus. Remote-friendly.`;

function JDPage() {
  const { state, update } = useAppState();
  const [text, setText] = useState(state.lastJD || "");
  const [targetId, setTargetId] = useState<string>("");

  const analysis = useMemo(() => {
    if (!text.trim()) return null;
    const target = targetId ? careers.find((c) => c.id === targetId) : undefined;
    return analyzeJD(text, target);
  }, [text, targetId]);

  const persist = (val: string) => {
    setText(val);
    update((s) => ({ ...s, lastJD: val }));
  };

  const saveAsApp = () => {
    if (!analysis) return;
    const role = (text.split("\n")[0] || "Untitled role").slice(0, 80);
    update((s) => ({
      ...s,
      applications: [
        {
          id: crypto.randomUUID(),
          role,
          company: "—",
          careerId: analysis.targetCareer.id,
          status: "Saved",
          jd: text,
          createdAt: Date.now(),
        },
        ...s.applications,
      ],
    }));
    toast.success("Saved to your tracker");
  };

  return (
    <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
      <header className="mb-10">
        <div className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-semibold mb-3">Phase 04 · Stress-test the role</div>
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">JD analysis.</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">Paste a real job description. We extract requirements, match against your closest career, and call out gaps before you spend a week on the application.</p>
      </header>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Input */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl bg-card border border-border p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Job description</span>
              <button onClick={() => persist(SAMPLE)} className="text-[11px] uppercase tracking-wider text-brand-accent font-semibold hover:underline">
                Use sample
              </button>
            </div>
            <Textarea
              value={text}
              onChange={(e) => persist(e.target.value)}
              placeholder="Paste the job description here..."
              className="flex-1 min-h-[340px] font-mono text-[13px] leading-relaxed resize-none bg-background border-border"
            />
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>{text.length.toLocaleString()} characters</span>
              {text && <button onClick={() => persist("")} className="hover:text-foreground">Clear</button>}
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="lg:col-span-7">
          {!analysis ? (
            <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center min-h-[400px] flex flex-col items-center justify-center">
              <div className="size-12 rounded-xl bg-brand-soft text-brand-accent grid place-items-center mb-4">
                <FileSearch className="size-6" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">Paste a JD to begin</h3>
              <p className="text-sm text-muted-foreground max-w-sm">Or hit "Use sample" to see how the analyzer works on a typical PM role.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Top score */}
              <div className="rounded-2xl bg-gradient-to-br from-brand to-brand-accent text-brand-foreground p-7 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 size-48 rounded-full bg-brand-foreground/5 blur-2xl" />
                <div className="relative flex items-end justify-between gap-6 flex-wrap">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.22em] opacity-70 font-semibold mb-2">Closest career</div>
                    <div className="font-display text-2xl font-bold mb-1">{analysis.targetCareer.title}</div>
                    <p className="text-sm text-brand-foreground/70 max-w-md">{analysis.targetCareer.blurb}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-6xl font-bold tabular-nums leading-none">{analysis.fitPct}%</div>
                    <div className="text-[10px] uppercase tracking-[0.18em] opacity-70 mt-1">Fit estimate</div>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3 flex-wrap">
                  <select
                    value={targetId || analysis.targetCareer.id}
                    onChange={(e) => setTargetId(e.target.value)}
                    className="text-xs bg-brand-foreground/10 border border-brand-foreground/20 rounded-full px-3 py-1.5 text-brand-foreground"
                  >
                    {careers.map((c) => <option key={c.id} value={c.id} className="text-foreground">{c.title}</option>)}
                  </select>
                  <Button size="sm" onClick={saveAsApp} variant="secondary" className="rounded-full bg-brand-foreground text-brand hover:bg-brand-foreground/90 h-8">
                    <Plus className="size-3.5 mr-1" /> Track this role
                  </Button>
                </div>
              </div>

              {/* Matched */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Check className="size-4 text-success" />
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Matched signals</span>
                </div>
                {analysis.matched.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No keyword matches for this career — try selecting a different one above.</p>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {analysis.matched.map((m) => (
                      <span key={m} className="px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-medium border border-success/20">{m}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Gaps */}
              <div className="rounded-2xl bg-card border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="size-4 text-warn" />
                  <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">Potential gaps</span>
                </div>
                {analysis.gaps.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Solid coverage — nothing obvious is missing.</p>
                ) : (
                  <ul className="space-y-2">
                    {analysis.gaps.map((g) => (
                      <li key={g} className="flex items-center gap-3 text-sm p-3 rounded-lg bg-warn/5 border border-warn/15">
                        <div className="size-1.5 rounded-full bg-warn" />
                        <span className="font-medium">{g}</span>
                        <span className="text-muted-foreground text-xs ml-auto">Not mentioned in the JD</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Next */}
              <div className="rounded-2xl bg-brand-soft border border-brand-accent/20 p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="size-5 text-brand-accent shrink-0" />
                  <p className="text-sm">Add to your application tracker, or jump into interview prep tailored to this role.</p>
                </div>
                <Link to="/interview-prep">
                  <Button size="sm" className="rounded-full bg-brand text-brand-foreground hover:bg-brand-accent shrink-0">
                    Interview prep <ArrowRight className="size-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
