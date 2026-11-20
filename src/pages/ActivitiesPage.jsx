import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Briefcase, MessageSquare, Trophy, Users } from 'lucide-react';
import Button from '../components/Button';

const TYPE_META = {
  work: { label: 'Work', Icon: Briefcase, accent: '#0078D7' },
  awards: { label: 'Award', Icon: Trophy, accent: '#B91D47' },
  organizations: { label: 'Community', Icon: Users, accent: '#008272' },
};

const ACTIVITIES_DATA = [
  {
    id: 'tki-intern',
    category: 'work',
    year: '2023 – 2024',
    title: 'Backend Developer Intern',
    role: 'PT Teknologi Kartu Indonesia',
    summary:
      'Engineered and maintained scalable backend services and RESTful APIs using FastAPI and MongoDB.',
    highlights: ['FastAPI', 'MongoDB', 'RESTful APIs', 'Backend'],
  },
  {
    id: 'jombang-essay',
    category: 'awards',
    year: 'International',
    title: 'Best International Essay',
    role: 'International Essay Competition — 19th Dies Natalis of the Government of Jombang Regency',
    summary:
      'Awarded Best International Essay for delivering a structured, research-backed written analysis addressing regional and global development themes.',
    highlights: ['Research Writing', 'Regional & Global Themes'],
  },
  {
    id: 'prisma-2025',
    category: 'awards',
    year: '2025',
    title: '2nd Place Winner — Web Design Competition',
    role: 'PRISMA Festival',
    summary:
      'Designed and built a responsive, user-centric web interface focusing on modern UI/UX principles.',
    highlights: ['Web Design', 'Responsive UI', 'UI/UX'],
  },
  {
    id: 'lks-2024',
    category: 'awards',
    year: '2024',
    title: '2nd Place Winner — LKS (Student Competency Competition) in Web Design',
    role: 'Kudus Regency Level',
    summary:
      'Competed at the regency level in full-cycle web design, layout structuring, and front-end implementation.',
    highlights: ['Web Design', 'Layout Structuring', 'Front-End'],
  },
  {
    id: 'garuda-hacks-2023',
    category: 'awards',
    year: '2023',
    title: 'Honorable Mention',
    role: 'Garuda Hacks 4.0 International Hackathon',
    summary:
      'Collaborated in an international hackathon environment to build and pitch a functional tech prototype under tight deadlines.',
    highlights: ['International Hackathon', 'Prototyping', 'Pitching'],
  },
  {
    id: 'it-knowledge-2025',
    category: 'organizations',
    year: '2025',
    title: 'Treasurer & UI/UX Competition Judge',
    role: 'IT Knowledge, IPB University',
    summary:
      "Managed event budgeting and financial allocations while serving on the judging panel to evaluate participants' UI/UX design submissions.",
    highlights: ['UI/UX Judging', 'Budgeting', 'IPB University'],
  },
  {
    id: 'medical-div-2025',
    category: 'organizations',
    year: '2025',
    title: 'Head of Medical Division',
    role: 'Software Engineering Study Program Orientation, IPB University',
    summary:
      'Led the medical response team and coordinated health logistics to ensure participant safety throughout the orientation program.',
    highlights: ['Leadership', 'Logistics', 'Team Coordination'],
  },
  {
    id: 'micro-it-2024',
    category: 'organizations',
    year: '2024 – 2025',
    title: 'Division Treasurer — Software, Hardware, and Networking (SHN)',
    role: 'MICRO IT, IPB University',
    summary:
      'Handled financial tracking, budgeting, and administrative reporting for the SHN technical division.',
    highlights: ['Financial Tracking', 'SHN Division', 'MICRO IT'],
  },
  {
    id: 'gdgoc-2024',
    category: 'organizations',
    year: '2024 – 2025',
    title: 'Active Member',
    role: 'Google Developer Groups on Campus (GDGoC), IPB University',
    summary:
      'Participated in developer workshops, tech talks, and collaborative peer-learning sessions.',
    highlights: ['GDGoC IPB', 'Workshops', 'Peer Learning'],
  },
  {
    id: 'devfest-2025',
    category: 'organizations',
    year: '2025 & 2026',
    title: 'Participant',
    role: 'Google Developer Festival (DevFest) Bogor',
    summary:
      'Attended regional developer conferences exploring cloud, web, and AI advancements; notably inspired by Data Scientist speaker Arsy Arlina during the 2025 session, sparking deeper interest in applied data science.',
    highlights: ['DevFest Bogor', 'Cloud & AI', 'Applied Data Science'],
  },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Work' },
  { id: 'awards', label: 'Awards' },
  { id: 'organizations', label: 'Organizations' },
];

