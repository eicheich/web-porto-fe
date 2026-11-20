import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import Button from '../components/Button';
import { mlProjectsData, softwareProjectsData } from '../data/projectsData';

export default function MLProjectsPage({
  onBackToHome,
  onOpenProjectDetail,
  initialTab = 'ml',
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'ml' | 'software'

  const [featuredML, ...otherML] = mlProjectsData;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-10 pt-6 sm:pt-12 pb-14 sm:pb-20 relative">
      {/* Top Bar: Back + Tactile Category Switcher */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <Button onClick={onBackToHome} className="group">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </Button>

        <div className="w-full sm:w-auto bg-white border border-[#CBD5E1] p-1 grid grid-cols-2 sm:inline-flex items-center gap-1" role="tablist" aria-label="Project categories">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'ml'}
            onClick={() => setActiveTab('ml')}
            className={`min-h-[44px] px-3 sm:px-4 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              activeTab === 'ml'
                ? 'bg-[#0078D7] text-white'
                : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9]'
            }`}
          >
            Machine Learning ({mlProjectsData.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'software'}
            onClick={() => setActiveTab('software')}
            className={`min-h-[44px] px-3 sm:px-4 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              activeTab === 'software'
                ? 'bg-[#0078D7] text-white'
                : 'bg-white text-[#0F172A] hover:bg-[#F1F5F9]'
            }`}
          >
            Software ({softwareProjectsData.length})
          </button>
        </div>
      </motion.div>

      {/* Editorial Left-Aligned Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mb-10"
      >
        <span className="inline-block win98-badge px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase mb-3">
          {activeTab === 'ml' ? 'Projects / Machine Learning' : 'Projects / Software Engineering'}
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold text-[#0F172A] tracking-tight leading-[1.06] mb-3">
          {activeTab === 'ml' ? 'Machine Learning Projects.' : 'Software Engineering Projects.'}
        </h1>
        <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-normal">
          {activeTab === 'ml'
            ? 'Interactive models across fraud detection, computer vision, and regression.'
            : 'Web and mobile applications built for real-world workflows.'}
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {/* TAB 1: MACHINE LEARNING PROJECTS (Featured Lead + 3-Col Grid) */}
        {activeTab === 'ml' && (
          <motion.div
            key="ml"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {featuredML && (
              <div
                role="button"
                tabIndex={0}
                onClick={() => onOpenProjectDetail(featuredML.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProjectDetail(featuredML.id);
                  }
                }}
                className="group bg-white border border-[#CBD5E1] border-t-4 border-t-[#008272] win98-card-3d cursor-pointer text-left"
              >
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] gap-6 items-center">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-[#008272] text-white px-2.5 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider">
                        Featured · {featuredML.category}
                      </span>
                      <span className="win98-tag px-2.5 py-0.5 text-[11px] font-mono font-semibold">
                        24 signals · 93% risk threshold
                      </span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight group-hover:text-[#0078D7] transition-colors">
                      {featuredML.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-xl">
                      {featuredML.description}
                    </p>
                    <Button as="span" variant="primary" className="w-fit">
                      Open live demo
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </div>

                  <div
                    style={{ backgroundColor: featuredML.stageBg }}
                    className="p-6 flex items-center justify-center min-h-[168px] border border-[#E2E8F0]"
                  >
                    <div className="w-full max-w-xs">{featuredML.preview}</div>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherML.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  category={project.category}
                  title={project.title}
                  description={project.description}
                  ctaLabel={project.ctaLabel}
                  preview={project.preview}
                  stageBg={project.stageBg}
                  accentColor="#008272"
                  delay={idx * 0.04}
                  onClick={() => onOpenProjectDetail(project.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 2: SOFTWARE PROJECTS */}
        {activeTab === 'software' && (
          <motion.div
            key="software"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
