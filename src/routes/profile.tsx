import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Upload, FileText, Trash2, UserCircle2, Check, Linkedin, ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAppState, type Profile } from "@/lib/store";
import { fetchLinkedInProfile } from "@/lib/linkedin.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Vantage" },
      { name: "description", content: "Tell Vantage about yourself and upload your resume so recommendations get sharper." },
    ],
  }),
  component: ProfilePage,
});

const fields: { key: keyof Profile; label: string; placeholder: string; type?: "input" | "textarea" }[] = [
  { key: "name", label: "Name", placeholder: "Alex Chen" },
  { key: "currentRole", label: "Current role", placeholder: "Software Engineer III at Chase" },
  { key: "yearsExperience", label: "Years of experience", placeholder: "6" },
  { key: "education", label: "Education", placeholder: "MBA, Kellogg · BS CS, UIUC" },
  { key: "location", label: "Current location", placeholder: "Brooklyn, NY" },
  { key: "targetGeos", label: "Target geographies", placeholder: "NYC, SF, remote-US" },
  { key: "about", label: "About you", placeholder: "Background, what you've tried, what's making the decision hard…", type: "textarea" },
];

function ProfilePage() {
  const { state, update } = useAppState();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const profile = state.profile;

  const setField = <K extends keyof Profile>(key: K, value: Profile[K]) =>
    update((s) => ({ ...s, profile: { ...s.profile, [key]: value } }));

  const onFile = async (file: File | null) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Resume too large", { description: "Keep it under 2 MB." });
      return;
    }
    setUploading(true);
    try {
      let text = "";
      if (file.type.startsWith("text/") || /\.(txt|md)$/i.test(file.name)) {
        text = await file.text();
      } else {
        text = `[${file.name} uploaded — paste resume text below for keyword matching against JDs]`;
      }
      update((s) => ({ ...s, profile: { ...s.profile, resumeName: file.name, resumeText: text } }));
      toast.success("Resume saved", { description: file.name });
    } catch {
      toast.error("Couldn't read that file");
    } finally {
      setUploading(false);
    }
  };

  const clearResume = () => {
    update((s) => ({ ...s, profile: { ...s.profile, resumeName: "", resumeText: "" } }));
    toast.success("Resume removed");
  };

  const filledCount = (Object.keys(profile) as (keyof Profile)[]).filter((k) => k !== "resumeText" && profile[k]).length;
  const totalCount = Object.keys(profile).length - 1; // exclude resumeText (paired with resumeName)

  return (
    <div className="px-6 md:px-12 py-10 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-brand-accent font-semibold mb-3">Profile · Sharpen the signal</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">About you.</h1>
          <p className="text-muted-foreground mt-2 max-w-xl leading-relaxed">
            The more we know, the more your matches stop sounding generic. Nothing leaves your browser.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-1">Completion</div>
          <div className="font-mono text-2xl font-semibold text-brand-accent tabular-nums">{filledCount}/{totalCount}</div>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile fields */}
        <section className="lg:col-span-2 rounded-2xl bg-card border border-border p-6 md:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="size-9 rounded-lg bg-brand-soft text-brand-accent grid place-items-center">
              <UserCircle2 className="size-5" />
            </div>
            <h2 className="font-display text-lg font-bold">Personal & professional</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {fields.map((f) => (
              <div key={f.key} className={f.type === "textarea" ? "md:col-span-2" : ""}>
                <Label htmlFor={f.key} className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold mb-2 block">
                  {f.label}
                </Label>
                {f.type === "textarea" ? (
                  <Textarea
                    id={f.key}
                    value={profile[f.key] as string}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    rows={5}
                    className="bg-background border-border resize-none"
                  />
                ) : (
                  <Input
                    id={f.key}
                    value={profile[f.key] as string}
                    onChange={(e) => setField(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="bg-background border-border h-11"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* LinkedIn + Resume column */}
        <aside className="flex flex-col gap-6">

          {/* LinkedIn connect */}
          <div className="rounded-2xl bg-card border border-border p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="size-9 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] grid place-items-center">
                <Linkedin className="size-5" />
              </div>
              <h2 className="font-display text-lg font-bold">LinkedIn</h2>
            </div>
            {profile.linkedinUrl ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-border bg-background p-3 flex items-center gap-3">
                  <div className="size-8 rounded-lg bg-[#0A66C2]/10 text-[#0A66C2] grid place-items-center shrink-0">
                    <Check className="size-4" />
                  </div>
                  <span className="text-sm text-foreground/80 truncate flex-1">{profile.linkedinUrl}</span>
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-brand-accent transition-colors">
                    <ExternalLink className="size-4" />
                  </a>
                </div>
                <Input
                  value={profile.linkedinUrl}
                  onChange={(e) => setField("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/in/yourhandle"
                  className="bg-background border-border h-10 text-sm"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setField("linkedinUrl", ""); toast.success("LinkedIn disconnected"); }}
                  className="text-muted-foreground hover:text-destructive text-xs w-full"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Input
                  value={profile.linkedinUrl}
                  onChange={(e) => setField("linkedinUrl", e.target.value)}
                  placeholder="https://linkedin.com/in/yourhandle"
                  className="bg-background border-border h-11"
                />
                <Button
                  onClick={() => {
                    const url = profile.linkedinUrl.trim();
                    if (!url.includes("linkedin.com")) {
                      toast.error("Enter a valid LinkedIn URL");
                      return;
                    }
                    toast.success("LinkedIn connected", { description: "Your profile URL is saved." });
                  }}
                  className="w-full rounded-xl h-11 bg-[#0A66C2] hover:bg-[#004182] text-white"
                >
                  <Linkedin className="size-4 mr-2" /> Connect LinkedIn
                </Button>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Paste your LinkedIn profile URL. It stays in your browser only.
                </p>
              </div>
            )}
          </div>

          {/* Resume upload */}
          <div className="rounded-2xl bg-card border border-border p-6 md:p-8 h-fit">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="size-9 rounded-lg bg-brand-soft text-brand-accent grid place-items-center">
                <FileText className="size-5" />
              </div>
              <h2 className="font-display text-lg font-bold">Resume</h2>
            </div>

            {profile.resumeName ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-background p-4 flex items-start gap-3">
                  <div className="size-9 rounded-lg bg-success/15 text-success grid place-items-center shrink-0">
                    <Check className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">Saved</div>
                    <div className="text-sm font-medium truncate">{profile.resumeName}</div>
                  </div>
                  <button onClick={clearResume} className="size-8 rounded-md hover:bg-accent grid place-items-center text-muted-foreground hover:text-destructive shrink-0">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <Textarea
                  value={profile.resumeText}
                  onChange={(e) => setField("resumeText", e.target.value)}
                  placeholder="Paste full resume text here for keyword matching…"
                  rows={8}
                  className="bg-background border-border resize-none font-mono text-xs"
                />
              </div>
            ) : (
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="w-full rounded-xl border-2 border-dashed border-border hover:border-brand-accent/50 transition-colors p-8 text-center group"
                >
                  <div className="size-12 rounded-full bg-brand-soft text-brand-accent grid place-items-center mx-auto mb-3 group-hover:scale-105 transition-transform">
                    <Upload className="size-5" />
                  </div>
                  <div className="font-medium text-sm mb-1">{uploading ? "Reading…" : "Upload resume"}</div>
                  <div className="text-xs text-muted-foreground">PDF, DOCX, TXT · max 2 MB</div>
                </button>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.md"
                  className="hidden"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
                <p className="text-[11px] text-muted-foreground mt-4 leading-relaxed">
                  Tip: for best JD matching, paste your resume <em>text</em> after upload — PDF parsing happens client-side and stays imperfect.
                </p>
              </div>
            )}
          </div>

        </aside>
      </div>

      <div className="mt-10 flex justify-end">
        <Link to="/matches">
          <Button className="rounded-full h-11 bg-brand text-brand-foreground hover:bg-brand-accent">
            See your matches <ArrowRight className="size-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
