import {
  PurchasePlanApprovedEvent,
  type PurchasePlanEvent,
  PurchasePlanUpdatedEvent,
} from "@/src/types/ai";
import { Check, Clock3, Package, RefreshCw, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface PurchasePlanEventProps {
  event:
    | PurchasePlanEvent
    | PurchasePlanUpdatedEvent
    | PurchasePlanApprovedEvent;
}

const statusConfig = {
  purchase_plan: {
    label: "Proposed",
    icon: ShoppingCart,
  },

  purchase_plan_updated: {
    label: "Updated",
    icon: RefreshCw,
  },

  purchase_plan_approved: {
    label: "Approved",
    icon: Check,
  },
};

export function PurchasePlanEvent({ event }: PurchasePlanEventProps) {
  const [showAll, setShowAll] = useState(false);

  const { items, total_estimated_cost } = event;

  if (!items.length) {
    return null;
  }

  const status = statusConfig[event.type];
  const StatusIcon = status.icon;

  const isApproved = event.type === "purchase_plan_approved";
  const isUpdated = event.type === "purchase_plan_updated";

  const INITIAL_VISIBLE_ITEMS = 3;

  const hasMoreItems = items.length > INITIAL_VISIBLE_ITEMS;

  const visibleItems = showAll ? items : items.slice(0, INITIAL_VISIBLE_ITEMS);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mt-3 overflow-hidden rounded-xl border bg-card"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
              isApproved ? "bg-emerald-500/10" : "bg-primary/10"
            }`}
          >
            <StatusIcon
              className={`size-4 ${
                isApproved ? "text-emerald-600" : "text-primary"
              }`}
            />
          </motion.div>

          <div className="min-w-0">
            <p className="text-sm font-semibold">Purchase plan</p>

            <p className="truncate text-xs text-muted-foreground">
              {isApproved
                ? "Purchase plan approved"
                : isUpdated
                  ? "Purchase plan updated"
                  : "Recommended material replenishment"}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
            isApproved
              ? "bg-emerald-500/10 text-emerald-600"
              : isUpdated
                ? "bg-blue-500/10 text-blue-600"
                : "bg-primary/10 text-primary"
          }`}
        >
          {status.label}
        </span>
      </div>

      {/* Items */}
      <motion.div layout className="divide-y">
        <AnimatePresence initial={false}>
          {visibleItems.map((item) => (
            <PurchasePlanItem
              key={`${item.material_id}-${item.supplier_id}`}
              item={item}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show more */}
      {hasMoreItems && (
        <div className="border-t">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="flex w-full items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
          >
            <span>
              {showAll
                ? "Show less"
                : `Show ${items.length - INITIAL_VISIBLE_ITEMS} more`}
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

      {/* Footer */}
      <div className="flex items-center justify-between border-t bg-muted/20 px-4 py-3">
        <div>
          <p className="text-xs text-muted-foreground">Total estimated cost</p>

          <p className="text-base font-semibold">
            $
            {total_estimated_cost.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground">Purchase plan</p>

          <p className="font-mono text-[11px] text-muted-foreground">
            {event.purchase_plan_id}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

interface PurchasePlanItemProps {
  item: PurchasePlanEvent["items"][number];
}

function PurchasePlanItem({ item }: PurchasePlanItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className="overflow-hidden"
    >
      <div className="px-4 py-3">
        {/* Item summary */}
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="w-full text-left"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Package className="size-3.5 text-muted-foreground" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {item.material_name}
              </p>

              <p className="mt-0.5 text-xs text-muted-foreground">
                {item.quantity} {item.unit_type}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-semibold">${item.estimated_cost}</p>

                <p className="text-[10px] text-muted-foreground">estimated</p>
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

        {/* Expanded details */}
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
              <div className="mt-3 rounded-lg border bg-muted/10">
                {/* Supplier */}
                <div className="flex items-center justify-between gap-3 px-3 py-2.5">
                  <span className="text-[10px] text-muted-foreground">
                    Supplier
                  </span>

                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-xs font-medium">
                      {item.supplier_name}
                    </span>

                    {item.preferred_supplier && (
                      <span className="shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-medium text-primary">
                        Preferred
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t" />

                {/* Details */}
                <div className="grid grid-cols-3 divide-x">
                  <div className="px-3 py-2.5">
                    <p className="text-[10px] text-muted-foreground">
                      Unit price
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      ${item.unit_price}
                    </p>

                    <p className="mt-0.5 text-[9px] text-muted-foreground">
                      per {item.unit_type}
                    </p>
                  </div>

                  <div className="px-3 py-2.5">
                    <p className="text-[10px] text-muted-foreground">
                      Lead time
                    </p>

                    <div className="mt-1 flex items-center gap-1">
                      <Clock3 className="size-3 text-muted-foreground" />

                      <p className="text-xs font-semibold">
                        {item.lead_time_days}d
                      </p>
                    </div>
                  </div>

                  <div className="px-3 py-2.5">
                    <p className="text-[10px] text-muted-foreground">
                      Quantity
                    </p>

                    <p className="mt-1 text-xs font-semibold">
                      {item.quantity}
                    </p>

                    <p className="mt-0.5 text-[9px] text-muted-foreground">
                      {item.unit_type}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Details hint */}
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 flex items-center gap-1 text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>{expanded ? "Hide details" : "View details"}</span>

          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-3" />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}
