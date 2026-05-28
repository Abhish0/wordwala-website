import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Word Wala",
  description: "Get in touch with the Word Wala team. We'd love to hear from you.",
};

export default function ContactPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-extrabold uppercase tracking-widest text-[#6C63FF] mb-3">
            Talk to us
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-[#1A1A2E] mb-4">
            Say <span className="gradient-text">hi.</span>
          </h1>
          <p className="text-lg text-[#555770]">
            Bug reports, feature ideas, partnership requests, or just a friendly
            wave — we read everything.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <ContactChannel
              emoji="📧"
              color="#6C63FF"
              title="Email"
              value="abhipic2025@gmail.com"
              href="mailto:abhipic2025@gmail.com"
            />
            <ContactChannel
              emoji="📸"
              color="#FF6FAD"
              title="Instagram"
              value="@WordWalaApp"
              href="https://instagram.com/wordwalaapp"
            />
            <ContactChannel
              emoji="🐦"
              color="#5B9AF5"
              title="Twitter / X"
              value="@WordWalaApp"
              href="https://twitter.com/wordwalaapp"
            />
            <ContactChannel
              emoji="📍"
              color="#00C9A7"
              title="Based in"
              value="India"
            />
          </div>

          <div className="lg:col-span-3">
            <div className="card p-8">
              <h2 className="text-2xl font-extrabold text-[#1A1A2E] mb-2">
                Send a message
              </h2>
              <p className="text-sm text-[#555770] mb-6">
                We typically reply within 1–2 business days.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactChannel({
  emoji,
  color,
  title,
  value,
  href,
}: {
  emoji: string;
  color: string;
  title: string;
  value: string;
  href?: string;
}) {
  const Wrap = href ? "a" : "div";
  const wrapProps = href
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer" }
    : {};

  return (
    <Wrap
      {...wrapProps}
      className="card p-5 flex items-center gap-4 block"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
        style={{ backgroundColor: `${color}20` }}
      >
        {emoji}
      </div>
      <div>
        <div className="text-xs font-extrabold uppercase tracking-widest text-[#9094A6]">
          {title}
        </div>
        <div className="text-base font-bold text-[#1A1A2E]">{value}</div>
      </div>
    </Wrap>
  );
}
