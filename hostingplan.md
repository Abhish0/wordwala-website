# Word Wala Launch Plan — Host, Convert, Promote

## Context

The Word Wala mobile app is in Play Store review. The marketing site (`wordwala-website/`) is built locally, matches the app's design tokens (Nunito font, `#6C63FF` primary, panda mascot), and has working pages for Home, Features, Quick Play, Blog, About, and Contact. Three things are needed before launch:

1. **Host the site at wordwala.in** (the user's owned domain)
2. **Sharpen the messaging** so the website's strongest, currently-underused angles convert visitors → Play Store installs
3. **A marketing strategy framework** to drive zero-budget traffic to wordwala.in → Play Store

Per the user's selections: **only Part B (website content refinement) will be executed**. Parts A and C are written guides the user will follow themselves. Repo will be **private**. Marketing is a **strategy framework**, not a dated calendar.

---

## Part A — Host wordwala.in (Written Guide)

### Step 1: Push to GitHub (private repo)
1. Create account / sign in at github.com
2. Create new **private** repo named `wordwala-website` (no README, no .gitignore — code already has them)
3. From `c:\Users\hp\OneDrive\Desktop\wordwala-website`:
   ```
   git add .
   git commit -m "Initial Word Wala website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/wordwala-website.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel
1. Sign up at vercel.com using "Continue with GitHub"
2. Grant access to the private `wordwala-website` repo
3. Click **Import** → leave all defaults (Vercel auto-detects Next.js)
4. Click **Deploy** — first build takes ~2 min
5. You'll get a `wordwala-website-xxx.vercel.app` URL — this is your staging URL

### Step 3: Connect wordwala.in
1. In Vercel: Project → **Settings** → **Domains** → Add `wordwala.in` and `www.wordwala.in`
2. Vercel will show DNS records to add. Typical for a .in domain registrar (GoDaddy / Hostinger / Namecheap):
   - **A record** for apex (`@`) → `76.76.21.21`
   - **CNAME** for `www` → `cname.vercel-dns.com`
3. Log into your domain registrar's DNS panel, add those records
4. Wait 5 min – 24 hours for propagation (usually under an hour for .in)
5. Vercel auto-provisions a Let's Encrypt SSL cert once DNS resolves

### Why Vercel (vs alternatives)
- **Free forever** for personal projects (100 GB bandwidth/mo — plenty for launch)
- **Auto-deploys on every git push** to main
- **Edge CDN with India POPs** — fast loading for target audience
- **Made by the Next.js team** — zero config needed

### Future maintenance
- Every `git push` to main = auto-deploy
- For drafts: push to a branch → Vercel auto-creates a preview URL you can share

---

## Part B — Website Content Refinement (Execute)

### What's missing today
Based on the app audit, three of the app's strongest selling points are **absent or buried** on the current website:

1. **The "steal" mechanic** — players can complete words their opponent started. This is the single biggest differentiator vs Wordle/Scrabble/Words With Friends. Currently not mentioned anywhere on the site.
2. **No ads. No signup. No tracking.** — rare in the word game space. A trust-signal anti-feature pitch that should be visible on the homepage.
3. **Instant definitions** — every claimed word shows a meaning. Already wired into `/play` via the new `WordMeaningCard`. Huge for the student/parent audience but invisible on landing.

### Specific edits to make

**B1. Hero section — [app/page.tsx](app/page.tsx)**
- Keep tagline `Build words. Beat friends.` (it's the app's actual tagline)
- Add a stronger sub-hook beneath: *"The only word game where you can **steal** your opponent's words. Free. Offline. No ads."*
- Add a small trust strip below CTAs: `100% free · No ads · No signup · Works offline`

**B2. New "Steal" section — [app/page.tsx](app/page.tsx)**
- Insert a new section between the hero and "Three ways to play"
- Two-column layout: left = headline + explanation ("Watch them spell C-A. Drop a T. The word is yours."), right = a small animated grid visual (extend [components/HeroGrid.tsx](components/HeroGrid.tsx) to show a steal moment)

**B3. New "Learn while you play" section — [app/page.tsx](app/page.tsx)**
- After the "How it works" section
- Show the definition card UI (reuse the existing [components/WordMeaningCard.tsx](components/WordMeaningCard.tsx) styling)
- Copy: *"Every word you score comes with its meaning. Build vocabulary the fun way."*
- Target: parents looking for educational screen time

**B4. Stats section refresh — [app/page.tsx](app/page.tsx)**
- Replace the placeholder stats with real numbers from the app audit:
  - `125,449` words validated
  - `4` players on one device
  - `3` grid sizes (6 / 8 / 10)
  - `3` AI difficulties + 3 timer modes

**B5. Features page reordering — [app/features/page.tsx](app/features/page.tsx)**
- Move the three unique angles to the top: Steal Mechanic, No Ads/Free, Instant Definitions
- Add two new feature cards:
  - **Steal opponents' words** — *"Complete a word your opponent started. Tactical tension every turn."*
  - **No ads, no signup** — *"100% free. No popups. No tracking. Just play."*
- The instant-definitions card can replace the generic "Personal Dictionary" card

**B6. Download CTA strengthening — [app/page.tsx](app/page.tsx)**
- Current state: disabled "Coming to Play Store" button
- Replace with **email capture** for launch notification (mailto for now, swap to a form service post-launch)
- Add urgency: *"Be among the first 100 to play."*

**B7. Hero grid micro-update — [components/HeroGrid.tsx](components/HeroGrid.tsx)**
- The current grid shows `WORD` highlighted in amber. Update the animation to cycle between two states: opponent builds `CA` (in their color), you swoop in with `T` (in yours), then the full `CAT` highlights in yours. Visually demonstrates the steal.

### What NOT to change
- Design tokens (colors, fonts, radii) — they match the app
- Page routing / structure (Home, Features, Play, Blog, About, Contact) — already correct
- Quick Play game (`/play`) — recently overhauled and matches app's AI Easy mode

---

## Part C — Marketing Strategy Framework (Written Guide)

### Core positioning
**"The only word game where you can steal your opponent's words. Free, offline, no ads."**

This positioning has three claims that survive scrutiny: a unique mechanic, a price differentiator, and an anti-pattern (no ads) that builds trust.

### Three audience segments → three hooks → three channels

| Segment | Hook | Best channel |
|---|---|---|
| Casual word-game fans (Wordle, Scrabble) | "The twist: a steal mechanic" | Reddit (r/wordgames, r/india), Twitter |
| Parents of school-age students | "Word game that teaches vocabulary with definitions" | Facebook parent groups, WhatsApp |
| Friend groups & families | "Pass-and-play on one phone, no internet needed" | Instagram Reels, college networks |

### Content pillars (pick 2-3, post consistently)

1. **Word of the Day** — daily Instagram + WhatsApp channel post. Word, meaning, Hindi translation, example. Low effort, high consistency.
2. **Gameplay clips** — 15–30 second Reels showing tense moments. Lean into "the steal" — that's the hook.
3. **Educational shorts** — "5 vocabulary words for Class 10 exam," "Roots that unlock 50 words."
4. **Community challenges** — Once installed: weekly "highest score" challenges via WhatsApp/Instagram, feature winners.

### Channels in priority order (zero budget, India focus)

1. **WhatsApp groups & WhatsApp Channel** — highest conversion in India. Pre-launch: identify 10+ parent, alumni, exam-prep groups. Personally share, don't spam.
2. **Instagram Reels + Stories** — visual gameplay clips. Start with 3 reels in week 1.
3. **Facebook groups** — Indian gaming, parenting in India, board exam prep, regional language groups.
4. **Reddit** — r/india, r/IndianTeachers, r/wordgames, r/languagelearning. Post honestly: "I built a word game with a steal mechanic — would love feedback."
5. **Teacher outreach** — direct DM to school teachers on Instagram/LinkedIn. One teacher recommending the app in a school group = ~30 installs. Highest ROI free channel.
6. **Product Hunt** — once out of review, launch on a Tuesday/Wednesday. Schedule via PH.

### Launch week sequence (5-day arc)

1. **Day 0 (launch day):** Post on all personal socials. Message your top 30 contacts directly. Share in 10+ pre-selected groups. Email blast to anyone who signed up at wordwala.in.
2. **Day 1:** Reach out to 5 micro-influencers (5K–50K) in education/word-game niche. Offer free feature exchange.
3. **Day 2:** Post first "watch me play" Reel showing a steal. Pin to profile.
4. **Day 3:** Begin "word of the day" daily cadence (don't break it for 30 days).
5. **Day 7:** Email the first 100 users asking for a Play Store review. Reviews compound — first 50 are the hardest.

### Metrics to track (weekly)

- **Play Store installs** — daily count (Play Console)
- **Average rating** — target 4.3+ by week 4
- **wordwala.in → Play Store CTR** — need analytics added (Plausible or Vercel Analytics, both free)
- **Top traffic sources** — to double down on what works
- **WhatsApp Channel subscribers** — proxy for engaged audience

### Anti-patterns to avoid

- **Don't post in unrelated groups** — getting banned is worse than no post
- **Don't run paid ads in week 1** — organic posts tell you what messaging works for free
- **Don't ignore bad reviews** — reply professionally, fix what's broken, ask satisfied users to review back
- **Don't change positioning every week** — pick "the steal mechanic" angle and ride it for 60 days minimum

---

## Verification

### After Part B execution (website content)
- Run `npm run build` in `wordwala-website/` — must succeed with no errors
- Visit `http://localhost:3000` — verify hero shows the new "steal" sub-hook + trust strip
- Visit `http://localhost:3000/features` — verify the three unique features are in the first row
- Quick Play (`/play`) — confirm definition cards still work (no regressions)

### After Part A deploy
- Visit `https://wordwala.in` — should load over HTTPS
- Lighthouse audit (Chrome DevTools) — target 90+ Performance, 100 SEO
- Test on mobile (phone or DevTools mobile emulator) — most traffic will be mobile

### After launch week (Part C kickoff)
- Check Play Console daily for install spikes — correlate with channel posts
- If installs < 50 in week 1, the messaging needs sharpening — return to Part B and revise

---

## Files that will be touched in Part B

- [app/page.tsx](app/page.tsx) — hero, new sections, stats, CTA
- [app/features/page.tsx](app/features/page.tsx) — reorder + add 2 cards
- [components/HeroGrid.tsx](components/HeroGrid.tsx) — animate the steal moment

No new pages, no design system changes, no dependency additions.
