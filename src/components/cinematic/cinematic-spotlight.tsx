"use client";

import { motion } from "motion/react";

type CinematicSpotlightProps = {
  rect: {
    top: number;
    left: number;
    width: number;
    height: number;
  };

  padding?: number;
};

export function CinematicSpotlight({
  rect,
  padding = 10,
}: CinematicSpotlightProps) {
  const top = rect.top - padding;
  const left = rect.left - padding;
  const width = rect.width + padding * 2;
  const height = rect.height + padding * 2;

  return (
    <motion.div
      initial={{
        opacity: 0,
        top,
        left,
        width,
        height,
      }}
      animate={{
        opacity: 1,
        top,
        left,
        width,
        height,
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      className="
        pointer-events-none
        fixed
        z-[10001]
        rounded-xl
        border-2
        border-[#5FA8FF]
      "
      style={{
        boxShadow: `
          0 0 0 4px rgba(95, 168, 255, 0.10),
          0 0 35px rgba(95, 168, 255, 0.45)
        `,
      }}
    />
  );
}
