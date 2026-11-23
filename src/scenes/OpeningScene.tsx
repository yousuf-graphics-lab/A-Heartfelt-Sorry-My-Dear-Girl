import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { BookOpen, Heart } from 'lucide-react';
import PetalField, { GlowDust } from '../components/ambient/PetalField';
import ChapterTag from '../components/ChapterTag';
import OrnateFrame from '../components/OrnateFrame';

const HEADLINE_LINE_1 = ['Hey,', 'My', 'Dear', 'Sweetheart'];

export default function OpeningScene({ onAdvance }: { onAdvance: () => void }) {
  const reducedMotion = useReducedMotion();
  // 2 = kicker + headline, 4 = the words, 6 = the call to action
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setPhase(6);
      return;
    }
    const timers = [
      window.setTimeout(() => setPhase(2), 550),
      window.setTimeout(() => setPhase(4), 1750),
      window.setTimeout(() => setPhase(6), 2950),
    ];
    return () => timers.forEach(window.clearTimeout);
  }, [reducedMotion]);

  return (
    <section
      className="storybook-backdrop relative flex min-h-[100svh] w-full flex-col overflow-x-hidden overflow-y-auto"
      aria-label="The opening page — a lantern-lit storybook still life of a bouquet and a wax-sealed letter"
    >
      {/* sun rays + warm wash */}
      <div aria-hidden="true" className="storybook-rays pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,240,214,0.9),transparent_70%)] blur-2xl" />
      {/* drifting birds, storybook-style */}
      <svg aria-hidden="true" viewBox="0 0 24 8" className="bird-drift pointer-events-none absolute right-[8%] top-[14%] z-10 h-5 w-12 text-[#46303B]/70" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
        <path d="M1 5 Q 5 1, 9 5 M 9 5 Q 13 1, 17 5" />
      </svg>

      <PetalField count={16} seed={7} className="z-10" />
      <GlowDust count={12} seed={31} />

      {/* ————— the spread ————— */}
      <div className="relative z-20 mx-auto grid w-full max-w-6xl flex-1 items-center gap-5 px-5 pb-14 pt-[max(env(safe-area-inset-top),3.6rem)] sm:gap-8 sm:px-8 sm:pt-20 lg:grid-cols-[1.02fr_1fr] lg:gap-12">
        {/* —— the words —— */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <AnimatePresence>
            {phase >= 2 && (
              <motion.div
                key="kicker"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center gap-2 lg:items-start"
              >
                <ChapterTag chapter="Chapter One" title="The Quiet Desk" tone="light" />
                <p className="font-sans text-[9.5px] font-bold uppercase tracking-[0.36em] text-[#46303B]/55 sm:text-[10px]">
                  A little something, from Yousuf
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <h1 className="mt-2 font-display text-[38px] font-bold leading-[1.08] text-[#46303B] sm:mt-3 sm:text-6xl sm:leading-[1.04]">
            {phase >= 2 &&
              HEADLINE_LINE_1.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 30, rotate: -2 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 150, damping: 19, delay: 0.25 + i * 0.13 }}
                  className="mr-[0.1em] inline-block"
                >
                  {word}{' '}
                </motion.span>
              ))}
            {phase >= 2 && (
              <motion.span
                initial={{ opacity: 0, y: 30, rotate: 3 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 140, damping: 17, delay: 0.25 + HEADLINE_LINE_1.length * 0.13 }}
                className="block font-display italic text-[#B04A63]"
              >
                Pakhi<span className="text-[#46303B]">...</span>
              </motion.span>
            )}
          </h1>

          <AnimatePresence>
            {phase >= 4 && (
              <motion.p
                key="sub"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="mx-auto mt-3 max-w-md font-cormorant text-[16px] font-semibold italic leading-snug text-[#5E4049] sm:mt-4 sm:text-[19px] lg:mx-0"
              >
                I know you're upset with me. But there's something I really want you to know.
              </motion.p>
            )}
          </AnimatePresence>

          <div className="mt-4 flex min-h-[64px] items-center sm:mt-6">
            <AnimatePresence>
              {phase >= 6 && (
                <motion.button
                  key="cta"
                  type="button"
                  onClick={onAdvance}
                  initial={{ opacity: 0, y: 22, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring', stiffness: 135, damping: 16 }}
                  className="storybook-button group relative inline-flex items-center gap-3 rounded-2xl px-6 py-4 font-sans text-[13px] font-bold uppercase tracking-[0.16em] focus-visible:outline-[#B04A63] sm:px-8 sm:text-sm"
                >
                  <BookOpen size={19} strokeWidth={2.1} aria-hidden="true" className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                  There's Something I Want to Tell You
                  <span aria-hidden="true" className="absolute -right-1.5 -top-1.5 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C85B79]/50" />
                    <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-[#46303B] bg-[#F2CE8F]" />
                  </span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* —— the illustrated polaroid —— */}
        <motion.div
          initial={{ opacity: 0, y: 48, rotate: 6 }}
          animate={{ opacity: 1, y: 0, rotate: 1.6 }}
          transition={{ type: 'spring', stiffness: 90, damping: 17, delay: 0.45 }}
          className="relative mx-auto w-full max-w-[540px]"
        >
          {/* loose background card */}
          <div aria-hidden="true" className="absolute inset-0 -rotate-3 rounded-[1.4rem] border-2 border-[#46303B]/70 bg-[#E9B7C6]/70" />
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6.4, ease: 'easeInOut', repeat: Infinity }}
            className="relative rounded-[1.4rem] border-[2.5px] border-[#46303B] bg-[#FFF8EC] p-3 pb-11 shadow-[8px_10px_0_rgba(70,48,59,0.9)] sm:p-4 sm:pb-12"
          >
            {/* bookmark ribbon */}
            <div aria-hidden="true" className="absolute -right-3 -top-4 z-10 flex h-24 w-9 flex-col items-center rounded-t-md border-2 border-[#46303B] bg-[#B04A63] pt-1.5 shadow-[3px_4px_0_rgba(70,48,59,0.85)]">
              <Heart size={13} fill="#FFF8EC" stroke="none" />
              <div className="absolute -bottom-2 h-4 w-full border-x-2 border-[#46303B] bg-[#B04A63]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            </div>
            <div className="relative overflow-hidden rounded-xl border-2 border-[#46303B]">
              <img
                src="/images/opening-storybook.jpg"
                alt="A storybook illustration of a lantern-lit desk: a kraft-wrapped rose bouquet beside a wax-sealed love letter and a fountain pen"
                draggable={false}
                className="h-full w-full object-cover object-[50%_38%]"
              />
              <OrnateFrame className="pointer-events-none absolute inset-0 h-full w-full text-[#2E1B25]/85" />
              {/* lantern glow kiss */}
              <div aria-hidden="true" className="lantern-flicker pointer-events-none absolute left-[7%] top-[18%] h-[46%] w-[30%] rounded-full bg-[radial-gradient(circle,rgba(255,222,150,0.5),transparent_68%)]" />
            </div>
            <p className="pointer-events-none absolute bottom-2.5 left-0 w-full text-center font-hand text-[17px] font-semibold text-[#46303B]/85 sm:bottom-3 sm:text-[19px]">
              the lantern, the letter & the roses...
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* ————— tiny signature ————— */}
      <div className="pointer-events-none absolute bottom-[max(env(safe-area-inset-bottom),0.8rem)] left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap text-[8.5px] font-sans font-semibold uppercase tracking-[0.26em] text-[#46303B]/55 sm:left-6 sm:translate-x-0">
        <Heart size={9} fill="currentColor" aria-hidden="true" />
        Made with love by Yousuf, for Samiya
      </div>
    </section>
  );
}
