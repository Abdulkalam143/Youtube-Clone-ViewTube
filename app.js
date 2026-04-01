/**
 * ViewTube — app.js
 * Vanilla JS, no libraries, fully featured YouTube-like UI
 */

'use strict';

/* ══════════════════════════════════════════
   DUMMY DATA
══════════════════════════════════════════ */
const CATEGORIES = ['all','music','gaming','news','tech','sports','cooking','education','travel','comedy'];

const CHANNELS = [
  { id: 'c1', name: 'MrBeast', avatar: '#e53935', initials: 'MB', subs: '232M subscribers', verified: true },
  { id: 'c2', name: 'Linus Tech Tips', avatar: '#8e24aa', initials: 'LT', subs: '15.8M subscribers', verified: true },
  { id: 'c3', name: 'Veritasium', avatar: '#00897b', initials: 'VR', subs: '14.2M subscribers', verified: true },
  { id: 'c4', name: 'Kurzgesagt', avatar: '#f4511e', initials: 'KZ', subs: '21.5M subscribers', verified: true },
  { id: 'c5', name: 'Mark Rober', avatar: '#1e88e5', initials: 'MR', subs: '48.2M subscribers', verified: true },
  { id: 'c6', name: 'Nat Geo', avatar: '#ffb300', initials: 'NG', subs: '8.7M subscribers', verified: true },
  { id: 'c7', name: 'TechLinked', avatar: '#43a047', initials: 'TL', subs: '3.1M subscribers', verified: false },
  { id: 'c8', name: 'Fireship', avatar: '#d81b60', initials: 'FS', subs: '2.9M subscribers', verified: true },
  { id: 'c9', name: 'MKBHD', avatar: '#455a64', initials: 'MK', subs: '18.6M subscribers', verified: true },
  { id: 'c10', name: 'The Coding Train', avatar: '#6d4c41', initials: 'CT', subs: '1.4M subscribers', verified: false },
];

