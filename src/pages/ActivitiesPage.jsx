import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Award, BookOpen, MessageSquare } from 'lucide-react';
import { Win98WindowControls, PixelDocIcon } from '../components/RetroStickers';

export default function ActivitiesPage({ onBackToHome, onOpenContact }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'judging' | 'campus' | 'workshops'

  const activities = [
    {
      id: 'judging',
      badge: 'IT Events',
      year: '2025 – 2026',
      nodeBg: '#F5EDD6',
      title: 'IT & Student Innovation Judge',
      role: 'Judge & Prototype Reviewer',
      summary:
        'Evaluated student software and machine learning prototypes during IT competitions and innovation showcases.',
      impact:
        'Helped teams clarify who their users are, whether the solution solves the problem, and how to present it clearly.',
      highlights: ['Prototype Evaluation', 'Usability Feedback', 'Feasibility'],
      icon: <Award size={15} className="text-[#000080]" />,
    },
    {
      id: 'campus',
      badge: 'IPB University',
      year: 'Ongoing',
      nodeBg: '#DCEDFB',
      title: 'Software Engineering Community & Team Projects',
      role: 'Software Engineering Student',
      summary:
        'Collaborating with fellow IPB University students on team-based software builds, hackathons, and campus tech initiatives.',
      impact:
        'Practiced dividing tasks fairly, communicating blockers early, and shipping working web and mobile projects on time.',
      highlights: ['Agile Teamwork', 'UI/UX Collaboration', 'Problem Solving'],
      logo: '/logo-ipb.png',
    },
    {
      id: 'workshops',
      badge: 'Peer Learning',
      year: '2025 – 2026',
      nodeBg: '#E5EED4',
      title: 'Breaking Down Tech for Beginners',
      role: 'Study Group Lead & Peer Mentor',
      summary:
        'Facilitated hands-on study sessions covering Python, machine learning basics, and modern web interfaces with React.',
      impact:
        'Explained complex AI and coding concepts in plain language so beginners feel confident building their own experiments.',
      highlights: ['Public Speaking', 'Mentoring', 'Clear Communication'],
      icon: <BookOpen size={15} className="text-[#000080]" />,
    },
  ];

  const filters = [
    { id: 'all', label: 'All highlights' },
    { id: 'judging', label: 'Judging & Mentoring' },
    { id: 'campus', label: 'Campus & Community' },
    { id: 'workshops', label: 'Workshops & Sharing' },
  ];

  const filteredActivities =
    activeFilter === 'all'
      ? activities
      : activities.filter((item) => item.id === activeFilter);

  return (
    <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14 pb-20 relative">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 flex justify-center sm:justify-start relative z-10"
      >
        <button
          onClick={onBackToHome}
          className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#111827] px-3 py-1.5 cursor-pointer group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </button>
      </motion.div>

      {/* Centered Desktop Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-xl mx-auto mb-8 relative z-10"
      >
        <div className="inline-flex items-center gap-1.5 bg-[#D4D0C8] win98-raised px-2.5 py-0.5 mb-3">
          <PixelDocIcon className="w-3.5 h-3.5" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#000080] uppercase">
            Experience & Highlights
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-[44px] font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-[-0.02em] leading-tight mb-3">
          Learning from people, too.
        </h1>
        <p className="text-sm sm:text-base text-[#E6F4F4] leading-relaxed font-normal">
          IT events, judging experiences, campus collaboration, and peer workshops.
        </p>
      </motion.div>

      {/* Centered Win98 Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.06 }}
        className="flex justify-center mb-12 relative z-10"
      >
        <div className="win98-window p-1 inline-flex flex-wrap items-center justify-center gap-1">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3.5 sm:px-4 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                  isActive
                    ? 'win98-sunken bg-[#FAF8F2] text-[#000080]'
                    : 'win98-raised text-[#111827] hover:bg-[#E4E0D8]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Win98 Vertical Timeline */}
      <div className="relative space-y-6 sm:pl-11 before:hidden sm:before:block before:content-[''] before:absolute before:left-[15px] before:top-6 before:bottom-6 before:w-[2px] before:bg-white/35">
        <AnimatePresence mode="popLayout">
          {filteredActivities.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="relative group"
            >
              {/* Pastel Win98 Square Timeline Node */}
              <div
                style={{ backgroundColor: item.nodeBg }}
                className="hidden sm:flex absolute -left-11 top-5 w-8 h-8 win98-raised items-center justify-center z-10"
              >
                {item.logo ? (
                  <img src={item.logo} alt={item.badge} className="w-4 h-4 object-contain" />
                ) : (
                  item.icon
                )}
              </div>

              {/* Win98 Timeline Window Card */}
              <div className="win98-window p-1">
                <div className="win98-titlebar">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold tracking-wide">
                      {item.badge} — {item.year}
                    </span>
                  </div>
                  <Win98WindowControls />
                </div>

                <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-7">
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111827] tracking-tight mb-1 group-hover:text-[#000080] transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs font-mono font-bold text-[#4B5563] mb-4">
                    {item.role}
                  </p>

                  <p className="text-sm text-[#111827] leading-relaxed font-normal mb-3">
                    {item.summary}
                  </p>
                  <p className="text-xs sm:text-[13.5px] text-[#4B5563] leading-relaxed font-normal mb-5">
                    {item.impact}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#D4D0C8]">
                    {item.highlights.map((tag) => (
                      <span
                        key={tag}
                        className="win98-raised text-[11px] bg-[#D4D0C8] px-2.5 py-0.5 text-[#111827] font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Bottom Win98 CTA Window */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4 }}
        className="win98-window p-1 mt-12"
      >
        <div className="win98-titlebar">
          <span className="text-[11px] font-bold tracking-wide">connect.exe</span>
          <Win98WindowControls />
        </div>

        <div className="win98-sunken bg-[#FAF8F2] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111827] tracking-tight mb-1">
              Have an event, project, or idea?
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] font-normal">
              Open to internships, student collaborations, and tech sharing sessions.
            </p>
          </div>

          <button
            onClick={onOpenContact}
            className="win98-raised inline-flex items-center gap-2 px-5 py-2.5 text-[#111827] text-xs sm:text-sm font-bold cursor-pointer shrink-0"
          >
            <MessageSquare size={14} className="text-[#000080]" />
            Let's connect
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </main>
  );
}
