import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CinematicAnalysisStatus,
  CinematicStatus,
} from "../lib/cinematic/cinematic-types";

type CinematicState = {
  status: CinematicStatus;
  stepIndex: number;
  hasHydrated: boolean;

  analysisStatus: CinematicAnalysisStatus;

  purchasePlanId: string | null;

  cinematicInputValue: string | null;

  start: () => void;
  next: () => void;
  setHydrated: () => void;
  previous: () => void;
  complete: () => void;
  reset: () => void;

  setAnalysisStatus: (status: CinematicAnalysisStatus) => void;

  setPurchasePlanId: (id: string) => void;
  setCinematicInputValue: (value: string | null) => void;
};
export const useCinematicStore = create<CinematicState>()(
  persist(
    (set) => ({
      status: "idle",
      stepIndex: 0,
      hasHydrated: false,
      analysisStatus: "idle",
      purchasePlanId: null,
      cinematicInputValue: null,
      setHydrated: () =>
        set({
          hasHydrated: true,
        }),

      start: () =>
        set({
          status: "running",
          stepIndex: 0,
        }),

      setCinematicInputValue: (value) =>
        set({
          cinematicInputValue: value,
        }),

      next: () =>
        set((state) => ({
          stepIndex: state.stepIndex + 1,
          status: "running",
        })),

      setAnalysisStatus: (analysisStatus) =>
        set({
          analysisStatus,
        }),

      setPurchasePlanId: (purchasePlanId) =>
        set({
          purchasePlanId,
        }),

      previous: () =>
        set((state) => ({
          stepIndex: Math.max(0, state.stepIndex - 1),
        })),

      complete: () =>
        set({
          status: "completed",
        }),

      reset: () =>
        set({
          status: "idle",
          stepIndex: 0,
          cinematicInputValue: null,
          purchasePlanId: null,
        }),
    }),
    {
      name: "factorypilot-cinematic",
      skipHydration: true,

      partialize: (state) => ({
        status: state.status,
      }),

      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated();
        };
      },
    },
  ),
);
