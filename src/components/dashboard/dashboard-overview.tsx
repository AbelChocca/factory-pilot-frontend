"use client";

import { useDashboardOverview } from "@/src/hooks/use-dashboard";

import { OperationalHealthCard } from "./operational-health-card";
import { ProductionReadinessCard } from "./production-readiness-card";
import { InventoryHealthCard } from "./inventory-health-card";
import { ProcurementSummaryCard } from "./procurement-summary-card";
import { ProductionRiskCard } from "./production-risk-card";
import { MaterialCoverageCard } from "./material-coverage-card";
import { SupplierRiskCard } from "./supplier-risk-card";
import { DashboardOverviewSkeleton } from "./dashboard-overview-skeleton";
import { DashboardOverviewError } from "./dashboard-overview-error";

export function DashboardOverview() {
  const { data, isLoading, isError, refetch } = useDashboardOverview();
  if (isLoading) {
    return <DashboardOverviewSkeleton />;
  }

  if (isError || !data) {
    return <DashboardOverviewError onRetry={() => refetch()} />;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back to NorthWood Manufacturing.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <OperationalHealthCard data={data.operational_health} />
        <div data-cinematic="production-readiness">
          <ProductionReadinessCard data={data.production_readiness} />
        </div>
      </div>

      <InventoryHealthCard data={data.inventory_health} />

      <div className="grid gap-4 lg:grid-cols-2">
        <ProcurementSummaryCard data={data.procurement} />
        <MaterialCoverageCard data={data.material_coverage} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ProductionRiskCard data={data.production_risks} />
        <SupplierRiskCard data={data.supplier_risk} />
      </div>
    </div>
  );
}