export default function ActivitiesPage({ onBackToHome, onOpenContact }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const prefersReducedMotion = useReducedMotion();

  const countFor = (id) =>
    id === 'all'
      ? ACTIVITIES_DATA.length
      : ACTIVITIES_DATA.filter((item) => item.category === id).length;

  const filteredActivities =
    activeFilter === 'all'
      ? ACTIVITIES_DATA
      : ACTIVITIES_DATA.filter((item) => item.category === activeFilter);

  return (
    <main className="max-w-6xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14 pb-20">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between gap-4 pb-6 mb-10 border-b border-[#E2E8F0]">
        <Button onClick={onBackToHome} className="group min-h-[44px]">
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
            aria-hidden="true"
          />
          <span>Back to home</span>
        </Button>

        <span className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
          Archive · {ACTIVITIES_DATA.length} Records
        </span>
      </div>

      {/* Metro Editorial Header */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="max-w-2xl mb-8"
      >
        <span className="inline-block bg-[#0F172A] text-white px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
          Experience &amp; Honors
        </span>
        <h1 className="font-metro text-4xl sm:text-5xl font-light text-[#0F172A] tracking-tight leading-[1.08] mb-3">
          Track record &amp; archive.
        </h1>
        <p className="text-base text-[#475569] leading-relaxed">
          Industry internship, competition awards, campus leadership, and developer events.
        </p>
      </motion.div>

      {/* Windows 8 Metro Pivot Navigation */}
      <div
        role="tablist"
        aria-label="Highlight categories"
        className="flex flex-wrap items-baseline gap-6 sm:gap-8 border-b border-[#E2E8F0] mb-8"
      >
        {FILTERS.map((f) => {
          const isActive = activeFilter === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveFilter(f.id)}
              className={`pb-3 -mb-[1px] font-metro text-xl sm:text-2xl font-light transition-colors cursor-pointer inline-flex items-baseline gap-2 border-b-2 ${
                isActive
                  ? 'border-[#0078D7] text-[#0F172A] font-normal'
                  : 'border-transparent text-[#94A3B8] hover:text-[#475569]'
              }`}
            >
              <span>{f.label}</span>
              <span className="font-mono text-xs">{countFor(f.id)}</span>
            </button>
          );
        })}
      </div>

      {/* Windows 8 Metro Tile Grid (Zero Dropdowns — All Info Scannable Directly) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredActivities.map((item, idx) => {
          const meta = TYPE_META[item.category];
          const isFeaturedWork = item.category === 'work';

          if (isFeaturedWork) {
            return (
              <motion.article
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.03 }}
                className="md:col-span-2 bg-[#0078D7] text-white p-6 sm:p-8 flex flex-col justify-between gap-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2.5">
                    <span className="w-9 h-9 bg-white/15 flex items-center justify-center shrink-0">
                      <meta.Icon size={18} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-white/90">
                      {meta.label} · {item.role}
                    </span>
                  </div>
                  <span className="font-mono text-xs bg-white/15 px-2.5 py-1 text-white">
                    {item.year}
                  </span>
                </div>

                <div>
                  <h2 className="font-metro text-2xl sm:text-3xl font-light text-white mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl">
                    {item.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/20">
                  {item.highlights.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/15 text-white font-mono text-[11px] font-semibold px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          }

          return (
            <motion.article
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              style={{ borderLeftColor: meta.accent }}
              className="bg-white border border-[#CBD5E1] border-l-4 p-6 flex flex-col justify-between gap-5"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="inline-flex items-center gap-2.5">
                    <span
                      style={{ backgroundColor: meta.accent }}
                      className="w-8 h-8 text-white flex items-center justify-center shrink-0"
                    >
                      <meta.Icon size={15} aria-hidden="true" />
                    </span>
                    <span
                      style={{ color: meta.accent }}
                      className="font-mono text-[11px] font-bold uppercase tracking-wider"
                    >
                      {meta.label}
                    </span>
                  </div>

                  <span className="font-mono text-xs text-[#64748B] bg-[#F8FAFC] border border-[#E2E8F0] px-2.5 py-0.5">
                    {item.year}
                  </span>
                </div>

                <h2 className="font-metro text-xl font-medium text-[#0F172A] leading-snug mb-1">
                  {item.title}
                </h2>
                <p className="font-mono text-xs text-[#64748B] mb-3">{item.role}</p>
                <p className="text-sm text-[#475569] leading-relaxed">{item.summary}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#E2E8F0]">
                {item.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] font-mono text-[11px] font-semibold px-2.5 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Bottom Metro CTA */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.4 }}
        className="mt-12 bg-[#0F172A] border-t-4 border-t-[#0078D7] text-white p-7 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
      >
        <div>
          <h2 className="font-metro text-2xl font-light text-white tracking-tight mb-1">
            Have an event, project, or idea?
          </h2>
          <p className="text-sm text-[#CBD5E1]">
            Open to internships, engineering collaborations, and tech sharing sessions.
          </p>
        </div>

        <Button variant="primary" onClick={onOpenContact} className="shrink-0 min-h-[44px]">
          <MessageSquare size={14} aria-hidden="true" />
          <span>Let&apos;s connect</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Button>
      </motion.div>
    </main>
  );
}
