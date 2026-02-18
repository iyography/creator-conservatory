import type { QuizQuestion, ArchetypeQuestion, TrackKey } from "../types";

/* ─────────────────────────────────────────────
   EMERGING  (10 questions)
   Theme: product photography basics, first social media setup,
   content-to-purchase connection, UGC basics, choosing platforms
   ───────────────────────────────────────────── */

const EMERGING_QUESTIONS: QuizQuestion[] = [
  {
    question: "What kind of products do you sell (or plan to sell)?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    options: [
      { text: "Physical goods I make myself (handmade, crafted)", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Curated or wholesale products I resell", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "Digital products (templates, downloads, printables)", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "Subscription boxes or bundles", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "How do you currently photograph your products?",
    options: [
      { text: "Phone snapshots with no real setup", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
      { text: "I try to style shoots but they never look professional", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "I use stock images or supplier photos", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "I haven't started — I don't know where to begin", tags: { archetype: "credentialed", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "Which social platform feels most natural for showcasing your products?",
    options: [
      { text: "Instagram — I like the visual grid and Reels", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "TikTok — short videos seem to go viral fast", tags: { archetype: "freedom", bottleneck: "no-audience" } },
      { text: "Pinterest — people are already searching for products there", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
      { text: "I genuinely have no idea which one to pick", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "What is your biggest challenge connecting content to actual purchases?",
    options: [
      { text: "People like my posts but never visit my store", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "I don't know how to add calls-to-action without being pushy", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "I haven't set up shop links or a landing page yet", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
      { text: "I get traffic but visitors bounce without buying", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "How do you feel about asking customers to create content (UGC) for you?",
    options: [
      { text: "I'd love it but don't know how to ask", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "I've thought about it but I barely have customers yet", tags: { archetype: "launcher", bottleneck: "no-audience" } },
      { text: "I'd rather just make everything myself so it's on-brand", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "What is UGC?", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What would make you confident enough to post product content daily?",
    options: [
      { text: "Knowing exactly what content formats drive sales", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "Seeing other small shops succeed with simple content", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Having a batch of pre-shot photos and videos ready to go", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Removing the guesswork — just tell me what to post", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "When you look at competitors' content, you think...",
    options: [
      { text: "\"Their stuff looks so polished — I can't compete\"", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "\"They post constantly — where do they find the time?\"", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "\"I could do that if I just understood the format\"", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "\"I want to stand out, not copy what everyone else does\"", tags: { archetype: "freedom", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "How do you describe your product to new people right now?",
    options: [
      { text: "I ramble — I haven't nailed my pitch yet", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
      { text: "I focus on features and craftsmanship", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
      { text: "I tell a story about why I created it", tags: { archetype: "performer", bottleneck: "no-audience" } },
      { text: "I highlight the problem it solves and the transformation", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "How much weekly time can you realistically invest in product content?",
    options: [
      { text: "Less than 2 hours — I'm swamped fulfilling orders or sourcing", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "2-5 hours if I had a clear plan", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "5-10 hours — I'm willing to learn", tags: { archetype: "launcher", bottleneck: "tech-overwhelm" } },
      { text: "As much as needed — content is my growth lever", tags: { archetype: "freedom", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "What does success look like for your store in the next 90 days?",
    options: [
      { text: "Getting my first 50 orders from social media", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Building an audience that actually cares about my products", tags: { archetype: "performer", bottleneck: "no-audience" } },
      { text: "Having a repeatable content system so I'm not starting from scratch each week", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
      { text: "Feeling confident showing up on camera or in posts", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
    ],
  },
];

/* ─────────────────────────────────────────────
   GROWING  (10 questions)
   Theme: ad creative testing, UGC scaling, influencer partnerships,
   product showcase formats, email marketing, conversion optimization
   ───────────────────────────────────────────── */

const GROWING_QUESTIONS: QuizQuestion[] = [
  {
    question: "Which content formats are currently driving the most sales for you?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      { text: "Short-form video (Reels, TikToks, Shorts)", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Static product photos and carousels", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
      { text: "Email campaigns and newsletters", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Honestly, I can't tell what's working", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What is your experience with paid ads for your products?",
    options: [
      { text: "I've run ads but the return was disappointing", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I want to start but I'm scared of wasting money", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "I boost posts occasionally but don't have a real strategy", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I rely entirely on organic — ads feel too complicated", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "How are you leveraging user-generated content right now?",
    options: [
      { text: "I repost customer photos when they tag me", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "I've started a branded hashtag but few people use it", tags: { archetype: "launcher", bottleneck: "no-audience" } },
      { text: "I pay micro-influencers for UGC-style videos", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
      { text: "I'm not doing anything structured with UGC yet", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What is your approach to influencer or creator partnerships?",
    options: [
      { text: "I've done a few gifted collabs but nothing trackable", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "I have a small affiliate program running", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I want to start but don't know how to pick the right people", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "I'd rather invest in my own content than pay others", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "How is your email marketing performing?",
    options: [
      { text: "I send emails but open rates and clicks are declining", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I have automations (welcome series, abandoned cart) working", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
      { text: "I collect emails but rarely send campaigns", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
      { text: "My list is growing but I struggle to write compelling product emails", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "What is the biggest gap in your product content strategy?",
    options: [
      { text: "I don't test different creative angles — I just post and hope", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
      { text: "I focus too much on aesthetics and not enough on conversion", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "I don't repurpose content across channels", tags: { archetype: "credentialed", bottleneck: "time-scarcity" } },
      { text: "I can't produce content fast enough to keep up with demand", tags: { archetype: "launcher", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "Your store's conversion rate is...",
    options: [
      { text: "Below 1% — lots of browsers, few buyers", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Around 1-2% — decent but I know it could be better", tags: { archetype: "credentialed", bottleneck: "no-monetization" } },
      { text: "Above 2% but my traffic volume is the problem", tags: { archetype: "performer", bottleneck: "no-audience" } },
      { text: "I don't actually track it", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "When a product launch underperforms, your first instinct is...",
    options: [
      { text: "Blame the algorithm and feel defeated", tags: { archetype: "reluctant", bottleneck: "credibility-fear" } },
      { text: "Analyze what went wrong and test a new creative angle", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "Wonder if the product itself is the problem", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "Pivot immediately — run a flash sale or discount", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "How do you handle seasonal or trending content for your products?",
    options: [
      { text: "I plan campaigns around holidays and trends in advance", tags: { archetype: "launcher", bottleneck: "time-scarcity" } },
      { text: "I react in the moment and scramble to create content", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "I miss most trends because I see them too late", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
      { text: "I have an evergreen strategy and don't chase trends", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "What would accelerate your growth most in the next 6 months?",
    options: [
      { text: "A reliable ad funnel that turns cold traffic into buyers", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "A library of high-converting product content I can remix", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Partnerships with creators who reach my ideal customer", tags: { archetype: "freedom", bottleneck: "no-audience" } },
      { text: "A cohesive brand story that differentiates me from competitors", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
    ],
  },
];

/* ─────────────────────────────────────────────
   ESTABLISHED  (10 questions)
   Theme: team content production, multi-channel strategy,
   brand storytelling at scale, customer content programs,
   retention content, scaling ad spend
   ───────────────────────────────────────────── */

const ESTABLISHED_QUESTIONS: QuizQuestion[] = [
  {
    question: "What does your content production team look like today?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    options: [
      { text: "It's still mostly me with occasional freelance help", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "I have an in-house content person or small creative team", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "I outsource to an agency but feel disconnected from the output", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "I've built a UGC creator network that produces for me", tags: { archetype: "freedom", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "How many channels are you actively creating unique content for?",
    options: [
      { text: "1-2 — I can't spread any thinner", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "3-4 — but the quality suffers on some", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "5+ — I have systems to repurpose across all of them", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
      { text: "I focus on one hero channel and syndicate everywhere else", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "What role does brand storytelling play in your content right now?",
    options: [
      { text: "It's the core of everything — our origin story sells", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
      { text: "We do product-focused content; story takes a back seat", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "I know we need a stronger narrative but haven't defined it", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "We've outgrown our original story and need a new chapter", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How structured is your customer content program (reviews, UGC, ambassadors)?",
    options: [
      { text: "We have a formal ambassador program with tiers and incentives", tags: { archetype: "launcher", bottleneck: "time-scarcity" } },
      { text: "We request reviews post-purchase but don't actively manage UGC", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "Customers share organically but we don't have a system to capture it", tags: { archetype: "performer", bottleneck: "tech-overwhelm" } },
      { text: "We're ready to invest in a program but need the right framework", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What is your biggest challenge with retention and repeat-purchase content?",
    options: [
      { text: "Our post-purchase email flows are outdated or underperforming", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "We acquire well but customers rarely come back for a second order", tags: { archetype: "credentialed", bottleneck: "no-monetization" } },
      { text: "We don't create dedicated content for existing customers at all", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
      { text: "We have loyalty mechanics but the content around them feels stale", tags: { archetype: "performer", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "How are you approaching paid media at scale?",
    options: [
      { text: "Spending $5k+/month and optimizing creative weekly", tags: { archetype: "launcher", bottleneck: "time-scarcity" } },
      { text: "Spending steadily but creative fatigue is killing performance", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I know I need to scale spend but the unit economics aren't there yet", tags: { archetype: "credentialed", bottleneck: "no-monetization" } },
      { text: "I want to diversify beyond Meta into other paid channels", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "What keeps you from delegating more of the content creation?",
    options: [
      { text: "Nobody captures the brand voice the way I do", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "I've had bad experiences with freelancers or agencies", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Budget — good creative talent is expensive", tags: { archetype: "reluctant", bottleneck: "no-monetization" } },
      { text: "I actually have delegated most of it; I need strategy help now", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How do you measure content performance across channels?",
    options: [
      { text: "Full attribution dashboard with ROAS by creative", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I track platform-level metrics but can't tie them to revenue cleanly", tags: { archetype: "credentialed", bottleneck: "tech-overwhelm" } },
      { text: "I mostly go by gut feel and monthly revenue trends", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I know our data setup is broken and I need to fix it", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "What is the next frontier for your e-commerce content strategy?",
    options: [
      { text: "Live shopping events and real-time product demos", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "AI-generated personalized product recommendations in content", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "Building a content-driven community around our brand", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "Wholesale/B2B content to open new revenue channels", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "If you could solve one problem in the next 90 days, it would be...",
    options: [
      { text: "Reducing creative production cost without sacrificing quality", tags: { archetype: "reluctant", bottleneck: "no-monetization" } },
      { text: "Building a content engine that runs without me day-to-day", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
      { text: "Cracking a profitable acquisition funnel on a new channel", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Elevating our brand perception to command premium pricing", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
    ],
  },
];

/* ─────────────────────────────────────────────
   EXPORTS — Track Questions
   ───────────────────────────────────────────── */

export const ECOMMERCE_TRACK_QUESTIONS: Record<TrackKey, QuizQuestion[]> = {
  emerging: EMERGING_QUESTIONS,
  growing: GROWING_QUESTIONS,
  established: ESTABLISHED_QUESTIONS,
};

/* ─────────────────────────────────────────────
   ARCHETYPE QUESTIONS  (5 questions)
   Motivation / identity questions adapted for e-commerce
   ───────────────────────────────────────────── */

export const ECOMMERCE_ARCHETYPE_QUESTIONS: ArchetypeQuestion[] = [
  {
    question: "When you think about creating content for your products, your gut reaction is...",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    options: [
      { text: "\"I just want to make great products — why do I have to be a content creator too?\"", archetype: "reluctant" },
      { text: "\"I love showcasing what I've built and connecting with customers\"", archetype: "performer" },
      { text: "\"Content is the growth lever — I need to master it\"", archetype: "launcher" },
      { text: "\"I want a system that runs so I can focus on the business\"", archetype: "freedom" },
    ],
  },
  {
    question: "What originally motivated you to start selling products?",
    options: [
      { text: "I saw a gap in the market and moved fast to fill it", archetype: "launcher" },
      { text: "I'm passionate about the craft behind what I make", archetype: "performer" },
      { text: "I wanted financial independence and flexibility", archetype: "freedom" },
      { text: "People kept telling me my work was good enough to sell", archetype: "credentialed" },
    ],
  },
  {
    question: "Your customers value you most for...",
    options: [
      { text: "The quality and attention to detail in every product", archetype: "credentialed" },
      { text: "The personality and story behind the brand", archetype: "performer" },
      { text: "The speed, convenience, and customer experience", archetype: "launcher" },
      { text: "The unique taste and curation I bring", archetype: "freedom" },
    ],
  },
  {
    question: "If your store doubled in revenue overnight, you would first...",
    options: [
      { text: "Hire a content team so I can step back from creating", archetype: "freedom" },
      { text: "Invest in better product development and packaging", archetype: "credentialed" },
      { text: "Pour it into ads and scale aggressively", archetype: "launcher" },
      { text: "Finally feel like this is \"real\" and commit fully", archetype: "reluctant" },
    ],
  },
  {
    question: "The sentence that resonates with you most is...",
    options: [
      { text: "\"My products speak for themselves — I just need the right eyes on them\"", archetype: "credentialed" },
      { text: "\"I want to build a brand people feel connected to, not just a store\"", archetype: "performer" },
      { text: "\"Give me a winning formula and I'll outwork anyone\"", archetype: "launcher" },
      { text: "\"I want my business to generate income whether I'm working or not\"", archetype: "freedom" },
    ],
  },
];
