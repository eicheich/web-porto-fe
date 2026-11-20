import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const linkClass =
    'bg-[#1E293B] border border-[#334155] hover:bg-[#0078D7] hover:border-[#0078D7] text-white px-4 py-3 flex items-center justify-between text-xs font-bold transition-colors cursor-pointer';

  return (
    <footer className="bg-[#0F172A] text-white border-t border-[#1E293B] py-12 px-6 sm:px-10 text-xs">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#1E293B] pb-5">
          <div>
            <div className="font-display font-bold text-white text-lg tracking-tight">
              Husnul Khotimah<span className="text-[#0078D7]">.</span>
            </div>
            <p className="text-xs text-[#94A3B8] mt-1">
              Software Engineering · IPB University · Bogor, Indonesia
            </p>
          </div>
          <span className="bg-[#1E293B] border border-[#334155] px-3 py-1 font-mono text-[11px] font-semibold text-[#E2E8F0]">
            Open to Internship &amp; Full-Time Roles
          </span>
        </div>

        <nav aria-label="Contact and social links" className="grid grid-cols-1 min-[380px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2.5">
          {onOpenContact && (
            <button type="button" onClick={onOpenContact} className={linkClass}>
              <span>Let's connect</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </button>
          )}
          <a href="mailto:husnulkhotimah@houselab.my.id" className={linkClass}>
            <span>Email</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a
            href="https://www.linkedin.com/in/husnul-khotimah-8b953b248"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <span>LinkedIn</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a
            href="https://github.com/eicheich"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <span>GitHub</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a
            href="https://huggingface.co/unalivehooman"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <span>Hugging Face</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a
            href="https://www.kaggle.com/unalivehooman"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <span>Kaggle</span>
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
