import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Win98WindowControls } from './RetroStickers';

export default function ProjectCard({
  category,
  title,
  description,
  ctaLabel = 'View project',
  preview,
  stageBg = '#DBEAFE',
  onClick,
  delay = 0,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{
        opacity: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] },
        y: { type: 'spring', stiffness: 360, damping: 24 },
      }}
      onClick={onClick}
      className="group win98-window p-1 cursor-pointer text-left"
    >
      {/* Classic Window Title Bar */}
      <div className="win98-titlebar px-2.5 py-1 flex items-center justify-between gap-2 mb-1">
        <span className="text-[10.5px] font-mono font-semibold tracking-wide truncate">
          {category}
        </span>
        <Win98WindowControls />
      </div>

      {/* Sunken Window Content Area */}
      <div className="bg-[#FAF8F2] win98-sunken p-4 sm:p-5 flex flex-col sm:flex-row items-stretch justify-between gap-4">
        {/* Left: Copy & Bevel Button */}
        <div className="flex flex-col justify-between sm:w-[56%]">
          <div>
            <h3 className="font-display text-lg font-bold text-[#111827] tracking-tight mb-1.5 group-hover:text-[#000080] transition-colors">
              {title}
            </h3>
            <p className="text-xs sm:text-[13px] text-[#374151] leading-relaxed font-normal mb-4">
              {description}
            </p>
          </div>

          <div className="win98-raised group-hover:bg-[#FEF08A] px-3 py-1 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] w-fit transition-colors">
            {ctaLabel}
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Right: Sunken Preview Stage */}
        <div
          style={{ backgroundColor: stageBg }}
          className="sm:w-[44%] win98-sunken p-3 flex items-center justify-center shrink-0 min-h-[112px]"
        >
          {preview}
        </div>
      </div>
    </motion.div>
  );
}
