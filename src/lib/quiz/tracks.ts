import type { CreatorType, TrackKey, TrackConfig } from "./types";

export const TRACKS: Record<CreatorType, Record<TrackKey, TrackConfig>> = {
  artist: {
    emerging: { emoji: "🌱", name: "Emerging Artist", description: "New to social media, have skills but no digital presence" },
    growing: { emoji: "📈", name: "Growing Artist", description: "Started posting (under 10k followers), want more consistency and results" },
    established: { emoji: "⭐", name: "Established Artist", description: "10k+ followers or making money, ready to scale and systemize" },
  },
  faceless: {
    emerging: { emoji: "🌱", name: "Emerging Creator", description: "New to faceless content, exploring niches and formats" },
    growing: { emoji: "📈", name: "Growing Creator", description: "Posting faceless content but haven't cracked consistent growth" },
    established: { emoji: "⭐", name: "Established Creator", description: "Monetizing faceless content, ready to scale systems" },
  },
  brand: {
    emerging: { emoji: "🌱", name: "Emerging Brand", description: "Expert in your field but haven't built an online presence yet" },
    growing: { emoji: "📈", name: "Growing Brand", description: "Posting content but struggling to convert followers to clients" },
    established: { emoji: "⭐", name: "Established Brand", description: "Known in your space, ready to scale thought leadership and revenue" },
  },
  ecommerce: {
    emerging: { emoji: "🌱", name: "Emerging Store", description: "Have products but no content strategy or social presence" },
    growing: { emoji: "📈", name: "Growing Store", description: "Posting product content but not seeing consistent sales from social" },
    established: { emoji: "⭐", name: "Established Store", description: "Making sales from content, ready to scale and systemize" },
  },
};
