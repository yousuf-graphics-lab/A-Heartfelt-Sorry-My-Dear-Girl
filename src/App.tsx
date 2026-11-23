import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { musicEngine, type MusicState } from './audio/musicEngine';
import { MusicToggle, TapForMusic } from './components/ambient/MusicControls';
import OpeningScene from './scenes/OpeningScene';
import LetterScene from './scenes/LetterScene';
import GardenScene from './scenes/GardenScene';
import MessageScene from './scenes/MessageScene';
import FinaleScene from './scenes/FinaleScene';

type Scene = 'opening' | 'letter' | 'garden' | 'message' | 'finale';

const sceneMotion = {
  initial: { opacity: 0, x: -72, rotateY: -16, transformPerspective: 1500 },
  animate: { opacity: 1, x: 0, rotateY: 0, transformPerspective: 1500 },
  exit: { opacity: 0, x: 64, rotateY: 12, transformPerspective: 1500 },
};

export default function App() {
  const [scene, setScene] = useState<Scene>('opening');
  const [letterDirect, setLetterDirect] = useState(false);
  const [letterEpoch, setLetterEpoch] = useState(0);
  const [discovered, setDiscovered] = useState<number[]>([]);
  const [musicState, setMusicState] = useState<MusicState>('idle');
  const [muted, setMuted] = useState<boolean>(() => musicEngine.isMuted());

  // Music lives at the root — it never restarts between scenes.
  useEffect(() => {
    musicEngine.onStateChange = (s) => setMusicState(s);
    setMusicState(musicEngine.getState());
    void musicEngine.tryStart();
    return () => {
      musicEngine.onStateChange = undefined;
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [scene]);

  const toggleMusic = useCallback(() => {
    setMuted(musicEngine.toggleMute());
    if (musicEngine.getState() !== 'playing') void musicEngine.tryStart();
  }, []);

  const startMusic = useCallback(() => {
    void musicEngine.tryStart();
  }, []);

  const discover = useCallback((id: number) => {
    setDiscovered((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const goTo = useCallback((next: Scene) => () => setScene(next), []);

  const readLetterAgain = useCallback(() => {
    setLetterDirect(true);
    setLetterEpoch((k) => k + 1);
    setScene('letter');
  }, []);

  return (
    <div className="relative min-h-[100svh] w-full bg-petal-bg">
      {/* ————— brand mark ————— */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-[max(env(safe-area-inset-left),0.85rem)] top-[max(env(safe-area-inset-top),0.85rem)] z-40 flex items-center gap-2"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#46303B] bg-[#FFF8EC] shadow-[2px_2px_0_#46303B]">
          <Heart size={13} fill="#C85B79" stroke="#46303B" strokeWidth={1.6} />
        </span>
        <span className="hidden rounded-xl border-2 border-[#46303B] bg-[#FFF8EC]/95 px-2.5 py-1.5 font-sans text-[8px] font-bold uppercase leading-tight tracking-[0.26em] text-[#46303B] shadow-[2px_2px_0_#46303B] md:block">
          A Little Sorry,
          <br />
          My Pakhi
        </span>
      </div>

      {/* ————— music toggle ————— */}
      <div
        className="fixed right-[max(env(safe-area-inset-right),0.85rem)] top-[max(env(safe-area-inset-top),0.85rem)] z-40"
      >
        <MusicToggle playing={musicState === 'playing'} muted={muted} onToggle={toggleMusic} />
      </div>

      {/* ————— tap-to-play fallback when autoplay is blocked ————— */}
      <TapForMusic visible={musicState === 'blocked'} onTap={startMusic} />

      {/* ————— the story ————— */}
      <AnimatePresence mode="wait">
        <motion.main
          key={scene === 'letter' ? `letter-${letterEpoch}` : scene}
          {...sceneMotion}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {scene === 'opening' && <OpeningScene onAdvance={goTo('letter')} />}
          {scene === 'letter' && <LetterScene onAdvance={goTo('garden')} startReading={letterDirect} />}
          {scene === 'garden' && <GardenScene discovered={discovered} onDiscover={discover} onComplete={goTo('message')} />}
          {scene === 'message' && <MessageScene onAdvance={goTo('finale')} />}
          {scene === 'finale' && <FinaleScene onReadAgain={readLetterAgain} onWanderGarden={goTo('garden')} />}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
