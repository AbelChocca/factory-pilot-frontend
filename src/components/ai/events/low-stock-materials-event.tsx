"use client";

import { useState } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import type { LowStockMaterialEvent } from "@/src/types/ai";

interface LowStockMaterialsEventProps {
  event: LowStockMaterialEvent;
}

const INITIAL_VISIBLE_ITEMS = 5;

export function LowStockMaterialsEvent({ event }: LowStockMaterialsEventProps) {
  const { materials } = event;
  const [expanded, setExpanded] = useState(false);

  if (!materials.length) {
    return null;
  }

  const hasMore = materials.length > INITIAL_VISIBLE_ITEMS;
  const visibleMaterials = expanded
    ? materials
    : materials.slice(0, INITIAL_VISIBLE_ITEMS);

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
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10"
          >
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </motion.div>

          <div>
            <p className="text-sm font-semibold">Low-stock materials</p>
            <p className="text-xs text-muted-foreground">
              Materials below the minimum level
            </p>
          </div>
        </div>

        <span className="rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600">
          {materials.length} {materials.length === 1 ? "material" : "materials"}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                Material
              </th>

              <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">
                SKU
              </th>

              <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                Current Stock
              </th>

              <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                Minimum
              </th>

              <th className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground">
                Level
              </th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence initial={false}>
              {visibleMaterials.map((material) => {
                const quantity = Number(material.quantity);
                const minimumQuantity = Number(material.minimum_quantity);

                const stockPercentage =
                  minimumQuantity > 0
                    ? Math.round((quantity / minimumQuantity) * 100)
                    : 0;

                const percentage = Math.min(stockPercentage, 100);

                return (
                  <motion.tr
                    key={material.material_id}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="border-b last:border-0 hover:bg-muted/20"
                  >
                    {/* Material */}
                    <td className="px-4 py-3">
                      <span className="font-medium">{material.name}</span>
                    </td>

                    {/* SKU */}
                    <td className="px-4 py-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {material.sku}
                      </span>
                    </td>

                    {/* Current stock */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="font-semibold text-amber-600">
                          {material.quantity}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {material.unit_type}
                        </span>
                      </div>
                    </td>

                    {/* Minimum */}
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="font-medium">
                          {material.minimum_quantity}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {material.unit_type}
                        </span>
                      </div>
                    </td>

                    {/* Percentage */}
                    <td className="min-w-[130px] px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{
                              duration: 0.5,
                              delay: 0.05,
                              ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-amber-500"
                          />
                        </div>

                        <span className="w-10 text-right text-xs font-medium text-muted-foreground">
                          {stockPercentage}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Expand / Collapse */}
      {hasMore && (
        <div className="border-t">
          <button
            type="button"
            onClick={() => setExpanded((current) => !current)}
            className="flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
          >
            <span>
              {expanded
                ? "Show less"
                : `Show ${materials.length - INITIAL_VISIBLE_ITEMS} more`}
            </span>

            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
        </div>
      )}
    </motion.div>
  );
}
