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
    id: 'fraud-detection',
    category: 'Tabular · Fraud Detection',
    title: 'Card fraud detection.',
    description: 'Real-time credit & debit card risk scoring across 24 transaction signals.',
    ctaLabel: 'View demo',
    stageBg: '#F1F5F9',
    preview: (
      <div className="w-full bg-white border border-[#CBD5E1] border-t-4 border-t-[#DC2626] px-3.5 py-2.5 flex flex-col items-start gap-1.5 text-left">
        <div className="flex items-center justify-between w-full gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#64748B]">
            Risk Score
          </span>
          <span className="px-2 py-0.5 bg-[#DC2626] text-white text-[10px] font-metro font-semibold uppercase tracking-wider">
            Flagged
          </span>
        </div>
        <span className="text-xs font-mono font-medium text-[#0F172A]">
          $9,500 · Crypto · VPN
        </span>
      </div>
    ),
  },
  {
    id: 'what-does-a-seven-look-like',
    category: 'Vision · PyTorch',
    title: 'Handwritten digit recognizer.',
    description: 'Recognizing handwritten digits on an 8×8 pixel grid.',
    ctaLabel: 'View demo',
    stageBg: '#EFF6FF',
    preview: (
      <div className="flex items-center justify-center gap-3">
        <div className="p-1.5 bg-white border border-[#CBD5E1]">
          <div className="grid grid-cols-8 gap-0.5 w-11 h-11">
            {sevenGrid.flat().map((pixel, i) => (
              <div
                key={i}
                style={{ transitionDelay: pixel ? `${(i % 12) * 16}ms` : '0ms' }}
                className={`w-full h-full transition-colors duration-300 ${
                  pixel
                    ? 'bg-[#0078D7] group-hover:bg-[#005A9E]'
                    : 'bg-[#E2E8F0]'
                }`}
              />
            ))}
          </div>
        </div>
        <ArrowRight size={14} className="text-[#0F172A] shrink-0 group-hover:translate-x-0.5 transition-transform" />
        <span className="font-metro text-3xl font-light text-[#0F172A] tracking-tight">
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
    stageBg: '#F8FAFC',
    preview: (
      <div className="flex items-center justify-center gap-3">
        <div className="w-14 h-14 overflow-hidden border border-[#CBD5E1] bg-white shrink-0 group-hover:scale-103 transition-transform duration-300">
          <img
            src="/cat.jpg"
            alt="Cat"
            className="w-full h-full object-cover"
          />
        </div>
        <ArrowRight size={14} className="text-[#0F172A] shrink-0 group-hover:translate-x-0.5 transition-transform" />
        <div className="text-left">
          <span className="block font-metro text-lg font-medium text-[#0F172A] leading-none">
            Cat
          </span>
          <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#0078D7] text-white font-mono text-[9px] font-semibold">
            98%
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 'house-price-estimator',
    category: 'Tabular · Regression',
    title: 'House price estimator.',
    description: 'Estimating property prices from floor area and rooms.',
    ctaLabel: 'View demo',
    stageBg: '#ECFDF5',
    preview: (
      <div className="w-full bg-white border border-[#CBD5E1] border-t-4 border-t-[#008272] px-3.5 py-2.5 flex flex-col items-start text-left gap-1">
        <span className="text-[10px] font-mono text-[#64748B]">
          120 m² · 3B / 2Ba
        </span>
        <span className="font-metro text-2xl font-light text-[#0F172A] tracking-tight leading-none">
          $245k
        </span>
        <span className="text-[9.5px] font-mono text-[#008272] uppercase tracking-wider">
          Est. value
        </span>
      </div>
    ),
  },
];

export const softwareProjectsData = [
  {
    id: 'unravel',
    category: 'Web Application · React & Golang',
    title: 'Unravel',
    description: 'Learn structured case analysis through interactive learning paths and community discussions.',
    ctaLabel: 'View case study',
    stageBg: '#E2E8F0',
    preview: (
      <div className="w-full bg-white border border-[#CBD5E1] overflow-hidden">
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] text-[8px] font-mono px-2 py-0.5 truncate">
          unravel-prod.vercel.app
        </div>
        <img
          src="/unravel.jpg"
          alt="Unravel web app preview"
          className="w-full h-auto block"
        />
      </div>
    ),
  },
  {
    id: 'hijaukita',
    category: 'Garuda Hacks 4.0 Winner · Flutter & Laravel',
    title: 'HijauKita',
    description: 'Sustainability app and Garuda Hacks 4.0 International Hackathon winner featuring BuGuru AI.',
    ctaLabel: 'View case study',
    stageBg: '#0B1120',
    preview: (
      <div className="w-32 sm:w-36 bg-[#1E293B] border border-[#334155] p-1.5">
        <img
          src="/hijaukita.jpg"
          alt="HijauKita Flutter mobile app preview"
          className="w-full h-auto max-h-60 object-contain"
        />
      </div>
    ),
  },
  {
    id: 'devco',
    category: 'Web Application · Laravel',
    title: 'DevCo',
    description: 'A social platform with a post feed, profile discovery, and community interactions.',
    ctaLabel: 'View case study',
    stageBg: '#E2E8F0',
    preview: (
      <div className="w-full bg-white border border-[#CBD5E1] overflow-hidden">
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] text-[8px] font-mono px-2 py-0.5 truncate">
          devco.houselab.my.id
        </div>
        <img
          src="/devco.png"
          alt="DevCo social platform preview"
          className="w-full h-auto block"
        />
      </div>
    ),
  },
  {
    id: 'tasku',
    category: 'Web Application · Laravel & Python',
    title: 'Tasku',
    description: 'Team information control hub that broadcasts announcements simultaneously to WhatsApp, Discord, and Telegram.',
    ctaLabel: 'View case study',
    stageBg: '#E2E8F0',
    preview: (
      <div className="w-full bg-white border border-[#CBD5E1] overflow-hidden">
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] text-[8px] font-mono px-2 py-0.5 truncate">
          tasku.site
        </div>
        <img
          src="/tasku.png"
          alt="Tasku multi-platform team broadcast preview"
          className="w-full h-auto block"
        />
      </div>
    ),
  },
  {
    id: 'pinggir-sawah-iboe',
    category: 'Web Application · Django & React',
    title: 'Pemancingan Pinggir Sawah Iboe',
    description: 'Editorial web presence for a riverside restaurant and fishing park featuring menu showcase, articles, and direct WhatsApp booking.',
    ctaLabel: 'View case study',
    stageBg: '#E2E8F0',
    preview: (
      <div className="w-full bg-white border border-[#CBD5E1] overflow-hidden">
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] text-[8px] font-mono px-2 py-0.5 truncate">
          pasar-sawah-iboe.vercel.app
        </div>
        <img
          src="/pinggir-sawah-iboe.jpg"
          alt="Pinggir Sawah Iboe restaurant and fishing park website preview"
          className="w-full h-auto block"
        />
      </div>
    ),
  },
  {
    id: 'langkah-baswara',
    category: 'Web-GIS · QGIS, FastAPI & React',
    title: 'Langkah Baswara',
    description: 'Interactive Web-GIS platform for planning Bali trips with personalized itinerary generation and destination discovery.',
    ctaLabel: 'View case study',
    stageBg: '#E2E8F0',
    preview: (
      <div className="w-full bg-white border border-[#CBD5E1] overflow-hidden">
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] text-[8px] font-mono px-2 py-0.5 truncate">
          langkah-baswara-peach.vercel.app
        </div>
        <img
          src="/langkah-baswara.jpg"
          alt="Langkah Baswara interactive Web-GIS Bali travel planner preview"
          className="w-full h-auto block"
        />
      </div>
    ),
  },
  {
    id: 'furai',
    category: 'Web App · React, FastAPI & Google MediaPipe',
    title: 'Furai',
    description: 'In-browser MediaPipe webcam posture detector that catches slouching in real time alongside a Pomodoro study space.',
    ctaLabel: 'View case study',
    stageBg: '#E2E8F0',
    preview: (
      <div className="w-full bg-white border border-[#CBD5E1] overflow-hidden">
        <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] text-[8px] font-mono px-2 py-0.5 truncate">
          furai-green.vercel.app
        </div>
        <img
          src="/furai.png"
          alt="Furai MediaPipe posture detector and study space preview"
          className="w-full h-auto block"
        />
      </div>
    ),
  },
];
