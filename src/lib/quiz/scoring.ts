import type { ArchetypeKey, QuizQuestion, ArchetypeQuestion } from "./types";

export function calculateResults(
  trackAnswers: number[][],
  archetypeAnswers: number[][],
  questions: QuizQuestion[],
  archetypeQuestions: ArchetypeQuestion[],
): { archetype: ArchetypeKey; bottleneck: string } {
  const archetypeCounts: Record<ArchetypeKey, number> = {
    performer: 0,
    credentialed: 0,
    reluctant: 0,
    launcher: 0,
    freedom: 0,
  };
  const bottleneckCounts: Record<string, number> = {};

  // Track questions (1x weight)
  trackAnswers.forEach((selections, qIdx) => {
    const q = questions[qIdx];
    if (q && selections) {
      selections.forEach((optIdx) => {
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
    const q = archetypeQuestions[qIdx];
    if (q && selections) {
      selections.forEach((optIdx) => {
        if (q.options[optIdx]) {
          archetypeCounts[q.options[optIdx].archetype] += 2;
        }
      });
    }
  });

  // Determine archetype
  const sortedArchetypes = (
    Object.entries(archetypeCounts) as [ArchetypeKey, number][]
  ).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const topArchetype = sortedArchetypes[0][0];

  // Determine bottleneck
  const sortedBottlenecks = Object.entries(bottleneckCounts).sort(
    (a, b) => b[1] - a[1],
  );
  const topBottleneck =
    sortedBottlenecks.length > 0
      ? sortedBottlenecks[0][0]
      : "content-confusion";

  return { archetype: topArchetype, bottleneck: topBottleneck };
}
