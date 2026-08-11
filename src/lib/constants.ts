import { AvailabilityStatus, UnitType } from "@/src/types/aliases";

export const unitTypes: UnitType[] = [
  "UNIT",
  "KG",
  "G",
  "M",
  "M2",
  "L",
  "BOX",
  "ROLL",
];

export const availabilityStatuses: AvailabilityStatus[] = [
  "AVAILABLE",
  "LOW_STOCK",
  "OUT_OF_STOCK",
];

export const unitLabels: Record<UnitType, string> = {
  UNIT: "Unit",
  KG: "Kilograms",
  G: "Grams",
  M: "Meters",
  M2: "Square meters",
  L: "Liters",
  BOX: "Boxes",
  ROLL: "Rolls",
};

export const availabilityLabels: Record<AvailabilityStatus, string> = {
  AVAILABLE: "Available",
  LOW_STOCK: "Low Stock",
  OUT_OF_STOCK: "Out of Stock",
};
