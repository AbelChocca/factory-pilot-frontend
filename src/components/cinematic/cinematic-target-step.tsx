"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { motion } from "motion/react";
import { CinematicInteractionBlocker } from "./cinematic-interaction-blocker";

type CinematicTargetStepProps = {
  targetSelector: string;

  eyebrow?: string;
  title: string;
  description: string;

  actionLabel?: string;
  onAction?: () => void;

  onTargetClick?: () => void;

  placement?: "top" | "bottom" | "left" | "right";

  tooltipGap?: number;
  preventScroll?: boolean;
};

type TargetRect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const TOOLTIP_WIDTH = 420;
const TOOLTIP_HEIGHT = 220;
const VIEWPORT_PADDING = 16;

export function CinematicTargetStep({
  targetSelector,
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
  onTargetClick,
  placement = "bottom",
  tooltipGap = 16,
  preventScroll = false,
}: CinematicTargetStepProps) {
  const [rect, setRect] = useState<TargetRect | null>(null);

  const handleTargetClick = useCallback(() => {
    onTargetClick?.();
  }, [onTargetClick]);

  useLayoutEffect(() => {
    let cancelled = false;
    let cleanup = () => {};

    const findTarget = () => {
      if (cancelled) {
        return;
      }

      const element = document.querySelector<HTMLElement>(targetSelector);

      if (!element) {
        requestAnimationFrame(findTarget);
        return;
      }

      const updateRect = () => {
        const nextRect = element.getBoundingClientRect();

        setRect({
          top: nextRect.top,
          left: nextRect.left,
          width: nextRect.width,
          height: nextRect.height,
        });
      };

      updateRect();

      element.addEventListener("click", handleTargetClick);

      window.addEventListener("resize", updateRect);
      window.addEventListener("scroll", updateRect, true);

      cleanup = () => {
        element.removeEventListener("click", handleTargetClick);
        window.removeEventListener("resize", updateRect);
        window.removeEventListener("scroll", updateRect, true);
      };
    };

    findTarget();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [targetSelector, handleTargetClick]);

  if (!rect) {
    return null;
  }

  const padding = 10;

  const top = rect.top - padding;
  const left = rect.left - padding;
  const width = rect.width + padding * 2;
  const height = rect.height + padding * 2;

  let tooltipTop: number;
  let tooltipLeft: number;

  switch (placement) {
    case "top":
      tooltipTop = top - TOOLTIP_HEIGHT - tooltipGap;
      tooltipLeft = left + width - TOOLTIP_WIDTH;
      break;

    case "left":
      tooltipTop = top;
      tooltipLeft = left - TOOLTIP_WIDTH - tooltipGap;
      break;

    case "right":
      tooltipTop = top;
      tooltipLeft = left + width + tooltipGap;
      break;

    case "bottom":
    default:
      tooltipTop = top + height + tooltipGap;
      tooltipLeft = left;
      break;
  }

  const safeTooltipLeft = Math.max(
    VIEWPORT_PADDING,
    Math.min(tooltipLeft, window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_PADDING),
  );

  const safeTooltipTop = Math.max(
    VIEWPORT_PADDING,
    Math.min(
      tooltipTop,
      window.innerHeight - TOOLTIP_HEIGHT - VIEWPORT_PADDING,
    ),
  );

  return (
    <>
      <CinematicInteractionBlocker
        rect={rect}
        enabled
        allowTargetInteraction
        preventScroll={preventScroll}
        padding={10}
      />
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
        className="pointer-events-none fixed z-[9999] rounded-xl border-2 border-[#5FA8FF]"
        style={{
          boxShadow: `
            0 0 0 4px rgba(95, 168, 255, 0.10),
            0 0 35px rgba(95, 168, 255, 0.45),
            0 0 0 9999px rgba(3, 12, 24, 0.72)
          `,
        }}
      />

      <motion.div
        initial={{
          opacity: 0,
          y: 12,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.45,
          delay: 0.15,
          ease: "easeOut",
        }}
        className="pointer-events-auto fixed z-[10000]"
        style={{
          top: safeTooltipTop,
          left: safeTooltipLeft,
        }}
      >
        <div className="w-[min(90vw,420px)] rounded-2xl border border-white/10 bg-[#071A2F]/95 p-6 shadow-2xl backdrop-blur-xl">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5FA8FF]">
              {eyebrow}
            </p>
          )}

          <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
            {title}
          </h2>

          <p className="mt-3 text-sm leading-6 text-[#9FB0C4]">{description}</p>

          {actionLabel && onAction && (
            <motion.button
              type="button"
              onClick={onAction}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 rounded-lg bg-[#5FA8FF] px-4 py-2.5 text-sm font-semibold text-[#071A2F] shadow-[0_0_20px_rgba(95,168,255,0.18)] transition-colors hover:bg-white"
            >
              {actionLabel}
            </motion.button>
          )}
        </div>
      </motion.div>
    </>
  );
}
