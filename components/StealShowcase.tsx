"use client";

import { useEffect, useState } from "react";

const STAGES = [
  // 0 — opponent has placed C, A
  { c: { letter: "C", player: 2 }, a: { letter: "A", player: 2 }, t: { letter: "", player: 0 }, highlight: false },
  // 1 — you drop T
  { c: { letter: "C", player: 2 }, a: { letter: "A", player: 2 }, t: { letter: "T", player: 1 }, highlight: false },
  // 2 — full CAT highlighted as yours
  { c: { letter: "C", player: 2 }, a: { letter: "A", player: 2 }, t: { letter: "T", player: 1 }, highlight: true },
];

const PLAYER_COLORS: Record<number, string> = {
  0: "#9094A6",
  1: "#FF5E5B",
  2: "#00C2CC",
};

export default function StealShowcase() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const s = STAGES[stage];

  return (
    <div className="grid lg:grid-cols-2 gap-10 items-center">
      {/* Visual on left */}
      <div className="relative order-2 lg:order-1">
        <div className="absolute -inset-6 bg-gradient-to-br from-[#FF5E5B]/10 via-[#FFB300]/10 to-[#6C63FF]/15 rounded-[40px] blur-3xl -z-10" />

        <div className="card p-7 md:p-10 max-w-md mx-auto">
          {/* Players */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#FF5E5B]/20 flex items-center justify-center text-lg">🦊</div>
              <div>
                <div className="text-xs font-bold text-[#555770]">You</div>
                <div className="text-lg font-black text-[#FF5E5B] leading-none">{stage === 2 ? "+3" : "0"}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <div className="text-xs font-bold text-[#555770] text-right">Opponent</div>
                <div className="text-lg font-black text-[#00C2CC] leading-none text-right">0</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#00C2CC]/20 flex items-center justify-center text-lg">🐱</div>
            </div>
          </div>

          {/* Three-cell mini grid showing C-A-T */}
          <div className="flex items-center justify-center gap-2 mb-5">
            <DemoCell letter={s.c.letter} player={s.c.player} highlighted={s.highlight} />
            <DemoCell letter={s.a.letter} player={s.a.player} highlighted={s.highlight} />
            <DemoCell letter={s.t.letter} player={s.t.player} highlighted={s.highlight} placing={stage === 1} />
          </div>

          {/* Caption */}
          <div className="bg-[#F8F8FC] rounded-2xl py-3 px-4 text-center border-2 border-[#EEEFF3] min-h-[60px] flex items-center justify-center">
            {stage === 0 && (
              <p className="text-sm font-bold text-[#555770]">
                <span className="text-[#00C2CC]">Opponent</span> started building &quot;CA&quot;...
              </p>
            )}
            {stage === 1 && (
              <p className="text-sm font-bold text-[#1A1A2E]">
                You drop a <span className="text-[#FF5E5B] font-black">T</span>...
              </p>
            )}
            {stage === 2 && (
              <p className="text-sm font-extrabold text-[#FF5E5B]">
                🎯 You stole CAT! +3 points
              </p>
            )}
          </div>

          {/* Stage dots */}
          <div className="flex justify-center gap-1.5 mt-5">
            {STAGES.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === stage ? "w-6 bg-[#FF5E5B]" : "w-1.5 bg-[#DDDDE8]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Copy on right */}
      <div className="space-y-5 order-1 lg:order-2">
        <p className="text-xs font-extrabold uppercase tracking-widest text-[#FF5E5B]">
          The signature twist
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E]">
          Steal their words.
        </h2>
        <p className="text-lg text-[#555770] leading-relaxed">
          Unlike Wordle or Scrabble, anyone can finish a word — including
          letters your opponent placed. Watch them spell <strong>C-A</strong>,
          drop a <strong>T</strong>, and the word is yours. Every turn is a
          mind game.
        </p>
        <ul className="space-y-2.5 text-sm text-[#1A1A2E] font-bold">
          <li className="flex items-center gap-2">
            <span className="text-[#FF5E5B]">✓</span>
            Block, steal, or set traps for your opponent
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#FF5E5B]">✓</span>
            Every letter you place is a calculated risk
          </li>
          <li className="flex items-center gap-2">
            <span className="text-[#FF5E5B]">✓</span>
            Tactical depth that classic word games don&apos;t offer
          </li>
        </ul>
      </div>
    </div>
  );
}

function DemoCell({
  letter,
  player,
  highlighted,
  placing,
}: {
  letter: string;
  player: number;
  highlighted?: boolean;
  placing?: boolean;
}) {
  const color = PLAYER_COLORS[player];
  const isEmpty = !letter;
  return (
    <div
      className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-black transition-all duration-500 ${
        isEmpty
          ? "bg-[#F4F4F8] border-2 border-dashed border-[#DDDDE8]"
          : "bg-white border-2 shadow-md"
      } ${placing ? "scale-110 ring-4 ring-[#FF5E5B]/30 cell-pop" : ""} ${
        highlighted ? "ring-4 ring-[#FFB300]" : ""
      }`}
      style={
        !isEmpty
          ? {
              color,
              borderColor: `${color}50`,
              backgroundColor: highlighted ? "#FFB30015" : undefined,
            }
          : undefined
      }
    >
      {letter || "·"}
    </div>
  );
}
