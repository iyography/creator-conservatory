import type { CreatorType, TrackKey, QuizQuestion, ArchetypeQuestion } from "../types";
import { ARTIST_TRACK_QUESTIONS, ARTIST_ARCHETYPE_QUESTIONS } from "./artist";
import { FACELESS_TRACK_QUESTIONS, FACELESS_ARCHETYPE_QUESTIONS } from "./faceless";
import { BRAND_TRACK_QUESTIONS, BRAND_ARCHETYPE_QUESTIONS } from "./brand";
import { ECOMMERCE_TRACK_QUESTIONS, ECOMMERCE_ARCHETYPE_QUESTIONS } from "./ecommerce";

export const ALL_TRACK_QUESTIONS: Record<CreatorType, Record<TrackKey, QuizQuestion[]>> = {
  artist: ARTIST_TRACK_QUESTIONS,
  faceless: FACELESS_TRACK_QUESTIONS,
  brand: BRAND_TRACK_QUESTIONS,
  ecommerce: ECOMMERCE_TRACK_QUESTIONS,
};

export const ALL_ARCHETYPE_QUESTIONS: Record<CreatorType, ArchetypeQuestion[]> = {
  artist: ARTIST_ARCHETYPE_QUESTIONS,
  faceless: FACELESS_ARCHETYPE_QUESTIONS,
  brand: BRAND_ARCHETYPE_QUESTIONS,
  ecommerce: ECOMMERCE_ARCHETYPE_QUESTIONS,
};

export function getTrackQuestions(creatorType: CreatorType, track: TrackKey): QuizQuestion[] {
  return ALL_TRACK_QUESTIONS[creatorType][track];
}

export function getArchetypeQuestions(creatorType: CreatorType): ArchetypeQuestion[] {
  return ALL_ARCHETYPE_QUESTIONS[creatorType];
}
