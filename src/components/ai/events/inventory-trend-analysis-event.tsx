import {
  Activity,
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Minus,
  Package,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import type {
  InventoryTrend,
  InventoryTrendAnalysisEvent,
  InventoryTrendItem,
} from "@/src/types/ai";

interface InventoryTrendAnalysisEventProps {
  event: InventoryTrendAnalysisEvent;
}

const trendConfig: Record<
  InventoryTrend,
  {
    label: string;
    icon: typeof TrendingUp;
    className: string;
  }
> = {
  increasing: {
    label: "Increasing",
    icon: TrendingUp,
    className: "bg-emerald-500/10 text-emerald-600",
  },
  decreasing: {
    label: "Decreasing",
    icon: TrendingDown,
    className: "bg-red-500/10 text-red-600",
  },
  stable: {
    label: "Stable",
    icon: Minus,
    className: "bg-muted text-muted-foreground",
  },
};

const INITIAL_VISIBLE_ITEMS = 3;

export function InventoryTrendAnalysisEvent({
  event,
}: InventoryTrendAnalysisEventProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll
    ? event.items
    : event.items.slice(0, INITIAL_VISIBLE_ITEMS);

  const hasMore = event.items.length > INITIAL_VISIBLE_ITEMS;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mt-3 overflow-hidden rounded-xl border bg-card"
    >
      {/* Header */}
      <div className="border-b px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10"
            >
              <Activity className="size-4 text-primary" />
            </motion.div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                Inventory trend analysis
              </p>

              <p className="text-xs text-muted-foreground">
                Last {event.period_days} days
              </p>
            </div>
          </div>

          <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
            {event.total_items} {event.total_items === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="mt-2 text-[10px] text-muted-foreground">
          {formatDate(event.analyzed_from)} — {formatDate(event.analyzed_to)}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 divide-x border-b">
        <SummaryMetric
          icon={TrendingDown}
          label="Decreasing"
          value={event.decreasing_items}
          className="text-red-500"
        />

        <SummaryMetric
          icon={TrendingUp}
          label="Increasing"
          value={event.increasing_items}
          className="text-emerald-500"
        />

        <SummaryMetric
          icon={Minus}
          label="Stable"
          value={event.stable_items}
          className="text-muted-foreground"
        />
      </div>

      {/* Items */}
      <motion.div layout className="divide-y">
        <AnimatePresence initial={false}>
          {visibleItems.map((item) => (
            <motion.div
              key={`${item.owner_type}-${item.owner_id}`}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
            >
              <InventoryTrendItemCard item={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show more */}
      {hasMore && (
        <div className="border-t">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
          >
            <span>
              {showAll
                ? "Show less"
                : `Show ${event.items.length - INITIAL_VISIBLE_ITEMS} more`}
            </span>

            <motion.div
              animate={{ rotate: showAll ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="size-4" />
            </motion.div>
          </button>
        </div>
      )}
    </motion.div>
  );
}

interface InventoryTrendItemCardProps {
  item: InventoryTrendItem;
}

function InventoryTrendItemCard({ item }: InventoryTrendItemCardProps) {
  const [expanded, setExpanded] = useState(false);

  const trend = trendConfig[item.trend];
  const TrendIcon = trend.icon;

  const current = Number(item.current_quantity);
  const minimum = Number(item.minimum_quantity);

  const minimumPercentage =
    minimum > 0 ? Math.min((current / minimum) * 100, 100) : 100;

  const coverageDays =
    item.coverage_days !== null ? Number(item.coverage_days) : null;

  return (
    <motion.div layout className="px-4 py-4">
      {/* Item header */}
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        className="w-full text-left"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
              <Package className="size-3.5 text-muted-foreground" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {item.owner_name}
              </p>

              <p className="truncate font-mono text-[10px] text-muted-foreground">
                {item.owner_code}
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${trend.className}`}
            >
              <TrendIcon className="size-3.5" />
              {trend.label}
            </div>

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
      <div className="mt-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] text-muted-foreground">Current stock</p>

            <p className="mt-0.5 text-xl font-semibold">
              {item.current_quantity}

              <span className="ml-1 text-xs font-normal text-muted-foreground">
                {item.unit_type}
              </span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">
              Minimum required
            </p>

            <p className="mt-0.5 text-sm font-semibold">
              {item.minimum_quantity}

              <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                {item.unit_type}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${minimumPercentage}%` }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="h-full rounded-full bg-primary"
            />
          </div>

          <div className="mt-1.5 flex justify-between text-[10px] text-muted-foreground">
            <span>0</span>

            <span>{minimumPercentage.toFixed(0)}% of minimum</span>
          </div>
        </div>
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
            {/* Metrics */}
            <div className="mt-4 grid grid-cols-2 divide-x rounded-lg border bg-muted/10">
              <div className="px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <ArrowDown className="size-3.5 text-muted-foreground" />

                  <p className="text-[10px] text-muted-foreground">
                    Daily outflow
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold">
                  {formatNumber(item.average_daily_outflow)}
                </p>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  per day
                </p>
              </div>

              <div className="px-3 py-2.5">
                <div className="flex items-center gap-1.5">
                  <ArrowUp className="size-3.5 text-muted-foreground" />

                  <p className="text-[10px] text-muted-foreground">
                    Daily inflow
                  </p>
                </div>

                <p className="mt-1 text-sm font-semibold">
                  {formatNumber(item.average_daily_inflow)}
                </p>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  per day
                </p>
              </div>
            </div>

            {/* Coverage + totals */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <SmallMetric
                label="Coverage"
                value={
                  coverageDays !== null ? `${coverageDays.toFixed(1)}d` : "—"
                }
              />

              <SmallMetric
                label="Inflow"
                value={formatNumber(item.total_inflow)}
              />

              <SmallMetric
                label="Outflow"
                value={formatNumber(item.total_outflow)}
              />
            </div>

            {/* History */}
            {item.history.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.2 }}
                className="mt-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-semibold">Stock evolution</p>

                  <p className="text-[10px] text-muted-foreground">
                    {item.history.length} points
                  </p>
                </div>

                <InventorySparkline history={item.history} trend={item.trend} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface InventorySparklineProps {
  history: InventoryTrendItem["history"];
  trend: InventoryTrend;
}

function InventorySparkline({ history, trend }: InventorySparklineProps) {
  const values = history.map((point) => Number(point.quantity));

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const points = values
    .map((value, index) => {
      const x = history.length === 1 ? 0 : (index / (history.length - 1)) * 100;

      const y = 100 - ((value - min) / range) * 100;

      return `${x},${y}`;
    })
    .join(" ");

  const stroke =
    trend === "increasing"
      ? "rgb(16 185 129)"
      : trend === "decreasing"
        ? "rgb(239 68 68)"
        : "rgb(107 114 128)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden rounded-lg border bg-muted/10 px-2 py-2"
    >
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="h-20 w-full"
      >
        <motion.polyline
          points={points}
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: 1,
            opacity: 1,
          }}
          transition={{
            pathLength: {
              duration: 0.8,
              ease: "easeOut",
            },
            opacity: {
              duration: 0.15,
            },
          }}
        />
      </svg>

      <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
        <span>{formatDate(history[0].date)}</span>

        <span>{formatDate(history[history.length - 1].date)}</span>
      </div>
    </motion.div>
  );
}

interface SummaryMetricProps {
  icon: typeof TrendingUp;
  label: string;
  value: number;
  className?: string;
}

function SummaryMetric({
  icon: Icon,
  label,
  value,
  className,
}: SummaryMetricProps) {
  return (
    <div className="px-3 py-3">
      <div className="flex items-center gap-1.5">
        <Icon className={`size-3.5 ${className ?? "text-muted-foreground"}`} />

        <p className="text-[10px] text-muted-foreground">{label}</p>
      </div>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

interface SmallMetricProps {
  label: string;
  value: string;
}

function SmallMetric({ label, value }: SmallMetricProps) {
  return (
    <div className="rounded-lg border bg-muted/10 px-3 py-2.5">
      <p className="text-[10px] text-muted-foreground">{label}</p>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}
