'use client';

import { useState, useMemo } from 'react';
import { type Post, allPosts } from '@/lib/content-library/data';
import { tabConfig, type TabKey, categoryColors } from '@/lib/content-library/config';

export default function ContentLibrary() {
  const [activeTab, setActiveTab] = useState<TabKey>('social');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copyType, setCopyType] = useState<string>('');

  const config = tabConfig[activeTab];

  const filtered = useMemo(() => {
    let posts = allPosts.filter((p) => p.tab === activeTab);
    if (activeCategory) {
      posts = posts.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeTab, activeCategory, search]);

  async function copyToClipboard(post: Post, type: 'title' | 'body' | 'full') {
    const text =
      type === 'title'
        ? post.title
        : type === 'body'
          ? post.body
          : `${post.title}\n\n${post.body}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(post.id);
      setCopyType(type);
      setTimeout(() => {
        setCopiedId(null);
        setCopyType('');
      }, 2000);
    } catch {
      // fallback
    }
  }

  function switchTab(tab: TabKey) {
    setActiveTab(tab);
    setActiveCategory(null);
    setSearch('');
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">
          Content Library
          <span className="block text-lg md:text-xl font-normal text-neutral-400 mt-2">
            Post Templates
          </span>
        </h1>
        <p className="text-center text-neutral-500 text-sm mb-1">
          {allPosts.length} ready-to-use posts for social, content, Skool & general business
        </p>
      </div>

      {/* Main Tabs */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <div className="flex gap-2 bg-white/5 rounded-xl p-1.5">
          {(Object.keys(tabConfig) as TabKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => switchTab(tab)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {tabConfig[tab].label}
              <span className="hidden sm:inline text-xs ml-1 opacity-70">
                ({allPosts.filter((p) => p.tab === tab).length})
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-neutral-500 text-xs mt-2">
          {config.description}
        </p>
      </div>

      {/* Search */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <input
          type="text"
          placeholder="Search posts by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition"
        />
      </div>

      {/* Category Filters */}
      <div className="max-w-6xl mx-auto px-4 mb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === null
                ? 'bg-white/15 text-white'
                : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            All ({allPosts.filter((p) => p.tab === activeTab).length})
          </button>
          {config.categories.map((cat) => {
            const count = allPosts.filter(
              (p) => p.tab === activeTab && p.category === cat
            ).length;
            const colors = categoryColors[cat];
            return (
              <button
                key={cat}
                onClick={() =>
                  setActiveCategory(activeCategory === cat ? null : cat)
                }
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? `${colors?.bg} ${colors?.badge}`
                    : 'bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Count */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <p className="text-neutral-500 text-sm text-center">
          Showing {filtered.length} post{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Posts */}
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-neutral-500">
            No posts match your search.
          </div>
        ) : (
          filtered.map((post) => {
            const colors = categoryColors[post.category] || {
              border: 'border-white/10',
              bg: 'bg-white/5',
              badge: 'bg-white/10 text-neutral-300',
            };
            return (
              <div
                key={post.id}
                className={`rounded-2xl p-6 border-2 ${colors.border} ${colors.bg} hover:border-opacity-80 transition-all`}
              >
                {/* Card header */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4">
                  <div className="flex-1">
                    <span
                      className={`text-xs px-3 py-1 rounded-lg ${colors.badge} inline-block mb-2 font-medium uppercase tracking-wide`}
                    >
                      {post.category}
                    </span>
                    <h3 className="font-bold text-lg text-white leading-tight">
                      {post.title}
                    </h3>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => copyToClipboard(post, 'title')}
                      className={`text-xs px-3 py-2 rounded-lg transition font-medium ${
                        copiedId === post.id && copyType === 'title'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                      }`}
                    >
                      {copiedId === post.id && copyType === 'title'
                        ? 'Copied!'
                        : 'Title'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(post, 'body')}
                      className={`text-xs px-3 py-2 rounded-lg transition font-medium ${
                        copiedId === post.id && copyType === 'body'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/10 text-neutral-300 hover:bg-white/20'
                      }`}
                    >
                      {copiedId === post.id && copyType === 'body'
                        ? 'Copied!'
                        : 'Body'}
                    </button>
                    <button
                      onClick={() => copyToClipboard(post, 'full')}
                      className={`text-xs px-4 py-2 rounded-lg transition font-bold ${
                        copiedId === post.id && copyType === 'full'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-emerald-600 text-white hover:bg-emerald-500'
                      }`}
                    >
                      {copiedId === post.id && copyType === 'full'
                        ? 'Copied!'
                        : 'FULL'}
                    </button>
                  </div>
                </div>

                {/* Card body */}
                <pre className="text-neutral-300 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                  {post.body}
                </pre>
              </div>
            );
          })
        )}
      </div>

      {/* Toast */}
      {copiedId !== null && (
        <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-pulse">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
