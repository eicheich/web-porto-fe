import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Button from '../components/Button';

const SOFTWARE_DETAILS = {
  unravel: {
    index: '01',
    category: 'Web Application · React & Golang',
    title: 'Unravel',
    summary:
      'An interactive problem-solving platform combining structured case analysis paths, peer discussions, and progress tracking.',
    type: 'web',
    image: '/unravel.jpg',
    imageAlt: 'Unravel — Structured case analysis platform interface',
    displayUrl: 'unravel-prod.vercel.app',
    liveUrl: 'https://unravel-prod.vercel.app/',
    liveLabel: 'Open Live Demo',
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'Stack', value: 'React · Golang' },
      { label: 'Focus', value: 'Case Workflow' },
    ],
    whyTitle: 'A clearer way to practice structured case analysis.',
    whyBody:
      'Practicing critical thinking often feels abstract without a clear framework. Unravel organizes interactive learning paths, peer review discussions, and progress tracking so learners break down cases consistently.',
    role: 'Designed the interactive React interface, 3-step case analysis workflow, and integrated Golang backend services for discussions and ranking.',
    stack: ['React', 'Golang', 'Interactive UI', 'Case Study'],
    features: [
      {
        title: 'Real-World Case Breakdown',
        desc: 'Select real-world topics and dissect case narratives from multiple business and product angles.',
      },
      {
        title: '4-Pillar Analysis Framework',
        desc: 'Structure key insights cleanly into Goals, Problems, Solutions, and Stakeholders.',
      },
      {
        title: 'Compare Perspectives',
        desc: 'Review and compare structured analyses with peers across the public discussion forum.',
      },
    ],
  },
  hijaukita: {
    index: '02',
    category: 'Garuda Hacks 4.0 Winner · Flutter & Laravel',
    title: 'HijauKita',
    summary:
      'Sustainability and environmental action app (Garuda Hacks 4.0 International Hackathon winner) built with Flutter, Laravel, and Figma.',
    type: 'mobile',
    image: '/hijaukita.jpg',
    imageAlt: 'HijauKita — Sustainability app, Garuda Hacks 4.0 Winner',
    liveUrl: 'https://devpost.com/software/hijaukita',
    liveLabel: 'View on Devpost',
    specs: [
      { label: 'Recognition', value: 'Garuda Hacks 4.0' },
      { label: 'Stack', value: 'Flutter · Laravel' },
      { label: 'Feature', value: 'BuGuru AI' },
    ],
    whyTitle: 'Making everyday environmental action easier to understand.',
    whyBody:
      'Built during the Garuda Hacks 4.0 International Hackathon to help people understand waste issues and adopt daily eco-habits through BuGuru AI and community tracking.',
    role: 'Designed the UI/UX in Figma, built the mobile application in Flutter, and integrated backend APIs with Laravel.',
    stack: ['Flutter', 'Laravel', 'Figma', 'Garuda Hacks 4.0'],
    features: [
      {
        title: 'Interactive Eco Landscape',
        desc: 'Visualizes environmental conditions to raise awareness around local waste issues.',
      },
      {
        title: 'BuGuru AI Assistant',
        desc: 'Interactive AI assistant serving as an accessible knowledge source on sustainability.',
      },
      {
        title: 'Activity & Leaderboard',
        desc: 'Tracks eco-friendly habits, search, and community rankings to keep momentum high.',
      },
    ],
  },
  devco: {
    index: '03',
    category: 'Web Application · Laravel',
    title: 'DevCo',
    summary:
      'A developer-focused social platform with a post composer, curated feed views, user discovery, and community interactions.',
    type: 'web',
    image: '/devco.png',
    imageAlt: 'DevCo social platform interface',
    displayUrl: 'devco.houselab.my.id',
    liveUrl: 'https://devco.houselab.my.id/',
    liveLabel: 'Open Live Demo',
    specs: [
      { label: 'Platform', value: 'Web App' },
      { label: 'Stack', value: 'Laravel' },
      { label: 'Focus', value: 'Social Platform' },
    ],
    whyTitle: 'A dedicated space to share what you are building.',
    whyBody:
      'DevCo brings a post composer, chronological feed, people search, and friend connections into one clean social workspace.',
    role: 'Built the web application end-to-end with Laravel around a social feed, posting flow, people discovery, and profile screens.',
    stack: ['Laravel', 'Web App', 'Social Feed'],
    features: [
      {
        title: 'Post Composer & Feed',
        desc: 'Publish updates and browse posts seamlessly across For You or Following views.',
      },
      {
        title: 'People Discovery',
        desc: 'Search developers and view suggested connections alongside the main feed.',
      },
      {
        title: 'Community Interactions',
        desc: 'Interactive follow, like, comment, and repost controls directly on feed cards.',
      },
    ],
  },
  tasku: {
    index: '04',
    category: 'Web Application · Laravel & Python',
    title: 'Tasku',
    summary:
      'A centralized team communication hub that broadcasts announcements simultaneously across WhatsApp, Discord, and Telegram in a single click.',
    type: 'web',
    image: '/tasku.png',
    imageAlt: 'Tasku multi-platform team broadcast web application',
    displayUrl: 'tasku.site',
    liveUrl: 'https://tasku.site/',
    liveLabel: 'Open Live Demo',
    specs: [
      { label: 'Stack', value: 'Laravel · Python' },
      { label: 'Channels', value: 'WA · Discord · TG' },
      { label: 'Focus', value: 'Team Broadcast' },
    ],
    whyTitle: 'One click to keep every team group updated without manual copy-paste.',
    whyBody:
      'Teams often spread updates across WhatsApp groups, Discord channels, and Telegram chats. Tasku centralizes announcements into one dispatch console so critical info never gets missed.',
    role: 'Built the web platform with Laravel and Python automation workers for unified multi-platform dispatch and live per-channel delivery status tracking.',
    stack: ['Laravel', 'Python', 'WhatsApp', 'Discord', 'Telegram'],
    features: [
      {
        title: 'Simultaneous Multi-Platform Dispatch',
        desc: 'Write once and send team announcements to WhatsApp, Discord, and Telegram at the same time.',
      },
      {
        title: 'Centralized Team Control Hub',
        desc: 'Manage connected group destinations and broadcast workflows from a single clean dashboard.',
      },
      {
        title: 'Per-Channel Delivery Status',
        desc: 'Monitor real-time delivery confirmation across each target group and channel.',
      },
    ],
  },
  'pinggir-sawah-iboe': {
    index: '05',
    category: 'Web Application · Django & React',
    title: 'Pemancingan Pinggir Sawah Iboe',
    summary:
      'An editorial website for Pemancingan & W.M Pinggir Sawah Iboe showcasing the dining menu, fishing grounds, articles, and direct WhatsApp reservations.',
    type: 'web',
    image: '/pinggir-sawah-iboe.jpg',
    imageAlt: 'Pemancingan Pinggir Sawah Iboe restaurant and fishing park website',
    displayUrl: 'pasar-sawah-iboe.vercel.app',
    liveUrl: 'https://pasar-sawah-iboe.vercel.app/',
    liveLabel: 'Open Live Demo',
    specs: [
      { label: 'Stack', value: 'Django · React' },
      { label: 'Industry', value: 'F&B · Tourism' },
      { label: 'Focus', value: 'Brand & Menu' },
    ],
    whyTitle: 'Bringing a local dining and fishing destination online cleanly.',
    whyBody:
      'Built to give visitors a warm first impression of the venue before visiting—highlighting the culinary menu, scenic fishing ponds, stories, and instant WhatsApp contact.',
    role: 'Built the web application with Django backend and React frontend, featuring editorial typography, photo gallery strip, menu navigation, articles section, and direct WhatsApp integration.',
    stack: ['Django', 'React', 'Responsive UI', 'Editorial Design'],
    features: [
      {
        title: 'Editorial Hero & Venue Gallery',
        desc: 'Presents the dining and fishing atmosphere upfront through a structured multi-frame photo showcase.',
      },
      {
        title: 'Menu, About & Articles',
        desc: 'Organized navigation covering signature dishes, venue background, and local stories.',
      },
      {
        title: 'Direct WhatsApp Booking',
        desc: 'Persistent floating WhatsApp action for fast table inquiries and group reservations.',
      },
    ],
  },
  'langkah-baswara': {
    index: '06',
    category: 'Web-GIS · QGIS, FastAPI & React',
    title: 'Langkah Baswara',
    summary:
      'An interactive Web-GIS platform designed to help travelers plan Bali trips faster with preference-based destination discovery and automated itinerary building.',
    type: 'web',
    image: '/langkah-baswara.jpg',
    imageAlt: 'Langkah Baswara — Interactive Web-GIS Bali travel & itinerary planner',
    displayUrl: 'langkah-baswara-peach.vercel.app',
    liveUrl: 'https://langkah-baswara-peach.vercel.app/',
    liveLabel: 'Open Live Demo',
    specs: [
      { label: 'Stack', value: 'QGIS · FastAPI · React' },
      { label: 'Domain', value: 'Bali Tourism' },
      { label: 'Focus', value: 'Itinerary Builder' },
    ],
    whyTitle: 'Planning Bali trips around routes and personal preferences.',
    whyBody:
      'Travelers visiting Bali often spend hours stitching scattered recommendations together. Langkah Baswara pairs interactive Web-GIS exploration with preference-driven itinerary planning so trips stay efficient and organized.',
    role: 'Prepared spatial layers in QGIS, engineered the FastAPI geospatial & itinerary endpoints, and built the interactive React Web-GIS frontend.',
    stack: ['QGIS', 'FastAPI', 'React', 'Web-GIS'],
    features: [
      {
        title: 'Interactive Web-GIS Exploration',
        desc: 'Browse curated Bali destinations spatially to understand proximity and travel routes.',
      },
      {
        title: 'Preference-Based Itinerary Builder',
        desc: 'Generates and organizes day-by-day Bali travel plans tailored to traveler preferences.',
      },
      {
        title: 'Saved Profiles & Quick Navigation',
        desc: 'Clean multi-section experience across Home, About, Explore, and user Profile.',
      },
    ],
  },
  furai: {
    index: '07',
    category: 'Web App · React, FastAPI & Google MediaPipe',
    title: 'Furai',
    summary:
      'A browser-based study companion powered by Google MediaPipe webcam pose detection that alerts you when slouching, paired with a built-in Pomodoro study space.',
    type: 'web',
    image: '/furai.png',
    imageAlt: 'Furai MediaPipe posture detection and study space web app',
    displayUrl: 'furai-green.vercel.app',
    liveUrl: 'https://furai-green.vercel.app/',
    liveLabel: 'Open Live Demo',
    specs: [
      { label: 'Stack', value: 'React · FastAPI' },
      { label: 'Vision', value: 'Google MediaPipe' },
      { label: 'Focus', value: 'Posture · Pomodoro' },
    ],
    whyTitle: 'Catching slouching posture right in the browser with zero video uploads.',
    whyBody:
      'Long coding and study sessions easily lead to bad posture. Furai runs lightweight Google MediaPipe pose estimation locally on your laptop webcam—zero server uploads—combined with a focused Pomodoro study room.',
    role: 'Built the React frontend, FastAPI backend services, real-time Google MediaPipe webcam posture detection, and Pomodoro study space UI.',
    stack: ['React', 'FastAPI', 'Google MediaPipe', 'Pomodoro'],
    features: [
      {
        title: 'Real-Time MediaPipe Posture Detection',
        desc: 'Tracks upper-body alignment and neck angle via laptop webcam to detect slouching immediately.',
      },
      {
        title: '100% Local & Potato-Laptop Friendly',
        desc: 'Runs inference directly in the browser with zero video uploads for complete privacy.',
      },
      {
        title: 'Built-In Pomodoro Study Space',
        desc: 'Pairs posture monitoring with focused study timer sessions to maintain healthy work habits.',
      },
    ],
  },
};

