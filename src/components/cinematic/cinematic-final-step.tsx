"use client";

import { motion } from "motion/react";

interface CinematicFinalStepProps {
  eyebrow?: string;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export function CinematicFinalStep({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}: CinematicFinalStepProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Cinematic overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="absolute inset-0 bg-[#030C18]/80 backdrop-blur-[2px]"
      />

      {/* Central glow */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.85,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: "easeOut",
        }}
        className="absolute size-[420px] rounded-full bg-[#5FA8FF]/10 blur-3xl"
      />

      {/* Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "easeOut",
        }}
        className="pointer-events-auto relative w-[min(90vw,520px)] rounded-2xl border border-white/10 bg-[#071A2F]/95 p-8 text-center shadow-2xl backdrop-blur-xl"
      >
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5FA8FF]">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
          {title}
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#9FB0C4]">
          {description}
        </p>

        <motion.button
          type="button"
          onClick={onAction}
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.98,
          }}
          className="mt-7 rounded-lg bg-[#5FA8FF] px-6 py-3 text-sm font-semibold text-[#071A2F] shadow-[0_0_30px_rgba(95,168,255,0.25)] transition-colors hover:bg-white"
        >
          {actionLabel}
        </motion.button>
      </motion.div>
    </div>
  );
}
