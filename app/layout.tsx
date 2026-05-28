import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Word Wala — Build words. Beat friends.",
  description:
    "The ultimate multiplayer word game. Take turns placing letters on a shared grid. Trace a word to score points. Play with friends or AI.",
  keywords: [
    "word game",
    "multiplayer word game",
    "vocabulary game",
    "word puzzle",
    "Word Wala",
    "spelling game",
    "word builder",
    "educational game",
    "word game for students",
  ],
  authors: [{ name: "Word Wala" }],
  openGraph: {
    title: "Word Wala — Build words. Beat friends.",
    description: "The ultimate multiplayer word game for friends, family, and students.",
    url: "https://wordwala.in",
    siteName: "Word Wala",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Word Wala — Build words. Beat friends.",
    description: "The ultimate multiplayer word game.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
