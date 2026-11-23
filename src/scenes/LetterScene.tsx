import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower2, Sparkles } from 'lucide-react';
import PetalField from '../components/ambient/PetalField';
import FlowerSvg from '../components/flowers/FlowerSvg';
import ChapterTag from '../components/ChapterTag';

type LetterStage = 'sealed' | 'opening' | 'reading';

const LETTER_PARAGRAPHS = [
  'Amar Dear Sweetheart Pakhi,',
  'Ami jani amader moddhe shobkichu ekhon eto ta valo jacche na. Onek kichu niye tumi upset, tomar mon kharap, ar hoyto amar kichu kotha ba kaj tomake onek hurt kortase ekhono. Shotti bolte ami chai na amader moddhe evabe distance create hok. Ami jani amar onek vul hoise, onek somoy ami hoyto tomar feelings ta thik moto bujhte pari nai, tomake sei care ta dite pari nai jeta tumi deserve koro. Shobkichur jonno ami mon theke sorry, amar pakhi.',
  'Ami jani shudhu sorry bollei sob thik hoye jabe na, ba ekta message dile sob oviman chole jabe na. But ami mon theke chai amader shobkichu abar shundor hok. Abar ager moto kotha boli, choto choto bishoy niye hashi, ekjon arekjon ke bujhi, ar mon kharap holeo dure shore na giye kotha boli. Ami chai na amar vul gulor jonno tumi ar mon kharap koro. I am really sorry, Samiya, tomake koshto dewar jonno, tomake upset korar jonno, ar shobkichu thik moto handle korte na parar jonno.',
  'Please nijer kheyal rakhio, shomoy moto kheye nio, thik moto ghumaiyyo, ar nijer upore beshi stress nio na. Mon kharap hole nijer moddhe shob chepe rakhio na please. Ami tomar hashimakha cheherata khub miss kortasi, tomar oi mishti hashi ta na dekhle amar din ta kemon jeno thikmoto complete hocche na. Tomake hashi khushi dekhle amar nijer mon tao shanto hoye jay. Tai please nijer jotno nio, valo thakio, ar nijer upor ektu beshi care nio.',
  'Abaro sorry, amar shob bhul er jonno. Ami chai shobkichu aste aste abar shundor hoye uthuk, ar tomar oi mishti hashi ta abar fire ashuk jeta amar jonno molin hoye gese.',
];

/** Decorative corner sprig of roses. */
function RoseSprig({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <g stroke="#C85B79" strokeWidth={2} fill="none" opacity={0.85}>
        <path d="M8 192 C 60 150, 92 96, 150 22" strokeLinecap="round" strokeWidth={2.6} />
        <path d="M64 138 C 84 138, 100 128, 108 112" strokeLinecap="round" />
        <path d="M96 96 C 118 96, 132 86, 140 72" strokeLinecap="round" />
      </g>
      <g fill="#EFA6B6" stroke="#B85E77" strokeWidth={1.4}>
        <circle cx="150" cy="26" r="13" />
        <circle cx="108" cy="106" r="10" />
        <circle cx="60" cy="140" r="8" />
      </g>
      <g fill="#C85B79" opacity={0.9}>
        <circle cx="150" cy="26" r="6.4" fill="none" stroke="#A83D58" strokeWidth={1.6} />
        <circle cx="108" cy="106" r="4.8" fill="none" stroke="#A83D58" strokeWidth={1.4} />
        <circle cx="60" cy="140" r="3.8" fill="none" stroke="#A83D58" strokeWidth={1.2} />
      </g>
      <path d="M84 128 q -16 2 -24 16 q 17 2 24 -16 Z" fill="#7BA97B" opacity={0.9} />
      <path d="M126 78 q -15 3 -22 15 q 16 2 22 -15 Z" fill="#7BA97B" opacity={0.85} />
    </svg>
  );
}

