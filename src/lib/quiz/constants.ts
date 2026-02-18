import type { ArchetypeKey } from "./types";

export const ARCHETYPES: Record<ArchetypeKey, { name: string; emoji: string }> = {
  performer: { name: "The Stage Star", emoji: "🎭" },
  credentialed: { name: "The Credentialed Creator", emoji: "🎓" },
  reluctant: { name: "The Reluctant Marketer", emoji: "🙈" },
  launcher: { name: "The Product Launcher", emoji: "🚀" },
  freedom: { name: "The Freedom Seeker", emoji: "🦅" },
};

export const BOTTLENECK_NAMES: Record<string, string> = {
  "tech-overwhelm": "Tech Overwhelm",
  "credibility-fear": "Credibility Fear",
  "perfectionism": "Perfectionism Paralysis",
  "no-monetization": "No Clear Monetization Path",
  "content-confusion": "Content Confusion",
  "audience-mismatch": "Audience Mismatch",
  "time-scarcity": "Time Scarcity",
  "no-audience": "No Audience to Sell To",
};

export const slideVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 },
};
