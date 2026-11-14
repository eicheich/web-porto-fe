import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Win98WindowControls, PixelFolderIcon } from '../components/RetroStickers';

export default function SoftwareDetailPage({ projectId = 'study-space', onBackToProjects }) {
  const isUnravel = projectId === 'unravel';
  const isUFee = projectId === 'ufee';
  const isHijauKita = projectId === 'hijaukita';
  const isStudySpace = projectId === 'study-space' || projectId === 'studyspace';

  const [tasks] = useState({
    todo: ["Read this week's material", "Summarize class notes"],
    inProgress: ["Design the group project"],
    done: ["Plan a study schedule"],
  });

  const scrollToPreview = () => {
    document.getElementById('board-preview')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14 pb-20">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <button
          onClick={onBackToProjects}
          className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#111827] px-3 py-1.5 cursor-pointer group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          All software projects
        </button>
      </motion.div>

      {/* Title & Summary */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
      >
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#D4D0C8] win98-raised px-2.5 py-0.5 mb-3">
            <PixelFolderIcon className="w-3.5 h-3.5" />
            <span className="text-[11px] font-mono font-bold tracking-wider text-[#000080] uppercase">
              {isHijauKita
                ? 'Garuda Hacks 4.0 Winner · Mobile & Backend'
                : isUnravel || isStudySpace
                  ? 'Software / Web Application'
                  : 'Software / Mobile Application'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-[46px] font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-[-0.02em] leading-tight mb-3">
            {isUnravel
              ? 'Unravel'
              : isUFee
                ? 'UFee'
                : isHijauKita
                  ? 'HijauKita'
                  : isStudySpace
                    ? 'Study Space'
                    : 'Campus Pocket'}
          </h1>
          <p className="text-base sm:text-lg text-[#E6F4F4] font-normal mb-6 max-w-xl">
            {isUnravel
              ? 'Unravel menyatukan jalur belajar interaktif, berbagi perspektif, dan progres untuk belajar menganalisis kasus secara terstruktur.'
              : isUFee
                ? 'Aplikasi mobile Flutter toko khusus sepatu dengan tampilan editorial yang bersih dan navigasi cepat.'
                : isHijauKita
                  ? 'Aplikasi edukasi & aksi sustainability pemenang Hackathon International Garuda Hacks 4.0, dibuat dengan Flutter, Laravel, dan Figma.'
                  : isStudySpace
                    ? 'A web app for coursework, tasks, and study plans.'
                    : 'Campus events, reminders, and notes in one place.'}
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={scrollToPreview}
              className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#111827] px-3.5 py-1.5 cursor-pointer"
            >
              Explore the project
              <ArrowDown size={13} className="text-[#000080]" />
            </button>

            {isHijauKita && (
              <a
                href="https://devpost.com/software/hijaukita"
                target="_blank"
                rel="noopener noreferrer"
                className="win98-raised inline-flex items-center gap-1.5 text-xs font-bold text-[#000080] px-3.5 py-1.5 cursor-pointer hover:bg-[#FEF08A] transition-colors"
              >
                View on Devpost
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        <div className="win98-raised px-3 py-1.5 self-start md:self-end">
          <div className="text-xs font-mono font-bold text-[#111827]">
            Software Engineering Project
          </div>
        </div>
      </motion.div>

      {/* Mockup Window Container */}
      <motion.div
        id="board-preview"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        className="scroll-mt-10"
      >
        <div className="win98-window p-1">
          <div className="win98-titlebar">
            <span className="text-[11px] font-bold tracking-wide">
              {isUnravel
                ? 'Unravel — Internet Explorer'
                : isUFee
                  ? 'UFee — Mobile Emulator'
                  : isHijauKita
                    ? 'HijauKita — Mobile Emulator'
                    : isStudySpace
                      ? 'studyspace.exe — Preview'
                      : 'campuspocket.exe — Preview'}
            </span>
            <Win98WindowControls />
          </div>

          {isUnravel ? (
            /* Unravel: Clean 1998 Browser Mockup (single layer, no nested boxes) */
            <div>
              <div className="flex items-center gap-2 px-2 py-1.5 bg-[#DFDCD4] border-b border-[#808080]">
                <span className="text-[11px] font-mono text-[#374151] shrink-0">Address</span>
                <div className="win98-sunken bg-white px-2.5 py-0.5 text-xs font-mono text-[#111827] flex-1 truncate">
                  https://unravel.app
                </div>
                <span className="win98-raised px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#111827] hidden sm:inline-block">
                  Go
                </span>
              </div>
              <div className="win98-sunken bg-white overflow-hidden">
                <img
                  src="/unravel.jpg"
                  alt="Unravel — Belajar menganalisis kasus secara terstruktur"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          ) : isUFee || isHijauKita ? (
            /* UFee / HijauKita: Clean Smartphone Device Mockup on subtle dithered stage */
            <div className="win98-sunken bg-[#C8C4BC] bg-dither-dots py-8 sm:py-10 px-4 flex justify-center">
              <div className="relative bg-[#18181B] rounded-[2.2rem] p-2.5 shadow-[0_18px_38px_-10px_rgba(0,0,0,0.45)] border border-[#3F3F46] max-w-[270px] w-full">
                {/* Side hardware buttons */}
                <span aria-hidden="true" className="absolute -left-[3px] top-20 w-[3px] h-7 bg-[#3F3F46] rounded-l" />
                <span aria-hidden="true" className="absolute -left-[3px] top-30 w-[3px] h-10 bg-[#3F3F46] rounded-l" />
                <span aria-hidden="true" className="absolute -right-[3px] top-24 w-[3px] h-12 bg-[#3F3F46] rounded-r" />

                <div className="rounded-[1.65rem] overflow-hidden bg-white">
                  <img
                    src={isHijauKita ? '/hijaukita.jpg' : '/ufee.jpg'}
                    alt={
                      isHijauKita
                        ? 'HijauKita — Aplikasi sustainability pemenang Garuda Hacks 4.0'
                        : 'UFee — Toko khusus sepatu Flutter mobile app'
                    }
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            </div>
          ) : (
          <div className="win98-sunken bg-[#E8E4DC] p-4 sm:p-8 md:p-10">
          {isStudySpace ? (
            /* Study Space Web App Mockup */
            <div className="bg-[#FFFDF8] rounded-3xl shadow-xs p-6 sm:p-10 md:p-12 border border-[#1F2A2E]/10">
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#1F2A2E]/8">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E67B50]/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F4C95D]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#93A854]/85" />
                </div>
                <span className="text-xs text-[#5C6B70] font-mono tracking-wide">
                  studyspace.app
                </span>
                <div className="w-8" />
              </div>

              <div className="flex items-center justify-between mb-10">
                <span className="font-display text-xl font-bold tracking-tight text-[#1F2A2E]">
                  studyspace
                </span>
                <div className="flex items-center gap-6 sm:gap-8 text-xs font-medium text-[#5C6B70]">
                  <span className="text-[#1F2A2E] font-semibold cursor-pointer">Overview</span>
                  <span className="hover:text-[#1F2A2E] transition cursor-pointer">Tasks</span>
                  <span className="hover:text-[#1F2A2E] transition cursor-pointer">Schedule</span>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1F2A2E] tracking-[-0.025em] mb-2">
                  One thing at a time.
                </h2>
                <p className="text-sm text-[#465359] font-normal">
                  A simple place to organize coursework and study plans.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xs font-bold text-[#1F2A2E] mb-4">To do</h4>
                  <div className="space-y-3">
                    {tasks.todo.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                        className="flex items-center gap-2.5 text-xs text-[#465359] font-medium p-2 rounded-lg hover:bg-[#FAF5EB] cursor-default"
                      >
                        <span className="w-1.5 h-4 rounded-full bg-[#2D6E7E] shrink-0" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#1F2A2E] mb-4">In progress</h4>
                  <div className="space-y-3">
                    {tasks.inProgress.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                        className="flex items-center gap-2.5 text-xs text-[#465359] font-medium p-2 rounded-lg hover:bg-[#FAF5EB] cursor-default"
                      >
                        <span className="w-1.5 h-4 rounded-full bg-[#F4C95D] shrink-0" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-[#1F2A2E] mb-4">Done</h4>
                  <div className="space-y-3">
                    {tasks.done.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 4 }}
                        transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                        className="flex items-center gap-2.5 text-xs text-[#465359] font-medium p-2 rounded-lg hover:bg-[#FAF5EB] cursor-default"
                      >
                        <span className="w-1.5 h-4 rounded-full bg-[#93A854] shrink-0" />
                        <span>{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Campus Pocket Mobile App Mockup */
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22 }}
              className="max-w-md mx-auto bg-[#FFFDF8] rounded-[38px] shadow-md p-6 border-4 border-[#1F2A2E]/85"
            >
              <div className="w-16 h-1 bg-[#1F2A2E]/15 rounded-full mx-auto mb-6" />
              <div className="text-center mb-8">
                <span className="text-[11px] font-mono font-bold text-[#2D6E7E] uppercase tracking-wider block mb-1">
                  Campus Pocket
                </span>
                <h3 className="font-display text-2xl font-bold text-[#1F2A2E]">
                  A little closer to campus life.
                </h3>
              </div>

              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3.5 bg-[#DCEDFB]/65 rounded-2xl border border-[#1F2A2E]/10 cursor-default"
                >
                  <div className="text-xs font-bold text-[#1F2A2E]">AI & Tech Campus Seminar</div>
                  <div className="text-[11px] text-[#465359] mt-0.5">IPB Auditorium · 10:00 AM</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-3.5 bg-[#F5EDD6]/75 rounded-2xl border border-[#1F2A2E]/10 cursor-default"
                >
                  <div className="text-xs font-bold text-[#1F2A2E]">Final Project Submission</div>
                  <div className="text-[11px] text-[#465359] mt-0.5">Due tomorrow, 11:59 PM</div>
                </motion.div>
              </div>
            </motion.div>
          )}
          </div>
          )}
        </div>

        <p className="text-center text-xs text-[#E6F4F4] font-mono mt-5">
          {isUnravel
            ? 'Unravel landing & methodology preview'
            : isUFee
              ? 'UFee mobile home screen preview'
              : isHijauKita
                ? 'HijauKita mobile app preview · Garuda Hacks 4.0 Winner'
                : isStudySpace
                  ? 'Task board preview'
                  : 'Mobile interface preview'}
        </p>
      </motion.div>

      {/* Core features */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.4 }}
        className="mt-16 mb-14"
      >
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow-[2px_2px_0px_#004040] tracking-[-0.02em] mb-6">
          Core features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: isUnravel
                ? '1. Bedah Kasus Nyata'
                : isUFee
                  ? 'Kategori All, Men & Women'
                  : isHijauKita
                    ? 'Visualisasi Kondisi Lingkungan'
                    : isStudySpace
                      ? 'Capture tasks'
                      : 'Live campus notifications',
              desc: isUnravel
                ? 'Pilih topik dunia nyata dan analisis narasi kasus dari berbagai sudut pandang.'
                : isUFee
                  ? 'Filter katalog sepatu dengan cepat sesuai kategori koleksi.'
                  : isHijauKita
                    ? 'Menampilkan ilustrasi interaktif untuk meningkatkan kesadaran terhadap isu sampah.'
                    : isStudySpace
                      ? 'Add coursework with a clear next step.'
                      : 'Instant push notifications for urgent academic updates.',
            },
            {
              title: isUnravel
                ? '2. Formulasi 4 Pilar Analisis'
                : isUFee
                  ? 'Editorial New In & Shop'
                  : isHijauKita
                    ? 'BuGuru AI'
                    : isStudySpace
                      ? 'Track progress'
                      : 'Schedule sync',
              desc: isUnravel
                ? 'Kelompokkan kata kunci ke dalam zona Tujuan, Masalah, Solusi, dan Stakeholder secara tepat.'
                : isUFee
                  ? 'Menampilkan koleksi terbaru dengan visual penuh dan akses belanja langsung.'
                  : isHijauKita
                    ? 'Sumber pengetahuan interaktif tentang sustainability melalui fitur tanya jawab.'
                    : isStudySpace
                      ? 'Move tasks from to-do to done.'
                      : 'Sync course timetables directly into your mobile calendar.',
            },
            {
              title: isUnravel
                ? '3. Bandingkan Perspektif'
                : isUFee
                  ? 'Try It & Free Returns'
                  : isHijauKita
                    ? 'Aktivitas & Peringkat'
                    : isStudySpace
                      ? 'Plan ahead'
                      : 'Offline access',
              desc: isUnravel
                ? 'Bandingkan hasil analisismu dengan ribuan analis lain di forum ulasan publik.'
                : isUFee
                  ? 'Pencarian, keranjang belanja, riwayat, dan jaminan pengembalian gratis.'
                  : isHijauKita
                    ? 'Pelacakan aktivitas hijau, fitur cari, serta papan peringkat untuk menjaga konsistensi aksi.'
                    : isStudySpace
                      ? 'Keep study plans in one place.'
                      : 'Review room locations and course outlines without active Wi-Fi.',
            },
          ].map((feat, idx) => (
            <div key={idx} className="win98-window p-1 flex flex-col">
              <div className="win98-titlebar">
                <span className="text-[11px] font-bold tracking-wide">feature_0{idx + 1}.txt</span>
                <Win98WindowControls />
              </div>
              <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex-1">
                <h3 className="font-display text-base font-bold text-[#111827] mb-1.5">{feat.title}</h3>
                <p className="text-xs text-[#4B5563] font-normal leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="win98-window p-1 flex flex-col">
            <div className="win98-titlebar">
              <span className="text-[11px] font-bold tracking-wide">Why I built this</span>
              <Win98WindowControls />
            </div>
            <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex-1">
              <p className="text-sm text-[#111827] leading-relaxed font-normal">
                {isUnravel
                  ? 'Melatih berpikir kritis sering terasa abstrak tanpa struktur yang jelas. Unravel menyatukan jalur belajar interaktif, forum diskusi, dan progres agar pengguna bisa berlatih membedah kasus secara konsisten.'
                  : isUFee
                    ? 'Banyak aplikasi e-commerce terasa penuh sesak oleh banner dan pop-up. UFee dirancang khusus untuk toko sepatu dengan fokus pada foto produk, kategori ringkas, dan alur belanja yang nyaman di mobile.'
                    : isHijauKita
                      ? 'Dibangun untuk Hackathon International Garuda Hacks 4.0 (dan berhasil meraih juara) guna mengajak masyarakat memahami isu sampah serta belajar sustainability secara menyenangkan lewat BuGuru AI dan aktivitas harian.'
                      : isStudySpace
                        ? 'Students often juggle coursework deadlines across scattered notes and chat groups. Study Space keeps everything in one distraction-free board.'
                        : 'Campus announcements and event schedules are often buried in multiple feeds. Campus Pocket brings them into one quick daily view.'}
              </p>
            </div>
          </div>

          <div className="win98-window p-1 flex flex-col">
            <div className="win98-titlebar">
              <span className="text-[11px] font-bold tracking-wide">My Role & Stack</span>
              <Win98WindowControls />
            </div>
            <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <p className="text-sm text-[#111827] leading-relaxed font-normal mb-4">
                {isUnravel
                  ? 'Merancang antarmuka interaktif bergaya neo-brutalist, alur 3 langkah metodologi analisis kasus, mode diskusi, serta sistem ranking dan poin.'
                  : isUFee
                    ? 'Membangun aplikasi mobile cross-platform menggunakan Flutter dengan navigasi tab bawah, filter kategori, dan tampilan katalog bergaya editorial.'
                    : isHijauKita
                      ? 'Merancang desain UI/UX di Figma, mengembangkan aplikasi mobile di Flutter, serta mengintegrasikan backend dan logika API menggunakan Laravel.'
                      : isStudySpace
                        ? 'Designed the UI/UX flow, built the interactive task board state, and structured responsive layouts.'
                        : 'Designed the mobile-first interface, notification hierarchy, and offline-friendly schedule cards.'}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#D4D0C8]">
                {(isUnravel
                  ? ['React', 'Tailwind CSS', 'Interactive UI', 'Case Study']
                  : isUFee
                    ? ['Flutter', 'Dart', 'Mobile UI', 'E-Commerce']
                    : isHijauKita
                      ? ['Flutter', 'Laravel', 'Figma', 'Garuda Hacks 4.0']
                      : isStudySpace
                        ? ['React', 'Tailwind CSS', 'UI/UX Design']
                        : ['Mobile UI', 'React Native', 'Product Design']
                ).map((tag, i) => (
                  <span key={i} className="win98-raised text-[11px] font-mono font-bold bg-[#D4D0C8] px-2.5 py-0.5 text-[#111827]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* More projects Win98 banner */}
      <div className="win98-window p-1">
        <div className="win98-titlebar">
          <span className="text-[11px] font-bold tracking-wide">more_projects.exe</span>
          <Win98WindowControls />
        </div>
        <div className="win98-sunken bg-[#FAF8F2] p-5 sm:p-6 flex items-center justify-between gap-4">
          <h3 className="font-display text-lg font-bold text-[#111827] tracking-tight">
            More projects
          </h3>
          <button
            onClick={onBackToProjects}
            className="win98-raised inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#111827] px-4 py-2 cursor-pointer group"
          >
            All software projects
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </main>
  );
}
