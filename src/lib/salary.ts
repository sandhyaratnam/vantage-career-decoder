// Adjusts a static salary band to the user's location + experience.
// Multipliers are rough but defensible — tuned for US-centric tech roles.

export type SalaryAdjustment = {
  low: number;
  high: number;
  adjusted: boolean;
  note: string;
};

export function adjustSalary(
  low: number,
  high: number,
  profile: { location?: string; yearsExperience?: string } | undefined | null,
): SalaryAdjustment {
  const loc = (profile?.location || "").toLowerCase();
  let locMult = 1.0;
  let locLabel = "";
  if (/(san francisco|bay area|\bsf\b|palo alto|mountain view|menlo)/.test(loc)) {
    locMult = 1.18; locLabel = "Bay Area";
  } else if (/(new york|\bnyc\b|manhattan|brooklyn)/.test(loc)) {
    locMult = 1.15; locLabel = "NYC";
  } else if (/(seattle|boston|los angeles|\bla\b|washington|\bdc\b|austin|san diego)/.test(loc)) {
    locMult = 1.05; locLabel = "Tier-2 US metro";
  } else if (/remote/.test(loc)) {
    locMult = 1.0; locLabel = "Remote US";
  } else if (/(london|zurich|singapore|hong kong)/.test(loc)) {
    locMult = 0.95; locLabel = "Intl. tier-1";
  } else if (/(berlin|paris|amsterdam|toronto|vancouver|sydney|dublin|tel aviv)/.test(loc)) {
    locMult = 0.85; locLabel = "Intl. tier-2";
  } else if (loc.trim()) {
    locMult = 0.82; locLabel = "Other";
  }

  const yrsMatch = (profile?.yearsExperience || "").match(/\d+/);
  const yrs = yrsMatch ? parseInt(yrsMatch[0], 10) : NaN;
  let expMult = 1.0;
  let expLabel = "";
  if (!isNaN(yrs)) {
    if (yrs <= 2) { expMult = 0.72; expLabel = "0–2 yrs"; }
    else if (yrs <= 5) { expMult = 0.88; expLabel = "3–5 yrs"; }
    else if (yrs <= 9) { expMult = 1.0; expLabel = "6–9 yrs"; }
    else if (yrs <= 14) { expMult = 1.15; expLabel = "10–14 yrs"; }
    else { expMult = 1.28; expLabel = "15+ yrs"; }
  }

  const mult = locMult * expMult;
  const adjLow = Math.round(low * mult);
  const adjHigh = Math.round(high * mult);
  const adjusted = (locLabel !== "" || expLabel !== "") && Math.abs(mult - 1) > 0.01;
  const parts = [locLabel, expLabel].filter(Boolean);
  const note = parts.length ? `Adjusted for ${parts.join(" · ")}` : "Set location + experience in Profile to personalize";
  return { low: adjLow, high: adjHigh, adjusted, note };
}
