import type { CreatorType, CreatorTypeConfig } from "./types";

export const CREATOR_TYPES: Record<CreatorType, CreatorTypeConfig> = {
  artist: {
    key: "artist",
    emoji: "🎨",
    name: "Artist",
    description: "Musicians, visual artists, performers, and other creative professionals",
  },
  faceless: {
    key: "faceless",
    emoji: "🎭",
    name: "Faceless Creator",
    description: "Build an audience and monetize without showing your face on camera",
  },
  brand: {
    key: "brand",
    emoji: "💼",
    name: "Brand",
    description: "Thought leaders, coaches, consultants, and personal brands",
  },
  ecommerce: {
    key: "ecommerce",
    emoji: "🛒",
    name: "E-Commerce",
    description: "Product-based businesses using content to drive sales",
  },
};

export const CREATOR_TYPE_ORDER: CreatorType[] = ["artist", "faceless", "brand", "ecommerce"];
