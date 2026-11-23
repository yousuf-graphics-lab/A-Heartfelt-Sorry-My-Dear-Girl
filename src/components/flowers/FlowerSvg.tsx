import { useId } from 'react';
import type { FlowerKind } from '../../data/flowers';

interface FlowerSvgProps {
  kind: FlowerKind;
  /** render only the bloom (used for the heart arrangement & cards) */
  headOnly?: boolean;
  bloomed?: boolean;
  className?: string;
}

const HEAD_VIEWBOX: Record<FlowerKind, string> = {
  pinkRose: '8 2 104 96',
  redRose: '8 2 104 96',
  whiteRose: '8 2 104 96',
  tulip: '14 0 92 100',
  lavender: '22 0 76 118',
  cherryBlossom: '10 2 100 92',
  sunflower: '8 0 104 100',
  heartFlower: '16 0 88 88',
};

function Sparkles({ color = '#E9C878' }: { color?: string }) {
  const pts: [number, number, number][] = [
    [-38, -34, 1],
    [40, -30, 0.8],
    [-28, 6, 0.7],
    [34, 8, 0.9],
  ];
  return (
    <g fill={color} className="sparkle-pop">
      {pts.map(([x, y, s], i) => (
        <path
          key={i}
          transform={`translate(${x} ${y}) scale(${s})`}
          d="M0,-7 C0.6,-2.4 2.4,-0.6 7,0 C2.4,0.6 0.6,2.4 0,7 C-0.6,2.4 -2.4,0.6 -7,0 C-2.4,-0.6 -0.6,-2.4 0,-7 Z"
        />
      ))}
    </g>
  );
}

