import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Award, Briefcase, Users } from 'lucide-react';
import { Win98WindowControls } from './RetroStickers';

export default function BeyondTheScreen({ onViewActivities }) {
  const experiences = [
    {
      role: 'Backend Developer Intern',
      org: 'PT Teknologi Kartu Indonesia',
      period: '2023 – 2024',
      iconBg: '#DBEAFE',
      icon: <Briefcase size={18} className="text-[#000080]" />,
      summary:
        'Engineered and maintained scalable backend services and RESTful APIs using FastAPI and MongoDB.',
    },
    {
      role: 'Honors & Awards',
      org: 'National & International',
      period: '2023 – 2025',
      iconBg: '#FEF3C7',
      icon: <Award size={18} className="text-[#000080]" />,
      summary:
        'Best International Essay (Jombang), 2nd Place Web Design PRISMA Festival & LKS Kudus, and Honorable Mention at Garuda Hacks 4.0.',
    },
    {
      role: 'Organizations & Events',
      org: 'IPB University · GDGoC · DevFest',
      period: '2024 – 2026',
      iconBg: '#DCFCE7',
      icon: <Users size={18} className="text-[#000080]" />,
      summary:
        'IT Knowledge Judge & Treasurer, MICRO IT SHN Treasurer, Head of Medical Division, GDGoC IPB Member, and DevFest Bogor Participant.',
    },
  ];

  return (
    <section
      id="experience"
      className="py-20 px-6 sm:px-10 bg-[#008080] border-t-2 border-white scroll-mt-4 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto mb-12"
        >
          <span className="inline-block win98-raised px-3 py-0.5 text-[10.5px] font-mono font-bold tracking-wider text-[#111827] uppercase mb-4">
            Experience
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-[2px_2px_0px_#004040] mb-2.5">
            Experience & Highlights.
          </h2>
          <p className="text-sm sm:text-base text-[#E6FFFA] font-normal mb-5">
            Work experience, honors &amp; awards, organizations, and tech events.
          </p>
          <button
            onClick={onViewActivities}
            className="win98-raised hover:bg-[#FEF08A] px-4 py-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] transition-colors group cursor-pointer"
          >
            View full highlights
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* 3-Column Win98 Window Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((item, idx) => (
            <motion.div
              key={item.role}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onViewActivities?.();
                }
              }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={onViewActivities}
              className="group win98-window p-1 flex flex-col cursor-pointer text-left"
            >
              {/* Title Bar */}
              <div className="win98-titlebar px-2.5 py-1 flex items-center justify-between gap-2 mb-1">
                <span className="text-[10.5px] font-mono font-semibold truncate">
                  {item.org}
                </span>
                <Win98WindowControls />
              </div>

              {/* Sunken Body */}
              <div className="bg-[#FAF8F2] win98-sunken p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div
                      style={{ backgroundColor: item.iconBg }}
                      className="w-10 h-10 win98-sunken flex items-center justify-center shrink-0"
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.org}
                          className="w-6 h-6 object-contain"
                        />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <span className="win98-raised px-2 py-0.5 text-[10.5px] font-mono font-medium text-[#111827]">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#111827] tracking-tight mb-2 group-hover:text-[#000080] transition-colors">
                    {item.role}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#374151] leading-relaxed font-normal">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-[#D1D5DB] inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] group-hover:text-[#000080] transition-colors">
                  Read highlight
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
