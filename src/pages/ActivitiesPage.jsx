import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Briefcase, MessageSquare, Trophy, Users, X } from 'lucide-react';
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

const CERTIFICATES_DATA = [
  {
    id: 'google-gemini',
    title: 'Gemini Certified Student (Google AI)',
    issuer: 'Google for Education',
    date: 'Nov 2026',
    image: '/cert-google-gemini.png',
    accent: '#1A73E8',
    gridSpan: 'md:col-span-2 lg:col-span-7',
  },
  {
    id: 'amd-ai-academy',
    title: 'AI on AMD',
    issuer: 'AMD AI Academy',
    date: 'Oct 2026',
    image: '/cert-amd-ai.jpg',
    accent: '#0F172A',
    gridSpan: 'md:col-span-1 lg:col-span-5',
  },
  {
    id: 'garuda-hacks-2023',
    title: 'Honorable Mention Sustainability Hack (HijauKita)',
    issuer: 'Garuda Hacks 4.0',
    date: 'Jul 2023',
    image: '/cert-garuda-hacks.jpg',
    accent: '#4C0519',
    gridSpan: 'md:col-span-1 lg:col-span-5',
  },
  {
    id: 'web-design-uinsa',
    title: 'Juara II — Web Design Competition Nasional',
    issuer: 'Pekan Raya SI · UIN Sunan Ampel Surabaya',
    date: 'Dec 2025',
    image: '/cert-web-design-uinsa.jpg',
    accent: '#1D4ED8',
    gridSpan: 'md:col-span-2 lg:col-span-7',
  },
  {
    id: 'hackerrank-problem-solving',
    title: 'Problem Solving (Basic)',
    issuer: 'HackerRank',
    date: 'Dec 2023',
    image: '/cert-hackerrank-problem-solving.jpg',
    accent: '#15803D',
    gridSpan: 'md:col-span-1 lg:col-span-6',
  },
  {
    id: 'github-career-essentials',
    title: 'Career Essentials in GitHub',
    issuer: 'LinkedIn Learning · GitHub',
    date: 'Jan 2025',
    image: '/cert-github.jpg',
    accent: '#0078D7',
    gridSpan: 'md:col-span-1 lg:col-span-6',
  },
  {
    id: 'essay-stikes',
    title: 'Best International Essay Category',
    issuer: 'STIKES Pemkab Jombang',
    date: 'Dec 2025',
    image: '/cert-essay-stikes.jpg',
    accent: '#0D9488',
    gridSpan: 'md:col-span-1 lg:col-span-6',
  },
  {
    id: 'siswa-berprestasi',
    title: 'Piagam Siswa Berprestasi HUT RI ke-78',
    issuer: 'SMK Raden Umar Said Kudus',
    date: 'Aug 2023',
    image: '/cert-siswa-berprestasi.jpg',
    accent: '#B91D47',
    gridSpan: 'md:col-span-1 lg:col-span-6',
  },
  {
    id: 'it-knowledge-ipb',
    title: 'IT Knowledge Committee (UI/UX)',
    issuer: 'Himavo Micro IT · IPB University',
    date: 'Jun 2025',
    image: '/cert-it-knowledge.jpg',
    accent: '#008272',
    gridSpan: 'md:col-span-1 lg:col-span-6',
  },
  {
    id: 'lumos-html',
    title: 'HTML Certification',
    issuer: 'Lumos Learning',
    date: 'Dec 2021',
    image: '/cert-lumos-html.png',
    accent: '#2563EB',
    gridSpan: 'md:col-span-1 lg:col-span-6',
  },
  {
    id: 'sololearn-python',
    title: 'Python Intermediate',
    issuer: 'SoloLearn',
    date: 'Aug 2024',
    image: '/cert-sololearn-python.jpg',
    accent: '#D97706',
    gridSpan: 'md:col-span-1 lg:col-span-4',
  },
  {
    id: 'exabytes-pm',
    title: 'Basic Principle of Product Management',
    issuer: 'Exabytes Developer Club',
    date: 'Feb 2023',
    image: '/cert-exabytes-pm.jpg',
    accent: '#0284C7',
    gridSpan: 'md:col-span-1 lg:col-span-4',
  },
  {
    id: 'sololearn-csharp',
    title: 'C# Course Certificate',
    issuer: 'SoloLearn',
    date: 'Oct 2022',
    image: '/cert-sololearn-csharp.png',
    accent: '#6D28D9',
    gridSpan: 'md:col-span-1 lg:col-span-4',
  },
  {
    id: 'sql-greatlearning',
    title: 'SQL Projects for Beginners',
    issuer: 'Great Learning Academy',
    date: 'Oct 2022',
    image: '/cert-sql-greatlearning.png',
    accent: '#2563EB',
    gridSpan: 'md:col-span-1 lg:col-span-3',
  },
  {
    id: 'greatlearning-java',
    title: 'Java Programming',
    issuer: 'Great Learning Academy',
    date: 'Oct 2022',
    image: '/cert-greatlearning-java.png',
    accent: '#EA580C',
    gridSpan: 'md:col-span-1 lg:col-span-3',
  },
  {
    id: 'greatlearning-python',
    title: 'Python Fundamentals for Beginners',
    issuer: 'Great Learning Academy',
    date: 'Oct 2022',
    image: '/cert-greatlearning-python.png',
    accent: '#10B981',
    gridSpan: 'md:col-span-1 lg:col-span-3',
  },
  {
    id: 'greatlearning-css',
    title: 'Front End Development - CSS',
    issuer: 'Great Learning Academy',
    date: 'Oct 2022',
    image: '/cert-greatlearning-css.png',
    accent: '#4F46E5',
    gridSpan: 'md:col-span-1 lg:col-span-3',
  },
];

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'work', label: 'Work' },
  { id: 'awards', label: 'Awards' },
  { id: 'organizations', label: 'Organizations' },
  { id: 'certificates', label: 'Certificates' },
];

