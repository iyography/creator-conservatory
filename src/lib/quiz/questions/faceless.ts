import type { QuizQuestion, ArchetypeQuestion, TrackKey } from "../types";

const EMERGING_QUESTIONS: QuizQuestion[] = [
  {
    question: "What type of faceless content interests you most?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    options: [
      { text: "Compilation/curated clips with commentary", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "AI-generated visuals with voiceover", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "Screen recordings and tutorials", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "Text-on-screen storytelling or Reddit-style narration", tags: { archetype: "performer", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "Why do you want to stay faceless?",
    options: [
      { text: "I'm camera-shy and uncomfortable on screen", tags: { archetype: "reluctant", bottleneck: "credibility-fear" } },
      { text: "I want the brand to stand on its own", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "Privacy matters — I don't want to be recognized", tags: { archetype: "freedom", bottleneck: "credibility-fear" } },
      { text: "I think faceless channels scale better", tags: { archetype: "credentialed", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "How clear is your niche right now?",
    options: [
      { text: "I have no idea what niche to pick", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
      { text: "I have a general topic but it's too broad", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
      { text: "I've researched a few options but can't commit", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "I know my niche and I'm ready to execute", tags: { archetype: "launcher", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "What's your biggest worry about starting a faceless channel?",
    options: [
      { text: "Nobody will trust a channel without a real person", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "The tech stack feels overwhelming (TTS, editing, AI)", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
      { text: "I'll put in months of work and earn nothing", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
      { text: "I don't know how to make it look professional", tags: { archetype: "performer", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "Where are you planning to publish first?",
    options: [
      { text: "YouTube long-form", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "YouTube Shorts / TikTok / Reels", tags: { archetype: "performer", bottleneck: "no-audience" } },
      { text: "A mix of short and long-form", tags: { archetype: "launcher", bottleneck: "time-scarcity" } },
      { text: "I haven't decided yet", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How do you plan to source content and ideas?",
    options: [
      { text: "Researching trending topics and making my own take", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "Curating clips, images, or stock footage", tags: { archetype: "performer", bottleneck: "credibility-fear" } },
      { text: "Using AI to generate scripts and visuals", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "Writing original scripts from my own knowledge", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "What does your channel identity look like so far?",
    options: [
      { text: "I have a name, logo, and color palette ready", tags: { archetype: "launcher", bottleneck: "no-audience" } },
      { text: "I've picked a name but nothing else", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I keep changing my mind on the branding", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "I haven't started branding at all", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "How much time per week can you commit to this?",
    options: [
      { text: "Under 5 hours — this is a side experiment", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "5-10 hours alongside my main work", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "10-20 hours — I'm serious about this", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Full-time focus — I want this to replace my income", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What monetization path excites you most?",
    options: [
      { text: "YouTube AdSense revenue", tags: { archetype: "freedom", bottleneck: "no-audience" } },
      { text: "Affiliate marketing within my niche", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Selling a digital product or course later", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "I just want to build an audience first", tags: { archetype: "performer", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "How do you feel about voiceover and narration?",
    options: [
      { text: "I'm comfortable recording my own voice", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "I'll use AI text-to-speech tools", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "I want to hire a voiceover artist", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "I'd rather use text-on-screen with music only", tags: { archetype: "reluctant", bottleneck: "credibility-fear" } },
    ],
  },
];

const GROWING_QUESTIONS: QuizQuestion[] = [
  {
    question: "Which growth levers are you currently using?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      { text: "SEO-optimized titles, tags, and descriptions", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "Thumbnail A/B testing", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Posting on a strict schedule", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "None — I post and hope for the best", tags: { archetype: "reluctant", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "What is your current subscriber count?",
    options: [
      { text: "Under 1,000 — still pushing for monetization", tags: { archetype: "reluctant", bottleneck: "no-audience" } },
      { text: "1,000-10,000 — monetized but revenue is small", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "10,000-50,000 — growing but plateauing", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
      { text: "50,000+ — I need to figure out next level", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How do you handle your voiceover quality?",
    options: [
      { text: "I use a good mic and edit my recordings carefully", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "I use AI voices and they sound decent enough", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "Viewers have complained about audio quality", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
      { text: "I focus on visuals and music — no voiceover", tags: { archetype: "performer", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What does your thumbnail process look like?",
    options: [
      { text: "I spend serious time designing click-worthy thumbnails", tags: { archetype: "launcher", bottleneck: "time-scarcity" } },
      { text: "I use templates and swap text/images quickly", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
      { text: "I let YouTube auto-generate them", tags: { archetype: "reluctant", bottleneck: "no-audience" } },
      { text: "I outsource thumbnails to a designer", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "How do you keep viewers watching without showing your face?",
    options: [
      { text: "Fast pacing, lots of visual changes, and b-roll", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "Strong scripting with hooks and open loops", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "On-screen text, motion graphics, and sound effects", tags: { archetype: "launcher", bottleneck: "tech-overwhelm" } },
      { text: "I struggle with retention — people click away quickly", tags: { archetype: "reluctant", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "What frustrates you most about your growth right now?",
    options: [
      { text: "Some videos pop off but most get no views", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I can't figure out what the algorithm wants", tags: { archetype: "freedom", bottleneck: "audience-mismatch" } },
      { text: "It takes me too long to produce each video", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "My niche feels oversaturated with faceless channels", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
    ],
  },
  {
    question: "How are you building a brand identity without a face?",
    options: [
      { text: "Consistent visual style, intro, and channel mascot", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "A signature voice or narration style", tags: { archetype: "performer", bottleneck: "credibility-fear" } },
      { text: "A unique editorial perspective that's clearly mine", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "I haven't figured out my brand yet — everything looks generic", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What's your content production workflow?",
    options: [
      { text: "Fully manual — I script, record, edit everything myself", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "Semi-automated — I use templates and AI for parts of it", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "I batch produce multiple videos in one session", tags: { archetype: "launcher", bottleneck: "perfectionism" } },
      { text: "It's different every time — no real system", tags: { archetype: "performer", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How are you retaining subscribers between uploads?",
    options: [
      { text: "Community posts, polls, and updates", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Playlists and series that encourage binge-watching", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "Shorts and clips to stay visible between long-form", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "I'm not doing anything — subs forget about me", tags: { archetype: "reluctant", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "Where do you want to be in 6 months?",
    options: [
      { text: "Earning consistent AdSense income every month", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
      { text: "Recognized as a top channel in my niche", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Running a content machine that publishes daily", tags: { archetype: "launcher", bottleneck: "time-scarcity" } },
      { text: "Building an audience I can eventually sell to", tags: { archetype: "performer", bottleneck: "no-monetization" } },
    ],
  },
];

const ESTABLISHED_QUESTIONS: QuizQuestion[] = [
  {
    question: "What does your team look like right now?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      { text: "Freelance editors I manage per video", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "A full production team (scriptwriter, editor, thumbnail designer)", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Virtual assistants handling uploads and scheduling", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "I still do most of it myself despite the revenue", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "Are you running multiple channels?",
    options: [
      { text: "Yes — I operate 3+ faceless channels", tags: { archetype: "launcher", bottleneck: "time-scarcity" } },
      { text: "I have 2 channels and I'm considering more", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
      { text: "Just one channel — I want to go deeper, not wider", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
      { text: "I tried multiple but couldn't keep up", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "What's your current monthly revenue from faceless content?",
    options: [
      { text: "Under $1,000/mo — still trying to optimize", tags: { archetype: "reluctant", bottleneck: "no-monetization" } },
      { text: "$1,000-$5,000/mo — decent but not life-changing", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "$5,000-$20,000/mo — solid income, want to scale", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "$20,000+/mo — focused on systems and leverage", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "How are you approaching brand deals without showing your face?",
    options: [
      { text: "Integrated sponsorships woven into the narration", tags: { archetype: "credentialed", bottleneck: "no-monetization" } },
      { text: "Dedicated sponsored segments with on-screen product demos", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
      { text: "I have a media kit and actively pitch brands", tags: { archetype: "launcher", bottleneck: "credibility-fear" } },
      { text: "Brands won't work with faceless channels — I rely on AdSense", tags: { archetype: "reluctant", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What's your biggest operational bottleneck?",
    options: [
      { text: "Quality control — my team's output is inconsistent", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "Finding and training reliable editors and writers", tags: { archetype: "launcher", bottleneck: "time-scarcity" } },
      { text: "I'm still the bottleneck for every decision", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "Building SOPs and systems so I can step back", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "How are you maximizing revenue per viewer?",
    options: [
      { text: "Optimizing video length for mid-roll ad placement", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "Driving viewers to affiliate links and product pages", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Selling my own digital products (courses, templates, ebooks)", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I haven't focused on RPM optimization yet", tags: { archetype: "reluctant", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What does automation look like in your operation?",
    options: [
      { text: "Fully automated upload pipeline from script to publish", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "Partially automated — some steps still need me", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "I use project management tools but execution is manual", tags: { archetype: "launcher", bottleneck: "perfectionism" } },
      { text: "Very little automation — everything is ad hoc", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "How are you building passive income beyond ad revenue?",
    options: [
      { text: "Licensing content and repurposing across platforms", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
      { text: "Building an email list to sell info products", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "Creating a community or membership around my niche", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I'm still too dependent on active content creation", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "What's your strategy for staying ahead of algorithm changes?",
    options: [
      { text: "I diversify across platforms so no single one owns me", tags: { archetype: "freedom", bottleneck: "audience-mismatch" } },
      { text: "I study analytics obsessively and adapt fast", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I test new formats and trends constantly", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "I focus on evergreen content that isn't trend-dependent", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What would transform your faceless content business in the next 90 days?",
    options: [
      { text: "Removing myself from production entirely and becoming CEO", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
      { text: "Launching a second revenue stream beyond AdSense", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Building authority in my niche so brands seek me out", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Getting consistent without the boom-and-bust cycle", tags: { archetype: "performer", bottleneck: "perfectionism" } },
    ],
  },
];

export const FACELESS_TRACK_QUESTIONS: Record<TrackKey, QuizQuestion[]> = {
  emerging: EMERGING_QUESTIONS,
  growing: GROWING_QUESTIONS,
  established: ESTABLISHED_QUESTIONS,
};

export const FACELESS_ARCHETYPE_QUESTIONS: ArchetypeQuestion[] = [
  {
    question: "When you think about creating content without showing your face, your first reaction is...",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    options: [
      { text: "\"Finally — I can let the content speak for itself\"", archetype: "credentialed" },
      { text: "\"This feels like the perfect business model to scale\"", archetype: "launcher" },
      { text: "\"I love that I can stay anonymous and still earn\"", archetype: "freedom" },
      { text: "\"I'm relieved I don't have to be on camera\"", archetype: "reluctant" },
    ],
  },
  {
    question: "What drives you to build a faceless channel?",
    options: [
      { text: "I want to build a media asset I can eventually sell", archetype: "launcher" },
      { text: "I want passive income that doesn't require my personal brand", archetype: "freedom" },
      { text: "I have deep knowledge in a topic and want to share it", archetype: "credentialed" },
      { text: "I love the creative process of making videos", archetype: "performer" },
    ],
  },
  {
    question: "If your channel blew up overnight, what would excite you most?",
    options: [
      { text: "The revenue — I'd finally have financial freedom", archetype: "freedom" },
      { text: "The validation that my content style works", archetype: "performer" },
      { text: "The ability to build a team and scale to more channels", archetype: "launcher" },
      { text: "Being seen as a go-to source in my niche", archetype: "credentialed" },
    ],
  },
  {
    question: "How do you feel about the idea of never doing a face reveal?",
    options: [
      { text: "That's the whole point — I never want to be the brand", archetype: "freedom" },
      { text: "I might reveal eventually if the audience earns it", archetype: "performer" },
      { text: "I'd consider it if there was a strategic business reason", archetype: "launcher" },
      { text: "I'd rather be known for my expertise than my appearance", archetype: "credentialed" },
    ],
  },
  {
    question: "Your biggest untapped advantage as a faceless creator is...",
    options: [
      { text: "I can run this like a business — not a personality cult", archetype: "launcher" },
      { text: "My subject-matter expertise and research skills", archetype: "credentialed" },
      { text: "My editing eye and sense of pacing and storytelling", archetype: "performer" },
      { text: "I can build multiple income streams without burning out publicly", archetype: "freedom" },
    ],
  },
];
