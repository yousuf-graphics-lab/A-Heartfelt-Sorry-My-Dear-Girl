interface OrnateFrameProps {
  className?: string;
}

/** Hand-inked double frame with corner flourishes — the storybook illustration border. */
export default function OrnateFrame({ className = '' }: OrnateFrameProps) {
  const corner = (
    <g fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M1.5 34 C 1.5 12, 12 1.5, 34 1.5" strokeWidth={4.6} />
      <path d="M1.5 20 C 7.5 17.5, 17.5 7.5, 20 1.5" strokeWidth={2.2} opacity={0.75} />
      <circle cx={8.5} cy={8.5} r={2.1} fill="currentColor" stroke="none" opacity={0.85} />
    </g>
  );
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" className={className}>
      {/* outer ink rule + inner dashed stitch */}
      <rect x={2} y={2} width={96} height={96} fill="none" stroke="currentColor" strokeWidth={1.5} opacity={0.95} vectorEffect="non-scaling-stroke" />
      <rect x={5.6} y={5.6} width={88.8} height={88.8} fill="none" stroke="currentColor" strokeWidth={0.8} strokeDasharray="2.6 2.2" opacity={0.6} vectorEffect="non-scaling-stroke" />
      <g transform="translate(2 2)">{corner}</g>
      <g transform="translate(98 2) scale(-1 1)">{corner}</g>
      <g transform="translate(2 98) scale(1 -1)">{corner}</g>
      <g transform="translate(98 98) scale(-1 -1)">{corner}</g>
    </svg>
  );
}
