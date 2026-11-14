import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Code2, Briefcase, Sparkles, Mail } from 'lucide-react';

export default function Navbar({
  onOpenContact,
  currentPage = 'home',
  projectsTab = 'ml',
  onNavigateSection,
}) {
  const [scrollSection, setScrollSection] = useState('home');
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const taskbarRef = useRef(null);
  const programmaticLockUntilRef = useRef(0);

  const navItems = [
    { id: 'home', label: 'Intro', href: '#', icon: Sparkles },
    { id: 'ml-projects', label: 'ML', href: '#ml-projects', icon: Brain },
    { id: 'software', label: 'Software', href: '#software', icon: Code2 },
    { id: 'experience', label: 'Experience', href: '#experience', icon: Briefcase },
  ];

  // Derive active tab when viewing a subpage, otherwise use scroll spy
  const activeSection =
    currentPage === 'ml-detail' || (currentPage === 'projects' && projectsTab === 'ml')
      ? 'ml-projects'
      : currentPage === 'software-detail' || (currentPage === 'projects' && projectsTab === 'software')
        ? 'software'
        : currentPage === 'activities'
          ? 'experience'
          : scrollSection;

  useEffect(() => {
    const handleScroll = () => {
      if (currentPage !== 'home') return;
      if (Date.now() < programmaticLockUntilRef.current) return;

      if (window.scrollY < 160) {
        setScrollSection('home');
        return;
      }

      const sectionIds = ['experience', 'software', 'ml-projects'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setScrollSection(id);
            return;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Close Start menu on outside click or Escape key
  useEffect(() => {
    if (!startMenuOpen) return;

    const handlePointerDown = (e) => {
      if (taskbarRef.current && !taskbarRef.current.contains(e.target)) {
        setStartMenuOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setStartMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [startMenuOpen]);

  const handleNavClick = (e, id) => {
    programmaticLockUntilRef.current = Date.now() + 650;
    if (onNavigateSection) {
      e.preventDefault();
      onNavigateSection(id);
    }
    setScrollSection(id);
    setStartMenuOpen(false);
  };

  return (
    <header ref={taskbarRef} className="fixed bottom-0 inset-x-0 z-50">
      {/* Classic Win98 Start Menu Popup */}
      <AnimatePresence>
        {startMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.14 }}
            className="absolute bottom-12 left-2 w-60 win98-window p-1 flex shadow-2xl"
          >
            {/* Vertical OS Strip */}
            <div className="w-7 bg-gradient-to-t from-[#000080] to-[#1084D0] flex items-end justify-center pb-2 shrink-0">
              <span className="font-display text-white font-bold text-xs tracking-wider [writing-mode:vertical-rl] rotate-180 select-none">
                HUSNUL 98
              </span>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-1 pl-1 space-y-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[#000080] text-white'
                        : 'text-[#111827] hover:bg-[#000080] hover:text-white'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{item.label}</span>
                  </a>
                );
              })}

              <div className="my-1 border-t border-[#808080] border-b border-b-white" />

              <button
                onClick={() => {
                  setStartMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#111827] hover:bg-[#000080] hover:text-white transition-colors cursor-pointer text-left"
              >
                <Mail size={14} />
                <span>Let's connect</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom 1998 OS Taskbar */}
      <div className="win98-raised border-x-0 border-b-0 px-2 py-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {/* Start Button */}
          <button
            onClick={() => setStartMenuOpen(!startMenuOpen)}
            aria-expanded={startMenuOpen}
            aria-label="Toggle Start menu"
            className={`px-3 py-1 flex items-center gap-1.5 text-xs font-bold text-[#111827] cursor-pointer shrink-0 ${
              startMenuOpen ? 'win98-sunken bg-[#EAE8E1]' : 'win98-raised hover:bg-[#EAE8E1]'
            }`}
          >
            {/* Classic 4-tile Pixel Flag */}
            <span aria-hidden="true" className="grid grid-cols-2 gap-0.5 w-3 h-3">
              <span className="bg-[#DC2626]" />
              <span className="bg-[#16A34A]" />
              <span className="bg-[#2563EB]" />
              <span className="bg-[#EAB308]" />
            </span>
            <span className="font-display tracking-tight">Start</span>
          </button>

          {/* Taskbar Divider */}
          <div className="w-[2px] h-6 bg-[#808080] border-r border-white mx-0.5 shrink-0" />

          {/* Window Tabs */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3 py-1 flex items-center gap-1.5 text-xs font-semibold transition-[background-color,color] duration-150 min-w-[96px] ${
                    isActive
                      ? 'win98-sunken bg-[#EAE7DF] text-[#000080]'
                      : 'win98-raised hover:bg-[#EAE8E1] text-[#111827]'
                  }`}
                >
                  <Icon size={12} className={isActive ? 'text-[#000080]' : 'text-[#4B5563]'} />
                  <span className="truncate">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Quick Connect Button */}
          <button
            onClick={onOpenContact}
            className="win98-raised hover:bg-[#FEF08A] px-2.5 sm:px-3 py-1 flex items-center gap-1.5 text-xs font-semibold text-[#111827] cursor-pointer shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-[#16A34A] border border-[#111827]" />
            <span>Let's connect</span>
          </button>
        </div>

        {/* Right Sunken System Tray Clock */}
        <div className="win98-sunken bg-[#DFDCD4] px-2.5 py-1 flex items-center gap-2 text-sm font-retro-mono text-[#111827] shrink-0 leading-none">
          <img
            src="/profile.jpg"
            alt=""
            className="w-4 h-4 object-cover border border-[#555555] hidden sm:block"
          />
          <span>IPB · 2026</span>
        </div>
      </div>
    </header>
  );
}
