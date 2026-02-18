import type { QuizQuestion, ArchetypeQuestion, TrackKey } from "../types";

const EMERGING_QUESTIONS: QuizQuestion[] = [
  {
    question: "What type of artist are you?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    options: [
      { text: "Classical/orchestral musician", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Jazz/contemporary musician", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Visual artist/painter/sculptor", tags: { archetype: "launcher", bottleneck: "no-audience" } },
      { text: "Performing artist/dancer/actor", tags: { archetype: "performer", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "What's your biggest fear about posting content?",
    options: [
      { text: "Looking unprofessional or \"cringe\"", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Being judged by colleagues", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Wasting time on something that won't work", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "Not knowing what to post", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How would you describe your current online presence?",
    options: [
      { text: "Almost non-existent", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
      { text: "I post occasionally but randomly", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I have some followers but no strategy", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "I've tried and given up", tags: { archetype: "reluctant", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "What would success look like in 90 days?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 3,
    options: [
      { text: "Getting my first 1,000 followers", tags: { archetype: "performer", bottleneck: "no-audience" } },
      { text: "Having a video hit 10k+ views", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Getting recognized by people in my field", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Landing a new opportunity from social media", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What stops you from posting more?",
    options: [
      { text: "Editing feels like too much work", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
      { text: "I don't know what content to make", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
      { text: "I'm too busy with performances/practice", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Fear of what others will think", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
    ],
  },
  {
    question: "Do you have anything to sell?",
    options: [
      { text: "No, I just want exposure", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "I want to offer lessons/coaching", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "I have a product (book, course, merchandise)", tags: { archetype: "launcher", bottleneck: "no-audience" } },
      { text: "I want brand deals and sponsorships", tags: { archetype: "freedom", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "How much time can you dedicate weekly?",
    options: [
      { text: "1-3 hours", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "3-7 hours", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "7-15 hours", tags: { archetype: "launcher", bottleneck: "perfectionism" } },
      { text: "Whatever it takes", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What type of content feels authentic to you?",
    options: [
      { text: "Showing my practice/process", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "Educational content about my craft", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "Behind-the-scenes of performances", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Storytelling about my journey", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How do you feel about AI tools for content creation?",
    options: [
      { text: "Excited to use them", tags: { archetype: "launcher", bottleneck: "tech-overwhelm" } },
      { text: "Cautious but open", tags: { archetype: "credentialed", bottleneck: "tech-overwhelm" } },
      { text: "I don't want AI to compromise my art", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "I don't know what's available", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "What's your relationship with technology?",
    options: [
      { text: "I'm comfortable and learn quickly", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "I can figure things out with tutorials", tags: { archetype: "performer", bottleneck: "tech-overwhelm" } },
      { text: "I struggle with new tools", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
      { text: "I need significant hand-holding", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
];

const GROWING_QUESTIONS: QuizQuestion[] = [
  {
    question: "What AI/content tools do you currently use?",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 4,
    options: [
      { text: "CapCut or video editors", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Canva for graphics", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "ChatGPT/Claude for scripts", tags: { archetype: "credentialed", bottleneck: "perfectionism" } },
      { text: "None yet", tags: { archetype: "reluctant", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "What's holding you back from growing faster?",
    options: [
      { text: "I don't know what content works in my niche", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I post inconsistently", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "My content doesn't match my skill level", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "I have no strategy, just random posts", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How would you describe your posting consistency?",
    options: [
      { text: "I post multiple times per week", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I post when I feel like it", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I go weeks without posting", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "I burned out trying to keep up", tags: { archetype: "freedom", bottleneck: "perfectionism" } },
    ],
  },
  {
    question: "What do you want to build next?",
    options: [
      { text: "A larger following (10k+)", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
      { text: "A monetized YouTube channel", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
      { text: "A coaching/teaching business", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "A product line or course", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "How do you currently find opportunities?",
    options: [
      { text: "Word of mouth only", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "Cold outreach to venues/brands", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Social media DMs", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I wait for them to come to me", tags: { archetype: "reluctant", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "What's your biggest frustration?",
    options: [
      { text: "Putting in effort with no results", tags: { archetype: "reluctant", bottleneck: "content-confusion" } },
      { text: "Not knowing what my \"thing\" should be", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Seeing less talented people succeed online", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Running out of content ideas", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What would 10x your content output?",
    options: [
      { text: "A proven content system", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "Better editing skills/tools", tags: { archetype: "performer", bottleneck: "tech-overwhelm" } },
      { text: "More confidence in what to post", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Understanding the algorithm", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How do you handle negative feedback or trolls?",
    options: [
      { text: "It devastates me", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "I can handle it but it stings", tags: { archetype: "performer", bottleneck: "perfectionism" } },
      { text: "I ignore and move on", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
      { text: "I've never really dealt with it", tags: { archetype: "reluctant", bottleneck: "no-audience" } },
    ],
  },
  {
    question: "What's your email list situation?",
    options: [
      { text: "I don't have one", tags: { archetype: "performer", bottleneck: "no-audience" } },
      { text: "I have a small list (<500)", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "I have a decent list but don't email them", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
      { text: "I actively nurture my list", tags: { archetype: "freedom", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "Where do you see yourself in 6 months?",
    options: [
      { text: "Consistently posting with a clear brand", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "10k+ followers", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Making money from my content", tags: { archetype: "freedom", bottleneck: "no-monetization" } },
      { text: "Quitting my day job to focus on art", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
    ],
  },
];

const ESTABLISHED_QUESTIONS: QuizQuestion[] = [
  {
    question: "What's your current revenue model?",
    options: [
      { text: "Performances/gigs only", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "Teaching/lessons", tags: { archetype: "credentialed", bottleneck: "time-scarcity" } },
      { text: "Digital products or courses", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Mix of multiple streams", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "What's your biggest bottleneck right now?",
    options: [
      { text: "Not enough time to create content", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Converting followers to customers", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Scaling without burning out", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
      { text: "Finding my next level of growth", tags: { archetype: "credentialed", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "How do you scale your content creation?",
    options: [
      { text: "I do everything myself", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "I have help with editing", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "I have a small team", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I'm looking to build systems", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "What's your marketing approach?",
    options: [
      { text: "Organic social media only", tags: { archetype: "performer", bottleneck: "audience-mismatch" } },
      { text: "Email marketing", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "Collaborations and features", tags: { archetype: "credentialed", bottleneck: "no-audience" } },
      { text: "I don't actively market", tags: { archetype: "reluctant", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What would transform your business?",
    options: [
      { text: "More consistent content output", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Higher-ticket offers", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Automated systems", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "A bigger, more engaged audience", tags: { archetype: "credentialed", bottleneck: "audience-mismatch" } },
    ],
  },
  {
    question: "How do you deliver to clients/students?",
    options: [
      { text: "In-person only", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "1-on-1 video calls", tags: { archetype: "credentialed", bottleneck: "time-scarcity" } },
      { text: "Group programs or courses", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Fully digital/asynchronous", tags: { archetype: "freedom", bottleneck: "content-confusion" } },
    ],
  },
  {
    question: "What's your team situation?",
    options: [
      { text: "Solo operator", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
      { text: "Part-time help (editor, VA)", tags: { archetype: "performer", bottleneck: "content-confusion" } },
      { text: "Small team", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "Looking to build one", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
    ],
  },
  {
    question: "How do you price your services?",
    options: [
      { text: "By the hour", tags: { archetype: "credentialed", bottleneck: "no-monetization" } },
      { text: "Per project/performance", tags: { archetype: "performer", bottleneck: "time-scarcity" } },
      { text: "Monthly retainer or packages", tags: { archetype: "launcher", bottleneck: "audience-mismatch" } },
      { text: "I undercharge and know it", tags: { archetype: "reluctant", bottleneck: "no-monetization" } },
    ],
  },
  {
    question: "What keeps you up at night?",
    options: [
      { text: "Income unpredictability", tags: { archetype: "performer", bottleneck: "no-monetization" } },
      { text: "Not enough time for everything", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
      { text: "Losing relevance in my field", tags: { archetype: "credentialed", bottleneck: "credibility-fear" } },
      { text: "Burnout", tags: { archetype: "reluctant", bottleneck: "time-scarcity" } },
    ],
  },
  {
    question: "Your ideal next 90 days?",
    options: [
      { text: "Double my income", tags: { archetype: "launcher", bottleneck: "no-monetization" } },
      { text: "Build sustainable systems", tags: { archetype: "freedom", bottleneck: "tech-overwhelm" } },
      { text: "Launch a new offer", tags: { archetype: "launcher", bottleneck: "content-confusion" } },
      { text: "Take back my time", tags: { archetype: "freedom", bottleneck: "time-scarcity" } },
    ],
  },
];

export const ARTIST_TRACK_QUESTIONS: Record<TrackKey, QuizQuestion[]> = {
  emerging: EMERGING_QUESTIONS,
  growing: GROWING_QUESTIONS,
  established: ESTABLISHED_QUESTIONS,
};

export const ARTIST_ARCHETYPE_QUESTIONS: ArchetypeQuestion[] = [
  {
    question: "When you think about posting content, your first reaction is...",
    multiSelect: true,
    minSelections: 1,
    maxSelections: 2,
    options: [
      { text: "\"What will my colleagues think?\"", archetype: "credentialed" },
      { text: "\"I don't have time for this\"", archetype: "reluctant" },
      { text: "\"I should just focus on my craft\"", archetype: "performer" },
      { text: "\"This could open so many doors\"", archetype: "freedom" },
    ],
  },
  {
    question: "Your dream scenario involves...",
    options: [
      { text: "Performing full-time without financial stress", archetype: "performer" },
      { text: "Being recognized as a leader in my field", archetype: "credentialed" },
      { text: "Building a business around my art", archetype: "launcher" },
      { text: "Having complete creative and financial freedom", archetype: "freedom" },
    ],
  },
  {
    question: "People come to you for...",
    options: [
      { text: "Your exceptional skill/talent", archetype: "performer" },
      { text: "Your teaching ability", archetype: "credentialed" },
      { text: "Your unique perspective", archetype: "launcher" },
      { text: "Your professional connections", archetype: "freedom" },
    ],
  },
  {
    question: "On a free Saturday, you'd rather...",
    options: [
      { text: "Practice and perfect your craft", archetype: "performer" },
      { text: "Create content to share your art", archetype: "launcher" },
      { text: "Work on your business/marketing", archetype: "freedom" },
      { text: "Rest—you're exhausted", archetype: "reluctant" },
    ],
  },
  {
    question: "Your biggest untapped asset is...",
    options: [
      { text: "Years of archived performances", archetype: "performer" },
      { text: "Your professional credentials", archetype: "credentialed" },
      { text: "Your teaching ability", archetype: "credentialed" },
      { text: "Your unique story", archetype: "freedom" },
    ],
  },
];
