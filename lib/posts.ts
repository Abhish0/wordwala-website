export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  emoji: string;
  color: string;
  content: string;
};

export const posts: BlogPost[] = [
  {
    slug: "10-words-that-instantly-make-you-sound-smarter",
    title: "10 words that instantly make you sound smarter",
    excerpt:
      "Whether you're prepping for an exam, an interview, or just want to flex your vocabulary at the dinner table — these 10 words will earn you instant respect.",
    date: "2026-05-20",
    readTime: "5 min read",
    category: "Vocabulary",
    emoji: "✨",
    color: "#FFB300",
    content: `Want to upgrade your vocabulary without spending hours with a dictionary? Here are 10 words that hit hard, sound smart, and are easy to slip into everyday conversation.

## 1. **Ubiquitous** (yoo-BIK-wi-tus)
*Meaning:* Present everywhere.
*Example:* "Smartphones have become ubiquitous in classrooms."

## 2. **Ephemeral** (eh-FEM-er-uhl)
*Meaning:* Lasting for a very short time.
*Example:* "The beauty of cherry blossoms is ephemeral."

## 3. **Pragmatic** (prag-MAT-ik)
*Meaning:* Dealing with things practically rather than theoretically.
*Example:* "She took a pragmatic approach to the problem."

## 4. **Quintessential** (kwin-tuh-SEN-shul)
*Meaning:* Representing the most perfect example.
*Example:* "Word Wala is the quintessential word game for friends."

## 5. **Serendipity** (ser-en-DIP-i-tee)
*Meaning:* A pleasant surprise; finding something good without looking for it.
*Example:* "Meeting my best friend was pure serendipity."

## 6. **Eloquent** (EL-uh-kwent)
*Meaning:* Fluent and persuasive in speech or writing.
*Example:* "Her eloquent speech moved the audience."

## 7. **Resilient** (ri-ZIL-yent)
*Meaning:* Able to recover quickly from difficulties.
*Example:* "Resilient students always bounce back from a bad grade."

## 8. **Ambiguous** (am-BIG-yoo-us)
*Meaning:* Open to more than one interpretation.
*Example:* "The instructions were ambiguous, so we asked for clarification."

## 9. **Astute** (uh-STOOT)
*Meaning:* Showing sharp judgment.
*Example:* "An astute observation saved the team hours of work."

## 10. **Indelible** (in-DEL-i-bul)
*Meaning:* Unable to be removed or forgotten.
*Example:* "She made an indelible impression on everyone."

---

**Pro tip:** Try using one new word every day in real conversation. By the end of the month, you'll have 30 new words permanently stuck in your brain — much better than memorizing lists.

Want to practice these in a game? Try **Word Wala's Quick Play** and see how many you can sneak into a match.`,
  },
  {
    slug: "why-playing-word-games-with-friends-makes-you-smarter",
    title: "Why playing word games with friends makes you smarter",
    excerpt:
      "Science says: social word games beat solo flashcards every time. Here's why your brain learns better when you're trying to beat your best friend.",
    date: "2026-05-15",
    readTime: "4 min read",
    category: "Learning",
    emoji: "🧠",
    color: "#6C63FF",
    content: `If you've ever wondered why word games like Word Wala are so addictive — there's actual science behind it. And it's not just about fun.

## Your brain loves competition

When you compete with friends, your brain releases dopamine — the same chemical that makes social media so addictive. Except instead of doom-scrolling, you're actually learning new words.

## The "active recall" effect

Studying vocabulary lists is passive. Playing a word game is **active recall** — your brain has to dig out a word, evaluate if it's valid, and decide where to place it. Active recall is proven to strengthen memory 3–4x more than passive reading.

## Social learning beats solo learning

Studies from Stanford show that students who learn vocabulary in social contexts retain words **27% longer** than those who study alone. Why?

1. **Emotional anchoring** — You remember the word your friend used to beat you.
2. **Repetition through conversation** — You see words used in different contexts.
3. **Healthy stakes** — Wanting to win sharpens focus.

## What this means for students

If you're preparing for English exams, board exams, or competitive tests:

- Don't just read vocabulary lists.
- Play word games with classmates for 15 minutes a day.
- You'll retain 2–3x more words with half the effort.

## Real talk

We didn't build Word Wala just because word games are fun (though they are). We built it because we believe playing with friends is the most effective way to learn — and the most enjoyable.

Grab three friends, fire up a match, and see who reigns supreme.`,
  },
  {
    slug: "5-board-exam-vocabulary-words-you-need-to-know",
    title: "5 board exam vocabulary words you need to know",
    excerpt:
      "Class 10 and 12 board exams are full of tricky vocabulary. Here are 5 words that show up year after year — and how to remember them for life.",
    date: "2026-05-10",
    readTime: "3 min read",
    category: "Exam Prep",
    emoji: "📚",
    color: "#00C9A7",
    content: `Indian board exams (CBSE, ICSE, state boards) love testing vocabulary in reading comprehension and writing sections. Master these 5 words and you'll spot them on your next paper.

## 1. **Perseverance** (per-suh-VEER-ans)
*Meaning:* Persistence in doing something despite difficulty.
*Why it matters:* Common in essay prompts about success, failure, and life lessons.

## 2. **Diligent** (DIL-i-jent)
*Meaning:* Having or showing care and effort in work.
*Why it matters:* Frequently appears in passages about students, workers, and historical figures.

## 3. **Procrastination** (pro-kras-ti-NAY-shun)
*Meaning:* The action of delaying or postponing something.
*Why it matters:* Often used as an essay topic. Bonus: most students know what it means *because they live it*.

## 4. **Empathy** (EM-puh-thee)
*Meaning:* The ability to understand and share the feelings of another.
*Why it matters:* Modern board exams emphasize values; this word shows up in character analysis questions.

## 5. **Aspiration** (as-pi-RAY-shun)
*Meaning:* A hope or ambition of achieving something.
*Why it matters:* Common in essays about career, goals, and personal development.

---

## How to remember them forever

Reading the definitions once won't cut it. Here's what actually works:

1. **Use each word in a sentence about your own life today.**
2. **Tell a friend a story using all 5 words.**
3. **Play a vocabulary game with these words in mind.**

The more times you produce a word (write, say, type), the deeper it gets etched into your memory.

Good luck with your boards — you've got this. 🚀`,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
