import { useMemo } from 'react';

const PETAL_COLORS = ['#F7CDD5', '#EFA6B6', '#E58CA4', '#FBDDE3', '#E9B7C6', '#F3BCCD'];

interface PetalSpec {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  spin: number;
  opacity: number;
  color: string;
  blur: boolean;
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function PetalField({
  count = 16,
  seed = 7,
  className = '',
}: {
  count?: number;
  seed?: number;
  className?: string;
}) {
  const petals = useMemo<PetalSpec[]>(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      size: 9 + rand() * 13,
      duration: 11 + rand() * 9,
      delay: -rand() * 18,
      drift: (rand() - 0.5) * 22,
      spin: 240 + rand() * 380,
      opacity: 0.55 + rand() * 0.4,
      color: PETAL_COLORS[Math.floor(rand() * PETAL_COLORS.length)],
      blur: rand() > 0.72,
    }));
  }, [count, seed]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal-outer absolute top-0"
          style={
            {
              left: `${p.left}%`,
              '--petal-duration': `${p.duration}s`,
              '--petal-delay': `${p.delay}s`,
              '--petal-drift': `${p.drift}vw`,
              '--petal-spin': `${p.spin}deg`,
              '--petal-opacity': p.opacity,
            } as React.CSSProperties
          }
        >
          <span className="petal-inner block" style={{ filter: p.blur ? 'blur(1.3px)' : undefined }}>
            <svg width={p.size} height={p.size * 1.25} viewBox="0 0 20 25" fill="none">
              <path
                d="M10 1.5 C 15.5 5.5, 17.5 13.5, 10 23.5 C 2.5 13.5, 4.5 5.5, 10 1.5 Z"
                fill={p.color}
                fillOpacity={p.opacity}
                stroke="#B85E77"
                strokeOpacity={0.35}
                strokeWidth={0.6}
              />
              <path d="M10 3.5 C 10 9, 10 15, 10 21.5" stroke="#B85E77" strokeOpacity={0.4} strokeWidth={0.7} strokeLinecap="round" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
}

/** Soft golden dust drifting upward — the "magic" of the garden. */
export function GlowDust({ count = 14, seed = 21 }: { count?: number; seed?: number }) {
  const dots = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: 30 + rand() * 62,
      size: 2.5 + rand() * 4.5,
      delay: -rand() * 4,
      duration: 2.6 + rand() * 3.4,
    }));
  }, [count, seed]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="star-twinkle absolute rounded-full"
          style={
            {
              left: `${d.left}%`,
              top: `${d.top}%`,
              width: d.size,
              height: d.size,
              background: 'radial-gradient(circle, #FFE9B8 0%, #E9C878 55%, transparent 75%)',
              boxShadow: '0 0 8px 2px rgba(255, 226, 158, 0.55)',
              '--twinkle-delay': `${d.delay}s`,
              '--twinkle-duration': `${d.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Twinkling stars for the night finale. */
export function StarField({ count = 46, seed = 99 }: { count?: number; seed?: number }) {
  const stars = useMemo(() => {
    const rand = seeded(seed);
    return Array.from({ length: count }, () => ({
      left: rand() * 100,
      top: rand() * 52,
      size: rand() > 0.82 ? 2.6 : 1.5 + rand() * 1.1,
      delay: -rand() * 5,
      duration: 2.2 + rand() * 3.6,
    }));
  }, [count, seed]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((s, i) => (
        <span
          key={i}
          className="star-twinkle absolute rounded-full bg-[#FFF6DE]"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              boxShadow: '0 0 6px 1px rgba(255, 246, 222, 0.8)',
              '--twinkle-delay': `${s.delay}s`,
              '--twinkle-duration': `${s.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
