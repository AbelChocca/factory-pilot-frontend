"use client";

import { useEffect, useRef } from "react";
import { CinematicTargetStep } from "./cinematic-target-step";

interface CinematicInputStepProps {
  targetSelector: string;
  targetValue: string;

  onValueChange: (value: string) => void;
  onComplete: () => void;

  eyebrow?: string;
  title: string;
  description: string;

  placement?: "top" | "bottom" | "left" | "right";
}

const STREAM_INTERVAL = 35;

export function CinematicInputStep({
  targetSelector,
  targetValue,
  onValueChange,
  onComplete,
  eyebrow,
  title,
  description,
  placement = "bottom",
}: CinematicInputStepProps) {
  const completedRef = useRef(false);

  useEffect(() => {
    let index = 0;

    completedRef.current = false;
    onValueChange("");

    const interval = window.setInterval(() => {
      index += 1;

      onValueChange(targetValue.slice(0, index));

      if (index >= targetValue.length) {
        window.clearInterval(interval);

        if (!completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
      }
    }, STREAM_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [targetValue, onValueChange, onComplete]);

  return (
    <CinematicTargetStep
      targetSelector={targetSelector}
      placement={placement}
      eyebrow={eyebrow}
      title={title}
      description={description}
    />
  );
}
