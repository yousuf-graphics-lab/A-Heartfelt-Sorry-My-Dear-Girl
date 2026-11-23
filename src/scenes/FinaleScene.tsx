import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MailOpen, Flower2, Quote } from 'lucide-react';
import { GlowDust, StarField } from '../components/ambient/PetalField';
import ChapterTag from '../components/ChapterTag';

/** A big glowing heart outlined with climbing roses. */
export function RoseHeart({ className = '' }: { className?: string }) {
  const roses = useMemo(() => {
    const pts: { x: number; y: number; i: number }[] = [];
    const raw: { x: number; y: number }[] = [];
    for (let i = 0; i <= 220; i++) {
      const t = (i / 220) * Math.PI * 2;
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
    const W = 96;
    const H = 78;
    const count = 17;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 2 + 0.22;
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      pts.push({ x: 12 + ((x - minX) / (maxX - minX)) * W, y: 9 + ((maxY - y) / (maxY - minY)) * H, i });
    }
    return pts;
  }, []);

  const palette = [
    { o: '#E0708F', m: '#C14E68', s: '#7E2B42' },
    { o: '#D6667F', m: '#A83D58', s: '#5E1E30' },
    { o: '#F0A0B4', m: '#DE7391', s: '#8C3E54' },
  ];

  return (
    <svg viewBox="0 0 120 100" className={className} role="img" aria-label="A glowing heart woven from roses">
      <defs>
        <radialGradient id="finaleHeart" cx="0.5" cy="0.38" r="0.75">
          <stop offset="0%" stopColor="#E0658C" stopOpacity={0.95} />
          <stop offset="60%" stopColor="#A83D58" stopOpacity={0.9} />
          <stop offset="100%" stopColor="#661E33" stopOpacity={0.92} />
        </radialGradient>
      </defs>
      <path
        d="M60 91 C 36 73, 14 54, 14 30 C 14 12, 27 5, 39 5 C 50 5, 57 13, 60 23 C 63 13, 70 5, 81 5 C 93 5, 106 12, 106 30 C 106 54, 84 73, 60 91 Z"
        fill="url(#finaleHeart)"
        stroke="#FFD9E2"
        strokeWidth={1.1}
        strokeOpacity={0.6}
      />
      <path d="M30 26 C 34 16, 46 14, 52 21" fill="none" stroke="#FFB9CC" strokeWidth={1.8} strokeLinecap="round" strokeOpacity={0.85} />
      {roses.map((r) => {
        const p = palette[r.i % palette.length];
        return (
          <g key={r.i} transform={`translate(${r.x} ${r.y})`}>
            <circle r={4.1} fill={p.o} stroke={p.s} strokeWidth={0.5} strokeOpacity={0.8} />
            <circle r={2.5} fill={p.m} />
            <path d="M0 -1.7 a1.7 1.7 0 1 1 -1.7 1.7" fill="none" stroke={p.s} strokeWidth={0.55} strokeOpacity={0.9} />
          </g>
        );
      })}
    </svg>
  );
}

interface FinaleSceneProps {
  onReadAgain: () => void;
  onWanderGarden: () => void;
}

