import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white/60 border-t border-[#EEEFF3] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <span className="text-3xl">🐼</span>
              <span className="text-xl font-extrabold gradient-text">Word Wala</span>
            </Link>
            <p className="text-sm text-[#555770] max-w-xs leading-relaxed">
              Build words. Beat friends. The ultimate multiplayer word game for friends, family, and students.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A2E] mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-[#555770]">
              <li><Link href="/features" className="hover:text-[#6C63FF]">Features</Link></li>
              <li><Link href="/play" className="hover:text-[#6C63FF]">Quick Play</Link></li>
              <li><Link href="/blog" className="hover:text-[#6C63FF]">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A2E] mb-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-[#555770]">
              <li><Link href="/about" className="hover:text-[#6C63FF]">About</Link></li>
              <li><Link href="/contact" className="hover:text-[#6C63FF]">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#6C63FF]">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#EEEFF3] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#9094A6]">
            © {new Date().getFullYear()} Word Wala. All rights reserved.
          </p>
          <p className="text-xs text-[#9094A6]">
            Made with 💜 in India
          </p>
        </div>
      </div>
    </footer>
  );
}
