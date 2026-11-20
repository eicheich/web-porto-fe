import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { softwareProjectsData } from '../data/projectsData';

export default function SoftwareProjects({ onSelectStory }) {
  const prefersReducedMotion = useReducedMotion();

  const featuredProject =
    softwareProjectsData.find((p) => p.id === 'hijaukita') || softwareProjectsData[0];
  const secondaryIds = ['tasku', 'unravel'];
  const secondaryProjects = secondaryIds
    .map((id) => softwareProjectsData.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section
      id="software"
      className="bg-[#F1F5F9] border-t border-[#E2E8F0] text-[#0F172A] py-14 sm:py-20 px-4 sm:px-10 scroll-mt-24 md:scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Editorial Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <span className="inline-block bg-[#0078D7] text-white px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
              02 / Software Engineering
            </span>
            <h2 className="font-metro text-3xl sm:text-4xl font-light tracking-tight text-[#0F172A] mb-2">
              Web and mobile products built end-to-end.
            </h2>
            <p className="text-sm sm:text-base text-[#475569] font-normal">
              Full-stack applications crafted with React, Flutter, Laravel, and FastAPI.
            </p>
          </div>

          <Button
            onClick={() => (window.location.hash = '/software-projects')}
            className="group w-full sm:w-auto justify-center md:self-auto shrink-0 min-h-[44px]"
          >
            View all {softwareProjectsData.length} software projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Button>
        </motion.div>

        {/* 7+5 Metro Feature + Stacked Thumbnail List Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left 7 cols: Featured Dark Metro Showcase with Visual Stage */}
          {featuredProject && (
            <motion.button
              type="button"
              onClick={() => onSelectStory(featuredProject.id)}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35 }}
              className="metro-tile lg:col-span-7 bg-[#0F172A] hover:bg-[#1E293B] border-t-4 border-t-[#0078D7] text-white flex flex-col justify-between text-left cursor-pointer transition-colors overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0078D7]"
            >
              {/* Visual Preview Stage */}
              <div
                style={{ backgroundColor: featuredProject.stageBg || '#E2E8F0' }}
                className="w-full p-6 flex items-center justify-center min-h-[220px] border-b border-white/10 overflow-hidden"
              >
                <div className="w-full max-w-md flex items-center justify-center">
                  {featuredProject.preview}
                </div>
              </div>

              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 w-full">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#38BDF8]">
                      {featuredProject.category}
                    </span>
                    <span className="font-mono text-[11px] bg-[#0078D7] text-white px-2.5 py-0.5 shrink-0">
                      Featured
                    </span>
                  </div>
                  <h3 className="font-metro text-2xl sm:text-3xl font-light tracking-tight text-white mb-2">
                    {featuredProject.title}
                  </h3>
                  <p className="text-sm text-[#CBD5E1] leading-relaxed max-w-xl">
                    {featuredProject.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/15 flex items-center justify-between gap-4 w-full">
                  <span className="font-mono text-xs text-[#94A3B8]">
                    Flutter · Laravel · Full-Stack
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-metro text-xs font-semibold uppercase tracking-wider text-[#38BDF8]">
                    <span>{featuredProject.ctaLabel || 'Open case study'}</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </motion.button>
          )}

          {/* Right 5 cols: 3 Stacked Metro List Tiles with Visual Previews */}
          <div className="lg:col-span-5 flex flex-col gap-3.5 justify-between">
            {secondaryProjects.map((project, idx) => (
              <motion.button
                key={project.id}
                type="button"
                onClick={() => onSelectStory(project.id)}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: 0.08 + idx * 0.05 }}
                className="metro-tile group flex-1 bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#0078D7] flex flex-col sm:flex-row items-stretch text-left cursor-pointer transition-colors overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0078D7]"
              >
                {/* Compact Visual Thumbnail Stage */}
                <div
                  style={{ backgroundColor: project.stageBg || '#E2E8F0' }}
                  className="w-full sm:w-44 shrink-0 p-3 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-[#E2E8F0] overflow-hidden"
                >
                  <div className="w-full flex items-center justify-center">
                    {project.preview}
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between gap-3 flex-1 min-w-0">
                  <div className="min-w-0">
                    <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-[#0078D7] mb-0.5 truncate">
                      {project.category}
                    </span>
                    <h3 className="font-metro text-lg font-medium text-[#0F172A] group-hover:text-[#0078D7] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#475569] line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <ArrowRight
                    size={16}
                    className="text-[#64748B] group-hover:text-[#0078D7] group-hover:translate-x-0.5 transition-all shrink-0"
                    aria-hidden="true"
                  />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