export default function ActivitiesPage({ onBackToHome, onOpenContact }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCert, setSelectedCert] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!selectedCert) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCert]);

  const countFor = (id) =>
    id === 'all'
      ? ACTIVITIES_DATA.length
      : id === 'certificates'
        ? CERTIFICATES_DATA.length
        : ACTIVITIES_DATA.filter((item) => item.category === id).length;

  const filteredActivities =
    activeFilter === 'all'
      ? ACTIVITIES_DATA
      : ACTIVITIES_DATA.filter((item) => item.category === activeFilter);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-10 pt-6 sm:pt-14 pb-14 sm:pb-20">
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
        className="flex flex-wrap items-baseline gap-x-5 gap-y-1 sm:gap-8 border-b border-[#E2E8F0] mb-8"
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
              className={`min-h-[44px] pb-3 -mb-[1px] font-metro text-lg sm:text-2xl font-light transition-colors cursor-pointer inline-flex items-baseline gap-2 border-b-2 ${
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

      {/* Windows 8 Metro Tile Grid (Asymmetric Multi-Sized Bento Grid) */}
      {activeFilter === 'certificates' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 items-stretch">
          {CERTIFICATES_DATA.map((cert, idx) => (
            <motion.button
              key={cert.id}
              type="button"
              onClick={() => setSelectedCert(cert)}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              style={{ borderTopColor: cert.accent }}
              className={`group metro-tile ${cert.gridSpan} bg-white border border-[#CBD5E1] border-t-4 flex flex-col justify-between text-left cursor-pointer overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0078D7] shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="w-full flex-1 bg-[#F8FAFC] flex items-center justify-center overflow-hidden">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              <div
                style={{ backgroundColor: cert.accent }}
                className="w-full px-4 py-2.5 sm:py-3 text-white flex items-center justify-between gap-3 shrink-0"
              >
                <div className="min-w-0">
                  <h2 className="font-metro text-sm sm:text-base font-medium leading-tight truncate">
                    {cert.title}
                  </h2>
                  <p className="font-mono text-[10px] sm:text-[11px] text-white/85 truncate">
                    {cert.issuer}
                  </p>
                </div>
                <span className="font-mono text-[10px] sm:text-[11px] bg-white/15 px-2.5 py-0.5 shrink-0">
                  {cert.date}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      ) : (
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
      )}

      {/* Certificate Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedCert.title}
          onClick={() => setSelectedCert(null)}
          className="fixed inset-0 z-50 bg-black/80 p-4 sm:p-8 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white border-t-4 border-t-[#0078D7] max-w-3xl w-full overflow-hidden shadow-2xl"
          >
            <div className="bg-[#0F172A] text-white px-5 py-3 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-metro text-base font-medium truncate">{selectedCert.title}</p>
                <p className="font-mono text-[11px] text-[#CBD5E1] truncate">
                  {selectedCert.issuer} · {selectedCert.date}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate preview"
                className="w-9 h-9 bg-white/10 hover:bg-[#0078D7] text-white flex items-center justify-center shrink-0 cursor-pointer transition-colors"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="bg-[#F8FAFC] p-3 sm:p-5 flex justify-center">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

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
