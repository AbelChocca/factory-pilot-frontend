import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

import { Progress } from "@/src/components/ui/progress";

import type { OperationalHealth } from "@/src/types/aliases";
import { Badge } from "../ui/badge";
import { DashboardAIInsightButton } from "./dashboard-ai-insight-button";

interface OperationalHealthCardProps {
  data: OperationalHealth;
}

const statusConfig = {
  healthy: {
    label: "Healthy",
    icon: CheckCircle2,
    className: "text-emerald-600",
  },
  attention: {
    label: "Needs Attention",
    icon: CircleAlert,
    className: "text-amber-600",
  },
  critical: {
    label: "Critical",
    icon: AlertTriangle,
    className: "text-red-600",
  },
} as const;

export function OperationalHealthCard({ data }: OperationalHealthCardProps) {
  const status = statusConfig[data.status];
  const StatusIcon = status.icon;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex gap-2">
            <Activity className="size-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">
              Operational Health
            </CardTitle>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Overall health of your manufacturing operation.
          </p>
        </div>

        <DashboardAIInsightButton prompt="Analyze the current operational health of NorthWood Manufacturing. Identify the main issues affecting the operational health score and explain which issues should be addressed first." />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl font-bold tracking-tight">
              {data.score}
            </span>

            <span className="mb-1 text-sm text-muted-foreground">/ 100</span>
          </div>

          <Badge variant="outline" className="gap-1.5">
            <StatusIcon className={`size-3.5 ${status.className}`} />
            {status.label}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Operational score</span>

            <span className="font-medium">{data.score}%</span>
          </div>

          <Progress value={data.score} />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Metric label="Issues" value={data.issues_requiring_attention} />

          <Metric label="Low Stock" value={data.low_stock_materials} />

          <Metric label="Out of Stock" value={data.out_of_stock_materials} />

          <Metric label="High Risk Products" value={data.high_risk_products} />

          <Metric
            label="Medium Risk Products"
            value={data.medium_risk_products}
          />

          <Metric
            label="Pending Purchases"
            value={data.pending_purchase_plans}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricProps {
  label: string;
  value: number;
}

function Metric({ label, value }: MetricProps) {
  return (
    <div className="rounded-lg border bg-muted/30 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
