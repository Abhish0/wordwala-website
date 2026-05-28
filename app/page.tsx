import Link from "next/link";
import HeroGrid from "@/components/HeroGrid";
import LearnShowcase from "@/components/LearnShowcase";
import StealShowcase from "@/components/StealShowcase";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#DDDDE8] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#00C9A7] animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#555770]">
                  Now in Play Store Review
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight text-[#1A1A2E] mb-6">
                Build words.
                <br />
                Learn <span className="gradient-text">meanings.</span>
              </h1>

              <p className="text-lg md:text-xl text-[#555770] mb-8 max-w-xl leading-relaxed">
                The word game that teaches you something every turn. Every word
                you score reveals its meaning — so you build vocabulary while
                you play.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/play" className="btn-primary text-base">
                  <span>🎮</span> Play Now (Free)
                </Link>
                <a href="#download" className="btn-secondary text-base">
                  <span>📱</span> Get the App
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-10 text-sm text-[#555770]">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFB300] text-lg">★★★★★</span>
                  <span className="font-bold">Loved by students</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00C9A7]">📖</span>
                  <span className="font-bold">125K+ words</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🇮🇳</span>
                  <span className="font-bold">Made in India</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <HeroGrid />
            </div>
          </div>
        </div>
      </section>

      {/* LEARN — primary USP */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#6C63FF] mb-3">
              Why Word Wala is different
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-4">
              Every word teaches you <span className="gradient-text">something.</span>
            </h2>
            <p className="text-lg text-[#555770]">
              Most word games end at the win screen. Word Wala starts there —
              every word you score comes with its meaning, pronunciation, and
              examples. Build vocabulary the fun way.
            </p>
          </div>
          <LearnShowcase />
        </div>
      </section>

      {/* THREE WAYS TO PLAY */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#6C63FF] mb-3">
              Three ways to play
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-4">
              Solo, friends, or anywhere.
            </h2>
            <p className="text-lg text-[#555770] max-w-2xl mx-auto">
              Whether you&apos;re practicing solo or battling friends, Word Wala
              keeps every match fresh.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              emoji="👥"
              color="#FF5E5B"
              title="Pass & Play"
              description="2–4 players, one device. Pass it around and watch the trash talk begin."
            />
            <FeatureCard
              emoji="🌐"
              color="#00C2CC"
              title="Online Mode"
              description="Challenge friends across the country. Real-time multiplayer matches."
            />
            <FeatureCard
              emoji="🤖"
              color="#9B59B6"
              title="AI Opponent"
              description="No friends around? Sharpen your vocabulary against our smart AI."
            />
          </div>
        </div>
      </section>

      {/* STEAL MECHANIC — secondary differentiator */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StealShowcase />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-extrabold uppercase tracking-widest text-[#6C63FF] mb-3">
              How it works
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-[#1A1A2E] mb-4">
              Easy to learn. Hard to put down.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Step
              number="1"
              title="Place a letter"
              description="Tap a cell on the shared grid. Drop in one letter from your keyboard."
              color="#FF6B6B"
            />
            <Step
              number="2"
              title="Trace a word"
              description="Swipe across connecting letters to form a valid word. Longer = more points."
              color="#FFB300"
            />
            <Step
              number="3"
              title="Learn its meaning"
              description="Every word you claim is saved with its definition, phonetic, and example."
              color="#00C9A7"
            />
            <Step
              number="4"
              title="Beat the high score"
              description="First to 50, 75, or 100 points wins. Watch your personal dictionary grow."
              color="#6C63FF"
            />
          </div>
        </div>
      </section>

      {/* STATS — real numbers from the app */}
      <section className="py-16 bg-gradient-to-br from-[#6C63FF] to-[#9B8EFF] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <Stat value="125K+" label="Words with meanings" />
            <Stat value="4" label="Players on one device" />
            <Stat value="3" label="Game modes" />
            <Stat value="∞" label="Words to discover" />
          </div>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section id="download" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card p-10 md:p-14 text-center">
            <div className="text-6xl mb-4 float">🐼</div>
            <h2 className="text-3xl md:text-5xl font-black text-[#1A1A2E] mb-4">
              Be among the first to play.
            </h2>
            <p className="text-lg text-[#555770] mb-8 max-w-xl mx-auto">
              Word Wala is launching on Google Play soon. Try a quick game right
              here in your browser — and join the launch list to be notified
              the moment it&apos;s live.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/play" className="btn-primary text-base">
                <span>🎮</span> Try Quick Play
              </Link>
              <a
                href="mailto:abhipic2025@gmail.com?subject=Notify%20me%20at%20Word%20Wala%20launch&body=Hi%2C%20please%20add%20me%20to%20the%20Word%20Wala%20launch%20list!"
                className="btn-secondary text-base"
              >
                <span>🔔</span> Notify Me at Launch
              </a>
            </div>
            <p className="text-xs text-[#9094A6] mt-6">
              Follow daily &ldquo;word of the day&rdquo; drops on Instagram{" "}
              <span className="font-bold text-[#6C63FF]">@WordWalaApp</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  emoji,
  color,
  title,
  description,
}: {
  emoji: string;
  color: string;
  title: string;
  description: string;
}) {
  return (
    <div className="card p-8">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5"
        style={{ backgroundColor: `${color}20` }}
      >
        {emoji}
      </div>
      <h3 className="text-xl font-extrabold text-[#1A1A2E] mb-2">{title}</h3>
      <p className="text-[#555770] leading-relaxed">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  color,
}: {
  number: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="relative">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-4"
        style={{ backgroundColor: color }}
      >
        {number}
      </div>
      <h3 className="text-xl font-extrabold text-[#1A1A2E] mb-2">{title}</h3>
      <p className="text-[#555770] leading-relaxed">{description}</p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl md:text-5xl font-black mb-1">{value}</div>
      <div className="text-sm font-bold opacity-90 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