export default function LetterScene({ onAdvance, startReading = false }: { onAdvance: () => void; startReading?: boolean }) {
  const [stage, setStage] = useState<LetterStage>(startReading ? 'reading' : 'sealed');
  const openTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (openTimer.current !== null) window.clearTimeout(openTimer.current);
    };
  }, []);

  const openEnvelope = () => {
    if (stage !== 'sealed') return;
    setStage('opening');
    openTimer.current = window.setTimeout(() => setStage('reading'), 1050);
  };

  return (
    <section
      className="relative min-h-[100svh] w-full overflow-hidden"
      aria-label="A letter from Yousuf's heart"
    >
      {/* ————— warm paper atmosphere ————— */}
      <div className="storybook-backdrop absolute inset-0" />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(58% 46% at 50% 44%, rgba(255,248,236,0.95), transparent 72%)' }}
      />
      <RoseSprig className="pointer-events-none absolute -left-6 -top-6 w-40 opacity-60 sm:w-64" />
      <RoseSprig className="pointer-events-none absolute -bottom-8 -right-6 w-40 opacity-60 sm:w-64" flip />
      <div className="pointer-events-none absolute left-[8%] top-[16%] hidden h-28 w-28 rounded-full bg-[#EFA6B6]/18 blur-2xl sm:block" />
      <div className="pointer-events-none absolute right-[10%] top-[56%] hidden h-32 w-32 rounded-full bg-[#D8B47A]/22 blur-2xl sm:block" />
      <PetalField count={7} seed={13} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-3xl flex-col items-center px-4 py-6 sm:justify-center sm:py-10">
        {/* ————— heading ————— */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <ChapterTag chapter="Chapter Two" title="Sealed With Honesty" tone="light" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="mt-1.5 font-display text-3xl font-bold text-[#46303B] sm:text-5xl"
          >
            A Letter From My Heart
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-1.5 font-hand text-[21px] font-semibold text-[#B04A63] sm:text-2xl"
          >
            For My Dear Sweetheart Pakhi
          </motion.p>
        </div>

        {/* ————— envelope ⇄ letter ————— */}
        <div className="flex w-full flex-1 flex-col items-center justify-center py-4 sm:py-6">
          <AnimatePresence mode="wait">
            {stage !== 'reading' ? (
              /* ══════════ THE ENVELOPE ══════════ */
              <motion.div
                key="envelope"
                exit={{ opacity: 0, y: -26, scale: 0.94, filter: 'blur(3px)' }}
                transition={{ duration: 0.45 }}
                className="flex flex-col items-center"
              >
                <div className="animate-floaty">
                <motion.button
                  type="button"
                  onClick={openEnvelope}
                  disabled={stage === 'opening'}
                  aria-label="Open the envelope with the letter"
                  whileHover={stage === 'sealed' ? { y: -8, transition: { type: 'spring', stiffness: 260, damping: 18 } } : undefined}
                  whileTap={stage === 'sealed' ? { scale: 0.97 } : undefined}
                  className="relative block outline-none [perspective:900px]"
                >
                  {/* letter peeking inside */}
                  <motion.div
                    aria-hidden="true"
                    animate={stage === 'opening' ? { y: -46, opacity: 1 } : { y: 10, opacity: 0.9 }}
                    transition={{ duration: 0.8, delay: stage === 'opening' ? 0.34 : 0 }}
                    className="absolute left-1/2 top-3 z-0 h-[78%] w-[78%] -translate-x-1/2 rounded-t-md border border-[#E4D9C8] bg-[#FFFDF4] shadow-md"
                  >
                    <div className="mx-auto mt-3 h-px w-3/5 bg-[#D8B47A]/60" />
                    <div className="mx-auto mt-2 h-px w-4/5 bg-[#D8B47A]/40" />
                    <div className="mx-auto mt-2 h-px w-2/3 bg-[#D8B47A]/40" />
                  </motion.div>

                  {/* envelope body */}
                  <div className="relative z-10 h-44 w-64 rounded-2xl border-2 border-[#46303B] bg-gradient-to-br from-[#D97A93] via-[#C96A84] to-[#A8516E] shadow-[0_30px_60px_-18px_rgba(90,40,55,0.55),inset_0_2px_6px_rgba(255,255,255,0.4)] sm:h-52 sm:w-80">
                    {/* side folds */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl" aria-hidden="true">
                      <div className="absolute inset-0 bg-[linear-gradient(32deg,rgba(74,32,48,0.42)_0%,transparent_52%)]" />
                      <div className="absolute inset-0 bg-[linear-gradient(-32deg,rgba(74,32,48,0.42)_0%,transparent_52%)]" />
                      {/* bottom fold */}
                      <div className="absolute bottom-0 left-0 right-0 h-[62%] bg-[linear-gradient(0deg,#8C3E54_0%,#A8516E_58%,transparent_100%)] opacity-80 [clip-path:polygon(0_100%,50%_12%,100%_100%)]" />
                    </div>
                    {/* gift liner text */}
                    <div className="absolute bottom-4 left-0 right-0 z-10 text-center font-hand text-lg font-semibold text-[#FFE3EA]/90">
                      To Samiya
                    </div>

                    {/* the flap (3D flip) */}
                    <motion.div
                      aria-hidden="true"
                      className="absolute left-0 top-0 z-20 h-[58%] w-full origin-top [backface-visibility:hidden] [clip-path:polygon(0_0,100%_0,50%_100%)]"
                      animate={stage === 'opening' ? { rotateX: -168 } : { rotateX: 0 }}
                      transition={{ duration: 0.85, ease: [0.6, 0, 0.25, 1] }}
                      style={{
                        transformStyle: 'preserve-3d',
                        background: 'linear-gradient(180deg, #E293A9 0%, #C96A84 55%, #B8556F 100%)',
                        boxShadow: 'inset 0 -6px 12px rgba(74,32,48,0.35)',
                      }}
                    />

                    {/* wax seal */}
                    <motion.div
                      aria-hidden="true"
                      className="absolute left-1/2 top-[42%] z-30 -translate-x-1/2 -translate-y-1/2"
                      animate={
                        stage === 'opening'
                          ? { scale: 0, opacity: 0, rotate: -30 }
                          : { scale: 1, opacity: 1, rotate: 0 }
                      }
                      transition={{ duration: 0.5, ease: 'easeIn' }}
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#E9C878]/60 bg-[radial-gradient(circle_at_38%_34%,#C85B79_0%,#A83D58_52%,#7E2B42_100%)] shadow-[0_6px_18px_rgba(60,20,35,0.55),inset_0_2px_3px_rgba(255,255,255,0.35)]">
                        <div className="absolute inset-[5px] rounded-full border border-dashed border-[#E9C878]/50" />
                        <Heart size={24} fill="#E9C878" stroke="#8C2E47" strokeWidth={1.4} />
                        <span className="seal-shimmer pointer-events-none absolute inset-y-0 w-6 bg-white/35 blur-[6px]" />
                      </div>
                    </motion.div>
                  </div>

                  {/* ground shadow */}
                  <div aria-hidden="true" className="mx-auto mt-5 h-4 w-44 rounded-[100%] bg-[#5A2837]/30 blur-md" />
                </motion.button>
                </div>

                <p className="mt-4 font-hand text-[22px] font-semibold text-[#A8516E] sm:text-2xl">
                  {stage === 'opening' ? 'opening...' : 'go on, tap the seal'}
                </p>
              </motion.div>
            ) : (
              /* ══════════ THE LETTER ══════════ */
              <motion.article
                key="letter"
                initial={{ opacity: 0, y: 64, rotateX: 18, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 68, damping: 17 }}
                className="paper-texture relative w-full max-w-xl overflow-hidden rounded-[10px] border-2 border-[#46303B] shadow-paper"
                aria-label="Letter from Yousuf to Samiya"
              >
                <div className="paper-noise pointer-events-none absolute inset-0 opacity-40" />
                {/* postage stamp + postmark */}
                <div aria-hidden="true" className="pointer-events-none absolute right-3 top-3 rotate-6 rounded-[3px] border-2 border-dashed border-[#B04A63]/70 bg-[#F7CDD5]/80 px-2 py-1.5 text-center">
                  <FlowerSvg kind="pinkRose" headOnly bloomed={false} className="mx-auto h-6 w-6" />
                  <span className="mt-0.5 block font-sans text-[6px] font-bold uppercase tracking-[0.2em] text-[#B04A63]">With Love</span>
                </div>
                <div aria-hidden="true" className="pointer-events-none absolute left-4 top-4 hidden h-12 w-12 -rotate-12 items-center justify-center rounded-full border-[2.5px] border-[#A83D58]/35 text-center font-sans text-[5.5px] font-bold uppercase leading-tight tracking-[0.18em] text-[#A83D58]/45 sm:flex">
                  Dhaka<br />Post<br />2026
                </div>
                {/* deckle edges */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[6px] bg-[linear-gradient(90deg,transparent,#E3D5B8_12%,transparent_26%,#E3D5B8_40%,transparent_55%,#E3D5B8_72%,transparent_88%)] opacity-70" />

                <div className="relative max-h-[54svh] overflow-y-auto px-6 pb-5 pt-5 letter-scroll sm:max-h-[56svh] sm:px-10 sm:pt-7">
                  {/* ornament */}
                  <div className="flex items-center justify-center gap-3" aria-hidden="true">
                    <span className="h-px w-14 bg-gold-line opacity-90 sm:w-20" />
                    <FlowerSvg kind="redRose" headOnly bloomed={false} className="h-9 w-9" />
                    <span className="h-px w-14 bg-gold-line opacity-90 sm:w-20" />
                  </div>

                  {/* the letter itself — exact words */}
                  <div className="mt-4 space-y-4 font-hand text-[19.5px] font-semibold leading-[1.55] text-[#453026] sm:text-[21px]">
                    {LETTER_PARAGRAPHS.map((para, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.22 + i * 0.24 }}
                        className={i === 0 ? 'text-[23px] font-bold leading-snug text-[#A83D58] sm:text-[25px]' : undefined}
                      >
                        {para}
                      </motion.p>
                    ))}
                    <motion.p
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.22 + LETTER_PARAGRAPHS.length * 0.24 }}
                      className="pt-1 leading-[1.4]"
                    >
                      With lots of love,
                      <br />
                      <span className="mt-1 block text-right text-[26px] font-bold text-[#A83D58] sm:text-[28px]">
                        Tomar Yousuf <span aria-hidden="true">❤️</span>
                      </span>
                    </motion.p>
                  </div>

                  {/* closing rose */}
                  <div className="mt-3 flex justify-center" aria-hidden="true">
                    <FlowerSvg kind="pinkRose" headOnly bloomed={false} className="h-10 w-10 opacity-90" />
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

        {/* ————— onward to the garden ————— */}
        <div className="flex flex-col items-center pb-2 text-center">
          {stage === 'reading' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="font-cormorant text-[15px] font-semibold italic text-[#8A6B34] sm:text-lg"
            >
              There's Still Something More For You...
            </motion.p>
          )}
          <motion.button
            type="button"
            onClick={onAdvance}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="storybook-button group mt-2 inline-flex items-center gap-2.5 rounded-2xl px-6 py-3.5 font-sans text-[13px] font-bold uppercase tracking-[0.14em] focus-visible:outline-[#B04A63] sm:px-8 sm:text-sm"
          >
            <Flower2 size={18} strokeWidth={2.1} className="transition-transform duration-500 group-hover:rotate-12" aria-hidden="true" />
            Open My Little Garden 🌸
            <Sparkles size={16} strokeWidth={1.8} className="text-[#FFE9A8]" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
