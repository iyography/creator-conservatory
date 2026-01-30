"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

// Hero video URL - using local video
const HERO_VIDEO_URL = "/vids/1.mp4";

// AutoPlay Video component - shows poster immediately, then video when ready
function AutoPlayVideo({ src, className }: { src: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted state (required for autoplay)
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const playVideo = () => {
      if (video.paused) {
        video.play().then(() => {
          setIsReady(true);
        }).catch(() => {
          video.muted = true;
          video.play().then(() => setIsReady(true)).catch(() => {});
        });
      }
    };

    // Show video once it's playing
    const handlePlaying = () => setIsReady(true);
    video.addEventListener("playing", handlePlaying);

    // Try to play on various events
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);

    // Immediate play attempt
    playVideo();

    // Retry intervals for reliability
    const retryIntervals = [50, 100, 200, 400, 800, 1200, 1600, 2000, 3000];
    const timeouts = retryIntervals.map((ms) => setTimeout(playVideo, ms));

    // Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) playVideo();
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    // User interaction fallback
    const handleInteraction = () => playVideo();
    document.addEventListener("touchstart", handleInteraction, { once: true, passive: true });
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, { once: true, passive: true });

    return () => {
      observer.disconnect();
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      timeouts.forEach(clearTimeout);
    };
  }, [src]);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isReady ? "opacity-100" : "opacity-0"}`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

// Case Study Card Component
function CaseStudyCard({
  name,
  title,
  stats,
  description
}: {
  name: string;
  title: string;
  stats: string[];
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E2E8F0] hover:shadow-xl transition-shadow duration-300">
      <h4 className="text-xl font-bold text-[#1E3A5F] mb-1">{name}</h4>
      <p className="text-[#64748B] text-sm mb-4">{title}</p>
      <div className="space-y-2 mb-4">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-2 text-[#1E293B]">
            <span className="text-[#059669]">&#10003;</span>
            <span>{stat}</span>
          </div>
        ))}
      </div>
      <p className="text-[#64748B] text-sm italic">{description}</p>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#E2E8F0] hover:border-[#1E3A5F] transition-all duration-300">
      <span className="text-4xl mb-4 block">{icon}</span>
      <h3 className="text-xl font-bold text-[#1E3A5F] mb-3">{title}</h3>
      <p className="text-[#64748B] leading-relaxed">{description}</p>
    </div>
  );
}

// ============================================
// CREATOR CONSERVATORY DESIGN
// ============================================
function CreatorConservatory() {
  const videos = {
    hero: "https://res.cloudinary.com/dzlnqcmqn/video/upload/v1769755237/6_xkvtay.mp4",
    about: "https://res.cloudinary.com/dzlnqcmqn/video/upload/v1769755252/7606080-hd_1080_1920_30fps_mvzhgi.mp4",
    midStatement: "https://res.cloudinary.com/dzlnqcmqn/video/upload/v1768478147/3_orq6mr.mp4",
    whatIsnt: "/vids/1.mp4",
  };

  return (
    <div className="bg-white text-[#1E293B] relative">
      {/* Hero */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videos.hero} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="relative z-20 max-w-5xl mx-auto px-8 py-32">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Stop Being The World&apos;s<br />
            <span className="text-[#059669]">Best-Kept Secret</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-4 leading-relaxed">
            Learn to create content that <strong>AMPLIFIES</strong> your art
          </p>
          <p className="text-lg text-white/70 max-w-2xl mb-4">
            I&apos;m Trombone Timo. 1B+ views. 1M+ followers. Featured on NBC News. Performed with The Temptations.
          </p>
          <p className="text-lg text-white/70 max-w-2xl mb-8">
            I&apos;ve helped artists gain millions of views, hit 100K+ followers, and make real income from their archive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://www.skool.com/the-creator-conservatory-3365"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-semibold bg-[#059669] text-white px-10 py-4 rounded-full hover:bg-[#047857] transition-colors text-center"
            >
              Join Free
            </a>
            <a
              href="/quiz"
              className="inline-block font-semibold bg-white/10 backdrop-blur text-white border-2 border-white px-10 py-4 rounded-full hover:bg-white/20 transition-colors text-center"
            >
              Take the Creator Quiz
            </a>
          </div>
        </div>
      </section>

      {/* Behind the Curtain - Built for Artists */}
      <section id="about" className="py-24 px-8 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-sm tracking-[0.3em] uppercase text-[#1E3A5F] font-semibold block mb-6">Behind the Curtain</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E293B] leading-relaxed mb-8">
              Built for artists,<br />not influencers.
            </h2>
            <p className="text-lg text-[#64748B] leading-relaxed mb-6">
              You&apos;re a world-class artist sitting on gold. You can play things most people can&apos;t imagine. But online? Crickets.
            </p>
            <p className="text-lg text-[#64748B] leading-relaxed mb-6">
              Most artists are terrified of being &quot;the weird guy who films everything&quot; or losing professional credibility.
            </p>
            <p className="text-lg text-[#64748B] leading-relaxed mb-6">
              This isn&apos;t about becoming an influencer. It&apos;s about documenting your craft in a way that opens doors.
            </p>
            <p className="text-2xl text-[#1E3A5F] font-semibold italic">
              &quot;Your art deserves to be seen.&quot;
            </p>
          </div>
          <div className="aspect-square lg:aspect-auto lg:h-[500px] relative rounded-2xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videos.about} type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* What's Inside - Features */}
      <section id="features" className="py-24 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-[#1E3A5F] font-semibold block mb-4">What&apos;s Inside</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E293B]">
              Everything you need to grow your audience
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="&#128218;"
              title="100+ Viral Hooks Library"
              description="Tried and tested hooks proven to help artists get views. No guesswork, just results."
            />
            <FeatureCard
              icon="&#129302;"
              title="AI Tools for Artists"
              description="Build faster + smarter while preserving your artistry. The tech that works, without the overwhelm."
            />
            <FeatureCard
              icon="&#127911;"
              title="Artist Community"
              description="A vibrant community of artists who understand social media is the future. Your people."
            />
            <FeatureCard
              icon="&#128231;"
              title="Email Marketing System"
              description="Create your own community of fans. Own your audience, don't rent it from algorithms."
            />
            <FeatureCard
              icon="&#128483;"
              title="Live Discussions"
              description="Regular calls on social media strategy with rotating topics. Get your questions answered live."
            />
            <FeatureCard
              icon="&#127775;"
              title="Direct Access to Timo"
              description="Learn from someone who's done it. Real advice from real experience."
            />
          </div>
        </div>
      </section>

      {/* Case Studies / Social Proof */}
      <section id="success-stories" className="py-24 px-8 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-[#1E3A5F] font-semibold block mb-4">Success Stories</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E293B] mb-4">
              Artists who took the leap
            </h2>
            <p className="text-[#64748B] text-lg max-w-2xl mx-auto">
              Real results from real artists who decided their work deserved to be seen.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CaseStudyCard
              name="Robinson&apos;s Remedies"
              title="Herbalist & Educator"
              stats={["70k followers", "15M+ views", "$10k AdSense", "Best sales ever"]}
              description="Turned passion for herbal medicine into a thriving online presence."
            />
            <CaseStudyCard
              name="Wilhelm Magner"
              title="UT Austin Viola Professor"
              stats={["30k followers", "Festival invites", "Podcast features"]}
              description="Classical musician proving social media works for &apos;serious&apos; artists."
            />
            <CaseStudyCard
              name="Big Wy&apos;s Brass Band"
              title="New Orleans Brass Band"
              stats={["5M views on one cover", "40k TikTok followers", "Applebees brand deal"]}
              description="Local band turned viral sensation."
            />
            <CaseStudyCard
              name="Steve Parker"
              title="Visual Artist"
              stats={["500k views", "Local news feature", "5 sold-out exhibitions"]}
              description="Fine artist who cracked the code on showing process."
            />
            <CaseStudyCard
              name="Victor Alegria"
              title="Music Educator"
              stats={["30k views on first video", "$3k coaching program"]}
              description="Created a new income stream teaching what he already knew."
            />
            <div className="bg-[#1E3A5F] rounded-2xl p-8 text-white flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-4">Your story could be next.</h4>
              <p className="text-white/80 mb-6">
                Join the community of artists building real audiences and unlocking new opportunities.
              </p>
              <a
                href="https://www.skool.com/the-creator-conservatory-3365"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#059669] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#047857] transition-colors text-center"
              >
                Join Free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mid Statement */}
      <section className="h-[50vh] relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videos.midStatement} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <p className="text-4xl md:text-6xl font-bold text-white text-center px-8">
            Your art deserves to be seen.
          </p>
        </div>
      </section>

      {/* Who This Is For */}
      <section id="for-you" className="py-24 px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-[#1E3A5F] font-semibold block mb-6">Is This For You?</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1E293B] mb-6">
              This community is for...
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="flex items-start gap-4 p-6 bg-[#F8FAFC] rounded-xl">
              <span className="text-[#059669] text-2xl">&#10003;</span>
              <div>
                <h4 className="font-semibold text-[#1E293B] mb-1">Professional musicians</h4>
                <p className="text-[#64748B]">Who want freedom from orchestra limitations and touring</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-[#F8FAFC] rounded-xl">
              <span className="text-[#059669] text-2xl">&#10003;</span>
              <div>
                <h4 className="font-semibold text-[#1E293B] mb-1">Talented artists</h4>
                <p className="text-[#64748B]">With incredible skills but no online presence</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-[#F8FAFC] rounded-xl">
              <span className="text-[#059669] text-2xl">&#10003;</span>
              <div>
                <h4 className="font-semibold text-[#1E293B] mb-1">Creators with something to sell</h4>
                <p className="text-[#64748B]">But no audience to sell to</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 bg-[#F8FAFC] rounded-xl">
              <span className="text-[#059669] text-2xl">&#10003;</span>
              <div>
                <h4 className="font-semibold text-[#1E293B] mb-1">Artists who want recognition</h4>
                <p className="text-[#64748B]">Without becoming &quot;influencers&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What This Isn't */}
      <section className="py-24 px-8 relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videos.whatIsnt} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <span className="text-sm tracking-[0.3em] uppercase text-white/60 block mb-8">What This Isn&apos;t</span>
          <div className="space-y-4 text-xl md:text-2xl mb-12">
            <p className="flex items-center justify-center gap-4">
              <span className="text-red-400">&#10007;</span>
              <span>This isn&apos;t about becoming an influencer</span>
            </p>
            <p className="flex items-center justify-center gap-4">
              <span className="text-red-400">&#10007;</span>
              <span>No cringe content. No dancing. No memes.</span>
            </p>
            <p className="flex items-center justify-center gap-4">
              <span className="text-red-400">&#10007;</span>
              <span>You don&apos;t need millions of views to unlock opportunities</span>
            </p>
          </div>
          <p className="text-2xl md:text-3xl font-semibold italic text-white/90">
            Built for artists who value their credibility.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-8 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <span className="text-sm tracking-[0.3em] uppercase text-[#1E3A5F] font-semibold block mb-8">Your Move</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1E293B] mb-6">
            Ready to stop being the world&apos;s best-kept secret?
          </h2>
          <p className="text-lg text-[#64748B] mb-10">
            Join the free community and start building an audience that matches your talent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.skool.com/the-creator-conservatory-3365"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-semibold bg-[#059669] text-white px-12 py-5 rounded-full hover:bg-[#047857] transition-colors text-xl"
            >
              Join Free
            </a>
            <a
              href="/quiz"
              className="inline-block font-semibold bg-[#1E3A5F] text-white px-12 py-5 rounded-full hover:bg-[#2d4a6f] transition-colors text-xl"
            >
              Take the Creator Quiz
            </a>
          </div>
          <p className="text-sm text-[#64748B] mt-6">
            Free for the first 100 members
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-[#E2E8F0] bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xl font-bold text-[#1E3A5F]">Creator Conservatory</span>
          <span className="text-sm text-[#64748B]">
            <a href="/admin" className="hover:text-[#1E3A5F] transition-colors">&copy;</a> 2026 Creator Conservatory. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function Home() {
  return (
    <>
      <Navbar />
      <CreatorConservatory />
    </>
  );
}
