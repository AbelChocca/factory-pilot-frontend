"use client";

import { useEffect } from "react";

import { useCinematicStore } from "@/src/stores/cinematic-store";
import { CinematicOverlay } from "../components/cinematic/cinematic-overlay";
import { CinematicContent } from "../components/cinematic/cinematic-content";

export function CinematicProvider({ children }: { children: React.ReactNode }) {
  const status = useCinematicStore((state) => state.status);
  const hasHydrated = useCinematicStore((state) => state.hasHydrated);

  const start = useCinematicStore((state) => state.start);

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

  return (
    <>
      {children}

      {status === "running" && (
        <CinematicOverlay>
          <CinematicContent />
        </CinematicOverlay>
      )}
    </>
  );
}
