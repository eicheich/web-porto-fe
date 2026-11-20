import React from 'react';

/* Clean Windows 8 Metro Header Geometric Accent */
export function Win98WindowControls() {
  return (
    <div aria-hidden="true" className="flex items-center gap-1 shrink-0">
      <span className="w-2 h-2 bg-white/40" />
      <span className="w-2 h-2 bg-white/70" />
      <span className="w-2 h-2 bg-white" />
    </div>
  );
}

/* Pixel Yellow Folder Icon (1998 Desktop style) */
export function PixelFolderIcon({ className = 'w-10 h-9' }) {
  return (
    <svg viewBox="0 0 36 32" fill="none" className={className} aria-hidden="true">
      <path d="M2 5H13L16 8H33V27H2V5Z" fill="#FACC15" stroke="#111827" strokeWidth="2" />
      <path d="M2 10H34V27H2V10Z" fill="#FDE047" stroke="#111827" strokeWidth="2" />
      <rect x="4" y="12" width="28" height="2" fill="#FEF08A" />
    </svg>
  );
}

/* Pixel Document / Readme Icon */
export function PixelDocIcon({ className = 'w-9 h-10' }) {
  return (
    <svg viewBox="0 0 32 36" fill="none" className={className} aria-hidden="true">
      <path d="M4 2H21L28 9V34H4V2Z" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
      <path d="M21 2V9H28" fill="#D1D5DB" stroke="#111827" strokeWidth="2" />
      <rect x="8" y="14" width="16" height="2" fill="#2563EB" />
      <rect x="8" y="19" width="14" height="2" fill="#6B7280" />
      <rect x="8" y="24" width="11" height="2" fill="#6B7280" />
    </svg>
  );
}

/* Pixel Recycle Bin Icon */
export function PixelBinIcon({ className = 'w-9 h-10' }) {
  return (
    <svg viewBox="0 0 32 36" fill="none" className={className} aria-hidden="true">
      <path d="M6 10H26L24 33H8L6 10Z" fill="#E5E7EB" stroke="#111827" strokeWidth="2" />
      <rect x="4" y="6" width="24" height="4" fill="#D1D5DB" stroke="#111827" strokeWidth="2" />
      <rect x="12" y="3" width="8" height="3" fill="#9CA3AF" stroke="#111827" strokeWidth="2" />
      <rect x="11" y="14" width="2" height="14" fill="#16A34A" />
      <rect x="15" y="14" width="2" height="14" fill="#16A34A" />
      <rect x="19" y="14" width="2" height="14" fill="#16A34A" />
    </svg>
  );
}

/* 1998 Dithered Cyan Sky & Rolling Green Meadow Wallpaper */
export function Win98Wallpaper() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Vibrant 1998 Cyan-Sky Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #1E9BB5 0%, #3FC7D8 45%, #78E3EC 65%, #3D9A3C 100%)',
        }}
      />

      {/* Pixelated Clouds & Lush Green Rolling Meadow Hills */}
      <svg
        viewBox="0 0 1440 760"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Pixel/Dithered Clouds */}
        <path
          d="M0 320 C120 260, 260 270, 360 310 C450 245, 620 250, 720 315 C840 270, 980 285, 1080 320 C1200 265, 1340 275, 1440 315 L1440 500 L0 500 Z"
          fill="#EBF9FB"
          opacity="0.72"
        />
        <path
          d="M120 210 C190 175, 290 180, 340 215 C380 185, 450 190, 485 220 L120 220 Z"
          fill="#FFFFFF"
          opacity="0.58"
        />
        <path
          d="M920 190 C990 150, 1120 155, 1180 195 C1240 165, 1320 175, 1370 205 L920 205 Z"
          fill="#FFFFFF"
          opacity="0.55"
        />

        {/* Back Meadow Hill */}
        <path
          d="M0 470 C280 390, 560 440, 860 410 C1120 385, 1300 420, 1440 440 L1440 760 L0 760 Z"
          fill="#3E9E35"
        />
        {/* Sunlit Mid Meadow Hill */}
        <path
          d="M0 530 C320 465, 640 535, 980 495 C1200 470, 1340 490, 1440 515 L1440 760 L0 760 Z"
          fill="#55B83C"
        />
        {/* Foreground Meadow Grass */}
        <path
          d="M0 615 C420 570, 880 620, 1440 580 L1440 760 L0 760 Z"
          fill="#2D8230"
        />
        {/* Sunlit Trail */}
        <path
          d="M840 545 C920 595, 1010 660, 1140 760 L980 760 C890 665, 855 595, 840 545 Z"
          fill="#9CD865"
          opacity="0.55"
        />
      </svg>

      {/* Authentic 1998 Halftone Dither Matrix Overlay */}
      <div className="absolute inset-0 bg-dither-dots opacity-85" />
    </div>
  );
}