export default function SoftwareDetailPage({ projectId = 'unravel', onBackToProjects }) {
  const prefersReducedMotion = useReducedMotion();
  const project = SOFTWARE_DETAILS[projectId] || SOFTWARE_DETAILS.unravel;

  const scrollToFeatures = () => {
    document.getElementById('core-features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-10 pt-6 sm:pt-14 pb-14 sm:pb-20">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between gap-4 pb-6 mb-10 border-b border-[#E2E8F0]">
        <Button onClick={onBackToProjects} className="group min-h-[44px]">
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
          <span>All software projects</span>
        </Button>

        <span className="font-mono text-xs uppercase tracking-wider text-[#64748B]">
          Case Study · {project.index} / 07
        </span>
      </div>

      {/* 12-Column Case Study Hero */}
      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16"
      >
        {/* Left 6 cols: Editorial Identity & Specs */}
        <div className="lg:col-span-6 min-w-0">
          <span className="inline-block bg-[#0078D7] text-white px-3 py-1 text-[11px] font-mono font-bold tracking-wider uppercase mb-4">
            {project.category}
          </span>

          <h1 className="font-metro text-4xl sm:text-5xl lg:text-6xl font-light text-[#0F172A] tracking-tight leading-[1.06] mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-6 max-w-xl">
            {project.summary}
          </p>

          {/* 3-Column Metro Spec Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-4 mb-7 border-y border-[#E2E8F0]">
            {project.specs.map((spec) => (
              <div key={spec.label} className="min-w-0">
                <span className="block font-mono text-[10px] uppercase tracking-wider text-[#64748B] mb-0.5">
                  {spec.label}
                </span>
                <span className="block font-metro text-sm font-medium text-[#0F172A]">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={scrollToFeatures} className="w-full sm:w-auto justify-center min-h-[44px]">
              <span>Explore the build</span>
              <ArrowDown size={14} aria-hidden="true" />
            </Button>

            {project.liveUrl && (
              <Button
                as="a"
                variant="secondary"
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto justify-center min-h-[44px]"
              >
                <span>{project.liveLabel}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        {/* Right 6 cols: Clean Metro Visual Showcase */}
        <div className="lg:col-span-6 min-w-0">
          <div className="bg-white border border-[#CBD5E1] border-t-4 border-t-[#0078D7] overflow-hidden">
            {project.type === 'web' ? (
              <>
                <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] px-4 py-2.5 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-[#475569] truncate">
                    {project.displayUrl}
                  </span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[11px] font-semibold text-[#0078D7] hover:underline shrink-0"
                    >
                      <span>Visit</span>
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  )}
                </div>
                <div className="bg-[#F1F5F9]">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-auto block"
                  />
                </div>
              </>
            ) : (
              <div className="bg-[#F8FAFC] py-6 px-6 flex justify-center">
                <div className="w-full max-w-[185px] bg-[#0F172A] p-1.5 border border-[#CBD5E1] shadow-md">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="w-full h-auto block bg-white"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Structured Metro Case Study Body */}
      <section
        id="core-features"
        aria-labelledby="features-heading"
        className="scroll-mt-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        {/* Left 5 cols: Solid Metro Cobalt Context & Stack Tile */}
        <div className="lg:col-span-5 bg-[#0078D7] text-white p-7 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-white/80 mb-3">
              01 / Context &amp; Role
            </span>
            <h2 className="font-metro text-2xl sm:text-3xl font-light leading-snug mb-4">
              {project.whyTitle}
            </h2>
            <p className="text-sm text-white/90 leading-relaxed mb-6">
              {project.whyBody}
            </p>
          </div>

          <div className="pt-6 border-t border-white/20 space-y-4">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-white/75 mb-1">
                What I Built
              </span>
              <p className="text-sm text-white/95 leading-relaxed">
                {project.role}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.stack.map((tag) => (
                <span
                  key={tag}
                  className="bg-white/15 text-white text-[11px] font-mono font-semibold px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right 7 cols: 3 Clean Metro Feature Tiles */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="pb-2 border-b border-[#E2E8F0]">
            <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#0078D7] mb-1">
              02 / Architecture &amp; Highlights
            </span>
            <h2 id="features-heading" className="font-metro text-2xl font-light text-[#0F172A]">
              Core Capabilities
            </h2>
          </div>

          <ol className="flex-1 flex flex-col justify-between gap-3.5">
            {project.features.map((feat, idx) => (
              <li
                key={feat.title}
                className="flex-1 bg-white border border-[#CBD5E1] border-l-4 border-l-[#0F172A] p-5 sm:p-6 flex items-start gap-4"
              >
                <span className="w-9 h-9 bg-[#0F172A] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-metro text-lg font-medium text-[#0F172A] mb-1">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Bottom Footer Link */}
      <div className="mt-14 pt-6 border-t border-[#E2E8F0] flex justify-end">
        <Button variant="text" onClick={onBackToProjects} className="group min-h-[44px]">
          <span>Explore all software projects</span>
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Button>
      </div>
    </main>
  );
}
