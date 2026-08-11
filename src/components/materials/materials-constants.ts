import { MaterialType } from "@/src/types/aliases";

export const materialTypes: MaterialType[] = [
  "RAW_MATERIAL",
  "ACCESSORY",
  "PACKAGING",
  "CONSUMABLE",
];

export const materialTypeLabels: Record<MaterialType, string> = {
  RAW_MATERIAL: "Raw Material",
  ACCESSORY: "Accessory",
  PACKAGING: "Packaging",
  CONSUMABLE: "Consumable",
};
