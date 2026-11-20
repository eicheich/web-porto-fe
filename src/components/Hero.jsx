import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, Mail } from 'lucide-react';
import Button from './Button';

const CONTACT_EMAIL = 'husnulkhotimah@houselab.my.id';

const WINDOW_TILES = [
  { id: 'tl', offsetClass: 'top-0 left-0', bg: 'from-[#00A4EF] to-[#0078D7]', delay: 0 },
  { id: 'tr', offsetClass: 'top-0 -left-full', bg: 'from-[#0093E9] to-[#0078D7]', delay: 0.08 },
  { id: 'bl', offsetClass: '-top-full left-0', bg: 'from-[#0078D7] to-[#0063B1]', delay: 0.16 },
  { id: 'br', offsetClass: '-top-full -left-full', bg: 'from-[#0078D7] to-[#005A9E]', delay: 0.24 },
];

const CONFETTI_PIECES = [
  { id: 0, x: -46, y: -54, rotate: -110, color: '#0078D7', size: 'w-2 h-2' },
  { id: 1, x: -34, y: -70, rotate: 95, color: '#008272', size: 'w-2.5 h-1.5' },
  { id: 2, x: -18, y: -82, rotate: -65, color: '#FFB900', size: 'w-2 h-2' },
  { id: 3, x: -4, y: -76, rotate: 140, color: '#E81123', size: 'w-1.5 h-2.5' },
  { id: 4, x: 14, y: -84, rotate: -130, color: '#5133AB', size: 'w-2 h-2' },
  { id: 5, x: 30, y: -72, rotate: 75, color: '#38BDF8', size: 'w-2.5 h-1.5' },
  { id: 6, x: 48, y: -56, rotate: 160, color: '#0078D7', size: 'w-2 h-2' },
  { id: 7, x: -58, y: -28, rotate: -85, color: '#10B981', size: 'w-1.5 h-2' },
  { id: 8, x: 56, y: -30, rotate: 115, color: '#FFB900', size: 'w-2 h-1.5' },
  { id: 9, x: -42, y: -42, rotate: 45, color: '#E81123', size: 'w-1.5 h-1.5' },
  { id: 10, x: 40, y: -44, rotate: -55, color: '#008272', size: 'w-2 h-2' },
  { id: 11, x: 2, y: -92, rotate: 180, color: '#0078D7', size: 'w-2 h-1.5' },
];

