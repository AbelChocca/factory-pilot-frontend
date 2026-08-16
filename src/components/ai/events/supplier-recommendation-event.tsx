import { Clock3, Package, Star, Store } from "lucide-react";

import type { SupplierRecommendationEvent } from "@/src/types/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

interface SupplierRecommendationEventProps {
  event: SupplierRecommendationEvent;
}

export function SupplierRecommendationEvent({
  event,
}: SupplierRecommendationEventProps) {
  const { materials } = event;

  if (!materials.length) {
    return null;
  }

  const groupedMaterials = materials.reduce<
    Record<string, SupplierRecommendationEvent["materials"]>
  >((groups, material) => {
    const key = material.material_id;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(material);

    return groups;
  }, {});

  const materialGroups = Object.values(groupedMaterials);

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
            className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10"
          >
            <Store className="size-4 text-primary" />
          </motion.div>

          <div className="min-w-0">
            <p className="text-sm font-semibold">Supplier recommendations</p>

            <p className="truncate text-xs text-muted-foreground">
              Available suppliers for your materials
            </p>
          </div>
        </div>

        <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {materials.length} {materials.length === 1 ? "option" : "options"}
        </span>
      </div>

      {/* Materials */}
      <div className="divide-y">
        {materialGroups.map((suppliers) => (
          <SupplierMaterialGroup
            key={suppliers[0].material_id}
            suppliers={suppliers}
          />
        ))}
      </div>
    </motion.div>
  );
}

interface SupplierMaterialGroupProps {
  suppliers: SupplierRecommendationEvent["materials"];
}

function SupplierMaterialGroup({ suppliers }: SupplierMaterialGroupProps) {
  const [expanded, setExpanded] = useState(false);

  const material = suppliers[0];

  const preferredSupplier =
    suppliers.find((supplier) => supplier.preferred) ?? suppliers[0];

  const hasMoreSuppliers = suppliers.length > 1;

  const visibleSuppliers = expanded ? suppliers : [preferredSupplier];

  return (
    <motion.div layout className="p-4">
      {/* Material */}
      <div className="mb-3 flex items-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Package className="size-4 text-muted-foreground" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">
            {material.material_name}
          </p>

          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono">{material.material_sku}</span>

            <span>•</span>

            <span>{material.unit_type}</span>

            <span>•</span>

            <span>
              {suppliers.length}{" "}
              {suppliers.length === 1 ? "supplier" : "suppliers"}
            </span>
          </div>
        </div>
      </div>

      {/* Suppliers */}
      <motion.div layout className="space-y-2">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleSuppliers.map((supplier) => (
            <motion.div
              key={supplier.supplier_id}
              layout
              initial={{
                opacity: 0,
                height: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: -6,
              }}
              transition={{
                duration: 0.22,
                ease: "easeOut",
              }}
              className="overflow-hidden"
            >
              <SupplierCard supplier={supplier} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Show more */}
      {hasMoreSuppliers && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2.5 flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>
            {expanded
              ? "Show recommended only"
              : `View ${suppliers.length - 1} more ${
                  suppliers.length - 1 === 1 ? "supplier" : "suppliers"
                }`}
          </span>

          <motion.div
            animate={{
              rotate: expanded ? 180 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="size-3.5" />
          </motion.div>
        </button>
      )}
    </motion.div>
  );
}

interface SupplierCardProps {
  supplier: SupplierRecommendationEvent["materials"][number];
}

function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <div
      className={`rounded-lg border px-3 py-2.5 ${
        supplier.preferred ? "border-primary/20 bg-primary/5" : "bg-background"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        {/* Supplier */}
        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <p className="truncate text-sm font-medium">
              {supplier.supplier_name}
            </p>

            {supplier.preferred && (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                <Star className="size-3 fill-current" />
                Preferred
              </span>
            )}
          </div>

          {supplier.supplier_sku && (
            <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
              {supplier.supplier_sku}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="shrink-0 text-right">
          <p className="text-xs font-semibold">
            {supplier.unit_price ? `$${supplier.unit_price}` : "—"}
          </p>

          <p className="text-[10px] text-muted-foreground">
            per {supplier.unit_type}
          </p>
        </div>
      </div>

      {/* Lead time */}
      <div className="mt-2 flex items-center gap-1.5 border-t pt-2">
        <Clock3 className="size-3 text-muted-foreground" />

        <span className="text-[10px] text-muted-foreground">Lead time</span>

        <span className="text-[10px] font-semibold">
          {supplier.lead_time_days} days
        </span>
      </div>
    </div>
  );
}
