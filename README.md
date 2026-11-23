# A Little Sorry, My Pakhi ❤️

> A heartfelt, interactive apology — Yousuf to Samiya, his dear sweetheart pakhi.

An animated, story-driven web experience told like a storybook: a lantern-lit
still life of a hand-wrapped bouquet and a wax-sealed letter, an apology bouquet of eight
hand-drawn flowers hiding eight handwritten apologies, and one final sincere promise.

Built to feel personal — not like a template.

## The Story

| Scene | What happens |
| --- | --- |
| **01 — The Opening** | The storybook cover: a lantern-lit storybook illustration of a rose bouquet, a heart-wax-sealed letter and a fountain pen, floated in a hand-inked polaroid frame with a corner ribbon. Words rise in one by one; sun rays and petals drift. |
| **02 — A Letter From My Heart** | A wax-sealed envelope floats before you on warm storybook paper. Tap the seal — the letter slides out, complete and word-for-word, stamped and postmarked with love. |
| **03 — The Apology Bouquet** | A storybook morning over rolling sage hills. A kraft-wrapped bouquet, hand-drawn in SVG, holding eight interactive blooms (pink rose, red rose, white rose, tulip, lavender, cherry blossom, sunflower, heart flower), each hiding a heartfelt Banglish note. Open all 8 to unlock what comes next. |
| **04 — One Last Thing** | A storybook golden-hour garden — the eight flowers fly together and bloom into a heart. One final message from Yousuf. |
| **05 — The Final Page** | A storybook moonlit garden — two figures beneath a rose arch and a giant full moon. “Sorry, My Dear Sweetheart Pakhi. ❤️” + **Read My Letter Again** (never resets the journey, never restarts the music). |

## Tech Stack

- **React 18 + Vite + TypeScript** — strict mode, zero console errors
- **Tailwind CSS** — design tokens (blush pink, ivory, deep rose, champagne gold)
- **Framer Motion** — cinematic scene transitions, the envelope opening, heart formation
- **Lucide React** — icons
- **Hand-drawn SVG illustration** — the kraft-wrapped bouquet, the eight interactive flowers, the rose-woven heart and the hand-inked ornamental frames
- **AI-painted storybook illustrations** — the opening still life, the golden-hour garden and the moonlit rose arch, all art-directed as one picture-book world
- **Web Audio API** — a generative, royalty-free romantic nocturne for piano & celesta (no audio files, no licenses to clear, endless variation)

## Music

The soundtrack is synthesized live in the browser — a tender A-minor nocturne at 66 bpm
(Am(add9) – Fmaj7 – Cmaj7 – G6 – Am7 – Fmaj7 – Bm7♭5 – E7): breathing detuned-triangle
pads, a soft bass with walking approach notes, a lightly swung music-box arpeggio, a
singing melody with late-blooming vibrato and appoggiaturas, a celesta that answers
between phrases on repeating loops, swell strings on the tension bars, and a 3.6-second
generated reverb. It starts automatically when
the browser allows it; if autoplay is blocked, an elegant *"Tap to hear the music"*
pill appears. The toggle lives in the top-right corner; the preference is remembered
for the visit. **Music never restarts between scenes.**

## Develop

```bash
npm install
npm run dev        # local dev server
npm test           # end-to-end journey smoke tests (vitest + jsdom)
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build on 0.0.0.0:4173
```

## Deploy

Static site — deploy `dist/` anywhere (Vercel auto-detects Vite: build `npm run build`, output `dist`).

## Accessibility & Quality

- Full keyboard support: visible gold focus rings, `Escape` closes notes, focus is trapped into dialogs and restored afterwards
- `prefers-reduced-motion` respected everywhere (the intro collapses straight to its final pose)
- Semantic landmarks, `aria-live` progress ("Flowers discovered: n/8"), labelled icon buttons
- Mobile-first; fluid type, `100svh` scenes, no horizontal overflow, 44px+ tap targets
- 100% of the letter and the eight flower notes are reproduced verbatim from the author's words

---

**Made with love by Yousuf, for Samiya.**
*A Little Sorry, My Pakhi — "I know I made mistakes. I am truly sorry. I value your feelings, and I want to become better."*
