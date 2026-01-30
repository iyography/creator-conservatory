"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step =
  | "intro"
  | "track-select"
  | "questions"
  | "archetype-questions"
  | "contact"
  | "calculating"
  | "results";

type TrackKey = "emerging" | "growing" | "established";

type ArchetypeKey =
  | "performer"
  | "credentialed"
  | "reluctant"
  | "launcher"
  | "freedom";

interface QuizOption {
  text: string;
  tags: {
    archetype: ArchetypeKey;
    bottleneck: string;
  };
}

interface ArchetypeOption {
  text: string;
  archetype: ArchetypeKey;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
  multiSelect?: boolean;
  minSelections?: number;
  maxSelections?: number;
}

interface ArchetypeQuestion {
  question: string;
  options: ArchetypeOption[];
  multiSelect?: boolean;
  minSelections?: number;
  maxSelections?: number;
}

interface ResultContent {
  description: string;
  strikeZone: string;
  focus: string[];
  ignore: string;
  ninetyDayPath: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const TRACKS: Record<TrackKey, { emoji: string; name: string; description: string }> = {
  emerging: { emoji: "🌱", name: "Emerging Artist", description: "New to social media, have skills but no digital presence" },
  growing: { emoji: "📈", name: "Growing Artist", description: "Started posting (under 10k followers), want more consistency and results" },
  established: { emoji: "⭐", name: "Established Artist", description: "10k+ followers or making money, ready to scale and systemize" },
};

const ARCHETYPES: Record<ArchetypeKey, { name: string; emoji: string }> = {
  performer: { name: "The Stage Star", emoji: "🎭" },
  credentialed: { name: "The Credentialed Creator", emoji: "🎓" },
  reluctant: { name: "The Reluctant Marketer", emoji: "🙈" },
  launcher: { name: "The Product Launcher", emoji: "🚀" },
  freedom: { name: "The Freedom Seeker", emoji: "🦅" },
};

const BOTTLENECK_NAMES: Record<string, string> = {
  "tech-overwhelm": "Tech Overwhelm",
  "credibility-fear": "Credibility Fear",
  "perfectionism": "Perfectionism Paralysis",
  "no-monetization": "No Clear Monetization Path",
  "content-confusion": "Content Confusion",
  "audience-mismatch": "Audience Mismatch",
  "time-scarcity": "Time Scarcity",
  "no-audience": "No Audience to Sell To",
};

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

const ARCHETYPE_QUESTIONS: ArchetypeQuestion[] = [
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

const TRACK_QUESTIONS: Record<TrackKey, QuizQuestion[]> = {
  emerging: EMERGING_QUESTIONS,
  growing: GROWING_QUESTIONS,
  established: ESTABLISHED_QUESTIONS,
};

const RESULTS: Record<string, ResultContent> = {
  // PERFORMER + TRACKS
  "performer-emerging": {
    description: "You're a talented performer who wants to share your art with the world but haven't started building your online presence yet.",
    strikeZone: "Your path forward: Document your practice and performances to build a foundation of authentic content.",
    focus: [
      "Set up your primary platform (Instagram or TikTok)",
      "Post your first 10 practice/performance clips",
      "Study 3 artists in your niche who are doing it well",
      "Join the community and introduce yourself"
    ],
    ignore: "Don't worry about perfect lighting or editing. Don't try to go viral. Focus on consistency over polish.",
    ninetyDayPath: [
      "Week 1-2: Post 5 simple clips from your archive",
      "Week 3-4: Learn basic editing, improve your hooks",
      "Week 5-8: Post 3x/week, engage with similar artists",
      "Week 9-12: Analyze what works, double down"
    ]
  },
  "performer-growing": {
    description: "You're actively performing and posting, but your content quality doesn't reflect your actual skill level. You know you could be doing better.",
    strikeZone: "Your path forward: Develop a signature style that showcases your unique artistry and keeps people watching.",
    focus: [
      "Create a content series around your performances",
      "Master one editing tool (CapCut recommended)",
      "Post 3-5x per week for 30 days straight",
      "Engage with 10 accounts in your niche daily"
    ],
    ignore: "Stop comparing yourself to people with millions of followers. Don't change your style to chase trends that don't fit you.",
    ninetyDayPath: [
      "Week 1-2: Audit your best content, identify patterns",
      "Week 3-4: Create 3 content series concepts",
      "Week 5-8: Execute your best series, iterate",
      "Week 9-12: Analyze, optimize, scale what works"
    ]
  },
  "performer-established": {
    description: "You've built an audience but you're stretched thin between performing and content creation. You need systems, not more hustle.",
    strikeZone: "Your path forward: Build a content engine that runs efficiently while you focus on your art.",
    focus: [
      "Batch your content creation (film once, post many)",
      "Hire or train an editor to handle post-production",
      "Create templates for your recurring content types",
      "Set up automated posting and engagement systems"
    ],
    ignore: "Don't try to do everything yourself. Don't sacrifice performance quality for content quantity.",
    ninetyDayPath: [
      "Week 1-2: Document your current content workflow",
      "Week 3-4: Identify what can be delegated or automated",
      "Week 5-8: Implement systems, train help if needed",
      "Week 9-12: Optimize and measure time saved"
    ]
  },

  // CREDENTIALED + TRACKS
  "credentialed-emerging": {
    description: "You have impressive credentials and real expertise, but you're worried social media will undermine your professional reputation.",
    strikeZone: "Your path forward: Create educational content that positions you as the expert you already are.",
    focus: [
      "Start with educational/teaching content (your safe zone)",
      "Share insights only you can provide with your background",
      "Connect with other credentialed artists doing it well",
      "Frame content around your expertise, not entertainment"
    ],
    ignore: "Don't try to be trendy or entertaining. Don't hide your credentials—they're your superpower. Avoid meme culture.",
    ninetyDayPath: [
      "Week 1-2: List 20 things only you can teach",
      "Week 3-4: Create your first 5 educational posts",
      "Week 5-8: Build a following of people who value expertise",
      "Week 9-12: Start converting followers to students/clients"
    ]
  },
  "credentialed-growing": {
    description: "You've started posting but you're holding back. Your fear of judgment from colleagues is limiting your reach and authenticity.",
    strikeZone: "Your path forward: Own your expertise publicly and become the go-to voice in your corner of the art world.",
    focus: [
      "Share more controversial or unique opinions",
      "Create content that showcases your credentials naturally",
      "Build relationships with other credentialed creators",
      "Start positioning for speaking/teaching opportunities"
    ],
    ignore: "Stop caring what the old guard thinks. Don't water down your expertise to seem relatable. Your depth is your differentiator.",
    ninetyDayPath: [
      "Week 1-2: Identify your unique point of view",
      "Week 3-4: Create content that asserts your expertise",
      "Week 5-8: Engage with industry conversations publicly",
      "Week 9-12: Pitch yourself for features, podcasts, events"
    ]
  },
  "credentialed-established": {
    description: "You're recognized in your field but not leveraging that recognition online. Your offline reputation far exceeds your online presence.",
    strikeZone: "Your path forward: Translate your offline credibility into online authority and new revenue streams.",
    focus: [
      "Create a high-ticket offer that matches your reputation",
      "Build an email list of your existing network",
      "Develop a course or program around your expertise",
      "Use your credentials to get featured on major platforms"
    ],
    ignore: "Don't undercharge. Don't compete with people who aren't in your league. Your time is worth more than most content creators'.",
    ninetyDayPath: [
      "Week 1-2: Define your premium offer",
      "Week 3-4: Build landing page, create email sequence",
      "Week 5-8: Launch to existing network first",
      "Week 9-12: Refine offer, plan public launch"
    ]
  },

  // RELUCTANT + TRACKS
  "reluctant-emerging": {
    description: "You know you need to be online but the whole thing feels overwhelming and inauthentic. Technology and trends move too fast.",
    strikeZone: "Your path forward: Start with the simplest possible approach and build confidence gradually.",
    focus: [
      "Pick ONE platform (wherever you already spend time)",
      "Post just 2x per week to start (not more)",
      "Use your phone camera, no fancy equipment",
      "Focus on documenting, not creating"
    ],
    ignore: "Don't try to learn everything at once. Don't compare yourself to established creators. Ignore any tool that feels overwhelming.",
    ninetyDayPath: [
      "Week 1-2: Post 2 simple pieces of content",
      "Week 3-4: Get comfortable with the posting process",
      "Week 5-8: Gradually increase to 3x per week",
      "Week 9-12: Learn one new tool or technique"
    ]
  },
  "reluctant-growing": {
    description: "You've started but you can't stay consistent. Life gets in the way, and honestly, you're not sure this is even working.",
    strikeZone: "Your path forward: Build systems so simple you can't fail, even on your worst weeks.",
    focus: [
      "Create a content bank of 10+ ready-to-post pieces",
      "Set up a simple content calendar (pen and paper is fine)",
      "Batch create on your high-energy days",
      "Have a 'minimum viable post' for busy weeks"
    ],
    ignore: "Stop beating yourself up about gaps. Don't commit to more than you can sustain. Perfectionism is your enemy.",
    ninetyDayPath: [
      "Week 1-2: Build your content bank",
      "Week 3-4: Post from bank while building more",
      "Week 5-8: Establish your sustainable rhythm",
      "Week 9-12: Optimize based on what's working"
    ]
  },
  "reluctant-established": {
    description: "You've achieved success despite your online presence, not because of it. But you know you're leaving opportunities on the table.",
    strikeZone: "Your path forward: Systematize content creation so it requires minimal time and energy from you.",
    focus: [
      "Hire someone to manage your content",
      "Repurpose existing performances and materials",
      "Create evergreen content that works for months",
      "Focus on high-impact, low-frequency posting"
    ],
    ignore: "Don't try to become a full-time content creator. You don't need to post daily. Outsource what drains you.",
    ninetyDayPath: [
      "Week 1-2: Audit your existing content assets",
      "Week 3-4: Hire help or set up automation",
      "Week 5-8: Create systems for passive content",
      "Week 9-12: Measure ROI, adjust strategy"
    ]
  },

  // LAUNCHER + TRACKS
  "launcher-emerging": {
    description: "You have (or want to have) something to sell, but no audience to sell it to. You need to build before you can monetize.",
    strikeZone: "Your path forward: Build an audience of potential buyers before you try to sell anything.",
    focus: [
      "Create content that attracts your ideal customer",
      "Start building an email list from day one",
      "Provide massive value before asking for anything",
      "Study how successful artist-entrepreneurs do it"
    ],
    ignore: "Don't try to sell to an audience of zero. Don't build a product before you have people who want it.",
    ninetyDayPath: [
      "Week 1-2: Define your ideal customer",
      "Week 3-4: Create content that attracts them",
      "Week 5-8: Build email list to 100+ subscribers",
      "Week 9-12: Test your offer with early adopters"
    ]
  },
  "launcher-growing": {
    description: "You have followers but they're not converting to customers. Your audience likes your content but doesn't buy your products.",
    strikeZone: "Your path forward: Bridge the gap between free content and paid offers with strategic positioning.",
    focus: [
      "Create content that naturally leads to your offers",
      "Build a clear customer journey in your content",
      "Launch smaller offers to warm up your audience",
      "Collect testimonials and social proof aggressively"
    ],
    ignore: "Don't create more free content hoping sales will follow. Don't discount your prices to make sales.",
    ninetyDayPath: [
      "Week 1-2: Map your customer journey",
      "Week 3-4: Create transition content",
      "Week 5-8: Launch a small offer to test",
      "Week 9-12: Refine based on results, scale"
    ]
  },
  "launcher-established": {
    description: "You're making money but you're capped by your time. You need to scale beyond 1-on-1 or one-off sales.",
    strikeZone: "Your path forward: Create scalable products and automated funnels that work while you sleep.",
    focus: [
      "Build a signature course or program",
      "Create an automated email sales sequence",
      "Develop multiple price points (low, mid, high)",
      "Set up systems for passive income"
    ],
    ignore: "Stop trading time for money at every level. Don't keep doing what got you here if it won't get you further.",
    ninetyDayPath: [
      "Week 1-2: Design your product suite",
      "Week 3-4: Build your flagship offering",
      "Week 5-8: Create automated sales funnels",
      "Week 9-12: Launch and optimize"
    ]
  },

  // FREEDOM + TRACKS
  "freedom-emerging": {
    description: "You want social media to give you freedom—from day jobs, from touring, from financial stress. You just need to get started.",
    strikeZone: "Your path forward: Build a foundation that can eventually support the freedom you're seeking.",
    focus: [
      "Start with content that showcases your versatility",
      "Explore multiple potential income streams",
      "Connect with artists who've achieved your dream",
      "Keep your vision clear while doing the work"
    ],
    ignore: "Don't expect overnight success. Don't quit your safety net too early. Freedom is built, not found.",
    ninetyDayPath: [
      "Week 1-2: Define what freedom means to you specifically",
      "Week 3-4: Start posting and testing content types",
      "Week 5-8: Identify your most promising path",
      "Week 9-12: Double down on what's working"
    ]
  },
  "freedom-growing": {
    description: "You're making progress but you're not free yet. The content hamster wheel feels like just another job sometimes.",
    strikeZone: "Your path forward: Build systems and income streams that give you back your time and autonomy.",
    focus: [
      "Diversify income so no single source owns you",
      "Build systems that reduce your content labor",
      "Create evergreen content that works long-term",
      "Start saying no to opportunities that don't serve you"
    ],
    ignore: "Don't sacrifice your art for content. Don't take every opportunity—be strategic. Protect your creative energy.",
    ninetyDayPath: [
      "Week 1-2: Audit where your time and energy go",
      "Week 3-4: Identify what can be systematized",
      "Week 5-8: Implement freedom-building systems",
      "Week 9-12: Measure freedom gains, adjust"
    ]
  },
  "freedom-established": {
    description: "You've built something real but success has created new constraints. You need to redesign for true freedom.",
    strikeZone: "Your path forward: Restructure your business around your ideal lifestyle, not maximum revenue.",
    focus: [
      "Define your 'enough' number and optimize for it",
      "Build a team or systems that don't require you daily",
      "Create passive income streams",
      "Design your ideal week and work backwards"
    ],
    ignore: "Don't chase more for more's sake. Don't feel guilty about working less. Success means nothing without freedom.",
    ninetyDayPath: [
      "Week 1-2: Design your ideal lifestyle",
      "Week 3-4: Identify what needs to change",
      "Week 5-8: Implement structural changes",
      "Week 9-12: Protect your new boundaries"
    ]
  },
};

// ─── Animation Variants ──────────────────────────────────────────────────────

const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function QuizPage() {
  const [step, setStep] = useState<Step>("intro");
  const [track, setTrack] = useState<TrackKey | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [trackAnswers, setTrackAnswers] = useState<number[][]>([]);
  const [archetypeAnswers, setArchetypeAnswers] = useState<number[][]>([]);
  const [currentSelections, setCurrentSelections] = useState<number[]>([]);
  const [contactForm, setContactForm] = useState({ fullName: "", email: "", phone: "" });
  const [calcText, setCalcText] = useState("Analyzing your responses...");
  const [direction, setDirection] = useState(1);

  // Computed results
  const [resultArchetype, setResultArchetype] = useState<ArchetypeKey>("performer");
  const [resultBottleneck, setResultBottleneck] = useState("");

  const questions = track ? TRACK_QUESTIONS[track] : [];
  const totalQuestions = 15; // 10 track + 5 archetype

  // ─── Navigation helpers ──────────────────────────────────────────────────

  function goTo(next: Step) {
    setDirection(1);
    setStep(next);
  }

  function goBack() {
    setDirection(-1);
    if (step === "archetype-questions") {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setArchetypeAnswers(archetypeAnswers.slice(0, -1));
        setCurrentSelections(archetypeAnswers[currentQuestion - 1] || []);
      } else {
        setCurrentQuestion(9);
        setTrackAnswers(trackAnswers.slice(0, -1));
        setCurrentSelections(trackAnswers[9] || []);
        setStep("questions");
      }
    } else if (step === "questions") {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setTrackAnswers(trackAnswers.slice(0, -1));
        setCurrentSelections(trackAnswers[currentQuestion - 1] || []);
      } else {
        setStep("track-select");
        setCurrentSelections([]);
      }
    }
  }

