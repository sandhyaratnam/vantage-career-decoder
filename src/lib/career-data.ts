export type SurveyOption = { value: string; label: string; tags: string[] };
export type SurveyQuestion = {
  id: string;
  prompt: string;
  helper?: string;
  options: SurveyOption[];
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "environment",
    prompt: "Where do you do your best thinking?",
    helper: "Pick the setting that genuinely energizes you, not the one that sounds impressive.",
    options: [
      { value: "deep-focus", label: "Long stretches of deep, solo focus", tags: ["analytical", "builder"] },
      { value: "collab", label: "Lively rooms full of people bouncing ideas", tags: ["people", "strategy"] },
      { value: "field", label: "Out in the field, hands on real things", tags: ["operator", "people"] },
      { value: "mixed", label: "A balance — some quiet, some collaboration", tags: ["strategy", "builder"] },
    ],
  },
  {
    id: "motivation",
    prompt: "What gets you out of bed for work?",
    options: [
      { value: "impact", label: "Improving lives at scale", tags: ["mission", "strategy"] },
      { value: "craft", label: "Mastering a craft to the highest level", tags: ["builder", "analytical"] },
      { value: "autonomy", label: "Autonomy and ownership", tags: ["operator", "strategy"] },
      { value: "money", label: "Financial upside and security", tags: ["strategy", "operator"] },
    ],
  },
  {
    id: "thinking",
    prompt: "How do you naturally solve hard problems?",
    options: [
      { value: "data", label: "Models and data, top-down", tags: ["analytical", "builder"] },
      { value: "story", label: "Narrative and intuition", tags: ["creative", "people"] },
      { value: "build", label: "Prototype, test, iterate", tags: ["builder", "operator"] },
      { value: "talk", label: "Talk it through with stakeholders", tags: ["people", "strategy"] },
    ],
  },
  {
    id: "risk",
    prompt: "How do you feel about risk?",
    options: [
      { value: "high", label: "Bring it on — high variance, high reward", tags: ["strategy", "builder"] },
      { value: "medium", label: "Calculated bets with a real downside", tags: ["operator", "analytical"] },
      { value: "low", label: "Stable ground, predictable upside", tags: ["analytical", "people"] },
    ],
  },
  {
    id: "people",
    prompt: "How much of your day should involve people?",
    options: [
      { value: "lots", label: "Most of it — meetings, coaching, pitching", tags: ["people", "strategy"] },
      { value: "some", label: "Half and half", tags: ["operator", "people"] },
      { value: "little", label: "Mostly heads-down with focused syncs", tags: ["analytical", "builder"] },
    ],
  },
  {
    id: "horizon",
    prompt: "What time horizon do you enjoy thinking on?",
    options: [
      { value: "today", label: "Today — fast loops, ship now", tags: ["operator", "builder"] },
      { value: "quarter", label: "Quarters — projects and delivery", tags: ["builder", "strategy"] },
      { value: "years", label: "Years — vision and systems", tags: ["strategy", "analytical"] },
    ],
  },
  {
    id: "learning",
    prompt: "What kind of learning excites you?",
    options: [
      { value: "tech", label: "New technical primitives and tools", tags: ["builder", "analytical"] },
      { value: "human", label: "Human behavior and psychology", tags: ["people", "creative"] },
      { value: "market", label: "Markets, business models, strategy", tags: ["strategy", "operator"] },
      { value: "craft", label: "Aesthetic craft and storytelling", tags: ["creative", "people"] },
    ],
  },
];

export type Career = {
  id: string;
  title: string;
  blurb: string;
  family: string;
  tags: string[];
  salaryLow: number;
  salaryHigh: number;
  growth: "Cooling" | "Steady" | "Hot";
  remote: "Mostly remote" | "Hybrid" | "On-site heavy";
  dayInLife: string;
  coreSkills: string[];
  tangents: string[];
  sampleJDKeywords: string[];
  interviewQuestions: { q: string; focus: string; tip: string }[];
};

