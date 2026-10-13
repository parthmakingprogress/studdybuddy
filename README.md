*This is a submission for the [Hacktoberfest Weekend Challenge: Build for a Friend](https://dev.to/challenges/hacktoberfest-weekend-2026-10-01)*

# Komorebi: A Calm, Handcrafted Study Buddy for My Friend

## What I Built

I built **Komorebi** for my close friend Maya, who is currently studying for rigorous medical board exams. 

Every study app Maya tried had the same exhausting problems:
1. **The "AI Slop" Trap**: Blinding neon-purple gradients, generic "AI-powered" buzzwords, bloated subscription tiers, and robotic "chatbot" popups that created more digital noise than focus.
2. **Fragmented Workflows**: She had to keep one tab open for a Pomodoro timer, another tab for Anki flashcards, and a third for practice tests.
3. **Over-gamification**: Excessive push notifications, fake streak penalties, and distracting animations that pulled her out of deep work rather than anchoring her in it.

Maya told me: *"I just want something that feels like an intentional paper notebook and a quiet desk companion—something simple that respects my attention, lets me set my own intervals, and helps me practice active recall without all the AI noise."*

**Komorebi** is the answer to that plea. It is a lightweight, 100% offline-ready, distraction-free study companion featuring:
- **Tactile Pomodoro Blocks**: Customizable Focus, Short Rest, and Long Rest intervals with an active objective tracker and smooth circular progress dials.
- **3D Spaced-Repetition Flashcards**: Flip cards in 3D (with keyboard shortcuts), rate recall difficulty (`Again`, `Hard`, `Good`, `Easy`), and create/edit decks seamlessly.
- **Interactive Quiz Lab**: Practice with built-in tests, or generate 4-option multiple choice quizzes directly from flashcard decks with a single click.
- **Handcrafted Desk Companions**: Choose between cozy, animated SVG companions (**Mochi the Cat**, **Hoot the Owl**, **Sprout the Plant**, or **Pippin the Dog**) that breathe, blink, and offer gentle human reminders.
- **Zero Asset Dependencies / Local Audio Synthesizer**: Uses the native Web Audio API to synthesize a Tibetan singing bowl bell on session completion, subtle tactile wood clicks, and focus soundscapes (rain, cozy library hum, deep warm noise).
- **100% Customizable & Private**: All timers, card decks, quizzes, and themes (*Warm Paper*, *Dark Inkwell*, *Matcha Green*, and *Terracotta*) are stored locally in the browser with full JSON export and import support.

---

## Demo

- **Local Development Server**: Running on `http://localhost:3000`
- **Zero Build Setup Required**: Open `index.html` in any modern web browser or run `python -m http.server 3000`.

### Core Experience Walkthrough
1. **Focus Session**: Set your goal (e.g. *"Chapter 4: Renal Physiology"*), click **Begin Session**, and study alongside Mochi the Cat with an ambient rain soundscape playing softly in the background.
2. **Flashcard Review**: Switch to the **Flashcards** tab, flip cards with the spacebar, rate your recall confidence, or create a brand new custom deck with custom color tags.
3. **Self-Testing (Active Recall)**: Convert your deck into an interactive multiple-choice test in the **Quiz Lab** or construct custom exam questions with detailed explanations.
4. **Customization**: Open **Settings** to adjust focus lengths, switch between Warm Paper and Dark Inkwell themes, or swap companions.

---

## Code

{% github https://github.com/parthmakingprogress/studdybuddy %}

- **GitHub Repository**: [https://github.com/parthmakingprogress/studdybuddy](https://github.com/parthmakingprogress/studdybuddy)
- **Source Code (Main Branch)**: [https://github.com/parthmakingprogress/studdybuddy/tree/main](https://github.com/parthmakingprogress/studdybuddy/tree/main)

The project is structured with clean, semantic web standards (HTML5, Vanilla CSS3, Modern ES6+ JavaScript), zero `node_modules` bloat, and full offline resilience:

- **Repository Files**:
  - [`index.html`](https://github.com/parthmakingprogress/studdybuddy/blob/main/index.html): Semantic layout, accessible ARIA roles, SVG icons, and modal dialogs.
  - [`style.css`](https://github.com/parthmakingprogress/studdybuddy/blob/main/style.css): Bespoke paper-and-ink design system, 3D card flipping transforms, responsive grids, and CSS variable color themes.
  - [`app.js`](https://github.com/parthmakingprogress/studdybuddy/blob/main/app.js): Modular state management, Web Audio API synthesizer, Pomodoro state machine, flashcard queue, quiz engine, and `localStorage` persistence.

### Key Architecture Highlights
```javascript
// Native Web Audio API Singing Bowl Synthesizer (No MP3 download lag or broken links)
const AudioEngine = {
  playBowlBell() {
    if (!App.settings.soundEnabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const freqs = [432, 864, 1296]; // Harmonic partials
    const gains = [0.35, 0.15, 0.08];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(gains[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 3.6);
    });
  }
};
```

---

## How I Built It

Komorebi was crafted through an agentic pair-programming workflow:
- **Human-Centered Aesthetic Direction**: We deliberately discarded modern "AI SaaS" tropes (dark purple glows, hollow drop shadows, generic chatbot frames) and replaced them with an editorial design inspired by Midori notebooks, warm cream parchment, and Japanese stationery.
- **Native Browser Capabilities**: Instead of bundling heavy third-party audio libraries or CSS frameworks, we engineered the entire soundscape engine with `AudioContext` nodes and built the design system with CSS custom properties.
- **Fast Iterative Design**: From initial concept to full modular implementation—including the Pomodoro engine, 3D CSS transforms, the deck-to-quiz generator, and local storage backup—the system was built, verified, and tuned iteratively.

---

## Why Does Open Innovation Matter?

Open innovation is what preserves **human agency** and **software longevity**:

1. **Digital Sovereignty & Privacy**: A student's study habits, exam stress, and learning notes belong strictly to them. Closed SaaS study tools often lock flashcards behind subscription paywalls or track usage metrics for advertising. Komorebi stores 100% of data in the student's browser with open JSON export formats.
2. **Durability & Zero-Dependency Longevity**: Closed web applications break the moment an API deprecates, a credit card lapses, or a startup pivots. Because Komorebi runs on timeless open web standards (HTML, CSS, JS, Web Audio), it will work 20 years from now exactly as it does today.
3. **Accessibility**: Open source enables students from anywhere in the world—even with spotty internet connections or older computers—to run a study tool that costs nothing and demands no login.

---

## My Agent Session

This application was developed in a collaborative agent session that handled:
1. Translating Maya's real-world study pain points into a cohesive functional specification.
2. Formulating a paper-and-ink visual identity (Newsreader typography, warm ivory surfaces, tactile button feedback).
3. Implementing the Pomodoro timer engine with audio feedback.
4. Writing the 3D flashcard spaced-repetition logic and smart 1-click quiz converter.
5. Verifying local storage synchronization, responsive breakpoints, and local HTTP server health.

---

## Prize Categories

- **Best Project Built for a Friend**
- **Most Thoughtful / Human-Centered UX**
- **Best Use of Open Web Standards & Local-First Software**