  // ─── Track selection ─────────────────────────────────────────────────────

  function selectTrack(t: TrackKey) {
    setTrack(t);
    setCurrentQuestion(0);
    setTrackAnswers([]);
    setArchetypeAnswers([]);
    setCurrentSelections([]);
    goTo("questions");
  }

  // ─── Answer selection ────────────────────────────────────────────────────

  function toggleOption(optionIndex: number) {
    const currentQuestion_ = step === "questions" ? questions[currentQuestion] : ARCHETYPE_QUESTIONS[currentQuestion];

    if (currentQuestion_?.multiSelect) {
      // Multi-select logic
      setCurrentSelections(prev => {
        const isSelected = prev.includes(optionIndex);
        if (isSelected) {
          return prev.filter(i => i !== optionIndex);
        } else {
          const maxSelections = currentQuestion_.maxSelections || 999;
          if (prev.length >= maxSelections) {
            return prev; // Don't allow more than max selections
          }
          return [...prev, optionIndex];
        }
      });
    } else {
      // Single select - auto advance
      if (step === "questions") {
        selectTrackAnswer(optionIndex);
      } else {
        selectArchetypeAnswer(optionIndex);
      }
    }
  }

  function nextQuestion() {
    if (step === "questions") {
      const newAnswers = [...trackAnswers, currentSelections];
      setTrackAnswers(newAnswers);
      setCurrentSelections([]);

      if (currentQuestion < 9) {
        setTimeout(() => {
          setDirection(1);
          setCurrentQuestion(currentQuestion + 1);
        }, 300);
      } else {
        setTimeout(() => {
          setCurrentQuestion(0);
          goTo("archetype-questions");
        }, 300);
      }
    } else {
      const newAnswers = [...archetypeAnswers, currentSelections];
      setArchetypeAnswers(newAnswers);
      setCurrentSelections([]);

      if (currentQuestion < 4) {
        setTimeout(() => {
          setDirection(1);
          setCurrentQuestion(currentQuestion + 1);
        }, 300);
      } else {
        setTimeout(() => {
          goTo("contact");
        }, 300);
      }
    }
  }

