export type CreatorType = "artist" | "faceless" | "brand" | "ecommerce";

export type Step =
  | "intro"
  | "creator-type-select"
  | "track-select"
  | "questions"
  | "archetype-questions"
  | "contact"
  | "calculating"
  | "results";

export type TrackKey = "emerging" | "growing" | "established";

export type ArchetypeKey =
  | "performer"
  | "credentialed"
  | "reluctant"
  | "launcher"
  | "freedom";

export interface QuizOption {
  text: string;
  tags: {
    archetype: ArchetypeKey;
    bottleneck: string;
  };
}

export interface ArchetypeOption {
  text: string;
  archetype: ArchetypeKey;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  multiSelect?: boolean;
  minSelections?: number;
  maxSelections?: number;
}

export interface ArchetypeQuestion {
  question: string;
  options: ArchetypeOption[];
  multiSelect?: boolean;
  minSelections?: number;
  maxSelections?: number;
}

export interface ResultContent {
  description: string;
  strikeZone: string;
  focus: string[];
  ignore: string;
  ninetyDayPath: string[];
}

export interface CreatorTypeConfig {
  key: CreatorType;
  emoji: string;
  name: string;
  description: string;
}

export interface TrackConfig {
  emoji: string;
  name: string;
  description: string;
}
