import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Contact({ onOpenContactModal }) {
  return (
    <section id="contact" className="py-28 px-6 bg-white text-center scroll-mt-12">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Overline */}
        <span className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase block mb-4">
          Have an idea or a question?
        </span>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-extrabold text-neutral-900 tracking-tight leading-tight mb-4">
          Let's start with a hello.
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-lg mb-8 font-normal">
          An experiment, a project, or something interesting you're learning. I'd love to hear.
        </p>

        {/* Primary CTA */}
        <button
          onClick={onOpenContactModal}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#3B7B88] hover:bg-[#316873] text-white text-sm font-medium transition shadow-sm hover:shadow cursor-pointer mb-10"
        >
          Say hello
          <ArrowUpRight size={16} />
        </button>

        {/* Social / Direct Links */}
        <div className="flex flex-wrap items-center justify-center gap-7 sm:gap-9 text-xs font-medium text-neutral-700">
          <a
            href="mailto:contact@student.example.com"
            className="inline-flex items-center gap-1 hover:text-neutral-900 hover:underline transition"
          >
            Email
            <ArrowUpRight size={13} className="text-neutral-400" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-neutral-900 hover:underline transition"
          >
            LinkedIn
            <ArrowUpRight size={13} className="text-neutral-400" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-neutral-900 hover:underline transition"
          >
            GitHub
            <ArrowUpRight size={13} className="text-neutral-400" />
          </a>
        </div>
      </div>
    </section>
  );
}