  function selectTrackAnswer(optionIndex: number) {
    const newAnswers = [...trackAnswers, [optionIndex]];
    setTrackAnswers(newAnswers);

    if (currentQuestion < 9) {
      setTimeout(() => {
        setDirection(1);
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setCurrentQuestion(0);
        setCurrentSelections([]);
        goTo("archetype-questions");
      }, 300);
    }
  }

  function selectArchetypeAnswer(optionIndex: number) {
    const newAnswers = [...archetypeAnswers, [optionIndex]];
    setArchetypeAnswers(newAnswers);

    if (currentQuestion < 4) {
      setTimeout(() => {
        setDirection(1);
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setCurrentSelections([]);
        goTo("contact");
      }, 300);
    }
  }

  // ─── Scoring ─────────────────────────────────────────────────────────────

  function calculateResults() {
    const archetypeCounts: Record<ArchetypeKey, number> = {
      performer: 0, credentialed: 0, reluctant: 0, launcher: 0, freedom: 0,
    };
    const bottleneckCounts: Record<string, number> = {};

    // Track questions (1x weight)
    trackAnswers.forEach((selections, qIdx) => {
      const q = questions[qIdx];
      if (q && selections) {
        selections.forEach(optIdx => {
          if (q.options[optIdx]) {
            const tags = q.options[optIdx].tags;
            archetypeCounts[tags.archetype] += 1;
            bottleneckCounts[tags.bottleneck] = (bottleneckCounts[tags.bottleneck] || 0) + 1;
          }
        });
      }
    });

    // Archetype questions (2x weight)
    archetypeAnswers.forEach((selections, qIdx) => {
      const q = ARCHETYPE_QUESTIONS[qIdx];
      if (q && selections) {
        selections.forEach(optIdx => {
          if (q.options[optIdx]) {
            archetypeCounts[q.options[optIdx].archetype] += 2;
          }
        });
      }
    });

    // Determine archetype
    const sortedArchetypes = (Object.entries(archetypeCounts) as [ArchetypeKey, number][])
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const topArchetype = sortedArchetypes[0][0];

    // Determine bottleneck
    const sortedBottlenecks = Object.entries(bottleneckCounts).sort((a, b) => b[1] - a[1]);
    const topBottleneck = sortedBottlenecks.length > 0 ? sortedBottlenecks[0][0] : "content-confusion";

    setResultArchetype(topArchetype);
    setResultBottleneck(topBottleneck);

    return { archetype: topArchetype, bottleneck: topBottleneck };
  }

