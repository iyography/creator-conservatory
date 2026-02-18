"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  type Step,
  type TrackKey,
  type ArchetypeKey,
  type CreatorType,
  ARCHETYPES,
  BOTTLENECK_NAMES,
  slideVariants,
} from "@/lib/quiz";
import { CREATOR_TYPES, CREATOR_TYPE_ORDER } from "@/lib/quiz/creator-types";
import { TRACKS } from "@/lib/quiz/tracks";
import { getTrackQuestions, getArchetypeQuestions } from "@/lib/quiz/questions";
import { getResult } from "@/lib/quiz/results";
import { calculateResults } from "@/lib/quiz/scoring";

export default function QuizPage() {
  const [step, setStep] = useState<Step>("intro");
  const [creatorType, setCreatorType] = useState<CreatorType | null>(null);
  const [track, setTrack] = useState<TrackKey | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [trackAnswers, setTrackAnswers] = useState<number[][]>([]);
  const [archetypeAnswers, setArchetypeAnswers] = useState<number[][]>([]);
  const [currentSelections, setCurrentSelections] = useState<number[]>([]);
  const [contactForm, setContactForm] = useState({ fullName: "", email: "", phone: "" });
  const [calcText, setCalcText] = useState("Analyzing your responses...");
  const [direction, setDirection] = useState(1);

  const [resultArchetype, setResultArchetype] = useState<ArchetypeKey>("performer");
  const [resultBottleneck, setResultBottleneck] = useState("");

  const questions = creatorType && track ? getTrackQuestions(creatorType, track) : [];
  const archetypeQuestions = creatorType ? getArchetypeQuestions(creatorType) : [];
  const tracks = creatorType ? TRACKS[creatorType] : null;

  // ─── Navigation helpers ──────────────────────────────────────────────────

  function goTo(next: Step) {
    setDirection(1);
    setStep(next);
  }

  function goBack() {
    setDirection(-1);
    if (step === "archetype-questions") {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setArchetypeAnswers(archetypeAnswers.slice(0, -1));
        setCurrentSelections(archetypeAnswers[currentQuestion - 1] || []);
      } else {
        setCurrentQuestion(9);
        setTrackAnswers(trackAnswers.slice(0, -1));
        setCurrentSelections(trackAnswers[9] || []);
        setStep("questions");
      }
    } else if (step === "questions") {
      if (currentQuestion > 0) {
        setCurrentQuestion(currentQuestion - 1);
        setTrackAnswers(trackAnswers.slice(0, -1));
        setCurrentSelections(trackAnswers[currentQuestion - 1] || []);
      } else {
        setStep("track-select");
        setCurrentSelections([]);
      }
    } else if (step === "track-select") {
      setStep("creator-type-select");
    }
  }

  // ─── Creator type selection ─────────────────────────────────────────────

  function selectCreatorType(ct: CreatorType) {
    setCreatorType(ct);
    setTrack(null);
    setCurrentQuestion(0);
    setTrackAnswers([]);
    setArchetypeAnswers([]);
    setCurrentSelections([]);
    goTo("track-select");
  }

  // ─── Track selection ─────────────────────────────────────────────────────

  function selectTrack(t: TrackKey) {
    setTrack(t);
    setCurrentQuestion(0);
    setTrackAnswers([]);
    setArchetypeAnswers([]);
    setCurrentSelections([]);
    goTo("questions");
  }

  // ─── Answer selection ────────────────────────────────────────────────────

  function toggleOption(optionIndex: number) {
    const currentQ = step === "questions" ? questions[currentQuestion] : archetypeQuestions[currentQuestion];

    if (currentQ?.multiSelect) {
      setCurrentSelections(prev => {
        const isSelected = prev.includes(optionIndex);
        if (isSelected) {
          return prev.filter(i => i !== optionIndex);
        } else {
          const maxSel = currentQ.maxSelections || 999;
          if (prev.length >= maxSel) return prev;
          return [...prev, optionIndex];
        }
      });
    } else {
      if (step === "questions") {
        selectTrackAnswer(optionIndex);
      } else {
        selectArchetypeAnswer(optionIndex);
      }
    }
  }

  function nextQuestion() {
    if (step === "questions") {
      const newAnswers = [...trackAnswers, currentSelections];
      setTrackAnswers(newAnswers);
      setCurrentSelections([]);

      if (currentQuestion < 9) {
        setTimeout(() => {
          setDirection(1);
          setCurrentQuestion(currentQuestion + 1);
        }, 300);
      } else {
        setTimeout(() => {
          setCurrentQuestion(0);
          goTo("archetype-questions");
        }, 300);
      }
    } else {
      const newAnswers = [...archetypeAnswers, currentSelections];
      setArchetypeAnswers(newAnswers);
      setCurrentSelections([]);

      if (currentQuestion < 4) {
        setTimeout(() => {
          setDirection(1);
          setCurrentQuestion(currentQuestion + 1);
        }, 300);
      } else {
        setTimeout(() => {
          goTo("contact");
        }, 300);
      }
    }
  }

  function selectTrackAnswer(optionIndex: number) {
    const newAnswers = [...trackAnswers, [optionIndex]];
    setTrackAnswers(newAnswers);

    if (currentQuestion < 9) {
      setTimeout(() => {
        setDirection(1);
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setCurrentQuestion(0);
        setCurrentSelections([]);
        goTo("archetype-questions");
      }, 300);
    }
  }

  function selectArchetypeAnswer(optionIndex: number) {
    const newAnswers = [...archetypeAnswers, [optionIndex]];
    setArchetypeAnswers(newAnswers);

    if (currentQuestion < 4) {
      setTimeout(() => {
        setDirection(1);
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        setCurrentSelections([]);
        goTo("contact");
      }, 300);
    }
  }

  // ─── Submit ──────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { archetype, bottleneck } = calculateResults(
      trackAnswers,
      archetypeAnswers,
      questions,
      archetypeQuestions,
    );
    setResultArchetype(archetype);
    setResultBottleneck(bottleneck);

    const result = creatorType ? getResult(creatorType, archetype, track!) : undefined;

    goTo("calculating");

    const answersData = trackAnswers.map((selections, qIdx) => ({
      questionIndex: qIdx,
      selectedOption: selections.map(optIdx => questions[qIdx]?.options[optIdx]?.text ?? "").join(", "),
    }));
    archetypeQuestions.forEach((q, qIdx) => {
      const selections = archetypeAnswers[qIdx] || [];
      answersData.push({
        questionIndex: 10 + qIdx,
        selectedOption: selections.map(optIdx => q.options[optIdx]?.text ?? "").join(", "),
      });
    });

    try {
      await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: contactForm.fullName,
          email: contactForm.email,
          phone: contactForm.phone,
          creatorType,
          track,
          archetype,
          archetypeName: ARCHETYPES[archetype].name,
          bottleneck,
          strikeZone: result?.strikeZone ?? "",
          focus: result?.focus ?? [],
          ignoreList: result?.ignore ?? "",
          ninetyDayPath: result?.ninetyDayPath?.join(" | ") ?? "",
          answers: answersData,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        }),
      });
    } catch {
      // Silently continue to results
    }
  }

  // ─── Calculating animation ──────────────────────────────────────────────

  useEffect(() => {
    if (step !== "calculating") return;
    const messages = [
      "Analyzing your responses...",
      "Identifying your creator archetype...",
      "Preparing your personalized plan...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      if (i < messages.length) {
        setCalcText(messages[i]);
      } else {
        clearInterval(interval);
        goTo("results");
      }
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // ─── Result data ─────────────────────────────────────────────────────────

  const resultData = creatorType && track ? getResult(creatorType, resultArchetype, track) : undefined;
  const archetypeData = ARCHETYPES[resultArchetype] ?? ARCHETYPES.performer;
  const bottleneckName = BOTTLENECK_NAMES[resultBottleneck] || resultBottleneck;
  const trackData = creatorType && track ? TRACKS[creatorType][track] : null;

  // ─── Progress ────────────────────────────────────────────────────────────
  // Total steps: creator-type-select(1) + track-select(1) + 10 track questions + 5 archetype questions + contact(1) = 18
  const totalSteps = 18;

  const progressNumber =
    step === "creator-type-select"
      ? 1
      : step === "track-select"
      ? 2
      : step === "questions"
      ? 3 + currentQuestion
      : step === "archetype-questions"
      ? 13 + currentQuestion
      : step === "contact"
      ? 18
      : 0;

  const progressPercent = (progressNumber / totalSteps) * 100;

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <>
    <Navbar />
    <div className="min-h-screen text-white overflow-hidden font-sans pt-20 relative">
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://res.cloudinary.com/dzlnqcmqn/video/upload/v1769755241/2_zrypxu.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-black/60 z-0" />

      <AnimatePresence mode="wait" custom={direction}>
        {/* ── Intro ─────────────────────────────────────────────── */}
        {step === "intro" && (
          <motion.div
            key="intro"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10"
          >
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
                TAKE THE{" "}
                <span className="text-white">CREATOR QUIZ</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
                Find out what&apos;s really holding you back from growing online&mdash;and get your personalized action plan in 3 minutes.
              </p>
              <button
                onClick={() => goTo("creator-type-select")}
                className="bg-white hover:bg-white/90 text-black text-lg font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
              >
                Start The Quiz &rarr;
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Creator Type Select ────────────────────────────────── */}
        {step === "creator-type-select" && (
          <motion.div
            key="creator-type-select"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
          >
            <div className="max-w-2xl w-full relative z-10">
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-white/50 mb-1.5">
                  <span>Progress</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-white">
                What type of creator are you?
              </h2>
              <p className="text-white/70 text-center mb-10">
                Select the category that best describes you.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CREATOR_TYPE_ORDER.map((key) => {
                  const ct = CREATOR_TYPES[key];
                  return (
                    <button
                      key={key}
                      onClick={() => selectCreatorType(key)}
                      className="w-full text-left p-6 rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm hover:border-white hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{ct.emoji}</span>
                        <div>
                          <div className="text-lg font-semibold group-hover:text-white transition-colors text-white">
                            {ct.name}
                          </div>
                          <div className="text-white/70 text-sm mt-1">
                            {ct.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Track Select ──────────────────────────────────────── */}
        {step === "track-select" && tracks && (
          <motion.div
            key="track-select"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
          >
            <div className="max-w-2xl w-full relative z-10">
              <div className="mb-8">
                <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                  <button
                    onClick={goBack}
                    className="hover:text-white transition-colors"
                  >
                    &larr; Back
                  </button>
                  <span className="text-xs text-white/50">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-white">
                Where are you in your business journey?
              </h2>
              <p className="text-white/70 text-center mb-10">
                Select the stage that best describes where you are right now.
              </p>

              <div className="space-y-4">
                {(Object.entries(tracks) as [TrackKey, typeof tracks.emerging][]).map(
                  ([key, t]) => (
                    <button
                      key={key}
                      onClick={() => selectTrack(key)}
                      className="w-full text-left p-6 rounded-xl border border-white/20 bg-black/40 backdrop-blur-sm hover:border-white hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{t.emoji}</span>
                        <div>
                          <div className="text-xl font-semibold group-hover:text-white transition-colors text-white">
                            {t.name}
                          </div>
                          <div className="text-white/70 text-sm mt-1">
                            {t.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Track Questions ───────────────────────────────────── */}
        {step === "questions" && (
          <motion.div
            key="questions"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col px-6 pt-8 pb-12 relative z-10"
          >
            <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tq-${currentQuestion}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-8">
                    <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                      <button
                        onClick={goBack}
                        className="hover:text-white transition-colors"
                      >
                        &larr; Back
                      </button>
                      <span className="text-xs text-white/50">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
                    {questions[currentQuestion]?.question}
                  </h3>
                  <div className="space-y-3">
                    {questions[currentQuestion]?.options.map((opt, idx) => {
                      const isSelected = currentSelections.includes(idx);
                      const isMultiSelect = questions[currentQuestion]?.multiSelect;

                      return (
                        <button
                          key={idx}
                          onClick={() => toggleOption(idx)}
                          className={`w-full text-left p-5 rounded-xl border transition-all duration-300 text-lg ${
                            isSelected
                              ? 'border-white bg-white/10 shadow-lg'
                              : 'border-white/20 bg-black/40 backdrop-blur-sm hover:border-white hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isMultiSelect && (
                              <div className={`w-5 h-5 border-2 rounded transition-all ${
                                isSelected ? 'border-white bg-white' : 'border-[#64748B]'
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3 text-black mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            )}
                            <span className="text-white">{opt.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {questions[currentQuestion]?.multiSelect && (
                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-white/70 text-sm">
                        Select {questions[currentQuestion]?.minSelections || 1}-{questions[currentQuestion]?.maxSelections || questions[currentQuestion]?.options.length} options
                      </p>
                      <button
                        onClick={nextQuestion}
                        disabled={currentSelections.length < (questions[currentQuestion]?.minSelections || 1)}
                        className="bg-white hover:bg-white/90 text-black disabled:bg-[#94A3B8] disabled:cursor-not-allowed px-6 py-2 rounded-full font-semibold transition-all duration-300"
                      >
                        Next &rarr;
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── Archetype Questions ───────────────────────────────── */}
        {step === "archetype-questions" && (
          <motion.div
            key="archetype-questions"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col px-6 pt-8 pb-12 relative z-10"
          >
            <div className="max-w-2xl w-full mx-auto flex-1 flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`aq-${currentQuestion}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-8">
                    <div className="flex items-center justify-between text-sm text-white/70 mb-2">
                      <button
                        onClick={goBack}
                        className="hover:text-white transition-colors"
                      >
                        &larr; Back
                      </button>
                      <span className="text-xs text-white/50">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-white rounded-full"
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
                    {archetypeQuestions[currentQuestion]?.question}
                  </h3>
                  <div className="space-y-3">
                    {archetypeQuestions[currentQuestion]?.options.map((opt, idx) => {
                      const isSelected = currentSelections.includes(idx);
                      const isMultiSelect = archetypeQuestions[currentQuestion]?.multiSelect;

                      return (
                        <button
                          key={idx}
                          onClick={() => toggleOption(idx)}
                          className={`w-full text-left p-5 rounded-xl border transition-all duration-300 text-lg ${
                            isSelected
                              ? 'border-white bg-white/10 shadow-lg'
                              : 'border-white/20 bg-black/40 backdrop-blur-sm hover:border-white hover:shadow-lg'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {isMultiSelect && (
                              <div className={`w-5 h-5 border-2 rounded transition-all ${
                                isSelected ? 'border-white bg-white' : 'border-[#64748B]'
                              }`}>
                                {isSelected && (
                                  <svg className="w-3 h-3 text-black mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            )}
                            <span className="text-white">{opt.text}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {archetypeQuestions[currentQuestion]?.multiSelect && (
                    <div className="mt-6 flex justify-between items-center">
                      <p className="text-white/70 text-sm">
                        Select {archetypeQuestions[currentQuestion]?.minSelections || 1}-{archetypeQuestions[currentQuestion]?.maxSelections || archetypeQuestions[currentQuestion]?.options.length} options
                      </p>
                      <button
                        onClick={nextQuestion}
                        disabled={currentSelections.length < (archetypeQuestions[currentQuestion]?.minSelections || 1)}
                        className="bg-white hover:bg-white/90 text-black disabled:bg-[#94A3B8] disabled:cursor-not-allowed px-6 py-2 rounded-full font-semibold transition-all duration-300"
                      >
                        Next &rarr;
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* ── Contact Form ──────────────────────────────────────── */}
        {step === "contact" && (
          <motion.div
            key="contact"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10"
          >
            <div className="max-w-md w-full relative z-10">
              <div className="mb-8">
                <div className="flex items-center justify-between text-xs text-white/50 mb-1.5">
                  <span>Progress</span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 text-white">
                Almost there!
              </h2>
              <p className="text-white/70 text-center mb-8">
                Enter your details to see your personalized results.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-white/70 mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={contactForm.fullName}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, fullName: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/70 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, phone: e.target.value })
                    }
                    className="w-full bg-black/40 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-white/90 text-black text-lg font-semibold py-4 rounded-full transition-all duration-300 hover:scale-[1.02] mt-4"
                >
                  Reveal My Results
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* ── Calculating ───────────────────────────────────────── */}
        {step === "calculating" && (
          <motion.div
            key="calculating"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl mb-8"
            >
              {creatorType ? CREATOR_TYPES[creatorType].emoji : "🎨"}
            </motion.div>
            <h2 className="text-2xl font-bold mb-6 text-white">Analyzing your responses...</h2>
            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-6">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </div>
            <motion.p
              key={calcText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/70 text-lg"
            >
              {calcText}
            </motion.p>
          </motion.div>
        )}

        {/* ── Results ───────────────────────────────────────────── */}
        {step === "results" && !resultData && (
          <motion.div
            key="results-error"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="min-h-screen flex items-center justify-center px-6 relative z-10"
          >
            <div className="text-center max-w-md">
              <p className="text-5xl mb-4">😕</p>
              <h2 className="text-2xl font-bold text-white mb-3">Something went wrong</h2>
              <p className="text-white/70 mb-6">We couldn&apos;t load your results. Please try taking the quiz again.</p>
              <button
                onClick={() => {
                  setStep("intro");
                  setCreatorType(null);
                  setTrack(null);
                  setCurrentQuestion(0);
                  setTrackAnswers([]);
                  setArchetypeAnswers([]);
                  setCurrentSelections([]);
                  setContactForm({ fullName: "", email: "", phone: "" });
                }}
                className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </motion.div>
        )}

        {step === "results" && resultData && (
          <motion.div
            key="results"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="min-h-screen px-6 py-12 relative z-10"
          >
            <div className="max-w-2xl mx-auto">
              {/* Archetype Badge */}
              <div className="text-center mb-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="inline-block text-7xl mb-4"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(30, 58, 95, 0.3))",
                  }}
                >
                  {archetypeData.emoji}
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl md:text-4xl font-bold mb-2 text-white"
                >
                  You are{" "}
                  <span className="text-white">{archetypeData.name}</span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="inline-block bg-white text-black text-sm px-4 py-1.5 rounded-full"
                >
                  {trackData?.emoji} {trackData?.name}
                </motion.div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-white/70 text-lg leading-relaxed mb-8 text-center"
              >
                {resultData.description}
              </motion.p>

              {/* Strike Zone / Path Forward */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="border-2 border-white rounded-xl p-6 mb-8 bg-black/40 backdrop-blur-sm"
              >
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                  Your Path Forward
                </h3>
                <p className="text-white text-xl font-semibold">
                  {resultData.strikeZone}
                </p>
              </motion.div>

              {/* Focus Areas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Your Focus Areas</h3>
                <div className="space-y-3">
                  {(resultData.focus ?? []).map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-white mt-0.5">&#10003;</span>
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* What to Ignore */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-black/40 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  What to Ignore
                </h3>
                <p className="text-white/70">{resultData.ignore}</p>
              </motion.div>

              {/* Bottleneck */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-6 border border-white/20"
              >
                <h3 className="text-lg font-semibold mb-2 text-white">Your Main Bottleneck</h3>
                <div className="inline-block bg-white text-black px-4 py-2 rounded-lg font-semibold text-lg">
                  {bottleneckName}
                </div>
                <p className="text-white/70 text-sm mt-3">
                  This is the #1 thing holding you back. Focus here first to unlock
                  your full potential.
                </p>
              </motion.div>

              {/* 90-Day Path */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20"
              >
                <h3 className="text-lg font-semibold mb-4 text-white">Your 90-Day Path</h3>
                <div className="space-y-3">
                  {(resultData.ninetyDayPath ?? []).map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="bg-white text-black text-xs px-2 py-1 rounded font-semibold">
                        {i + 1}
                      </span>
                      <span className="text-white/70">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-white rounded-xl p-8 mb-8 text-black text-center"
              >
                <h3 className="text-2xl font-bold mb-3">Ready to take action?</h3>
                <p className="text-black/70 mb-6">
                  Join Creator Conservatory and get the community, tools, and guidance to make your 90-day path a reality.
                </p>
                <a
                  href="https://www.skool.com/the-creator-conservatory-3365"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-black hover:bg-black/80 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 text-lg"
                >
                  Join Creator Conservatory Free
                </a>
              </motion.div>

              {/* Copy Results & Actions */}
              <div className="text-center pb-8 space-y-4">
                <button
                  onClick={() => {
                    const resultsText = `
${archetypeData.emoji} ${archetypeData.name}
${trackData?.emoji} ${trackData?.name}

${resultData.description}

Your Path Forward:
${resultData.strikeZone}

Your Focus Areas:
${resultData.focus.map(item => `- ${item}`).join('\n')}

What to Ignore:
${resultData.ignore}

Your Bottleneck: ${bottleneckName}
This is the #1 thing holding you back. Focus here first to unlock your full potential.

Your 90-Day Path:
${resultData.ninetyDayPath.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Join Creator Conservatory: https://www.skool.com/the-creator-conservatory-3365
                    `.trim();

                    navigator.clipboard.writeText(resultsText).then(() => {
                      const button = document.activeElement as HTMLButtonElement;
                      if (button) {
                        const originalText = button.textContent;
                        button.textContent = "Copied!";
                        setTimeout(() => {
                          button.textContent = originalText;
                        }, 2000);
                      }
                    }).catch(() => {
                      // Silently fail
                    });
                  }}
                  className="bg-white hover:bg-white/90 text-black px-6 py-3 rounded-full font-semibold transition-all duration-300 mb-4"
                >
                  Copy My Results
                </button>
                <br />
                <button
                  onClick={() => {
                    setStep("intro");
                    setCreatorType(null);
                    setTrack(null);
                    setCurrentQuestion(0);
                    setTrackAnswers([]);
                    setArchetypeAnswers([]);
                    setCurrentSelections([]);
                    setContactForm({ fullName: "", email: "", phone: "" });
                  }}
                  className="text-white/70 hover:text-white transition-colors underline underline-offset-4"
                >
                  Retake Quiz
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
