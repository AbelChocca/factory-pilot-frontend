"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

type CinematicInteractionBlockerProps = {
  rect?: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;

  enabled?: boolean;
  allowTargetInteraction?: boolean;
  preventScroll?: boolean;
  padding?: number;
};

export function CinematicInteractionBlocker({
  rect,
  enabled = true,
  allowTargetInteraction = true,
  preventScroll = false,
  padding = 10,
}: CinematicInteractionBlockerProps) {
  useEffect(() => {
    if (!enabled || !preventScroll) {
      return;
    }

    const prevent = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener("wheel", prevent, {
      passive: false,
    });

    window.addEventListener("touchmove", prevent, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", prevent);
      window.removeEventListener("touchmove", prevent);
    };
  }, [enabled, preventScroll]);

  if (!enabled) {
    return null;
  }

  if (!rect) {
    return <div className="pointer-events-auto fixed inset-0 z-[9998]" />;
  }

  const top = rect.top - padding;
  const left = rect.left - padding;
  const width = rect.width + padding * 2;
  const height = rect.height + padding * 2;

  const right = Math.max(0, window.innerWidth - (left + width));

  const bottom = Math.max(0, window.innerHeight - (top + height));

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998]">
      {/* TOP */}
      <BlockerPanel
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: top,
        }}
      />

      {/* LEFT */}
      <BlockerPanel
        style={{
          top,
          left: 0,
          width: left,
          height,
        }}
      />

      {/* RIGHT */}
      <BlockerPanel
        style={{
          top,
          right: 0,
          width: right,
          height,
        }}
      />

      {/* BOTTOM */}
      <BlockerPanel
        style={{
          bottom: 0,
          left: 0,
          right: 0,
          height: bottom,
        }}
      />

      {/* BLOCK TARGET */}
      {!allowTargetInteraction && (
        <BlockerPanel
          style={{
            top,
            left,
            width,
            height,
          }}
        />
      )}
    </div>
  );
}

function BlockerPanel({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
      }}
      className="pointer-events-auto fixed"
      style={style}
    />
  );
}
