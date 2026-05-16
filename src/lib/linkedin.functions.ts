import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type LinkedInProfile = {
  name: string;
  currentRole: string;
  yearsExperience: string;
  education: string;
  location: string;
  about: string;
};

const inputSchema = z.object({ url: z.string().url().max(500) });

export const fetchLinkedInProfile = createServerFn({ method: "POST" })
  .inputValidator((input) => inputSchema.parse(input))
  .handler(async ({ data }): Promise<{ profile: LinkedInProfile | null; error: string | null }> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) return { profile: null, error: "AI gateway not configured" };

    if (!/linkedin\.com\/in\//i.test(data.url)) {
      return { profile: null, error: "Not a LinkedIn profile URL" };
    }

    // Try to fetch the public LinkedIn page. LinkedIn aggressively blocks
    // unauthenticated bots, so this often returns a login wall — we still
    // pass whatever we get to the model and let it extract anything useful.
    let pageText = "";
    try {
      const res = await fetch(data.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml",
        },
      });
      const html = await res.text();
      // Strip tags + collapse whitespace
      pageText = html
        .replace(/<script[\s\S]*?<\/script>/gi, " ")
        .replace(/<style[\s\S]*?<\/style>/gi, " ")
        .replace(/<[^>]+>/g, " ")
        .replace(/\s+/g, " ")
        .slice(0, 12000);
    } catch (e) {
      console.error("LinkedIn fetch failed", e);
    }

    const handleMatch = data.url.match(/linkedin\.com\/in\/([^/?#]+)/i);
    const handle = handleMatch?.[1] ?? "";

    const prompt = `Extract a professional profile from the LinkedIn page text below.
RULES:
- Only return information that is explicitly present in the page text.
- If the page is a login wall, captcha, or generic LinkedIn marketing text with no real profile data, return ALL fields as empty strings.
- Never invent companies, schools, titles, or locations from the handle "${handle}" or from general knowledge.
- "about" must be a direct paraphrase of profile content, not a guess.

PAGE TEXT:
${pageText || "(empty — page was blocked)"}`;

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You extract structured profile data from LinkedIn page text. Return via the provided tool only." },
          { role: "user", content: prompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "return_profile",
            description: "Structured LinkedIn profile",
            parameters: {
              type: "object",
              properties: {
                name: { type: "string", description: "Full name, empty if unknown" },
                currentRole: { type: "string", description: "Current title at company, e.g. 'Senior PM at Stripe'" },
                yearsExperience: { type: "string", description: "Approximate years of experience as a number string, empty if unknown" },
                education: { type: "string", description: "Highest degrees and schools, e.g. 'MBA, Wharton · BS, MIT'" },
                location: { type: "string", description: "City, region" },
                about: { type: "string", description: "2-4 sentence summary of background and focus" },
              },
              required: ["name", "currentRole", "yearsExperience", "education", "location", "about"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "return_profile" } },
      }),
    });

    if (!aiRes.ok) {
      if (aiRes.status === 429) return { profile: null, error: "Rate limited — try again in a moment." };
      if (aiRes.status === 402) return { profile: null, error: "AI credits exhausted." };
      return { profile: null, error: `AI gateway error ${aiRes.status}` };
    }

    const json = await aiRes.json();
    const args = json.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) return { profile: null, error: "No structured response from AI" };

    try {
      const profile = JSON.parse(args) as LinkedInProfile;
      return { profile, error: null };
    } catch {
      return { profile: null, error: "Could not parse AI response" };
    }
  });