// ── SVG THUMBNAIL DESIGNS ─────────────────────────────────────────────────────
// Each returns a full inline SVG string (16:9, 480×270 viewBox)
const THUMBNAILS = [

  // 0 — Space / Black Hole
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <radialGradient id="t0bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#0d0221"/>
        <stop offset="100%" stop-color="#000510"/>
      </radialGradient>
      <radialGradient id="t0hole" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#000000"/>
        <stop offset="60%" stop-color="#1a0030" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#ff6b35" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="t0glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ff6b35" stop-opacity="0.9"/>
        <stop offset="40%" stop-color="#ff006e" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#7400b8" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t0bg)"/>
    <!-- Stars -->
    <circle cx="40" cy="30" r="1" fill="white" opacity="0.8"/>
    <circle cx="120" cy="15" r="1.5" fill="white" opacity="0.6"/>
    <circle cx="200" cy="45" r="1" fill="white" opacity="0.9"/>
    <circle cx="350" cy="20" r="1" fill="white" opacity="0.7"/>
    <circle cx="430" cy="50" r="1.5" fill="white" opacity="0.5"/>
    <circle cx="60" cy="200" r="1" fill="white" opacity="0.6"/>
    <circle cx="400" cy="220" r="1" fill="white" opacity="0.8"/>
    <circle cx="450" cy="140" r="1" fill="white" opacity="0.5"/>
    <circle cx="30" cy="130" r="1.5" fill="white" opacity="0.7"/>
    <circle cx="310" cy="240" r="1" fill="white" opacity="0.6"/>
    <circle cx="160" cy="250" r="1" fill="white" opacity="0.4"/>
    <!-- Accretion glow -->
    <ellipse cx="240" cy="135" rx="130" ry="30" fill="#ff6b35" opacity="0.15"/>
    <ellipse cx="240" cy="135" rx="90" ry="18" fill="#ff006e" opacity="0.2"/>
    <!-- Black hole glow ring -->
    <circle cx="240" cy="135" r="100" fill="url(#t0glow)" opacity="0.7"/>
    <!-- Black hole core -->
    <circle cx="240" cy="135" r="60" fill="url(#t0hole)"/>
    <circle cx="240" cy="135" r="42" fill="#000"/>
    <!-- Bright arc -->
    <path d="M 160 110 A 80 80 0 0 1 320 110" stroke="#fff8e1" stroke-width="3" fill="none" opacity="0.6"/>
    <!-- Label -->
    <rect x="16" y="220" width="180" height="34" rx="4" fill="rgba(0,0,0,0.6)"/>
    <text x="26" y="241" font-family="Arial Black,sans-serif" font-size="13" font-weight="900" fill="white">BLACK HOLES</text>
    <text x="26" y="252" font-family="Arial,sans-serif" font-size="9" fill="#aaa">EXPLAINED IN 10 MIN</text>
  </svg>`,

  // 1 — Tech / Circuit
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t1bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a0a0f"/>
        <stop offset="100%" stop-color="#001a33"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t1bg)"/>
    <!-- Circuit lines -->
    <g stroke="#00d4ff" stroke-width="1.5" fill="none" opacity="0.35">
      <polyline points="0,60 80,60 80,100 160,100"/>
      <polyline points="160,100 220,100 220,60 300,60 300,30 480,30"/>
      <polyline points="0,150 60,150 60,200 140,200 140,150 240,150"/>
      <polyline points="240,150 240,190 360,190 360,150 480,150"/>
      <polyline points="300,60 300,130 380,130 380,90 480,90"/>
      <polyline points="140,200 140,240 480,240"/>
    </g>
    <!-- Circuit nodes -->
    <g fill="#00d4ff" opacity="0.7">
      <circle cx="80" cy="60" r="4"/><circle cx="160" cy="100" r="4"/>
      <circle cx="220" cy="100" r="4"/><circle cx="300" cy="60" r="4"/>
      <circle cx="60" cy="150" r="4"/><circle cx="140" cy="200" r="4"/>
      <circle cx="240" cy="150" r="4"/><circle cx="360" cy="190" r="4"/>
      <circle cx="300" cy="130" r="4"/><circle cx="380" cy="130" r="4"/>
    </g>
    <!-- GPU chip -->
    <rect x="168" y="88" width="144" height="94" rx="8" fill="#001a33" stroke="#00d4ff" stroke-width="2"/>
    <rect x="180" y="100" width="120" height="70" rx="4" fill="#002244"/>
    <text x="240" y="131" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="14" font-weight="900" fill="#00d4ff">GPU</text>
    <text x="240" y="147" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#4fc3f7">RTX 9090 Ti</text>
    <!-- Chip pins -->
    <g fill="#00d4ff" opacity="0.6">
      <rect x="168" y="108" width="8" height="3" rx="1"/><rect x="168" y="118" width="8" height="3" rx="1"/>
      <rect x="168" y="128" width="8" height="3" rx="1"/><rect x="168" y="138" width="8" height="3" rx="1"/>
      <rect x="168" y="148" width="8" height="3" rx="1"/>
      <rect x="304" y="108" width="8" height="3" rx="1"/><rect x="304" y="118" width="8" height="3" rx="1"/>
      <rect x="304" y="128" width="8" height="3" rx="1"/><rect x="304" y="138" width="8" height="3" rx="1"/>
      <rect x="304" y="148" width="8" height="3" rx="1"/>
    </g>
    <!-- Glow -->
    <rect x="168" y="88" width="144" height="94" rx="8" fill="none" stroke="#00d4ff" stroke-width="6" opacity="0.1"/>
    <!-- Label -->
    <rect x="16" y="220" width="200" height="34" rx="4" fill="rgba(0,0,0,0.7)"/>
    <text x="26" y="241" font-family="Arial Black,sans-serif" font-size="13" font-weight="900" fill="white">THIS GPU CHANGED</text>
    <text x="26" y="252" font-family="Arial,sans-serif" font-size="9" fill="#00d4ff">EVERYTHING ABOUT GAMING</text>
  </svg>`,

  // 2 — Food / Cooking
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t2bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1a0a00"/>
        <stop offset="50%" stop-color="#2d1200"/>
        <stop offset="100%" stop-color="#0d0500"/>
      </linearGradient>
      <radialGradient id="t2fire" cx="50%" cy="80%" r="60%">
        <stop offset="0%" stop-color="#ff6b00" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#ff6b00" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t2bg)"/>
    <!-- Warm glow from below -->
    <ellipse cx="240" cy="270" rx="200" ry="80" fill="url(#t2fire)"/>
    <!-- Plate -->
    <ellipse cx="240" cy="185" rx="120" ry="22" fill="#1a1a1a" stroke="#333" stroke-width="2"/>
    <ellipse cx="240" cy="180" rx="105" ry="18" fill="#222"/>
    <!-- Food items on plate -->
    <ellipse cx="240" cy="175" rx="70" ry="12" fill="#8B4513"/>
    <ellipse cx="215" cy="170" rx="25" ry="10" fill="#a0522d"/>
    <ellipse cx="255" cy="168" rx="20" ry="9" fill="#cd853f"/>
    <!-- Sauce drizzle -->
    <path d="M 200 165 Q 220 155 240 168 Q 255 158 275 163" stroke="#ff4500" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Steam -->
    <g stroke="rgba(255,255,255,0.25)" stroke-width="2" fill="none" stroke-linecap="round">
      <path d="M 200 150 Q 205 135 200 120"><animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/></path>
      <path d="M 230 145 Q 235 128 230 112"><animate attributeName="opacity" values="0;0.4;0" dur="2.5s" repeatCount="indefinite"/></path>
      <path d="M 260 148 Q 265 132 260 116"><animate attributeName="opacity" values="0.4;0;0.4" dur="1.8s" repeatCount="indefinite"/></path>
    </g>
    <!-- Fork -->
    <g transform="translate(340,130) rotate(-30)">
      <rect x="-2" y="-60" width="4" height="80" rx="2" fill="#c0c0c0"/>
      <rect x="-8" y="-60" width="2" height="24" rx="1" fill="#c0c0c0"/>
      <rect x="-4" y="-60" width="2" height="24" rx="1" fill="#c0c0c0"/>
      <rect x="2" y="-60" width="2" height="24" rx="1" fill="#c0c0c0"/>
      <rect x="6" y="-60" width="2" height="24" rx="1" fill="#c0c0c0"/>
    </g>
    <!-- Title banner -->
    <rect x="0" y="0" width="480" height="60" fill="rgba(0,0,0,0.5)"/>
    <text x="240" y="25" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="18" font-weight="900" fill="#ff8c00">RECIPE</text>
    <text x="240" y="48" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="13" font-weight="700" fill="white">MASTERY SERIES</text>
    <!-- Stars rating -->
    <text x="240" y="220" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#ffd700">★★★★★</text>
  </svg>`,

  // 3 — Gaming
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t3bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0d001a"/>
        <stop offset="100%" stop-color="#001a00"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t3bg)"/>
    <!-- Grid floor -->
    <g stroke="#00ff41" stroke-width="0.5" opacity="0.2">
      <line x1="0" y1="270" x2="240" y2="160"/><line x1="60" y1="270" x2="270" y2="160"/>
      <line x1="120" y1="270" x2="300" y2="160"/><line x1="180" y1="270" x2="330" y2="160"/>
      <line x1="240" y1="270" x2="360" y2="160"/><line x1="300" y1="270" x2="390" y2="160"/>
      <line x1="360" y1="270" x2="420" y2="160"/><line x1="420" y1="270" x2="480" y2="160"/>
      <line x1="0" y1="200" x2="480" y2="200"/><line x1="0" y1="220" x2="480" y2="220"/>
      <line x1="0" y1="240" x2="480" y2="240"/><line x1="0" y1="260" x2="480" y2="260"/>
    </g>
    <!-- Controller -->
    <g transform="translate(240,120)">
      <!-- Body -->
      <path d="M -80 -20 Q -90 -40 -60 -50 L -20 -50 L 0 -40 L 20 -50 L 60 -50 Q 90 -40 80 -20 L 60 30 Q 40 50 20 45 L -20 45 Q -40 50 -60 30 Z" fill="#1a1a2e" stroke="#7c3aed" stroke-width="2"/>
      <!-- Left stick -->
      <circle cx="-40" cy="-5" r="16" fill="#0f0f23" stroke="#4c1d95" stroke-width="1.5"/>
      <circle cx="-40" cy="-5" r="8" fill="#7c3aed"/>
      <!-- Right stick -->
      <circle cx="15" cy="15" r="16" fill="#0f0f23" stroke="#4c1d95" stroke-width="1.5"/>
      <circle cx="15" cy="15" r="8" fill="#7c3aed"/>
      <!-- D-pad -->
      <rect x="-65" y="5" width="30" height="10" rx="2" fill="#2d1b69"/>
      <rect x="-55" y="-5" width="10" height="30" rx="2" fill="#2d1b69"/>
      <!-- Buttons -->
      <circle cx="48" cy="-15" r="8" fill="#16a34a" opacity="0.9"/>
      <circle cx="62" cy="-2" r="8" fill="#dc2626" opacity="0.9"/>
      <circle cx="34" cy="-2" r="8" fill="#2563eb" opacity="0.9"/>
      <circle cx="48" cy="11" r="8" fill="#d97706" opacity="0.9"/>
      <!-- Button letters -->
      <text x="48" y="-11" text-anchor="middle" font-size="8" font-weight="bold" fill="white">Y</text>
      <text x="66" y="2" text-anchor="middle" font-size="8" font-weight="bold" fill="white">B</text>
      <text x="30" y="2" text-anchor="middle" font-size="8" font-weight="bold" fill="white">X</text>
      <text x="48" y="15" text-anchor="middle" font-size="8" font-weight="bold" fill="white">A</text>
    </g>
    <!-- Neon glow title -->
    <text x="240" y="240" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="22" font-weight="900" fill="#00ff41" filter="url(#glow)">GAMING SETUP 2024</text>
    <text x="240" y="258" text-anchor="middle" font-family="Arial,sans-serif" font-size="11" fill="#7c3aed">ULTIMATE GUIDE</text>
  </svg>`,

  // 4 — MrBeast Challenge
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t4bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7f1d1d"/>
        <stop offset="50%" stop-color="#1c1917"/>
        <stop offset="100%" stop-color="#172554"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t4bg)"/>
    <!-- Money rain -->
    <g font-family="Arial,sans-serif" font-size="20" fill="#22c55e" opacity="0.15">
      <text x="20" y="50">$</text><text x="80" y="90">$</text><text x="140" y="40">$</text>
      <text x="350" y="70">$</text><text x="410" y="50">$</text><text x="440" y="100">$</text>
      <text x="30" y="220">$</text><text x="420" y="230">$</text>
    </g>
    <!-- Dollar bills stacked -->
    <g transform="translate(100,140)">
      <rect x="-50" y="-25" width="100" height="50" rx="4" fill="#166534" stroke="#22c55e" stroke-width="1.5" opacity="0.9"/>
      <rect x="-45" y="-30" width="100" height="50" rx="4" fill="#15803d" stroke="#22c55e" stroke-width="1" opacity="0.8"/>
      <rect x="-40" y="-35" width="100" height="50" rx="4" fill="#166534" stroke="#4ade80" stroke-width="1.5"/>
      <text x="10" y="-5" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="16" font-weight="900" fill="#4ade80">$100K</text>
    </g>
    <!-- VS text -->
    <text x="240" y="145" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="48" font-weight="900" fill="white" opacity="0.9">VS</text>
    <!-- $1 side -->
    <g transform="translate(370,140)">
      <rect x="-50" y="-35" width="100" height="50" rx="4" fill="#166534" stroke="#4ade80" stroke-width="1.5"/>
      <text x="0" y="-5" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="#4ade80">$1</text>
    </g>
    <!-- Top banner -->
    <rect x="0" y="0" width="480" height="55" fill="rgba(0,0,0,0.6)"/>
    <text x="240" y="20" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="11" fill="#ef4444">⚡ MRBEAST CHALLENGE ⚡</text>
    <text x="240" y="44" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="white">$1 vs $100,000</text>
    <!-- Exclamation marks -->
    <text x="30" y="160" font-family="Arial Black,sans-serif" font-size="60" fill="#ef4444" opacity="0.3">!</text>
    <text x="420" y="160" font-family="Arial Black,sans-serif" font-size="60" fill="#ef4444" opacity="0.3">!</text>
  </svg>`,

  // 5 — Science / DNA
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t5bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#001a3d"/>
        <stop offset="100%" stop-color="#000d1a"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t5bg)"/>
    <!-- DNA helix left -->
    <g transform="translate(100,135)" stroke-width="2.5" fill="none">
      <path d="M -20,-120 C 30,-100 -30,-60 20,-40 C 70,-20 -20,20 30,40 C 80,60 -10,100 40,120" stroke="#3b82f6" opacity="0.8"/>
      <path d="M 20,-120 C -30,-100 30,-60 -20,-40 C -70,-20 20,20 -30,40 C -80,60 10,100 -40,120" stroke="#06b6d4" opacity="0.8"/>
      <!-- Rungs -->
      <g stroke="#7dd3fc" stroke-width="1.5" opacity="0.6">
        <line x1="-16" y1="-108" x2="16" y2="-112"/>
        <line x1="18" y1="-80" x2="-18" y2="-82"/>
        <line x1="-12" y1="-52" x2="12" y2="-56"/>
        <line x1="16" y1="-24" x2="-16" y2="-26"/>
        <line x1="-10" y1="4" x2="10" y2="2"/>
        <line x1="14" y1="32" x2="-14" y2="30"/>
        <line x1="-8" y1="60" x2="8" y2="58"/>
        <line x1="12" y1="88" x2="-12" y2="86"/>
        <line x1="-6" y1="116" x2="6" y2="114"/>
      </g>
    </g>
    <!-- Atom center -->
    <circle cx="280" cy="135" r="24" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
    <circle cx="280" cy="135" r="10" fill="#3b82f6"/>
    <!-- Electron orbits -->
    <ellipse cx="280" cy="135" rx="60" ry="20" fill="none" stroke="#06b6d4" stroke-width="1.5" opacity="0.5"/>
    <ellipse cx="280" cy="135" rx="60" ry="20" fill="none" stroke="#06b6d4" stroke-width="1.5" opacity="0.5" transform="rotate(60,280,135)"/>
    <ellipse cx="280" cy="135" rx="60" ry="20" fill="none" stroke="#06b6d4" stroke-width="1.5" opacity="0.5" transform="rotate(120,280,135)"/>
    <!-- Electrons -->
    <circle cx="340" cy="135" r="5" fill="#06b6d4"/>
    <circle cx="250" cy="118" r="5" fill="#06b6d4"/>
    <circle cx="250" cy="152" r="5" fill="#06b6d4"/>
    <!-- Label -->
    <rect x="0" y="220" width="480" height="50" fill="rgba(0,0,20,0.8)"/>
    <text x="240" y="243" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="14" font-weight="900" fill="white">THE SCIENCE OF EVERYTHING</text>
    <text x="240" y="260" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#06b6d4">QUANTUM PHYSICS EXPLAINED SIMPLY</text>
  </svg>`,

  // 6 — Travel / Landscape
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t6sky" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0c4a6e"/>
        <stop offset="60%" stop-color="#f97316"/>
        <stop offset="100%" stop-color="#fbbf24"/>
      </linearGradient>
      <linearGradient id="t6mt" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t6sky)"/>
    <!-- Sun -->
    <circle cx="240" cy="115" r="38" fill="#fbbf24" opacity="0.9"/>
    <circle cx="240" cy="115" r="28" fill="#fef08a"/>
    <!-- Sun rays -->
    <g stroke="#fbbf24" stroke-width="2" opacity="0.5">
      <line x1="240" y1="65" x2="240" y2="50"/><line x1="240" y1="165" x2="240" y2="180"/>
      <line x1="190" y1="115" x2="175" y2="115"/><line x1="290" y1="115" x2="305" y2="115"/>
      <line x1="204" y1="79" x2="194" y2="69"/><line x1="276" y1="151" x2="286" y2="161"/>
      <line x1="276" y1="79" x2="286" y2="69"/><line x1="204" y1="151" x2="194" y2="161"/>
    </g>
    <!-- Mountains back -->
    <polygon points="0,270 0,170 80,100 160,150 240,80 320,140 400,90 480,140 480,270" fill="#1e293b" opacity="0.7"/>
    <!-- Mountains front -->
    <polygon points="0,270 0,200 60,150 140,180 220,130 300,165 380,120 480,160 480,270" fill="#0f172a"/>
    <!-- Snow caps -->
    <polygon points="220,130 240,110 260,130 250,140 230,140" fill="white" opacity="0.9"/>
    <polygon points="378,120 395,100 412,118 405,128 386,128" fill="white" opacity="0.7"/>
    <!-- Water reflection -->
    <rect x="0" y="230" width="480" height="40" fill="#0c4a6e" opacity="0.6"/>
    <ellipse cx="240" cy="245" rx="30" ry="8" fill="#fbbf24" opacity="0.3"/>
    <!-- Title -->
    <rect x="0" y="0" width="480" height="45" fill="rgba(0,0,0,0.5)"/>
    <text x="240" y="18" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#fbbf24" letter-spacing="4">✈ TRAVEL VLOG</text>
    <text x="240" y="38" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="16" font-weight="900" fill="white">EVERY COUNTRY IN THE WORLD</text>
  </svg>`,

  // 7 — Programming / Code
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t7bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0d1117"/>
        <stop offset="100%" stop-color="#161b22"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t7bg)"/>
    <!-- Code editor window -->
    <rect x="40" y="30" width="400" height="210" rx="10" fill="#1e2433" stroke="#30363d" stroke-width="1.5"/>
    <!-- Title bar -->
    <rect x="40" y="30" width="400" height="28" rx="10" fill="#252d3d"/>
    <rect x="40" y="44" width="400" height="14" fill="#252d3d"/>
    <circle cx="60" cy="44" r="5" fill="#ff5f57"/><circle cx="78" cy="44" r="5" fill="#febc2e"/><circle cx="96" cy="44" r="5" fill="#28c840"/>
    <text x="240" y="49" text-anchor="middle" font-family="monospace" font-size="9" fill="#8b949e">app.js — ViewTube</text>
    <!-- Line numbers -->
    <g font-family="monospace" font-size="11" fill="#484f58">
      <text x="58" y="80">1</text><text x="58" y="96">2</text><text x="58" y="112">3</text>
      <text x="58" y="128">4</text><text x="58" y="144">5</text><text x="58" y="160">6</text>
      <text x="58" y="176">7</text><text x="58" y="192">8</text><text x="58" y="208">9</text>
    </g>
    <!-- Code lines -->
    <g font-family="monospace" font-size="11">
      <text x="78" y="80"><tspan fill="#ff7b72">const</tspan><tspan fill="#e6edf3"> buildApp </tspan><tspan fill="#ff7b72">=</tspan><tspan fill="#e6edf3"> () </tspan><tspan fill="#ff7b72">=&gt;</tspan><tspan fill="#e6edf3"> {"{" }</tspan></text>
      <text x="78" y="96"><tspan fill="#8b949e">  // </tspan><tspan fill="#8b949e">Initialize everything</tspan></text>
      <text x="78" y="112"><tspan fill="#e6edf3">  </tspan><tspan fill="#79c0ff">const</tspan><tspan fill="#e6edf3"> state </tspan><tspan fill="#ff7b72">=</tspan><tspan fill="#e6edf3"> createState();</tspan></text>
      <text x="78" y="128"><tspan fill="#e6edf3">  </tspan><tspan fill="#d2a8ff">render</tspan><tspan fill="#e6edf3">(state);</tspan></text>
      <text x="78" y="144"><tspan fill="#e6edf3">  </tspan><tspan fill="#d2a8ff">bindEvents</tspan><tspan fill="#e6edf3">(state);</tspan></text>
      <text x="78" y="160"><tspan fill="#79c0ff">  return</tspan><tspan fill="#e6edf3"> state;</tspan></text>
      <text x="78" y="176"><tspan fill="#e6edf3">{"}"}</tspan></text>
      <text x="78" y="192"><tspan fill="#e6edf3"> </tspan></text>
      <text x="78" y="208"><tspan fill="#d2a8ff">buildApp</tspan><tspan fill="#e6edf3">();</tspan></text>
    </g>
    <!-- Cursor blink -->
    <rect x="148" y="198" width="7" height="13" fill="#58a6ff" opacity="0.9">
      <animate attributeName="opacity" values="0.9;0;0.9" dur="1s" repeatCount="indefinite"/>
    </rect>
    <!-- Active line highlight -->
    <rect x="42" y="200" width="396" height="14" fill="#1f6feb" opacity="0.12" rx="2"/>
  </svg>`,

  // 8 — AI / Neural Network
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <radialGradient id="t8bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#1a0533"/>
        <stop offset="100%" stop-color="#050010"/>
      </radialGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t8bg)"/>
    <!-- Neural network connections -->
    <g stroke="#7c3aed" stroke-width="1" opacity="0.4">
      <!-- Layer 1 to 2 -->
      <line x1="100" y1="80" x2="200" y2="70"/><line x1="100" y1="80" x2="200" y2="110"/>
      <line x1="100" y1="80" x2="200" y2="150"/><line x1="100" y1="80" x2="200" y2="190"/>
      <line x1="100" y1="135" x2="200" y2="70"/><line x1="100" y1="135" x2="200" y2="110"/>
      <line x1="100" y1="135" x2="200" y2="150"/><line x1="100" y1="135" x2="200" y2="190"/>
      <line x1="100" y1="190" x2="200" y2="70"/><line x1="100" y1="190" x2="200" y2="110"/>
      <line x1="100" y1="190" x2="200" y2="150"/><line x1="100" y1="190" x2="200" y2="190"/>
      <!-- Layer 2 to 3 -->
      <line x1="200" y1="70" x2="310" y2="90"/><line x1="200" y1="70" x2="310" y2="135"/>
      <line x1="200" y1="70" x2="310" y2="180"/><line x1="200" y1="110" x2="310" y2="90"/>
      <line x1="200" y1="110" x2="310" y2="135"/><line x1="200" y1="110" x2="310" y2="180"/>
      <line x1="200" y1="150" x2="310" y2="90"/><line x1="200" y1="150" x2="310" y2="135"/>
      <line x1="200" y1="150" x2="310" y2="180"/><line x1="200" y1="190" x2="310" y2="90"/>
      <line x1="200" y1="190" x2="310" y2="135"/><line x1="200" y1="190" x2="310" y2="180"/>
      <!-- Layer 3 to 4 -->
      <line x1="310" y1="90" x2="390" y2="135"/><line x1="310" y1="135" x2="390" y2="135"/>
      <line x1="310" y1="180" x2="390" y2="135"/>
    </g>
    <!-- Nodes layer 1 -->
    <g fill="#7c3aed"><circle cx="100" cy="80" r="10"/><circle cx="100" cy="135" r="10"/><circle cx="100" cy="190" r="10"/></g>
    <!-- Nodes layer 2 -->
    <g fill="#8b5cf6"><circle cx="200" cy="70" r="10"/><circle cx="200" cy="110" r="10"/><circle cx="200" cy="150" r="10"/><circle cx="200" cy="190" r="10"/></g>
    <!-- Nodes layer 3 (active) -->
    <g fill="#a78bfa"><circle cx="310" cy="90" r="10"/><circle cx="310" cy="135" r="12"/><circle cx="310" cy="180" r="10"/></g>
    <!-- Glow on active node -->
    <circle cx="310" cy="135" r="20" fill="#7c3aed" opacity="0.3"/>
    <circle cx="310" cy="135" r="30" fill="#7c3aed" opacity="0.1"/>
    <!-- Output -->
    <circle cx="390" cy="135" r="14" fill="#c4b5fd" stroke="#7c3aed" stroke-width="2"/>
    <!-- AI text -->
    <text x="240" y="245" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="20" font-weight="900" fill="#a78bfa">CAN AI BEAT HUMANS?</text>
    <text x="240" y="262" text-anchor="middle" font-family="Arial,sans-serif" font-size="10" fill="#7c3aed">NEURAL NETWORK DEEP DIVE</text>
  </svg>`,

  // 9 — Money / Finance
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t9bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#052e16"/>
        <stop offset="100%" stop-color="#14532d"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t9bg)"/>
    <!-- Stock chart -->
    <polyline points="40,200 80,180 120,185 160,160 200,165 230,140 260,145 290,110 330,120 360,90 400,95 440,65" stroke="#4ade80" stroke-width="3" fill="none" stroke-linejoin="round"/>
    <!-- Chart fill -->
    <polygon points="40,200 80,180 120,185 160,160 200,165 230,140 260,145 290,110 330,120 360,90 400,95 440,65 440,220 40,220" fill="#4ade80" opacity="0.08"/>
    <!-- Grid -->
    <g stroke="rgba(255,255,255,0.08)" stroke-width="1">
      <line x1="40" y1="100" x2="440" y2="100"/><line x1="40" y1="140" x2="440" y2="140"/>
      <line x1="40" y1="180" x2="440" y2="180"/><line x1="40" y1="220" x2="440" y2="220"/>
    </g>
    <!-- Data points -->
    <g fill="#4ade80"><circle cx="290" cy="110" r="5"/><circle cx="440" cy="65" r="6"/></g>
    <!-- Price label -->
    <rect x="350" y="48" width="88" height="28" rx="4" fill="#166534"/>
    <text x="394" y="67" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="13" fill="#4ade80">▲ +8.3%</text>
    <!-- Top info -->
    <rect x="0" y="0" width="480" height="50" fill="rgba(0,0,0,0.5)"/>
    <text x="30" y="20" font-family="Arial Black,sans-serif" font-size="11" fill="#4ade80">💰 WEALTH BUILDER</text>
    <text x="30" y="40" font-family="Arial Black,sans-serif" font-size="16" font-weight="900" fill="white">HOW TO INVEST $1,000</text>
    <!-- Bottom numbers -->
    <g font-family="monospace" font-size="10" fill="#86efac">
      <text x="40" y="245">JAN</text><text x="120" y="245">MAR</text>
      <text x="200" y="245">MAY</text><text x="280" y="245">JUL</text>
      <text x="360" y="245">SEP</text><text x="420" y="245">NOV</text>
    </g>
  </svg>`,

  // 10 — Smartphone / Tech review
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t10bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#111827"/>
        <stop offset="100%" stop-color="#1f2937"/>
      </linearGradient>
      <linearGradient id="t10phone" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#374151"/>
        <stop offset="100%" stop-color="#1f2937"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t10bg)"/>
    <!-- Phone 1 (left) -->
    <rect x="110" y="35" width="90" height="185" rx="14" fill="url(#t10phone)" stroke="#4b5563" stroke-width="1.5"/>
    <rect x="117" y="50" width="76" height="140" rx="4" fill="#1a1a2e"/>
    <!-- Screen glow 1 -->
    <rect x="117" y="50" width="76" height="140" rx="4" fill="#3b82f6" opacity="0.15"/>
    <text x="155" y="105" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="11" fill="#93c5fd">$1</text>
    <text x="155" y="125" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#6b7280">Budget Phone</text>
    <!-- Camera notch 1 -->
    <circle cx="155" cy="58" r="4" fill="#374151"/>
    <!-- Phone 2 (right, premium) -->
    <rect x="280" y="25" width="95" height="200" rx="16" fill="#18181b" stroke="#71717a" stroke-width="2"/>
    <rect x="288" y="42" width="79" height="155" rx="5" fill="#09090b"/>
    <!-- Colorful screen -->
    <rect x="288" y="42" width="79" height="155" rx="5" fill="url(#t10bg)"/>
    <text x="327" y="100" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="11" fill="white">$</text>
    <text x="327" y="115" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="18" fill="white">100K</text>
    <text x="327" y="133" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#a1a1aa">Ultra Pro Max</text>
    <!-- Camera island -->
    <rect x="293" y="47" width="30" height="22" rx="8" fill="#18181b"/>
    <circle cx="303" cy="58" r="6" fill="#09090b" stroke="#3f3f46" stroke-width="1"/>
    <circle cx="315" cy="58" r="4" fill="#09090b" stroke="#3f3f46" stroke-width="1"/>
    <!-- VS label -->
    <rect x="218" y="110" width="44" height="32" rx="8" fill="#ef4444"/>
    <text x="240" y="132" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="16" font-weight="900" fill="white">VS</text>
    <!-- Bottom bar -->
    <rect x="0" y="230" width="480" height="40" fill="rgba(0,0,0,0.7)"/>
    <text x="240" y="255" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="14" font-weight="900" fill="white">BUDGET vs FLAGSHIP — WINNER?</text>
  </svg>`,

  // 11 — History / Documentary
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t11bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1c1008"/>
        <stop offset="60%" stop-color="#2d1a00"/>
        <stop offset="100%" stop-color="#1a1000"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t11bg)"/>
    <!-- Sepia overlay texture -->
    <rect width="480" height="270" fill="#8B4513" opacity="0.08"/>
    <!-- Film grain effect -->
    <rect width="480" height="270" fill="url(#t11grain)" opacity="0.05"/>
    <!-- Ancient map lines -->
    <g stroke="#8B6914" stroke-width="0.8" opacity="0.3" fill="none">
      <path d="M 0 80 Q 100 60 200 90 Q 300 110 400 80 Q 440 70 480 85"/>
      <path d="M 0 130 Q 80 110 180 140 Q 280 160 380 130 Q 440 115 480 135"/>
      <path d="M 0 180 Q 120 160 220 185 Q 320 200 420 175 Q 455 168 480 180"/>
    </g>
    <!-- Globe -->
    <circle cx="240" cy="125" r="75" fill="#1a2e1a" stroke="#8B6914" stroke-width="2" opacity="0.9"/>
    <!-- Longitude lines -->
    <g stroke="#8B6914" stroke-width="0.8" opacity="0.4" fill="none">
      <ellipse cx="240" cy="125" rx="25" ry="75"/><ellipse cx="240" cy="125" rx="50" ry="75"/>
      <ellipse cx="240" cy="125" rx="75" ry="25"/>
    </g>
    <!-- Continents (simplified) -->
    <path d="M 200 90 Q 220 80 250 85 Q 270 92 265 110 Q 250 125 225 120 Q 205 112 200 90" fill="#5d4037" opacity="0.8"/>
    <path d="M 250 105 Q 275 95 290 108 Q 285 125 268 130 Q 252 128 250 105" fill="#5d4037" opacity="0.8"/>
    <!-- Stand -->
    <rect x="228" y="200" width="24" height="14" rx="2" fill="#5d4037"/>
    <ellipse cx="240" cy="216" rx="35" ry="8" fill="#4a3728"/>
    <!-- Film border -->
    <g fill="#8B6914" opacity="0.4">
      <rect x="0" y="0" width="12" height="270"/>
      <rect x="468" y="0" width="12" height="270"/>
      <g fill="#1a1000">
        <rect x="1" y="12" width="10" height="16" rx="2"/><rect x="1" y="40" width="10" height="16" rx="2"/>
        <rect x="1" y="68" width="10" height="16" rx="2"/><rect x="1" y="96" width="10" height="16" rx="2"/>
        <rect x="1" y="124" width="10" height="16" rx="2"/><rect x="1" y="152" width="10" height="16" rx="2"/>
        <rect x="1" y="180" width="10" height="16" rx="2"/><rect x="1" y="208" width="10" height="16" rx="2"/>
        <rect x="1" y="236" width="10" height="16" rx="2"/>
        <rect x="469" y="12" width="10" height="16" rx="2"/><rect x="469" y="40" width="10" height="16" rx="2"/>
        <rect x="469" y="68" width="10" height="16" rx="2"/><rect x="469" y="96" width="10" height="16" rx="2"/>
        <rect x="469" y="124" width="10" height="16" rx="2"/><rect x="469" y="152" width="10" height="16" rx="2"/>
        <rect x="469" y="180" width="10" height="16" rx="2"/><rect x="469" y="208" width="10" height="16" rx="2"/>
        <rect x="469" y="236" width="10" height="16" rx="2"/>
      </g>
    </g>
    <!-- Title -->
    <rect x="0" y="225" width="480" height="45" fill="rgba(0,0,0,0.75)"/>
    <text x="240" y="247" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-style="italic" fill="#d4a947">I Visited Every Country</text>
    <text x="240" y="263" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#8B6914" letter-spacing="3">WORLD TRAVEL DOCUMENTARY</text>
  </svg>`,

  // 12 — Minecraft / Pixel art
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <rect width="480" height="270" fill="#5c94fc"/>
    <!-- Sky gradient -->
    <rect width="480" height="150" fill="#5c94fc"/>
    <!-- Clouds -->
    <g fill="white" opacity="0.9">
      <rect x="60" y="30" width="80" height="20" rx="10"/><rect x="50" y="22" width="50" height="28" rx="8"/><rect x="90" y="22" width="50" height="28" rx="8"/>
      <rect x="300" y="45" width="70" height="18" rx="9"/><rect x="292" y="38" width="45" height="25" rx="7"/><rect x="328" y="38" width="45" height="25" rx="7"/>
    </g>
    <!-- Ground -->
    <rect width="480" height="120" y="150" fill="#7ec850"/>
    <rect width="480" height="100" y="170" fill="#825432"/>
    <!-- Grass details -->
    <g fill="#8fd460" opacity="0.8">
      <rect x="0" y="150" width="32" height="10"/><rect x="48" y="150" width="32" height="10"/>
      <rect x="96" y="150" width="32" height="10"/><rect x="144" y="150" width="32" height="10"/>
      <rect x="192" y="150" width="32" height="10"/><rect x="240" y="150" width="32" height="10"/>
      <rect x="288" y="150" width="32" height="10"/><rect x="336" y="150" width="32" height="10"/>
      <rect x="384" y="150" width="32" height="10"/><rect x="432" y="150" width="32" height="10"/>
    </g>
    <!-- Creeper face (pixel art) -->
    <g transform="translate(186,60)">
      <rect width="108" height="108" fill="#4a7c59"/>
      <!-- Eyes -->
      <rect x="12" y="24" width="30" height="30" fill="black"/>
      <rect x="66" y="24" width="30" height="30" fill="black"/>
      <!-- Mouth -->
      <rect x="24" y="60" width="18" height="18" fill="black"/>
      <rect x="66" y="60" width="18" height="18" fill="black"/>
      <rect x="24" y="78" width="60" height="18" fill="black"/>
      <rect x="24" y="72" width="18" height="12" fill="#4a7c59"/>
      <rect x="66" y="72" width="18" height="12" fill="#4a7c59"/>
    </g>
    <!-- Trees -->
    <g>
      <rect x="30" y="120" width="14" height="40" fill="#825432"/>
      <rect x="10" y="90" width="54" height="40" fill="#5aa832"/>
      <rect x="16" y="80" width="42" height="20" fill="#6abf3c"/>
      <rect x="420" y="125" width="14" height="35" fill="#825432"/>
      <rect x="400" y="95" width="54" height="40" fill="#5aa832"/>
    </g>
    <!-- Title banner -->
    <rect x="0" y="0" width="480" height="28" fill="rgba(0,0,0,0.6)"/>
    <text x="240" y="19" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="13" font-weight="900" fill="#7ec850">⛏ MINECRAFT — STILL #1 IN 2024</text>
  </svg>`,

  // 13 — DIY / Smart Home
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t13bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0c1a2e"/>
        <stop offset="100%" stop-color="#0a1628"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t13bg)"/>
    <!-- House outline -->
    <polygon points="240,30 380,110 380,230 100,230 100,110" fill="#0d2137" stroke="#1e40af" stroke-width="2"/>
    <polygon points="240,30 380,110 100,110" fill="#0f2d4a" stroke="#1e40af" stroke-width="2"/>
    <!-- Windows glowing -->
    <rect x="130" y="130" width="60" height="50" rx="4" fill="#fbbf24" opacity="0.8"/>
    <rect x="130" y="130" width="60" height="50" rx="4" fill="#fef08a" opacity="0.3"/>
    <rect x="290" y="130" width="60" height="50" rx="4" fill="#60a5fa" opacity="0.8"/>
    <rect x="290" y="130" width="60" height="50" rx="4" fill="#bfdbfe" opacity="0.3"/>
    <!-- Window cross lines -->
    <line x1="160" y1="130" x2="160" y2="180" stroke="#92400e" stroke-width="1.5"/>
    <line x1="130" y1="155" x2="190" y2="155" stroke="#92400e" stroke-width="1.5"/>
    <line x1="320" y1="130" x2="320" y2="180" stroke="#1e3a8a" stroke-width="1.5"/>
    <line x1="290" y1="155" x2="350" y2="155" stroke="#1e3a8a" stroke-width="1.5"/>
    <!-- Door -->
    <rect x="205" y="170" width="70" height="60" rx="4" fill="#1e2d45" stroke="#1e40af" stroke-width="1.5"/>
    <circle cx="265" cy="200" r="4" fill="#60a5fa"/>
    <!-- WiFi signal on house -->
    <g transform="translate(240,75)" fill="none" stroke="#60a5fa" stroke-linecap="round">
      <path d="M -25 0 Q 0 -25 25 0" stroke-width="3" opacity="0.9"/>
      <path d="M -15 8 Q 0 -8 15 8" stroke-width="3" opacity="0.7"/>
      <circle cx="0" cy="14" r="4" fill="#60a5fa"/>
    </g>
    <!-- Smart device icons -->
    <g transform="translate(50,80)" opacity="0.7">
      <rect x="-18" y="-18" width="36" height="36" rx="6" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1"/>
      <text x="0" y="6" text-anchor="middle" font-size="16">💡</text>
    </g>
    <g transform="translate(430,80)" opacity="0.7">
      <rect x="-18" y="-18" width="36" height="36" rx="6" fill="#1a3320" stroke="#22c55e" stroke-width="1"/>
      <text x="0" y="6" text-anchor="middle" font-size="16">🌡</text>
    </g>
    <!-- Glow from windows -->
    <ellipse cx="160" cy="215" rx="40" ry="8" fill="#fbbf24" opacity="0.15"/>
    <ellipse cx="320" cy="215" rx="40" ry="8" fill="#60a5fa" opacity="0.15"/>
    <!-- Label -->
    <rect x="0" y="235" width="480" height="35" fill="rgba(0,0,0,0.75)"/>
    <text x="240" y="258" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="14" font-weight="900" fill="white">🏠 SMART HOME FOR $200</text>
  </svg>`,

  // 14 — Social Media / Viral
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <linearGradient id="t14bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1a0533"/>
        <stop offset="50%" stop-color="#0f172a"/>
        <stop offset="100%" stop-color="#1e0a00"/>
      </linearGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t14bg)"/>
    <!-- Phone screen -->
    <rect x="160" y="20" width="160" height="230" rx="20" fill="#111827" stroke="#374151" stroke-width="2"/>
    <rect x="168" y="38" width="144" height="200" rx="8" fill="#0f172a"/>
    <!-- App icons grid -->
    <g font-size="20" text-anchor="middle">
      <text x="200" y="78">📱</text><text x="240" y="78">📸</text><text x="280" y="78">🎵</text>
      <text x="200" y="118">▶️</text><text x="240" y="118">💬</text><text x="280" y="118">🐦</text>
      <text x="200" y="158">🔴</text><text x="240" y="158">📊</text><text x="280" y="158">🎮</text>
    </g>
    <!-- Like explosion -->
    <g font-size="18" opacity="0.8">
      <text x="60" y="100" transform="rotate(-15,60,100)">❤️</text>
      <text x="380" y="80" transform="rotate(10,380,80)">👍</text>
      <text x="40" y="180" transform="rotate(-10,40,180)">🔥</text>
      <text x="390" y="170" transform="rotate(15,390,170)">⚡</text>
      <text x="100" y="60" transform="rotate(-20,100,60)">💯</text>
      <text x="360" y="220" transform="rotate(8,360,220)">✨</text>
    </g>
    <!-- Notification popups -->
    <rect x="22" y="120" width="120" height="36" rx="8" fill="#1f2937" stroke="#374151" stroke-width="1"/>
    <text x="82" y="136" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#f9fafb">+24.5K likes</text>
    <text x="82" y="150" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#6b7280">just now</text>
    <rect x="338" y="110" width="120" height="36" rx="8" fill="#1f2937" stroke="#374151" stroke-width="1"/>
    <text x="398" y="126" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#f9fafb">+8.2K shares</text>
    <text x="398" y="140" text-anchor="middle" font-family="Arial,sans-serif" font-size="8" fill="#6b7280">trending 🔥</text>
    <!-- Home indicator -->
    <rect x="218" y="226" width="44" height="4" rx="2" fill="#374151"/>
    <!-- Title -->
    <rect x="0" y="235" width="480" height="35" fill="rgba(0,0,0,0.8)"/>
    <text x="240" y="257" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="13" font-weight="900" fill="white">SOCIAL MEDIA ALGORITHM EXPOSED</text>
  </svg>`,

  // 15 — Internet / Network
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 270">
    <defs>
      <radialGradient id="t15bg" cx="50%" cy="50%" r="70%">
        <stop offset="0%" stop-color="#0c1445"/>
        <stop offset="100%" stop-color="#020617"/>
      </radialGradient>
    </defs>
    <rect width="480" height="270" fill="url(#t15bg)"/>
    <!-- Globe network -->
    <circle cx="240" cy="130" r="90" fill="none" stroke="#3b82f6" stroke-width="1.5" opacity="0.4"/>
    <circle cx="240" cy="130" r="90" fill="#050d2e" opacity="0.4"/>
    <!-- Latitude lines -->
    <g stroke="#1d4ed8" stroke-width="0.8" fill="none" opacity="0.4">
      <ellipse cx="240" cy="130" rx="90" ry="25"/>
      <ellipse cx="240" cy="130" rx="90" ry="55"/>
      <ellipse cx="240" cy="130" rx="90" ry="75"/>
    </g>
    <!-- Longitude lines -->
    <g stroke="#1d4ed8" stroke-width="0.8" fill="none" opacity="0.4">
      <line x1="240" y1="40" x2="240" y2="220"/>
      <ellipse cx="240" cy="130" rx="40" ry="90"/>
      <ellipse cx="240" cy="130" rx="70" ry="90"/>
    </g>
    <!-- Connection nodes -->
    <g fill="#60a5fa">
      <circle cx="240" cy="130" r="6"/>
      <circle cx="170" cy="100" r="4"/><circle cx="310" cy="95" r="4"/>
      <circle cx="155" cy="160" r="4"/><circle cx="325" cy="155" r="4"/>
      <circle cx="215" cy="60" r="4"/><circle cx="270" cy="195" r="4"/>
    </g>
    <!-- Connection lines with data packets -->
    <g stroke="#3b82f6" stroke-width="1.5" opacity="0.7">
      <line x1="240" y1="130" x2="170" y2="100"/>
      <line x1="240" y1="130" x2="310" y2="95"/>
      <line x1="240" y1="130" x2="155" y2="160"/>
      <line x1="240" y1="130" x2="325" y2="155"/>
      <line x1="240" y1="130" x2="215" y2="60"/>
      <line x1="240" y1="130" x2="270" y2="195"/>
    </g>
    <!-- Data packets moving -->
    <circle cx="205" cy="115" r="3" fill="#60a5fa" opacity="0.9">
      <animate attributeName="cx" values="240;170" dur="2s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="130;100" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="275" cy="112" r="3" fill="#34d399" opacity="0.9">
      <animate attributeName="cx" values="240;310" dur="1.5s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="130;95" dur="1.5s" repeatCount="indefinite"/>
    </circle>
    <!-- Title -->
    <rect x="0" y="225" width="480" height="45" fill="rgba(0,0,0,0.8)"/>
    <text x="240" y="247" text-anchor="middle" font-family="Arial Black,sans-serif" font-size="15" font-weight="900" fill="white">COMPLETE HISTORY OF INTERNET</text>
    <text x="240" y="263" text-anchor="middle" font-family="Arial,sans-serif" font-size="9" fill="#60a5fa" letter-spacing="2">FROM ARPANET TO AI — FULL STORY</text>
  </svg>`,
];

