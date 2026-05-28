import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog — Word Wala",
  description:
    "Vocabulary tips, word game strategies, exam prep, and language learning ideas from the Word Wala team.",
};

export default function BlogPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#6C63FF] mb-3">
            Word Wala Blog
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-[#1A1A2E] mb-4">
            Words, <span className="gradient-text">explored.</span>
          </h1>
          <p className="text-lg text-[#555770]">
            Vocabulary tips, exam prep, game strategy, and the science of
            language learning.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card p-7 block group"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
                  style={{ backgroundColor: `${post.color}20` }}
                >
                  {post.emoji}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${post.color}15`,
                      color: post.color,
                    }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-[#9094A6] font-bold">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-xl font-extrabold text-[#1A1A2E] mb-3 group-hover:text-[#6C63FF] transition">
                  {post.title}
                </h2>
                <p className="text-sm text-[#555770] leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <span className="text-sm font-bold text-[#6C63FF] inline-flex items-center gap-1">
                  Read more
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
