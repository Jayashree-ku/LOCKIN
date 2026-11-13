import React from 'react';

export const StarrySkyBackground: React.FC<{ children?: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Radial glow background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#14213D] via-[#0d162a] to-[#0B0B0C] pointer-events-none" />

      {/* Subtle orbital lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50%" cy="20%" r="350" fill="none" stroke="#F4EDE0" strokeWidth="0.7" strokeDasharray="3 6" />
        <ellipse cx="65%" cy="30%" rx="500" ry="220" fill="none" stroke="#F4EDE0" strokeWidth="0.5" strokeDasharray="4 8" transform="rotate(-15 650 300)" />
        <circle cx="20%" cy="40%" r="4" fill="#F4EDE0" opacity="0.6" />
        <circle cx="85%" cy="15%" r="3" fill="#F4EDE0" opacity="0.5" />
        <circle cx="45%" cy="12%" r="2" fill="#F4EDE0" opacity="0.8" />
        <circle cx="70%" cy="50%" r="2.5" fill="#F4EDE0" opacity="0.4" />
        <circle cx="30%" cy="65%" r="3" fill="#F4EDE0" opacity="0.5" />
        <circle cx="15%" cy="85%" r="2" fill="#F4EDE0" opacity="0.6" />
        <circle cx="90%" cy="75%" r="3.5" fill="#F4EDE0" opacity="0.4" />
      </svg>

      {/* Atmospheric blue haze */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-navy/40 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const HeroStudentStairsArtwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Atmospheric lighting behind door */}
      <div className="absolute top-1/4 w-48 h-80 bg-cream/20 blur-2xl rounded-full" />
      <div className="absolute top-1/3 w-64 h-64 bg-blue-500/15 blur-3xl rounded-full" />

      <svg
        viewBox="0 0 600 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[520px] drop-shadow-2xl"
      >
        <defs>
          <radialGradient id="portalGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#F4EDE0" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#92ACDC" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#14213D" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="doorBeam" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F4EDE0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E9DAC2" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="stairStep1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e2c4c" />
            <stop offset="100%" stopColor="#111a2f" />
          </linearGradient>
          <linearGradient id="stairStep2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2a3d66" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0B0B0C" />
          </linearGradient>
        </defs>

        {/* Ambient background glow ring */}
        <circle cx="370" cy="240" r="180" fill="url(#portalGlow)" />

        {/* Diagonal trajectory lines and sparkles */}
        <line x1="100" y1="500" x2="480" y2="120" stroke="#F4EDE0" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="6 6" />
        <line x1="180" y1="580" x2="520" y2="240" stroke="#F4EDE0" strokeWidth="0.5" strokeOpacity="0.2" />

        {/* Four-point stars */}
        <path d="M420 120 L423 130 L433 133 L423 136 L420 146 L417 136 L407 133 L417 130 Z" fill="#F4EDE0" opacity="0.8" />
        <path d="M220 220 L222 226 L228 228 L222 230 L220 236 L218 230 L212 228 L218 226 Z" fill="#F4EDE0" opacity="0.6" />

        {/* Illuminated Portal / Doorway */}
        <rect x="330" y="160" width="70" height="150" rx="4" fill="url(#doorBeam)" />
        <rect x="333" y="163" width="64" height="144" rx="2" fill="#FFFFFF" opacity="0.9" />

        {/* Flight of Stairs leading up to the portal */}
        {/* Step 8 (Top) */}
        <polygon points="310,310 420,310 400,325 290,325" fill="#2d4068" />
        <polygon points="290,325 400,325 400,340 290,340" fill="#18233a" />

        {/* Step 7 */}
        <polygon points="280,340 410,340 390,358 260,358" fill="#293b60" />
        <polygon points="260,358 390,358 390,375 260,375" fill="#141d30" />

        {/* Step 6 */}
        <polygon points="250,375 400,375 375,395 225,395" fill="#243454" />
        <polygon points="225,395 375,395 375,415 225,415" fill="#111828" />

        {/* Step 5 */}
        <polygon points="215,415 385,415 360,438 190,438" fill="#1f2c48" />
        <polygon points="190,438 360,438 360,460 190,460" fill="#0e1422" />

        {/* Step 4 */}
        <polygon points="180,460 370,460 345,485 155,485" fill="#1b263e" />
        <polygon points="155,485 345,485 345,510 155,510" fill="#0b101c" />

        {/* Step 3 */}
        <polygon points="145,510 355,510 325,540 115,540" fill="#162035" />
        <polygon points="115,540 325,540 325,570 115,570" fill="#090d17" />

        {/* Step 2 */}
        <polygon points="105,570 340,570 305,605 70,605" fill="#121a2c" />
        <polygon points="70,605 305,605 305,640 70,640" fill="#070a12" />

        {/* Step 1 (Bottom foundation) */}
        <polygon points="60,640 325,640 280,690 15,690" fill="#0e1524" />
        <polygon points="15,690 280,690 280,720 15,720" fill="#05070c" />

        {/* Student Silhouette on Step 4/5 facing up toward the door */}
        <g transform="translate(265, 380)">
          {/* Head & Hood */}
          <circle cx="15" cy="5" r="9" fill="#0B0B0C" />
          <path d="M8 12 Q15 6 22 12 Q20 22 10 22 Z" fill="#121b2d" opacity="0.6" />

          {/* Backpack on back */}
          <rect x="0" y="16" width="12" height="24" rx="4" fill="#080c14" />
          <path d="M2 18 Q6 14 10 18" stroke="#1c2842" strokeWidth="1.5" fill="none" />

          {/* Torso / Jacket */}
          <path d="M9 13 L24 13 L26 42 L8 42 Z" fill="#0B0B0C" />

          {/* Legs & Shoes */}
          <rect x="10" y="42" width="6" height="24" rx="2" fill="#0B0B0C" />
          <rect x="19" y="42" width="6" height="22" rx="2" fill="#080c14" />
          {/* Left Foot */}
          <ellipse cx="12" cy="67" rx="5" ry="3" fill="#05070c" />
          {/* Right Foot stepped upward */}
          <ellipse cx="22" cy="65" rx="5" ry="3" fill="#05070c" />
        </g>

        {/* Door light reflection beam on stairs */}
        <polygon
          points="330,310 400,310 365,480 300,480"
          fill="#F4EDE0"
          opacity="0.12"
        />
      </svg>
    </div>
  );
};
