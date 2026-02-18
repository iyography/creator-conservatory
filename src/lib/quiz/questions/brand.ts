import type { QuizQuestion, ArchetypeQuestion, TrackKey } from "../types";

/* ─────────────────────────────────────────────────────────
   EMERGING  (10 questions)
   Themes: positioning, niche clarity, thought-leadership
   foundations, first content pieces, platform choice,
   establishing credibility online
   ───────────────────────────────────────────────────────── */

const EMERGING_QUESTIONS: QuizQuestion[] = [
  {
    question: "Which platforms are you considering for building your personal brand?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      { text: "LinkedIn — it's where my industry lives", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "YouTube — I want to build a long-form library", tags: { archetype: "performer", bottleneck: "tech-overwhelm" } },
      { text: "Instagram/TikTok — short-form feels approachable", tags: { archetype: "launcher", bottleneck: "perfectionism" } },
      { text: "I honestly have no idea where to start", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "How clearly can you describe who you help and the transformation you provide?",
    options: [
      { text: "Crystal clear — I have a specific niche and message", tags: { archetype: "launcher", bottleneck: "no-audience" } },
      { text: "I have a general idea but struggle to articulate it", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I help a lot of different people with different things", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
      { text: "I haven't figured out my positioning yet", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What is your primary motivation for building a personal brand?",
    options: [
      { text: "Attract inbound clients instead of chasing them", tags: { archetype: "freedom", bottleneck: "no-audience" } },
      { text: "Be recognized as a thought leader in my space", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Share my frameworks and ideas with a wider audience", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Launch a course, book, or digital product eventually", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What is the biggest thing holding you back from posting your first pieces of content?",
    options: [
      { text: "I don't feel expert enough to put myself out there", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "I overthink every post until I abandon it", tags: { archetype: "reluctant", bottleneck: "perfectionism" } },
      { text: "I don't know how to turn my knowledge into content", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I'm afraid nobody will engage or care", tags: { archetype: "launcher", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "How would you describe your existing professional reputation offline?",
    options: [
      { text: "Strong — people refer me regularly through word of mouth", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "Growing — I have a few wins under my belt", tags: { archetype: "performer", bottleneck: "credibility-fear" } },
      { text: "Brand new — I'm pivoting or just starting out", tags: { archetype: "launcher", bottleneck: "credibility-fear" } },
      { text: "Mixed — I'm good at what I do but nobody knows about it", tags: { archetype: "reluctant", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "When you think about 'thought leadership content,' what comes to mind?",
    options: [
      { text: "Long articles and deep-dive posts on LinkedIn", tags: { archetype: "credentialed", bottleneck: "time-scarcity" } },
      { text: "Quick opinion posts and hot takes", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Video breakdowns and tutorials", tags: { archetype: "launcher", bottleneck: "tech-overwhelm" } },
      { text: "I have no mental model for what that looks like", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How comfortable are you being the face of your brand on camera?",
    options: [
      { text: "Very — I present and speak regularly", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Moderately — I can do it but it feels unnatural", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "Not at all — I prefer writing over video", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
      { text: "I'm willing to learn if it drives results", tags: { archetype: "freedom", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "What does your current content library look like?",
    options: [
      { text: "I have years of talks, workshops, or presentations I've never repurposed", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I've posted sporadically but nothing consistent", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Completely empty — I'm starting from zero", tags: { archetype: "reluctant", bottleneck: "no-audience" } },
      { text: "I have drafts and ideas but nothing published", tags: { archetype: "launcher", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "How do you currently generate new clients or opportunities?",
    options: [
      { text: "Referrals and warm introductions only", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "Networking events and conferences", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Cold outreach and prospecting", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Freelance marketplaces or job boards", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "If you had a magic wand, what would your personal brand accomplish in the next 90 days?",
    options: [
      { text: "Position me as the go-to expert in my niche", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Generate consistent inbound leads", tags: { archetype: "freedom", bottleneck: "no-audience" } },
      { text: "Give me a repeatable content system I can maintain", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "Build an audience I can eventually sell to", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   GROWING  (10 questions)
   Themes: client acquisition through content, lead magnets,
   webinars, podcast guesting, speaking opportunities,
   content repurposing, building authority
   ───────────────────────────────────────────────────────── */

const GROWING_QUESTIONS: QuizQuestion[] = [
  {
    question: "Which content strategies have you already tried?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 4,
    options: [
      { text: "Publishing LinkedIn posts or articles regularly", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
      { text: "Hosting or guesting on podcasts", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Running webinars or live workshops", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "None of the above — I've mostly winged it", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What is your biggest challenge when it comes to turning followers into paying clients?",
    options: [
      { text: "I get engagement but nobody asks about my services", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "I don't have a clear call-to-action or offer", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "My audience doesn't match my ideal client", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
      { text: "I feel awkward promoting myself in my content", tags: { archetype: "reluctant", bottleneck: "credibility-fear" } },
    ],
  },
  {
    question: "Do you have a lead magnet, free resource, or email opt-in?",
    options: [
      { text: "Yes, and it converts well", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Yes, but I rarely promote it", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I started one but never finished it", tags: { archetype: "reluctant", bottleneck: "perfectionism" } },
      { text: "No — I don't know what to offer", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "How often are you repurposing a single piece of content across multiple formats?",
    options: [
      { text: "Always — one idea becomes a post, video, email, and thread", tags: { archetype: "freedom", bottleneck: "audience-mismatch" } },
      { text: "Sometimes — I repost things occasionally", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Rarely — each post feels like starting from scratch", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "Never — I didn't realize I should be doing that", tags: { archetype: "launcher", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "What is your approach to speaking opportunities and podcast appearances?",
    options: [
      { text: "I actively pitch myself and land them regularly", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
      { text: "I've done a few but don't have a system for getting more", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I want to do them but don't know where to start", tags: { archetype: "launcher", bottleneck: "no-audience" } },
      { text: "I'm not sure I'm qualified enough to be a guest", tags: { archetype: "reluctant", bottleneck: "credibility-fear" } },
    ],
  },
  {
    question: "How would you rate the authority and trust your content currently builds?",
    options: [
      { text: "People often say 'I feel like I already know you' before our first call", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "My content gets respect but doesn't drive business", tags: { archetype: "credentialed", bottleneck: "no-monetization" } },
      { text: "I think my content is too generic to stand out", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "I'm unsure — I don't track engagement or feedback closely", tags: { archetype: "reluctant", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "What is your content creation workflow like right now?",
    options: [
      { text: "Chaotic — I create when inspiration strikes", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "I batch-create on weekends but it's exhausting", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
      { text: "I use templates and systems that work decently", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I stare at a blank screen and eventually give up", tags: { archetype: "reluctant", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "What would make the biggest impact on your brand growth right now?",
    options: [
      { text: "Landing three to five high-profile podcast features", tags: { archetype: "performer", bottleneck: "no-audience" } },
      { text: "A signature framework that makes my expertise shareable", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "A webinar funnel that books discovery calls on autopilot", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Finally having a consistent posting schedule I can stick to", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "How do you feel about niching down further?",
    options: [
      { text: "I'm already niched — my audience knows exactly what I stand for", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
      { text: "I know I should but I'm afraid of leaving money on the table", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
      { text: "I've been trying to niche down but keep pivoting", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "I resist it — I want to talk about many topics", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "What does your current sales process look like once a lead finds you?",
    options: [
      { text: "They DM me and we hop on a call — no system", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "I have a booking link but no nurture sequence", tags: { archetype: "launcher", bottleneck: "no-audience" } },
      { text: "I have a full funnel: content to email to call to close", tags: { archetype: "freedom", bottleneck: "audience-mismatch" } },
      { text: "I don't have a sales process — I mostly do free work", tags: { archetype: "reluctant", bottleneck: "no-monetization" } },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   ESTABLISHED  (10 questions)
   Themes: team content delegation, high-ticket offer funnels,
   book/course launches, media appearances, scaling
   consulting, building a media brand
   ───────────────────────────────────────────────────────── */

const ESTABLISHED_QUESTIONS: QuizQuestion[] = [
  {
    question: "What are your current revenue streams?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 4,
    options: [
      { text: "One-on-one consulting or coaching", tags: { archetype: "credentialed", bottleneck: "time-scarcity" } },
      { text: "Group programs, masterminds, or courses", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Speaking fees and keynotes", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Book royalties, licensing, or media deals", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What is the single biggest constraint on your growth right now?",
    options: [
      { text: "I'm the bottleneck — everything requires my time and face", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "I can't find or train a content team that captures my voice", tags: { archetype: "credentialed", bottleneck: "tech-overwhelm" } },
      { text: "My audience is large but I'm not monetizing effectively", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "I'm burning out trying to maintain quality at scale", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "How are you currently delegating content creation?",
    options: [
      { text: "I have a full team: writer, editor, designer, and manager", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I have a ghostwriter or VA who helps with drafts", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I record raw video and someone else edits and publishes", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I still do everything myself and it's unsustainable", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "What stage is your high-ticket offer at?",
    options: [
      { text: "Proven and selling consistently at $5k-plus", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "It exists but I struggle to fill it", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "I'm still trading time for money with no premium offer", tags: { archetype: "reluctant", bottleneck: "no-monetization" } },
      { text: "I want to create one but haven't packaged my expertise yet", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How close are you to launching a book, signature course, or certification program?",
    options: [
      { text: "Already launched — looking to scale distribution", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "In progress — writing or building it now", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "I have the expertise but haven't started organizing it", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
      { text: "It feels too overwhelming to even begin", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "What role does media (TV, press, major podcasts) play in your brand strategy?",
    options: [
      { text: "Central — I actively pursue and land major media", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
      { text: "I've had a few features but nothing strategic", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I want media exposure but don't know how to get it", tags: { archetype: "launcher", bottleneck: "no-audience" } },
      { text: "I'd rather build my own media channel than chase press", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "How would you describe your consulting or coaching model?",
    options: [
      { text: "High-touch one-on-one — deeply personalized", tags: { archetype: "credentialed", bottleneck: "time-scarcity" } },
      { text: "Leveraged group model — one to many", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Hybrid — some one-on-one and some group", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "I want to move away from services entirely", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What does your content funnel look like end to end?",
    options: [
      { text: "Awareness content feeds into an email sequence that drives sales", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I post content but it doesn't connect to any sales mechanism", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "I rely on reputation and referrals — content is secondary", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "I know I need a funnel but haven't built one", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "If you could add one thing to your brand empire tomorrow, what would it be?",
    options: [
      { text: "A content engine that runs without me recording every piece", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
      { text: "A bestselling book that cements my authority", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "A product suite that generates revenue while I sleep", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "A keynote speaking career that fills my calendar", tags: { archetype: "performer", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "What is your vision for the next 12 months?",
    options: [
      { text: "Build a media brand that outlives my personal involvement", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
      { text: "Double revenue while cutting my working hours in half", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Become the undeniable top voice in my industry", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Transition from practitioner to full-time thought leader", tags: { archetype: "performer", bottleneck: "content-confusion" } },
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   EXPORT: track questions keyed by TrackKey
   ───────────────────────────────────────────────────────── */

export const BRAND_TRACK_QUESTIONS: Record<TrackKey, QuizQuestion[]> = {
  emerging: EMERGING_QUESTIONS,
  growing: GROWING_QUESTIONS,
  established: ESTABLISHED_QUESTIONS,
};

/* ─────────────────────────────────────────────────────────
   ARCHETYPE QUESTIONS  (5 questions)
   Identity / motivation questions tailored to personal brands
   ───────────────────────────────────────────────────────── */

export const BRAND_ARCHETYPE_QUESTIONS: ArchetypeQuestion[] = [
  {
    question: "When you think about building your personal brand online, your gut reaction is...",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    options: [
      { text: "\"I need to prove I'm the real deal before I put myself out there\"", archetype: "credentialed" },
      { text: "\"I just want the freedom to work on my own terms\"", archetype: "freedom" },
      { text: "\"I know I could blow up if I just started posting\"", archetype: "launcher" },
      { text: "\"I'd rather my work speak for itself than self-promote\"", archetype: "reluctant" },
    ],
  },
  {
    question: "Which statement resonates with you the most?",
    options: [
      { text: "I want to be on stages, in rooms, and in the spotlight", archetype: "performer" },
      { text: "I want my credentials and track record to do the talking", archetype: "credentialed" },
      { text: "I want to build a machine that generates leads and revenue", archetype: "launcher" },
      { text: "I want location independence and lifestyle flexibility", archetype: "freedom" },
    ],
  },
  {
    question: "People who know you best would say your superpower is...",
    options: [
      { text: "Commanding a room and making complex ideas simple", archetype: "performer" },
      { text: "Deep expertise that others trust and rely on", archetype: "credentialed" },
      { text: "Moving fast, shipping ideas, and figuring things out", archetype: "launcher" },
      { text: "Quietly delivering exceptional results without fanfare", archetype: "reluctant" },
    ],
  },
  {
    question: "If you suddenly had 100,000 followers tomorrow, what would you do first?",
    options: [
      { text: "Launch a live event, workshop, or summit", archetype: "performer" },
      { text: "Release my signature course or certification", archetype: "credentialed" },
      { text: "Open cart on a high-ticket offer and monetize immediately", archetype: "launcher" },
      { text: "Set up passive income streams so I never trade time for money again", archetype: "freedom" },
    ],
  },
  {
    question: "What would make you feel most successful as a personal brand?",
    options: [
      { text: "Being invited to speak at the biggest conferences in my industry", archetype: "performer" },
      { text: "Writing the definitive book or framework in my field", archetype: "credentialed" },
      { text: "Building a seven-figure business powered by my content", archetype: "launcher" },
      { text: "Working four hours a day from anywhere in the world", archetype: "freedom" },
    ],
  },
];
