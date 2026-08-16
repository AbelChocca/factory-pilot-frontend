import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  Clock3,
  Package,
  ShoppingCart,
  TrendingDown,
  Truck,
} from "lucide-react";

import type { MaterialImpactAnalysisEvent } from "@/src/types/ai";

interface MaterialImpactAnalysisEventProps {
  event: MaterialImpactAnalysisEvent;
}

const impactConfig = {
  LOW: {
    label: "Low impact",
    className: "bg-emerald-500/10 text-emerald-600",
    progressClassName: "bg-emerald-500",
  },
  MEDIUM: {
    label: "Medium impact",
    className: "bg-amber-500/10 text-amber-600",
    progressClassName: "bg-amber-500",
  },
  HIGH: {
    label: "High impact",
    className: "bg-red-500/10 text-red-600",
    progressClassName: "bg-red-500",
  },
};

export function MaterialImpactAnalysisEvent({
  event,
}: MaterialImpactAnalysisEventProps) {
  const [expanded, setExpanded] = useState(false);

  const {
    material_name,
    material_sku,
    impact_level,
    current_quantity,
    minimum_quantity,
    total_outbound,
    outbound_movements,
    stock_coverage_days,
    min_lead_time_days,
    affected_products_count,
    supplier_count,
  } = event;

  const impact = impactConfig[impact_level];

  const current = Number(current_quantity);
  const minimum = Number(minimum_quantity);

  const stockPercentage =
    minimum > 0 ? Math.min((current / minimum) * 100, 100) : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mt-3 overflow-hidden rounded-xl border bg-card"
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="w-full border-b px-4 py-3 text-left transition-colors hover:bg-muted/20"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10"
            >
              <Package className="size-4 text-primary" />
            </motion.div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Material impact analysis
              </p>

              <p className="truncate text-xs text-muted-foreground">
                {material_name}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${impact.className}`}
            >
              {impact.label}
            </span>

            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground"
            >
              <ChevronDown className="size-4" />
            </motion.div>
          </div>
        </div>
      </button>

      {/* Stock overview */}
      <div className="border-b px-4 py-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] text-muted-foreground">Current stock</p>

            <p className="mt-0.5 text-xl font-semibold">{current_quantity}</p>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">
              Minimum required
            </p>

            <p className="mt-0.5 text-sm font-semibold">{minimum_quantity}</p>
          </div>
        </div>

        {/* Stock progress */}
        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stockPercentage}%` }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className={`h-full rounded-full ${impact.progressClassName}`}
            />
          </div>

          <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
            <span>0</span>

            <span>{stockPercentage.toFixed(0)}% of minimum</span>
          </div>
        </div>
      </div>

      {/* Main metrics */}
      <div className="grid grid-cols-2 divide-x border-b">
        <Metric
          icon={TrendingDown}
          label="Total outbound"
          value={total_outbound}
          description={`${outbound_movements} movements`}
        />

        <Metric
          icon={Clock3}
          label="Stock coverage"
          value={
            stock_coverage_days
              ? `${Number(stock_coverage_days).toFixed(2)} days`
              : "—"
          }
          description="Estimated remaining coverage"
        />
      </div>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="overflow-hidden"
          >
            {/* Operational impact */}
            <div className="px-4 py-3">
              <p className="mb-2.5 text-xs font-semibold">Operational impact</p>

              <div className="grid grid-cols-2 gap-2">
                <ImpactMetric
                  icon={ShoppingCart}
                  label="Affected products"
                  value={affected_products_count}
                />

                <ImpactMetric
                  icon={Truck}
                  label="Suppliers"
                  value={supplier_count}
                />
              </div>
            </div>

            {/* Lead time */}
            <div className="flex items-center justify-between border-t bg-muted/20 px-4 py-3">
              <div className="flex items-center gap-2">
                <Truck className="size-3.5 text-muted-foreground" />

                <span className="text-xs text-muted-foreground">
                  Minimum supplier lead time
                </span>
              </div>

              <span className="text-xs font-semibold">
                {min_lead_time_days !== null
                  ? `${min_lead_time_days} days`
                  : "No supplier available"}
              </span>
            </div>

            {/* SKU */}
            <div className="flex items-center justify-between border-t px-4 py-2.5">
              <span className="text-[10px] text-muted-foreground">
                Material SKU
              </span>

              <span className="font-mono text-[10px] text-muted-foreground">
                {material_sku}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expand hint */}
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="flex w-full items-center justify-center gap-1.5 border-t px-4 py-2 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted/20 hover:text-foreground"
      >
        <span>{expanded ? "Show less" : "Show more details"}</span>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-3.5" />
        </motion.div>
      </button>
    </motion.div>
  );
}

interface MetricProps {
  icon: typeof TrendingDown;
  label: string;
  value: string;
  description: string;
}

function Metric({ icon: Icon, label, value, description }: MetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="px-4 py-3"
    >
      <div className="flex items-center gap-1.5">
        <Icon className="size-3.5 text-muted-foreground" />

        <p className="text-[11px] text-muted-foreground">{label}</p>
      </div>

      <p className="mt-1 text-sm font-semibold">{value}</p>

      <p className="mt-0.5 text-[10px] text-muted-foreground">{description}</p>
    </motion.div>
  );
}

interface ImpactMetricProps {
  icon: typeof ShoppingCart;
  label: string;
  value: number;
}

function ImpactMetric({ icon: Icon, label, value }: ImpactMetricProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2.5 rounded-lg border bg-muted/20 px-3 py-2.5"
    >
      <Icon className="size-3.5 shrink-0 text-muted-foreground" />

      <div>
        <p className="text-[10px] text-muted-foreground">{label}</p>

        <p className="text-sm font-semibold">{value}</p>
      </div>
    </motion.div>
  );
}
