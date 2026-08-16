import { AlertTriangle, CheckCircle2, Package, XCircle } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";

import type {
  InventoryHealth,
  InventoryHealthSection,
} from "@/src/types/aliases";
import { DashboardAIInsightButton } from "./dashboard-ai-insight-button";

interface InventoryHealthCardProps {
  data: InventoryHealth;
}

export function InventoryHealthCard({ data }: InventoryHealthCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex gap-2">
            <Package className="size-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">
              Inventory Health
            </CardTitle>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Availability and stock health across materials and products.
          </p>
        </div>

        <DashboardAIInsightButton prompt="Analyze the current inventory health of NorthWood Manufacturing. Identify the most important material and product inventory issues, explain their operational impact, and recommend which issues should be addressed first." />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight">
                {data.overall_percentage}%
              </span>

              <span className="text-sm text-muted-foreground">healthy</span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Overall inventory health
            </p>
          </div>

          <InventoryStatus status={data.overall_status} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Overall health</span>

            <span className="font-medium">{data.overall_percentage}%</span>
          </div>

          <Progress value={data.overall_percentage} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <InventorySection title="Materials" data={data.materials} />

          <InventorySection title="Products" data={data.products} />
        </div>
      </CardContent>
    </Card>
  );
}

interface InventorySectionProps {
  title: string;
  data: InventoryHealthSection;
}

function InventorySection({ title, data }: InventorySectionProps) {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>

        <span className="text-sm font-medium">{data.health_percentage}%</span>
      </div>

      <Progress value={data.health_percentage} />

      <div className="grid grid-cols-2 gap-3">
        <InventoryMetric
          icon={Package}
          label="Total"
          value={data.total_items}
        />

        <InventoryMetric
          icon={CheckCircle2}
          label="Available"
          value={data.available_items}
        />

        <InventoryMetric
          icon={AlertTriangle}
          label="Low Stock"
          value={data.low_stock_items}
        />

        <InventoryMetric
          icon={XCircle}
          label="Out of Stock"
          value={data.out_of_stock_items}
        />
      </div>
    </div>
  );
}

interface InventoryMetricProps {
  icon: typeof Package;
  label: string;
  value: number;
}

function InventoryMetric({ icon: Icon, label, value }: InventoryMetricProps) {
  return (
    <div className="flex items-center justify-between rounded-md bg-muted/40 p-2.5">
      <div className="flex items-center gap-2">
        <Icon className="size-3.5 text-muted-foreground" />

        <span className="text-xs text-muted-foreground">{label}</span>
      </div>

      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

interface InventoryStatusProps {
  status: InventoryHealth["overall_status"];
}

function InventoryStatus({ status }: InventoryStatusProps) {
  if (status === "healthy") {
    return (
      <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
        <CheckCircle2 className="size-4" />
        Healthy
      </span>
    );
  }

  if (status === "attention") {
    return (
      <span className="flex items-center gap-1.5 text-sm font-medium text-amber-600">
        <AlertTriangle className="size-4" />
        Attention
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-sm font-medium text-red-600">
      <XCircle className="size-4" />
      Critical
    </span>
  );
}