function randThumb(index) {
  // Deterministically pick based on index for variety, fallback to random
  if (index !== undefined) return THUMBNAILS[index % THUMBNAILS.length];
  return THUMBNAILS[Math.floor(Math.random() * THUMBNAILS.length)];
}
function randDuration() {
  const m = Math.floor(Math.random() * 25) + 1;
  const s = Math.floor(Math.random() * 60).toString().padStart(2,'0');
  return `${m}:${s}`;
}
function randViews() {
  const v = Math.floor(Math.random() * 8000000) + 10000;
  if (v >= 1000000) return `${(v/1000000).toFixed(1)}M views`;
  if (v >= 1000) return `${Math.floor(v/1000)}K views`;
  return `${v} views`;
}
function randTime() {
  const options = ['2 hours ago','5 hours ago','1 day ago','3 days ago','1 week ago','2 weeks ago','1 month ago','3 months ago','6 months ago'];
  return options[Math.floor(Math.random() * options.length)];
}
function randChannel() {
  return CHANNELS[Math.floor(Math.random() * CHANNELS.length)];
}

const VIDEO_TITLES = [
  "I Spent 50 Hours Buried Alive — Here's What Happened",
  "Why This Simple Shape Changed The World Forever",
  "The $1 vs $100,000 Smartphone Challenge",
  "How Algorithms Control What You See Online",
  "Building a PC for Under $300 in 2024",
  "The Science of Black Holes Explained in 10 Minutes",
  "I Learned to Cook in 30 Days — Full Journey",
  "Why the World's Fastest Train Is in Japan",
  "Recreating 5 Viral Recipes From Scratch",
  "The Hidden Truth About Social Media Addiction",
  "Can AI Really Beat Professional Chess Players?",
  "I Visited Every Country in the World — My Story",
  "This GPU Changed Everything We Know About Gaming",
  "Why Minecraft is Still the Most Popular Game in 2024",
  "The Math Behind Viral Videos",
  "Building a Working Computer From Scratch",
  "How Netflix's Algorithm Actually Works",
  "Living Off-Grid for 365 Days — Full Documentary",
  "Every Programming Language Explained in 60 Seconds",
  "The Dark Side of Content Creation",
  "Why Electric Cars Are Losing to Hybrids",
  "I Tried Every AI Tool So You Don't Have To",
  "The Fastest Human in the World — Science Explained",
  "How to Actually Learn Anything Twice as Fast",
  "Inside the World's Largest Data Center",
  "What Really Happens When You Delete Data",
  "Why Space is Completely Silent — And What That Means",
  "I Built a Smart Home for $200",
  "The Complete History of the Internet",
  "How a 22-Year-Old Built a $10M App",
];

