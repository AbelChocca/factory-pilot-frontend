import {
  AlertTriangle,
  CheckCircle2,
  Factory,
  ShieldAlert,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Progress } from "@/src/components/ui/progress";

import type { ProductionReadiness } from "@/src/types/aliases";
import { DashboardAIInsightButton } from "./dashboard-ai-insight-button";

interface ProductionReadinessCardProps {
  data: ProductionReadiness;
}

export function ProductionReadinessCard({
  data,
}: ProductionReadinessCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex gap-2">
            <Factory className="size-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">
              Production Readiness
            </CardTitle>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Production capability across your product catalog.
          </p>
        </div>

        <DashboardAIInsightButton
          data-cinematic="ask-copilot-production-readiness"
          prompt="Analyze production readiness. Identify the highest-risk products, their bottleneck materials, and the most important actions to improve readiness."
        />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold tracking-tight">
                {data.readiness_percentage}%
              </span>

              <span className="text-sm text-muted-foreground">ready</span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              {data.total_products} products analyzed
            </p>
          </div>

          <ReadinessStatus percentage={data.readiness_percentage} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Production readiness</span>

            <span className="font-medium">{data.readiness_percentage}%</span>
          </div>

          <Progress value={data.readiness_percentage} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <RiskMetric
            icon={CheckCircle2}
            label="Low Risk"
            value={data.low_risk_products}
          />

          <RiskMetric
            icon={AlertTriangle}
            label="Medium Risk"
            value={data.medium_risk_products}
          />

          <RiskMetric
            icon={ShieldAlert}
            label="High Risk"
            value={data.high_risk_products}
          />

          <RiskMetric
            icon={ShieldAlert}
            label="Critical Risk"
            value={data.critical_risk_products}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface RiskMetricProps {
  icon: typeof CheckCircle2;
  label: string;
  value: number;
}

function RiskMetric({ icon: Icon, label, value }: RiskMetricProps) {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" />

        <span className="text-sm text-muted-foreground">{label}</span>
      </div>

      <span className="font-semibold">{value}</span>
    </div>
  );
}

interface ReadinessStatusProps {
  percentage: number;
}

function ReadinessStatus({ percentage }: ReadinessStatusProps) {
  if (percentage >= 80) {
    return (
      <span className="flex items-center gap-1.5 text-sm font-medium text-emerald-600">
        <CheckCircle2 className="size-4" />
        Ready
      </span>
    );
  }

  if (percentage >= 50) {
    return (
      <span className="flex items-center gap-1.5 text-sm font-medium text-amber-600">
        <AlertTriangle className="size-4" />
        Attention
      </span>
    );
  }

  return (
    <span className="flex items-center gap-1.5 text-sm font-medium text-red-600">
      <ShieldAlert className="size-4" />
      Critical
    </span>
  );
}
