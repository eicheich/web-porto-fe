import React from 'react';
import { ArrowRight } from 'lucide-react';

const sevenGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 0, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

export const mlProjectsData = [
  {
    id: 'reading-between-the-words',
    category: 'NLP · Scikit-Learn',
    title: 'Reading between the words.',
    description: 'Predicting sentence mood from short text inputs.',
    ctaLabel: 'View demo',
    stageBg: '#DBEAFE',
    preview: (
      <div className="w-full flex flex-col items-center justify-center text-center gap-2">
        <div className="w-full bg-white border border-[#111827] px-2.5 py-2 shadow-[2px_2px_0px_#808080]">
          <p className="text-[11px] text-[#111827] font-mono italic truncate">
            "I'm glad I gave it a try."
          </p>
        </div>
        <span className="inline-block px-3 py-0.5 bg-[#000080] text-white text-[10.5px] font-mono font-semibold">
          Positive
        </span>
      </div>
    ),
  },
  {
    id: 'what-does-a-seven-look-like',
    category: 'Vision · PyTorch',
    title: 'What does a seven look like?',
    description: 'Recognizing handwritten digits on an 8×8 pixel grid.',
    ctaLabel: 'View demo',
    stageBg: '#FEF3C7',
    preview: (
      <div className="flex items-center justify-center gap-3">
        <div className="p-1.5 bg-white border border-[#111827] shadow-[2px_2px_0px_#808080]">
          <div className="grid grid-cols-8 gap-0.5 w-11 h-11">
            {sevenGrid.flat().map((pixel, i) => (
              <div
                key={i}
                style={{ transitionDelay: pixel ? `${(i % 12) * 16}ms` : '0ms' }}
                className={`w-full h-full transition-colors duration-300 ${
                  pixel
                    ? 'bg-[#000080] group-hover:bg-[#1084D0]'
                    : 'bg-[#E5E7EB]'
                }`}
              />
            ))}
          </div>
        </div>
        <ArrowRight size={14} className="text-[#111827] shrink-0 group-hover:translate-x-0.5 transition-transform" />
        <span className="font-display text-2xl font-bold text-[#111827] tracking-tight">
          7
        </span>
      </div>
    ),
  },
  {
    id: 'cat-or-dog',
    category: 'Vision · CNN',
    title: 'Cat or dog?',
    description: 'Binary image classifier telling cats and dogs apart.',
    ctaLabel: 'View demo',
    stageBg: '#FFEDD5',
    preview: (
      <div className="flex items-center justify-center gap-3">
        <div className="w-14 h-14 overflow-hidden border-2 border-[#111827] bg-white shadow-[2px_2px_0px_#808080] shrink-0 group-hover:scale-103 transition-transform duration-300">
          <img
            src="/cat.jpg"
            alt="Cat"
            className="w-full h-full object-cover"
          />
        </div>
        <ArrowRight size={14} className="text-[#111827] shrink-0 group-hover:translate-x-0.5 transition-transform" />
        <span className="font-display text-xl font-bold text-[#111827] tracking-tight">
          Cat.
        </span>
      </div>
    ),
  },
  {
    id: 'house-price-estimator',
    category: 'Tabular · Regression',
    title: 'House price estimator.',
    description: 'Estimating property prices from floor area and rooms.',
    ctaLabel: 'View demo',
    stageBg: '#DCFCE7',
    preview: (
      <div className="w-full bg-white border border-[#111827] px-3 py-2 shadow-[2px_2px_0px_#808080] flex flex-col items-center justify-center text-center gap-1">
        <span className="text-[10px] font-mono font-medium text-[#4B5563]">
          120 m² · 3B / 2Ba
        </span>
        <span className="inline-block font-display text-2xl font-bold text-[#000080] tracking-tight leading-none">
          $245k
        </span>
        <span className="text-[9.5px] font-mono text-[#6B7280] uppercase">Est. value</span>
      </div>
    ),
  },
  {
    id: 'a-second-look-at-spam',
    category: 'NLP · Classification',
    title: 'A second look at spam.',
    description: 'Filtering promotional noise from legitimate messages.',
    ctaLabel: 'View demo',
    stageBg: '#DBEAFE',
    preview: (
      <div className="w-full flex flex-col items-center justify-center text-center gap-2">
        <div className="w-full bg-white border border-[#111827] px-2.5 py-2 shadow-[2px_2px_0px_#808080]">
          <p className="text-[11px] text-[#111827] font-mono italic truncate">
            "Claim your reward today!"
          </p>
        </div>
        <span className="inline-block px-3 py-0.5 bg-[#111827] text-white text-[10.5px] font-mono font-semibold">
          Likely spam
        </span>
      </div>
    ),
  },
  {
    id: 'patterns-hiding-in-plain-sight',
    category: 'Clustering · Unsupervised',
    title: 'Patterns hiding in plain sight.',
    description: 'Grouping similar articles without predefined labels.',
    ctaLabel: 'View demo',
    stageBg: '#FEF3C7',
    preview: (
      <div className="w-full grid grid-cols-3 gap-1.5">
        {['Group A', 'Group B', 'Group C'].map((group, i) => (
          <div
            key={group}
            className="bg-white border border-[#111827] py-2 px-1 text-center shadow-[1px_1px_0px_#808080]"
          >
            <div
              className={`w-2 h-2 mx-auto mb-1 ${
                i === 0 ? 'bg-[#000080]' : i === 1 ? 'bg-[#DC2626]' : 'bg-[#16A34A]'
              }`}
            />
            <div className="text-[9px] font-bold text-[#111827]">{group}</div>
            <div className="text-[8px] font-mono text-[#4B5563] mt-0.5">
              {i === 0 ? 'Short' : i === 1 ? 'Deep' : 'Guides'}
            </div>
          </div>
        ))}
      </div>
    ),
  },
];