function generateVideos(count = 20, category = 'all') {
  return Array.from({ length: count }, (_, i) => {
    const ch = randChannel();
    const thumbIndex = (i + Math.floor(Math.random() * THUMBNAILS.length)) % THUMBNAILS.length;
    return {
      id: `v_${Date.now()}_${i}_${Math.random().toString(36).slice(2)}`,
      title: VIDEO_TITLES[(i + Math.floor(Math.random() * VIDEO_TITLES.length)) % VIDEO_TITLES.length],
      channel: ch,
      thumb: thumbIndex,
      thumbSvg: THUMBNAILS[thumbIndex],
      duration: randDuration(),
      views: randViews(),
      time: randTime(),
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      description: `This is an amazing video about ${VIDEO_TITLES[i % VIDEO_TITLES.length].toLowerCase()}. Subscribe for more incredible content every week. Join millions of viewers who've already discovered this channel.\n\n🔔 Subscribe & hit the bell!\n📧 Contact: example@viewtube.com\n🌐 Website: www.viewtube.com`,
      likes: `${(Math.floor(Math.random()*900)+10)}K`,
      comments: Math.floor(Math.random()*400)+20,
    };
  });
}

const COMMENTS_DATA = [
  { author: 'Alex M.', text: 'This is genuinely one of the best videos I have ever watched. The production quality is insane!', time: '2 days ago', likes: 4200, avatar: '#e53935', initials: 'AM' },
  { author: 'TechNerd99', text: 'Wow, I never thought about it from that perspective. Mind completely blown 🤯', time: '3 days ago', likes: 1800, avatar: '#1e88e5', initials: 'TN' },
  { author: 'Sarah K.', text: 'I have been watching your content for 5 years and you just keep getting better. Thank you!', time: '1 week ago', likes: 920, avatar: '#8e24aa', initials: 'SK' },
  { author: 'JohnDoe2024', text: 'Can we just appreciate how much work went into this? Absolute masterpiece of content creation.', time: '1 week ago', likes: 650, avatar: '#43a047', initials: 'JD' },
  { author: 'curious_cat', text: 'The part at 3:42 literally made me pause the video and rewatch it three times.', time: '2 weeks ago', likes: 380, avatar: '#00897b', initials: 'CC' },
  { author: 'ProgrammerLife', text: 'As a developer this hits different. The accuracy is astounding honestly.', time: '2 weeks ago', likes: 290, avatar: '#d81b60', initials: 'PL' },
];

