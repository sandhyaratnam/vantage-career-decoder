import type { Career } from "./career-data";
import { adjustSalary } from "./salary";
import type { Profile } from "./store";

type Ranked = { career: Career; fit: number };

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function exportMatchesToPDF(ranked: Ranked[], profile: Profile, industryRankings: { name: string; score: number }[]) {
  const w = window.open("", "_blank", "noopener,noreferrer");
  if (!w) { alert("Please allow pop-ups to download the PDF."); return; }

  const top = ranked[0];
  const rest = ranked.slice(1);
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  const renderCard = (r: Ranked) => {
    const sal = adjustSalary(r.career.salaryLow, r.career.salaryHigh, profile);
    return `
      <article class="card">
        <header>
          <div class="family">${esc(r.career.family)}</div>
          <div class="fit">${r.fit}%</div>
        </header>
        <h3>${esc(r.career.title)}</h3>
        <p class="blurb">${esc(r.career.blurb)}</p>
        <dl>
          <div><dt>TC${sal.adjusted ? "*" : ""}</dt><dd>$${sal.low}k–$${sal.high}k</dd></div>
          <div><dt>Transition</dt><dd>${esc(r.career.transitionTime)}</dd></div>
          <div><dt>Market</dt><dd>${esc(r.career.growth)}</dd></div>
          <div><dt>Mode</dt><dd>${esc(r.career.remote)}</dd></div>
        </dl>
        ${r.career.nextSteps.length ? `<div class="section"><strong>Next steps</strong><ul>${r.career.nextSteps.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>` : ""}
        <div class="watch"><strong>Watch out:</strong> ${esc(r.career.watchOut)}</div>
      </article>
    `;
  };

  const topSal = adjustSalary(top.career.salaryLow, top.career.salaryHigh, profile);

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Vantage Career Matches — ${esc(profile.name || "Report")}</title>
<style>
  @page { size: letter; margin: 0.6in; }
  * { box-sizing: border-box; }
  body { font: 11pt/1.45 -apple-system, "Helvetica Neue", Arial, sans-serif; color: #1a1a1a; margin: 0; }
  h1 { font-size: 28pt; margin: 0 0 4pt; letter-spacing: -0.02em; }
  h2 { font-size: 14pt; margin: 24pt 0 8pt; border-bottom: 1pt solid #ccc; padding-bottom: 4pt; }
  h3 { font-size: 12pt; margin: 0 0 4pt; }
  .meta { color: #666; font-size: 9pt; margin-bottom: 18pt; }
  .hero { background: #f5f3ee; padding: 18pt; border-radius: 8pt; margin-bottom: 14pt; }
  .hero .fit-big { font-size: 36pt; font-weight: 700; line-height: 1; }
  .hero h2 { border: none; margin: 8pt 0 6pt; font-size: 18pt; }
  .hero p { color: #333; }
  .hero dl { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10pt; margin-top: 12pt; padding-top: 10pt; border-top: 1pt solid #d8d4cb; }
  .hero dt { font-size: 8pt; text-transform: uppercase; letter-spacing: 0.08em; color: #777; }
  .hero dd { margin: 2pt 0 0; font-weight: 600; font-size: 10pt; }
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10pt; }
  .card { border: 0.5pt solid #ccc; border-radius: 6pt; padding: 10pt; page-break-inside: avoid; }
  .card header { display: flex; justify-content: space-between; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 4pt; }
  .card .fit { color: #c4654a; font-weight: 700; font-size: 10pt; }
  .card .blurb { font-size: 9.5pt; color: #444; margin: 4pt 0 6pt; }
  .card dl { display: grid; grid-template-columns: 1fr 1fr; gap: 4pt 10pt; font-size: 9pt; margin: 6pt 0; padding-top: 6pt; border-top: 0.5pt solid #e5e5e5; }
  .card dt { color: #888; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.05em; }
  .card dd { margin: 1pt 0 0; }
  .card .section { font-size: 9pt; margin-top: 6pt; }
  .card ul { margin: 2pt 0 0; padding-left: 14pt; }
  .watch { font-size: 9pt; background: #fdf6e3; border-left: 2pt solid #c4654a; padding: 6pt 8pt; margin-top: 8pt; }
  .industries { display: grid; grid-template-columns: 1fr 1fr; gap: 4pt 18pt; }
  .industries li { font-size: 10pt; list-style: none; display: flex; gap: 8pt; padding: 2pt 0; }
  .industries .name { flex: 1; }
  .industries .score { color: #c4654a; font-weight: 600; }
  .profile { font-size: 9pt; color: #555; padding: 8pt 10pt; background: #fafafa; border-radius: 4pt; margin-bottom: 14pt; }
  .footnote { font-size: 8pt; color: #888; margin-top: 12pt; font-style: italic; }
  @media print { .noprint { display: none; } body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
</style></head>
<body>
  <div class="noprint" style="padding:12pt; background:#1a1a1a; color:#fff; text-align:center; font-size:11pt;">
    Your browser's print dialog will open. Choose <strong>"Save as PDF"</strong> as the destination.
    <button onclick="window.print()" style="margin-left:12pt; padding:6pt 14pt; background:#fff; color:#1a1a1a; border:0; border-radius:4pt; cursor:pointer; font-weight:600;">Print now</button>
  </div>
  <h1>Career matches</h1>
  <div class="meta">Vantage report${profile.name ? " for " + esc(profile.name) : ""} · ${date}</div>
  ${profile.currentRole || profile.location ? `<div class="profile">${[profile.currentRole, profile.location, profile.yearsExperience ? profile.yearsExperience + " yrs experience" : ""].filter(Boolean).map(esc).join(" · ")}</div>` : ""}

  <section class="hero">
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:18pt;">
      <div style="flex:1;">
        <div style="font-size:8pt; text-transform:uppercase; letter-spacing:0.08em; color:#888;">Best alignment · ${esc(top.career.family)}</div>
        <h2>${esc(top.career.title)}</h2>
        <p>${esc(top.career.blurb)}</p>
      </div>
      <div style="text-align:right;"><div class="fit-big">${top.fit}%</div><div style="font-size:8pt; text-transform:uppercase; color:#888;">Fit</div></div>
    </div>
    <dl>
      <div><dt>Salary${topSal.adjusted ? "*" : ""}</dt><dd>$${topSal.low}k–$${topSal.high}k</dd></div>
      <div><dt>Transition</dt><dd>${esc(top.career.transitionTime)}</dd></div>
      <div><dt>Market</dt><dd>${esc(top.career.growth)}</dd></div>
      <div><dt>Mode</dt><dd>${esc(top.career.remote)}</dd></div>
    </dl>
    <div style="margin-top:12pt; font-size:9.5pt;"><strong>Next-step ladder:</strong> ${top.career.nextSteps.map(esc).join(" → ")}</div>
    <div class="watch" style="margin-top:10pt;"><strong>Watch out:</strong> ${esc(top.career.watchOut)}</div>
  </section>

  <h2>Industries that fit your profile</h2>
  <ul class="industries">${industryRankings.map((i, n) => `<li><span style="color:#aaa; width:18pt;">${String(n + 1).padStart(2, "0")}</span><span class="name">${esc(i.name)}</span><span class="score">${i.score}</span></li>`).join("")}</ul>

  <h2>Remaining matches</h2>
  <div class="grid">${rest.map(renderCard).join("")}</div>

  <div class="footnote">* Salary ranges adjusted for your location and experience. Static ranges are US-centric tech benchmarks; adjust expectations for your specific market.</div>
</body></html>`;

  w.document.open();
  w.document.write(html);
  w.document.close();
}
