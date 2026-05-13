import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Briefcase, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppState, type Application } from "@/lib/store";
import { careers } from "@/lib/career-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/applications")({
  head: () => ({
    meta: [
      { title: "Applications — Vantage" },
      { name: "description", content: "A simple kanban tracker for every role you're considering, applied to, or interviewing for." },
    ],
  }),
  component: AppsPage,
});

const STATUSES: Application["status"][] = ["Saved", "Applied", "Interviewing", "Offer", "Closed"];

function AppsPage() {
  const { state, update } = useAppState();

  const setStatus = (id: string, status: Application["status"]) =>
    update((s) => ({ ...s, applications: s.applications.map((a) => (a.id === id ? { ...a, status } : a)) }));

  const remove = (id: string) =>
    update((s) => ({ ...s, applications: s.applications.filter((a) => a.id !== id) }));

  return (
    <div className="px-6 md:px-12 py-10 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-semibold mb-3">Phase 05 · Pipeline</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Applications.</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">A calm tracker for every role in play. Drag in your head, click to advance.</p>
        </div>
        <NewAppDialog />
      </header>

      {state.applications.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-border p-16 text-center">
          <div className="size-12 rounded-xl bg-brand-soft text-brand-accent grid place-items-center mx-auto mb-4">
            <Briefcase className="size-6" />
          </div>
          <h3 className="font-display text-xl font-bold mb-2">No roles tracked yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">Add a role manually or save one from the JD analyzer.</p>
          <div className="flex justify-center gap-2 flex-wrap">
            <NewAppDialog />
            <Link to="/jd-analysis">
              <Button variant="outline" className="rounded-full">Analyze a JD <ArrowRight className="size-4 ml-1.5" /></Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {STATUSES.map((status) => {
            const items = state.applications.filter((a) => a.status === status);
            return (
              <div key={status} className="rounded-2xl bg-muted/40 p-3 min-h-[200px]">
                <div className="flex items-center justify-between px-2 py-2 mb-2">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-muted-foreground">{status}</span>
                  <span className="text-xs font-mono text-muted-foreground">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((a) => {
                    const career = a.careerId ? careers.find((c) => c.id === a.careerId) : null;
                    return (
                      <div key={a.id} className="bg-card rounded-xl p-3 border border-border shadow-sm group">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="font-medium text-sm leading-tight line-clamp-2">{a.role}</div>
                          <button onClick={() => remove(a.id)} className="text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <div className="text-xs text-muted-foreground mb-3">{a.company}</div>
                        {career && (
                          <div className="text-[10px] uppercase tracking-wider text-brand-accent font-semibold mb-3">{career.title}</div>
                        )}
                        <Select value={a.status} onValueChange={(v) => setStatus(a.id, v as Application["status"])}>
                          <SelectTrigger className="h-7 text-[11px] rounded-md">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((s) => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function NewAppDialog() {
  const { update } = useAppState();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [careerId, setCareerId] = useState<string>("");

  const submit = () => {
    if (!role.trim()) return;
    update((s) => ({
      ...s,
      applications: [
        {
          id: crypto.randomUUID(),
          role: role.trim(),
          company: company.trim() || "—",
          careerId: careerId || undefined,
          status: "Saved",
          createdAt: Date.now(),
        },
        ...s.applications,
      ],
    }));
    setRole(""); setCompany(""); setCareerId(""); setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-brand text-brand-foreground hover:bg-brand-accent">
          <Plus className="size-4 mr-1.5" /> New application
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Track a new role</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Senior Product Manager" className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="company">Company</Label>
            <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp" className="mt-1.5" />
          </div>
          <div>
            <Label>Map to a career</Label>
            <Select value={careerId} onValueChange={setCareerId}>
              <SelectTrigger className="mt-1.5"><SelectValue placeholder="Optional" /></SelectTrigger>
              <SelectContent>
                {careers.map((c) => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit} className="bg-brand text-brand-foreground hover:bg-brand-accent">Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
