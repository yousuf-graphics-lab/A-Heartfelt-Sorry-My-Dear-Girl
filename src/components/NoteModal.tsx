import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Quote } from 'lucide-react';
import type { FlowerDef } from '../data/flowers';
import FlowerSvg from './flowers/FlowerSvg';

interface NoteModalProps {
  flower: FlowerDef;
  onClose: () => void;
}

export default function NoteModal({ flower, onClose }: NoteModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const t = flower.theme;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50" role="presentation">
      {/* backdrop */}
      <motion.button
        type="button"
        aria-label="Close the note"
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-[#46303B]/45 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      {/* card */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={`note-title-${flower.id}`}
          initial={{ opacity: 0, y: 56, scale: 0.82, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 190, damping: 21 }}
          className={`pointer-events-auto relative w-full max-w-md overflow-hidden rounded-[1.4rem] border-2 !border-[#46303B] shadow-[6px_7px_0_rgba(70,48,59,0.9),0_26px_60px_-24px_rgba(70,48,59,0.6)] ${t.card}`}
        >
          {/* ambient halo behind the bloom */}
          <div aria-hidden="true" className={`pointer-events-none absolute -top-16 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full opacity-50 blur-3xl ${t.halo}`} />
          <Quote aria-hidden="true" size={92} strokeWidth={1.1} className={`pointer-events-none absolute -right-3 top-16 rotate-6 opacity-45 ${t.quote}`} />

          {/* close */}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close the note and return to the garden"
            className={`absolute right-3 top-3 z-10 rounded-full p-2 transition-colors duration-200 ${t.closeBtn}`}
          >
            <X size={20} strokeWidth={2.2} />
          </button>

          <div className="relative flex flex-col items-center px-6 pb-6 pt-6 text-center sm:px-8">
            <FlowerSvg kind={flower.kind} headOnly bloomed className="h-20 w-20 drop-shadow-lg" />
            <p className={`mt-2 font-sans text-[9px] font-semibold uppercase tracking-[0.3em] ${t.eyebrow}`}>
              {flower.epigraph}
            </p>
            <h3 id={`note-title-${flower.id}`} className={`mt-1 font-display text-[26px] font-semibold leading-tight ${t.name}`}>
              {flower.name}
            </h3>

            <div className="mt-3 flex w-full items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
              <Heart size={11} fill="currentColor" className={t.divider} />
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
            </div>

            <p className={`mt-4 font-hand text-[22px] font-semibold leading-[1.45] sm:text-[23px] ${t.body}`}>
              {flower.note}
            </p>

            <button
              type="button"
              onClick={onClose}
              className={`mt-5 inline-flex items-center gap-2 rounded-full px-6 py-2.5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] shadow-md transition-all duration-300 ${t.footerBtn}`}
            >
              <Heart size={13} fill="currentColor" aria-hidden="true" />
              Back to the garden
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