export default function FinaleScene({ onReadAgain, onWanderGarden }: FinaleSceneProps) {
  return (
    <section
      className="night-vignette relative flex min-h-[100svh] w-full flex-col overflow-x-hidden overflow-y-auto"
      aria-label="A night garden under the moon — a final sincere message"
    >
      {/* ————— the painting ————— */}
      <img
        src="/images/finale-storybook.jpg"
        alt="A storybook illustration of two figures seen from behind, holding hands beneath a rose arch under a giant full moon"
        draggable={false}
        className="kenburns pointer-events-none absolute inset-0 h-full w-full object-cover object-[50%_30%]"
      />
      {/* breathing halo over the storybook moon */}
      <div
        aria-hidden="true"
        className="breathe pointer-events-none absolute left-1/2 top-[21%] h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,243,201,0.45), transparent 68%)' }}
      />
      <StarField count={36} seed={5} />
      <GlowDust count={12} seed={17} />
      {/* legibility: whisper-dark up top, deep ink pooling where the words rest */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,28,0.38)_0%,transparent_24%,transparent_44%,rgba(16,7,20,0.66)_72%,rgba(12,5,16,0.93)_100%)]"
      />

      {/* ————— the words, pooled in moonlight at the bottom ————— */}
      <div className="relative z-10 m-auto flex w-full max-w-2xl flex-col items-center px-5 pb-8 pt-[30svh] text-center sm:pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 70, damping: 13, delay: 0.2 }}
          className="h-[64px] w-[78px] sm:h-[84px] sm:w-[100px]"
          style={{ filter: 'drop-shadow(0 0 26px rgba(240,110,151,0.6))' }}
        >
          <div className="animate-heartbeat h-full w-full">
            <RoseHeart className="h-full w-full" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-2 sm:mt-3"
        >
          <ChapterTag chapter="Chapter Five" title="The Final Page" tone="dark" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.5 }}
          className="mt-1.5 font-display text-[30px] font-semibold leading-tight text-[#FFF5F5] sm:text-5xl"
          style={{ textShadow: '0 3px 28px rgba(0,0,0,0.7)' }}
        >
          To My Beautiful <span className="italic text-[#F7B8CB]">Samiya</span>
        </motion.h2>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="mt-2 max-w-xl sm:mt-3"
        >
          <Quote size={16} className="mx-auto mb-1 text-[#E9C878]" fill="currentColor" strokeWidth={0} aria-hidden="true" />
          <p className="font-cormorant text-[14px] font-medium italic leading-snug text-[#FBE8EC] sm:text-[17.5px] sm:leading-relaxed">
            I can't undo my mistakes, but I can learn from them. I can't promise to be perfect, but I can promise to keep trying to understand you better.
          </p>
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.05 }}
          className="mt-2 font-cormorant text-[13.5px] font-medium text-[#EFD9DE] sm:text-[16.5px]"
        >
          Thank you for being someone so special in my life.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.3, ease: 'easeOut' }}
          className="mt-2 bg-gradient-to-r from-[#FFD3DE] via-[#E9C878] to-[#FFD3DE] bg-clip-text font-display text-[22px] font-bold italic leading-snug text-transparent sm:mt-3 sm:text-[34px]"
          style={{ textShadow: '0 0 44px rgba(233,200,120,0.35)' }}
        >
          Sorry, My Dear Sweetheart Pakhi. ❤️
        </motion.p>

        {/* gold divider */}
        <div className="mt-2.5 flex w-44 items-center gap-3 sm:mt-4 sm:w-64" aria-hidden="true">
          <span className="h-px flex-1 bg-gold-line" />
          <span className="h-1.5 w-1.5 rotate-45 bg-[#D8B47A]" />
          <span className="h-px flex-1 bg-gold-line" />
        </div>

        {/* signature */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-2 font-sans text-[8.5px] font-semibold uppercase tracking-[0.4em] text-[#FFF5F5]/60 sm:text-[10px]"
        >
          Forever With Love,
        </motion.p>
        <motion.p
          initial={{ opacity: 0, rotate: -3, y: 8 }}
          animate={{ opacity: 1, rotate: -3, y: 0 }}
          transition={{ duration: 0.9, delay: 1.65 }}
          className="font-hand text-[32px] font-bold leading-none text-[#E9C878] sm:text-5xl"
          style={{ textShadow: '0 2px 22px rgba(0,0,0,0.6)' }}
        >
          Your Yousuf
        </motion.p>

        {/* actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.85 }}
          className="mt-3 flex flex-col items-center gap-2 sm:mt-5"
        >
          <button
            type="button"
            onClick={onReadAgain}
            className="storybook-button inline-flex items-center gap-2.5 rounded-2xl px-6 py-3.5 font-sans text-[11px] font-bold uppercase tracking-[0.2em] sm:px-7 sm:text-[12px]"
          >
            <MailOpen size={17} strokeWidth={1.8} aria-hidden="true" />
            Read My Letter Again
          </button>
          <button
            type="button"
            onClick={onWanderGarden}
            className="mt-1 inline-flex items-center gap-1.5 font-sans text-[9.5px] font-medium uppercase tracking-[0.24em] text-[#FFF5F5]/45 underline decoration-[#D8B47A]/40 underline-offset-4 transition-colors duration-300 hover:text-[#FFE9B8]"
          >
            <Flower2 size={11} aria-hidden="true" />
            ...or let the garden bloom once more
          </button>
        </motion.div>
      </div>

      {/* corner credit */}
      <p className="pointer-events-none absolute bottom-[max(env(safe-area-inset-bottom),0.65rem)] left-1/2 z-10 w-full -translate-x-1/2 px-6 text-center font-sans text-[7.5px] font-medium uppercase tracking-[0.28em] text-[#FFF5F5]/40">
        A Little Sorry, My Pakhi · Made with love by Yousuf, for Samiya
      </p>
    </section>
  );
}
