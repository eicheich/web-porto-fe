import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Code2, Cpu, LayoutGrid } from 'lucide-react';

export default function Navbar({
  onOpenContact: _onOpenContact,
  currentPage = 'home',
  projectsTab = 'ml',
  onNavigateSection,
}) {
  const [scrollSection, setScrollSection] = useState('home');
  const programmaticLockUntilRef = useRef(0);

  const navItems = [
    { id: 'home', label: 'Overview', href: '#', icon: LayoutGrid },
    { id: 'ml-projects', label: 'ML Lab', href: '#ml-projects', icon: Cpu },
    { id: 'software', label: 'Software', href: '#software', icon: Code2 },
    { id: 'experience', label: 'Experience', href: '#experience', icon: Briefcase },
  ];

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

  const handleNavClick = (e, id) => {
    programmaticLockUntilRef.current = Date.now() + 650;
    if (onNavigateSection) {
      e.preventDefault();
      onNavigateSection(id);
    }
    setScrollSection(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Windows 8 Metro 4-Tile Mark + Brand */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, 'home')}
          className="inline-flex items-center gap-3 text-[#0F172A] hover:text-[#0078D7] transition-colors shrink-0"
        >
          <span aria-hidden="true" className="grid grid-cols-2 gap-[2px] w-4 h-4 shrink-0">
            <span className="bg-[#0078D7]" />
            <span className="bg-[#008272]" />
            <span className="bg-[#5C2D91]" />
            <span className="bg-[#D97706]" />
          </span>
          <span className="font-display font-bold text-base sm:text-lg tracking-tight">
            Husnul Khotimah
          </span>
        </a>

        {/* Right: Desktop Flat Metro Pivot Tabs */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`px-3.5 py-2 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide transition-colors ${
                  isActive
                    ? 'bg-[#0078D7] text-white'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                }`}
              >
                <Icon size={13} aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Mobile: 1-Tap Horizontally Scrollable Pivot Strip */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 flex items-center gap-1.5 overflow-x-auto"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`px-3 py-1.5 inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-[#0078D7] text-white'
                  : 'bg-white border border-[#CBD5E1] text-[#334155]'
              }`}
            >
              <Icon size={12} aria-hidden="true" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
