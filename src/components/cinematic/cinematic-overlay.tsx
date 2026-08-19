"use client";

import { motion } from "motion/react";

type CinematicOverlayProps = {
  target?: HTMLElement | null;
  children?: React.ReactNode;
};

const OVERLAY_COLOR = "rgba(3, 12, 24, 0.72)";

export function CinematicOverlay({ target, children }: CinematicOverlayProps) {
  const rect = target?.getBoundingClientRect();

  const padding = 10;

  const top = Math.max(0, (rect?.top ?? 0) - padding);
  const left = Math.max(0, (rect?.left ?? 0) - padding);
  const right = rect ? window.innerWidth - rect.right - padding : 0;
  const bottom = rect ? window.innerHeight - rect.bottom - padding : 0;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {!rect ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="absolute inset-0"
        />
      ) : (
        <>
          {/* Top */}

          <OverlayPanel
            initial={{
              top: 0,
              left: 0,
              right: 0,
              height: 0,
            }}
            animate={{
              top: 0,
              left: 0,
              right: 0,
              height: top,
            }}
          />

          {/* Left */}

          <OverlayPanel
            initial={{
              top,
              left: 0,
              width: 0,
              height: rect.height + padding * 2,
            }}
            animate={{
              top,
              left: 0,
              width: left,
              height: rect.height + padding * 2,
            }}
          />

          {/* Right */}

          <OverlayPanel
            initial={{
              top,
              right: 0,
              width: 0,
              height: rect.height + padding * 2,
            }}
            animate={{
              top,
              right: 0,
              width: right,
              height: rect.height + padding * 2,
            }}
          />

          {/* Bottom */}

          <OverlayPanel
            initial={{
              bottom: 0,
              left: 0,
              right: 0,
              height: 0,
            }}
            animate={{
              bottom: 0,
              left: 0,
              right: 0,
              height: bottom,
            }}
          />

          {/* Spotlight border */}

          <motion.div
            initial={{
              opacity: 0,
              top,
              left,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2,
            }}
            animate={{
              opacity: 1,
              top,
              left,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2,
            }}
            transition={{
              duration: 0.45,
            }}
            className="absolute rounded-xl border-2 border-[#5FA8FF]"
          />
        </>
      )}

      {children}
    </div>
  );
}

function OverlayPanel({
  initial,
  animate,
}: {
  initial: Record<string, number>;
  animate: Record<string, number>;
}) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="pointer-events-auto absolute"
      style={{
        background: OVERLAY_COLOR,
      }}
    />
  );
}
