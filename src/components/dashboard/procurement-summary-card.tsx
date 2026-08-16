import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileEdit,
  ShoppingCart,
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
  ProcurementAction,
  ProcurementPriority,
  ProcurementSummary,
} from "@/src/types/aliases";
import { DashboardAIInsightButton } from "./dashboard-ai-insight-button";

interface ProcurementSummaryCardProps {
  data: ProcurementSummary;
}

export function ProcurementSummaryCard({ data }: ProcurementSummaryCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex gap-2">
            <ShoppingCart className="size-5 text-muted-foreground" />
            <CardTitle className="text-base font-semibold">
              Procurement
            </CardTitle>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Purchase plans and replenishment actions.
          </p>
        </div>

        <DashboardAIInsightButton prompt="Analyze the current procurement situation at NorthWood Manufacturing. Identify the most urgent materials that need replenishment, explain their operational impact, consider supplier lead times, and recommend which procurement actions should be prioritized." />
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">Pending Cost</p>

            <p className="mt-1 text-2xl font-bold tracking-tight">
              ${data.estimated_pending_cost}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Estimated pending procurement
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-xs text-muted-foreground">
              Materials to Replenish
            </p>

            <p className="mt-1 text-2xl font-bold tracking-tight">
              {data.materials_to_replenish}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Materials requiring action
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <PlanStatus
            icon={FileEdit}
            label="Draft"
            value={data.draft_purchase_plans}
          />

          <PlanStatus
            icon={Clock3}
            label="Pending"
            value={data.pending_purchase_plans}
          />

          <PlanStatus
            icon={CheckCircle2}
            label="Approved"
            value={data.approved_purchase_plans}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-600" />

            <span className="text-sm font-medium">Critical Materials</span>
          </div>

          <span className="font-semibold">{data.critical_materials}</span>
        </div>

        {data.top_actions.length > 0 && (
          <>
            <Separator />

            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-semibold">Top Actions</h3>

                <p className="text-xs text-muted-foreground">
                  Procurement actions requiring attention.
                </p>
              </div>

              <div className="space-y-2">
                {data.top_actions.map((action) => (
                  <ProcurementActionRow
                    key={`${action.purchase_plan_id}-${action.material_id}`}
                    action={action}
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

interface PlanStatusProps {
  icon: typeof FileEdit;
  label: string;
  value: number;
}

function PlanStatus({ icon: Icon, label, value }: PlanStatusProps) {
  return (
    <div className="rounded-lg bg-muted/40 p-3">
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 text-muted-foreground" />

        <span className="text-xs text-muted-foreground">{label}</span>
      </div>

      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}

interface ProcurementActionRowProps {
  action: ProcurementAction;
}

function ProcurementActionRow({ action }: ProcurementActionRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-3">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-medium">{action.material_name}</p>

          <PriorityBadge priority={action.priority} />
        </div>

        <p className="mt-1 truncate text-xs text-muted-foreground">
          {action.supplier_name} · {action.quantity} units
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold">${action.estimated_cost}</p>

        <p className="text-xs text-muted-foreground">
          {action.lead_time_days}d lead time
        </p>
      </div>
    </div>
  );
}

interface PriorityBadgeProps {
  priority: ProcurementPriority;
}

function PriorityBadge({ priority }: PriorityBadgeProps) {
  if (priority === "critical") {
    return (
      <Badge variant="destructive" className="text-[10px]">
        Critical
      </Badge>
    );
  }

  if (priority === "high") {
    return (
      <Badge variant="outline" className="text-[10px] text-amber-600">
        High
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="text-[10px]">
      Normal
    </Badge>
  );
}