export default function FlowerSvg({ kind, headOnly = false, bloomed = true, className }: FlowerSvgProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const id = (name: string) => `${name}-${uid}`;

  const stem = (
    <>
      <path
        d="M60 198 C 54 160, 68 128, 60 84"
        fill="none"
        stroke={`url(#${id('stem')})`}
        strokeWidth={5.2}
        strokeLinecap="round"
      />
      {/* left leaf */}
      <path
        d="M58.5 152 C 45 151, 34 140, 31.5 125 C 46.5 127, 56.5 139, 58.5 152 Z"
        fill={`url(#${id('leaf')})`}
        stroke="#3F5E3F"
        strokeWidth={1.1}
        strokeOpacity={0.5}
      />
      {/* right leaf */}
      <path
        d="M60.5 122 C 73 121, 83 111, 86 97 C 72 99, 62.5 110, 60.5 122 Z"
        fill={`url(#${id('leaf')})`}
        stroke="#3F5E3F"
        strokeWidth={1.1}
        strokeOpacity={0.5}
      />
    </>
  );

  let head: React.ReactNode = null;

  switch (kind) {
    case 'pinkRose':
    case 'redRose':
    case 'whiteRose': {
      const palette =
        kind === 'pinkRose'
          ? { outer: '#EFA6B6', outerEdge: '#D97E9C', mid: '#E58CA4', inner: '#D96E8E', swirl: '#A83D58', glow: '#F7CDD5' }
          : kind === 'redRose'
            ? { outer: '#D6667F', outerEdge: '#B84A63', mid: '#C14E68', inner: '#A83D58', swirl: '#6E2438', glow: '#E98CA3' }
            : { outer: '#FFFDF4', outerEdge: '#E4D9C8', mid: '#F3ECDF', inner: '#E0D4C0', swirl: '#A99B85', glow: '#FFFFFF' };
      head = (
        <g transform="translate(60 46)">
          {bloomed && <Sparkles color={kind === 'whiteRose' ? '#E4C97A' : '#F6C6D4'} />}
          {/* outer petal ring */}
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              transform={`rotate(${deg}) translate(0 -13.5)`}
              rx={13}
              ry={17.5}
              fill={palette.outer}
              stroke={palette.outerEdge}
              strokeWidth={1.2}
              strokeOpacity={0.75}
            />
          ))}
          {/* middle ring */}
          {[36, 108, 180, 252, 324].map((deg) => (
            <ellipse
              key={deg}
              transform={`rotate(${deg}) translate(0 -8)`}
              rx={9.5}
              ry={12.5}
              fill={palette.mid}
              stroke={palette.outerEdge}
              strokeWidth={0.9}
              strokeOpacity={0.6}
            />
          ))}
          {/* heart of the rose */}
          <circle r={7.2} fill={palette.inner} />
          <path
            d="M0 -6.4 a6.4 6.4 0 1 1 -6.4 6.4 a4.6 4.6 0 1 0 4.6 -4.6 a3 3 0 1 1 -3 3"
            fill="none"
            stroke={palette.swirl}
            strokeWidth={1.35}
            strokeLinecap="round"
            strokeOpacity={0.9}
          />
          <path d="M-9.5 -14.5 a14 14 0 0 1 8.5 -5" fill="none" stroke="#FFFFFF" strokeWidth={1.6} strokeOpacity={0.65} strokeLinecap="round" />
        </g>
      );
      break;
    }
    case 'tulip': {
      head = (
        <g transform="translate(60 44)">
          {bloomed && <Sparkles color="#F8C8C0" />}
          {/* back petals */}
          <path d="M-2 12 C -17 8, -20 -12, -12.5 -27 C -4 -22, -2 -4, 0 12 Z" fill="#DE7391" stroke="#B85473" strokeWidth={1} strokeOpacity={0.6} />
          <path d="M2 12 C 17 8, 20 -12, 12.5 -27 C 4 -22, 2 -4, 0 12 Z" fill="#DE7391" stroke="#B85473" strokeWidth={1} strokeOpacity={0.6} />
          {/* center petal */}
          <path
            d="M0 -33 C -9.5 -27, -12 -8, -8.5 8 C -5.5 15.5, 5.5 15.5, 8.5 8 C 12 -8, 9.5 -27, 0 -33 Z"
            fill={`url(#${id('tulip')})`}
            stroke="#B85473"
            strokeWidth={1.1}
            strokeOpacity={0.65}
          />
          <path d="M0 -30 C -1.5 -16, -1.5 -2, 0 12" fill="none" stroke="#FFF0F4" strokeWidth={1.3} strokeOpacity={0.55} strokeLinecap="round" />
        </g>
      );
      break;
    }
    case 'lavender': {
      const buds: { y: number; spread: number; angle: number; c: string }[] = [];
      const colors = ['#CDBEE8', '#B9A7D9', '#8F7BB8'];
      for (let row = 0; row < 7; row++) {
        const y = 16 + row * 10.5;
        const spread = 8.4 - row * 0.95;
        buds.push({ y, spread, angle: -28, c: colors[row % 3] });
        buds.push({ y: y + 3.4, spread, angle: 28, c: colors[(row + 1) % 3] });
      }
      head = (
        <g transform="translate(60 0)">
          {bloomed && <Sparkles color="#CDBEE8" />}
          {/* spike stem */}
          <path d="M0 84 C -2 56, 2 34, 0 8" fill="none" stroke="#5E8B5E" strokeWidth={3.4} strokeLinecap="round" />
          {buds.map((b, i) => (
            <ellipse
              key={i}
              cx={Math.sign(b.angle) * b.spread}
              cy={b.y}
              rx={5.4}
              ry={7.6}
              transform={`rotate(${b.angle} ${Math.sign(b.angle) * b.spread} ${b.y})`}
              fill={b.c}
              stroke="#6E5A9C"
              strokeWidth={0.7}
              strokeOpacity={0.55}
            />
          ))}
          <ellipse cx={0} cy={9} rx={5.2} ry={7.4} fill="#CDBEE8" stroke="#6E5A9C" strokeWidth={0.7} strokeOpacity={0.55} />
        </g>
      );
      break;
    }
    case 'cherryBlossom': {
      const petal =
        'M0 -5.5 C -9.5 -8.5, -13.5 -22.5, -5.2 -21 L 0 -15.5 L 5.2 -21 C 13.5 -22.5, 9.5 -8.5, 0 -5.5 Z';
      head = (
        <g transform="translate(60 42)">
          {bloomed && <Sparkles color="#F8B8CE" />}
          {[0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              d={petal}
              transform={`rotate(${deg})`}
              fill={`url(#${id('blossom')})`}
              stroke="#DE8CA9"
              strokeWidth={1}
              strokeOpacity={0.7}
            />
          ))}
          {/* stamens */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <line x1={0} y1={0} x2={0} y2={-10.5} stroke="#FFF3D6" strokeWidth={1.15} strokeLinecap="round" />
              <circle cx={0} cy={-11.4} r={1.35} fill="#D8B47A" />
            </g>
          ))}
          <circle r={2.6} fill="#C85B79" />
        </g>
      );
      break;
    }
    case 'sunflower': {
      head = (
        <g transform="translate(60 42)">
          {bloomed && <Sparkles color="#F2CE6E" />}
          {Array.from({ length: 16 }).map((_, i) => (
            <ellipse
              key={i}
              transform={`rotate(${i * 22.5}) translate(0 -17)`}
              rx={5.1}
              ry={15}
              fill={`url(#${id('sunPetal')})`}
              stroke="#C89334"
              strokeWidth={0.7}
              strokeOpacity={0.6}
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              transform={`rotate(${i * 30 + 15}) translate(0 -12.5)`}
              rx={4.4}
              ry={10.5}
              fill="#E9B64C"
              stroke="#C89334"
              strokeWidth={0.6}
              strokeOpacity={0.55}
            />
          ))}
          <circle r={11.2} fill="#4A2E15" />
          <circle r={7.6} fill="#5F3D1F" />
          {[
            [-3.4, -2.2], [0, -3.8], [3.4, -2.2], [-4.6, 1.8], [-1.6, 1.2], [1.6, 1.2], [4.6, 1.8], [-2.4, 4.6], [1, 4.6],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.95} fill="#2E1C0C" />
          ))}
        </g>
      );
      break;
    }
    case 'heartFlower': {
      head = (
        <g transform="translate(60 40)">
          {bloomed && <Sparkles color="#FFC9D6" />}
          {/* heart bloom */}
          <path
            d="M0 15.5 C -21 4.5, -25 -11, -13.5 -16.5 C -6.5 -19.7, -0.8 -14.5, 0 -8.2 C 0.8 -14.5, 6.5 -19.7, 13.5 -16.5 C 25 -11, 21 4.5, 0 15.5 Z"
            fill={`url(#${id('heart')})`}
            stroke="#8C2E47"
            strokeWidth={1.3}
            strokeOpacity={0.65}
          />
          <path
            d="M-11 -7.5 C -13.5 -2, -10 4, -4.5 8.5"
            fill="none"
            stroke="#FFC9D6"
            strokeWidth={2}
            strokeLinecap="round"
            strokeOpacity={0.85}
          />
          {/* gold heart stamens */}
          {[-30, 0, 30].map((deg) => (
            <g key={deg} transform={`rotate(${deg})`}>
              <line x1={0} y1={-13} x2={0} y2={-19} stroke="#FFE9A8" strokeWidth={1.2} strokeLinecap="round" />
              <circle cx={0} cy={-19.8} r={1.3} fill="#D8B47A" />
            </g>
          ))}
        </g>
      );
      break;
    }
  }

  return (
    <svg
      viewBox={headOnly ? HEAD_VIEWBOX[kind] : '0 0 120 200'}
      className={className}
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id('stem')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7BA97B" />
          <stop offset="100%" stopColor="#486B48" />
        </linearGradient>
        <linearGradient id={id('leaf')} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#86B086" />
          <stop offset="100%" stopColor="#486B48" />
        </linearGradient>
        <linearGradient id={id('tulip')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7A8BC" />
          <stop offset="100%" stopColor="#DE7391" />
        </linearGradient>
        <radialGradient id={id('blossom')} cx="0.5" cy="0.42" r="0.72">
          <stop offset="0%" stopColor="#FDE3EC" />
          <stop offset="60%" stopColor="#FAC0D6" />
          <stop offset="100%" stopColor="#EFA6B6" />
        </radialGradient>
        <linearGradient id={id('sunPetal')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F8DE7A" />
          <stop offset="100%" stopColor="#E3A93E" />
        </linearGradient>
        <radialGradient id={id('heart')} cx="0.42" cy="0.32" r="0.85">
          <stop offset="0%" stopColor="#F488AC" />
          <stop offset="55%" stopColor="#DE5B87" />
          <stop offset="100%" stopColor="#A83D58" />
        </radialGradient>
      </defs>
      {!headOnly && stem}
      {head}
    </svg>
  );
}
