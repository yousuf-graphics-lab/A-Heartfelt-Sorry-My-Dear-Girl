/**
 * The bouquet itself — a kraft-wrapped still life drawn entirely in SVG.
 * The eight interactive blooms are layered on top by the scene.
 * viewBox: 0 0 500 620
 */
export default function BouquetArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 500 620" preserveAspectRatio="none" className={className} role="img" aria-label="A lush bouquet of roses wrapped in kraft paper">
      <defs>
        <radialGradient id="bq-glow" cx="0.5" cy="0.38" r="0.62">
          <stop offset="0%" stopColor="#FFE4CB" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#E9B3A8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#E9B3A8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bq-kraft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C79E6B" />
          <stop offset="45%" stopColor="#A87E4F" />
          <stop offset="100%" stopColor="#75522E" />
        </linearGradient>
        <linearGradient id="bq-kraft-flap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B98F5D" />
          <stop offset="100%" stopColor="#8A6238" />
        </linearGradient>
        <linearGradient id="bq-stem" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#58744A" />
          <stop offset="50%" stopColor="#46603F" />
          <stop offset="100%" stopColor="#35492E" />
        </linearGradient>
      </defs>

      {/* aura behind the blooms */}
      <ellipse cx="250" cy="168" rx="238" ry="205" fill="url(#bq-glow)" />

      {/* stems rising from the cone mouth */}
      <g stroke="url(#bq-stem)" strokeWidth={6} fill="none" strokeLinecap="round">
        <path d="M250 138 C 250 200, 250 262, 250 322" />
        <path d="M166 182 C 190 235, 214 280, 232 320" />
        <path d="M334 182 C 308 236, 288 280, 268 320" />
        <path d="M97 262 C 150 278, 190 300, 222 322" />
        <path d="M403 262 C 350 278, 310 300, 278 322" />
        <path d="M66 232 C 130 262, 175 292, 214 324" />
        <path d="M434 238 C 368 266, 322 296, 286 324" />
        <path d="M250 288 C 250 300, 250 312, 250 325" />
      </g>

      {/* eucalyptus branches arcing out of the bouquet */}
      <g stroke="#526B4B" strokeWidth={4.6} fill="none" strokeLinecap="round">
        <path d="M178 312 C 128 252, 96 168, 116 74" />
        <path d="M322 312 C 372 252, 404 168, 384 74" />
      </g>
      <g fill="#5F7A57">
        <ellipse cx="138" cy="242" rx="10" ry="5.5" transform="rotate(-38 138 242)" />
        <ellipse cx="118" cy="204" rx="10" ry="5.5" transform="rotate(-52 118 204)" />
        <ellipse cx="108" cy="163" rx="9.5" ry="5" transform="rotate(-64 108 163)" />
        <ellipse cx="104" cy="122" rx="9" ry="5" transform="rotate(-76 104 122)" />
        <ellipse cx="110" cy="92" rx="8" ry="4.6" transform="rotate(-80 110 92)" />
        <ellipse cx="152" cy="268" rx="10" ry="5.5" transform="rotate(-18 152 268)" />
        <ellipse cx="124" cy="228" rx="10" ry="5.5" transform="rotate(-46 124 228)" />
        <ellipse cx="114" cy="143" rx="9" ry="5" transform="rotate(-70 114 143)" />
      </g>
      <g fill="#75906B">
        <ellipse cx="158" cy="250" rx="9.5" ry="5" transform="rotate(-28 158 250)" />
        <ellipse cx="132" cy="190" rx="9.5" ry="5" transform="rotate(-58 132 190)" />
        <ellipse cx="110" cy="102" rx="8.4" ry="4.6" transform="rotate(-82 110 102)" />
        <ellipse cx="362" cy="242" rx="10" ry="5.5" transform="rotate(38 362 242)" />
        <ellipse cx="382" cy="204" rx="10" ry="5.5" transform="rotate(52 382 204)" />
        <ellipse cx="392" cy="163" rx="9.5" ry="5" transform="rotate(64 392 163)" />
        <ellipse cx="396" cy="122" rx="9" ry="5" transform="rotate(76 396 122)" />
        <ellipse cx="390" cy="92" rx="8" ry="4.6" transform="rotate(80 390 92)" />
        <ellipse cx="348" cy="268" rx="10" ry="5.5" transform="rotate(18 348 268)" />
        <ellipse cx="376" cy="228" rx="10" ry="5.5" transform="rotate(46 376 228)" />
        <ellipse cx="386" cy="143" rx="9" ry="5" transform="rotate(70 386 143)" />
      </g>

      {/* kraft cone — back rim in shadow */}
      <ellipse cx="250" cy="300" rx="124" ry="23" fill="#1D120B" />
      <ellipse cx="250" cy="300" rx="124" ry="23" fill="none" stroke="#6B4A30" strokeWidth={2} />

      {/* cone body */}
      <path
        d="M128 296 C 138 330, 168 424, 222 520 C 234 543, 266 543, 278 520 C 332 424, 362 330, 372 296 C 316 318, 184 318, 128 296 Z"
        fill="url(#bq-kraft)"
        stroke="#4E3420"
        strokeWidth={2.4}
        strokeOpacity={0.9}
      />
      {/* gold rim kiss on the mouth */}
      <ellipse cx="250" cy="296" rx="118" ry="19" fill="none" stroke="#D8B47A" strokeWidth={1.4} strokeOpacity={0.4} />

      {/* folded flaps + creases */}
      <path d="M128 296 C 190 316, 310 316, 372 296 C 340 305, 300 312, 250 312 C 200 312, 160 305, 128 296 Z" fill="url(#bq-kraft-flap)" opacity={0.85} />
      <path d="M152 308 C 190 380, 214 452, 234 512" fill="none" stroke="#4E3420" strokeWidth={3} strokeOpacity={0.32} strokeLinecap="round" />
      <path d="M348 308 C 310 380, 286 452, 266 512" fill="none" stroke="#4E3420" strokeWidth={3} strokeOpacity={0.32} strokeLinecap="round" />
      <path d="M250 322 L250 532" stroke="#3E2716" strokeWidth={2} strokeOpacity={0.28} />
      {/* paper speckle */}
      <g fill="#4E3420" opacity={0.2}>
        <ellipse cx="190" cy="380" rx="3.2" ry="1.6" transform="rotate(-20 190 380)" />
        <ellipse cx="300" cy="352" rx="2.6" ry="1.4" transform="rotate(12 300 352)" />
        <ellipse cx="232" cy="440" rx="3" ry="1.5" transform="rotate(-8 232 440)" />
        <ellipse cx="286" cy="470" rx="2.4" ry="1.3" transform="rotate(18 286 470)" />
        <ellipse cx="208" cy="500" rx="2.2" ry="1.2" transform="rotate(-14 208 500)" />
        <ellipse cx="318" cy="410" rx="2.4" ry="1.3" transform="rotate(24 318 410)" />
      </g>

      {/* twine — two wraps around the belly */}
      <path d="M168 380 C 222 397, 278 397, 332 380" fill="none" stroke="#3E2716" strokeWidth={8} strokeLinecap="round" />
      <path d="M172 400 C 222 416, 278 416, 328 400" fill="none" stroke="#2E1C10" strokeWidth={5} strokeLinecap="round" strokeOpacity={0.9} />
      {/* the twine bow */}
      <ellipse cx="216" cy="382" rx="23" ry="9" transform="rotate(-24 216 382)" fill="#4E331E" stroke="#2E1C10" strokeWidth={1.4} />
      <ellipse cx="284" cy="382" rx="23" ry="9" transform="rotate(24 284 382)" fill="#4E331E" stroke="#2E1C10" strokeWidth={1.4} />
      <circle cx="250" cy="384" r="8.6" fill="#3E2716" />
      <circle cx="250" cy="384" r="3.2" fill="#5F4128" />
      <path d="M244 392 L 222 432 L 238 434 L 251 400 Z" fill="#4E331E" stroke="#2E1C10" strokeWidth={1.3} />
      <path d="M256 392 L 280 428 L 266 437 L 250 400 Z" fill="#452E1A" stroke="#2E1C10" strokeWidth={1.3} />

      {/* baby's breath tucked between the blooms */}
      <g fill="#FFEED2" opacity={0.95}>
        <circle cx="150" cy="118" r="2.6" />
        <circle cx="186" cy="79" r="2.3" />
        <circle cx="224" cy="54" r="2.5" />
        <circle cx="276" cy="58" r="2.3" />
        <circle cx="322" cy="63" r="2.5" />
        <circle cx="356" cy="88" r="2.3" />
        <circle cx="398" cy="118" r="2.6" />
        <circle cx="124" cy="192" r="2.3" />
        <circle cx="96" cy="240" r="2.2" />
        <circle cx="212" cy="107" r="2.4" />
        <circle cx="291" cy="102" r="2.4" />
        <circle cx="378" cy="152" r="2.2" />
        <circle cx="168" cy="212" r="2.3" />
        <circle cx="333" cy="215" r="2.3" />
        <circle cx="250" cy="82" r="2.2" />
        <circle cx="418" cy="190" r="2.2" />
        <circle cx="140" cy="158" r="2" />
        <circle cx="414" cy="145" r="2" />
      </g>
      {/* hypericum berries */}
      <g fill="#8C2E47">
        <circle cx="156" cy="152" r="3.3" />
        <circle cx="366" cy="118" r="3.1" />
        <circle cx="231" cy="76" r="3" />
      </g>
      <g fill="#C86A82">
        <circle cx="155" cy="151" r="1" />
        <circle cx="365" cy="117" r="0.9" />
        <circle cx="230" cy="75" r="0.9" />
      </g>

      {/* soft pool of shadow beneath the bouquet */}
      <ellipse cx="250" cy="566" rx="152" ry="12" fill="#000000" opacity={0.45} />
    </svg>
  );
}
