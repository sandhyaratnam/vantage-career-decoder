export type SurveyOption = { value: string; label: string; tags: string[] };
export type SurveyQuestion = {
  id: string;
  prompt: string;
  helper?: string;
  type?: "multi" | "text";
  minSelect?: number;
  maxSelect?: number;
  options?: SurveyOption[];
  placeholder?: string;
};

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: "values",
    prompt: "What matters most to you in work?",
    helper: "Pick as many as feel honestly true. There are no wrong answers — just signal.",
    type: "multi",
    minSelect: 1,
    options: [
      { value: "income", label: "High income", tags: ["strategy", "operator"] },
      { value: "autonomy", label: "Autonomy & flexibility", tags: ["operator", "builder"] },
      { value: "impact", label: "Making an impact", tags: ["mission", "strategy"] },
      { value: "challenge", label: "Intellectual challenge", tags: ["analytical", "builder"] },
      { value: "stability", label: "Stability & security", tags: ["analytical", "operator"] },
      { value: "prestige", label: "Prestige & recognition", tags: ["strategy", "people"] },
      { value: "balance", label: "Work-life balance", tags: ["operator", "analytical"] },
      { value: "creative", label: "Creative freedom", tags: ["creative", "builder"] },
      { value: "leadership", label: "Leadership & influence", tags: ["people", "strategy"] },
      { value: "helping", label: "Helping people directly", tags: ["people", "mission"] },
    ],
  },
  {
    id: "energizes",
    prompt: "What kind of work energizes you?",
    helper: "Choose every flavor of work that genuinely makes you lean in.",
    type: "multi",
    minSelect: 1,
    options: [
      { value: "problems", label: "Solving complex problems", tags: ["analytical", "builder"] },
      { value: "relationships", label: "Building relationships", tags: ["people", "strategy"] },
      { value: "systems", label: "Creating systems & structure", tags: ["builder", "operator"] },
      { value: "communicating", label: "Communicating & presenting", tags: ["people", "creative"] },
      { value: "leading", label: "Managing & leading teams", tags: ["people", "strategy"] },
      { value: "hands-on", label: "Hands-on technical work", tags: ["builder", "analytical"] },
      { value: "strategy", label: "Strategy & big picture thinking", tags: ["strategy", "analytical"] },
      { value: "research", label: "Researching & learning", tags: ["analytical", "creative"] },
      { value: "executing", label: "Executing & delivering", tags: ["operator", "builder"] },
      { value: "innovating", label: "Innovating & experimenting", tags: ["builder", "creative"] },
    ],
  },
  {
    id: "drains",
    prompt: "What tends to drain you?",
    helper: "These shape what to avoid. Be honest — your future self will thank you.",
    type: "multi",
    minSelect: 1,
    options: [
      { value: "repetitive", label: "Repetitive tasks", tags: ["builder", "creative"] },
      { value: "politics", label: "Office politics", tags: ["builder", "analytical"] },
      { value: "context-switching", label: "Constant context-switching", tags: ["analytical", "builder"] },
      { value: "bureaucracy", label: "Slow bureaucratic decisions", tags: ["operator", "builder"] },
      { value: "pressure", label: "High-stakes pressure", tags: ["analytical", "operator"] },
      { value: "isolation", label: "Working in isolation", tags: ["people", "strategy"] },
      { value: "managing", label: "Managing people", tags: ["builder", "analytical"] },
      { value: "unclear", label: "Unclear direction", tags: ["operator", "analytical"] },
      { value: "no-creative", label: "No creative input", tags: ["creative", "builder"] },
      { value: "travel", label: "Too much travel", tags: ["analytical", "builder"] },
    ],
  },
  {
    id: "skills",
    prompt: "Where do your strongest skills lie?",
    helper: "Pick every area where you've clearly outperformed peers.",
    type: "multi",
    minSelect: 1,
    options: [
      { value: "technical", label: "Technical / Engineering", tags: ["builder", "analytical"] },
      { value: "data", label: "Data & analysis", tags: ["analytical", "builder"] },
      { value: "writing", label: "Communication & writing", tags: ["creative", "people"] },
      { value: "product", label: "Product & strategy", tags: ["strategy", "builder"] },
      { value: "sales", label: "Sales & persuasion", tags: ["people", "strategy"] },
      { value: "design", label: "Design & creativity", tags: ["creative", "builder"] },
      { value: "ops", label: "Operations & execution", tags: ["operator", "people"] },
      { value: "research", label: "Research & medicine", tags: ["analytical", "mission"] },
      { value: "finance", label: "Finance & business", tags: ["analytical", "strategy"] },
      { value: "teaching", label: "Teaching & mentorship", tags: ["people", "mission"] },
    ],
  },
  {
    id: "risk",
    prompt: "What's your relationship with risk?",
    helper: "Pick the statement(s) that genuinely describe you.",
    type: "multi",
    minSelect: 1,
    options: [
      { value: "stability", label: "I want stability — predictable income and clear path", tags: ["analytical", "operator"] },
      { value: "moderate", label: "I'm open to moderate risk for upside", tags: ["operator", "strategy"] },
      { value: "uncertainty", label: "I thrive in uncertainty and love betting on myself", tags: ["strategy", "builder"] },
      { value: "career-risk", label: "Low financial risk, high career risk is fine", tags: ["builder", "creative"] },
    ],
  },
  {
    id: "horizon",
    prompt: "What's your career horizon right now?",
    helper: "This helps tune urgency, not match — pick what's true today.",
    type: "multi",
    minSelect: 1,
    options: [
      { value: "now", label: "Next role in < 6 months", tags: ["operator", "builder"] },
      { value: "transition", label: "Planning a 1–2 year transition", tags: ["strategy", "operator"] },
      { value: "exploring", label: "Exploring with no urgency", tags: ["analytical", "creative"] },
      { value: "deciding", label: "Deciding between two specific paths already", tags: ["strategy", "analytical"] },
    ],
  },
  {
    id: "situation",
    prompt: "Tell us about your current situation",
    helper: "Optional — a few sentences about where you are, what you've tried, and what's making the decision hard. We'll use this to color your recommendations.",
    type: "text",
    placeholder: "e.g. I've been a senior engineer for 6 years, considering moving into product or starting something on my own. Worried about pay cut and identity shift...",
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

export type SurveyAnswers = Record<string, string[] | string>;

export function scoreCareers(answers: SurveyAnswers) {
  const tagCounts: Record<string, number> = {};
  for (const q of surveyQuestions) {
    if (q.type === "text" || !q.options) continue;
    const ans = answers[q.id];
    if (!ans) continue;
    const values = Array.isArray(ans) ? ans : [ans];
    for (const v of values) {
      const opt = q.options.find((o) => o.value === v);
      if (!opt) continue;
      for (const t of opt.tags) tagCounts[t] = (tagCounts[t] || 0) + 1;
    }
  }
  const totalAnswered = Object.values(tagCounts).reduce((a, b) => a + b, 0) || 1;

  return careers
    .map((c) => {
      const overlap = c.tags.reduce((sum, t) => sum + (tagCounts[t] || 0), 0);
      const raw = overlap / Math.max(totalAnswered, c.tags.length);
      const fit = Math.min(98, Math.round(55 + raw * 60));
      return { career: c, fit };
    })
    .sort((a, b) => b.fit - a.fit);
}

export function analyzeJD(text: string, target?: Career) {
  const lower = text.toLowerCase();
  const allKeywords = Array.from(new Set(careers.flatMap((c) => c.sampleJDKeywords)));
  const found = allKeywords.filter((k) => lower.includes(k));
  const careerScores = careers.map((c) => {
    const hits = c.sampleJDKeywords.filter((k) => lower.includes(k));
    return { career: c, hits };
  }).sort((a, b) => b.hits.length - a.hits.length);
  const best = careerScores[0];
  const targetCareer = target ?? best.career;
  const matched = targetCareer.sampleJDKeywords.filter((k) => lower.includes(k));
  const gaps = targetCareer.sampleJDKeywords.filter((k) => !lower.includes(k));
  const strengthHits = targetCareer.coreSkills.filter((s) => lower.includes(s.toLowerCase().split(" ")[0]));
  const fitPct = Math.min(98, 50 + matched.length * 8);
  return { matched, gaps, strengthHits, fitPct, best: best.career, found, targetCareer };
}
