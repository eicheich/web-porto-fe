import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { Win98WindowControls, PixelFolderIcon } from '../components/RetroStickers';
import { mlProjectsData, softwareProjectsData } from '../data/projectsData';

export default function MLProjectsPage({
  onBackToHome,
  onOpenProjectDetail,
  initialTab = 'ml',
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'ml' | 'software'

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14 pb-20 relative">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8 flex justify-center sm:justify-start relative z-10"
      >
        <button
          onClick={onBackToHome}
          className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#111827] px-3 py-1.5 cursor-pointer group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </button>
      </motion.div>

      {/* Centered Desktop Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-2xl mx-auto mb-8 relative z-10"
      >
        <div className="inline-flex items-center gap-1.5 bg-[#D4D0C8] win98-raised px-2.5 py-0.5 mb-3">
          <PixelFolderIcon className="w-3.5 h-3.5" />
          <span className="text-[11px] font-mono font-bold tracking-wider text-[#000080] uppercase">
            {activeTab === 'ml' ? 'Projects / Machine Learning' : 'Projects / Software Engineering'}
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-[44px] font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-tight leading-tight mb-3">
          {activeTab === 'ml' ? 'Machine Learning Projects.' : 'Software Engineering Projects.'}
        </h1>
        <p className="text-sm sm:text-base text-[#E6F4F4] leading-relaxed font-normal">
          {activeTab === 'ml'
            ? 'Small explorations of language, images, and everyday data. Click any card to try the demo.'
            : 'Web and mobile applications designed for clarity and everyday use.'}
        </p>
      </motion.div>

      {/* Centered Win98 Filter Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.06 }}
        className="flex flex-col items-center gap-3 mb-10 relative z-10"
      >
        <div className="win98-window p-1 inline-flex items-center gap-1">
          <button
            onClick={() => setActiveTab('ml')}
            className={`px-5 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              activeTab === 'ml'
                ? 'win98-sunken bg-[#FAF8F2] text-[#000080]'
                : 'win98-raised text-[#111827] hover:bg-[#E4E0D8]'
            }`}
          >
            Machine learning
          </button>
          <button
            onClick={() => setActiveTab('software')}
            className={`px-5 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              activeTab === 'software'
                ? 'win98-sunken bg-[#FAF8F2] text-[#000080]'
                : 'win98-raised text-[#111827] hover:bg-[#E4E0D8]'
            }`}
          >
            Software
          </button>
        </div>

        <span className="text-xs text-[#E6F4F4] font-mono">
          Click any card to open the project details
        </span>
      </motion.div>

      {/* TAB 1: MACHINE LEARNING PROJECTS */}
      {activeTab === 'ml' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mlProjectsData.map((project, idx) => (
            <ProjectCard
              key={project.id}
              category={project.category}
              title={project.title}
              description={project.description}
              ctaLabel={project.ctaLabel}
              preview={project.preview}
              stageBg={project.stageBg}
              delay={idx * 0.04}
              onClick={() => onOpenProjectDetail(project.id)}
            />
          ))}
        </div>
      )}

      {/* TAB 2: SOFTWARE PROJECTS */}
      {activeTab === 'software' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {softwareProjectsData.map((project, idx) => (
            <ProjectCard
              key={project.id}
              category={project.category}
              title={project.title}
              description={project.description}
              ctaLabel={project.ctaLabel}
              preview={project.preview}
              stageBg={project.stageBg}
              delay={idx * 0.05}
              onClick={() => onOpenProjectDetail(project.id)}
            />
          ))}
        </div>
      )}

      {/* Win98 Bottom Switch Window */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4 }}
        className="win98-window p-1 mt-14"
      >
        <div className="win98-titlebar">
          <div className="flex items-center gap-1.5">
            <PixelFolderIcon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold tracking-wide">
              {activeTab === 'ml' ? 'switch_to_software.exe' : 'switch_to_ml.exe'}
            </span>
          </div>
          <Win98WindowControls />
        </div>

        <div className="win98-sunken bg-[#FAF8F2] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="text-[10.5px] font-mono font-bold tracking-widest text-[#000080] uppercase block mb-1.5">
              {activeTab === 'ml' ? 'Alongside the experiments' : 'Explore More'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#111827] tracking-tight mb-1">
              {activeTab === 'ml' ? 'A little software, too.' : 'Machine learning experiments.'}
            </h2>
            <p className="text-xs sm:text-sm text-[#4B5563] font-normal">
              {activeTab === 'ml'
                ? 'Web and mobile apps, built one small problem at a time.'
                : 'Models and interactive demos across NLP, vision, and regression.'}
            </p>
          </div>

          <button
            onClick={() => setActiveTab(activeTab === 'ml' ? 'software' : 'ml')}
            className="win98-raised inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111827] px-5 py-2.5 cursor-pointer self-start sm:self-auto shrink-0"
          >
            {activeTab === 'ml' ? 'Explore software projects' : 'Explore ML projects'}
            <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </main>
  );
}
