import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Award, Briefcase, Code2, Globe, Sparkles, Trophy, Users } from 'lucide-react';
import Button from './Button';

export default function BeyondTheScreen({ onViewActivities }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="experience"
      className="py-14 sm:py-20 px-4 sm:px-10 bg-white border-t border-[#E2E8F0] text-[#0F172A] scroll-mt-24 md:scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <span className="inline-block bg-[#0F172A] text-white px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
              03 / Experience &amp; Honors
            </span>
            <h2 className="font-metro text-3xl sm:text-4xl font-light tracking-tight text-[#0F172A] mb-2">
              Track record beyond the code.
            </h2>
            <p className="text-sm sm:text-base text-[#475569] font-normal">
              Industry backend internship, international &amp; national awards, and campus leadership.
            </p>
          </div>

          <Button onClick={onViewActivities} className="group w-full sm:w-auto justify-center md:self-auto shrink-0 min-h-[44px]">
            Explore full archive (10)
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Button>
        </motion.div>

        {/* Windows Phone 8 (Mobile) / Windows 8 Metro Multi-Sized Tile Grid (Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5 lg:auto-rows-[168px]">
          {/* Wide Lead Tile on Mobile / Large 2x2 Tile on Desktop: Backend Intern */}
          <motion.button
            type="button"
            onClick={onViewActivities}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="metro-tile order-1 lg:order-1 col-span-2 lg:row-span-2 bg-[#0078D7] hover:bg-[#0063B1] text-white p-5 sm:p-7 flex flex-col justify-between text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
          >
            <div className="flex items-start justify-between gap-4 w-full">
              <div className="w-11 h-11 bg-white/15 flex items-center justify-center shrink-0">
                <Briefcase size={22} className="text-white" aria-hidden="true" />
              </div>
              <span className="font-metro text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90 bg-white/15 px-2.5 py-1">
                2023 – 2024
              </span>
            </div>

            <div className="my-4 lg:my-0">
              <span className="block font-metro text-xs uppercase tracking-[0.12em] text-white/85 mb-1.5">
                PT Teknologi Kartu Indonesia
              </span>
              <h3 className="font-metro text-2xl sm:text-3xl font-light tracking-tight text-white mb-3">
                Backend Developer Intern
              </h3>
              <p className="text-sm text-white/90 leading-relaxed max-w-md">
                Engineered and maintained scalable backend services and RESTful APIs using FastAPI and MongoDB.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/20 w-full">
              <span className="font-mono text-[11px] text-white/90">
                FastAPI · MongoDB · REST APIs
              </span>
              <span className="inline-flex items-center gap-1.5 font-metro text-xs font-semibold uppercase tracking-wider text-white">
                Details
                <ArrowRight size={14} aria-hidden="true" />
              </span>
            </div>
          </motion.button>

          {/* Wide 2x1 Tile: Campus & Community */}
          <motion.button
            type="button"
            onClick={onViewActivities}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="metro-tile order-3 lg:order-2 col-span-2 bg-[#0F172A] hover:bg-[#1E293B] text-white p-5 sm:p-6 flex flex-col justify-between gap-4 lg:gap-0 text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0078D7]"
          >
            <div className="flex items-center justify-between gap-3 w-full">
              <div className="inline-flex items-center gap-2">
                <Users size={18} className="text-[#38BDF8]" aria-hidden="true" />
                <span className="font-metro text-[11px] font-semibold uppercase tracking-[0.14em] text-[#CBD5E1]">
                  Organizations &amp; Events
                </span>
              </div>
              <span className="font-metro text-[11px] text-[#94A3B8]">2024 – 2026</span>
            </div>

            <div>
              <h3 className="font-metro text-xl font-normal text-white mb-1">
                IPB University · GDGoC · DevFest Bogor
              </h3>
              <p className="text-xs text-[#CBD5E1] leading-relaxed">
                IT Knowledge Judge &amp; Treasurer · MICRO IT SHN Treasurer · Head of Medical Division
              </p>
            </div>
          </motion.button>

          {/* Square Tile: Best International Essay */}
          <motion.button
            type="button"
            onClick={onViewActivities}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="metro-tile order-2 lg:order-3 col-span-1 aspect-square sm:aspect-auto bg-[#008272] hover:bg-[#006B5E] text-white p-3.5 sm:p-5 flex flex-col justify-between text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
          >
            <div className="flex items-center justify-between gap-1.5 w-full">
              <Globe size={18} className="text-white/90 shrink-0" aria-hidden="true" />
              <span className="font-metro text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 truncate">
                International
              </span>
            </div>
            <div>
              <h3 className="font-metro text-sm sm:text-lg font-medium leading-snug text-white">
                Best International Essay
              </h3>
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-white/85">Jombang 19th Dies Natalis</p>
            </div>
          </motion.button>

          {/* Square Tile: Garuda Hacks 4.0 */}
          <motion.button
            type="button"
            onClick={onViewActivities}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="metro-tile order-2 lg:order-4 col-span-1 aspect-square sm:aspect-auto bg-[#5133AB] hover:bg-[#41288E] text-white p-3.5 sm:p-5 flex flex-col justify-between text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
          >
            <div className="flex items-center justify-between gap-1.5 w-full">
              <Sparkles size={18} className="text-white/90 shrink-0" aria-hidden="true" />
              <span className="font-metro text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 truncate">
                Hackathon
              </span>
            </div>
            <div>
              <h3 className="font-metro text-sm sm:text-lg font-medium leading-snug text-white">
                Honorable Mention
              </h3>
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-white/85">Garuda Hacks 4.0</p>
            </div>
          </motion.button>

          {/* Square Tile: PRISMA Festival */}
          <motion.button
            type="button"
            onClick={onViewActivities}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.2 }}
            className="metro-tile order-4 lg:order-5 col-span-1 aspect-square sm:aspect-auto bg-[#B91D47] hover:bg-[#99173B] text-white p-3.5 sm:p-5 flex flex-col justify-between text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
          >
            <div className="flex items-center justify-between gap-1.5 w-full">
              <Trophy size={18} className="text-white/90 shrink-0" aria-hidden="true" />
              <span className="font-metro text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 truncate">
                2025 · National
              </span>
            </div>
            <div>
              <h3 className="font-metro text-sm sm:text-lg font-medium leading-snug text-white">
                2nd Place Web Design
              </h3>
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-white/85">PRISMA Festival</p>
            </div>
          </motion.button>

          {/* Square Tile: LKS Kudus */}
          <motion.button
            type="button"
            onClick={onViewActivities}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="metro-tile order-4 lg:order-6 col-span-1 aspect-square sm:aspect-auto bg-[#C2410C] hover:bg-[#9A3412] text-white p-3.5 sm:p-5 flex flex-col justify-between text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
          >
            <div className="flex items-center justify-between gap-1.5 w-full">
              <Code2 size={18} className="text-white/90 shrink-0" aria-hidden="true" />
              <span className="font-metro text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85 truncate">
                Web Tech
              </span>
            </div>
            <div>
              <h3 className="font-metro text-sm sm:text-lg font-medium leading-snug text-white">
                2nd Place Web Tech
              </h3>
              <p className="mt-0.5 sm:mt-1 text-[11px] sm:text-xs text-white/85">LKS Kudus Regency</p>
            </div>
          </motion.button>

          {/* Wide 2x1 Tile: Full Archive CTA */}
          <motion.button
            type="button"
            onClick={onViewActivities}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="metro-tile order-5 lg:order-7 col-span-2 bg-[#F8FAFC] hover:bg-[#EFF6FF] border border-[#CBD5E1] hover:border-[#0078D7] text-[#0F172A] p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0078D7]"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-[#0078D7] text-white flex items-center justify-center shrink-0">
                <Award size={20} aria-hidden="true" />
              </div>
              <div>
                <span className="block font-metro text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0078D7] mb-1">
                  Complete Record · 10 Entries
                </span>
                <h3 className="font-metro text-lg sm:text-xl font-medium text-[#0F172A]">
                  Open full experience &amp; honors archive
                </h3>
                <p className="mt-0.5 text-xs text-[#475569]">
                  Filter by work experience, competition awards, and campus organizations.
                </p>
              </div>
            </div>
            <ArrowRight size={20} className="text-[#0078D7] shrink-0" aria-hidden="true" />
          </motion.button>
        </div>

        {/* Windows Phone Iconic App-List Circular Arrow on Mobile */}
        <div className="md:hidden mt-4 flex justify-end">
          <button
            type="button"
            onClick={onViewActivities}
            className="min-h-[44px] inline-flex items-center gap-2.5 text-xs font-metro font-medium tracking-wide text-[#0F172A] cursor-pointer"
          >
            <span>All 10 records</span>
            <span className="w-9 h-9 rounded-full border-2 border-[#0F172A] flex items-center justify-center">
              <ArrowRight size={15} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