  // ─── Submit ──────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { archetype, bottleneck } = calculateResults();
    const resultKey = `${archetype}-${track}`;
    const result = RESULTS[resultKey];

    goTo("calculating");

    // Build answers array
    const answersData = trackAnswers.map((selections, qIdx) => ({
      questionIndex: qIdx,
      selectedOption: selections.map(optIdx => questions[qIdx]?.options[optIdx]?.text ?? "").join(", "),
    }));
    ARCHETYPE_QUESTIONS.forEach((q, qIdx) => {
      const selections = archetypeAnswers[qIdx] || [];
      answersData.push({
        questionIndex: 10 + qIdx,
        selectedOption: selections.map(optIdx => q.options[optIdx]?.text ?? "").join(", "),
      });
    });

    try {
      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: contactForm.fullName,
          email: contactForm.email,
          phone: contactForm.phone,
          track,
          archetype,
          archetypeName: ARCHETYPES[archetype].name,
          bottleneck,
          strikeZone: result?.strikeZone ?? "",
          focus: result?.focus ?? [],
          ignoreList: result?.ignore ?? "",
          ninetyDayPath: result?.ninetyDayPath?.join(" | ") ?? "",
          answers: answersData,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
    } catch {
      // Silently continue to results
    }
  }

  // ─── Calculating animation ──────────────────────────────────────────────

  useEffect(() => {
    if (step !== "calculating") return;
    const messages = [
      "Analyzing your responses...",
      "Identifying your artist archetype...",
      "Preparing your personalized plan...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < messages.length) {
        setCalcText(messages[i]);
      } else {
        clearInterval(interval);
        goTo("results");
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ─── Result data ─────────────────────────────────────────────────────────

  const resultKey = `${resultArchetype}-${track}`;
  const resultData = RESULTS[resultKey];
  const archetypeData = ARCHETYPES[resultArchetype];
  const bottleneckName = BOTTLENECK_NAMES[resultBottleneck] || resultBottleneck;

  // ─── Progress ────────────────────────────────────────────────────────────

  const progressNumber =
    step === "questions"
      ? currentQuestion + 1
      : step === "archetype-questions"
      ? 10 + currentQuestion + 1
      : 0;

  const progressPercent = (progressNumber / totalQuestions) * 100;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
    <Navbar />
    <div
      className="min-h-screen text-white overflow-hidden font-sans pt-20 relative"
    >
      {/* Persistent background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="/vids/2.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/60 z-0" />

      <AnimatePresence mode="wait" custom={direction}>
        {/* ── Intro ─────────────────────────────────────────────── */}
        {step === "intro" && (
          <motion.div
            key="intro"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10"
          >
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
                TAKE THE{" "}
                <span className="text-white">CREATOR QUIZ</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
                Find out what&apos;s really holding you back from growing online—and get your personalized action plan in 3 minutes.
              </p>
              <button
                onClick={() => goTo("track-select")}
                className="bg-white hover:bg-white/90 text-black text-lg font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                Start The Quiz &rarr;
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Track Select ──────────────────────────────────────── */}
        {step === "track-select" && (
          <motion.div
            key="track-select"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
          >
            <div className="max-w-2xl w-full relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-white">
                First, where are you on your journey?
              </h2>
              <p className="text-white/70 text-center mb-10">
                Select the stage that best describes you right now.
              </p>

              <div className="space-y-4">
                {(Object.entries(TRACKS) as [TrackKey, typeof TRACKS.emerging][]).map(
                  ([key, t]) => (
                    <button
                      key={key}
                      onClick={() => selectTrack(key)}
                      className="w-full text-left p-6 rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm hover:border-white hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{t.emoji}</span>
                        <div>
                          <div className="text-xl font-semibold group-hover:text-white transition-colors text-white">
                            {t.name}
                          </div>
                          <div className="text-white/70 text-sm mt-1">
                            {t.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Track Questions ───────────────────────────────────── */}
        {step === "questions" && (
          <motion.div
            key="questions"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col px-6 pt-8 pb-12 relative z-10"
          >
            {/* Question */}
            <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tq-${currentQuestion}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                      <button
                        onClick={goBack}
                        className="hover:text-white transition-colors"
                      >
                        &larr; Back
                      </button>
                      <span>
                        Question {progressNumber} of {totalQuestions}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
                    {questions[currentQuestion]?.question}
                  </h3>
                  <div className="space-y-3">
                    {questions[currentQuestion]?.options.map((opt, idx) => {
                      const isSelected = currentSelections.includes(idx);
                      const isMultiSelect = questions[currentQuestion]?.multiSelect;

                      return (
                        <button
                          key={idx}
                          onClick={() => toggleOption(idx)}
                          className={`w-full text-left p-5 rounded-xl border transition-all duration-300 text-lg ${
                            isSelected
                              ? 'border-white bg-white/10 shadow-lg'
                              : 'border-white/20 bg-black/40 backdrop-blur-sm hover:border-white hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isMultiSelect && (
                              <div className={`w-5 h-5 border-2 rounded transition-all ${
                                isSelected ? 'border-white bg-white' : 'border-[#64748B]'
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            )}
                            <span className="text-white">{opt.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {questions[currentQuestion]?.multiSelect && (
                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-white/70 text-sm">
                        Select {questions[currentQuestion]?.minSelections || 1}-{questions[currentQuestion]?.maxSelections || questions[currentQuestion]?.options.length} options
                      </p>
                      <button
                        onClick={nextQuestion}
                        disabled={currentSelections.length < (questions[currentQuestion]?.minSelections || 1)}
                        className="bg-white hover:bg-white/90 text-black disabled:bg-[#94A3B8] disabled:cursor-not-allowed px-6 py-2 rounded-full font-semibold transition-all duration-300"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── Archetype Questions ───────────────────────────────── */}
        {step === "archetype-questions" && (
          <motion.div
            key="archetype-questions"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col px-6 pt-8 pb-12 relative z-10"
          >
            {/* Question */}
            <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`aq-${currentQuestion}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Progress bar */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                      <button
                        onClick={goBack}
                        className="hover:text-white transition-colors"
                      >
                        &larr; Back
                      </button>
                      <span>
                        Question {progressNumber} of {totalQuestions}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
                    {ARCHETYPE_QUESTIONS[currentQuestion]?.question}
                  </h3>
                  <div className="space-y-3">
                    {ARCHETYPE_QUESTIONS[currentQuestion]?.options.map((opt, idx) => {
                      const isSelected = currentSelections.includes(idx);
                      const isMultiSelect = ARCHETYPE_QUESTIONS[currentQuestion]?.multiSelect;

                      return (
                        <button
                          key={idx}
                          onClick={() => toggleOption(idx)}
                          className={`w-full text-left p-5 rounded-xl border transition-all duration-300 text-lg ${
                            isSelected
                              ? 'border-white bg-white/10 shadow-lg'
                              : 'border-white/20 bg-black/40 backdrop-blur-sm hover:border-white hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isMultiSelect && (
                              <div className={`w-5 h-5 border-2 rounded transition-all ${
                                isSelected ? 'border-white bg-white' : 'border-[#64748B]'
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            )}
                            <span className="text-white">{opt.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {ARCHETYPE_QUESTIONS[currentQuestion]?.multiSelect && (
                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-white/70 text-sm">
                        Select {ARCHETYPE_QUESTIONS[currentQuestion]?.minSelections || 1}-{ARCHETYPE_QUESTIONS[currentQuestion]?.maxSelections || ARCHETYPE_QUESTIONS[currentQuestion]?.options.length} options
                      </p>
                      <button
                        onClick={nextQuestion}
                        disabled={currentSelections.length < (ARCHETYPE_QUESTIONS[currentQuestion]?.minSelections || 1)}
                        className="bg-white hover:bg-white/90 text-black disabled:bg-[#94A3B8] disabled:cursor-not-allowed px-6 py-2 rounded-full font-semibold transition-all duration-300"
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── Contact Form ──────────────────────────────────────── */}
        {step === "contact" && (
          <motion.div
            key="contact"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
          >
            <div className="max-w-md w-full relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-white">
                Almost there!
              </h2>
              <p className="text-white/70 text-center mb-8">
                Enter your details to see your personalized results.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-white/70 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.fullName}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, fullName: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-white/90 text-black text-lg font-semibold py-4 rounded-full transition-all duration-300 hover:scale-[1.02] mt-4"
                >
                  Reveal My Results
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ── Calculating ───────────────────────────────────────── */}
        {step === "calculating" && (
          <motion.div
            key="calculating"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl mb-8"
            >
              🎨
            </motion.div>
            <h2 className="text-2xl font-bold mb-6 text-white">Analyzing your responses...</h2>
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </div>
            <motion.p
              key={calcText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/70 text-lg"
            >
              {calcText}
            </motion.p>
          </motion.div>
        )}

        {/* ── Results ───────────────────────────────────────────── */}
        {step === "results" && resultData && (
          <motion.div
            key="results"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="min-h-screen px-6 py-12 relative z-10"
          >
            <div className="max-w-2xl mx-auto">
              {/* Archetype Badge */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="inline-block text-7xl mb-4"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(30, 58, 95, 0.3))",
                  }}
                >
                  {archetypeData.emoji}
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-bold mb-2 text-white"
                >
                  You are{" "}
                  <span className="text-white">{archetypeData.name}</span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="inline-block bg-white text-white text-sm px-4 py-1.5 rounded-full"
                >
                  {track && TRACKS[track].emoji} {track && TRACKS[track].name}
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white/70 text-lg leading-relaxed mb-8 text-center"
              >
                {resultData.description}
              </motion.p>

              {/* Strike Zone / Path Forward */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="border-2 border-white rounded-xl p-6 mb-8 bg-black/40 backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                  Your Path Forward
                </h3>
                <p className="text-white text-xl font-semibold">
                  {resultData.strikeZone}
                </p>
              </motion.div>

              {/* Focus Areas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Your Focus Areas</h3>
                <div className="space-y-3">
                  {resultData.focus.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-white mt-0.5">&#10003;</span>
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What to Ignore */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  What to Ignore
                </h3>
                <p className="text-white/70">{resultData.ignore}</p>
              </motion.div>

              {/* Bottleneck */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">Your Main Bottleneck</h3>
                <div className="inline-block bg-white text-black px-4 py-2 rounded-lg font-semibold text-lg">
                  {bottleneckName}
                </div>
                <p className="text-white/70 text-sm mt-3">
                  This is the #1 thing holding you back. Focus here first to unlock
                  your full potential.
                </p>
              </motion.div>

              {/* 90-Day Path */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Your 90-Day Path</h3>
                <div className="space-y-3">
                  {resultData.ninetyDayPath.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="bg-white text-white text-xs px-2 py-1 rounded font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-white rounded-xl p-8 mb-8 text-black text-center"
              >
                <h3 className="text-2xl font-bold mb-3">Ready to take action?</h3>
                <p className="text-black/70 mb-6">
                  Join Creator Conservatory and get the community, tools, and guidance to make your 90-day path a reality.
                </p>
                <a
                  href="https://www.skool.com/the-creator-conservatory-3365"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black hover:bg-black/80 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg"
                >
                  Join Creator Conservatory Free
                </a>
              </motion.div>

              {/* Copy Results & Actions */}
              <div className="text-center pb-8 space-y-4">
                <button
                  onClick={() => {
                    const resultsText = `
🎨 ${archetypeData.name}
${track && TRACKS[track].emoji} ${track && TRACKS[track].name}

${resultData.description}

🎯 Your Path Forward:
${resultData.strikeZone}

✅ Your Focus Areas:
${resultData.focus.map(item => `• ${item}`).join('\n')}

❌ What to Ignore:
${resultData.ignore}

🚫 Your Bottleneck: ${bottleneckName}
This is the #1 thing holding you back. Focus here first to unlock your full potential.

📅 Your 90-Day Path:
${resultData.ninetyDayPath.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Join Creator Conservatory: https://www.skool.com/the-creator-conservatory-3365
                    `.trim();

                    navigator.clipboard.writeText(resultsText).then(() => {
                      // Show a brief success message
                      const button = event?.target as HTMLButtonElement;
                      const originalText = button.textContent;
                      button.textContent = "Copied! ✓";
                      button.className = "bg-white text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 mb-4";
                      setTimeout(() => {
                        button.textContent = originalText;
                        button.className = "bg-white hover:bg-white/90 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 mb-4";
                      }, 2000);
                    }).catch(() => {
                      alert('Results copied to clipboard!');
                    });
                  }}
                  className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 mb-4"
                >
                  📋 Copy My Results
                </button>
                <br />
                <button
                  onClick={() => {
                    setStep("intro");
                    setTrack(null);
                    setCurrentQuestion(0);
                    setTrackAnswers([]);
                    setArchetypeAnswers([]);
                    setCurrentSelections([]);
                    setContactForm({ fullName: "", email: "", phone: "" });
                  }}
                  className="text-white/70 hover:text-white transition-colors underline underline-offset-4"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
