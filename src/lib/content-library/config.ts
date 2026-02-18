export const tabConfig = {
  social: {
    label: 'Social Posts',
    description: '45 posts — Wins, Strategy, Mindset, Tips & Internal',
    categories: ['Wins', 'Strategy', 'Mindset', 'Tips', 'Internal'],
  },
  content: {
    label: 'Content & Views',
    description: '50 posts — Hooks, Wins, Strategy, Tactics & Stories',
    categories: ['Hooks', 'Wins', 'Strategy', 'Tactics', 'Stories'],
  },
  skool: {
    label: 'Skool',
    description: '100 posts — Connection, Celebration, Reflection, Question, Story, Growth, Monetization, Engagement, Operations & Lessons',
    categories: ['Connection', 'Celebration', 'Reflection', 'Question', 'Story', 'Growth', 'Monetization', 'Engagement', 'Operations', 'Lessons'],
  },
  general: {
    label: 'General Business',
    description: '100 posts — Business Strategy, Marketing & Sales, Mindset & Productivity, Leadership & Team Building',
    categories: ['Business Strategy', 'Marketing & Sales', 'Mindset & Productivity', 'Leadership & Team Building'],
  },
} as const;

export type TabKey = keyof typeof tabConfig;

export const categoryColors: Record<string, { border: string; bg: string; badge: string }> = {
  // Social
  Wins: { border: 'border-emerald-500/40', bg: 'bg-emerald-500/10', badge: 'bg-emerald-500/20 text-emerald-300' },
  Strategy: { border: 'border-blue-500/40', bg: 'bg-blue-500/10', badge: 'bg-blue-500/20 text-blue-300' },
  Mindset: { border: 'border-purple-500/40', bg: 'bg-purple-500/10', badge: 'bg-purple-500/20 text-purple-300' },
  Tips: { border: 'border-amber-500/40', bg: 'bg-amber-500/10', badge: 'bg-amber-500/20 text-amber-300' },
  Internal: { border: 'border-rose-500/40', bg: 'bg-rose-500/10', badge: 'bg-rose-500/20 text-rose-300' },
  // Content
  Hooks: { border: 'border-cyan-500/40', bg: 'bg-cyan-500/10', badge: 'bg-cyan-500/20 text-cyan-300' },
  Tactics: { border: 'border-orange-500/40', bg: 'bg-orange-500/10', badge: 'bg-orange-500/20 text-orange-300' },
  Stories: { border: 'border-pink-500/40', bg: 'bg-pink-500/10', badge: 'bg-pink-500/20 text-pink-300' },
  // Skool
  Connection: { border: 'border-violet-500/40', bg: 'bg-violet-500/10', badge: 'bg-violet-500/20 text-violet-300' },
  Celebration: { border: 'border-sky-500/40', bg: 'bg-sky-500/10', badge: 'bg-sky-500/20 text-sky-300' },
  Reflection: { border: 'border-fuchsia-500/40', bg: 'bg-fuchsia-500/10', badge: 'bg-fuchsia-500/20 text-fuchsia-300' },
  Question: { border: 'border-yellow-500/40', bg: 'bg-yellow-500/10', badge: 'bg-yellow-500/20 text-yellow-300' },
  Story: { border: 'border-red-500/40', bg: 'bg-red-500/10', badge: 'bg-red-500/20 text-red-300' },
  Growth: { border: 'border-lime-500/40', bg: 'bg-lime-500/10', badge: 'bg-lime-500/20 text-lime-300' },
  Monetization: { border: 'border-teal-500/40', bg: 'bg-teal-500/10', badge: 'bg-teal-500/20 text-teal-300' },
  Engagement: { border: 'border-indigo-500/40', bg: 'bg-indigo-500/10', badge: 'bg-indigo-500/20 text-indigo-300' },
  Operations: { border: 'border-zinc-400/40', bg: 'bg-zinc-400/10', badge: 'bg-zinc-400/20 text-zinc-300' },
  Lessons: { border: 'border-amber-400/40', bg: 'bg-amber-400/10', badge: 'bg-amber-400/20 text-amber-300' },
  // General
  'Business Strategy': { border: 'border-emerald-600/40', bg: 'bg-emerald-600/10', badge: 'bg-emerald-600/20 text-emerald-300' },
  'Marketing & Sales': { border: 'border-blue-600/40', bg: 'bg-blue-600/10', badge: 'bg-blue-600/20 text-blue-300' },
  'Mindset & Productivity': { border: 'border-purple-600/40', bg: 'bg-purple-600/10', badge: 'bg-purple-600/20 text-purple-300' },
  'Leadership & Team Building': { border: 'border-amber-600/40', bg: 'bg-amber-600/10', badge: 'bg-amber-600/20 text-amber-300' },
};
