import { components } from "./api";

export type Material = components["schemas"]["MaterialResponseSchema"];

export type Product = components["schemas"]["ProductResponseSchema"];

export type Supplier = components["schemas"]["SupplierResponseSchema"];

export type InventoryMovement =
  components["schemas"]["InventoryMovementResponseSchema"];

export type MaterialSupplier =
  components["schemas"]["MaterialSupplierResponse"];

export type SupplierMaterial =
  components["schemas"]["SupplierMaterialResponse"];

export type PurchasePlan = components["schemas"]["PurchasePlanResponseSchema"];

export type PurchasePlanItem = components["schemas"]["PurchasePlanItem"];

export type PaginatedPurchasePlans =
  components["schemas"]["PaginatedResponseSchema_PurchasePlanResponseSchema_"];

export type MaterialProduct = components["schemas"]["MaterialProductResponse"];

export type ProductMaterial = components["schemas"]["ProductMaterialResponse"];

export type AvailabilityStatus = components["schemas"]["AvailabilityStatus"];

export type MaterialType = components["schemas"]["MaterialType"];

export type UnitType = components["schemas"]["UnitType"];

export type Status = components["schemas"]["Status"];

export type PaginatedMaterials =
  components["schemas"]["PaginatedResponseSchema_MaterialResponseSchema_"];

export type PaginatedProducts =
  components["schemas"]["PaginatedResponseSchema_ProductResponseSchema_"];

export type PaginatedSuppliers =
  components["schemas"]["PaginatedResponseSchema_SupplierResponseSchema_"];

export type PaginatedInventoryMovements =
  components["schemas"]["PaginatedResponseSchema_InventoryMovementResponseSchema_"];
