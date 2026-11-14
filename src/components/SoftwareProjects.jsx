import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { softwareProjectsData } from '../data/projectsData';

export default function SoftwareProjects({ onSelectStory }) {
  const featuredSoftware = softwareProjectsData.filter(
    (project) => project.id === 'unravel' || project.id === 'hijaukita'
  );

  return (
    <section
      id="software"
      className="py-20 px-6 sm:px-10 bg-[#D4D0C8] border-t-2 border-white text-[#111827] scroll-mt-4 relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto relative">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="inline-block bg-[#000080] text-white px-3 py-0.5 text-[10.5px] font-mono font-bold tracking-wider uppercase mb-4">
            Software Engineering
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#111827] mb-2.5">
            Software Engineering Projects.
          </h2>
          <p className="text-sm sm:text-base text-[#374151] font-normal mb-5">
            Web and mobile applications designed for clarity and everyday use.
          </p>
          <button
            onClick={() => (window.location.hash = '/software-projects')}
            className="win98-raised hover:bg-[#FEF08A] px-4 py-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] transition-colors group cursor-pointer"
          >
            View all software projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Unified 2-Column Grid (Featured: Unravel & HijauKita) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredSoftware.map((project, idx) => (
            <ProjectCard
              key={project.id}
              category={project.category}
              title={project.title}
              description={project.description}
              ctaLabel={project.ctaLabel}
              preview={project.preview}
              stageBg={project.stageBg}
              delay={idx * 0.06}
              onClick={() => onSelectStory(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
