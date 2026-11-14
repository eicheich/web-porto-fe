import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { mlProjectsData } from '../data/projectsData';

export default function MLExplorations({ onSelectProject, onViewAllProjects }) {
  const featuredML = mlProjectsData.slice(0, 4);

  return (
    <section
      id="ml-projects"
      className="bg-[#008080] border-t-2 border-white text-white py-20 px-6 sm:px-10 scroll-mt-4 relative overflow-hidden"
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
          <span className="inline-block win98-raised px-3 py-0.5 text-[10.5px] font-mono font-bold tracking-wider text-[#111827] uppercase mb-4">
            Machine Learning
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white drop-shadow-[2px_2px_0px_#004040] mb-2.5">
            Machine Learning Projects.
          </h2>
          <p className="text-sm sm:text-base text-[#E6FFFA] font-normal mb-5">
            Models and interactive experiments across NLP, computer vision, and regression.
          </p>
          <button
            onClick={onViewAllProjects}
            className="win98-raised hover:bg-[#FEF08A] px-4 py-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#111827] transition-colors group cursor-pointer"
          >
            View all 6 ML projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* Compact 2x2 Grid of Featured ML Windows */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredML.map((project, idx) => (
            <ProjectCard
              key={project.id}
              category={project.category}
              title={project.title}
              description={project.description}
              ctaLabel={project.ctaLabel}
              preview={project.preview}
              stageBg={project.stageBg}
              delay={idx * 0.04}
              onClick={() => onSelectProject(project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
