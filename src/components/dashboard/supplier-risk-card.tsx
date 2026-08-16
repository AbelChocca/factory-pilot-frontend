import { AlertTriangle, Clock3, ShieldAlert, Truck } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";

import type {
  SupplierRiskOverviewItem,
  SupplierRiskSummary,
} from "@/src/types/aliases";
import { DashboardAIInsightButton } from "./dashboard-ai-insight-button";

interface SupplierRiskCardProps {
  data: SupplierRiskSummary;
}

export function SupplierRiskCard({ data }: SupplierRiskCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex gap-2">
            <Truck className="size-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">
              Supplier Risk
            </CardTitle>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Suppliers that may impact material availability.
          </p>
        </div>

        <DashboardAIInsightButton prompt="Analyze supplier risk at NorthWood Manufacturing. Identify the suppliers creating the highest operational risk, explain which materials are affected, consider their lead times, and recommend mitigation actions to reduce the risk of production disruption." />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Suppliers at Risk</p>

            <p className="mt-1 text-2xl font-bold tracking-tight">
              {data.suppliers_at_risk}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              of {data.total_suppliers} suppliers
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Critical Risks</p>

            <p className="mt-1 text-2xl font-bold tracking-tight">
              {data.critical_risks}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Suppliers requiring attention
            </p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <RiskSummary label="Low" value={data.low_risks} />

          <RiskSummary label="Medium" value={data.medium_risks} />

          <RiskSummary label="High" value={data.high_risks} />

          <RiskSummary label="Critical" value={data.critical_risks} />
        </div>

        {data.top_risks.length > 0 && (
          <>
            <Separator />

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">Top Supplier Risks</h3>

                <p className="text-xs text-muted-foreground">
                  Suppliers with the highest operational impact.
                </p>
              </div>

              <div className="space-y-2">
                {data.top_risks.map((supplier) => (
                  <SupplierRiskRow
                    key={supplier.supplier_id}
                    supplier={supplier}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

interface RiskSummaryProps {
  label: string;
  value: number;
}

function RiskSummary({ label, value }: RiskSummaryProps) {
  return (
    <div className="rounded-lg bg-muted/40 p-2.5 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

interface SupplierRiskRowProps {
  supplier: SupplierRiskOverviewItem;
}

function SupplierRiskRow({ supplier }: SupplierRiskRowProps) {
  return (
    <div className="space-y-3 rounded-lg border p-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium">
              {supplier.supplier_name}
            </p>

            <RiskBadge level={supplier.risk_level} />
          </div>

          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock3 className="size-3" />

            <span>{supplier.lead_time_days} days lead time</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <SupplierMetric label="Affected" value={supplier.affected_materials} />

        <SupplierMetric
          label="High Risk"
          value={supplier.high_risk_materials}
        />

        <SupplierMetric label="Critical" value={supplier.critical_materials} />
      </div>
    </div>
  );
}

interface SupplierMetricProps {
  label: string;
  value: number;
}

function SupplierMetric({ label, value }: SupplierMetricProps) {
  return (
    <div className="rounded-md bg-muted/40 px-2.5 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>

      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}

interface RiskBadgeProps {
  level: SupplierRiskOverviewItem["risk_level"];
}

function RiskBadge({ level }: RiskBadgeProps) {
  if (level === "critical") {
    return (
      <Badge variant="destructive" className="gap-1 text-[10px]">
        <ShieldAlert className="size-3" />
        Critical
      </Badge>
    );
  }

  if (level === "high") {
    return (
      <Badge variant="outline" className="gap-1 text-[10px] text-amber-600">
        <AlertTriangle className="size-3" />
        High
      </Badge>
    );
  }

  if (level === "medium") {
    return (
      <Badge variant="secondary" className="text-[10px]">
        Medium
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="text-[10px]">
      Low
    </Badge>
  );
}
