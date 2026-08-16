"use client";

import { useEffect, useState } from "react";

import { useAIConversationStore } from "@/src/stores/ai-conversation-store";
import { useCinematicStore } from "@/src/stores/cinematic-store";

import { CinematicTargetStep } from "./cinematic-target-step";

type CinematicPromptStepProps = {
  prompt: string;

  eyebrow: string;
  title: string;
  description: string;

  placement?: "top" | "bottom" | "left" | "right";
  actionLabel?: string;
  tooltipGap?: number;
};

const STREAM_INTERVAL = 28;

export function CinematicPromptStep({
  prompt,
  eyebrow,
  title,
  description,
  placement = "top",
  tooltipGap = 16,
  actionLabel = "Continue",
}: CinematicPromptStepProps) {
  const setInput = useAIConversationStore((state) => state.setInput);
  const next = useCinematicStore((state) => state.next);

  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;

      setInput(prompt.slice(0, index));

      if (index >= prompt.length) {
        window.clearInterval(interval);
        setIsStreaming(false);
      }
    }, STREAM_INTERVAL);

    return () => {
      window.clearInterval(interval);
    };
  }, [prompt, setInput]);

  return (
    <CinematicTargetStep
      targetSelector='[data-cinematic="copilot-input"]'
      placement={placement}
      eyebrow={eyebrow}
      tooltipGap={tooltipGap}
      title={title}
      description={description}
      actionLabel={isStreaming ? undefined : actionLabel}
      onAction={isStreaming ? undefined : next}
    />
  );
}
