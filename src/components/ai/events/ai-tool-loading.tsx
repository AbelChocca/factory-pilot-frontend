"use client";

import {
  BarChart3,
  Boxes,
  CircleDollarSign,
  Factory,
  Loader2,
  PackageSearch,
  ShoppingCart,
  Truck,
} from "lucide-react";

interface AIToolLoadingProps {
  toolName: string;
}

const TOOL_LOADING_CONFIG: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
  }
> = {
  analyze_inventory_trends: {
    label: "Analyzing inventory trends...",
    icon: BarChart3,
  },

  analyze_product_material_dependency: {
    label: "Analyzing material dependencies...",
    icon: Boxes,
  },

  recommend_replenishment: {
    label: "Finding replenishment options...",
    icon: ShoppingCart,
  },

  generate_purchase_plan: {
    label: "Creating purchase plan...",
    icon: CircleDollarSign,
  },

  analyze_supplier_risk: {
    label: "Analyzing supplier risk...",
    icon: Truck,
  },

  get_low_stock_materials: {
    label: "Checking material inventory...",
    icon: PackageSearch,
  },

  get_material_details: {
    label: "Loading material details...",
    icon: Boxes,
  },

  get_supplier_details: {
    label: "Loading supplier details...",
    icon: Truck,
  },

  analyze_production_risk: {
    label: "Analyzing production risks...",
    icon: Factory,
  },
};

export function AIToolLoading({ toolName }: AIToolLoadingProps) {
  const config = TOOL_LOADING_CONFIG[toolName];

  const Icon = config?.icon ?? Loader2;

  const label = config?.label ?? "Working on your request...";

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-background/50 px-3 py-2.5">
      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted">
        <Icon className="size-4 text-muted-foreground" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium">{label}</p>

        <div className="mt-1.5 flex items-center gap-1.5">
          <Loader2 className="size-3 animate-spin text-muted-foreground" />

          <span className="text-[11px] text-muted-foreground">
            FactoryPilot is working
          </span>
        </div>
      </div>
    </div>
  );
}
