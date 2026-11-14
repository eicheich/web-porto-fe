import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Win98WindowControls, PixelFolderIcon } from '../components/RetroStickers';

export default function SoftwareDetailPage({ projectId = 'unravel', onBackToProjects }) {
  const isUFee = projectId === 'ufee';
  const isHijauKita = projectId === 'hijaukita';
  const isUnravel = !isUFee && !isHijauKita;

  const scrollToPreview = () => {
    document.getElementById('board-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14 pb-20">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <button
          onClick={onBackToProjects}
          className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#111827] px-3 py-1.5 cursor-pointer group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          All software projects
        </button>
      </motion.div>

      {/* Title & Summary */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#D4D0C8] win98-raised px-2.5 py-0.5 mb-3">
            <PixelFolderIcon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#000080] uppercase">
              {isHijauKita
                ? 'Garuda Hacks 4.0 Winner · Mobile & Backend'
                : isUnravel
                  ? 'Software / Web Application'
                  : 'Software / Mobile Application'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-[46px] font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-[-0.02em] leading-tight mb-3">
            {isUnravel ? 'Unravel' : isUFee ? 'UFee' : 'HijauKita'}
          </h1>
          <p className="text-base sm:text-lg text-[#E6F4F4] font-normal mb-6 max-w-xl">
            {isUnravel
              ? 'An interactive problem-solving platform combining structured case analysis paths, community discussions, and progress tracking.'
              : isUFee
                ? 'A Flutter mobile sneaker store app designed with a clean editorial catalog and effortless browsing.'
                : 'A sustainability & environmental action app (Garuda Hacks 4.0 International Hackathon winner) built with Flutter, Laravel, and Figma.'}
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={scrollToPreview}
              className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#111827] px-3.5 py-1.5 cursor-pointer"
            >
              Explore the project
              <ArrowDown size={13} className="text-[#000080]" />
            </button>

            {isUnravel && (
              <a
                href="https://unravel-prod.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#000080] px-3.5 py-1.5 cursor-pointer hover:bg-[#FEF08A] transition-colors"
              >
                Live Demo
                <ArrowUpRight size={13} />
              </a>
            )}

            {isHijauKita && (
              <a
                href="https://devpost.com/software/hijaukita"
                target="_blank"
                rel="noopener noreferrer"
                className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#000080] px-3.5 py-1.5 cursor-pointer hover:bg-[#FEF08A] transition-colors"
              >
                View on Devpost
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        <div className="win98-raised px-3 py-1.5 self-start md:self-end">
          <div className="text-xs font-mono font-bold text-[#111827]">
            Software Engineering Project
          </div>
        </div>
      </motion.div>

      {/* Mockup Window Container */}
      <motion.div
        id="board-preview"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-mt-10"
      >
        <div className="win98-window p-1">
          <div className="win98-titlebar">
            <span className="text-[11px] font-bold tracking-wide">
              {isUnravel
                ? 'Unravel — Internet Explorer'
                : isUFee
                  ? 'UFee — Mobile Emulator'
                  : 'HijauKita — Mobile Emulator'}
            </span>
            <Win98WindowControls />
          </div>

          {isUnravel ? (
            /* Unravel: Clean 1998 Browser Mockup */
            <div>
              <div className="flex items-center gap-2 px-2 py-1.5 bg-[#DFDCD4] border-b border-[#808080]">
                <span className="text-[11px] font-mono text-[#374151] shrink-0">Address</span>
                <a
                  href="https://unravel-prod.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="win98-sunken bg-white px-2.5 py-0.5 text-xs font-mono text-[#000080] hover:underline flex-1 truncate"
                >
                  https://unravel-prod.vercel.app/
                </a>
                <a
                  href="https://unravel-prod.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="win98-raised px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#111827] hidden sm:inline-block"
                >
                  Go
                </a>
              </div>
              <div className="win98-sunken bg-white overflow-hidden">
                <img
                  src="/unravel.jpg"
                  alt="Unravel — Structured case analysis platform"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          ) : (
            /* UFee / HijauKita: Clean Smartphone Device Mockup */
            <div className="win98-sunken bg-[#C8C4BC] bg-dither-dots py-8 sm:py-10 px-4 flex justify-center">
              <div className="relative bg-[#18181B] rounded-[2.2rem] p-2.5 shadow-[0_18px_38px_-10px_rgba(0,0,0,0.45)] border border-[#3F3F46] max-w-[270px] w-full">
                {/* Side hardware buttons */}
                <span aria-hidden="true" className="absolute -left-[3px] top-20 w-[3px] h-7 bg-[#3F3F46] rounded-l" />
                <span aria-hidden="true" className="absolute -left-[3px] top-30 w-[3px] h-10 bg-[#3F3F46] rounded-l" />
                <span aria-hidden="true" className="absolute -right-[3px] top-24 w-[3px] h-12 bg-[#3F3F46] rounded-r" />

                <div className="rounded-[1.65rem] overflow-hidden bg-white">
                  <img
                    src={isHijauKita ? '/hijaukita.jpg' : '/ufee.jpg'}
                    alt={
                      isHijauKita
                        ? 'HijauKita — Sustainability app, Garuda Hacks 4.0 Winner'
                        : 'UFee — Flutter sneaker store mobile app'
                    }
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[#E6F4F4] font-mono mt-5">
          {isUnravel
            ? 'Unravel landing & methodology preview'
            : isUFee
              ? 'UFee mobile home screen preview'
              : 'HijauKita mobile app preview · Garuda Hacks 4.0 Winner'}
        </p>
      </motion.div>

      {/* Core features */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="mt-16 mb-14"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-[-0.02em] mb-6">
          Core features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: isUnravel
                ? '1. Real-World Case Breakdown'
                : isUFee
                  ? 'All, Men & Women Categories'
                  : 'Interactive Eco Landscape',
              desc: isUnravel
                ? 'Choose real-world topics and analyze case narratives from multiple angles.'
                : isUFee
                  ? 'Filter the sneaker catalog quickly by collection category.'
                  : 'Visualizes environmental conditions to raise awareness around waste issues.',
            },
            {
              title: isUnravel
                ? '2. 4-Pillar Analysis Framework'
                : isUFee
                  ? 'Editorial New In & Shop'
                  : 'BuGuru AI',
              desc: isUnravel
                ? 'Organize key insights into Goals, Problems, Solutions, and Stakeholders.'
                : isUFee
                  ? 'Highlights new arrivals with full-bleed visuals and direct shopping access.'
                  : 'Interactive AI assistant serving as an in-depth knowledge source on sustainability.',
            },
            {
              title: isUnravel
                ? '3. Compare Perspectives'
                : isUFee
                  ? 'Try It & Free Returns'
                  : 'Activity & Leaderboard',
              desc: isUnravel
                ? 'Compare your structured analysis with peers across the public review forum.'
                : isUFee
                  ? 'Search, shopping bag, recent history, and free return guarantee.'
                  : 'Tracks eco-friendly activities, search, and rankings to keep habits consistent.',
            },
          ].map((feat, idx) => (
            <div key={idx} className="win98-window p-1 flex flex-col">
              <div className="win98-titlebar">
                <span className="text-[11px] font-bold tracking-wide">feature_0{idx + 1}.txt</span>
                <Win98WindowControls />
              </div>
              <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex-1">
                <h3 className="font-display text-base font-bold text-[#111827] mb-1.5">{feat.title}</h3>
                <p className="text-xs text-[#4B5563] font-normal leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="win98-window p-1 flex flex-col">
            <div className="win98-titlebar">
              <span className="text-[11px] font-bold tracking-wide">Why I built this</span>
              <Win98WindowControls />
            </div>
            <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex-1">
              <p className="text-sm text-[#111827] leading-relaxed font-normal">
                {isUnravel
                  ? 'Practicing critical thinking often feels abstract without a clear framework. Unravel brings together interactive learning paths, peer discussions, and progress tracking so learners can break down cases consistently.'
                  : isUFee
                    ? 'Many e-commerce apps feel cluttered with banners and pop-ups. UFee was designed specifically for sneakers, focusing on clean product photography, concise categories, and a smooth mobile shopping flow.'
                    : 'Built for the Garuda Hacks 4.0 International Hackathon (winning an award) to help people understand waste issues and learn sustainability in an engaging way through BuGuru AI and daily eco-actions.'}
              </p>
            </div>
          </div>

          <div className="win98-window p-1 flex flex-col">
            <div className="win98-titlebar">
              <span className="text-[11px] font-bold tracking-wide">My Role &amp; Stack</span>
              <Win98WindowControls />
            </div>
            <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <p className="text-sm text-[#111827] leading-relaxed font-normal mb-4">
                {isUnravel
                  ? 'Designed the neo-brutalist interactive interface, 3-step case analysis workflow, discussion mode, and points/ranking system.'
                  : isUFee
                    ? 'Built the cross-platform mobile application in Flutter with bottom tab navigation, category filtering, and an editorial catalog layout.'
                    : 'Designed the UI/UX in Figma, developed the mobile app in Flutter, and integrated backend services and API logic with Laravel.'}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#D4D0C8]">
                {(isUnravel
                  ? ['React', 'Tailwind CSS', 'Interactive UI', 'Case Study']
                  : isUFee
                    ? ['Flutter', 'Dart', 'Mobile UI', 'E-Commerce']
                    : ['Flutter', 'Laravel', 'Figma', 'Garuda Hacks 4.0']
                ).map((tag, i) => (
                  <span key={i} className="win98-raised text-[11px] font-mono font-bold bg-[#D4D0C8] px-2.5 py-0.5 text-[#111827]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* More projects Win98 banner */}
      <div className="win98-window p-1">
        <div className="win98-titlebar">
          <span className="text-[11px] font-bold tracking-wide">more_projects.exe</span>
          <Win98WindowControls />
        </div>
        <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex items-center justify-between gap-4">
          <h3 className="font-display text-lg font-bold text-[#111827] tracking-tight">
            More projects
          </h3>
          <button
            onClick={onBackToProjects}
            className="win98-raised inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111827] px-4 py-2 cursor-pointer group"
          >
            All software projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  );
}
