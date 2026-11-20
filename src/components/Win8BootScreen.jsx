import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

const BOOT_DURATION_MS = 1500;
const SPINNER_DOTS = [0, 1, 2, 3, 4];

export default function Win8BootScreen() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const timer = window.setTimeout(() => {
      setVisible(false);
    }, BOOT_DURATION_MS);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setVisible(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-live="polite"
          aria-label="Loading portfolio"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center select-none cursor-pointer"
        >
          {/* Iconic Angled Cyan Windows 8 Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            style={{
              transformPerspective: 600,
              transform: 'rotateY(-22deg)',
            }}
            className="grid grid-cols-2 grid-rows-2 gap-1.5 w-20 h-20 sm:w-24 sm:h-24"
            aria-hidden="true"
          >
            <span className="bg-[#00ADEF]" />
            <span className="bg-[#00ADEF]" />
            <span className="bg-[#00ADEF]" />
            <span className="bg-[#00ADEF]" />
          </motion.div>

          {/* Iconic Windows 8 5-Dot Orbiting Ring */}
          <div className="relative w-10 h-10 mt-14" aria-hidden="true">
            {SPINNER_DOTS.map((dot) => (
              <motion.div
                key={dot}
                initial={{ rotate: 0, opacity: 0 }}
                animate={{
                  rotate: [0, 360],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: dot * 0.14,
                  ease: [0.35, 0.85, 0.65, 0.15],
                }}
                className="absolute inset-0 flex items-end justify-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setVisible(false);
            }}
            className="mt-14 font-metro text-[11px] uppercase tracking-[0.18em] text-white/40 hover:text-white/85 transition-colors"
          >
            Click or press Esc to skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
