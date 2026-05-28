"use client";

import { useEffect, useState } from "react";

type DemoWord = {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  synonyms: string[];
};

const DEMO_WORDS: DemoWord[] = [
  {
    word: "EPHEMERAL",
    phonetic: "/ɪˈfɛm.ər.əl/",
    partOfSpeech: "adjective",
    definition: "Lasting for a very short time.",
    example: "The beauty of cherry blossoms is ephemeral.",
    synonyms: ["fleeting", "transient", "momentary"],
  },
  {
    word: "ASTUTE",
    phonetic: "/əˈstjuːt/",
    partOfSpeech: "adjective",
    definition: "Having or showing an ability to accurately assess situations.",
    example: "An astute observation saved the team hours of work.",
    synonyms: ["shrewd", "sharp", "clever"],
  },
  {
    word: "RESILIENT",
    phonetic: "/rɪˈzɪl.i.ənt/",
    partOfSpeech: "adjective",
    definition: "Able to withstand or recover quickly from difficulties.",
    example: "Resilient students always bounce back from a setback.",
    synonyms: ["tough", "flexible", "hardy"],
  },
];

export default function LearnShowcase() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % DEMO_WORDS.length);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  const w = DEMO_WORDS[index];

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      {/* Left — the value pitch */}
      <div className="space-y-5">
        <div className="space-y-3">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A1A2E]">
            A vocabulary builder disguised as a game.
          </h3>
          <p className="text-[#555770] leading-relaxed">
            Every time you trace a word, Word Wala pulls up its meaning,
            pronunciation, part of speech, and an example sentence. By the end
            of a single match, you&apos;ve learned 10–15 new words — without it
            ever feeling like studying.
          </p>
        </div>

        <ul className="space-y-3">
          <Benefit
            emoji="📖"
            title="Definitions for every word"
            description="Powered by a 125,000-word dictionary with proper definitions, not just spell-check."
          />
          <Benefit
            emoji="🗣️"
            title="Phonetic pronunciations"
            description="See how to actually say the word, even tricky ones."
          />
          <Benefit
            emoji="📚"
            title="Your personal dictionary"
            description="Every word you score is saved to your profile. Review later, brag forever."
          />
          <Benefit
            emoji="🎓"
            title="Perfect for exam prep"
            description="Boards, SAT, IELTS, GRE — vocabulary builds itself when you play 15 min/day."
          />
        </ul>
      </div>

      {/* Right — animated meaning card */}
      <div className="relative">
        <div className="absolute -inset-6 bg-gradient-to-br from-[#6C63FF]/15 via-[#00C9A7]/10 to-[#FFB300]/15 rounded-[40px] blur-3xl -z-10" />

        <div className="card p-6 md:p-8 max-w-md mx-auto">
          {/* Mini grid showing the just-claimed word */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {w.word.split("").map((letter, i) => (
              <div
                key={`${w.word}-${i}`}
                className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#6C63FF] text-white font-black text-base md:text-lg flex items-center justify-center shadow-md cell-pop"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {letter}
              </div>
            ))}
          </div>

          <div className="text-center mb-5">
            <div className="text-xs font-extrabold uppercase tracking-widest text-[#9094A6] mb-1">
              Word claimed · +{w.word.length} pts
            </div>
            <div className="text-2xl font-black gradient-text tracking-wider">
              {w.word}
            </div>
          </div>

          {/* Meaning card */}
          <div
            key={w.word}
            className="bg-[#F8F8FC] rounded-2xl p-5 border-2 border-[#EEEFF3] word-pop"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6C63FF]">
                {w.partOfSpeech}
              </span>
              <span className="text-xs text-[#9094A6] italic">{w.phonetic}</span>
            </div>
            <p className="text-sm text-[#1A1A2E] leading-snug font-bold mb-2">
              {w.definition}
            </p>
            <p className="text-xs text-[#555770] italic leading-snug mb-3">
              &ldquo;{w.example}&rdquo;
            </p>
            <div className="flex flex-wrap gap-1.5">
              {w.synonyms.map((s) => (
                <span
                  key={s}
                  className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#6C63FF] font-bold border border-[#DDDDE8]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-1.5 mt-5">
            {DEMO_WORDS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#6C63FF]" : "w-1.5 bg-[#DDDDE8]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Benefit({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <li className="flex gap-3 items-start">
      <div className="w-9 h-9 rounded-xl bg-white border border-[#EEEFF3] flex items-center justify-center text-lg flex-shrink-0 shadow-sm">
        {emoji}
      </div>
      <div>
        <div className="font-extrabold text-[#1A1A2E] text-sm">{title}</div>
        <div className="text-sm text-[#555770] leading-snug">{description}</div>
      </div>
    </li>
  );
}
