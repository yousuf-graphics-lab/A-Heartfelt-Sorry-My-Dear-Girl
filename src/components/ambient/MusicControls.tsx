import { Music, VolumeX, type LucideIcon } from 'lucide-react';

function EqualizerBars() {
  return (
    <span className="flex h-4 items-end gap-[2.5px]" aria-hidden="true">
      {[0.9, 0.55, 1.15].map((d, i) => (
        <span
          key={i}
          className="eq-bar w-[2.5px] rounded-full bg-current"
          style={{ animationDelay: `${-d * 0.9}s`, animationDuration: `${0.9 + d * 0.35}s` }}
        />
      ))}
    </span>
  );
}

export function MusicToggle({
  playing,
  muted,
  onToggle,
}: {
  playing: boolean;
  muted: boolean;
  onToggle: () => void;
}) {
  const Icon: LucideIcon = muted ? VolumeX : Music;
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={!muted}
      aria-label={muted ? 'Unmute the music' : 'Mute the music'}
      title={muted ? 'Unmute the music' : 'Mute the music'}
      className="group flex h-11 w-11 items-center justify-center rounded-full border border-[#E9C878]/45 bg-[#2B161E]/60 text-[#F6E7C8] shadow-lg shadow-black/25 backdrop-blur-md transition-all duration-300 hover:border-[#E9C878]/80 hover:bg-[#2B161E]/75 hover:text-[#FFE9B8] focus-visible:outline-[#E9C878]"
    >
      {playing && !muted ? <EqualizerBars /> : <Icon size={19} strokeWidth={1.8} />}
    </button>
  );
}

/** Unobtrusive pill shown only when the browser blocked autoplay. */
export function TapForMusic({ visible, onTap }: { visible: boolean; onTap: () => void }) {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={onTap}
      className="tap-music group fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#E9C878]/50 bg-[#2B161E]/78 py-2.5 pl-4 pr-5 text-[#F6E7C8] shadow-[0_10px_40px_-8px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-colors duration-300 hover:bg-[#3A1F29]/85 hover:text-[#FFE9B8]"
    >
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#E9C878]/15">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E9C878]/20" />
        <Music size={16} strokeWidth={1.8} />
      </span>
      <span className="text-left leading-tight">
        <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#E9C878]/90">
          A little song for you
        </span>
        <span className="block font-cormorant text-[15px] italic text-[#FDF3E3]">Tap to hear the music</span>
      </span>
    </button>
  );
}
