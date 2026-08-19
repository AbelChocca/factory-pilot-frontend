"use client";

import { useEffect } from "react";
import { SkipForward } from "lucide-react";
import { motion } from "motion/react";

import { useCinematicStore } from "@/src/stores/cinematic-store";
import { CinematicOverlay } from "../components/cinematic/cinematic-overlay";
import { CinematicContent } from "../components/cinematic/cinematic-content";

export function CinematicProvider({ children }: { children: React.ReactNode }) {
  const status = useCinematicStore((state) => state.status);
  const hasHydrated = useCinematicStore((state) => state.hasHydrated);

  const start = useCinematicStore((state) => state.start);
  const skip = useCinematicStore((state) => state.skip);

  const stepIndex = useCinematicStore((state) => state.stepIndex);
  const analysisStatus = useCinematicStore((state) => state.analysisStatus);
  const next = useCinematicStore((state) => state.next);

  useEffect(() => {
    useCinematicStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;

    if (status === "idle") {
      start();
    }
  }, [hasHydrated, status, start]);

  useEffect(() => {
    if (stepIndex === 5 && analysisStatus === "completed") {
      const timeout = window.setTimeout(() => {
        next();
      }, 1200);

      return () => {
        window.clearTimeout(timeout);
      };
    }
  }, [stepIndex, analysisStatus, next]);

  if (!hasHydrated) {
    return <>{children}</>;
  }

  const isCinematicActive = status !== "completed";

  return (
    <>
      {children}

      {status === "running" && (
        <CinematicOverlay>
          <CinematicContent />
        </CinematicOverlay>
      )}

      {isCinematicActive && (
        <motion.button
          type="button"
          onClick={skip}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="
      fixed bottom-6 left-6 z-[10000]
      flex items-center gap-2
      rounded-lg
      border border-white/10
      bg-[#071A2F]/80
      px-4 py-2.5
      text-sm font-medium text-[#9FB0C4]
      shadow-xl
      backdrop-blur-md
      transition-colors
      hover:border-white/20
      hover:bg-[#071A2F]
      hover:text-white
      cursor-pointer
    "
        >
          <SkipForward className="h-4 w-4" />
          Skip tutorial
        </motion.button>
      )}
    </>
  );
}
