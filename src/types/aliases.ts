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

export type SupplierRiskOverviewItem =
  components["schemas"]["SupplierRiskOverviewItem"];

export type SupplierRiskSummary = components["schemas"]["SupplierRiskSummary"];

export type RiskLevel = components["schemas"]["RiskLevel"];

export type ProductionRiskSummary =
  components["schemas"]["ProductionRiskSummary"];

export type ProductionRiskOverviewItem =
  components["schemas"]["ProductionRiskOverviewItem"];

export type ProductionReadiness = components["schemas"]["ProductionReadiness"];

export type ProcurementAction = components["schemas"]["ProcurementAction"];

export type ProcurementPriority = components["schemas"]["ProcurementPriority"];

export type ProcurementSummary = components["schemas"]["ProcurementSummary"];

export type OperationalHealth = components["schemas"]["OperationalHealth"];

export type OperationalStatus = components["schemas"]["OperationalStatus"];

export type MaterialCoverageRisk =
  components["schemas"]["MaterialCoverageRisk"];

export type MaterialCoverageStatus =
  components["schemas"]["MaterialCoverageStatus"];

export type MaterialCoverageSummary =
  components["schemas"]["MaterialCoverageSummary"];

export type InventoryHealth = components["schemas"]["InventoryHealth"];

export type InventoryHealthSection =
  components["schemas"]["InventoryHealthSection"];

export type InventoryHealthStatus =
  components["schemas"]["InventoryHealthStatus"];

export type DashboardOverviewResponse =
  components["schemas"]["DashboardOverviewResponse"];
