"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useRef, useState } from "react";

// Generate poster image URL from Cloudinary video URL
function getPosterFromVideo(videoUrl: string): string {
  if (videoUrl.startsWith("/")) return "";
  return videoUrl
    .replace(/\/video\/upload\/[^/]+\//, "/video/upload/so_0,f_jpg,q_auto/")
    .replace(".mp4", ".jpg");
}

// AutoPlay Video component - shows poster immediately, then video when ready
function AutoPlayVideo({ src, className }: { src: string; className: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const posterUrl = getPosterFromVideo(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playVideo = () => {
      if (video.paused) {
        video
          .play()
          .then(() => setIsReady(true))
          .catch(() => {
            video.muted = true;
            video
              .play()
              .then(() => setIsReady(true))
              .catch(() => {});
          });
      }
    };

    const handlePlaying = () => setIsReady(true);
    video.addEventListener("playing", handlePlaying);
    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);

    playVideo();

    const retryIntervals = [50, 100, 200, 400, 800, 1200, 1600, 2000, 3000];
    const timeouts = retryIntervals.map((ms) => setTimeout(playVideo, ms));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) playVideo();
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(video);

    const handleInteraction = () => playVideo();
    document.addEventListener("touchstart", handleInteraction, {
      once: true,
      passive: true,
    });
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("scroll", handleInteraction, {
      once: true,
      passive: true,
    });

    return () => {
      observer.disconnect();
      video.removeEventListener("playing", handlePlaying);
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
      timeouts.forEach(clearTimeout);
    };
  }, [src]);

  return (
    <div
      className={className}
      style={{
        backgroundImage: posterUrl ? `url(${posterUrl})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

// ============================================
// CREATOR CONSERVATORY - Dark Luxe Design
// ============================================
function Design1() {
  const videos = {
    hero: "https://res.cloudinary.com/dzlnqcmqn/video/upload/v1769755237/6_xkvtay.mp4",
    about: "https://res.cloudinary.com/dzlnqcmqn/video/upload/v1769755252/7606080-hd_1080_1920_30fps_mvzhgi.mp4",
    midStatement: "https://res.cloudinary.com/dzlnqcmqn/video/upload/v1768478147/3_orq6mr.mp4",
    whatIsnt: "/vids/1.mp4",
  };

  return (
    <div className="bg-[#0A0A0A] text-[#FAF6E3] relative">
      {/* Hero */}
      <section className="min-h-screen relative overflow-hidden flex items-center">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={getPosterFromVideo(videos.hero)}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src={videos.hero} type="video/mp4" />
        </video>
        <div className="relative z-20 max-w-5xl mx-auto px-8 py-32 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 whitespace-nowrap">
            Creator Conservatory
          </h1>
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-[#FAF6E3] max-w-4xl mx-auto mb-6 leading-relaxed whitespace-nowrap">
            Stop being the world&apos;s best-kept secret. Learn to amplify your art.
          </p>
          <p className="font-sans text-base md:text-lg lg:text-xl text-[#FAF6E3]/70 max-w-4xl mx-auto mb-12 whitespace-nowrap">
            1B+ views. 1M+ followers. Featured on NBC News. Performed with The Temptations.
          </p>
          <a
            href="https://www.skool.com/the-creator-conservatory-3365"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans font-semibold bg-[#059669] text-white px-12 py-4 rounded-full hover:bg-[#047857] transition-colors"
          >
            Join Free
          </a>
        </div>
        <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
          <span className="font-sans text-xs tracking-widest text-[#D4A853]/60">
            TROMBONE TIMO
          </span>
          <span className="font-sans text-xs tracking-widest text-[#D4A853]/60">
            YOUR ART DESERVES TO BE SEEN
          </span>
        </div>
      </section>

      {/* Behind the Curtain - Video & Text */}
      <section id="why" className="grid lg:grid-cols-2">
        <div className="aspect-square lg:aspect-auto lg:h-screen relative">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={getPosterFromVideo(videos.about)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={videos.about} type="video/mp4" />
          </video>
        </div>
        <div className="flex items-center justify-center p-12 lg:p-24">
          <div className="max-w-lg">
            <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#D4A853] block mb-6">
              Behind the Curtain
            </span>
            <h2 className="font-ninja text-3xl lg:text-4xl leading-relaxed mb-8">
              Built for artists, not influencers.
            </h2>
            <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed mb-6">
              You&apos;re a world-class artist sitting on gold. You can play things most people
              can&apos;t imagine. But online? Crickets.
            </p>
            <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed mb-6">
              Most artists are terrified of being &quot;the weird guy who films everything&quot; or
              losing professional credibility. This isn&apos;t about becoming an influencer. It&apos;s
              about documenting your craft in a way that opens doors.
            </p>
            <p className="font-serif text-2xl text-[#D4A853] italic">
              Your art deserves to be seen.
            </p>
          </div>
        </div>
      </section>

      {/* What's Inside - Feature Cards */}
      <section id="features" className="py-24 px-8 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#D4A853] block mb-4 text-center">
            What&apos;s Inside
          </span>
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="p-10 border border-[#FAF6E3]/10 rounded-2xl">
              <span className="text-4xl mb-4 block">&#x1F4DA;</span>
              <h3 className="font-ninja text-2xl mb-4">100+ Viral Hooks</h3>
              <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed">
                Tried and tested hooks proven to help artists get views. No guesswork, just results.
              </p>
            </div>
            <div className="p-10 border border-[#FAF6E3]/10 rounded-2xl">
              <span className="text-4xl mb-4 block">&#x1F916;</span>
              <h3 className="font-ninja text-2xl mb-4">AI Tools for Artists</h3>
              <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed">
                Build faster and smarter while preserving your artistry. The tech that works, without
                the overwhelm.
              </p>
            </div>
            <div className="p-10 border border-[#FAF6E3]/10 rounded-2xl">
              <span className="text-4xl mb-4 block">&#x1F3B5;</span>
              <h3 className="font-ninja text-2xl mb-4">Artist Community</h3>
              <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed">
                A vibrant community of artists who understand social media is the future. Your people.
              </p>
            </div>
            <div className="p-10 border border-[#FAF6E3]/10 rounded-2xl">
              <span className="text-4xl mb-4 block">&#x2B50;</span>
              <h3 className="font-ninja text-2xl mb-4">Direct Access to Timo</h3>
              <p className="font-sans text-lg text-[#FAF6E3]/60 leading-relaxed">
                Live discussions, email marketing systems, and real advice from someone who&apos;s done
                it. No gatekeeping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid Statement */}
      <section className="h-[70vh] relative">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={getPosterFromVideo(videos.midStatement)}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videos.midStatement} type="video/mp4" />
        </video>
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <p className="font-ninja text-4xl md:text-6xl text-white text-center px-8">
            Your art deserves to be seen.
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 px-8 bg-[#0F0F0F]">
        <div className="max-w-6xl mx-auto">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#D4A853] block mb-4 text-center">
            Success Stories
          </span>
          <p className="font-serif text-3xl lg:text-4xl text-center leading-relaxed mb-16 max-w-3xl mx-auto">
            Real results from real artists who decided their work deserved to be seen.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 border border-[#FAF6E3]/10 rounded-2xl">
              <h4 className="font-ninja text-xl mb-1">Robinson&apos;s Remedies</h4>
              <p className="font-sans text-sm text-[#FAF6E3]/40 mb-4">Herbalist &amp; Educator</p>
              <div className="space-y-2 mb-4">
                <p className="font-sans text-[#D4A853]">&#10003; 70k followers</p>
                <p className="font-sans text-[#D4A853]">&#10003; 15M+ views</p>
                <p className="font-sans text-[#D4A853]">&#10003; $10k AdSense</p>
              </div>
              <p className="font-sans text-sm text-[#FAF6E3]/50 italic">
                Turned passion for herbal medicine into a thriving online presence.
              </p>
            </div>
            <div className="p-8 border border-[#FAF6E3]/10 rounded-2xl">
              <h4 className="font-ninja text-xl mb-1">Wilhelm Magner</h4>
              <p className="font-sans text-sm text-[#FAF6E3]/40 mb-4">
                UT Austin Viola Professor
              </p>
              <div className="space-y-2 mb-4">
                <p className="font-sans text-[#D4A853]">&#10003; 30k followers</p>
                <p className="font-sans text-[#D4A853]">&#10003; Festival invites</p>
                <p className="font-sans text-[#D4A853]">&#10003; Podcast features</p>
              </div>
              <p className="font-sans text-sm text-[#FAF6E3]/50 italic">
                Classical musician proving social media works for &apos;serious&apos; artists.
              </p>
            </div>
            <div className="p-8 border border-[#FAF6E3]/10 rounded-2xl">
              <h4 className="font-ninja text-xl mb-1">Big Wy&apos;s Brass Band</h4>
              <p className="font-sans text-sm text-[#FAF6E3]/40 mb-4">
                New Orleans Brass Band
              </p>
              <div className="space-y-2 mb-4">
                <p className="font-sans text-[#D4A853]">&#10003; 5M views on one cover</p>
                <p className="font-sans text-[#D4A853]">&#10003; 40k TikTok followers</p>
                <p className="font-sans text-[#D4A853]">&#10003; Applebees brand deal</p>
              </div>
              <p className="font-sans text-sm text-[#FAF6E3]/50 italic">
                Local band turned viral sensation.
              </p>
            </div>
            <div className="p-8 border border-[#FAF6E3]/10 rounded-2xl">
              <h4 className="font-ninja text-xl mb-1">Steve Parker</h4>
              <p className="font-sans text-sm text-[#FAF6E3]/40 mb-4">Visual Artist</p>
              <div className="space-y-2 mb-4">
                <p className="font-sans text-[#D4A853]">&#10003; 500k views</p>
                <p className="font-sans text-[#D4A853]">&#10003; Local news feature</p>
                <p className="font-sans text-[#D4A853]">&#10003; 5 sold-out exhibitions</p>
              </div>
              <p className="font-sans text-sm text-[#FAF6E3]/50 italic">
                Fine artist who cracked the code on showing process.
              </p>
            </div>
            <div className="p-8 border border-[#FAF6E3]/10 rounded-2xl">
              <h4 className="font-ninja text-xl mb-1">Victor Alegria</h4>
              <p className="font-sans text-sm text-[#FAF6E3]/40 mb-4">Music Educator</p>
              <div className="space-y-2 mb-4">
                <p className="font-sans text-[#D4A853]">&#10003; 30k views on first video</p>
                <p className="font-sans text-[#D4A853]">&#10003; $3k coaching program</p>
              </div>
              <p className="font-sans text-sm text-[#FAF6E3]/50 italic">
                Created a new income stream teaching what he already knew.
              </p>
            </div>
            <div className="p-8 border border-[#059669]/30 rounded-2xl bg-[#059669]/5 flex flex-col justify-center">
              <h4 className="font-ninja text-2xl mb-4">Your story could be next.</h4>
              <p className="font-sans text-[#FAF6E3]/60 mb-6">
                Join the community of artists building real audiences.
              </p>
              <a
                href="https://www.skool.com/the-creator-conservatory-3365"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-sans font-semibold bg-[#059669] text-white px-6 py-3 rounded-full hover:bg-[#047857] transition-colors w-fit"
              >
                Join Free
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* For You */}
      <section id="for-you" className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#D4A853] block mb-6">
            For You
          </span>
          <p className="font-serif text-3xl lg:text-4xl leading-relaxed mb-8">
            Whether you&apos;re a professional musician who wants freedom from touring, a talented
            artist with no online presence, a creator with something to sell but no audience — or
            simply an artist who wants recognition without becoming an &quot;influencer&quot; — there
            is a path. Timo has walked it. He can help you find yours.
          </p>
          <p className="font-sans text-xl text-[#FAF6E3]/70 italic">
            Take the quiz. Find your archetype. Start building.
          </p>
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
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="font-sans text-sm tracking-[0.3em] uppercase text-[#D4A853] block mb-8">
            What This Isn&apos;t
          </span>
          <p className="font-sans text-2xl text-[#FAF6E3]/80 mb-8">
            No cringe content. No dancing. No memes. No influencer culture.
          </p>
          <p className="font-serif text-4xl lg:text-5xl text-[#FAF6E3] italic">
            Just artists building quietly and winning loudly.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-8 text-center">
        <span className="font-sans text-sm tracking-[0.5em] uppercase text-[#D4A853] block mb-8">
          Your Move
        </span>
        <h2 className="font-ninja text-3xl lg:text-4xl mb-10">
          Ready to stop being the world&apos;s best-kept secret?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.skool.com/the-creator-conservatory-3365"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-sans font-semibold bg-[#059669] text-white px-14 py-5 rounded-full hover:bg-[#047857] transition-colors text-xl"
          >
            Join Free
          </a>
          <a
            href="/quiz"
            className="inline-block font-sans font-semibold border-2 border-[#059669] text-[#059669] px-14 py-5 rounded-full hover:bg-[#059669]/10 transition-colors text-xl"
          >
            Take the Creator Quiz
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8 border-t border-[#FAF6E3]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-xl font-bold">Creator Conservatory</span>
          <span className="font-sans text-xs text-[#FAF6E3]/30">
            <a href="/admin" className="hover:text-[#FAF6E3]/50 transition-colors">
              &copy;
            </a>{" "}
            2026 Creator Conservatory. All rights reserved.
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
      <Design1 />
    </>
  );
}
