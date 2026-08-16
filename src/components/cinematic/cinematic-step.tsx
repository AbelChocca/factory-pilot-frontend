"use client";

import { motion } from "motion/react";

type CinematicStepProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function CinematicStep({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}: CinematicStepProps) {
  return (
    <>
      {/* Cinematic backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="pointer-events-auto fixed inset-0 z-[9998] bg-[#030C18]/75 backdrop-blur-[2px]"
      />

      {/* Central cinematic card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 24,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.55,
          ease: "easeOut",
        }}
        className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
      >
        <div className="pointer-events-auto w-[min(90vw,640px)] rounded-2xl border border-white/10 bg-[#071A2F]/95 p-9 text-center shadow-2xl backdrop-blur-xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#5FA8FF]">
              {eyebrow}
            </p>
          )}

          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
            {title}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#9FB0C4] md:text-base">
            {description}
          </p>

          {actionLabel && onAction && (
            <motion.button
              type="button"
              onClick={onAction}
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="mt-8 rounded-lg bg-[#5FA8FF] px-6 py-3 text-sm font-semibold text-[#071A2F] shadow-[0_0_25px_rgba(95,168,255,0.2)] transition-colors hover:bg-white"
            >
              {actionLabel}
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
}
