import {
  AlertTriangle,
  CheckCircle2,
  Package,
  ShieldAlert,
  TrendingDown,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Badge } from "@/src/components/ui/badge";
import { Separator } from "@/src/components/ui/separator";

import type {
  MaterialCoverageRisk,
  MaterialCoverageSummary,
} from "@/src/types/aliases";
import { formatDecimal } from "@/src/lib/formatters";
import { DashboardAIInsightButton } from "./dashboard-ai-insight-button";

interface MaterialCoverageCardProps {
  data: MaterialCoverageSummary;
}

export function MaterialCoverageCard({ data }: MaterialCoverageCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex gap-2">
            <Package className="size-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">
              Material Coverage
            </CardTitle>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            How long current material inventory can support production.
          </p>
        </div>

        <DashboardAIInsightButton prompt="Analyze material coverage at NorthWood Manufacturing. Identify the materials with the lowest days of stock, explain which production activities could be affected, and recommend which materials should be replenished first." />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <CoverageMetric
            label="Average Coverage"
            value={formatDecimal(data.average_days_of_stock)}
            description="Average days of stock"
            icon={TrendingDown}
          />

          <CoverageMetric
            label="Minimum Coverage"
            value={formatDecimal(data.minimum_days_of_stock)}
            description="Lowest days of stock"
            icon={ShieldAlert}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <SummaryMetric label="Tracked" value={data.materials_tracked} />

          <SummaryMetric label="Critical" value={data.critical_materials} />

          <SummaryMetric
            label="Low Coverage"
            value={data.low_coverage_materials}
          />
        </div>

        {data.top_risks.length > 0 && (
          <>
            <Separator />

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">Coverage Risks</h3>

                <p className="text-xs text-muted-foreground">
                  Materials with the lowest production coverage.
                </p>
              </div>

              <div className="space-y-2">
                {data.top_risks.map((material) => (
                  <MaterialCoverageRow
                    key={material.material_id}
                    material={material}
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

interface CoverageMetricProps {
  label: string;
  value: string | null;
  description: string;
  icon: typeof TrendingDown;
}

function CoverageMetric({
  label,
  value,
  description,
  icon: Icon,
}: CoverageMetricProps) {
  const displayValue = value !== null ? `${value} days` : "N/A";

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />

        <p className="text-xs text-muted-foreground">{label}</p>
      </div>

      <p className="mt-1 text-2xl font-bold tracking-tight">{displayValue}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

interface SummaryMetricProps {
  label: string;
  value: number;
}

function SummaryMetric({ label, value }: SummaryMetricProps) {
  return (
    <div className="rounded-lg bg-muted/40 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

interface MaterialCoverageRowProps {
  material: MaterialCoverageRisk;
}

function MaterialCoverageRow({ material }: MaterialCoverageRowProps) {
  return (
    <div className="space-y-3 rounded-lg border p-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-medium">
              {material.material_name}
            </p>

            <CoverageStatusBadge status={material.status} />
          </div>

          <p className="mt-1 text-xs text-muted-foreground">
            SKU: {material.material_sku}
          </p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold">
            {material.days_of_stock !== null
              ? `${formatDecimal(material.days_of_stock)} days`
              : "N/A"}
          </p>

          <p className="text-xs text-muted-foreground">coverage</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <MaterialMetric label="Current Stock" value={material.current_stock} />

        <MaterialMetric
          label="Daily Consumption"
          value={formatDecimal(material.average_daily_consumption)}
        />
      </div>
    </div>
  );
}

interface MaterialMetricProps {
  label: string;
  value: string;
}

function MaterialMetric({ label, value }: MaterialMetricProps) {
  return (
    <div className="rounded-md bg-muted/40 px-2.5 py-2">
      <p className="text-[11px] text-muted-foreground">{label}</p>

      <p className="mt-0.5 text-sm font-semibold">{value}</p>
    </div>
  );
}

interface CoverageStatusBadgeProps {
  status: MaterialCoverageRisk["status"];
}

function CoverageStatusBadge({ status }: CoverageStatusBadgeProps) {
  if (status === "critical") {
    return (
      <Badge variant="destructive" className="gap-1 text-[10px]">
        <ShieldAlert className="size-3" />
        Critical
      </Badge>
    );
  }

  if (status === "low") {
    return (
      <Badge variant="outline" className="gap-1 text-[10px] text-amber-600">
        <AlertTriangle className="size-3" />
        Low
      </Badge>
    );
  }

  if (status === "healthy") {
    return (
      <Badge variant="secondary" className="gap-1 text-[10px]">
        <CheckCircle2 className="size-3" />
        Healthy
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="text-[10px]">
      No Consumption
    </Badge>
  );
}
