import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  return (
    <footer className="bg-[#D4D0C8] border-t-2 border-white py-10 px-6 sm:px-10 text-xs text-[#374151]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="font-display font-bold text-[#111827] text-base">
          Husnul Khotimah<span className="text-[#000080]">.</span>
        </div>

        {/* Center Raised Bevel Links */}
        <div className="flex flex-wrap items-center justify-center gap-2 font-medium text-[#111827]">
          {onOpenContact && (
            <button
              onClick={onOpenContact}
              className="win98-raised hover:bg-[#FEF08A] px-3 py-1 inline-flex items-center gap-1 font-semibold cursor-pointer transition-colors"
            >
              Let's connect
              <ArrowUpRight size={13} />
            </button>
          )}
          <a
            href="mailto:husnulkhotimah@houselab.my.id"
            className="win98-raised hover:bg-[#EAE8E1] px-3 py-1 inline-flex items-center gap-1 transition-colors"
          >
            Email
            <ArrowUpRight size={13} />
          </a>
          <a
            href="https://www.linkedin.com/in/husnul-khotimah-8b953b248"
            target="_blank"
            rel="noopener noreferrer"
            className="win98-raised hover:bg-[#EAE8E1] px-3 py-1 inline-flex items-center gap-1 transition-colors"
          >
            LinkedIn
            <ArrowUpRight size={13} />
          </a>
          <a
            href="https://github.com/eicheich"
            target="_blank"
            rel="noopener noreferrer"
            className="win98-raised hover:bg-[#EAE8E1] px-3 py-1 inline-flex items-center gap-1 transition-colors"
          >
            GitHub
            <ArrowUpRight size={13} />
          </a>
          <a
            href="https://huggingface.co/unalivehooman"
            target="_blank"
            rel="noopener noreferrer"
            className="win98-raised hover:bg-[#EAE8E1] px-3 py-1 inline-flex items-center gap-1 transition-colors"
          >
            Hugging Face
            <ArrowUpRight size={13} />
          </a>
          <a
            href="https://www.kaggle.com/unalivehooman"
            target="_blank"
            rel="noopener noreferrer"
            className="win98-raised hover:bg-[#EAE8E1] px-3 py-1 inline-flex items-center gap-1 transition-colors"
          >
            Kaggle
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Right Sunken Status Pill */}
        <div className="win98-sunken bg-[#DFDCD4] px-3 py-1 text-[11px] font-mono text-[#111827]">
          IPB University · 2026
        </div>
      </div>
    </footer>
  );
}
