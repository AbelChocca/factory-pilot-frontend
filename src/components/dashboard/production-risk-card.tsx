import {
  AlertTriangle,
  Factory,
  ShieldAlert,
  TriangleAlert,
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
  ProductionRiskOverviewItem,
  ProductionRiskSummary,
} from "@/src/types/aliases";
import { DashboardAIInsightButton } from "./dashboard-ai-insight-button";

interface ProductionRiskCardProps {
  data: ProductionRiskSummary;
}

export function ProductionRiskCard({ data }: ProductionRiskCardProps) {
  const productsAtRisk =
    data.medium_risk_products +
    data.high_risk_products +
    data.critical_risk_products;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex gap-2">
            <Factory className="size-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">
              Production Risk
            </CardTitle>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Products currently at risk of production disruption.
          </p>
        </div>

        <DashboardAIInsightButton prompt="Analyze the current production risks at NorthWood Manufacturing. Identify the highest-risk products, explain their bottleneck materials and production impact, and recommend concrete actions to reduce the risk of production disruption." />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-4xl font-bold tracking-tight">
              {productsAtRisk}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              products at risk of {data.products_analyzed} analyzed
            </p>
          </div>

          {data.critical_risk_products > 0 && (
            <Badge variant="destructive" className="gap-1.5">
              <ShieldAlert className="size-3.5" />
              {data.critical_risk_products} critical
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <RiskSummary label="Low" value={data.low_risk_products} />

          <RiskSummary label="Medium" value={data.medium_risk_products} />

          <RiskSummary label="High" value={data.high_risk_products} />

          <RiskSummary label="Critical" value={data.critical_risk_products} />
        </div>

        {data.top_risks.length > 0 && (
          <>
            <Separator />

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">Top Production Risks</h3>

                <p className="text-xs text-muted-foreground">
                  Products that require the most attention.
                </p>
              </div>

              <div className="space-y-2">
                {data.top_risks.map((risk) => (
                  <ProductionRiskRow key={risk.product_id} risk={risk} />
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

interface ProductionRiskRowProps {
  risk: ProductionRiskOverviewItem;
}

function ProductionRiskRow({ risk }: ProductionRiskRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{risk.product_name}</p>

          <RiskBadge level={risk.risk_level} />
        </div>

        <p className="mt-1 truncate text-xs text-muted-foreground">
          SKU: {risk.product_sku}
        </p>

        {risk.bottleneck_material_name && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
            <TriangleAlert className="size-3" />

            <span className="truncate">
              Bottleneck: {risk.bottleneck_material_name}
            </span>
          </div>
        )}
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold">{risk.current_producible_units}</p>

        <p className="text-xs text-muted-foreground">producible units</p>
      </div>
    </div>
  );
}

interface RiskBadgeProps {
  level: ProductionRiskOverviewItem["risk_level"];
}

function RiskBadge({ level }: RiskBadgeProps) {
  if (level === "CRITICAL") {
    return (
      <Badge variant="destructive" className="text-[10px]">
        Critical
      </Badge>
    );
  }

  if (level === "HIGH") {
    return (
      <Badge variant="outline" className="gap-1 text-[10px] text-amber-600">
        <AlertTriangle className="size-3" />
        High
      </Badge>
    );
  }

  if (level === "MEDIUM") {
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