const SHORT_TITLES = [
  'Satisfying cut 🔥', 'Wait for it... 😱', 'You won\'t believe this trick',
  'This changed my life', 'POV: when it works', 'How does this even work?',
  'Most satisfying video ever', 'Clean code in 60s', '1 tip to grow faster',
];
const SHORT_COLORS = [
  'linear-gradient(180deg,#1a1a2e,#16213e)',
  'linear-gradient(180deg,#0f3460,#533483)',
  'linear-gradient(180deg,#1b1b2f,#e43f5a)',
  'linear-gradient(180deg,#141414,#4a00e0)',
  'linear-gradient(180deg,#200122,#6f0000)',
  'linear-gradient(180deg,#0a0a0a,#1a6b3a)',
];

/* ══════════════════════════════════════════
   STATE
══════════════════════════════════════════ */
const state = {
  theme: 'dark',
  sidebarCollapsed: false,
  currentPage: 'home',
  currentVideo: null,
  videos: [],
  searchQuery: '',
  activeCategory: 'all',
  isPlaying: false,
  isMuted: false,
  volume: 80,
  progress: 0,
  progressTimer: null,
  liked: false,
  subscribed: false,
  miniPlayerOpen: false,
  loggedIn: false,
};

/* ══════════════════════════════════════════
   DOM REFS
══════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const DOM = {
  html: document.documentElement,
  sidebar: $('sidebar'),
  sidebarToggle: $('sidebarToggle'),
  mainContent: $('mainContent'),
  themeToggle: $('themeToggle'),
  searchInput: $('searchInput'),
  searchBtn: $('searchBtn'),
  searchSuggestions: $('searchSuggestions'),
  voiceBtn: $('voiceBtn'),
  videoGrid: $('videoGrid'),
  categoryBar: $('categoryBar'),
  shortsContainer: $('shortsContainer'),
  // Player
  videoPlaceholder: $('videoPlaceholder'),
  videoThumbFull: $('videoThumbFull'),
  playOverlay: $('playOverlay'),
  bigPlayBtn: $('bigPlayBtn'),
  playPauseBtn: $('playPauseBtn'),
  progressFill: $('progressFill'),
  progressThumb: $('progressThumb'),
  progressBarWrap: $('progressBarWrap'),
  timeDisplay: $('timeDisplay'),
  volumeSlider: $('volumeSlider'),
  volBtn: $('volBtn'),
  fullscreenBtn: $('fullscreenBtn'),
  pipBtn: $('pipBtn'),
  videoTitleFull: $('videoTitleFull'),
  videoViewsFull: $('videoViewsFull'),
  videoDateFull: $('videoDateFull'),
  likeBtn: $('likeBtn'),
  likeCount: $('likeCount'),
  dislikeBtn: $('dislikeBtn'),
  subscribeBtn: $('subscribeBtn'),
  channelAvatarPlayer: $('channelAvatarPlayer'),
  channelNamePlayer: $('channelNamePlayer'),
  subscriberCount: $('subscriberCount'),
  descContent: $('descContent'),
  showMoreBtn: $('showMoreBtn'),
  commentsList: $('commentsList'),
  commentCount: $('commentCount'),
  commentInput: $('commentInput'),
  suggestedList: $('suggestedList'),
  // Mini player
  miniPlayer: $('miniPlayer'),
  miniThumb: $('miniThumb'),
  miniTitle: $('miniTitle'),
  miniChannel: $('miniChannel'),
  miniPlayBtn: $('miniPlayBtn'),
  miniCloseBtn: $('miniCloseBtn'),
  // Modal
  modalOverlay: $('modalOverlay'),
  modalClose: $('modalClose'),
  loginSubmit: $('loginSubmit'),
  avatarBtn: $('avatarBtn'),
  uploadBtn: $('uploadBtn'),
  notifBtn: $('notifBtn'),
  // Shortcuts
  shortcutsModal: $('shortcutsModal'),
  shortcutsClose: $('shortcutsClose'),
  // Toast
  toast: $('toast'),
  // Logo
  logoLink: $('logoLink'),
  // Sign in
  signInBtnSubs: $('signInBtnSubs'),
};

/* ══════════════════════════════════════════
   UTILS
══════════════════════════════════════════ */
let toastTimer;
function showToast(msg, duration = 2800) {
  DOM.toast.textContent = msg;
  DOM.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => DOM.toast.classList.remove('show'), duration);
}

