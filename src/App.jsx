import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MLExplorations from './components/MLExplorations';
import SoftwareProjects from './components/SoftwareProjects';
import BeyondTheScreen from './components/BeyondTheScreen';
import Footer from './components/Footer';
import InteractiveModal from './components/InteractiveModal';
import MLProjectsPage from './pages/MLProjectsPage';
import MLDetailPage from './pages/MLDetailPage';
import SoftwareDetailPage from './pages/SoftwareDetailPage';
import ActivitiesPage from './pages/ActivitiesPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'projects' | 'ml-detail' | 'software-detail' | 'activities'
  const [activeProjectId, setActiveProjectId] = useState('reading-between-the-words');
  const [projectsTab, setProjectsTab] = useState('ml'); // 'ml' | 'software'

  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: 'contact',
    data: null,
  });

  // Listen to hash changes for direct deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/project/')) {
        const id = hash.replace('#/project/', '');
        setActiveProjectId(id);
        if (
          id === 'unravel' ||
          id === 'ufee' ||
          id === 'hijaukita' ||
          id === 'study-space' ||
          id === 'studyspace' ||
          id === 'campus-pocket' ||
          id === 'campuspocket'
        ) {
          setCurrentPage('software-detail');
        } else {
          setCurrentPage('ml-detail');
        }
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#/software-projects')) {
        setCurrentPage('projects');
        setProjectsTab('software');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#/projects')) {
        setCurrentPage('projects');
        setProjectsTab('ml');
        window.scrollTo(0, 0);
      } else if (hash.startsWith('#/activities')) {
        setCurrentPage('activities');
        window.scrollTo(0, 0);
      } else if (
        hash === '#/' ||
        hash === '' ||
        hash === '#' ||
        hash.startsWith('#ml-projects') ||
        hash.startsWith('#software') ||
        hash.startsWith('#experience')
      ) {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateToProjects = (tab = 'ml') => {
    if (tab === 'software') {
      window.location.hash = '/software-projects';
    } else {
      window.location.hash = '/projects';
    }
    setProjectsTab(tab);
    setCurrentPage('projects');
    window.scrollTo(0, 0);
  };

  const navigateToProjectDetail = (projectId) => {
    setActiveProjectId(projectId);
    window.location.hash = `/project/${projectId}`;
    if (
      projectId === 'unravel' ||
      projectId === 'ufee' ||
      projectId === 'hijaukita' ||
      projectId === 'study-space' ||
      projectId === 'studyspace' ||
      projectId === 'campus-pocket' ||
      projectId === 'campuspocket'
    ) {
      setCurrentPage('software-detail');
    } else {
      setCurrentPage('ml-detail');
    }
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    window.location.hash = '/';
    setCurrentPage('home');
    window.scrollTo(0, 0);
  };

  const navigateToActivities = () => {
    window.location.hash = '/activities';
    setCurrentPage('activities');
    window.scrollTo(0, 0);
  };

  const navigateToSection = (sectionId) => {
    if (sectionId === 'home') {
      navigateToHome();
      return;
    }

    if (currentPage !== 'home') {
      window.location.hash = '/';
      setCurrentPage('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openContact = () => {
    setModalState({ isOpen: true, mode: 'contact', data: null });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, mode: 'contact', data: null });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#008080] text-[#111827] font-sans selection:bg-[#000080] selection:text-white flex flex-col pb-12">
        {/* Global Iconic Floating Navbar */}
        <Navbar
          onOpenContact={openContact}
          currentPage={currentPage}
          projectsTab={projectsTab}
          onNavigateSection={navigateToSection}
        />

        {/* Active Page View */}
        <div className="flex-1">
          {currentPage === 'ml-detail' && (
            <MLDetailPage
              projectId={activeProjectId}
              onBackToProjects={() => navigateToProjects('ml')}
              onGoHome={navigateToHome}
            />
          )}

          {currentPage === 'software-detail' && (
            <SoftwareDetailPage
              projectId={activeProjectId}
              onBackToProjects={() => navigateToProjects('software')}
              onGoHome={navigateToHome}
            />
          )}

          {currentPage === 'activities' && (
            <ActivitiesPage
              onBackToHome={navigateToHome}
              onOpenContact={openContact}
            />
          )}

          {currentPage === 'projects' && (
            <MLProjectsPage
              key={projectsTab}
              onBackToHome={navigateToHome}
              onOpenProjectDetail={navigateToProjectDetail}
              initialTab={projectsTab}
            />
          )}

          {currentPage === 'home' && (
            <main>
              {/* 1. Hero — Short Personal Introduction */}
              <Hero />

              {/* 2. Machine Learning Projects */}
              <MLExplorations
                onSelectProject={navigateToProjectDetail}
                onViewAllProjects={() => navigateToProjects('ml')}
              />

              {/* 3. Software Engineering Projects */}
              <SoftwareProjects
                onSelectStory={navigateToProjectDetail}
              />

              {/* 4. Experience & Activities */}
              <BeyondTheScreen onViewActivities={navigateToActivities} />
            </main>
          )}
        </div>

        {/* Global Minimal Footer */}
        <Footer onOpenContact={openContact} />

        {/* Interactive Modal (Contact Form & Messages) */}
        <InteractiveModal
          isOpen={modalState.isOpen}
          mode={modalState.mode}
          initialData={modalState.data}
          onClose={closeModal}
        />
      </div>
    </MotionConfig>
  );
}