export const careers: Career[] = [
  {
    id: "systems-architect",
    title: "Systems Architect",
    family: "Engineering",
    blurb: "Designs the load-bearing structure of large software systems — the bones the rest of the org builds on.",
    tags: ["analytical", "builder", "strategy"],
    salaryLow: 165, salaryHigh: 240,
    growth: "Hot", remote: "Mostly remote",
    dayInLife: "Whiteboard sessions, design docs, cross-team reviews, occasional deep code dives, and a lot of saying 'no, here's why' politely.",
    coreSkills: ["Distributed systems", "API design", "Tradeoff analysis", "Technical writing", "Cross-team influence"],
    tangents: ["Staff Engineer", "Platform Lead", "CTO at small co"],
    sampleJDKeywords: ["distributed", "scalability", "api", "architecture", "platform", "system design", "kubernetes", "latency"],
    interviewQuestions: [
      { q: "Walk us through a system you re-architected. What broke and what did you learn?", focus: "Judgment under tradeoffs", tip: "Lead with the constraint that forced the change, not the tech." },
      { q: "How do you decide when to build vs. buy?", focus: "Strategic thinking", tip: "Frame it as cost of delay vs. long-term ownership cost." },
      { q: "Tell me about a design decision you regret.", focus: "Self-awareness", tip: "Pick a real one and show what you'd do differently — vague humility lands flat." },
    ],
  },
  {
    id: "product-manager",
    title: "Product Manager",
    family: "Product",
    blurb: "Owns the 'why' and 'what' — the connective tissue between users, design, engineering, and the business.",
    tags: ["strategy", "people", "builder"],
    salaryLow: 130, salaryHigh: 220,
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Customer calls, prioritization fights, writing crisp specs, and translating between three audiences who all use the same words to mean different things.",
    coreSkills: ["Customer research", "Prioritization frameworks", "Roadmap storytelling", "Data literacy", "Stakeholder management"],
    tangents: ["Group PM", "Head of Product", "Founder"],
    sampleJDKeywords: ["roadmap", "stakeholder", "prioritization", "user research", "metrics", "product strategy", "discovery"],
    interviewQuestions: [
      { q: "How would you improve a product you use every day?", focus: "Product sense", tip: "Pick one user, one moment, one metric. Don't list ten ideas." },
      { q: "Tell me about a time you killed a feature.", focus: "Judgment", tip: "Show the data and the political work — both matter." },
      { q: "How do you say no to a senior stakeholder?", focus: "Influence", tip: "Reframe to shared goal, not opinion vs. opinion." },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    family: "Data",
    blurb: "Turns messy reality into models and decisions — equal parts statistician, storyteller, and skeptic.",
    tags: ["analytical", "builder"],
    salaryLow: 140, salaryHigh: 220,
    growth: "Hot", remote: "Mostly remote",
    dayInLife: "SQL, notebooks, a meeting where someone asks 'can the data tell us X?', then more SQL, then a chart that finally makes the answer obvious.",
    coreSkills: ["Statistics", "SQL", "Python / R", "Experiment design", "Communicating uncertainty"],
    tangents: ["ML Engineer", "Research Scientist", "Analytics Lead"],
    sampleJDKeywords: ["sql", "python", "statistics", "experiment", "ab test", "modeling", "machine learning", "regression"],
    interviewQuestions: [
      { q: "Design an A/B test for a feature with low traffic.", focus: "Statistical rigor", tip: "Talk power, MDE, and what you'd do if you can't reach significance." },
      { q: "When have you been wrong about a model?", focus: "Intellectual honesty", tip: "Cover what the model missed about the real world, not just the metric." },
    ],
  },
  {
    id: "ux-designer",
    title: "UX / Product Designer",
    family: "Design",
    blurb: "Shapes how a product feels and flows. The best ones make the right path the obvious path.",
    tags: ["creative", "people", "builder"],
    salaryLow: 110, salaryHigh: 190,
    growth: "Steady", remote: "Mostly remote",
    dayInLife: "Sketching, Figma, pulling apart a flow with a PM, watching a user fail and trying not to wince, then iterating.",
    coreSkills: ["Interaction design", "Visual systems", "Research", "Prototyping", "Critique"],
    tangents: ["Design Lead", "Brand Designer", "Design Engineer"],
    sampleJDKeywords: ["figma", "wireframe", "user research", "prototype", "design system", "interaction", "accessibility"],
    interviewQuestions: [
      { q: "Walk us through a flow you're proud of.", focus: "Process", tip: "Spend most of the time on the constraints and decisions, not the final pixels." },
      { q: "How do you push back on a PM who wants something you think is wrong?", focus: "Collaboration", tip: "Show curiosity first, then a counter-proposal." },
    ],
  },
  {
    id: "founder",
    title: "Founder / Operator",
    family: "Entrepreneurship",
    blurb: "Owns everything until you can hire someone who's better. High variance, high agency, no safety net.",
    tags: ["strategy", "operator", "builder", "people"],
    salaryLow: 0, salaryHigh: 500,
    growth: "Hot", remote: "Hybrid",
    dayInLife: "Sales calls, pulling code out of git, hiring, payroll, a fundraising email, and dinner with a customer who hates one thing.",
    coreSkills: ["Sales", "Recruiting", "Capital allocation", "Speed of execution", "Staying calm under uncertainty"],
    tangents: ["VC", "Operator at growth-stage co", "Repeat founder"],
    sampleJDKeywords: ["founder", "0 to 1", "early stage", "ownership", "ambiguity", "growth", "fundraising"],
    interviewQuestions: [
      { q: "Why this problem and why you?", focus: "Conviction", tip: "Connect a personal story to a real market force — both must be there." },
      { q: "What's the riskiest assumption in your plan?", focus: "Self-awareness", tip: "Name it before they do, then explain how you're testing it." },
    ],
  },
  {
    id: "investor",
    title: "Investor / Strategist",
    family: "Finance",
    blurb: "Pattern-matches across companies and markets. Gets paid to be early and right, or late and lucky.",
    tags: ["analytical", "strategy", "people"],
    salaryLow: 150, salaryHigh: 400,
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Reading, founder calls, memo writing, partner meeting, more reading, and a dinner you couldn't say no to.",
    coreSkills: ["Market analysis", "Valuation", "Founder evaluation", "Memo writing", "Network building"],
    tangents: ["PE", "Hedge Fund", "Operator", "Founder"],
    sampleJDKeywords: ["thesis", "diligence", "portfolio", "memo", "venture", "valuation", "market sizing"],
    interviewQuestions: [
      { q: "Pitch us a company you'd invest in today.", focus: "Thesis", tip: "Have one strong, contrarian view and defend it specifically." },
      { q: "Walk us through a passed deal you regret.", focus: "Pattern recognition", tip: "Show updated heuristics, not just the regret." },
    ],
  },
  {
    id: "ops-leader",
    title: "Operations Leader",
    family: "Operations",
    blurb: "The reason things actually ship. Process, people, and the unglamorous mechanics of turning plans into outcomes.",
    tags: ["operator", "people", "strategy"],
    salaryLow: 120, salaryHigh: 210,
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Standups, dashboards, vendor calls, an unexpected fire, a hiring loop, and a 1:1 where you actually fix the thing.",
    coreSkills: ["Project management", "Process design", "Vendor management", "Hiring", "Calm under pressure"],
    tangents: ["COO", "Chief of Staff", "BizOps Lead"],
    sampleJDKeywords: ["operations", "process", "vendor", "execution", "okr", "program management", "efficiency"],
    interviewQuestions: [
      { q: "Tell me about a process you fixed end-to-end.", focus: "Systems thinking", tip: "Quantify before/after and name the people side, not just the workflow." },
      { q: "How do you prioritize when everything is on fire?", focus: "Composure", tip: "Show your decision rule, not just the heroics." },
    ],
  },
  {
    id: "research-scientist",
    title: "Research Scientist",
    family: "Research",
    blurb: "Pushes the frontier. Long timelines, deep specialization, and the patience to be wrong publicly.",
    tags: ["analytical", "builder"],
    salaryLow: 160, salaryHigh: 320,
    growth: "Hot", remote: "Hybrid",
    dayInLife: "Reading papers, running experiments, debugging training runs, writing, and arguing with co-authors at 11pm.",
    coreSkills: ["Math", "Experimental design", "Writing", "Reading deeply", "Persistence"],
    tangents: ["Applied Scientist", "Academic", "Research Engineer"],
    sampleJDKeywords: ["phd", "research", "publication", "novel", "experiment", "model", "neural", "frontier"],
    interviewQuestions: [
      { q: "Walk us through your most recent paper.", focus: "Depth", tip: "Lead with the surprise — what did the result actually contradict?" },
    ],
  },
  {
    id: "creative-director",
    title: "Creative Director",
    family: "Creative",
    blurb: "Sets the taste. Holds the line on craft when everyone else is optimizing for the meeting.",
    tags: ["creative", "people", "strategy"],
    salaryLow: 140, salaryHigh: 260,
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Reviewing work, killing the safe option, rewriting a deck, briefing a team, defending the work to a CEO who wants to make it 10% worse.",
    coreSkills: ["Taste", "Storytelling", "Team leadership", "Brand systems", "Editing"],
    tangents: ["VP of Brand", "Founder of agency", "Editor-in-Chief"],
    sampleJDKeywords: ["brand", "campaign", "creative", "storytelling", "art direction", "concept", "editorial"],
    interviewQuestions: [
      { q: "Show us work you killed.", focus: "Editorial judgment", tip: "Explain what made the chosen piece sharper, not what was wrong with the killed one." },
    ],
  },
];

export const allTags = ["analytical", "builder", "strategy", "people", "operator", "creative", "mission"] as const;

export function scoreCareers(answers: Record<string, string>) {
  const tagCounts: Record<string, number> = {};
  for (const q of surveyQuestions) {
    const ans = answers[q.id];
    if (!ans) continue;
    const opt = q.options.find((o) => o.value === ans);
    if (!opt) continue;
    for (const t of opt.tags) tagCounts[t] = (tagCounts[t] || 0) + 1;
  }
  const totalAnswered = Object.values(tagCounts).reduce((a, b) => a + b, 0) || 1;

  return careers
    .map((c) => {
      const overlap = c.tags.reduce((sum, t) => sum + (tagCounts[t] || 0), 0);
      const raw = overlap / Math.max(totalAnswered, c.tags.length);
      // map to a friendly 55–98 range so even partial fills feel meaningful
      const fit = Math.min(98, Math.round(55 + raw * 60));
      return { career: c, fit };
    })
    .sort((a, b) => b.fit - a.fit);
}

export function analyzeJD(text: string, target?: Career) {
  const lower = text.toLowerCase();
  const allKeywords = Array.from(new Set(careers.flatMap((c) => c.sampleJDKeywords)));
  const found = allKeywords.filter((k) => lower.includes(k));
  // Match against careers
  const careerScores = careers.map((c) => {
    const hits = c.sampleJDKeywords.filter((k) => lower.includes(k));
    return { career: c, hits };
  }).sort((a, b) => b.hits.length - a.hits.length);
  const best = careerScores[0];
  const targetCareer = target ?? best.career;
  const matched = targetCareer.sampleJDKeywords.filter((k) => lower.includes(k));
  const gaps = targetCareer.sampleJDKeywords.filter((k) => !lower.includes(k));
  // pick "your strengths" from coreSkills present-ish in text
  const strengthHits = targetCareer.coreSkills.filter((s) => lower.includes(s.toLowerCase().split(" ")[0]));
  const fitPct = Math.min(98, 50 + matched.length * 8);
  return { matched, gaps, strengthHits, fitPct, best: best.career, found, targetCareer };
}
