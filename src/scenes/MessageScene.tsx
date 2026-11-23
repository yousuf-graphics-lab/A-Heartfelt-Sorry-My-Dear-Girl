import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { FLOWERS } from '../data/flowers';
import FlowerSvg from '../components/flowers/FlowerSvg';
import ChapterTag from '../components/ChapterTag';
import PetalField, { GlowDust } from '../components/ambient/PetalField';

/** Points along a classic parametric heart, normalised into a 0..100 box. */
function useHeartPoints(count: number) {
  return useMemo(() => {
    const raw: { x: number; y: number }[] = [];
    for (let i = 0; i <= 240; i++) {
      const t = (i / 240) * Math.PI * 2;
      raw.push({
        x: 16 * Math.pow(Math.sin(t), 3),
        y: 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t),
      });
    }
    const xs = raw.map((p) => p.x);
    const ys = raw.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const W = 88;
    const H = 72;
    const pts: { left: number; top: number }[] = [];
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2 + Math.PI / count;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      pts.push({
        left: 6 + ((x - minX) / (maxX - minX)) * W,
        top: 4 + ((maxY - y) / (maxY - minY)) * H,
      });
    }
    return pts;
  }, [count]);
}

export default function MessageScene({ onAdvance }: { onAdvance: () => void }) {
  const reducedMotion = useReducedMotion();
  const heartPoints = useHeartPoints(FLOWERS.length);

  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-8"
      aria-label="One last message from Yousuf"
    >
      {/* ————— storybook golden-hour garden ————— */}
      <img
        src="/images/message-storybook.jpg"
        alt=""
        aria-hidden="true"
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full scale-105 object-cover object-[50%_38%]"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(38,19,32,0.78)_0%,rgba(74,28,46,0.42)_44%,rgba(28,12,22,0.82)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(52% 42% at 50% 42%, rgba(255, 224, 178, 0.3), transparent 65%)' }}
      />
      <PetalField count={10} seed={63} />
      <GlowDust count={18} seed={52} />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <ChapterTag chapter="Chapter Four" title="Every Petal, One Promise" tone="dark" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08 }}
          className="mt-2 font-display text-[30px] font-semibold leading-[1.18] text-[#FFF5F5] sm:text-5xl"
          style={{ textShadow: '0 3px 30px rgba(0,0,0,0.55)' }}
        >
          One Last Thing, <span className="italic text-[#F7B8CB]">My Pakhi...</span>
        </motion.h2>

        {/* ————— the eight flowers form a heart ————— */}
        <div className="relative mt-4 h-[180px] w-[240px] sm:mt-6 sm:h-[240px] sm:w-[320px]" aria-hidden="true">
          {/* glowing heart core */}
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
            className="absolute left-1/2 top-[46%] h-[58%] w-[62%] -translate-x-1/2 -translate-y-1/2"
          >
            <svg viewBox="0 0 100 92" className="h-full w-full drop-shadow-[0_0_28px_rgba(240,110,151,0.65)]">
              <defs>
                <radialGradient id="heartCore" cx="0.5" cy="0.35" r="0.75">
                  <stop offset="0%" stopColor="#FF9FB8" />
                  <stop offset="55%" stopColor="#D65B7F" />
                  <stop offset="100%" stopColor="#8C2E47" />
                </radialGradient>
              </defs>
              <path
                d="M50 84 C 26 64, 8 46, 8 26 C 8 12, 20 4, 31 4 C 40 4, 47 10, 50 19 C 53 10, 60 4, 69 4 C 80 4, 92 12, 92 26 C 92 46, 74 64, 50 84 Z"
                fill="url(#heartCore)"
                stroke="#FFD9E2"
                strokeWidth={1.6}
                strokeOpacity={0.75}
              />
              <path d="M22 22 C 26 14, 36 12, 42 18" fill="none" stroke="#FFD9E2" strokeWidth={2.2} strokeLinecap="round" strokeOpacity={0.8} />
            </svg>
          </motion.div>
          {heartPoints.map((pt, i) => {
            const flower = FLOWERS[i];
            const fromLeft = i % 2 === 0;
            return (
              <motion.div
                key={flower.id}
                className="absolute h-[26%] w-[26%]"
                style={{ left: `${pt.left}%`, top: `${pt.top}%` }}
                initial={
                  reducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: fromLeft ? -220 : 220, y: 150, scale: 0.3, rotate: fromLeft ? -70 : 70 }
                }
                animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 66, damping: 13, delay: 0.35 + i * 0.17 }}
              >
                <FlowerSvg kind={flower.kind} headOnly bloomed className="h-full w-full drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]" />
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, type: 'spring', stiffness: 150, damping: 12 }}
            className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
          >
            <Heart size={26} fill="#FFE9EC" stroke="#8C2E47" strokeWidth={1.5} className="animate-heartbeat drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] sm:h-8 sm:w-8" />
          </motion.div>
        </div>

        {/* ————— the words ————— */}
        <div className="mt-4 max-w-xl space-y-2.5 sm:mt-6 sm:space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-cormorant text-[14px] font-medium leading-snug text-[#FBE3E8] sm:text-[17.5px] sm:leading-relaxed"
          >
            Jano pakhi, ami chai na shudhu ajker jonno tomake sorry boli. Ami chai protidin amar kajer maddhome tomake bujhiye dite je tumi amar kache koto ta important.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="font-cormorant text-[14px] font-medium leading-snug text-[#FBE3E8] sm:text-[17.5px] sm:leading-relaxed"
          >
            Tomar oviman ke ami respect kori. Tomar shomoy dorkar hole ami shetao respect korbo. Ami chai na tumi kono pressure feel koro. Shudhu etotuku chai, jokhon tomar mon chaibe, amra abar shundor kore kotha bolbo.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 1.5 }}
            className="pt-1 font-hand text-[23px] font-bold leading-tight text-[#FFD9A8] sm:text-3xl"
            style={{ textShadow: '0 2px 18px rgba(0,0,0,0.5)' }}
          >
            I love you, my dear sweetheart pakhi. ❤️
          </motion.p>
        </div>

        <motion.button
          type="button"
          onClick={onAdvance}
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 16, delay: 1.75 }}
          whileHover={{ scale: 1.045 }}
          whileTap={{ scale: 0.96 }}
          className="group mt-4 inline-flex items-center gap-3 rounded-full border border-[#FFD9E2]/50 bg-gradient-to-r from-[#A83D58] via-[#DE6A8B] to-[#A83D58] bg-[length:200%_100%] bg-left px-8 py-4 font-sans text-sm font-bold uppercase tracking-[0.22em] text-[#FFF5F5] shadow-[0_16px_50px_-10px_rgba(222,106,139,0.55)] transition-all duration-500 hover:bg-right focus-visible:outline-[#E9C878] sm:mt-6"
        >
          <Sparkles size={18} className="text-[#FFE9A8]" aria-hidden="true" />
          One Last Surprise
          <Sparkles size={18} className="text-[#FFE9A8]" aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  );
}
