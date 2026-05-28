"use client";

import { useEffect, useState } from "react";
import { getMeaning, type WordMeaning } from "@/lib/dictionary";

type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "loaded"; meaning: WordMeaning }
  | { status: "not-found" }
  | { status: "error" };

export default function WordMeaningCard({ word }: { word: string }) {
  const [state, setState] = useState<State>({ status: "idle" });

  useEffect(() => {
    let cancelled = false;
    setState({ status: "loading" });
    getMeaning(word)
      .then((m) => {
        if (cancelled) return;
        if (m) setState({ status: "loaded", meaning: m });
        else setState({ status: "not-found" });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, [word]);

  if (state.status === "loading") {
    return (
      <div className="mt-2 px-3 py-2 bg-white rounded-lg border border-[#EEEFF3]">
        <div className="flex items-center gap-2 text-xs text-[#9094A6] font-bold">
          <span className="inline-block w-2 h-2 bg-[#6C63FF] rounded-full animate-pulse" />
          Looking up...
        </div>
      </div>
    );
  }

  if (state.status === "not-found") {
    return (
      <div className="mt-2 px-3 py-2 bg-white rounded-lg border border-[#EEEFF3]">
        <p className="text-xs text-[#9094A6] font-bold italic">
          No definition found
        </p>
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <div className="mt-2 px-3 py-2 bg-white rounded-lg border border-[#EEEFF3]">
        <p className="text-xs text-[#FF4757] font-bold">
          Couldn&apos;t reach the dictionary
        </p>
      </div>
    );
  }

  if (state.status !== "loaded") return null;

  const m = state.meaning;
  return (
    <div className="mt-2 px-3 py-2 bg-white rounded-lg border border-[#EEEFF3] space-y-1.5">
      {(m.partOfSpeech || m.phonetic) && (
        <div className="flex items-center gap-2">
          {m.partOfSpeech && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6C63FF]">
              {m.partOfSpeech}
            </span>
          )}
          {m.phonetic && (
            <span className="text-[10px] text-[#9094A6] font-medium italic">
              {m.phonetic}
            </span>
          )}
        </div>
      )}
      <p className="text-xs text-[#1A1A2E] leading-snug font-medium">
        {m.definition}
      </p>
      {m.example && (
        <p className="text-xs text-[#555770] leading-snug italic">
          &ldquo;{m.example}&rdquo;
        </p>
      )}
      {m.synonyms.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-0.5">
          {m.synonyms.slice(0, 4).map((s) => (
            <span
              key={s}
              className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#F0F2FA] text-[#555770] font-bold"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
