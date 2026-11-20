import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Button from './Button';
import { mlProjectsData } from '../data/projectsData';

export default function MLExplorations({ onSelectProject, onViewAllProjects }) {
  const featuredML = mlProjectsData.slice(0, 4);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="ml-projects"
      className="bg-white border-t border-[#E2E8F0] text-[#0F172A] py-20 px-6 sm:px-10 scroll-mt-16"
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
            <span className="inline-block bg-[#008272] text-white px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
              01 / Machine Learning Lab
            </span>
            <h2 className="font-metro text-3xl sm:text-4xl font-light tracking-tight text-[#0F172A] mb-2">
              Interactive models you can test live.
            </h2>
            <p className="text-sm sm:text-base text-[#475569] font-normal">
              Deployed on FastAPI and Hugging Face across fraud detection, computer vision, and regression.
            </p>
          </div>

          <Button onClick={onViewAllProjects} className="group self-start md:self-auto shrink-0 min-h-[44px]">
            View all {mlProjectsData.length} ML projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Button>
        </motion.div>

        {/* 2x2 Horizontal Split Metro Tiles with Live Visual Previews */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredML.map((project, idx) => (
            <motion.button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project.id)}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="metro-tile group bg-[#F8FAFC] hover:bg-white border border-[#CBD5E1] hover:border-[#008272] border-l-4 border-l-[#008272] flex flex-col sm:flex-row items-stretch text-left cursor-pointer transition-colors overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#008272]"
            >
              {/* Visual Preview Stage */}
              <div
                style={{ backgroundColor: project.stageBg || '#E2E8F0' }}
                className="sm:w-52 shrink-0 p-4 flex items-center justify-center border-b sm:border-b-0 sm:border-r border-[#E2E8F0] min-h-[156px]"
              >
                <div className="w-full flex items-center justify-center">
                  {project.preview}
                </div>
              </div>

              {/* Info Content */}
              <div className="p-5 flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <span className="block font-mono text-[11px] font-semibold uppercase tracking-wider text-[#008272] mb-1">
                    {project.category}
                  </span>
                  <h3 className="font-metro text-xl font-medium text-[#0F172A] group-hover:text-[#008272] transition-colors mb-1.5">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-metro text-xs font-semibold uppercase tracking-wider text-[#0F172A] group-hover:text-[#008272] transition-colors">
                    <span>{project.ctaLabel || 'View demo'}</span>
                    <ArrowRight
                      size={13}
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