function navigateTo(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.classList.add('active');
    target.classList.add('page-transition');
    setTimeout(() => target.classList.remove('page-transition'), 300);
  }
  document.querySelector(`.nav-item[data-page="${page}"]`)?.classList.add('active');
  state.currentPage = page;
  // Close mobile sidebar
  if (window.innerWidth <= 768) DOM.sidebar.classList.remove('mobile-open');
}

function createGradientCanvas(gradient) {
  // Create a small inline style for gradient thumbnails
  return `style="background:${gradient}; width:100%; height:100%; display:flex; align-items:center; justify-content:center;"`;
}

/* ══════════════════════════════════════════
   THEME
══════════════════════════════════════════ */
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  DOM.html.setAttribute('data-theme', state.theme);
  showToast(`${state.theme === 'dark' ? '🌙' : '☀️'} ${state.theme.charAt(0).toUpperCase() + state.theme.slice(1)} mode`);
}

/* ══════════════════════════════════════════
   SIDEBAR
══════════════════════════════════════════ */
function toggleSidebar() {
  if (window.innerWidth <= 768) {
    DOM.sidebar.classList.toggle('mobile-open');
    return;
  }
  state.sidebarCollapsed = !state.sidebarCollapsed;
  DOM.sidebar.classList.toggle('collapsed', state.sidebarCollapsed);
  DOM.mainContent.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);
}