export const softwareProjectsData = [
  {
    id: 'unravel',
    category: 'Web Application · Case Analysis',
    title: 'Unravel',
    description: 'Belajar menganalisis kasus secara terstruktur lewat jalur interaktif dan diskusi.',
    ctaLabel: 'View case study',
    stageBg: '#DCFCE7',
    preview: (
      <div className="w-full bg-white border border-[#111827] p-1.5 shadow-[2px_2px_0px_#808080]">
        <div className="bg-[#000080] text-white text-[8px] font-mono px-1.5 py-0.5 mb-1.5 flex justify-between">
          <span>unravel.app</span>
          <span>×</span>
        </div>
        <img
          src="/unravel.jpg"
          alt="Unravel web app preview"
          className="w-full h-24 object-cover object-top border border-[#111827]/15"
        />
      </div>
    ),
  },
  {
    id: 'ufee',
    category: 'Mobile App · Flutter',
    title: 'UFee',
    description: 'Aplikasi toko khusus sepatu dengan katalog editorial dan kategori All, Men, Women.',
    ctaLabel: 'View case study',
    stageBg: '#F3F4F6',
    preview: (
      <div className="w-20 bg-white border-2 border-[#111827] p-1 shadow-[2px_2px_0px_#808080]">
        <img
          src="/ufee.jpg"
          alt="UFee Flutter mobile app preview"
          className="w-full h-24 object-cover object-center"
        />
      </div>
    ),
  },
  {
    id: 'hijaukita',
    category: 'Garuda Hacks 4.0 Winner · Flutter & Laravel',
    title: 'HijauKita',
    description: 'Aplikasi sustainability pemenang Hackathon International Garuda Hacks 4.0 dengan fitur BuGuru AI.',
    ctaLabel: 'View case study',
    stageBg: '#DCFCE7',
    preview: (
      <div className="w-20 bg-white border-2 border-[#111827] p-1 shadow-[2px_2px_0px_#808080]">
        <img
          src="/hijaukita.jpg"
          alt="HijauKita Flutter mobile app preview"
          className="w-full h-24 object-cover object-top"
        />
      </div>
    ),
  },
  {
    id: 'study-space',
    category: 'Web Application · React',
    title: 'Study Space',
    description: 'A simpler way to organize coursework and study plans.',
    ctaLabel: 'View case study',
    stageBg: '#DCFCE7',
    preview: (
      <div className="w-full bg-white border border-[#111827] p-2.5 shadow-[2px_2px_0px_#808080]">
        <div className="bg-[#000080] text-white text-[8px] font-mono px-1.5 py-0.5 mb-2 flex justify-between">
          <span>studyspace.exe</span>
          <span>×</span>
        </div>
        <div className="space-y-1.5">
          <div className="text-[9px] font-bold text-[#111827]">One thing at a time...</div>
          <div className="h-1.5 bg-[#E5E7EB] w-3/4" />
          <div className="h-1.5 bg-[#000080]/25 w-2/3" />
        </div>
      </div>
    ),
  },
  {
    id: 'campus-pocket',
    category: 'Mobile App · React Native',
    title: 'Campus Pocket',
    description: 'Campus events, reminders, and notes in one place.',
    ctaLabel: 'View case study',
    stageBg: '#FFEDD5',
    preview: (
      <div className="w-24 bg-white border-2 border-[#111827] p-2 shadow-[2px_2px_0px_#808080] text-center">
        <div className="w-5 h-1 bg-[#9CA3AF] mx-auto mb-1.5" />
        <div className="text-[7.5px] font-bold text-[#111827] mb-1 leading-tight">
          Campus life
        </div>
        <div className="bg-[#000080] text-white text-[7px] font-mono py-0.5 px-1 mb-1">
          Today's events
        </div>
        <div className="h-1 bg-[#E5E7EB] w-full mb-1" />
        <div className="h-1 bg-[#E5E7EB] w-4/5 mx-auto" />
      </div>
    ),
  },
];
