"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/features", label: "Features" },
    { href: "/play", label: "Quick Play" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-[#EEEFF3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Word Wala"
              width={36}
              height={36}
              className="w-9 h-9 rounded-xl float"
            />
            <span className="text-xl font-extrabold gradient-text tracking-tight">
              Word Wala
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-bold text-[#555770] hover:text-[#6C63FF] rounded-full hover:bg-[#F0F2FA] transition"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#download"
              className="ml-3 btn-primary text-sm"
            >
              Get the App
            </a>
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-[#F0F2FA]"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-[#1A1A2E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 text-base font-bold text-[#555770] hover:text-[#6C63FF] hover:bg-[#F0F2FA] rounded-xl"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#download"
              onClick={() => setOpen(false)}
              className="block btn-primary text-center mt-3"
            >
              Get the App
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
