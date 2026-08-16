import type { AIEvent, AIToolExecution } from "@/src/types/ai";

import { LowStockMaterialsEvent } from "./events/low-stock-materials-event";
import { SupplierRecommendationEvent } from "./events/supplier-recommendation-event";
import { PurchasePlanEvent } from "./events/purchase-plan-event";
import { ProductionRiskAnalysisEvent } from "./events/production-risk-analysis-event";
import { MaterialImpactAnalysisEvent } from "./events/material-impact-analysis-event";
import { AIErrorEvent } from "./events/error_event";
import { InventoryTrendAnalysisEvent } from "./events/inventory-trend-analysis-event";
import { AIToolLoading } from "./events/ai-tool-loading";

interface AIEventRendererProps {
  execution: AIToolExecution;
}

export function AIEventRenderer({ execution }: AIEventRendererProps) {
  const { event, toolName } = execution;

  if (!event) {
    return <AIToolLoading toolName={toolName} />;
  }

  return <AIEventContent event={event} />;
}

interface AIEventContentProps {
  event: AIEvent;
}

function AIEventContent({ event }: AIEventContentProps) {
  switch (event.type) {
    case "low_stock_materials":
      return <LowStockMaterialsEvent event={event} />;

    case "supplier_recommendations":
      return <SupplierRecommendationEvent event={event} />;

    case "purchase_plan":
    case "purchase_plan_updated":
    case "purchase_plan_approved":
      return <PurchasePlanEvent event={event} />;

    case "production_risk_analysis":
      return <ProductionRiskAnalysisEvent event={event} />;

    case "material_impact_analysis":
      return <MaterialImpactAnalysisEvent event={event} />;

    case "inventory_trends":
      return <InventoryTrendAnalysisEvent event={event} />;

    case "error":
      return <AIErrorEvent event={event} />;

    default:
      return null;
  }
}
