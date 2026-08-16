"use client";

import { motion } from "motion/react";
import { BrainCircuit, Check, Loader2 } from "lucide-react";
import { CinematicAnalysisStatus } from "@/src/lib/cinematic/cinematic-types";
import { useEffect, useState } from "react";

interface CinematicAnalysisStepProps {
  status: CinematicAnalysisStatus;
}

const analysisSteps = [
  "Analyzing NorthWood's production readiness",
  "Checking inventory and material availability",
  "Identifying production bottlenecks",
  "Evaluating operational risks",
];

const CARD_WIDTH = 380;
const GAP = 24;

function getActiveStep(status: CinematicAnalysisStatus) {
  switch (status) {
    case "analyzing":
      return 0;

    case "tool":
      return 1;

    case "event":
      return 2;

    case "completed":
      return 4;

    default:
      return 0;
  }
}

export function CinematicAnalysisStep({ status }: CinematicAnalysisStepProps) {
  const activeStep = getActiveStep(status);

  const [copilotRect, setCopilotRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const element = document.querySelector('[data-cinematic="copilot-panel"]');

    if (!element) {
      return;
    }

    const update = () => {
      setCopilotRect(element.getBoundingClientRect());
    };

    update();

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, []);

  if (!copilotRect) {
    return null;
  }

  const left = copilotRect.left - CARD_WIDTH - GAP;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]">
      {/* Cinematic overlay */}
      <motion.div
        initial={{
          opacity: 0,
          top: copilotRect.top,
          left: copilotRect.left,
          width: copilotRect.width,
          height: copilotRect.height,
        }}
        animate={{
          opacity: 1,
          top: copilotRect.top,
          left: copilotRect.left,
          width: copilotRect.width,
          height: copilotRect.height,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        className="pointer-events-none fixed rounded-xl border-2 border-[#5FA8FF]"
        style={{
          boxShadow: `
          0 0 0 4px rgba(95, 168, 255, 0.10),
          0 0 35px rgba(95, 168, 255, 0.45),
          0 0 0 9999px rgba(3, 12, 24, 0.72)
        `,
        }}
      />

      {/* Analysis card */}
      <motion.div
        initial={{
          opacity: 0,
          x: 20,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="
        pointer-events-auto
        fixed
        rounded-2xl
        border
        border-white/10
        bg-[#071A2F]/95
        p-6
        shadow-2xl
        backdrop-blur-xl
      "
        style={{
          top: copilotRect.top,
          left: Math.max(24, left),
          width: 380,
        }}
      >
        {/* Header */}

        <div className="flex items-start gap-4">
          <motion.div
            animate={{
              scale: status === "completed" ? 1 : [1, 1.05, 1],
            }}
            transition={{
              duration: 1.8,
              repeat: status === "completed" ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="
      flex size-11 shrink-0 items-center justify-center
      rounded-xl
      bg-[#5FA8FF]/10
      text-[#5FA8FF]
    "
          >
            <BrainCircuit className="size-5" />
          </motion.div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5FA8FF]">
              FactoryPilot AI
            </p>

            <h2 className="mt-3 text-xl font-semibold tracking-tight text-white">
              {status === "completed"
                ? "Analysis complete"
                : "Analyzing NorthWood's operations"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#9FB0C4]">
              {status === "completed"
                ? "FactoryPilot has identified the most important operational risks and production constraints."
                : "FactoryPilot is combining operational data with manufacturing knowledge to identify the most important production risks."}
            </p>
          </div>
        </div>

        {/* Analysis steps */}

        <div className="mt-7 space-y-3">
          {analysisSteps.map((step, index) => (
            <AnalysisStep
              key={step}
              label={step}
              index={index}
              activeStep={activeStep}
            />
          ))}
        </div>

        {/* Completion */}

        {status === "completed" && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              delay: 0.2,
            }}
            className="
  mt-6
  flex items-center gap-2
  rounded-lg
  border border-emerald-400/20
  bg-emerald-400/5
  px-3 py-2.5
"
          >
            <Check className="size-4 text-emerald-400" />

            <span className="text-sm text-emerald-200">
              Production analysis ready
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

interface AnalysisStepProps {
  label: string;
  index: number;
  activeStep: number;
}

function AnalysisStep({ label, index, activeStep }: AnalysisStepProps) {
  const completed = index < activeStep;
  const active = index === activeStep;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -8,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.06,
      }}
      className={`
        flex items-center gap-3
        rounded-lg
        border
        px-3 py-2.5
        transition-colors
        ${
          active
            ? "border-[#5FA8FF]/20 bg-[#5FA8FF]/5"
            : completed
              ? "border-white/10 bg-white/[0.04]"
              : "border-white/5 bg-white/[0.02]"
        }
      `}
    >
      <div className="flex size-6 shrink-0 items-center justify-center">
        {completed ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Check className="size-4 text-emerald-400" />
          </motion.div>
        ) : active ? (
          <Loader2 className="size-4 animate-spin text-[#5FA8FF]" />
        ) : (
          <div className="size-1.5 rounded-full bg-white/20" />
        )}
      </div>

      <span
        className={
          completed
            ? "text-sm text-[#C8D3E0]"
            : active
              ? "text-sm font-medium text-white"
              : "text-sm text-white/30"
        }
      >
        {label}
      </span>
    </motion.div>
  );
}
