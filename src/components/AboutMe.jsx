import React from 'react';
import { Sparkles, Brain, Code } from 'lucide-react';

// Brand & Technology Icons
const PyTorchIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M12.5 2.5L11.5 3.5C8.8 6.2 8.7 10.6 11.2 13.4L11.5 13.8L12.7 12.6L12.4 12.3C10.5 10.2 10.6 6.9 12.7 4.8L13.5 4L12.5 2.5Z" fill="#EE4C2C" />
    <path d="M16.5 7.5C16.2 7.2 15.8 7.2 15.5 7.5C15.2 7.8 15.2 8.2 15.5 8.5C16.3 9.3 16.7 10.3 16.7 11.4C16.7 12.5 16.3 13.5 15.5 14.3C14.7 15.1 13.7 15.5 12.6 15.5C11.5 15.5 10.5 15.1 9.7 14.3C9 13.5 8.5 12.5 8.5 11.4C8.5 10.3 8.9 9.3 9.7 8.5L8.7 7.5C7.7 8.5 7.1 9.9 7.1 11.4C7.1 12.9 7.7 14.2 8.7 15.3C9.7 16.4 11.1 17 12.6 17C14.1 17 15.5 16.4 16.5 15.3C17.5 14.3 18.1 12.9 18.1 11.4C18.1 9.9 17.5 8.5 16.5 7.5Z" fill="#EE4C2C" />
    <circle cx="17.2" cy="6.8" r="1.2" fill="#EE4C2C" />
  </svg>
);

const PythonIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M11.9 2C6.9 2 7.2 4.2 7.2 4.2L7.2 6.4H12.1V7.1H5.3C5.3 7.1 2 6.7 2 11.8C2 16.8 4.9 16.6 4.9 16.6H6.6V14.3C6.6 14.3 6.4 11.5 9.3 11.5H14.1C14.1 11.5 16.7 11.6 16.7 9.1L16.7 4.4C16.7 4.4 17.1 2 11.9 2ZM9.4 3.7C9.9 3.7 10.3 4.1 10.3 4.6C10.3 5.1 9.9 5.5 9.4 5.5C8.9 5.5 8.5 5.1 8.5 4.6C8.5 4.1 8.9 3.7 9.4 3.7Z" fill="#387eb8" />
    <path d="M12.1 22C17.1 22 16.8 19.8 16.8 19.8L16.8 17.6H11.9V16.9H18.7C18.7 16.9 22 17.3 22 12.2C22 7.2 19.1 7.4 19.1 7.4H17.4V9.7C17.4 9.7 17.6 12.5 14.7 12.5H9.9C9.9 12.5 7.3 12.4 7.3 14.9L7.3 19.6C7.3 19.6 6.9 22 12.1 22ZM14.6 20.3C14.1 20.3 13.7 19.9 13.7 19.4C13.7 18.9 14.1 18.5 14.6 18.5C15.1 18.5 15.5 18.9 15.5 19.4C15.5 19.9 15.1 20.3 14.6 20.3Z" fill="#ffe052" />
  </svg>
);

const ReactIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
    <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" stroke="#61DAFB" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="1.5" fill="#61DAFB" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#38BDF8">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
  </svg>
);

const FastAPIIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#059669" />
    <path d="M13 3L6 14H12L11 21L18 10H12L13 3Z" fill="white" />
  </svg>
);

const NodeIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#68A063">
    <path d="M12 2L3.5 7V17L12 22L20.5 17V7L12 2ZM12 4.3L18.5 8V16L12 19.7L5.5 16V8L12 4.3Z" />
  </svg>
);

const ScikitIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="8" cy="12" r="5" fill="#F7931E" opacity="0.9" />
    <circle cx="16" cy="12" r="5" fill="#3499CD" opacity="0.9" />
  </svg>
);

