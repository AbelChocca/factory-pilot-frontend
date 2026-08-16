import {
  AlertTriangle,
  Clock3,
  Factory,
  Package,
  TrendingUp,
  Truck,
} from "lucide-react";

import type {
  ProductionRiskAnalysisEvent,
  ProductionRiskFactorType,
  ProductionRiskLevel,
} from "@/src/types/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

const INITIAL_VISIBLE_PRODUCTS = 3;

interface ProductionRiskAnalysisEventProps {
  event: ProductionRiskAnalysisEvent;
}

const riskConfig: Record<
  ProductionRiskLevel,
  {
    label: string;
    className: string;
  }
> = {
  LOW: {
    label: "Low",
    className: "bg-emerald-500/10 text-emerald-600",
  },

  MEDIUM: {
    label: "Medium",
    className: "bg-amber-500/10 text-amber-600",
  },

  HIGH: {
    label: "High",
    className: "bg-orange-500/10 text-orange-600",
  },

  CRITICAL: {
    label: "Critical",
    className: "bg-red-500/10 text-red-600",
  },
};

const factorConfig: Record<
  ProductionRiskFactorType,
  {
    label: string;
    icon: typeof AlertTriangle;
  }
> = {
  LOW_STOCK: {
    label: "Low stock",
    icon: Package,
  },

  LOW_STOCK_COVERAGE: {
    label: "Low stock coverage",
    icon: Clock3,
  },

  PRODUCTION_BOTTLENECK: {
    label: "Production bottleneck",
    icon: Factory,
  },

  SUPPLIER_LEAD_TIME: {
    label: "Supplier lead time",
    icon: Truck,
  },

  INCREASING_CONSUMPTION: {
    label: "Increasing consumption",
    icon: TrendingUp,
  },

  NO_SUPPLIER: {
    label: "No supplier",
    icon: AlertTriangle,
  },
};
export function ProductionRiskAnalysisEvent({
  event,
}: ProductionRiskAnalysisEventProps) {
  const {
    analysis_period_days,
    products_analyzed,
    high_risk_products,
    medium_risk_products,
    low_risk_products,
    products,
  } = event;

  const [showAll, setShowAll] = useState(false);

  if (!products.length) {
    return null;
  }

  const hasMoreProducts = products.length > INITIAL_VISIBLE_PRODUCTS;

  const visibleProducts = showAll
    ? products
    : products.slice(0, INITIAL_VISIBLE_PRODUCTS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mt-3 overflow-hidden rounded-xl border bg-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-2.5">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex size-8 items-center justify-center rounded-lg bg-destructive/10"
          >
            <AlertTriangle className="size-4 text-destructive" />
          </motion.div>

          <div>
            <p className="text-sm font-semibold">Production risk analysis</p>

            <p className="text-xs text-muted-foreground">
              {analysis_period_days}-day production horizon
            </p>
          </div>
        </div>

        <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {products_analyzed} {products_analyzed === 1 ? "product" : "products"}
        </span>
      </div>

      {/* Risk summary */}
      <div className="grid grid-cols-3 divide-x border-b">
        <RiskSummary
          value={high_risk_products}
          label="High risk"
          className="text-red-600"
        />

        <RiskSummary
          value={medium_risk_products}
          label="Medium risk"
          className="text-amber-600"
        />

        <RiskSummary
          value={low_risk_products}
          label="Low risk"
          className="text-emerald-600"
        />
      </div>

      {/* Products */}
      <motion.div layout className="divide-y">
        <AnimatePresence initial={false}>
          {visibleProducts.map((product) => {
            const risk = riskConfig[product.risk_level];

            return (
              <ProductionRiskProduct
                key={product.product_id}
                product={product}
                risk={risk}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Show more products */}
      {hasMoreProducts && (
        <div className="border-t">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
          >
            <span>
              {showAll
                ? "Show less"
                : `Show ${products.length - INITIAL_VISIBLE_PRODUCTS} more`}
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

interface ProductionRiskProductProps {
  product: ProductionRiskAnalysisEvent["products"][number];
  risk: (typeof riskConfig)[keyof typeof riskConfig];
}

function ProductionRiskProduct({ product, risk }: ProductionRiskProductProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div className="space-y-4 p-4">
        {/* Product header */}
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="w-full text-left"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold">
                  {product.product_name}
                </p>

                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${risk.className}`}
                >
                  {risk.label}
                </span>
              </div>

              <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                {product.product_sku}
              </p>
            </div>

            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="shrink-0 text-muted-foreground"
            >
              <ChevronDown className="size-4" />
            </motion.div>
          </div>
        </button>

        {/* Production capacity */}
        <div className="rounded-lg border bg-muted/20 px-3 py-2.5">
          <p className="text-[11px] text-muted-foreground">
            Currently producible
          </p>

          <p className="mt-0.5 text-lg font-semibold">
            {product.current_producible_units}

            <span className="ml-1 text-xs font-normal text-muted-foreground">
              units
            </span>
          </p>
        </div>

        {/* Bottleneck */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Factory className="size-3.5 text-muted-foreground" />

            <p className="text-xs font-semibold">Bottleneck material</p>
          </div>

          <div className="rounded-lg border px-3 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {product.bottleneck_material.material_name}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {product.bottleneck_material.current_stock} available ·{" "}
                  {product.bottleneck_material.minimum_stock} minimum
                </p>
              </div>

              <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-xs font-medium">
                {product.bottleneck_material.producible_units} units
              </span>
            </div>

            {/* Bottleneck details */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 grid grid-cols-3 gap-3 border-t pt-3">
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        Required / product
                      </p>

                      <p className="mt-0.5 text-xs font-medium">
                        {product.bottleneck_material.required_per_product}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        Daily consumption
                      </p>

                      <p className="mt-0.5 text-xs font-medium">
                        {Number(
                          product.bottleneck_material.average_daily_consumption,
                        ).toFixed(2)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        Stock coverage
                      </p>

                      <p className="mt-0.5 text-xs font-medium">
                        {product.bottleneck_material.days_of_stock
                          ? `${product.bottleneck_material.days_of_stock} days`
                          : "—"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Risk factors */}
        <AnimatePresence initial={false}>
          {expanded && product.risk_factors.length > 0 && (
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
              <p className="mb-2 text-xs font-semibold">Risk factors</p>

              <div className="space-y-2">
                {product.risk_factors.map((factor, index) => {
                  const config = factorConfig[factor.factor];
                  const FactorIcon = config.icon;
                  const severity = riskConfig[factor.severity];

                  return (
                    <motion.div
                      key={`${factor.factor}-${factor.owner_id}-${index}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.03,
                      }}
                      className="flex gap-2.5 rounded-lg border px-3 py-2.5"
                    >
                      <FactorIcon className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium">{config.label}</p>

                          <span
                            className={`rounded-full px-1.5 py-0.5 text-[9px] font-medium ${severity.className}`}
                          >
                            {severity.label}
                          </span>
                        </div>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {factor.description}
                        </p>

                        <p className="mt-1 text-[10px] text-muted-foreground">
                          Owner:{" "}
                          <span className="font-medium text-foreground">
                            {factor.owner_name}
                          </span>
                          {factor.value && (
                            <>
                              {" · "}
                              {factor.value}
                            </>
                          )}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product details toggle */}
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="flex w-full items-center justify-center gap-1.5 rounded-md py-1.5 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
        >
          <span>{expanded ? "Show less" : "Show details"}</span>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-3.5" />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}

interface RiskSummaryProps {
  value: number;
  label: string;
  className: string;
}

function RiskSummary({ value, label, className }: RiskSummaryProps) {
  return (
    <div className="px-3 py-3 text-center">
      <p className={`text-lg font-semibold ${className}`}>{value}</p>

      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  );
}
