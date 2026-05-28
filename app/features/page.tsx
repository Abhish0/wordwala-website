import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Features — Word Wala",
  description:
    "Discover every feature Word Wala offers: instant word meanings, the signature steal mechanic, pass & play, online multiplayer, AI opponent, personal dictionary, and more.",
};

const features = [
  // PRIMARY USP — Learning
  {
    emoji: "📖",
    color: "#6C63FF",
    title: "Instant word meanings",
    description:
      "Every word you score reveals its definition, phonetic, part of speech, and an example sentence. Build vocabulary as you play.",
    primary: true,
  },
  {
    emoji: "🎯",
    color: "#FF5E5B",
    title: "Steal opponents' words",
    description:
      "Complete a word your opponent started. Drop the right letter and the points are yours — a tactical twist no other word game offers.",
    primary: true,
  },
  {
    emoji: "📚",
    color: "#00C9A7",
    title: "Personal dictionary",
    description:
      "Every word you've ever scored is saved to your profile. Review them, track your growth, brag forever.",
    primary: true,
  },

  // CORE FEATURES
  {
    emoji: "👥",
    color: "#FF5E5B",
    title: "Pass & Play (Local)",
    description:
      "Hand the phone around. 2 to 4 players battle on a single device — perfect for family game nights and classroom downtime.",
  },
  {
    emoji: "🌐",
    color: "#00C2CC",
    title: "Online Multiplayer",
    description:
      "Challenge a friend across the country with a join code. Real-time moves, live scores, no lag.",
  },
  {
    emoji: "🤖",
    color: "#9B59B6",
    title: "AI Opponent",
    description:
      "Practice solo against AI opponents — Easy, Medium, or Hard difficulty. Sharpen your vocabulary anytime.",
  },

  // CONFIGURATION
  {
    emoji: "🎯",
    color: "#00C9A7",
    title: "Multiple grid sizes",
    description:
      "6×6 for quick matches, 8×8 for the classic experience, or 10×10 for marathon brain battles.",
  },
  {
    emoji: "⏱️",
    color: "#FF6FAD",
    title: "Custom timer modes",
    description:
      "Lightning-fast 15-second turns, balanced 30s, or relaxed 60s. You set the pace.",
  },
  {
    emoji: "🏆",
    color: "#5B9AF5",
    title: "Win conditions",
    description:
      "Race to 50, 75, or 100 points. Quick games or long-form duels — your choice.",
  },

  // ENGAGEMENT
  {
    emoji: "🦊",
    color: "#FFB300",
    title: "Choose your avatar",
    description:
      "Fox, Cat, Frog, or Tiger — pick the avatar that matches your vibe.",
  },
  {
    emoji: "📊",
    color: "#48CFAD",
    title: "Stats & streaks",
    description:
      "Track games won, current win streak, and your all-time best plays.",
  },
  {
    emoji: "🔊",
    color: "#9B8EFF",
    title: "Satisfying sounds",
    description:
      "Every letter placement, every valid word, every win — designed to feel as good as it sounds.",
  },
  {
    emoji: "🎨",
    color: "#FF9142",
    title: "Light & dark mode",
    description:
      "Play comfortably day or night. The interface adapts to your system theme automatically.",
  },
  {
    emoji: "💾",
    color: "#6C63FF",
    title: "Resume any game",
    description:
      "Phone dies? Get a call? Word Wala saves every game so you can pick up right where you left off.",
  },
];

const primary = features.filter((f) => f.primary);
const rest = features.filter((f) => !f.primary);

export default function FeaturesPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#6C63FF] mb-3">
            Everything you need
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-[#1A1A2E] mb-4">
            Built to grow your <span className="gradient-text">vocabulary.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#555770] max-w-2xl mx-auto">
            Word Wala is more than a game — it&apos;s a vocabulary builder
            disguised as a tactical multiplayer experience.
          </p>
        </div>
      </section>

      {/* PRIMARY FEATURES — the unique selling points */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#FF5E5B] mb-2">
              The Word Wala difference
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E]">
              What makes us different.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {primary.map((f) => (
              <div
                key={f.title}
                className="card p-7 border-2"
                style={{ borderColor: `${f.color}40` }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                  style={{ backgroundColor: `${f.color}20` }}
                >
                  {f.emoji}
                </div>
                <h3 className="text-lg font-extrabold text-[#1A1A2E] mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-[#555770] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REST OF FEATURES */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#6C63FF] mb-2">
              Plus everything you&apos;d expect
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E]">
              Polished from end to end.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((f) => (
              <div key={f.title} className="card p-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: `${f.color}20` }}
                >
                  {f.emoji}
                </div>
                <h3 className="text-base font-extrabold text-[#1A1A2E] mb-1.5">
                  {f.title}
                </h3>
                <p className="text-sm text-[#555770] leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
            Ready to test it out?
          </h2>
          <p className="text-lg text-[#555770] mb-8">
            Try Quick Play right here in your browser — no download needed.
          </p>
          <Link href="/play" className="btn-primary text-base">
            <span>🎮</span> Play Now
          </Link>
        </div>
      </section>
    </>
  );
}
