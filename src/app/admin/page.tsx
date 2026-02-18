"use client";

import { useState, useEffect, useRef, useMemo, Fragment } from "react";
import Link from "next/link";
import { LogOut, Search, Download, RefreshCw, ChevronDown, ChevronUp, FileText } from "lucide-react";
import * as XLSX from "xlsx";
import { type Post, allPosts } from "@/lib/content-library/data";
import { tabConfig, type TabKey, categoryColors } from "@/lib/content-library/config";

// Video 31 background for login
const VIDEO_URL = "/videos/rvids/31.mp4";

function getPosterFromVideo(videoUrl: string): string {
  if (videoUrl.startsWith("/")) return "";
  return videoUrl
    .replace("/video/upload/q_auto,f_auto/", "/video/upload/so_0,f_jpg,q_auto/")
    .replace(".mp4", ".jpg");
}

function BackgroundVideo({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const posterUrl = getPosterFromVideo(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const handlePlaying = () => setIsPlaying(true);
    video.addEventListener("playing", handlePlaying);
    const playVideo = () => {
      if (video.paused) video.play().catch(() => {});
    };
    video.addEventListener("loadedmetadata", playVideo);
    video.addEventListener("canplay", playVideo);
    playVideo();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && playVideo()),
      { threshold: 0.1 }
    );
    observer.observe(video);
    const handleInteraction = () => playVideo();
    document.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    document.addEventListener("click", handleInteraction, { once: true });
    return () => {
      observer.disconnect();
      video.removeEventListener("playing", handlePlaying);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full z-0"
      style={posterUrl ? { backgroundImage: `url(${posterUrl})`, backgroundSize: "cover", backgroundPosition: "center" } : { backgroundColor: "#0A0A0A" }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#0A0A0A]/80" />
    </div>
  );
}

interface QuizSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  track: string;
  archetype: string;
  archetype_name: string;
  bottleneck: string;
  recommended_tier: string;
  strike_zone: string;
  focus: string[];
  ignore_list: string;
  ninety_day_path: string;
  answers: { questionIndex?: number; selectedOption?: string }[] | Record<string, string>;
  created_at: string;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<"quiz" | "content">("quiz");
  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmission[]>([]);
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizSearch, setQuizSearch] = useState("");
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);

  // Content library state
  const [contentTab, setContentTab] = useState<TabKey>("social");
  const [contentCategory, setContentCategory] = useState<string | null>(null);
  const [contentSearch, setContentSearch] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copyType, setCopyType] = useState<string>("");

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      const sessionId = localStorage.getItem("ninja-admin-session");
      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/admin/verify", {
          headers: { "x-admin-session": sessionId },
        });
        const data = await response.json();

        if (data.valid) {
          setIsAuthenticated(true);
          fetchQuizSubmissions(sessionId);
        } else {
          localStorage.removeItem("ninja-admin-session");
        }
      } catch {
        localStorage.removeItem("ninja-admin-session");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const fetchQuizSubmissions = async (sessionId: string) => {
    setQuizLoading(true);
    try {
      const response = await fetch("/api/quiz/submissions", {
        headers: { "x-admin-session": sessionId },
      });
      const data = await response.json();

      if (data.success) {
        setQuizSubmissions(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch quiz submissions:", error);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("ninja-admin-session", data.sessionId);
        setIsAuthenticated(true);
        fetchQuizSubmissions(data.sessionId);
      } else {
        setLoginError(data.error || "Invalid credentials");
      }
    } catch {
      setLoginError("Failed to login. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("ninja-admin-session");
    if (sessionId) {
      await fetch("/api/admin/logout", {
        method: "POST",
        headers: { "x-admin-session": sessionId },
      });
    }
    localStorage.removeItem("ninja-admin-session");
    setIsAuthenticated(false);
    setQuizSubmissions([]);
  };

  const handleRefresh = () => {
    const sessionId = localStorage.getItem("ninja-admin-session");
    if (sessionId) {
      fetchQuizSubmissions(sessionId);
    }
  };

  const handleQuizExport = () => {
    const exportData = filteredQuizSubmissions.map((q) => ({
      Name: q.full_name,
      Email: q.email,
      Phone: q.phone,
      Track: q.track,
      Archetype: q.archetype_name,
      "Archetype Key": q.archetype,
      "Recommended Tier": q.recommended_tier,
      "Strike Zone": q.strike_zone,
      "Focus Areas": Array.isArray(q.focus) ? q.focus.map(String).join(", ") : "",
      "Ignore List": q.ignore_list,
      "90-Day Path": q.ninety_day_path,
      Bottleneck: q.bottleneck,
      Answers: Array.isArray(q.answers)
        ? q.answers.map((a: { questionIndex?: number; selectedOption?: string }) => `Q${(a.questionIndex ?? 0) + 1}: ${a.selectedOption || ''}`).join(' | ')
        : JSON.stringify(q.answers),
      "Submitted At": new Date(q.created_at).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Submissions");
    XLSX.writeFile(workbook, `quiz-submissions-${new Date().toISOString().split("T")[0]}.xlsx`);
  };

  const filteredQuizSubmissions = quizSubmissions.filter((q) => {
    const query = quizSearch.toLowerCase();
    return (
      q.full_name.toLowerCase().includes(query) ||
      q.email.toLowerCase().includes(query) ||
      q.phone.toLowerCase().includes(query) ||
      q.archetype_name.toLowerCase().includes(query) ||
      q.track.toLowerCase().includes(query)
    );
  });

  // Quiz stats
  const explorerCount = quizSubmissions.filter((q) => q.track.toLowerCase() === "explorer").length;
  const practitionerCount = quizSubmissions.filter((q) => q.track.toLowerCase() === "practitioner").length;
  const masterCount = quizSubmissions.filter((q) => q.track.toLowerCase() === "master").length;

  const topArchetype = (() => {
    if (quizSubmissions.length === 0) return "N/A";
    const counts: Record<string, number> = {};
    quizSubmissions.forEach((q) => {
      counts[q.archetype_name] = (counts[q.archetype_name] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";
  })();

  // Content library
  const contentConfig = tabConfig[contentTab];

  const filteredContent = useMemo(() => {
    let posts = allPosts.filter((p) => p.tab === contentTab);
    if (contentCategory) {
      posts = posts.filter((p) => p.category === contentCategory);
    }
    if (contentSearch.trim()) {
      const q = contentSearch.toLowerCase();
      posts = posts.filter(
        (p) => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [contentTab, contentCategory, contentSearch]);

  async function copyToClipboard(post: Post, type: "title" | "body" | "full") {
    const text =
      type === "title"
        ? post.title
        : type === "body"
          ? post.body
          : `${post.title}\n\n${post.body}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(post.id);
      setCopyType(type);
      setTimeout(() => {
        setCopiedId(null);
        setCopyType("");
      }, 2000);
    } catch {
      // fallback
    }
  }

  function switchContentTab(tab: TabKey) {
    setContentTab(tab);
    setContentCategory(null);
    setContentSearch("");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAF6E3] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#D4A853]"></div>
      </div>
    );
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-[#FAF6E3] flex items-center justify-center px-6 relative">
        <BackgroundVideo src={VIDEO_URL} />

        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="font-script text-5xl inline-block mb-4">
              Creator Conservatory
            </Link>
            <h1 className="font-serif text-2xl">Admin Dashboard</h1>
          </div>

          <form onSubmit={handleLogin} className="bg-[#0A0A0A]/70 backdrop-blur-md border border-[#FAF6E3]/20 rounded-2xl p-8 space-y-6">
            <div>
              <label className="block text-[#FAF6E3]/60 mb-2 font-sans text-sm">Email</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans"
                placeholder="admin@google.com"
              />
            </div>

            <div>
              <label className="block text-[#FAF6E3]/60 mb-2 font-sans text-sm">Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans"
                placeholder="••••••••"
              />
            </div>

            {loginError && <p className="text-[#8B2332] text-sm font-sans">{loginError}</p>}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-4 rounded-full bg-[#D4A853] hover:bg-[#c49943] text-[#0A0A0A] font-sans font-semibold text-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link href="/" className="text-[#FAF6E3]/50 font-sans text-sm hover:text-[#FAF6E3] transition-colors">
              &larr; Back to Creator Conservatory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAF6E3]">
      {/* Header */}
      <header className="border-b border-[#FAF6E3]/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-script text-3xl">
              Creator Conservatory
            </Link>
            <span className="text-[#FAF6E3]/30">|</span>
            <span className="font-sans text-[#FAF6E3]/60">Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-[#FAF6E3]/60 hover:text-[#FAF6E3] transition-colors font-sans"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stats - Quiz */}
        {activeTab === "quiz" && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#D4A853]/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#D4A853]" />
                </div>
                <div>
                  <p className="font-sans text-[#FAF6E3]/60 text-sm">Total Submissions</p>
                  <p className="font-serif text-3xl">{quizSubmissions.length}</p>
                </div>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Explorer</p>
                <p className="font-serif text-3xl">{explorerCount}</p>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Practitioner</p>
                <p className="font-serif text-3xl">{practitionerCount}</p>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Master</p>
                <p className="font-serif text-3xl">{masterCount}</p>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Top Archetype</p>
                <p className="font-serif text-lg mt-1">{topArchetype}</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats - Content Library */}
        {activeTab === "content" && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Total Posts</p>
                <p className="font-serif text-3xl">{allPosts.length}</p>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Social Posts</p>
                <p className="font-serif text-3xl">{allPosts.filter((p) => p.tab === "social").length}</p>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Content & Views</p>
                <p className="font-serif text-3xl">{allPosts.filter((p) => p.tab === "content").length}</p>
              </div>
            </div>
            <div className="border border-[#FAF6E3]/10 rounded-2xl p-6">
              <div>
                <p className="font-sans text-[#FAF6E3]/60 text-sm">Skool + General</p>
                <p className="font-serif text-3xl">{allPosts.filter((p) => p.tab === "skool" || p.tab === "general").length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-colors ${
              activeTab === "quiz"
                ? "bg-[#D4A853] text-[#0A0A0A]"
                : "bg-[#FAF6E3]/10 text-[#FAF6E3]/60 hover:bg-[#FAF6E3]/20"
            }`}
          >
            Quiz Submissions
          </button>
          <button
            onClick={() => setActiveTab("content")}
            className={`px-6 py-2.5 rounded-full font-sans text-sm font-medium transition-colors ${
              activeTab === "content"
                ? "bg-[#D4A853] text-[#0A0A0A]"
                : "bg-[#FAF6E3]/10 text-[#FAF6E3]/60 hover:bg-[#FAF6E3]/20"
            }`}
          >
            Content Library
          </button>
        </div>

        {/* Quiz Tab Content */}
        {activeTab === "quiz" && (
          <div className="border border-[#FAF6E3]/10 rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-[#FAF6E3]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="font-serif text-2xl">Quiz Submissions</h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF6E3]/40" />
                  <input
                    type="text"
                    value={quizSearch}
                    onChange={(e) => setQuizSearch(e.target.value)}
                    placeholder="Search submissions..."
                    className="pl-10 pr-4 py-2 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans text-sm w-full sm:w-64"
                  />
                </div>
                <button
                  onClick={handleRefresh}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#FAF6E3]/10 hover:bg-[#FAF6E3]/20 rounded-xl font-sans text-sm transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${quizLoading ? "animate-spin" : ""}`} />
                  Refresh
                </button>
                <button
                  onClick={handleQuizExport}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#D4A853] text-[#0A0A0A] hover:bg-[#c49943] rounded-xl font-sans font-semibold text-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export XLSX
                </button>
              </div>
            </div>

            {/* Table */}
            {quizLoading ? (
              <div className="p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#D4A853] mx-auto"></div>
              </div>
            ) : filteredQuizSubmissions.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-[#FAF6E3]/60 font-sans">
                  {quizSearch ? "No submissions match your search." : "No quiz submissions yet."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#FAF6E3]/10">
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium w-8"></th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Name</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Email</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Phone</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Archetype</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Track</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Tier</th>
                      <th className="text-left px-6 py-4 font-sans text-sm text-[#FAF6E3]/60 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQuizSubmissions.map((submission) => (
                      <Fragment key={submission.id}>
                        <tr
                          onClick={() => setExpandedQuiz(expandedQuiz === submission.id ? null : submission.id)}
                          className="border-b border-[#FAF6E3]/5 hover:bg-[#FAF6E3]/5 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4">
                            {expandedQuiz === submission.id ? (
                              <ChevronUp className="w-4 h-4 text-[#FAF6E3]/40" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#FAF6E3]/40" />
                            )}
                          </td>
                          <td className="px-6 py-4 font-sans">{submission.full_name}</td>
                          <td className="px-6 py-4 font-sans text-[#FAF6E3]/70">{submission.email}</td>
                          <td className="px-6 py-4 font-sans text-[#FAF6E3]/70">{submission.phone}</td>
                          <td className="px-6 py-4">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-sans font-medium bg-[#D4A853]/20 text-[#D4A853]">
                              {submission.archetype_name}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-medium ${
                                submission.track.toLowerCase() === "explorer"
                                  ? "bg-green-500/20 text-green-400"
                                  : submission.track.toLowerCase() === "practitioner"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : "bg-purple-500/20 text-purple-400"
                              }`}
                            >
                              {submission.track}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-sans text-[#FAF6E3]/70">{submission.recommended_tier}</td>
                          <td className="px-6 py-4 font-sans text-[#FAF6E3]/50 text-sm">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                        {expandedQuiz === submission.id && (
                          <tr className="border-b border-[#FAF6E3]/5">
                            <td colSpan={8} className="px-6 py-6 bg-[#FAF6E3]/[0.02]">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">Strike Zone</p>
                                    <p className="font-sans text-[#FAF6E3]/80 text-sm">{submission.strike_zone || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">Focus Areas</p>
                                    <div className="flex flex-wrap gap-2">
                                      {Array.isArray(submission.focus) && submission.focus.length > 0
                                        ? submission.focus.map((f, i) => (
                                            <span key={i} className="inline-block px-2 py-1 rounded-lg text-xs font-sans bg-[#FAF6E3]/10 text-[#FAF6E3]/70">
                                              {String(f)}
                                            </span>
                                          ))
                                        : <span className="font-sans text-[#FAF6E3]/50 text-sm">N/A</span>}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">Ignore List</p>
                                    <p className="font-sans text-[#FAF6E3]/80 text-sm">{submission.ignore_list || "N/A"}</p>
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">90-Day Path</p>
                                    <p className="font-sans text-[#FAF6E3]/80 text-sm">{submission.ninety_day_path || "N/A"}</p>
                                  </div>
                                  <div>
                                    <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-1">Bottleneck</p>
                                    <p className="font-sans text-[#FAF6E3]/80 text-sm">{submission.bottleneck || "N/A"}</p>
                                  </div>
                                </div>
                              </div>
                              {submission.answers && (Array.isArray(submission.answers) ? submission.answers.length > 0 : Object.keys(submission.answers).length > 0) && (
                                <div className="mt-6">
                                  <p className="font-sans text-xs text-[#FAF6E3]/40 uppercase tracking-wider mb-3">Quiz Answers</p>
                                  <div className="space-y-2">
                                    {Array.isArray(submission.answers)
                                      ? submission.answers.map((a: { questionIndex?: number; selectedOption?: string }, i: number) => (
                                          <div key={i} className="bg-[#FAF6E3]/5 rounded-xl p-3">
                                            <p className="font-sans text-xs text-[#FAF6E3]/50 mb-1">Question {(a.questionIndex ?? i) + 1}</p>
                                            <p className="font-sans text-sm text-[#FAF6E3]/80">{a.selectedOption || "N/A"}</p>
                                          </div>
                                        ))
                                      : Object.entries(submission.answers).map(([question, answer]) => (
                                          <div key={question} className="bg-[#FAF6E3]/5 rounded-xl p-3">
                                            <p className="font-sans text-xs text-[#FAF6E3]/50 mb-1">{String(question)}</p>
                                            <p className="font-sans text-sm text-[#FAF6E3]/80">{String(answer)}</p>
                                          </div>
                                        ))
                                    }
                                  </div>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Content Library Tab */}
        {activeTab === "content" && (
          <div className="border border-[#FAF6E3]/10 rounded-2xl overflow-hidden">
            {/* Content Header */}
            <div className="p-6 border-b border-[#FAF6E3]/10">
              <h2 className="font-serif text-2xl mb-4">Content Library</h2>

              {/* Content Sub-tabs */}
              <div className="flex gap-2 bg-[#FAF6E3]/5 rounded-xl p-1.5 mb-4">
                {(Object.keys(tabConfig) as TabKey[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => switchContentTab(tab)}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-sans font-semibold transition-all ${
                      contentTab === tab
                        ? "bg-[#D4A853] text-[#0A0A0A] shadow-lg"
                        : "text-[#FAF6E3]/60 hover:text-[#FAF6E3] hover:bg-[#FAF6E3]/10"
                    }`}
                  >
                    {tabConfig[tab].label}
                    <span className="hidden sm:inline text-xs ml-1 opacity-70">
                      ({allPosts.filter((p) => p.tab === tab).length})
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-center text-[#FAF6E3]/40 text-xs mb-4">{contentConfig.description}</p>

              {/* Search */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#FAF6E3]/40" />
                <input
                  type="text"
                  placeholder="Search posts by title or content..."
                  value={contentSearch}
                  onChange={(e) => setContentSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6E3]/10 border border-[#FAF6E3]/20 text-[#FAF6E3] placeholder-[#FAF6E3]/40 focus:outline-none focus:border-[#D4A853] font-sans text-sm transition"
                />
              </div>

              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setContentCategory(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all ${
                    contentCategory === null
                      ? "bg-[#FAF6E3]/15 text-[#FAF6E3]"
                      : "bg-[#FAF6E3]/5 text-[#FAF6E3]/40 hover:bg-[#FAF6E3]/10 hover:text-[#FAF6E3]"
                  }`}
                >
                  All ({allPosts.filter((p) => p.tab === contentTab).length})
                </button>
                {contentConfig.categories.map((cat) => {
                  const count = allPosts.filter(
                    (p) => p.tab === contentTab && p.category === cat
                  ).length;
                  const colors = categoryColors[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() =>
                        setContentCategory(contentCategory === cat ? null : cat)
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-sans font-medium transition-all ${
                        contentCategory === cat
                          ? `${colors?.bg} ${colors?.badge}`
                          : "bg-[#FAF6E3]/5 text-[#FAF6E3]/40 hover:bg-[#FAF6E3]/10 hover:text-[#FAF6E3]"
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Post Count */}
            <div className="px-6 py-3 border-b border-[#FAF6E3]/5">
              <p className="text-[#FAF6E3]/40 text-sm text-center font-sans">
                Showing {filteredContent.length} post{filteredContent.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Posts */}
            <div className="p-6 space-y-5">
              {filteredContent.length === 0 ? (
                <div className="text-center py-16 text-[#FAF6E3]/40 font-sans">
                  No posts match your search.
                </div>
              ) : (
                filteredContent.map((post) => {
                  const colors = categoryColors[post.category] || {
                    border: "border-[#FAF6E3]/10",
                    bg: "bg-[#FAF6E3]/5",
                    badge: "bg-[#FAF6E3]/10 text-[#FAF6E3]/60",
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
                            className={`text-xs px-3 py-1 rounded-lg ${colors.badge} inline-block mb-2 font-sans font-medium uppercase tracking-wide`}
                          >
                            {post.category}
                          </span>
                          <h3 className="font-bold text-lg text-[#FAF6E3] leading-tight">
                            {post.title}
                          </h3>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => copyToClipboard(post, "title")}
                            className={`text-xs px-3 py-2 rounded-lg transition font-sans font-medium ${
                              copiedId === post.id && copyType === "title"
                                ? "bg-emerald-500 text-white"
                                : "bg-[#FAF6E3]/10 text-[#FAF6E3]/60 hover:bg-[#FAF6E3]/20"
                            }`}
                          >
                            {copiedId === post.id && copyType === "title"
                              ? "Copied!"
                              : "Title"}
                          </button>
                          <button
                            onClick={() => copyToClipboard(post, "body")}
                            className={`text-xs px-3 py-2 rounded-lg transition font-sans font-medium ${
                              copiedId === post.id && copyType === "body"
                                ? "bg-emerald-500 text-white"
                                : "bg-[#FAF6E3]/10 text-[#FAF6E3]/60 hover:bg-[#FAF6E3]/20"
                            }`}
                          >
                            {copiedId === post.id && copyType === "body"
                              ? "Copied!"
                              : "Body"}
                          </button>
                          <button
                            onClick={() => copyToClipboard(post, "full")}
                            className={`text-xs px-4 py-2 rounded-lg transition font-sans font-bold ${
                              copiedId === post.id && copyType === "full"
                                ? "bg-emerald-500 text-white"
                                : "bg-[#D4A853] text-[#0A0A0A] hover:bg-[#c49943]"
                            }`}
                          >
                            {copiedId === post.id && copyType === "full"
                              ? "Copied!"
                              : "FULL"}
                          </button>
                        </div>
                      </div>

                      {/* Card body */}
                      <pre className="text-[#FAF6E3]/60 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                        {post.body}
                      </pre>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </main>

      {/* Toast */}
      {copiedId !== null && (
        <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-pulse font-sans">
          Copied to clipboard!
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#FAF6E3]/10 mt-auto">
        <div className="max-w-7xl mx-auto text-center">
          <span className="font-sans text-xs text-[#FAF6E3]/30">&copy; 2026 Creator Conservatory. Admin Dashboard.</span>
        </div>
      </footer>
    </div>
  );
}
