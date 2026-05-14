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
  {
    id: "physician",
    title: "Physician / Medical Doctor (MD)",
    family: "Medical",
    industry: ["Healthcare", "Hospital Systems", "Private Practice"],
    blurb: "Direct patient care with deep diagnostic reasoning and the satisfaction of tangible human impact. High income, high stakes, long road to get there.",
    tags: ["mission", "analytical", "people"],
    salaryLow: 220, salaryHigh: 450, tcNote: "Varies by specialty",
    transitionTime: "4–7 years (MD + residency if starting fresh)",
    nextSteps: ["Choose a specialty", "Apply to MD or DO programs", "Shadow physicians in target specialty"],
    watchOut: "If you're mid-career without a medical degree, the path is long and expensive. Consider PA, NP, or medical affairs roles as faster on-ramps that preserve patient proximity.",
    growth: "Steady", remote: "On-site heavy",
    dayInLife: "Rounds, diagnostics, procedures, difficult conversations with families, charting, and the occasional moment that makes it all worth it.",
    coreSkills: ["Clinical reasoning", "Patient communication", "Diagnostic thinking", "Anatomy & physiology", "Decision under uncertainty"],
    tangents: ["Physician-Scientist", "Medical Director", "Healthcare Consultant"],
    sampleJDKeywords: ["patient care", "clinical", "diagnosis", "treatment", "residency", "md", "board certified", "ehr"],
    interviewQuestions: [
      { q: "Why medicine and why this specialty?", focus: "Motivation", tip: "Be specific — 'I want to help people' is never enough." },
    ],
  },
  {
    id: "clinical-research",
    title: "Clinical Research Scientist / Associate",
    family: "Research",
    industry: ["Pharma", "Biotech", "CRO", "Academic Medical Center"],
    blurb: "Designs and runs trials that determine whether drugs and devices actually work. The rigor of science with real-world patient stakes.",
    tags: ["analytical", "research", "mission"],
    salaryLow: 90, salaryHigh: 160, tcNote: "Base + bonus",
    transitionTime: "3–6 months (life science background helps)",
    nextSteps: ["Get GCP certified", "Apply to CRO or pharma clinical ops roles", "Build protocol writing samples"],
    watchOut: "The field is heavily regulated and slower-paced than tech. If you need to see fast results, this will test your patience — trials take years.",
    growth: "Hot", remote: "Hybrid",
    dayInLife: "Reviewing protocol amendments, monitoring site visits, working with IRBs, cleaning data, and writing CSRs no one wants to read but everyone needs.",
    coreSkills: ["Protocol design", "GCP compliance", "Data management", "Statistical literacy", "Regulatory writing"],
    tangents: ["Clinical Trial Manager", "Regulatory Affairs", "Medical Affairs"],
    sampleJDKeywords: ["clinical trial", "protocol", "gcp", "irb", "crf", "site monitoring", "regulatory", "phase ii", "biostatistics"],
    interviewQuestions: [
      { q: "Walk me through a protocol deviation and how you handled it.", focus: "Regulatory judgment", tip: "Show you know the difference between a deviation and a violation." },
    ],
  },
  {
    id: "medical-affairs",
    title: "Medical Affairs Manager (Pharma / Biotech)",
    family: "Medical",
    industry: ["Pharma", "Biotech", "Medical Devices"],
    blurb: "The scientific conscience of a pharma company — bridging clinical evidence, KOL relationships, and commercial teams without crossing the line.",
    tags: ["mission", "people", "analytical", "strategy"],
    salaryLow: 130, salaryHigh: 220, tcNote: "Base + bonus",
    transitionTime: "6–12 months (PharmD, MD, or PhD strongly preferred)",
    nextSteps: ["Get an advanced science degree if you don't have one", "Target MSL or Medical Science Liaison roles first", "Build KOL relationships in your therapeutic area"],
    watchOut: "The 'medical vs. commercial' tension is real and daily. If you hate internal politics, the line between scientific integrity and business pressure will grind you down.",
    growth: "Hot", remote: "Hybrid",
    dayInLife: "Advisory board prep, KOL meetings, reviewing promotional material for scientific accuracy, responding to unsolicited medical info requests.",
    coreSkills: ["Scientific communication", "KOL management", "Regulatory knowledge", "Therapeutic area expertise", "Influence without authority"],
    tangents: ["Medical Director", "Clinical Development", "HEOR"],
    sampleJDKeywords: ["kol", "medical science liaison", "msl", "therapeutic area", "pharmacovigilance", "medical information", "clinical evidence"],
    interviewQuestions: [
      { q: "How do you handle a commercial team pushing you to say something you can't scientifically support?", focus: "Integrity under pressure", tip: "Show the diplomatic version — not the confrontational one." },
    ],
  },
  {
    id: "public-health",
    title: "Public Health Analyst / Epidemiologist",
    family: "Research",
    industry: ["Government", "NGO", "Academic", "Healthcare Systems"],
    blurb: "Works at the intersection of data, policy, and population-level impact. The kind of person who sees a trend in a dataset and thinks about the 10,000 people behind it.",
    tags: ["analytical", "mission", "research"],
    salaryLow: 65, salaryHigh: 130, tcNote: "Base; government roles include strong benefits",
    transitionTime: "6–18 months (MPH preferred but not always required)",
    nextSteps: ["Get an MPH or certificate in epidemiology", "Apply to local/state health departments", "Volunteer for outbreak investigation work"],
    watchOut: "Government and academic public health roles pay significantly less than pharma or tech. If income is a top priority, this field will require compromise.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Surveillance data analysis, writing policy briefs, running community assessments, presenting to health boards, and making complex data legible to non-scientists.",
    coreSkills: ["Epidemiological methods", "Statistical analysis", "Policy writing", "Community engagement", "Data visualization"],
    tangents: ["Health Policy Analyst", "Biostatistician", "Global Health Advisor"],
    sampleJDKeywords: ["epidemiology", "surveillance", "public health", "mph", "outbreak", "sas", "r", "cohort", "odds ratio", "intervention"],
    interviewQuestions: [
      { q: "Design a study to assess the effectiveness of a new public health intervention.", focus: "Methods", tip: "Pick your design before you defend it — don't waffle." },
    ],
  },
  {
    id: "biotech-scientist",
    title: "Biotech / Life Science Research Scientist",
    family: "Research",
    industry: ["Biotech", "Pharma", "Academic Research"],
    blurb: "Bench to breakthrough. Designs experiments to understand biological mechanisms, develop therapeutics, or build tools that other scientists use.",
    tags: ["analytical", "research", "builder"],
    salaryLow: 90, salaryHigh: 170, tcNote: "Base + equity at startups",
    transitionTime: "12+ months (PhD typically expected for independent scientist roles)",
    nextSteps: ["Target associate scientist roles if PhD-free", "Build a publication or patent record", "Network at AACR, ASH, or relevant conferences"],
    watchOut: "The academic-to-industry transition is real: industry moves faster, kills projects without warning, and rewards commercial relevance over scientific elegance.",
    growth: "Hot", remote: "Hybrid",
    dayInLife: "PCR, protein assays, FACS, failure, troubleshooting, a data discussion with your PI, reading three papers before lunch, and one that changes your hypothesis.",
    coreSkills: ["Experimental design", "Lab techniques", "Data analysis", "Scientific writing", "Troubleshooting"],
    tangents: ["Principal Scientist", "Research Director", "CSO at startup"],
    sampleJDKeywords: ["phd", "assay", "pcr", "cell biology", "protein", "crispr", "in vivo", "bench", "molecular biology", "pipeline"],
    interviewQuestions: [
      { q: "Tell me about an experiment that failed and what you learned.", focus: "Scientific reasoning", tip: "Explain how you changed your hypothesis, not just how you fixed the protocol." },
    ],
  },
  {
    id: "healthcare-consultant",
    title: "Healthcare Strategy Consultant",
    family: "Strategy",
    industry: ["Healthcare", "Hospital Systems", "Life Sciences", "Consulting"],
    blurb: "Brings strategy and data to healthcare orgs that desperately need both. Strong pay, intense pace, and a meaningful sector.",
    tags: ["strategy", "analytical", "people"],
    salaryLow: 120, salaryHigh: 200, tcNote: "Base + bonus",
    transitionTime: "3–6 months",
    nextSteps: ["Target health systems and payer strategy practice at Big 4 or boutiques (Huron, Navigant)", "Get comfortable with hospital finance and value-based care models"],
    watchOut: "Healthcare consulting can feel like rearranging deck chairs — you'll write recommendations that implementation teams dilute beyond recognition. Track outcomes, not just deliverables.",
    growth: "Hot", remote: "Hybrid",
    dayInLife: "Stakeholder interviews, cost modeling, slide decks for health system CFOs, and navigating a 90-person client meeting with 11 competing agendas.",
    coreSkills: ["Healthcare economics", "Financial modeling", "Stakeholder management", "Structured thinking", "Executive communication"],
    tangents: ["Health System Strategy Director", "Value-based Care Lead", "Digital Health PM"],
    sampleJDKeywords: ["health system", "payer", "value-based care", "clinical operations", "revenue cycle", "population health", "strategy"],
    interviewQuestions: [
      { q: "A hospital's OR utilization is at 65%. What's your diagnostic approach?", focus: "Problem structuring", tip: "Separate supply constraints from demand constraints before you solve anything." },
    ],
  },
  {
    id: "corporate-attorney",
    title: "Corporate Attorney / In-House Counsel",
    family: "Legal",
    industry: ["Law", "Finance", "Tech", "Private Equity"],
    blurb: "Structures deals, manages risk, and translates legalese into business decisions. In-house roles trade compensation for autonomy and actual business partnership.",
    tags: ["analytical", "strategy", "people"],
    salaryLow: 130, salaryHigh: 300, tcNote: "Big Law much higher; in-house varies",
    transitionTime: "3 years (JD + bar required if starting fresh)",
    nextSteps: ["If no JD: target legal ops or compliance roles as a bridge", "If JD: lateral to in-house from a firm after 2–4 years"],
    watchOut: "Big Law pays well but takes everything. In-house is better for balance but the quality of work varies wildly by company. Vet the GC and the legal team's influence on decisions.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Contract redlines, a board prep call, a regulatory question from the CFO, a vendor dispute, and a 4pm deal emergency you didn't see coming.",
    coreSkills: ["Contract law", "Risk analysis", "Negotiation", "Regulatory compliance", "Business judgment"],
    tangents: ["General Counsel", "Chief Compliance Officer", "Legal Ops"],
    sampleJDKeywords: ["jd", "bar", "contract", "m&a", "securities", "compliance", "regulatory", "litigation", "counsel", "corporate governance"],
    interviewQuestions: [
      { q: "Tell me about a time you had to say no to a business team on a deal they wanted.", focus: "Business judgment", tip: "Show how you gave them options, not just a wall." },
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Regulatory Affairs Manager",
    family: "Legal",
    industry: ["FinTech", "Healthcare", "Pharma", "Financial Services"],
    blurb: "Keeps organizations on the right side of regulators without paralyzing the business. The unglamorous work that prevents eight-figure fines.",
    tags: ["analytical", "operator", "mission"],
    salaryLow: 100, salaryHigh: 180, tcNote: "Base + bonus",
    transitionTime: "3–6 months",
    nextSteps: ["Get CRCM, CHPC, or RAC certification for your industry", "Join a fintech or pharma compliance team in a specialist role first"],
    watchOut: "Compliance roles can become reactive box-checking at large companies. Seek orgs where compliance has a seat at the product table, not just the audit committee.",
    growth: "Hot", remote: "Hybrid",
    dayInLife: "Reviewing marketing copy, fielding regulator inquiries, running AML monitoring, training business teams, and racing to interpret a new guidance document.",
    coreSkills: ["Regulatory interpretation", "Risk assessment", "Policy writing", "Audit preparation", "Stakeholder training"],
    tangents: ["Chief Compliance Officer", "Regulatory Affairs Director", "Legal Counsel"],
    sampleJDKeywords: ["compliance", "regulatory", "aml", "bsa", "cfpb", "fda", "gdpr", "hipaa", "audit", "risk management"],
    interviewQuestions: [
      { q: "How do you balance regulatory requirements with business velocity?", focus: "Business partnership", tip: "Frame compliance as risk calibration, not rule enforcement." },
    ],
  },
  {
    id: "content-strategist",
    title: "Content Strategist / Editorial Lead",
    family: "Creative",
    industry: ["Media", "SaaS", "Agency", "Publishing"],
    blurb: "Owns the voice, the structure, and the distribution of content that actually gets read. At its best, a content strategy function is a growth engine.",
    tags: ["creative", "strategy", "analytical"],
    salaryLow: 90, salaryHigh: 170, tcNote: "Base + bonus",
    transitionTime: "3–6 months (strong portfolio required)",
    nextSteps: ["Build a portfolio of high-performing pieces with measurable results", "Learn SEO, distribution strategy, and editorial ops tools"],
    watchOut: "Many 'content strategy' roles are actually content production roles with a fancier title. Look for orgs where content strategy directly informs product or go-to-market decisions.",
    growth: "Steady", remote: "Mostly remote",
    dayInLife: "Editorial calendar reviews, briefing writers, optimizing a landing page, arguing for a content investment with the CMO, and rewriting a headline 12 times.",
    coreSkills: ["Editorial judgment", "SEO", "Audience research", "Narrative structure", "Distribution strategy"],
    tangents: ["VP of Content", "Head of Brand", "Managing Editor"],
    sampleJDKeywords: ["content strategy", "editorial", "seo", "brand voice", "content calendar", "copy", "narrative", "thought leadership"],
    interviewQuestions: [
      { q: "Show me a content decision you made that was counterintuitive but worked.", focus: "Editorial judgment", tip: "Bring a metric — not just a story." },
    ],
  },
  {
    id: "management-consultant",
    title: "Management Consultant (Strategy / Big 4)",
    family: "Strategy",
    industry: ["Consulting", "Professional Services", "Finance"],
    blurb: "Solves messy executive-level problems across industries. Intense, well-compensated, and an extremely fast track to business pattern recognition.",
    tags: ["strategy", "analytical", "people"],
    salaryLow: 130, salaryHigh: 230, tcNote: "Base + bonus; MBB higher",
    transitionTime: "3–6 months",
    nextSteps: ["Prepare MECE case frameworks", "Target industry practices that align with long-term interests", "MBA can accelerate to the post-MBA associate level at MBB"],
    watchOut: "The 80-hour weeks and travel are not myths. Consulting buys you pattern recognition and exit options — but at a real lifestyle cost. Know your window before you're in it.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "A 6am flight, a client kickoff you're leading, an analysis you need to rework, a late deck, and a team dinner that somehow becomes the highlight.",
    coreSkills: ["Hypothesis-driven thinking", "Slide writing", "Financial modeling", "Stakeholder management", "MECE structuring"],
    tangents: ["Private Equity", "Chief of Staff", "Corporate Strategy"],
    sampleJDKeywords: ["strategy", "consulting", "mba", "client", "frameworks", "mece", "problem solving", "deliverable", "pmo"],
    interviewQuestions: [
      { q: "How would you estimate the market size for electric vehicle charging stations in the US?", focus: "Structured estimation", tip: "Top-down and bottom-up — then reconcile the delta and explain it." },
    ],
  },
  {
    id: "nonprofit-director",
    title: "Nonprofit Program Director / Social Impact Lead",
    family: "People",
    industry: ["Nonprofit", "Social Enterprise", "Government", "Philanthropy"],
    blurb: "Runs programs that close gaps in healthcare, education, or economic opportunity. Meaningful work, tight budgets, and the pressure of accountability without enough resources.",
    tags: ["mission", "people", "operator"],
    salaryLow: 70, salaryHigh: 130, tcNote: "Base; benefits vary widely",
    transitionTime: "3–6 months",
    nextSteps: ["Target program management roles at issue areas you care about", "Get comfortable with grant writing and impact measurement frameworks"],
    watchOut: "Passion is not enough to survive nonprofit leadership — you'll need strong operational and fundraising skills to avoid burning out or getting cut. Fundraising is the job.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Funder calls, program staff 1:1s, impact measurement reviews, a grant report deadline, and a community event that reminds you why you do this.",
    coreSkills: ["Program management", "Grant writing", "Impact measurement", "Coalition building", "Budget management"],
    tangents: ["Executive Director", "Foundation Program Officer", "Government Policy"],
    sampleJDKeywords: ["nonprofit", "program", "grant", "impact", "community", "evaluation", "stakeholder", "mission", "social determinants"],
    interviewQuestions: [
      { q: "How do you measure impact in a program where outcomes take years to show up?", focus: "Measurement thinking", tip: "Distinguish leading indicators from lagging outcomes — and name both." },
    ],
  },
  {
    id: "academic-researcher",
    title: "Academic Researcher / Professor",
    family: "Research",
    industry: ["Academia", "University", "Think Tank"],
    blurb: "Generates original knowledge, trains the next generation, and has the rarest professional luxury: genuine intellectual autonomy. Tenure-track is brutal to get; once in, deeply rewarding.",
    tags: ["research", "mission", "analytical", "creative"],
    salaryLow: 80, salaryHigh: 200, tcNote: "Varies by institution and field; often includes summers off",
    transitionTime: "5–10 years (PhD + postdoc typical track)",
    nextSteps: ["Complete a PhD in your field", "Do a postdoc or research fellowship", "Build a publication record before going on the job market"],
    watchOut: "The academic job market is one of the most competitive in any profession. Plan for the alt-ac (industry research) path as a parallel track, not a fallback.",
    growth: "Cooling", remote: "Hybrid",
    dayInLife: "Writing, reading, grant applications, mentoring PhD students, teaching, faculty meetings that go nowhere, and the occasional moment of discovery.",
    coreSkills: ["Research design", "Academic writing", "Grant writing", "Teaching", "Long-horizon thinking"],
    tangents: ["Research Director", "Think Tank Fellow", "Chief Science Officer"],
    sampleJDKeywords: ["phd", "research", "publication", "grant", "tenure", "faculty", "postdoc", "peer review", "curriculum"],
    interviewQuestions: [
      { q: "What is the central question your research program addresses and why does it matter?", focus: "Research vision", tip: "Be able to say it in two sentences to a smart non-expert." },
    ],
  },
  {
    id: "financial-analyst",
    title: "Financial Analyst / Investment Analyst",
    family: "Finance",
    industry: ["Investment Banking", "Asset Management", "Corporate Finance", "Private Equity"],
    blurb: "Translates complex financial data into decisions that move capital. Intense hours early, but builds an analytical foundation that opens nearly every senior business door.",
    tags: ["analytical", "strategy", "operator"],
    salaryLow: 100, salaryHigh: 220, tcNote: "Base + significant bonus",
    transitionTime: "3–6 months",
    nextSteps: ["Get CFA Level 1 if buy-side", "Target rotational analyst programs at banks or asset managers", "Build modeling fluency in Excel and financial statement analysis"],
    watchOut: "Investment banking hours at the analyst level are extreme. The exits are excellent — PE, hedge fund, corp dev — but you have to survive the first two years first.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Building models, updating comps, pulling data for a pitch book, a last-minute revision at 11pm, and a moment where your analysis actually changes a decision.",
    coreSkills: ["Financial modeling", "Valuation", "Data analysis", "Excel", "Presentation"],
    tangents: ["Private Equity Associate", "Corporate Development", "CFO track"],
    sampleJDKeywords: ["financial modeling", "valuation", "dcf", "lbo", "pitch book", "bloomberg", "cfa", "ib", "m&a", "equity research"],
    interviewQuestions: [
      { q: "Walk me through a DCF.", focus: "Technical", tip: "Lead with the intuition, not the formula — show you understand what you're discounting and why." },
    ],
  },
  {
    id: "hr-people",
    title: "HR Business Partner / People Operations Lead",
    family: "People",
    industry: ["Tech", "Healthcare", "Financial Services", "Consulting"],
    blurb: "The strategic interface between the business and its people systems. At its best, the role that makes high-performing cultures possible. At its worst, the person HR calls to deliver bad news.",
    tags: ["people", "operator", "strategy"],
    salaryLow: 100, salaryHigh: 190, tcNote: "Base + bonus",
    transitionTime: "3–6 months",
    nextSteps: ["Get SHRM-CP or PHR certification", "Target tech companies where HR has strategic influence and real headcount decisions"],
    watchOut: "HRBP roles range from deeply strategic to purely administrative depending on the org. The difference is whether you're in the room when business decisions get made — not after.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Manager coaching, a reorg conversation, compensation cycle prep, an escalation, a new hire onboarding, and a culture initiative that you're quietly not sure will land.",
    coreSkills: ["Employee relations", "Organizational design", "Coaching", "Compensation", "Data-driven people analytics"],
    tangents: ["VP of People", "Chief People Officer", "Talent Strategy"],
    sampleJDKeywords: ["hrbp", "people operations", "talent management", "employee relations", "organizational design", "compensation", "diversity", "performance management"],
    interviewQuestions: [
      { q: "Tell me about a time you pushed back on a manager's people decision.", focus: "Courage + influence", tip: "Name the specific risk you flagged — not just that you 'had a conversation'." },
    ],
  },
  {
    id: "science-writer",
    title: "Science Writer / Medical Communicator",
    family: "Creative",
    industry: ["Publishing", "Pharma", "Biotech", "Media", "Academia"],
    blurb: "Translates complex science into prose that non-experts can actually use. One of the few careers where deep expertise and literary craft intersect.",
    tags: ["creative", "research", "analytical", "mission"],
    salaryLow: 65, salaryHigh: 140, tcNote: "Base; freelance varies widely",
    transitionTime: "3–6 months (portfolio of published writing required)",
    nextSteps: ["Build a portfolio writing for journals, science blogs, or health outlets", "Target medical communications agencies for entry into pharma writing", "Get AMWA certification for medical writing"],
    watchOut: "Pure science journalism pays poorly. Medical writing for pharma/CROs pays significantly better but can feel constrained — you're writing within regulatory guardrails.",
    growth: "Steady", remote: "Mostly remote",
    dayInLife: "Reading papers, interviewing researchers, writing and rewriting, fact-checking obsessively, pitching editors, and arguing about whether that sentence is too technical.",
    coreSkills: ["Scientific literacy", "Narrative craft", "Research", "Editing", "Audience translation"],
    tangents: ["Medical Communications Director", "Science Editor", "Health Journalist"],
    sampleJDKeywords: ["science writing", "medical writing", "amwa", "publication", "regulatory writing", "journal", "csr", "editorial", "content"],
    interviewQuestions: [
      { q: "Explain a complex scientific concept to me as if I'm a curious 12-year-old.", focus: "Translation skill", tip: "Use analogy. Complexity is not depth." },
    ],
  },
  {
    id: "policy-analyst",
    title: "Policy Analyst / Government Affairs",
    family: "Strategy",
    industry: ["Government", "Think Tank", "Advocacy", "Healthcare Policy"],
    blurb: "Shapes the rules that everyone else has to play by. Combines analytical rigor with political awareness and the patience to work in systems that move slowly by design.",
    tags: ["analytical", "mission", "strategy", "people"],
    salaryLow: 60, salaryHigh: 140, tcNote: "Base; federal roles include strong benefits",
    transitionTime: "6–12 months",
    nextSteps: ["Target legislative or regulatory agency roles in your issue area", "Consider an MPP or MPA if you want to accelerate", "Write a policy brief on an issue you care about"],
    watchOut: "Policy roles can feel disconnected from impact — you write memos that shape decisions you'll never see implemented. Tolerance for ambiguity and long time horizons is non-negotiable.",
    growth: "Steady", remote: "Hybrid",
    dayInLife: "Reading legislation, writing analysis, briefing officials, attending hearings, and navigating institutional dynamics that make the Senate look simple.",
    coreSkills: ["Policy analysis", "Legislative research", "Stakeholder engagement", "Writing", "Political acuity"],
    tangents: ["Chief of Staff (Government)", "Lobbyist", "Think Tank Senior Fellow"],
    sampleJDKeywords: ["policy", "legislation", "regulatory", "government", "advocacy", "analysis", "federal", "stakeholder", "mpp", "mpa"],
    interviewQuestions: [
      { q: "How would you evaluate whether a policy intervention is working?", focus: "Analytical rigor", tip: "Name your counterfactual — what would have happened without the intervention?" },
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
  "physician": {
    boosts: {
      values: ["helping", "impact", "challenge"],
      energizes: ["problems", "relationships", "research"],
      skills: ["research", "teaching"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["pressure", "context-switching"],
      values: ["balance", "autonomy"],
      skills: ["finance", "sales", "design"],
      horizon: ["now"],
    },
  },
  "clinical-research": {
    boosts: {
      values: ["impact", "challenge", "helping"],
      energizes: ["research", "problems", "systems"],
      skills: ["research", "data", "writing"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["repetitive", "bureaucracy"],
      values: ["income", "prestige"],
      energizes: ["leading", "communicating"],
      horizon: ["now"],
    },
  },
  "medical-affairs": {
    boosts: {
      values: ["impact", "helping", "challenge"],
      energizes: ["relationships", "communicating", "research"],
      skills: ["research", "writing", "sales"],
      risk: ["moderate"],
    },
    drains: {
      drains: ["politics", "pressure"],
      values: ["autonomy", "creative"],
      skills: ["technical", "design"],
    },
  },
  "public-health": {
    boosts: {
      values: ["impact", "helping", "challenge"],
      energizes: ["research", "problems", "communicating"],
      skills: ["research", "data", "writing"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["repetitive"],
      values: ["income", "prestige"],
      skills: ["sales", "design", "finance"],
    },
  },
  "biotech-scientist": {
    boosts: {
      values: ["challenge", "impact"],
      energizes: ["research", "problems", "hands-on", "innovating"],
      skills: ["research", "data", "technical"],
      risk: ["career-risk", "moderate"],
      horizon: ["exploring", "transition"],
    },
    drains: {
      drains: ["repetitive", "managing"],
      energizes: ["leading", "executing", "communicating"],
      skills: ["sales", "ops", "finance"],
      horizon: ["now"],
    },
  },
  "healthcare-consultant": {
    boosts: {
      values: ["impact", "challenge", "income"],
      energizes: ["strategy", "problems", "relationships"],
      skills: ["research", "writing", "finance", "data"],
      risk: ["moderate"],
    },
    drains: {
      drains: ["travel", "politics", "unclear"],
      values: ["balance", "stability"],
      energizes: ["hands-on"],
    },
  },
  "corporate-attorney": {
    boosts: {
      values: ["prestige", "income", "challenge"],
      energizes: ["problems", "strategy", "communicating"],
      skills: ["writing", "finance"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["repetitive", "no-creative"],
      values: ["balance", "creative"],
      energizes: ["hands-on", "innovating"],
    },
  },
  "compliance": {
    boosts: {
      values: ["stability", "impact", "challenge"],
      energizes: ["systems", "problems", "research"],
      skills: ["research", "writing", "ops"],
      risk: ["stability"],
    },
    drains: {
      drains: ["unclear", "bureaucracy"],
      values: ["creative", "prestige"],
      energizes: ["innovating", "leading"],
    },
  },
  "content-strategist": {
    boosts: {
      values: ["creative", "autonomy", "impact"],
      energizes: ["communicating", "research", "innovating"],
      skills: ["writing", "product", "design"],
      risk: ["career-risk", "moderate"],
    },
    drains: {
      drains: ["no-creative", "repetitive"],
      skills: ["technical", "finance", "ops"],
      energizes: ["hands-on", "systems"],
    },
  },
  "management-consultant": {
    boosts: {
      values: ["income", "challenge", "prestige"],
      energizes: ["strategy", "problems", "communicating"],
      skills: ["finance", "writing", "product", "ops"],
      risk: ["moderate", "uncertainty"],
    },
    drains: {
      drains: ["travel", "politics", "unclear"],
      values: ["balance", "stability"],
      energizes: ["hands-on"],
    },
  },
  "nonprofit-director": {
    boosts: {
      values: ["helping", "impact", "leadership"],
      energizes: ["leading", "relationships", "communicating"],
      skills: ["writing", "ops", "teaching"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["bureaucracy", "unclear"],
      values: ["income", "prestige"],
      energizes: ["hands-on", "research"],
    },
  },
  "academic-researcher": {
    boosts: {
      values: ["challenge", "autonomy", "impact"],
      energizes: ["research", "problems", "innovating"],
      skills: ["research", "data", "writing", "teaching"],
      risk: ["career-risk"],
      horizon: ["exploring", "transition"],
    },
    drains: {
      drains: ["repetitive", "pressure", "politics"],
      values: ["income", "stability", "prestige"],
      horizon: ["now"],
    },
  },
  "financial-analyst": {
    boosts: {
      values: ["income", "challenge", "prestige"],
      energizes: ["problems", "strategy", "research"],
      skills: ["finance", "data"],
      risk: ["moderate", "uncertainty"],
    },
    drains: {
      drains: ["repetitive", "no-creative"],
      values: ["balance", "creative"],
      energizes: ["hands-on", "innovating"],
    },
  },
  "hr-people": {
    boosts: {
      values: ["helping", "leadership", "impact"],
      energizes: ["relationships", "leading", "communicating"],
      skills: ["teaching", "ops", "writing"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["isolation", "no-creative"],
      values: ["challenge", "autonomy"],
      skills: ["technical", "finance", "data"],
    },
  },
  "science-writer": {
    boosts: {
      values: ["creative", "impact", "autonomy"],
      energizes: ["research", "communicating", "innovating"],
      skills: ["writing", "research", "teaching"],
      risk: ["career-risk", "moderate"],
    },
    drains: {
      drains: ["no-creative", "repetitive"],
      skills: ["finance", "sales", "ops"],
      energizes: ["executing", "systems"],
    },
  },
  "policy-analyst": {
    boosts: {
      values: ["impact", "helping", "challenge"],
      energizes: ["research", "strategy", "communicating"],
      skills: ["writing", "research", "data"],
      risk: ["stability", "moderate"],
    },
    drains: {
      drains: ["bureaucracy", "unclear"],
      values: ["income", "prestige"],
      horizon: ["now"],
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
