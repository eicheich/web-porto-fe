import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Win98Wallpaper,
  Win98WindowControls,
  PixelFolderIcon,
  PixelDocIcon,
  PixelBinIcon,
} from './RetroStickers';

export default function Hero() {
  const [waveKey, setWaveKey] = useState(0);
  const [avatarHovered, setAvatarHovered] = useState(false);

  const stackItems = ['Python', 'PyTorch', 'Scikit-Learn', 'React', 'Tailwind CSS', 'FastAPI'];

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-8 overflow-hidden min-h-[calc(100vh-48px)] flex items-center justify-center">
      {/* 1998 Dithered Cyan Sky & Rolling Meadow Desktop Wallpaper */}
      <Win98Wallpaper />

      {/* Left Retro Desktop Icons (Desktop only) */}
      <div className="hidden lg:flex flex-col gap-6 absolute left-7 top-8 z-10">
        <a
          href="#ml-projects"
          className="group flex flex-col items-center gap-1 text-center w-18 p-1.5 rounded-xs hover:bg-[#000080]/35 transition-colors"
        >
          <PixelFolderIcon className="w-10 h-9 group-hover:scale-105 transition-transform" />
          <span className="text-[11px] font-mono font-semibold text-white drop-shadow-[1px_1px_0px_#000000]">
            ml_files
          </span>
        </a>

        <a
          href="#software"
          className="group flex flex-col items-center gap-1 text-center w-18 p-1.5 rounded-xs hover:bg-[#000080]/35 transition-colors"
        >
          <div className="w-9 h-9 border-2 border-[#111827] bg-white p-0.5 shadow-[2px_2px_0px_#000000] group-hover:scale-105 transition-transform">
            <img src="/profile.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <span className="text-[11px] font-mono font-semibold text-white drop-shadow-[1px_1px_0px_#000000]">
            husnul.exe
          </span>
        </a>

        <a
          href="#experience"
          className="group flex flex-col items-center gap-1 text-center w-18 p-1.5 rounded-xs hover:bg-[#000080]/35 transition-colors"
        >
          <PixelDocIcon className="w-9 h-10 group-hover:scale-105 transition-transform" />
          <span className="text-[11px] font-mono font-semibold text-white drop-shadow-[1px_1px_0px_#000000]">
            readme.txt
          </span>
        </a>
      </div>

      {/* Bottom-Left Desktop Recycle Bin */}
      <div className="hidden lg:flex flex-col items-center gap-1 absolute left-8 bottom-8 z-10 opacity-90 pointer-events-none">
        <PixelBinIcon className="w-9 h-10" />
        <span className="text-[11px] font-mono font-semibold text-white drop-shadow-[1px_1px_0px_#000000]">
          Recycle Bin
        </span>
      </div>

      {/* Main Centered Win98 Window */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-2xl win98-window p-1"
      >
        {/* Classic Blue Gradient Title Bar */}
        <div className="win98-titlebar px-2.5 py-1.5 flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-3.5 h-3.5 bg-[#FDE047] border border-[#111827] shrink-0" />
            <span className="font-mono text-xs font-bold tracking-tight truncate">
              husnul_portfolio.exe — Intro
            </span>
          </div>
          <Win98WindowControls />
        </div>

        {/* Crisp Window Body */}
        <div className="bg-[#FAF8F2] win98-sunken p-6 sm:p-10 text-center flex flex-col items-center">
          {/* Profile Avatar + Retro Speech Bubble */}
          <div
            onMouseEnter={() => setAvatarHovered(true)}
            onMouseLeave={() => setAvatarHovered(false)}
            className="relative flex items-center justify-center gap-3.5 sm:block mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="w-20 h-20 win98-sunken p-1 bg-white cursor-pointer shrink-0"
            >
              <img
                src="/profile.jpg"
                alt="Husnul Khotimah"
                className="w-full h-full object-cover object-center"
              />
            </motion.div>

            {/* Retro Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: -6 }}
              animate={
                avatarHovered
                  ? { opacity: 1, scale: 1.03, x: 2, y: -2 }
                  : { opacity: 1, scale: 1, x: 0, y: 0 }
              }
              transition={{
                opacity: { duration: 0.3, delay: 0.25 },
                scale: { type: 'spring', stiffness: 360, damping: 20 },
              }}
              className="relative sm:absolute sm:left-[calc(100%+14px)] sm:-top-1 sm:w-max max-w-[185px] sm:max-w-[215px] bg-white border-2 border-[#111827] shadow-[3px_3px_0px_#111827] px-3 py-2 text-left select-none"
            >
              <span
                aria-hidden="true"
                className="hidden sm:block absolute -left-[7px] bottom-3 w-2.5 h-2.5 bg-white border-l-2 border-b-2 border-[#111827] rotate-45"
              />
              <p className="relative z-10 text-[11.5px] leading-snug text-[#111827] font-medium">
                Still learning,{' '}
                <span className="bg-[#FEF08A] px-1 font-bold text-[#000080]">
                  especially about learning.
                </span>
              </p>
            </motion.div>
          </div>

          {/* University Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DFDCD4] win98-raised mb-5">
            <img
              src="/logo-ipb.png"
              alt="IPB University"
              className="w-4 h-4 object-contain shrink-0"
            />
            <span className="text-[11px] font-mono font-semibold tracking-wide text-[#111827]">
              Software Engineering · IPB University
            </span>
          </div>

          {/* Pixelated Editorial Headline */}
          <h1
            onMouseEnter={() => setWaveKey((k) => k + 1)}
            className="font-display text-3xl sm:text-5xl font-bold text-[#111827] tracking-tight leading-[1.08] mb-4"
          >
            Husnul Khotimah
            <motion.span
              key={waveKey}
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 16, -8, 14, -4, 0] }}
              transition={{ duration: 0.9, delay: waveKey === 0 ? 0.55 : 0, ease: 'easeInOut' }}
              className="inline-block origin-[70%_75%] cursor-default select-none font-sans"
              aria-hidden="true"
            >

            </motion.span>
          </h1>

          {/* Concise Bio (Unchanged) */}
          <p className="text-sm sm:text-base text-[#374151] max-w-lg leading-relaxed mb-7 font-normal">
            Software Engineering student at IPB University focused on{' '}
            <span className="bg-[#BFDBFE] px-1.5 py-0.5 text-[#111827] font-semibold">
              Machine Learning
            </span>{' '}
            and{' '}
            <span className="bg-[#BBF7D0] px-1.5 py-0.5 text-[#111827] font-semibold">
              Software Development
            </span>
            —building models, web apps, and mobile products.
          </p>

          {/* Win98 Bevel Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-7">
            <a
              href="#ml-projects"
              className="px-6 py-2 bg-[#000080] hover:bg-[#1084D0] text-white text-xs sm:text-sm font-semibold border-t-2 border-l-2 border-[#60A5FA] border-r-2 border-b-2 border-r-[#000040] border-b-[#000040] transition-colors"
            >
              View Projects
            </a>
            <a
              href="#experience"
              className="px-6 py-2 win98-raised hover:bg-[#EAE8E1] text-[#111827] text-xs sm:text-sm font-semibold transition-colors"
            >
              Experience
            </a>
          </div>

          {/* Core Stack Strip */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-mono text-[#4B5563]">
            {stackItems.map((item, idx) => (
              <React.Fragment key={item}>
                <span className="px-1.5 py-0.5 bg-[#DFDCD4]/70 border border-[#9CA3AF]/50 text-[#111827]">
                  {item}
                </span>
                {idx < stackItems.length - 1 && (
                  <span className="text-[#9CA3AF] select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
