import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hand, Check, ChevronRight, Flower2 } from 'lucide-react';
import { FLOWERS, TOTAL_FLOWERS, type FlowerDef } from '../data/flowers';
import FlowerSvg from '../components/flowers/FlowerSvg';
import BouquetArt from '../components/flowers/BouquetArt';
import ChapterTag from '../components/ChapterTag';
import NoteModal from '../components/NoteModal';
import PetalField, { GlowDust } from '../components/ambient/PetalField';

interface GardenSceneProps {
  discovered: number[];
  onDiscover: (id: number) => void;
  onComplete: () => void;
}

export default function GardenScene({ discovered, onDiscover, onComplete }: GardenSceneProps) {
  const [openFlower, setOpenFlower] = useState<FlowerDef | null>(null);
  const allFound = discovered.length >= TOTAL_FLOWERS;

  const openNote = (flower: FlowerDef) => {
    setOpenFlower(flower);
    if (!discovered.includes(flower.id)) onDiscover(flower.id);
  };

  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      aria-label="The apology bouquet"
    >
      {/* ————— storybook morning backdrop ————— */}
      <div aria-hidden="true" className="storybook-backdrop absolute inset-0" />
      <div aria-hidden="true" className="storybook-rays pointer-events-none absolute inset-0 opacity-80" />
      {/* sun */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[-8%] top-[-14%] h-[46vmin] w-[46vmin] rounded-full bg-[radial-gradient(circle,#FFEFB0_0%,#F9D789_38%,rgba(249,215,137,0)_72%)]" />
      {/* storybook clouds */}
      <div aria-hidden="true" className="pointer-events-none absolute left-[6%] top-[9%] h-10 w-44 rounded-full bg-white/85 blur-md" />
      <div aria-hidden="true" className="pointer-events-none absolute left-[16%] top-[12.5%] h-8 w-28 rounded-full bg-white/75 blur-md" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[14%] top-[24%] h-9 w-36 rounded-full bg-white/70 blur-md" />
      {/* rolling hills */}
      <svg aria-hidden="true" viewBox="0 0 1440 240" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 h-[30vh] min-h-[150px] w-full">
        <path d="M0 132 C 140 78, 300 70, 470 118 C 640 168, 760 62, 960 92 C 1140 118, 1300 96, 1440 138 L1440 240 L0 240 Z" fill="#9DB98D" opacity={0.85} />
        <path d="M0 186 C 200 128, 430 138, 640 180 C 830 214, 1080 150, 1440 190 L1440 240 L0 240 Z" fill="#7FA08B" opacity={0.9} />
        <path d="M0 226 C 260 190, 520 206, 780 224 C 1010 238, 1230 210, 1440 226 L1440 240 L0 240 Z" fill="#55755F" opacity={0.95} />
      </svg>

      <PetalField count={14} seed={41} className="z-10" />
      <GlowDust count={16} seed={87} />

      {/* ————— heading ————— */}
      <header className="relative z-20 mx-auto flex w-full max-w-3xl flex-col items-center px-4 pt-[max(env(safe-area-inset-top),0.9rem)] text-center sm:pt-5">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <ChapterTag chapter="Chapter Three" title="Handpicked For You" tone="light" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-2 font-display text-[29px] font-bold leading-[1.15] text-[#46303B] sm:text-5xl"
          
        >
          A Bouquet Of <span className="italic text-[#B04A63]">Feelings</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-1 max-w-md font-cormorant text-[13.5px] font-semibold italic leading-snug text-[#5E4049] sm:text-[17px]"
          >
          Every flower in this bouquet holds something I wish I could tell you.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="sticker-sm mt-2 inline-flex items-center gap-2 px-4 py-1.5 font-sans text-[10.5px] font-bold text-[#46303B] sm:text-[11.5px]"
        >
          <Hand size={13} aria-hidden="true" className="text-[#B04A63]" />
          Tap each flower to discover what's hidden inside.
        </motion.div>

        {/* progress */}
        <div className="mt-2 flex items-center gap-3" aria-live="polite" aria-label={`Flowers discovered: ${discovered.length} of ${TOTAL_FLOWERS}`}>
          <span className="sticker-sm inline-flex items-center gap-1.5 px-3 py-1 font-sans text-[10.5px] font-bold tracking-wide text-[#46303B]">
            <Sparkles size={12} className="text-[#B04A63]" aria-hidden="true" />
            Flowers discovered: {discovered.length}/{TOTAL_FLOWERS}
          </span>
          <div className="hidden items-center gap-1 sm:flex" aria-hidden="true">
            {FLOWERS.map((f) => (
              <span
                key={f.id}
                className={`h-2 w-2 rounded-full transition-all duration-500 ${
                  discovered.includes(f.id) ? 'scale-110 bg-[#C85B79] shadow-[0_0_6px_rgba(200,91,121,0.55)]' : 'bg-[#46303B]/25'
                }`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* ————— the bouquet ————— */}
      <div className="relative z-10 min-h-[340px] flex-1 sm:min-h-[430px]">
        <div className="absolute inset-0 flex items-end justify-center pb-1 sm:items-center sm:pb-0">
          <div
            className="relative"
            style={{ height: '100%', maxHeight: '100%', aspectRatio: '500 / 620', maxWidth: '96vw' }}
          >
            {/* kraft-wrapped backdrop */}
            <BouquetArt className="absolute inset-0 h-full w-full drop-shadow-[0_26px_34px_rgba(0,0,0,0.55)]" />

            {/* the eight blooms */}
            {FLOWERS.map((flower) => {
              const found = discovered.includes(flower.id);
              return (
                <button
                  key={flower.id}
                  type="button"
                  onClick={() => openNote(flower)}
                  aria-label={`${found ? 'Read again' : 'Open'} the note hidden inside ${flower.name}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-2xl outline-none transition-transform duration-300 hover:z-40 hover:scale-[1.08] focus-visible:z-40"
                  style={{
                    left: `${flower.x}%`,
                    top: `${flower.y}%`,
                    width: `${flower.span}%`,
                    zIndex: 10 + Math.round(flower.y),
                  }}
                >
                  <span
                    className="flower-sway block"
                    style={{ '--sway-duration': `${flower.swayDuration}s`, '--sway-delay': `${flower.swayDelay}s` } as React.CSSProperties}
                  >
                    <span className={`block transition-[filter] duration-500 ${found ? '' : 'flower-glow'}`}>
                      <FlowerSvg kind={flower.kind} bloomed={found} className="h-auto w-full" />
                    </span>
                  </span>
                  {found && (
                    <span
                      className="sparkle-pop absolute right-[2%] top-[2%] flex h-6 w-6 items-center justify-center rounded-full border border-[#8A6B34]/50 bg-[#E9C878] shadow-md"
                      aria-hidden="true"
                    >
                      <Check size={13} strokeWidth={3} className="text-[#51343D]" />
                    </span>
                  )}
                  <span className="pointer-events-none absolute inset-x-0 -bottom-4 text-center text-[8.5px] font-sans font-semibold uppercase tracking-[0.18em] text-[#46303B]/0 transition-opacity duration-300 group-hover:text-[#46303B] drop-shadow-[0_1px_0_rgba(251,240,222,0.9)] sm:text-[9px]">
                    {found ? 'read again' : 'tap me'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ————— unlocked finale CTA ————— */}
        <AnimatePresence>
          {allFound && (
            <motion.div
              key="all-found"
              initial={{ opacity: 0, y: 44, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              className="absolute bottom-[max(env(safe-area-inset-bottom),1.1rem)] left-1/2 z-30 w-full max-w-md -translate-x-1/2 px-4"
            >
              <div className="sticker flex flex-col items-center gap-2 p-3.5 text-center">
                <p className="font-hand text-[21px] font-bold leading-tight text-[#B04A63]">
                  All eight flowers have spoken...
                </p>
                <button
                  type="button"
                  onClick={onComplete}
                  className="storybook-button group inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-sans text-[12px] font-bold uppercase tracking-[0.18em]"
                >
                  <Flower2 size={16} aria-hidden="true" />
                  Continue the story
                  <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ————— the reveal ————— */}
      <AnimatePresence>
        {openFlower && <NoteModal key={openFlower.id} flower={openFlower} onClose={() => setOpenFlower(null)} />}
      </AnimatePresence>
    </section>
  );
}
