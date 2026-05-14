import { createServerFn } from "@tanstack/react-start";
import Anthropic from "@anthropic-ai/sdk";
import { surveyQuestions } from "./career-data";

export type AIMatch = {
  title: string;
  family: string;
  industry: string[];
  blurb: string;
  fit: number;
  salaryLow: number;
  salaryHigh: number;
  tcNote?: string;
  transitionTime: string;
  growth: "Cooling" | "Steady" | "Hot";
  remote: "Mostly remote" | "Hybrid" | "On-site heavy";
  nextSteps: string[];
  watchOut: string;
  tags: string[];
};

function buildSurveyContext(answers: Record<string, string[] | string>): string {
  const lines: string[] = [];
  for (const q of surveyQuestions) {
    const ans = answers[q.id];
    if (!ans) continue;
    if (q.type === "text") {
      lines.push(`${q.prompt}: "${ans}"`);
    } else if (q.options) {
      const values = Array.isArray(ans) ? ans : [ans];
      const labels = values
        .map((v) => q.options!.find((o) => o.value === v)?.label ?? v)
        .filter(Boolean);
      if (labels.length) lines.push(`${q.prompt}: ${labels.join(", ")}`);
    }
  }
  return lines.join("\n");
}

export const generateAIMatches = createServerFn()
  .inputValidator((data: { answers: Record<string, string[] | string> }) => data)
  .handler(async ({ data }) => {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

    const client = new Anthropic({ apiKey });
    const surveyContext = buildSurveyContext(data.answers);

    const prompt = `You are a career advisor generating personalized career match recommendations.

Based on this person's survey responses:
${surveyContext}

Generate exactly 6 career matches tailored specifically to these answers. Each match should be genuinely different and relevant to their stated values, skills, and situation.

Return a JSON object with a "matches" array. Each match must have these exact fields:
- title: string (specific role title, e.g. "Senior Product Manager at FinTech Startups")
- family: string (one of: Product, Strategy, Finance, Engineering, Operations, Creative, People, Research)
- industry: string[] (2-3 specific industries, e.g. ["FinTech", "SaaS", "Big Tech"])
- blurb: string (2-3 sentences explaining why this fits this person specifically, referencing their actual answers)
- fit: number (integer 45-97, reflecting genuine alignment — top match should be 80+, range matters)
- salaryLow: number (thousands USD base, realistic for mid-senior level)
- salaryHigh: number (thousands USD total comp, realistic)
- tcNote: string (e.g. "TC incl. equity" or "Base + bonus")
- transitionTime: string (e.g. "3–6 months" or "1–2 years")
- growth: "Cooling" | "Steady" | "Hot"
- remote: "Mostly remote" | "Hybrid" | "On-site heavy"
- nextSteps: string[] (2-3 concrete first actions)
- watchOut: string (1-2 sentences on the real risk or surprise for this person specifically)
- tags: string[] (3-5 lowercase tags like "strategy", "analytical", "builder", "people", "operator", "mission", "creative")

Order matches from highest to lowest fit score. Make recommendations genuinely varied — don't cluster too many similar roles. Be honest about the watchout — it should be specific to this person's stated drains or risk tolerance.

Return only the JSON object, no other text.`;

    const message = await client.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 4000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");

    const parsed = JSON.parse(jsonMatch[0]) as { matches: AIMatch[] };
    return parsed.matches;
  });
