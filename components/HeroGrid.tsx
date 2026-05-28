"use client";

import { useEffect, useState } from "react";

type Cell = {
  letter: string;
  player?: 1 | 2;
  highlighted?: boolean;
};

const baseGrid: Cell[][] = [
  [
    { letter: "C" }, { letter: "A" }, { letter: "T", player: 2 }, { letter: "S" },
    { letter: "P" }, { letter: "L" }, { letter: "" }, { letter: "" },
  ],
  [
    { letter: "" }, { letter: "B" }, { letter: "I", player: 1 }, { letter: "G" },
    { letter: "L" }, { letter: "A" }, { letter: "Y", player: 2 }, { letter: "" },
  ],
  [
    { letter: "W", player: 1, highlighted: true },
    { letter: "O", player: 2, highlighted: true },
    { letter: "R", player: 1, highlighted: true },
    { letter: "D", player: 2, highlighted: true },
    { letter: "" }, { letter: "" }, { letter: "F" }, { letter: "" },
  ],
  [
    { letter: "" }, { letter: "" }, { letter: "U" }, { letter: "" },
    { letter: "M" }, { letter: "O" }, { letter: "X", player: 1 }, { letter: "" },
  ],
  [
    { letter: "F" }, { letter: "" }, { letter: "N", player: 2 }, { letter: "E" },
    { letter: "" }, { letter: "" }, { letter: "" }, { letter: "I" },
  ],
  [
    { letter: "" }, { letter: "Z" }, { letter: "" }, { letter: "T", player: 1 },
    { letter: "S" }, { letter: "U", player: 2 }, { letter: "N" }, { letter: "" },
  ],
];

const PLAYER_COLORS = {
  1: "#FF5E5B",
  2: "#00C2CC",
};

const MEANINGS = [
  {
    word: "WORD",
    pos: "noun",
    phonetic: "/wɜːrd/",
    def: "A single meaningful unit of language; a building block of thought.",
  },
  {
    word: "WORD",
    pos: "noun",
    phonetic: "/wɜːrd/",
    def: "A promise or assurance — \"you have my word.\"",
  },
];

export default function HeroGrid() {
  const [meaningIdx, setMeaningIdx] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const m = setInterval(() => setMeaningIdx((i) => (i + 1) % MEANINGS.length), 3800);
    const t = setInterval(() => setTick((x) => x + 1), 7000);
    return () => {
      clearInterval(m);
      clearInterval(t);
    };
  }, []);

  const meaning = MEANINGS[meaningIdx];

  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-gradient-to-br from-[#6C63FF]/20 via-[#00C9A7]/10 to-[#FFB300]/20 rounded-[40px] blur-3xl -z-10" />

      <div className="card p-6 md:p-8 max-w-md mx-auto">
        {/* Score header */}
        <div className="flex items-center justify-between mb-5">
          <PlayerScore name="You" score={42} color="#FF5E5B" emoji="🦊" active />
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#9094A6]">
            vs
          </div>
          <PlayerScore name="Riya" score={35} color="#00C2CC" emoji="🐱" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-8 gap-1 mb-4" key={`grid-${tick}`}>
          {baseGrid.flat().map((cell, idx) => (
            <GridCell key={`${tick}-${idx}`} cell={cell} delay={idx * 15} />
          ))}
        </div>

        {/* Meaning callout — the USP showcase */}
        <div
          key={`meaning-${meaningIdx}`}
          className="bg-gradient-to-br from-[#6C63FF]/10 to-[#00C9A7]/10 border-2 border-[#6C63FF]/25 rounded-2xl py-3 px-4 word-pop"
        >
          <div className="flex items-center justify-between mb-1">
            <div className="text-2xl font-black tracking-[0.15em] gradient-text">
              {meaning.word}
            </div>
            <div className="text-xs font-extrabold text-[#00C9A7]">+4 pts</div>
          </div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6C63FF]">
              {meaning.pos}
            </span>
            <span className="text-[10px] text-[#9094A6] italic">
              {meaning.phonetic}
            </span>
          </div>
          <p className="text-xs text-[#1A1A2E] font-medium leading-snug">
            {meaning.def}
          </p>
        </div>
      </div>
    </div>
  );
}

function PlayerScore({
  name,
  score,
  color,
  emoji,
  active,
}: {
  name: string;
  score: number;
  color: string;
  emoji: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-2xl transition ${
        active ? "bg-white shadow-md" : ""
      }`}
      style={active ? { boxShadow: `0 4px 12px ${color}30` } : undefined}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-lg"
        style={{ backgroundColor: `${color}25` }}
      >
        {emoji}
      </div>
      <div>
        <div className="text-xs font-bold text-[#555770]">{name}</div>
        <div className="text-lg font-black leading-none" style={{ color }}>
          {score}
        </div>
      </div>
    </div>
  );
}

function GridCell({ cell, delay }: { cell: Cell; delay: number }) {
  const color = cell.player ? PLAYER_COLORS[cell.player] : "#9094A6";
  const isEmpty = !cell.letter;

  return (
    <div
      className={`aspect-square rounded-lg flex items-center justify-center text-sm md:text-base font-extrabold cell-pop ${
        isEmpty ? "bg-[#F4F4F8]" : "bg-white border"
      } ${cell.highlighted ? "ring-2 ring-[#FFB300] ring-offset-1" : ""}`}
      style={{
        color: isEmpty ? "transparent" : color,
        borderColor: isEmpty ? "transparent" : "#EEEFF3",
        animationDelay: `${delay}ms`,
        backgroundColor: cell.highlighted ? "#FFB30015" : undefined,
      }}
    >
      {cell.letter || "·"}
    </div>
  );
}
