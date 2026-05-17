import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { z } from "zod";
import { ArrowRight, Check, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { surveyQuestions } from "@/lib/career-data";
import { useAppState } from "@/lib/store";
import heroImg from "@/assets/welcome-hero.jpg";

export const Route = createFileRoute("/")({
  validateSearch: z.object({ q: z.coerce.number().int().min(1).optional() }),
  head: () => ({
    meta: [
      { title: "Survey — Vantage" },
      { name: "description", content: "Answer 7 quick questions and we'll map you against careers, side tangents, and real job descriptions." },
    ],
  }),
  component: SurveyPage,
});

function isAnswered(val: string[] | string | undefined, type: "multi" | "text" | undefined) {
  if (type === "text") return typeof val === "string" && val.trim().length > 0;
  return Array.isArray(val) && val.length > 0;
}

function SurveyPage() {
  const { state, update } = useAppState();
  const navigate = useNavigate();
  const { q: qParam } = Route.useSearch();
  const [started, setStarted] = useState(!!qParam);
  const [idx, setIdx] = useState(() => {
    if (qParam && qParam >= 1 && qParam <= surveyQuestions.length) return qParam - 1;
    const firstUnanswered = surveyQuestions.findIndex((q) => !isAnswered(state.answers[q.id], q.type));
    return firstUnanswered === -1 ? 0 : firstUnanswered;
  });

  const total = surveyQuestions.length;
  const answeredCount = useMemo(
    () => surveyQuestions.filter((sq) => isAnswered(state.answers[sq.id], sq.type)).length,
    [state.answers],
  );
  const allDone = answeredCount === total;
  const q = surveyQuestions[idx];
  const current = state.answers[q.id];
  const selectedArr: string[] = Array.isArray(current) ? current : [];
  const textVal: string = typeof current === "string" ? current : "";
  const canAdvance = q.type === "text"
    ? true // text question is optional
    : selectedArr.length >= (q.minSelect ?? 1);

  const toggle = (val: string) => {
    update((s) => {
      const prev = s.answers[q.id];
      const arr = Array.isArray(prev) ? prev : [];
      const max = q.maxSelect;
      let nextArr: string[];
      if (arr.includes(val)) {
        nextArr = arr.filter((v) => v !== val);
      } else {
        nextArr = max && arr.length >= max ? arr : [...arr, val];
      }
      return { ...s, answers: { ...s.answers, [q.id]: nextArr } };
    });
  };

  const setText = (val: string) => {
    update((s) => ({ ...s, answers: { ...s.answers, [q.id]: val } }));
  };

  const next = () => {
    if (idx < total - 1) setIdx(idx + 1);
    else navigate({ to: "/matches" });
  };

  const reset = () => {
    update((s) => ({ ...s, answers: {} }));
    setIdx(0);
    setStarted(false);
  };

  if (!started && answeredCount === 0) {
    return (
      <div className="relative">
        <div className="grid lg:grid-cols-2 min-h-[calc(100vh-3.5rem)]">
          <div className="flex flex-col justify-center px-8 md:px-16 py-16 max-w-2xl">
            <span className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-semibold mb-6">A guided {total}-question survey</span>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-[1.02] tracking-tight text-foreground mb-6">
              Your trajectory,<br />
              <span className="text-brand-accent italic">decoded.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
              Vantage walks you from a quick self-survey through ranked career matches, side-by-side comparisons, real job-description analysis, and interview prep — in one calm flow.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" onClick={() => setStarted(true)} className="rounded-full h-12 px-7 text-sm font-semibold bg-brand text-brand-foreground hover:bg-brand-accent">
                Begin the survey <ArrowRight className="ml-1 size-4" />
              </Button>
              <Link to="/matches">
                <Button size="lg" variant="outline" className="rounded-full h-12 px-7 text-sm font-semibold">
                  Skip — show me matches
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: String(total), v: "Questions" },
                { k: "10+", v: "Career paths" },
                { k: "~3 min", v: "Honest answer time" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl font-bold text-foreground">{s.k}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative bg-brand hidden lg:block">
            <img src={heroImg} alt="" width={1280} height={896} className="absolute inset-0 size-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand/60 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 text-brand-foreground">
              <div className="text-[10px] uppercase tracking-[0.22em] opacity-70 mb-3">Phase 01</div>
              <div className="font-display text-3xl font-semibold leading-tight">
                "The right path is the one you can defend at 11pm on a Sunday."
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-12 min-h-[calc(100vh-3.5rem)]">
      <aside className="lg:col-span-4 bg-brand text-brand-foreground p-8 md:p-12 flex flex-col justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] opacity-60 mb-4">Survey · Phase 01</div>
          <h2 className="font-display text-3xl font-bold leading-tight mb-6">Pick everything that's actually true — not just what sounds good.</h2>
          <p className="text-sm text-brand-foreground/70 leading-relaxed max-w-sm">
            Most questions accept multiple answers. Each selection nudges your match weights across {total * 2}+ traits. You can change answers later — your matches update live.
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] opacity-70">
            <span>Question {idx + 1} of {total}</span>
            <span>{Math.round(((idx + 1) / total) * 100)}%</span>
          </div>
          <div className="h-1 rounded-full bg-brand-foreground/15 overflow-hidden">
            <div className="h-full bg-brand-foreground transition-all duration-500" style={{ width: `${((idx + 1) / total) * 100}%` }} />
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {surveyQuestions.map((sq, i) => {
              const ans = isAnswered(state.answers[sq.id], sq.type);
              return (
                <button
                  key={sq.id}
                  onClick={() => setIdx(i)}
                  className={`h-8 rounded-md text-[11px] font-mono transition-all ${
                    i === idx ? "bg-brand-foreground text-brand" : ans ? "bg-brand-foreground/30 text-brand-foreground" : "bg-brand-foreground/10 text-brand-foreground/50"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      <section className="lg:col-span-8 p-8 md:p-16 flex flex-col">
        <div className="max-w-3xl flex-1">
          <div className="text-xs uppercase tracking-[0.22em] text-brand-accent font-semibold mb-6 flex items-center gap-3">
            <span>{q.id}</span>
            {q.type !== "text" && (
              <span className="text-muted-foreground font-normal normal-case tracking-normal">
                · select all that apply{selectedArr.length > 0 && ` · ${selectedArr.length} chosen`}
              </span>
            )}
            {q.type === "text" && (
              <span className="text-muted-foreground font-normal normal-case tracking-normal">· optional</span>
            )}
          </div>
          <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight text-foreground mb-3">{q.prompt}</h3>
          {q.helper && <p className="text-muted-foreground mb-10 max-w-xl">{q.helper}</p>}

          {q.type === "text" ? (
            <Textarea
              value={textVal}
              onChange={(e) => setText(e.target.value)}
              placeholder={q.placeholder}
              className="min-h-[180px] text-base leading-relaxed bg-card border-border rounded-2xl p-5"
            />
          ) : (
            <div className="flex flex-wrap gap-2.5">
              {q.options?.map((opt) => {
                const active = selectedArr.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => toggle(opt.value)}
                    className={`group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm transition-all ${
                      active
                        ? "bg-brand-accent text-brand-foreground border-brand-accent shadow-card"
                        : "bg-card text-foreground/85 border-border hover:border-brand-accent/50 hover:bg-accent/40"
                    }`}
                  >
                    <span
                      className={`size-4 rounded-full border-2 grid place-items-center shrink-0 transition-colors ${
                        active ? "border-brand-foreground bg-brand-foreground/20" : "border-border group-hover:border-brand-accent/60"
                      }`}
                    >
                      {active && <Check className="size-2.5 text-brand-foreground" strokeWidth={3.5} />}
                    </span>
                    <span className="font-medium">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-12 flex items-center justify-between gap-4 max-w-3xl">
          <Button variant="ghost" onClick={reset} className="text-muted-foreground hover:text-foreground">
            <RotateCcw className="size-4 mr-1.5" /> Restart
          </Button>
          <div className="flex items-center gap-3">
            <Button variant="outline" disabled={idx === 0} onClick={() => setIdx(idx - 1)} className="rounded-full h-11 px-5">
              Back
            </Button>
            <Button
              onClick={next}
              disabled={!canAdvance}
              className="rounded-full h-11 px-6 bg-brand text-brand-foreground hover:bg-brand-accent"
            >
              {idx === total - 1 ? (
                <>See my matches <Sparkles className="ml-1.5 size-4" /></>
              ) : (
                <>Next <ArrowRight className="ml-1.5 size-4" /></>
              )}
            </Button>
          </div>
        </div>

        {allDone && (
          <div className="mt-8 max-w-3xl text-xs text-muted-foreground">
            Survey complete. <Link to="/matches" className="text-brand-accent font-semibold underline">Jump to your matches →</Link>
          </div>
        )}
      </section>
    </div>
  );
}
