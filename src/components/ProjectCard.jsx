import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function ProjectCard({
  category,
  title,
  description,
  ctaLabel = 'View project',
  preview,
  stageBg = '#F1F5F9',
  accentColor = '#0078D7',
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
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      style={{ borderTopColor: accentColor }}
      className="group bg-white border border-[#CBD5E1] border-t-4 win98-card-3d cursor-pointer text-left flex flex-col justify-between overflow-hidden"
    >
      {/* Top Category Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between gap-2">
        <span
          style={{ color: accentColor }}
          className="text-[11px] font-mono font-bold uppercase tracking-wider truncate"
        >
          {category}
        </span>
      </div>

      {/* Full-Width Visual Preview Stage (zero horizontal cramping) */}
      <div
        style={{ backgroundColor: stageBg }}
        className="mx-5 my-2 p-4 min-h-[140px] flex items-center justify-center border border-[#E2E8F0] overflow-hidden"
      >
        <div className="w-full flex items-center justify-center">{preview}</div>
      </div>

      {/* Title, Description & Action Label */}
      <div className="p-5 pt-3 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-xl font-bold text-[#0F172A] tracking-tight mb-1.5 group-hover:text-[#0078D7] transition-colors">
            {title}
          </h3>
          <p className="text-sm text-[#475569] leading-relaxed font-normal mb-5">
            {description}
          </p>
        </div>

        <span
          style={{ color: accentColor }}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider"
        >
          <span>{ctaLabel}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </span>
      </div>
    </motion.div>
  );
}
