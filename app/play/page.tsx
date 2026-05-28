import type { Metadata } from "next";
import QuickPlay from "@/components/QuickPlay";

export const metadata: Metadata = {
  title: "Quick Play — Word Wala",
  description:
    "Play Word Wala instantly in your browser. Trace letters to form words and beat the clock.",
};

export default function PlayPage() {
  return (
    <section className="py-10 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#6C63FF] mb-3">
            Quick Play · Solo Mode
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-3">
            Trace. Score. <span className="gradient-text">Repeat.</span>
          </h1>
          <p className="text-[#555770] max-w-xl mx-auto">
            Tap or drag through adjacent letters to form a valid word. Longer
            words = bigger points.
          </p>
        </div>

        <QuickPlay />
      </div>
    </section>
  );
}
