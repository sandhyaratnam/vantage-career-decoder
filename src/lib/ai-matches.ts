import { createServerFn } from "@tanstack/react-start";
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
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY not configured");

    const surveyContext = buildSurveyContext(data.answers);

    const prompt = `You are a career advisor. Based on this person's survey responses, generate 5-6 career matches that genuinely fit them. Only include careers that are truly relevant to their answers — if they answered around medicine and research, suggest medical/research careers. If they answered around tech and product, suggest tech careers. Never pad with unrelated options.

Survey responses:
${surveyContext}

Order matches by fit descending.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an expert career advisor. Always respond by calling the provided tool." },
          { role: "user", content: prompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_matches",
              description: "Return ranked career matches.",
              parameters: {
                type: "object",
                properties: {
                  matches: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string" },
                        family: { type: "string" },
                        industry: { type: "array", items: { type: "string" } },
                        blurb: { type: "string" },
                        fit: { type: "number" },
                        salaryLow: { type: "number" },
                        salaryHigh: { type: "number" },
                        tcNote: { type: "string" },
                        transitionTime: { type: "string" },
                        growth: { type: "string", enum: ["Cooling", "Steady", "Hot"] },
                        remote: { type: "string", enum: ["Mostly remote", "Hybrid", "On-site heavy"] },
                        nextSteps: { type: "array", items: { type: "string" } },
                        watchOut: { type: "string" },
                        tags: { type: "array", items: { type: "string" } },
                      },
                      required: ["title", "family", "industry", "blurb", "fit", "salaryLow", "salaryHigh", "transitionTime", "growth", "remote", "nextSteps", "watchOut", "tags"],
                    },
                  },
                },
                required: ["matches"],
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_matches" } },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      if (response.status === 429) throw new Error("Rate limited — please try again in a moment.");
      if (response.status === 402) throw new Error("AI credits exhausted. Add credits in Settings → Workspace → Usage.");
      throw new Error(`AI gateway error ${response.status}: ${text}`);
    }

    const json = await response.json();
    const toolCall = json.choices?.[0]?.message?.tool_calls?.[0];
    const args = toolCall?.function?.arguments;
    if (!args) throw new Error("No tool call in AI response");

    const parsed = JSON.parse(args) as { matches: AIMatch[] };
    if (!parsed.matches?.length) throw new Error("Empty matches array");
    return parsed.matches;
  });
