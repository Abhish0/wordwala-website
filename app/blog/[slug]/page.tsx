import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — Word Wala`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="text-sm font-bold text-[#6C63FF] hover:underline mb-8 inline-flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to blog
        </Link>

        <div className="mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6"
            style={{ backgroundColor: `${post.color}20` }}
          >
            {post.emoji}
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ backgroundColor: `${post.color}15`, color: post.color }}
            >
              {post.category}
            </span>
            <span className="text-xs text-[#9094A6] font-bold">
              {post.readTime}
            </span>
            <span className="text-xs text-[#9094A6] font-bold">
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-[#1A1A2E] leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-[#555770] leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        <div className="card p-8 md:p-12 prose-content">
          {post.content.split("\n\n").map((para, idx) => {
            if (para.startsWith("## ")) {
              return (
                <h2
                  key={idx}
                  className="text-2xl font-extrabold text-[#1A1A2E] mt-8 mb-3 first:mt-0"
                >
                  {renderInline(para.replace("## ", ""))}
                </h2>
              );
            }
            if (para.startsWith("# ")) {
              return (
                <h1
                  key={idx}
                  className="text-3xl font-black text-[#1A1A2E] mt-8 mb-4"
                >
                  {renderInline(para.replace("# ", ""))}
                </h1>
              );
            }
            if (para.trim() === "---") {
              return <hr key={idx} className="my-8 border-[#EEEFF3]" />;
            }
            if (para.match(/^\d+\.\s/)) {
              const items = para.split("\n").filter((l) => l.trim());
              return (
                <ol
                  key={idx}
                  className="list-decimal list-inside space-y-2 text-[#555770] leading-relaxed mb-4 ml-2"
                >
                  {items.map((item, i) => (
                    <li key={i}>{renderInline(item.replace(/^\d+\.\s/, ""))}</li>
                  ))}
                </ol>
              );
            }
            if (para.startsWith("- ")) {
              const items = para.split("\n").filter((l) => l.trim());
              return (
                <ul
                  key={idx}
                  className="list-disc list-inside space-y-2 text-[#555770] leading-relaxed mb-4 ml-2"
                >
                  {items.map((item, i) => (
                    <li key={i}>{renderInline(item.replace(/^- /, ""))}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={idx}
                className="text-[#1A1A2E] leading-relaxed mb-5 text-lg"
              >
                {renderInline(para)}
              </p>
            );
          })}
        </div>

        <div className="mt-12 card p-8 text-center">
          <h3 className="text-2xl font-black text-[#1A1A2E] mb-2">
            Want to put these to use?
          </h3>
          <p className="text-[#555770] mb-6">
            Play a quick match and try slipping new words into your gameplay.
          </p>
          <Link href="/play" className="btn-primary">
            <span>🎮</span> Try Quick Play
          </Link>
        </div>
      </div>
    </article>
  );
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const m = match[0];
    if (m.startsWith("**")) {
      parts.push(
        <strong key={key++} className="font-extrabold text-[#1A1A2E]">
          {m.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <em key={key++} className="italic text-[#555770]">
          {m.slice(1, -1)}
        </em>
      );
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <>{parts}</>;
}