export default function AboutMe() {
  const techStacks = [
    {
      category: 'Machine Learning & Data',
      skills: [
        { name: 'Python', icon: <PythonIcon /> },
        { name: 'PyTorch', icon: <PyTorchIcon /> },
        { name: 'Scikit-Learn', icon: <ScikitIcon /> },
        { name: 'Hugging Face', icon: <span className="text-xs">🤗</span> },
        { name: 'NumPy', icon: <span className="text-[10px] font-bold text-sky-400 font-mono">NP</span> },
        { name: 'Pandas', icon: <span className="text-[10px] font-bold text-purple-400 font-mono">PD</span> },
      ],
    },
    {
      category: 'Software & Web Development',
      skills: [
        { name: 'React', icon: <ReactIcon /> },
        { name: 'Tailwind CSS', icon: <TailwindIcon /> },
        { name: 'FastAPI', icon: <FastAPIIcon /> },
        { name: 'Node.js', icon: <NodeIcon /> },
        { name: 'JavaScript', icon: <span className="w-3.5 h-3.5 bg-[#F7DF1E] text-black font-extrabold text-[8px] rounded-[2px] flex items-center justify-center leading-none">JS</span> },
      ],
    },
    {
      category: 'Core Focus Areas',
      skills: [
        { name: 'NLP & Text Classification', icon: <Sparkles size={13} className="text-[#5bb1c0]" /> },
        { name: 'Computer Vision', icon: <Brain size={13} className="text-emerald-400" /> },
        { name: 'Interactive ML Prototypes', icon: <Code size={13} className="text-amber-400" /> },
      ],
    },
  ];

  return (
    <section id="about" className="bg-[#0b0c0e] text-white py-28 px-6 sm:px-10 scroll-mt-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Text & Skills */}
          <div className="lg:col-span-7">
            {/* Overline with Name & University */}
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold tracking-widest text-neutral-400 uppercase">
                A Little About Me
              </span>
              <span className="w-1 h-1 rounded-full bg-neutral-600" />
              <span className="text-[11px] font-semibold text-[#5bb1c0]">
                Husnul Khotimah
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-[-0.02em] text-white leading-[1.15] mb-6">
              Still learning.
              <br />
              Especially about learning.
            </h2>

            <p className="text-neutral-300 text-base leading-relaxed mb-8 font-normal max-w-[65ch]">
              I'm <strong className="text-white font-semibold">Husnul Khotimah</strong>, currently a Software Engineering student at <strong className="text-[#7ecbd8] font-semibold">IPB University</strong> focused on machine learning. I like exploring how models work through small, useful experiments. Along the way, I also build web and mobile apps.
            </p>

            {/* Education Highlight Card */}
            <div className="mb-8 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center gap-4 hover:border-neutral-700 transition">
              <div className="w-11 h-11 rounded-xl bg-white/95 border border-neutral-700/40 flex items-center justify-center shrink-0 p-1 shadow-xs">
                <img
                  src="/logo-ipb.png"
                  alt="IPB University Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-tight">IPB University</span>
                  <span className="text-[10px] font-medium bg-[#3B7B88]/20 text-[#7ecbd8] px-2 py-0.5 rounded-full border border-[#3B7B88]/30">
                    Active Student
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5 font-normal">
                  Bachelor of Software Engineering (Rekayasa Perangkat Lunak)
                </p>
              </div>
            </div>

            {/* Tech Stack Sections with Logos & Icons */}
            <div className="space-y-5 pt-3 border-t border-neutral-800/80">
              {techStacks.map((group, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                  <span className="text-xs font-semibold text-neutral-400 min-w-[170px] shrink-0">
                    {group.category}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 text-neutral-200 text-xs font-medium transition hover:bg-neutral-850 hover:scale-102"
                      >
                        {skill.icon}
                        <span>{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Profile Image with Enhanced Badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Outer decorative card container */}
              <div className="w-[280px] sm:w-[320px] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900 shrink-0">
                <img
                  src="/profile.jpg"
                  alt="Husnul Khotimah - Software Engineering Student at IPB University"
                  className="w-full h-auto object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
              </div>

              {/* Status pill overlay with Name, IPB & Availability */}
              <div className="absolute -bottom-4 -left-3 bg-neutral-900/95 backdrop-blur-md border border-neutral-700/80 text-white p-3.5 rounded-2xl text-xs font-medium flex flex-col gap-1 shadow-2xl">
                <div className="font-bold text-sm text-white tracking-tight">
                  Husnul Khotimah
                </div>
                <div className="flex items-center gap-1.5 text-neutral-300 text-[11px]">
                  <img
                    src="/logo-ipb.png"
                    alt="IPB University Logo"
                    className="w-4 h-4 rounded-full object-contain bg-white p-[1px] shrink-0"
                  />
                  <span>IPB University · Software Engineering</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] text-neutral-400 pt-0.5 border-t border-neutral-800 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for internships & collaborations
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
