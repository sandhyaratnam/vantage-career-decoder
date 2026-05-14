import { createServerFn } from "@tanstack/react-start";
import { GoogleGenerativeAI } from "@google/generative-ai";
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
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not configured");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const surveyContext = buildSurveyContext(data.answers);

    const prompt = `You are a career advisor. Based on this person's survey responses, generate 5-6 career matches that genuinely fit them. Only include careers that are truly relevant to their answers — if they answered around medicine and research, suggest medical/research careers. If they answered around tech and product, suggest tech careers. Never pad with unrelated options.

Survey responses:
${surveyContext}

Return ONLY a valid JSON object with a "matches" array. Each match must have exactly these fields:
{
  "matches": [
    {
      "title": "specific role title",
      "family": "one of: Product, Strategy, Finance, Engineering, Operations, Creative, People, Research, Medical, Legal",
      "industry": ["2-3 specific industries"],
      "blurb": "2-3 sentences explaining why this fits this specific person based on their answers",
      "fit": integer between 50 and 96,
      "salaryLow": number in thousands USD,
      "salaryHigh": number in thousands USD,
      "tcNote": "e.g. Base + bonus or TC incl. equity",
      "transitionTime": "e.g. 3-6 months or 1-2 years",
      "growth": "Hot" or "Steady" or "Cooling",
      "remote": "Mostly remote" or "Hybrid" or "On-site heavy",
      "nextSteps": ["2-3 concrete first actions"],
      "watchOut": "1-2 sentences on the real risk for this specific person",
      "tags": ["3-5 lowercase tags from: strategy, analytical, builder, people, operator, mission, creative, technical, research, medical, legal, finance"]
    }
  ]
}

Order by fit descending. Return only the JSON, no markdown, no explanation.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");

    const parsed = JSON.parse(jsonMatch[0]) as { matches: AIMatch[] };
    if (!parsed.matches?.length) throw new Error("Empty matches array");
    return parsed.matches;
  });