/* ══════════════════════════════════════════
   VIDEO GRID
══════════════════════════════════════════ */
function renderVideoGrid(videos) {
  DOM.videoGrid.innerHTML = '';
  videos.forEach(v => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.dataset.id = v.id;
    card.innerHTML = `
      <div class="thumb-wrap">
        <div class="card-thumb-bg svg-thumb">${v.thumbSvg}</div>
        <div class="thumb-duration">${v.duration}</div>
        <div class="thumb-preview">
          <div class="preview-play">
            <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>
      <div class="card-info">
        <div class="card-avatar" style="background:${v.channel.avatar}">${v.channel.initials}</div>
        <div class="card-meta">
          <div class="card-title">${v.title}</div>
          <div class="card-channel">
            ${v.channel.name}
            ${v.channel.verified ? `<span class="verified-icon"><svg viewBox="0 0 12 12" fill="currentColor"><path d="M10.9 4.8L6.8 .7C6.4.3 5.6.3 5.2.7L1.1 4.8c-.4.4-.4 1.2 0 1.6l4.1 4.1c.4.4 1.2.4 1.6 0l4.1-4.1c.4-.4.4-1.2 0-1.6zm-5.8 2L3.5 5.2l.7-.7 1 1 2.6-2.6.7.7-3.4 3.2z"/></svg></span>` : ''}
          </div>
          <div class="card-stats">${v.views} · ${v.time}</div>
        </div>
      </div>
    `;
    card.addEventListener('click', () => openVideo(v));
    DOM.videoGrid.appendChild(card);
  });
}

function showSkeletons(count = 12) {
  DOM.videoGrid.innerHTML = Array.from({ length: count }, () => `
    <div class="video-card skeleton-card">
      <div class="thumb-wrap skeleton skeleton-thumb"></div>
      <div class="card-info">
        <div class="skeleton skeleton-circle"></div>
        <div class="card-meta" style="flex:1">
          <div class="skeleton skeleton-line" style="width:90%"></div>
          <div class="skeleton skeleton-line" style="width:70%"></div>
          <div class="skeleton skeleton-line short"></div>
        </div>
      </div>
    </div>
  `).join('');
}

function loadVideos(category = 'all') {
  showSkeletons();
  state.activeCategory = category;
  // Simulate network delay
  setTimeout(() => {
    let vids = state.videos;
    if (category !== 'all') vids = vids.filter(v => v.category === category);
    if (!vids.length) vids = generateVideos(12, category);
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      vids = state.videos.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.channel.name.toLowerCase().includes(q)
      );
    }
    renderVideoGrid(vids.slice(0, 24));
  }, 600);
}

/* ══════════════════════════════════════════
   VIDEO PLAYER
══════════════════════════════════════════ */
function openVideo(video) {
  state.currentVideo = video;
  state.isPlaying = false;
  state.progress = 0;
  state.liked = false;
  state.subscribed = false;

  navigateTo('player');

  // Thumbnail — inject SVG into player background
  const svgThumb = document.createElement('div');
  svgThumb.style.cssText = 'position:absolute;inset:0;overflow:hidden;z-index:0;';
  svgThumb.innerHTML = video.thumbSvg;
  svgThumb.querySelector('svg').style.cssText = 'width:100%;height:100%;object-fit:cover;';
  DOM.videoPlaceholder.style.background = '#000';
  // Remove old thumb divs, keep controls/overlay
  DOM.videoPlaceholder.querySelectorAll('.svg-player-bg').forEach(e => e.remove());
  svgThumb.className = 'svg-player-bg';
  DOM.videoPlaceholder.prepend(svgThumb);
  DOM.playOverlay.classList.remove('hidden');

  // Info
  DOM.videoTitleFull.textContent = video.title;
  DOM.videoViewsFull.textContent = video.views;
  DOM.videoDateFull.textContent = video.time;
  DOM.likeCount.textContent = video.likes;
  DOM.channelNamePlayer.textContent = video.channel.name;
  DOM.subscriberCount.textContent = video.channel.subs;
  DOM.channelAvatarPlayer.style.background = video.channel.avatar;
  DOM.channelAvatarPlayer.textContent = video.channel.initials;
  DOM.descContent.textContent = video.description;
  DOM.descContent.classList.remove('expanded');
  DOM.showMoreBtn.textContent = 'Show more';
  DOM.commentCount.textContent = `${video.comments} Comments`;
  DOM.likeBtn.classList.remove('liked');
  DOM.subscribeBtn.textContent = 'Subscribe';
  DOM.subscribeBtn.classList.remove('subscribed');

  // Reset player
  DOM.progressFill.style.width = '0%';
  DOM.progressThumb.style.left = '0%';
  DOM.timeDisplay.textContent = `0:00 / ${video.duration}`;
  clearInterval(state.progressTimer);

  // Comments
  renderComments();
  // Suggested
  renderSuggested();
  // Mini player update
  DOM.miniTitle.textContent = video.title;
  DOM.miniChannel.textContent = video.channel.name;
  // Mini player SVG thumb
  const miniThumbWrap = DOM.miniPlayer.querySelector('.mini-thumb-wrap');
  if (miniThumbWrap) {
    miniThumbWrap.innerHTML = `<div class="mini-svg-thumb">${video.thumbSvg}</div>`;
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function togglePlayPause() {
  state.isPlaying = !state.isPlaying;
  DOM.playOverlay.classList.toggle('hidden', state.isPlaying);

  // Update icon
  const playI = DOM.playPauseBtn.querySelector('.play-icon');
  const pauseI = DOM.playPauseBtn.querySelector('.pause-icon');
  if (state.isPlaying) {
    playI.style.display = 'none';
    pauseI.style.display = 'block';
    startFakeProgress();
  } else {
    playI.style.display = 'block';
    pauseI.style.display = 'none';
    clearInterval(state.progressTimer);
  }
}

function startFakeProgress() {
  clearInterval(state.progressTimer);
  // Parse duration to seconds
  const dur = state.currentVideo?.duration || '10:00';
  const [m, s] = dur.split(':').map(Number);
  const totalSecs = m * 60 + s;
  let elapsed = state.progress * totalSecs;

  state.progressTimer = setInterval(() => {
    elapsed = Math.min(elapsed + 1, totalSecs);
    state.progress = elapsed / totalSecs;
    const pct = (state.progress * 100).toFixed(1);
    DOM.progressFill.style.width = `${pct}%`;
    DOM.progressThumb.style.left = `${pct}%`;

    // Update time display
    const em = Math.floor(elapsed / 60);
    const es = Math.floor(elapsed % 60).toString().padStart(2,'0');
    DOM.timeDisplay.textContent = `${em}:${es} / ${dur}`;

    if (elapsed >= totalSecs) {
      clearInterval(state.progressTimer);
      state.isPlaying = false;
      DOM.playOverlay.classList.remove('hidden');
      DOM.playPauseBtn.querySelector('.play-icon').style.display = 'block';
      DOM.playPauseBtn.querySelector('.pause-icon').style.display = 'none';
    }
  }, 1000);
}

function seekProgress(e) {
  const bar = DOM.progressBarWrap.querySelector('.progress-bar');
  const rect = bar.getBoundingClientRect();
  const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  state.progress = ratio;
  const pct = (ratio * 100).toFixed(1);
  DOM.progressFill.style.width = `${pct}%`;
  DOM.progressThumb.style.left = `${pct}%`;
  if (state.isPlaying) { clearInterval(state.progressTimer); startFakeProgress(); }
}

/* ══════════════════════════════════════════
   COMMENTS
══════════════════════════════════════════ */
function renderComments() {
  DOM.commentsList.innerHTML = COMMENTS_DATA.map(c => `
    <div class="comment-item">
      <div class="comment-avatar" style="background:${c.avatar}">${c.initials}</div>
      <div class="comment-body">
        <div class="comment-author">${c.author} <span style="font-weight:400;color:var(--text-3);font-size:12px;margin-left:6px">${c.time}</span></div>
        <div class="comment-text">${c.text}</div>
        <div class="comment-actions">
          <button class="comment-action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            ${c.likes.toLocaleString()}
          </button>
          <button class="comment-action">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"/>
            </svg>
          </button>
          <button class="comment-action">Reply</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   SUGGESTED VIDEOS
══════════════════════════════════════════ */
function renderSuggested() {
  const sugs = generateVideos(12);
  DOM.suggestedList.innerHTML = sugs.map(v => `
    <div class="suggested-card" data-id="${v.id}">
      <div class="suggested-thumb">
        <div class="sug-svg-thumb">${v.thumbSvg}</div>
        <span class="sug-duration">${v.duration}</span>
      </div>
      <div class="suggested-info">
        <div class="sug-title">${v.title}</div>
        <div class="sug-channel">${v.channel.name}</div>
        <div class="sug-stats">${v.views} · ${v.time}</div>
      </div>
    </div>
  `).join('');

  DOM.suggestedList.querySelectorAll('.suggested-card').forEach((el, i) => {
    el.addEventListener('click', () => openVideo(sugs[i]));
  });
}

/* ══════════════════════════════════════════
   SHORTS
══════════════════════════════════════════ */
function renderShorts() {
  const shorts = Array.from({ length: 8 }, (_, i) => ({
    title: SHORT_TITLES[i % SHORT_TITLES.length],
    channel: randChannel(),
    bg: SHORT_COLORS[i % SHORT_COLORS.length],
    likes: `${Math.floor(Math.random()*900)+10}K`,
    comments: Math.floor(Math.random()*200)+5,
  }));

  DOM.shortsContainer.innerHTML = shorts.map((s, i) => `
    <div class="short-item">
      <div class="short-card">
        <div class="short-thumb" style="background:${s.bg}; display:flex; align-items:center; justify-content:center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
        <div class="short-overlay"></div>
        <div class="short-info">
          <div class="short-title">${s.title}</div>
          <div class="short-channel">${s.channel.name}</div>
        </div>
        <div class="short-actions">
          <button class="short-action-btn">
            <svg viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            <span>${s.likes}</span>
          </button>
          <button class="short-action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span>${s.comments}</span>
          </button>
          <button class="short-action-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════
   SEARCH
══════════════════════════════════════════ */
const SUGGESTIONS = [
  'minecraft build tutorial','python for beginners','best gaming setup 2024',
  'how to learn react','lofi hip hop music','space documentary','travel vlog japan',
  'cooking tips and tricks','tech news today','funny cat videos',
];

function showSuggestions(query) {
  if (!query.trim()) { DOM.searchSuggestions.classList.remove('visible'); return; }
  const matches = SUGGESTIONS.filter(s => s.includes(query.toLowerCase())).slice(0, 6);
  if (!matches.length) { DOM.searchSuggestions.classList.remove('visible'); return; }
  DOM.searchSuggestions.innerHTML = matches.map(s => `
    <div class="suggestion-item">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      ${s}
    </div>
  `).join('');
  DOM.searchSuggestions.classList.add('visible');

  DOM.searchSuggestions.querySelectorAll('.suggestion-item').forEach(el => {
    el.addEventListener('click', () => {
      DOM.searchInput.value = el.textContent.trim();
      DOM.searchSuggestions.classList.remove('visible');
      doSearch(el.textContent.trim());
    });
  });
}

function doSearch(query) {
  state.searchQuery = query;
  if (state.currentPage !== 'home') navigateTo('home');
  loadVideos(state.activeCategory);
  if (query) showToast(`🔍 Searching for "${query}"`);
}

/* ══════════════════════════════════════════
   MINI PLAYER
══════════════════════════════════════════ */
function openMiniPlayer() {
  if (!state.currentVideo) { showToast('Play a video first!'); return; }
  state.miniPlayerOpen = true;
  DOM.miniPlayer.classList.add('visible');
  DOM.miniTitle.textContent = state.currentVideo.title;
  DOM.miniChannel.textContent = state.currentVideo.channel.name;
  navigateTo('home');
  showToast('🎬 Mini player activated');
}
function closeMiniPlayer() {
  state.miniPlayerOpen = false;
  DOM.miniPlayer.classList.remove('visible');
}

/* ══════════════════════════════════════════
   MODAL
══════════════════════════════════════════ */
function openLoginModal() {
  DOM.modalOverlay.classList.add('open');
}
function closeLoginModal() {
  DOM.modalOverlay.classList.remove('open');
}

/* ══════════════════════════════════════════
   KEYBOARD SHORTCUTS
══════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  const tag = document.activeElement.tagName;
  const isInput = tag === 'INPUT' || tag === 'TEXTAREA';

  if (e.key === '?' && !isInput) {
    DOM.shortcutsModal.classList.toggle('open');
    return;
  }
  if (e.key === 'Escape') {
    closeLoginModal();
    DOM.shortcutsModal.classList.remove('open');
    if (state.currentPage === 'player') navigateTo('home');
    return;
  }
  if (e.key === '/' && !isInput) {
    e.preventDefault();
    DOM.searchInput.focus();
    return;
  }
  if (isInput) return;

  switch(e.key.toLowerCase()) {
    case 'k':
      if (state.currentPage === 'player') togglePlayPause();
      break;
    case 'm':
      toggleMute();
      break;
    case 'f':
      if (state.currentPage === 'player') toggleFullscreen();
      break;
    case 'i':
      if (state.currentPage === 'player') openMiniPlayer();
      break;
    case 't':
      toggleTheme();
      break;
  }
});

/* ══════════════════════════════════════════
   VOLUME / MUTE
══════════════════════════════════════════ */
function toggleMute() {
  state.isMuted = !state.isMuted;
  showToast(state.isMuted ? '🔇 Muted' : '🔊 Unmuted');
}

/* ══════════════════════════════════════════
   FULLSCREEN
══════════════════════════════════════════ */
function toggleFullscreen() {
  const el = DOM.videoWrapper;
  if (!document.fullscreenElement) {
    el.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}

/* ══════════════════════════════════════════
   CATEGORY BAR
══════════════════════════════════════════ */
DOM.categoryBar.addEventListener('click', e => {
  const btn = e.target.closest('.cat-btn');
  if (!btn) return;
  DOM.categoryBar.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  state.searchQuery = '';
  DOM.searchInput.value = '';
  loadVideos(btn.dataset.cat);
});

/* ══════════════════════════════════════════
   EVENT LISTENERS
══════════════════════════════════════════ */

// Theme
DOM.themeToggle.addEventListener('click', toggleTheme);

// Sidebar
DOM.sidebarToggle.addEventListener('click', toggleSidebar);

// Nav items
document.querySelectorAll('.nav-item[data-page]').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    navigateTo(item.dataset.page);
  });
});

// Logo
DOM.logoLink.addEventListener('click', e => {
  e.preventDefault();
  state.searchQuery = '';
  DOM.searchInput.value = '';
  navigateTo('home');
  loadVideos('all');
  DOM.categoryBar.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  DOM.categoryBar.querySelector('[data-cat="all"]').classList.add('active');
});

// Search
DOM.searchInput.addEventListener('input', e => {
  showSuggestions(e.target.value);
  if (!e.target.value) { state.searchQuery = ''; loadVideos(state.activeCategory); }
});
DOM.searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    DOM.searchSuggestions.classList.remove('visible');
    doSearch(DOM.searchInput.value);
  }
});
DOM.searchBtn.addEventListener('click', () => {
  DOM.searchSuggestions.classList.remove('visible');
  doSearch(DOM.searchInput.value);
});
document.addEventListener('click', e => {
  if (!e.target.closest('.search-bar')) DOM.searchSuggestions.classList.remove('visible');
});

