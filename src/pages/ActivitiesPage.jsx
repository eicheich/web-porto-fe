import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Award, Briefcase, Users, MessageSquare } from 'lucide-react';
import { Win98WindowControls, PixelDocIcon } from '../components/RetroStickers';

export default function ActivitiesPage({ onBackToHome, onOpenContact }) {
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'work' | 'awards' | 'organizations'

  const activities = [
    {
      id: 'tki-intern',
      category: 'work',
      badge: 'Work Experience',
      year: '2023 – 2024',
      nodeBg: '#DCEDFB',
      title: 'Backend Developer Intern',
      role: 'PT Teknologi Kartu Indonesia',
      summary:
        'Engineered and maintained scalable backend services and RESTful APIs using FastAPI and MongoDB.',
      highlights: ['FastAPI', 'MongoDB', 'RESTful APIs', 'Backend'],
      icon: <Briefcase size={15} className="text-[#000080]" />,
    },
    {
      id: 'jombang-essay',
      category: 'awards',
      badge: 'Honors & Awards',
      year: 'International',
      nodeBg: '#F5EDD6',
      title: 'Best International Essay',
      role: 'International Essay Competition — 19th Dies Natalis of the Government of Jombang Regency',
      summary:
        'Awarded Best International Essay for delivering a structured, research-backed written analysis addressing regional and global development themes.',
      highlights: ['Research Writing', 'Regional & Global Themes'],
      icon: <Award size={15} className="text-[#000080]" />,
    },
    {
      id: 'prisma-2025',
      category: 'awards',
      badge: 'Honors & Awards',
      year: '2025',
      nodeBg: '#F5EDD6',
      title: '2nd Place Winner — Web Design Competition',
      role: 'PRISMA Festival',
      summary:
        'Designed and built a responsive, user-centric web interface focusing on modern UI/UX principles.',
      highlights: ['Web Design', 'Responsive UI', 'UI/UX'],
      icon: <Award size={15} className="text-[#000080]" />,
    },
    {
      id: 'lks-2024',
      category: 'awards',
      badge: 'Honors & Awards',
      year: '2024',
      nodeBg: '#F5EDD6',
      title: '2nd Place Winner — LKS (Student Competency Competition) in Web Design',
      role: 'Kudus Regency Level',
      summary:
        'Competed at the regency level in full-cycle web design, layout structuring, and front-end implementation.',
      highlights: ['Web Design', 'Layout Structuring', 'Front-End'],
      icon: <Award size={15} className="text-[#000080]" />,
    },
    {
      id: 'garuda-hacks-2023',
      category: 'awards',
      badge: 'Honors & Awards',
      year: '2023',
      nodeBg: '#F5EDD6',
      title: 'Honorable Mention',
      role: 'Garuda Hacks 4.0 International Hackathon',
      summary:
        'Collaborated in an international hackathon environment to build and pitch a functional tech prototype under tight deadlines.',
      highlights: ['International Hackathon', 'Prototyping', 'Pitching'],
      icon: <Award size={15} className="text-[#000080]" />,
    },
    {
      id: 'it-knowledge-2025',
      category: 'organizations',
      badge: 'Organizations, Leadership & Events',
      year: '2025',
      nodeBg: '#E5EED4',
      title: 'Treasurer & UI/UX Competition Judge',
      role: 'IT Knowledge, IPB University',
      summary:
        "Managed event budgeting and financial allocations while serving on the judging panel to evaluate participants' UI/UX design submissions.",
      highlights: ['UI/UX Judging', 'Budgeting', 'IPB University'],
      logo: '/logo-ipb.png',
    },
    {
      id: 'medical-div-2025',
      category: 'organizations',
      badge: 'Organizations, Leadership & Events',
      year: '2025',
      nodeBg: '#E5EED4',
      title: 'Head of Medical Division',
      role: 'Software Engineering Study Program Orientation, IPB University',
      summary:
        'Led the medical response team and coordinated health logistics to ensure participant safety throughout the orientation program.',
      highlights: ['Leadership', 'Logistics', 'Team Coordination'],
      logo: '/logo-ipb.png',
    },
    {
      id: 'micro-it-2024',
      category: 'organizations',
      badge: 'Organizations, Leadership & Events',
      year: '2024 – 2025',
      nodeBg: '#E5EED4',
      title: 'Division Treasurer — Software, Hardware, and Networking (SHN)',
      role: 'MICRO IT, IPB University',
      summary:
        'Handled financial tracking, budgeting, and administrative reporting for the SHN technical division.',
      highlights: ['Financial Tracking', 'SHN Division', 'MICRO IT'],
      logo: '/logo-ipb.png',
    },
    {
      id: 'gdgoc-2024',
      category: 'organizations',
      badge: 'Organizations, Leadership & Events',
      year: '2024 – 2025',
      nodeBg: '#E5EED4',
      title: 'Active Member',
      role: 'Google Developer Groups on Campus (GDGoC), IPB University',
      summary:
        'Participated in developer workshops, tech talks, and collaborative peer-learning sessions.',
      highlights: ['GDGoC IPB', 'Workshops', 'Peer Learning'],
      icon: <Users size={15} className="text-[#000080]" />,
    },
    {
      id: 'devfest-2025',
      category: 'organizations',
      badge: 'Organizations, Leadership & Events',
      year: '2025 & 2026',
      nodeBg: '#E5EED4',
      title: 'Participant',
      role: 'Google Developer Festival (DevFest) Bogor',
      summary:
        'Attended regional developer conferences exploring cloud, web, and AI advancements; notably inspired by Data Scientist speaker Arsy Arlina during the 2025 session, sparking deeper interest in applied data science.',
      highlights: ['DevFest Bogor', 'Cloud & AI', 'Applied Data Science'],
      icon: <Users size={15} className="text-[#000080]" />,
    },
  ];

  const filters = [
    { id: 'all', label: 'All highlights' },
    { id: 'work', label: 'Work Experience' },
    { id: 'awards', label: 'Honors & Awards' },
    { id: 'organizations', label: 'Organizations & Events' },
  ];

  const filteredActivities =
    activeFilter === 'all'
      ? activities
      : activities.filter((item) => item.category === activeFilter);

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
            Experience &amp; Highlights
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-[44px] font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-[-0.02em] leading-tight mb-3">
          Experience &amp; Highlights.
        </h1>
        <p className="text-sm sm:text-base text-[#E6F4F4] leading-relaxed font-normal">
          Work experience, honors &amp; awards, organizations, leadership, and tech events.
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
              transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
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
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-[11px] font-bold tracking-wide truncate">
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

                  <p className="text-sm text-[#111827] leading-relaxed font-normal mb-5">
                    {item.summary}
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
