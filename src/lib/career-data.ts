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
  industry: string[];
  tags: string[];
  salaryLow: number;
  salaryHigh: number;
  tcNote?: string;
  transitionTime: string;
  nextSteps: string[];
  watchOut: string;
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
    id: "tech-pm",
    title: "Technical Product Manager (FinTech / Big Tech)",
    family: "Product",
    industry: ["FinTech", "Big Tech", "SaaS"],
    blurb: "The natural pivot for a strong engineer with strategic chops. TPM roles at places like Stripe, Plaid, Google, or Amazon reward people who can write a spec and read a stack trace in the same hour.",
    tags: ["strategy", "people", "builder", "analytical"],
    salaryLow: 160, salaryHigh: 240, tcNote: "TC incl. equity",
    transitionTime: "3–6 months to transition",
    nextSteps: ["Group Product Manager", "Director of Product (18–24 mo)"],
    watchOut: "Breaking in at senior PM (vs. APM / PM I) is harder than expected without a prior PM title — even with an MBA. Be ready to negotiate level carefully and possibly take a short-term level step down.",
    growth: "Hot", remote: "Hybrid",
    dayInLife: "Customer calls, prioritization fights, writing crisp specs, and translating between three audiences who all use the same words to mean different things.",
    coreSkills: ["Customer research", "Prioritization frameworks", "Roadmap storytelling", "Data literacy", "Stakeholder management"],
    tangents: ["Group PM", "Head of Product", "Founder"],
    sampleJDKeywords: ["roadmap", "stakeholder", "prioritization", "user research", "metrics", "product strategy", "discovery", "api"],
    interviewQuestions: [
      { q: "How would you improve a product you use every day?", focus: "Product sense", tip: "Pick one user, one moment, one metric. Don't list ten ideas." },
      { q: "Tell me about a time you killed a feature.", focus: "Judgment", tip: "Show the data and the political work — both matter." },
      { q: "How do you say no to a senior stakeholder?", focus: "Influence", tip: "Reframe to shared goal, not opinion vs. opinion." },
    ],
  },
  {
    id: "strategy-ops",
    title: "Strategy & Operations Manager (Tech / FinTech)",
    family: "Strategy",
    industry: ["Tech", "FinTech", "E-commerce", "Marketplace"],
    blurb: "Tailor-made for MBA + technical backgrounds. Strat & Ops at Uber, Airbnb, Block, or Robinhood gets you ambiguous, high-leverage problems and exposure to executive decision-making early.",
    tags: ["strategy", "operator", "people", "analytical"],
    salaryLow: 140, salaryHigh: 200, tcNote: "TC",
    transitionTime: "3–6 months to transition",
    nextSteps: ["Chief of Staff (to CPO or CEO)", "Business Operations Lead"],
    watchOut: "These roles often skew more analytical and execution-heavy than strategic in practice — 'strategy' in the title doesn't always mean you're setting it, especially at large companies.",
    growth: "Hot", remote: "Hybrid",
    dayInLife: "Modeling a launch, running a weekly business review, jumping into a vendor escalation, and ghost-writing a memo for the CPO before lunch.",
    coreSkills: ["Strategic framing", "Financial modeling", "Project leadership", "Executive communication", "Analytical rigor"],
    tangents: ["Chief of Staff", "BizOps Lead", "Corporate Development"],
    sampleJDKeywords: ["strategy", "operations", "business", "executive", "model", "analytics", "okr", "p&l"],
    interviewQuestions: [
      { q: "Walk me through a time you reframed a problem leadership had already scoped.", focus: "Strategic judgment", tip: "Show the reframing move, not the analysis underneath." },
      { q: "How would you size the opportunity for a new product line at our company?", focus: "Structured thinking", tip: "Top-down + bottom-up, then reconcile the gap explicitly." },
    ],
  },
  {
    id: "vc-associate",
    title: "Venture Capital Associate / Investor (FinTech focus)",
    family: "Finance",
    industry: ["Venture Capital", "Private Equity", "FinTech"],
    blurb: "Engineer + top-MBA + bank-domain expertise is exactly the operator profile fintech and infrastructure VCs recruit for. Rewards strategic pattern-matching and crisp written synthesis.",
    tags: ["analytical", "strategy", "people"],
    salaryLow: 120, salaryHigh: 180, tcNote: "Base + carry; carry illiquid for years",
    transitionTime: "6–12 months to transition",
    nextSteps: ["Corporate VC (e.g. JPMorgan Ventures)", "VC-backed Startup Operator"],
    watchOut: "Associate roles are often poorly compensated vs. peers in product or banking, carry title prestige but limited real decision-making power early on, and can feel politically slow — directly conflicting with what drains many candidates.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Reading, founder calls, memo writing, partner meeting, more reading, and a dinner you couldn't say no to.",
    coreSkills: ["Market analysis", "Founder evaluation", "Memo writing", "Network building", "Pattern recognition"],
    tangents: ["Corporate VC", "Growth equity", "Operator at portfolio co"],
    sampleJDKeywords: ["thesis", "diligence", "portfolio", "memo", "venture", "valuation", "market sizing", "fintech"],
    interviewQuestions: [
      { q: "Pitch us a company you'd invest in today.", focus: "Thesis", tip: "Have one strong, contrarian view and defend it specifically." },
      { q: "Walk us through a passed deal you regret.", focus: "Pattern recognition", tip: "Show updated heuristics, not just the regret." },
    ],
  },
  {
    id: "corp-strategy",
    title: "Product / Corporate Strategy at a Bank or FinTech",
    family: "Strategy",
    industry: ["Financial Services", "FinTech", "Banking"],
    blurb: "Stay adjacent to financial services but move into an internal strategy function (Chase strategy, Visa product strategy, PayPal corp dev). Leverages domain knowledge and accelerates the path to VP / Director.",
    tags: ["strategy", "analytical", "people"],
    salaryLow: 130, salaryHigh: 190, tcNote: "Base + bonus",
    transitionTime: "3–6 months to transition",
    nextSteps: ["Management Consulting (FS practice)", "Corporate Development / M&A"],
    watchOut: "Large bank strategy teams can be deeply bureaucratic and slow-moving — the very things that drain this person — and internal politics at institutions like Chase are notoriously hard to navigate without sponsorship.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Building a 3-year plan deck, prepping the CFO for an earnings question, and refereeing two business units that both want the same investment dollars.",
    coreSkills: ["Strategy frameworks", "Executive storytelling", "Industry analysis", "Financial modeling", "Stakeholder navigation"],
    tangents: ["MBB consulting", "Corp Dev / M&A", "Chief of Staff"],
    sampleJDKeywords: ["strategy", "corporate", "competitive", "market", "executive", "stakeholder", "growth", "fintech"],
    interviewQuestions: [
      { q: "How would you frame our 3-year growth strategy?", focus: "Structured thinking", tip: "Pick a market lens (segment, geography, value chain) and commit." },
    ],
  },
  {
    id: "founder-fintech",
    title: "Founder / Co-Founder (FinTech or B2B SaaS)",
    family: "Entrepreneurship",
    industry: ["FinTech", "B2B SaaS", "Early-Stage Startup"],
    blurb: "Engineering chops + MBA from a strong entrepreneurship program + moderate risk tolerance is a credible founder profile — especially for a problem you discovered inside a major bank.",
    tags: ["strategy", "operator", "builder", "people"],
    salaryLow: 0, salaryHigh: 250, tcNote: "Highly variable; below-market early",
    transitionTime: "12–36 months (not the immediate next move)",
    nextSteps: ["EIR at a VC firm", "Startup Product Lead (pre-Series B)"],
    watchOut: "A < 6 month timeline and a desire for work-life balance are in direct tension with the founding path — this is a 2–3 year horizon play, not something to rush.",
    growth: "Hot", remote: "Hybrid",
    dayInLife: "Sales calls, pulling code out of git, hiring, payroll, a fundraising email, and dinner with a customer who hates one thing.",
    coreSkills: ["Sales", "Recruiting", "Capital allocation", "Speed of execution", "Staying calm under uncertainty"],
    tangents: ["EIR", "Operator at growth-stage co", "Repeat founder"],
    sampleJDKeywords: ["founder", "0 to 1", "early stage", "ownership", "ambiguity", "growth", "fundraising"],
    interviewQuestions: [
      { q: "Why this problem and why you?", focus: "Conviction", tip: "Connect a personal story to a real market force — both must be there." },
      { q: "What's the riskiest assumption in your plan?", focus: "Self-awareness", tip: "Name it before they do, then explain how you're testing it." },
    ],
  },
  {
    id: "systems-architect",
    title: "Staff / Principal Engineer (Systems Architect)",
    family: "Engineering",
    industry: ["Tech", "Cloud Computing", "FinTech", "Infrastructure"],
    blurb: "Designs the load-bearing structure of large software systems — the bones the rest of the org builds on.",
    tags: ["analytical", "builder", "strategy"],
    salaryLow: 180, salaryHigh: 320, tcNote: "TC incl. equity",
    transitionTime: "0–3 months (lateral move)",
    nextSteps: ["Distinguished Engineer", "CTO at small co"],
    watchOut: "At big banks the title can mean 'senior code reviewer' rather than 'systems-shaper' — vet the org's actual decision rights before accepting.",
    growth: "Hot", remote: "Mostly remote",
    dayInLife: "Whiteboard sessions, design docs, cross-team reviews, occasional deep code dives, and a lot of saying 'no, here's why' politely.",
    coreSkills: ["Distributed systems", "API design", "Tradeoff analysis", "Technical writing", "Cross-team influence"],
    tangents: ["Staff Engineer", "Platform Lead", "CTO at small co"],
    sampleJDKeywords: ["distributed", "scalability", "api", "architecture", "platform", "system design", "kubernetes", "latency"],
    interviewQuestions: [
      { q: "Walk us through a system you re-architected. What broke and what did you learn?", focus: "Judgment under tradeoffs", tip: "Lead with the constraint that forced the change, not the tech." },
      { q: "How do you decide when to build vs. buy?", focus: "Strategic thinking", tip: "Frame it as cost of delay vs. long-term ownership cost." },
    ],
  },
  {
    id: "data-scientist",
    title: "Senior Data Scientist (Product / Growth)",
    family: "Data",
    industry: ["Tech", "Healthcare", "Finance", "E-commerce"],
    blurb: "Turns messy reality into models and decisions — equal parts statistician, storyteller, and skeptic.",
    tags: ["analytical", "builder"],
    salaryLow: 160, salaryHigh: 240, tcNote: "TC",
    transitionTime: "3–6 months to transition",
    nextSteps: ["Staff Data Scientist", "Head of Analytics"],
    watchOut: "Many 'data science' postings are actually data analyst roles — read for experimentation rigor and product surface area, not just the title.",
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
    industry: ["Tech", "Consumer Products", "Media", "Agency"],
    blurb: "Shapes how a product feels and flows. The best ones make the right path the obvious path.",
    tags: ["creative", "people", "builder"],
    salaryLow: 110, salaryHigh: 190, tcNote: "TC",
    transitionTime: "6–12 months (portfolio required)",
    nextSteps: ["Design Lead", "Head of Design"],
    watchOut: "Without a portfolio of shipped flows, recruiters won't take a non-design background seriously — plan for 6+ months of side-project case studies.",
    growth: "Steady", remote: "Mostly remote",
    dayInLife: "Sketching, Figma, pulling apart a flow with a PM, watching a user fail and trying not to wince, then iterating.",
    coreSkills: ["Interaction design", "Visual systems", "Research", "Prototyping", "Critique"],
    tangents: ["Design Lead", "Brand Designer", "Design Engineer"],
    sampleJDKeywords: ["figma", "wireframe", "user research", "prototype", "design system", "interaction", "accessibility"],
    interviewQuestions: [
      { q: "Walk us through a flow you're proud of.", focus: "Process", tip: "Spend most of the time on constraints and decisions, not the final pixels." },
    ],
  },
  {
    id: "ops-leader",
    title: "Operations Leader / Chief of Staff",
    family: "Operations",
    industry: ["Tech", "Operations", "Logistics", "Healthcare"],
    blurb: "The reason things actually ship. Process, people, and the unglamorous mechanics of turning plans into outcomes.",
    tags: ["operator", "people", "strategy"],
    salaryLow: 140, salaryHigh: 230, tcNote: "Base + bonus",
    transitionTime: "3–6 months to transition",
    nextSteps: ["COO", "VP of Operations"],
    watchOut: "Chief of Staff roles are highly principal-dependent — the wrong exec turns it into glorified scheduling. Vet the principal, not the org.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Standups, dashboards, vendor calls, an unexpected fire, a hiring loop, and a 1:1 where you actually fix the thing.",
    coreSkills: ["Project management", "Process design", "Vendor management", "Hiring", "Calm under pressure"],
    tangents: ["COO", "Chief of Staff", "BizOps Lead"],
    sampleJDKeywords: ["operations", "process", "vendor", "execution", "okr", "program management", "efficiency"],
    interviewQuestions: [
      { q: "Tell me about a process you fixed end-to-end.", focus: "Systems thinking", tip: "Quantify before/after and name the people side, not just the workflow." },
    ],
  },
  {
    id: "research-scientist",
    title: "Research Scientist (ML / Applied)",
    family: "Research",
    industry: ["AI / ML", "Academia", "Big Tech", "Biotech"],
    blurb: "Pushes the frontier. Long timelines, deep specialization, and the patience to be wrong publicly.",
    tags: ["analytical", "builder"],
    salaryLow: 200, salaryHigh: 400, tcNote: "TC; frontier labs much higher",
    transitionTime: "12+ months (PhD or strong publications expected)",
    nextSteps: ["Staff Research Scientist", "Research Lead"],
    watchOut: "Without a PhD or first-author publications, the title is gated at most labs — applied scientist or research engineer is the more realistic on-ramp.",
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
    industry: ["Media", "Advertising", "Brand", "Agency"],
    blurb: "Sets the taste. Holds the line on craft when everyone else is optimizing for the meeting.",
    tags: ["creative", "people", "strategy"],
    salaryLow: 140, salaryHigh: 260, tcNote: "Base + bonus",
    transitionTime: "12+ months (portfolio + leadership track required)",
    nextSteps: ["VP of Brand", "Founder of agency"],
    watchOut: "In-house CD roles can become endless deck-polishing for execs who want it 10% worse — interview the actual creative latitude carefully.",
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

// Career-specific affinity rules: boosts raise fit, drains lower it.
type AffinityRule = {
  boosts: Partial<Record<string, string[]>>;
  drains: Partial<Record<string, string[]>>;
};

const affinityRules: Record<string, AffinityRule> = {
  "tech-pm": {
    boosts: {
      values: ["income", "impact", "leadership"],
      energizes: ["strategy", "communicating", "leading"],
      skills: ["product", "technical", "writing"],
      risk: ["moderate", "uncertainty"],
    },
    drains: {
      drains: ["politics", "managing"],
      energizes: ["hands-on", "research"],
      skills: ["design", "teaching"],
    },
  },
  "strategy-ops": {
    boosts: {
      values: ["impact", "challenge", "leadership"],
      energizes: ["strategy", "executing", "leading"],
      skills: ["ops", "finance", "product"],
      risk: ["moderate"],
    },
    drains: {
      drains: ["bureaucracy", "unclear"],
      values: ["creative", "balance"],
      skills: ["design", "teaching"],
    },
  },
  "vc-associate": {
    boosts: {
      values: ["prestige", "challenge", "income"],
      energizes: ["strategy", "research", "relationships"],
      skills: ["finance", "writing", "research"],
      risk: ["moderate", "uncertainty"],
    },
    drains: {
      drains: ["isolation", "repetitive"],
      values: ["stability", "balance"],
      horizon: ["now"],
    },
  },
  "corp-strategy": {
    boosts: {
      values: ["stability", "prestige", "income"],
      energizes: ["strategy", "communicating"],
      skills: ["finance", "writing", "product"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["bureaucracy", "politics"],
      values: ["creative", "autonomy"],
      risk: ["uncertainty"],
    },
  },
  "founder-fintech": {
    boosts: {
      values: ["autonomy", "impact", "creative"],
      energizes: ["innovating", "executing", "strategy"],
      skills: ["technical", "product", "sales"],
      risk: ["uncertainty", "career-risk"],
      horizon: ["transition", "exploring"],
    },
    drains: {
      values: ["stability", "balance", "prestige"],
      drains: ["pressure", "unclear"],
      risk: ["stability"],
      horizon: ["now"],
    },
  },
  "systems-architect": {
    boosts: {
      values: ["challenge", "autonomy"],
      energizes: ["hands-on", "systems", "problems"],
      skills: ["technical", "data"],
      risk: ["stability", "career-risk"],
    },
    drains: {
      drains: ["managing", "context-switching"],
      energizes: ["leading", "communicating"],
      skills: ["sales", "teaching"],
    },
  },
  "data-scientist": {
    boosts: {
      values: ["challenge", "balance"],
      energizes: ["research", "problems", "hands-on"],
      skills: ["data", "technical", "research"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["repetitive", "managing"],
      energizes: ["leading", "communicating"],
      skills: ["sales", "design"],
    },
  },
  "ux-designer": {
    boosts: {
      values: ["creative", "autonomy", "impact"],
      energizes: ["innovating", "hands-on", "communicating"],
      skills: ["design", "writing"],
      risk: ["career-risk", "moderate"],
    },
    drains: {
      drains: ["no-creative", "repetitive"],
      skills: ["finance", "sales", "ops"],
      energizes: ["strategy", "executing"],
    },
  },
  "ops-leader": {
    boosts: {
      values: ["impact", "leadership", "stability"],
      energizes: ["executing", "leading", "systems"],
      skills: ["ops", "writing"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["unclear", "bureaucracy"],
      values: ["creative"],
      energizes: ["hands-on", "research"],
    },
  },
  "research-scientist": {
    boosts: {
      values: ["challenge", "autonomy"],
      energizes: ["research", "problems", "innovating"],
      skills: ["technical", "data", "research"],
      risk: ["career-risk"],
      horizon: ["exploring", "transition"],
    },
    drains: {
      drains: ["repetitive", "pressure"],
      energizes: ["leading", "executing"],
      skills: ["sales", "ops"],
      horizon: ["now"],
    },
  },
  "creative-director": {
    boosts: {
      values: ["creative", "prestige", "autonomy"],
      energizes: ["communicating", "innovating", "leading"],
      skills: ["design", "writing"],
      risk: ["moderate", "career-risk"],
    },
    drains: {
      drains: ["no-creative", "politics"],
      skills: ["technical", "data", "finance"],
      energizes: ["hands-on", "systems"],
    },
  },
};

export function scoreCareers(answers: SurveyAnswers) {
  // Phase 1: tag-based baseline
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
  const totalTagHits = Object.values(tagCounts).reduce((a, b) => a + b, 0) || 1;

  // Phase 2: flat sets of selected values per question
  const selectedByQ: Record<string, Set<string>> = {};
  for (const q of surveyQuestions) {
    if (q.type === "text") continue;
    const ans = answers[q.id];
    selectedByQ[q.id] = new Set(ans ? (Array.isArray(ans) ? ans : [ans]) : []);
  }

  const hasAnyAnswers = Object.values(selectedByQ).some((s) => s.size > 0);

  return careers
    .map((c) => {
      const overlap = c.tags.reduce((sum, t) => sum + (tagCounts[t] || 0), 0);
      const baseRaw = overlap / Math.max(totalTagHits, c.tags.length);

      // Phase 3: affinity boost/drain deltas
      const rule = affinityRules[c.id];
      let affinityDelta = 0;

      if (rule && hasAnyAnswers) {
        let boostHits = 0, boostTotal = 0;
        for (const [qid, vals] of Object.entries(rule.boosts)) {
          if (!vals) continue;
          const sel = selectedByQ[qid] ?? new Set();
          for (const v of vals) { boostTotal++; if (sel.has(v)) boostHits++; }
        }
        let drainHits = 0, drainTotal = 0;
        for (const [qid, vals] of Object.entries(rule.drains)) {
          if (!vals) continue;
          const sel = selectedByQ[qid] ?? new Set();
          for (const v of vals) { drainTotal++; if (sel.has(v)) drainHits++; }
        }
        const boostRatio = boostTotal > 0 ? boostHits / boostTotal : 0;
        const drainRatio = drainTotal > 0 ? drainHits / drainTotal : 0;
        affinityDelta = boostRatio * 0.35 - drainRatio * 0.25;
      }

      const combined = Math.max(0, Math.min(1, baseRaw + affinityDelta));
      const fit = hasAnyAnswers
        ? Math.min(98, Math.max(42, Math.round(45 + combined * 53)))
        : 50;

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
