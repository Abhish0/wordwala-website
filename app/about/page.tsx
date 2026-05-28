import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Word Wala",
  description:
    "The story behind Word Wala — built by a small team in India for word lovers everywhere.",
};

export default function AboutPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#6C63FF] mb-3 text-center">
            Our Story
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-[#1A1A2E] mb-8 text-center">
            We love <span className="gradient-text">words.</span>
          </h1>

          <div className="card p-8 md:p-12 space-y-6 text-lg text-[#555770] leading-relaxed">
            <p>
              <span className="text-3xl float inline-block mr-2">🐼</span>
              Word Wala started with a simple idea: word games should bring
              people together — not isolate them behind a screen.
            </p>

            <p>
              We were tired of word apps that felt like homework. Static
              puzzles, ads everywhere, and no one to play with. So we built
              something different: a real-time, multiplayer word battle where
              every match is unpredictable.
            </p>

            <p>
              Whether you&apos;re a student boosting your vocabulary, a parent
              looking for screen time that actually teaches, or just someone
              who loves a good word brawl — Word Wala is for you.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4">
              <ValueCard emoji="🎮" title="Fun first" />
              <ValueCard emoji="📚" title="Learning second" />
              <ValueCard emoji="❤️" title="Always free to start" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-8 text-center">
            What we believe
          </h2>

          <div className="space-y-4">
            <Belief
              number="01"
              text="Great games respect your time. No forced ads. No pay-to-win."
              color="#FF5E5B"
            />
            <Belief
              number="02"
              text="Learning should be a side effect of having fun — not the goal."
              color="#FFB300"
            />
            <Belief
              number="03"
              text="Real friends, real conversations, real laughter — across a shared game."
              color="#00C9A7"
            />
            <Belief
              number="04"
              text="Built in India, for the world."
              color="#6C63FF"
            />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A2E] mb-4">
            Want to say hi?
          </h2>
          <p className="text-lg text-[#555770] mb-8">
            We read every message. Send us your thoughts, bug reports, or word
            suggestions.
          </p>
          <Link href="/contact" className="btn-primary text-base">
            <span>💌</span> Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}

function ValueCard({ emoji, title }: { emoji: string; title: string }) {
  return (
    <div className="bg-[#F0F2FA] rounded-2xl p-4 text-center">
      <div className="text-3xl mb-2">{emoji}</div>
      <div className="text-sm font-bold text-[#1A1A2E]">{title}</div>
    </div>
  );
}

function Belief({
  number,
  text,
  color,
}: {
  number: string;
  text: string;
  color: string;
}) {
  return (
    <div className="card p-6 flex gap-5 items-start">
      <div
        className="text-3xl font-black flex-shrink-0"
        style={{ color }}
      >
        {number}
      </div>
      <p className="text-lg text-[#1A1A2E] font-bold leading-snug pt-1">
        {text}
      </p>
    </div>
  );
}
