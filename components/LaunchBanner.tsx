"use client";

import { useEffect, useState } from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.wordwala.game.word_wala";

export default function LaunchBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("ww_launch_dismissed");
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    sessionStorage.setItem("ww_launch_dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(26,26,46,0.55)", backdropFilter: "blur(4px)" }}
      onClick={dismiss}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "ww-pop-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Top gradient bar */}
        <div
          className="h-2 w-full"
          style={{ background: "linear-gradient(90deg,#6C63FF,#FF6B6B,#FFB300)" }}
        />

        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#9094A6] hover:bg-[#F0F0F5] transition-colors text-lg font-bold"
        >
          ✕
        </button>

        <div className="px-8 pt-6 pb-8 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="Word Wala"
            width={88}
            height={88}
            className="mx-auto mb-3 rounded-2xl shadow-lg"
            style={{ width: 88, height: 88, animation: "ww-float 2.5s ease-in-out infinite" }}
          />

          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4"
            style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            Just Launched
          </div>

          <h2 className="text-2xl font-black text-[#1A1A2E] leading-tight mb-2">
            Word Wala is live<br />on Google Play! 🎉
          </h2>
          <p className="text-sm text-[#555770] mb-6 leading-relaxed">
            Build words, learn meanings, and beat your friends — now on Android.
            Download it free today!
          </p>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full rounded-2xl py-3.5 px-6 font-extrabold text-white text-sm transition-transform active:scale-95"
            style={{ background: "linear-gradient(135deg,#3DDC84 0%,#00A86B 100%)" }}
            onClick={dismiss}
          >
            {/* Google Play icon (inline SVG so no extra dependency) */}
            <svg width="20" height="20" viewBox="0 0 512 512" fill="none">
              <path d="M48 30.3 284.6 256 48 481.7V30.3Z" fill="white" />
              <path d="M48 30.3l236.6 225.7L48 30.3Z" fill="#00D25B" />
              <path d="M336 206.1 48 30.3l236.6 225.7L336 206.1Z" fill="#00B09B" />
              <path d="M48 481.7l288-275.6L284.6 256 48 481.7Z" fill="#FF3D00" />
              <path d="M336 305.9 48 481.7l236.6-225.7L336 305.9Z" fill="#FFD600" />
              <path d="M336 206.1l112 49.9-112 49.9V206.1Z" fill="white" />
            </svg>
            Get it on Google Play
          </a>

          <button
            onClick={dismiss}
            className="mt-3 text-xs text-[#9094A6] hover:text-[#555770] transition-colors underline underline-offset-2"
          >
            Maybe later
          </button>
        </div>
      </div>

      <style>{`
        @keyframes ww-pop-in {
          from { opacity: 0; transform: scale(0.85) translateY(24px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes ww-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