export const Hero = () => {
  const [copied, setCopied] = useState(false);
  const [confettiBurst, setConfettiBurst] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setConfettiBurst((n) => n + 1);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Clean Windows 8 Metro editorial typography */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="w-2.5 h-2.5 bg-[#0078D7]" aria-hidden="true" />
              <span className="font-metro text-xs font-semibold uppercase tracking-[0.14em] text-[#475569]">
                Software Engineering · IPB University
              </span>
            </div>

            <h1
              id="hero-heading"
              className="font-metro text-4xl sm:text-6xl font-light tracking-[-0.02em] text-[#0F172A] leading-[1.08]"
            >
              Husnul Khotimah
            </h1>

            <p className="mt-4 font-metro text-xl sm:text-2xl font-normal text-[#0078D7]">
              Applied Machine Learning &amp; Full-Stack Software.
            </p>

            <p className="mt-4 text-base sm:text-lg text-[#475569] leading-relaxed max-w-xl">
              I build interactive ML models, scalable backend APIs, and web &amp; mobile apps.
            </p>

            <div className="mt-7 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <Button
                as="a"
                href="#ml-projects"
                variant="primary"
                className="min-h-[44px] whitespace-nowrap px-4 sm:px-5 text-xs sm:text-sm"
              >
                Explore projects
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Button>

              <Button
                as="a"
                href="#experience"
                variant="secondary"
                className="min-h-[44px] whitespace-nowrap px-4 sm:px-5 text-xs sm:text-sm"
              >
                Experience
              </Button>

              <div className="relative inline-flex items-center">
                <Button
                  type="button"
                  variant="text"
                  onClick={handleCopyEmail}
                  className="min-h-[44px] whitespace-nowrap text-xs sm:text-sm"
                  aria-label={`Copy email address ${CONTACT_EMAIL}`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#008272]" aria-hidden="true" />
                      <span>Email copied</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Copy email</span>
                    </>
                  )}
                </Button>

                {!prefersReducedMotion && confettiBurst > 0 && (
                  <div
                    key={confettiBurst}
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 z-30"
                  >
                    {CONFETTI_PIECES.map((piece) => (
                      <motion.span
                        key={piece.id}
                        initial={{ x: 0, y: 0, scale: 0.4, rotate: 0, opacity: 1 }}
                        animate={{
                          x: [0, piece.x * 0.75, piece.x],
                          y: [0, piece.y, piece.y + 34],
                          scale: [0.4, 1, 0.7],
                          rotate: piece.rotate,
                          opacity: [1, 1, 0],
                        }}
                        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                        style={{ backgroundColor: piece.color }}
                        className={`absolute block ${piece.size}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Square Windows 8 3D Perspective Card — Desktop/Tablet only */}
          <div className="hidden md:block lg:col-span-6 w-full max-w-[390px] mx-auto lg:ml-auto py-4">
            <motion.button
              type="button"
              onClick={() => setIsRevealed((prev) => !prev)}
              onMouseEnter={() => setIsRevealed(true)}
              onMouseLeave={() => setIsRevealed(false)}
              aria-expanded={isRevealed}
              aria-label={
                isRevealed
                  ? 'Flip tiles back to Windows 8 window'
                  : 'Flip Windows 8 tiles to reveal portrait'
              }
              initial={
                prefersReducedMotion
                  ? false
                  : { opacity: 0, rotateY: -22, scale: 0.97 }
              }
              animate={{
                opacity: 1,
                rotateY: isRevealed ? -8 : -16,
                scale: isRevealed ? 1.01 : 1,
              }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              style={{
                transformPerspective: 950,
                transformStyle: 'preserve-3d',
              }}
              className="block w-full text-left bg-white border border-[#CBD5E1] overflow-hidden shadow-[14px_18px_36px_rgba(15,23,42,0.12)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0078D7]"
            >
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        gap: isRevealed ? '0px' : '10px',
                        padding: isRevealed ? '0px' : '10px',
                      }
                }
                transition={{
                  duration: 0.42,
                  delay: isRevealed ? 0.22 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  gap: prefersReducedMotion ? '0px' : '10px',
                  padding: prefersReducedMotion ? '0px' : '10px',
                }}
                className="relative aspect-square w-full bg-[#F8FAFC] grid grid-cols-2 grid-rows-2"
              >
                {WINDOW_TILES.map((tile) => (
                  <motion.div
                    key={tile.id}
                    animate={
                      prefersReducedMotion
                        ? undefined
                        : { rotateY: isRevealed ? 180 : 0 }
                    }
                    transition={{
                      duration: 0.48,
                      delay: isRevealed ? tile.delay : (0.24 - tile.delay) * 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      transformPerspective: 700,
                      transformStyle: 'preserve-3d',
                    }}
                    className="relative w-full h-full"
                  >
                    {/* Front: Windows 8 Blue Pane */}
                    <div
                      aria-hidden="true"
                      style={{ backfaceVisibility: 'hidden' }}
                      className={`absolute inset-0 bg-gradient-to-br ${tile.bg} border border-white/25 ${
                        prefersReducedMotion && isRevealed ? 'opacity-0' : 'opacity-100'
                      } transition-opacity duration-200`}
                    />

                    {/* Back: Seamless Quadrant of Portrait */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: prefersReducedMotion ? 'none' : 'rotateY(180deg)',
                      }}
                      className="absolute inset-0 overflow-hidden bg-[#E2E8F0]"
                    >
                      <div className={`absolute w-[200%] h-[200%] ${tile.offsetClass}`}>
                        <img
                          src="/profile.jpg"
                          alt={tile.id === 'tl' ? 'Husnul Khotimah' : ''}
                          className="w-full h-full object-cover object-[50%_20%] scale-[1.03]"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
