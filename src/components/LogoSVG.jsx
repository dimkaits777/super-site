import { useId } from 'react';

/**
 * Brand logo «КОКОС» — gold ring, palm frond, coffee branch with cherries and
 * two coconut "О" letters. Vector, so it stays crisp at any size.
 * (Adapted and cleaned up from the original brand artwork.)
 */
export function LogoSVG({ className = 'w-72 h-72', showText = true, isDarkBg = false }) {
  const brandColor = isDarkBg ? '#FAF9F6' : '#2A1710';
  const uid = useId().replace(/:/g, '');
  const goldRing = `gold-${uid}`;
  const shell = `shell-${uid}`;
  const meat = `meat-${uid}`;
  const leaf = `leaf-${uid}`;
  const palm = `palm-${uid}`;
  const shadow = `shadow-${uid}`;

  return (
    <svg
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Логотип Кокос — кав'ярня-кондитерська"
    >
      <defs>
        <linearGradient id={goldRing} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1D0" />
          <stop offset="35%" stopColor="#C29D5A" />
          <stop offset="70%" stopColor="#8C6627" />
          <stop offset="100%" stopColor="#DFC18F" />
        </linearGradient>
        <linearGradient id={shell} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5C341A" />
          <stop offset="50%" stopColor="#3F210F" />
          <stop offset="100%" stopColor="#251206" />
        </linearGradient>
        <linearGradient id={meat} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="85%" stopColor="#F5F5EC" />
          <stop offset="100%" stopColor="#DFDFD5" />
        </linearGradient>
        <linearGradient id={leaf} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2E6139" />
          <stop offset="100%" stopColor="#142E1B" />
        </linearGradient>
        <linearGradient id={palm} x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#4A8C42" />
          <stop offset="100%" stopColor="#2B5926" />
        </linearGradient>
        <filter id={shadow} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>

      <g filter={`url(#${shadow})`}>
        {/* Golden ring */}
        <circle cx="250" cy="250" r="185" fill="none" stroke={`url(#${goldRing})`} strokeWidth="6" strokeLinecap="round" />
        <circle cx="250" cy="250" r="179" fill="none" stroke={`url(#${goldRing})`} strokeWidth="1.2" strokeOpacity="0.6" strokeDasharray="4,6" />

        {/* Palm frond (top-right) */}
        <g>
          <path d="M245 105 C 310 95, 395 140, 440 220" fill="none" stroke={`url(#${palm})`} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M260 102 C255 70, 240 50, 235 45 C244 55, 260 80, 266 101" fill={`url(#${palm})`} />
          <path d="M278 100 C280 65, 270 42, 265 35 C275 48, 284 75, 284 99" fill={`url(#${palm})`} />
          <path d="M298 101 C310 68, 305 45, 302 38 C310 50, 314 78, 308 102" fill={`url(#${palm})`} />
          <path d="M318 105 C338 75, 338 52, 335 44 C342 58, 340 85, 328 108" fill={`url(#${palm})`} />
          <path d="M338 111 C365 85, 368 62, 366 54 C372 68, 368 95, 348 115" fill={`url(#${palm})`} />
          <path d="M358 120 C390 98, 398 78, 396 70 C400 84, 392 108, 368 126" fill={`url(#${palm})`} />
          <path d="M378 132 C415 115, 424 95, 423 88 C426 102, 414 125, 388 139" fill={`url(#${palm})`} />
          <path d="M396 148 C435 135, 446 118, 446 110 C447 124, 432 144, 404 156" fill={`url(#${palm})`} />
          <path d="M412 166 C455 158, 465 142, 466 135 C466 148, 448 167, 420 175" fill={`url(#${palm})`} />
          <path d="M425 186 C468 185, 478 172, 479 165 C478 176, 458 191, 432 195" fill={`url(#${palm})`} />
          <path d="M435 208 C474 212, 483 202, 483 195 C480 204, 460 215, 441 214" fill={`url(#${palm})`} />
        </g>

        {/* Coffee branch with cherries (bottom-left) */}
        <g>
          <path d="M170 380 C 130 385, 95 340, 75 285" fill="none" stroke="#4E3323" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M110 330 C 60 320, 45 280, 40 250 C 60 270, 90 290, 110 330" fill={`url(#${leaf})`} stroke="#112918" strokeWidth="1" />
          <path d="M150 365 C 100 375, 60 360, 50 320 C 75 330, 115 340, 150 365" fill={`url(#${leaf})`} stroke="#112918" strokeWidth="1" />
          <path d="M165 340 C 140 300, 110 270, 80 260 C 110 280, 145 310, 165 340" fill={`url(#${leaf})`} stroke="#112918" strokeWidth="1" />
          <circle cx="104" cy="318" r="11" fill="#9C1A1A" stroke="#5E0F0F" strokeWidth="1" />
          <circle cx="118" cy="310" r="12" fill="#B52222" stroke="#6E1111" strokeWidth="1" />
          <circle cx="98" cy="298" r="10" fill="#841212" stroke="#4D0707" strokeWidth="1" />
          <circle cx="120" cy="296" r="10.5" fill="#D4A12B" stroke="#876211" strokeWidth="1" />
          <circle cx="110" cy="286" r="9" fill="#7FA827" stroke="#4D6B11" strokeWidth="1" />
          <circle cx="100" cy="285" r="9.5" fill="#A87427" stroke="#664311" strokeWidth="1" />
        </g>

        {/* Wordmark «КОКОС» */}
        <g>
          {/* К (left) */}
          <path d="M 120 280 L 120 220" stroke={brandColor} strokeWidth="9" strokeLinecap="square" />
          <path d="M 120 250 L 158 220" stroke={brandColor} strokeWidth="8.5" strokeLinecap="square" />
          <path d="M 132 240 L 165 280" stroke={brandColor} strokeWidth="9" strokeLinecap="square" />

          {/* О #1 — coconut */}
          <g transform="translate(178, 215)">
            <circle cx="34" cy="35" r="33" fill={`url(#${shell})`} stroke="#1F0E05" strokeWidth="2.5" />
            <circle cx="34" cy="35" r="26.5" fill="#C5AA92" />
            <circle cx="34" cy="35" r="23" fill="#DFD2C4" />
            <circle cx="34" cy="35" r="21" fill={`url(#${meat})`} />
            <circle cx="34" cy="35" r="11" fill="#EAE8E0" />
          </g>

          {/* К (middle) */}
          <g transform="translate(133, 0)">
            <path d="M 120 280 L 120 220" stroke={brandColor} strokeWidth="9" strokeLinecap="square" />
            <path d="M 120 250 L 158 220" stroke={brandColor} strokeWidth="8.5" strokeLinecap="square" />
            <path d="M 132 240 L 165 280" stroke={brandColor} strokeWidth="9" strokeLinecap="square" />
          </g>

          {/* О #2 — coconut */}
          <g transform="translate(312, 215)">
            <circle cx="34" cy="35" r="33" fill={`url(#${shell})`} stroke="#1F0E05" strokeWidth="2.5" />
            <circle cx="34" cy="35" r="26.5" fill="#C5AA92" />
            <circle cx="34" cy="35" r="23" fill="#DFD2C4" />
            <circle cx="34" cy="35" r="21" fill={`url(#${meat})`} />
            <circle cx="34" cy="35" r="11" fill="#EAE8E0" />
          </g>

          {/* С (right) */}
          <path d="M 432 230 C 418 215, 388 215, 384 250 C 380 282, 412 285, 432 270" fill="none" stroke={brandColor} strokeWidth="9" strokeLinecap="round" />
        </g>

        {/* Subtitle */}
        {showText && (
          <g>
            <line x1="80" y1="315" x2="160" y2="315" stroke={`url(#${goldRing})`} strokeWidth="1.5" strokeOpacity="0.8" />
            <text x="250" y="320" fill={brandColor} fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontSize="12.5" fontWeight="700" letterSpacing="7" textAnchor="middle">
              КАВ'ЯРНЯ • КОНДИТЕРСЬКА
            </text>
            <text x="250" y="337" fill="#C29D5A" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" fontWeight="500" letterSpacing="2.5" textAnchor="middle">
              EST. 2024 • ЖИТОМИР
            </text>
            <line x1="340" y1="315" x2="420" y2="315" stroke={`url(#${goldRing})`} strokeWidth="1.5" strokeOpacity="0.8" />
          </g>
        )}
      </g>
    </svg>
  );
}