// Voice search
DOM.voiceBtn.addEventListener('click', () => showToast('🎤 Voice search activated (demo)'));

// Upload
DOM.uploadBtn.addEventListener('click', openLoginModal);

// Notifications
DOM.notifBtn.addEventListener('click', () => showToast('🔔 No new notifications'));

// Avatar
DOM.avatarBtn.addEventListener('click', () => {
  if (!state.loggedIn) openLoginModal();
  else showToast('👤 Profile (demo)');
});

// Player controls
DOM.bigPlayBtn.addEventListener('click', togglePlayPause);
DOM.playPauseBtn.addEventListener('click', togglePlayPause);
DOM.videoPlaceholder.addEventListener('click', e => {
  if (e.target === DOM.videoPlaceholder || e.target === DOM.videoThumbFull) togglePlayPause();
});
DOM.progressBarWrap.addEventListener('click', seekProgress);
DOM.volBtn.addEventListener('click', toggleMute);
DOM.volumeSlider.addEventListener('input', e => { state.volume = e.target.value; });
DOM.fullscreenBtn.addEventListener('click', toggleFullscreen);
DOM.pipBtn.addEventListener('click', openMiniPlayer);
DOM.skipBtn?.addEventListener('click', () => {
  if (!state.currentVideo) return;
  const nextVids = generateVideos(1);
  openVideo(nextVids[0]);
});

// Like button
DOM.likeBtn.addEventListener('click', () => {
  state.liked = !state.liked;
  DOM.likeBtn.classList.toggle('liked', state.liked);
  if (state.liked) {
    showToast('👍 Added to liked videos');
    // Animate
    DOM.likeBtn.style.transform = 'scale(1.3)';
    setTimeout(() => DOM.likeBtn.style.transform = '', 300);
  }
});

// Dislike
DOM.dislikeBtn.addEventListener('click', () => {
  DOM.dislikeBtn.style.transform = 'scale(1.3)';
  setTimeout(() => DOM.dislikeBtn.style.transform = '', 300);
  showToast('👎 Feedback noted');
});

// Subscribe
DOM.subscribeBtn.addEventListener('click', () => {
  state.subscribed = !state.subscribed;
  DOM.subscribeBtn.textContent = state.subscribed ? '✓ Subscribed' : 'Subscribe';
  DOM.subscribeBtn.classList.toggle('subscribed', state.subscribed);
  showToast(state.subscribed ? '🔔 Subscribed!' : 'Unsubscribed');
});

// Show more description
DOM.showMoreBtn.addEventListener('click', () => {
  const expanded = DOM.descContent.classList.toggle('expanded');
  DOM.showMoreBtn.textContent = expanded ? 'Show less' : 'Show more';
});

// Comment input
DOM.commentInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && DOM.commentInput.value.trim()) {
    const text = DOM.commentInput.value.trim();
    DOM.commentInput.value = '';
    // Prepend new comment
    const item = document.createElement('div');
    item.className = 'comment-item';
    item.innerHTML = `
      <div class="comment-avatar" style="background:linear-gradient(135deg,#FF0033,#ff6b35)">AK</div>
      <div class="comment-body">
        <div class="comment-author">You <span style="font-weight:400;color:var(--text-3);font-size:12px;margin-left:6px">just now</span></div>
        <div class="comment-text">${text}</div>
        <div class="comment-actions">
          <button class="comment-action"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>0</button>
          <button class="comment-action">Reply</button>
        </div>
      </div>
    `;
    DOM.commentsList.insertBefore(item, DOM.commentsList.firstChild);
    showToast('💬 Comment posted');
  }
});

// Mini player
DOM.miniCloseBtn.addEventListener('click', closeMiniPlayer);
DOM.miniPlayBtn.addEventListener('click', () => {
  if (state.currentVideo) {
    navigateTo('player');
    closeMiniPlayer();
  }
});

// Modal
DOM.modalClose.addEventListener('click', closeLoginModal);
DOM.modalOverlay.addEventListener('click', e => {
  if (e.target === DOM.modalOverlay) closeLoginModal();
});
DOM.loginSubmit.addEventListener('click', () => {
  const email = $('emailInput').value;
  const pass = $('passInput').value;
  if (!email || !pass) { showToast('⚠️ Please fill in all fields'); return; }
  state.loggedIn = true;
  closeLoginModal();
  showToast('✅ Signed in successfully!');
  DOM.avatarBtn.querySelector('.avatar').textContent = email.slice(0,2).toUpperCase();
});
if (DOM.signInBtnSubs) DOM.signInBtnSubs.addEventListener('click', openLoginModal);

// Shortcuts modal
DOM.shortcutsClose.addEventListener('click', () => DOM.shortcutsModal.classList.remove('open'));

/* ══════════════════════════════════════════
   INIT
══════════════════════════════════════════ */
function init() {
  // Generate initial videos
  state.videos = generateVideos(30);
  // Render home grid
  loadVideos('all');
  // Render shorts
  renderShorts();
  // Set initial theme
  DOM.html.setAttribute('data-theme', state.theme);
}

init();