import type { CreatorType, ResultContent } from "../types";
import { ARTIST_RESULTS } from "./artist";
import { FACELESS_RESULTS } from "./faceless";
import { BRAND_RESULTS } from "./brand";
import { ECOMMERCE_RESULTS } from "./ecommerce";

export const ALL_RESULTS: Record<CreatorType, Record<string, ResultContent>> = {
  artist: ARTIST_RESULTS,
  faceless: FACELESS_RESULTS,
  brand: BRAND_RESULTS,
  ecommerce: ECOMMERCE_RESULTS,
};

export function getResult(creatorType: CreatorType, archetype: string, track: string): ResultContent | undefined {
  return ALL_RESULTS[creatorType]?.[`${archetype}-${track}`];
}
