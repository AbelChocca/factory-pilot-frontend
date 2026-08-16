import { UnitType } from "./aliases";
import { InventoryOwnerType } from "./inventry-types";

export type MaterialImpactLevel = "LOW" | "MEDIUM" | "HIGH";

export type ProductionRiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type ProductionRiskFactorType =
  | "LOW_STOCK"
  | "LOW_STOCK_COVERAGE"
  | "PRODUCTION_BOTTLENECK"
  | "SUPPLIER_LEAD_TIME"
  | "INCREASING_CONSUMPTION"
  | "NO_SUPPLIER";

export type ConsumptionTrend = "DECREASING" | "STABLE" | "INCREASING";

export enum InventoryTrend {
  INCREASING = "increasing",
  DECREASING = "decreasing",
  STABLE = "stable",
}

export interface InventoryTrendPoint {
  date: string;
  quantity: number;
}

export interface InventoryTrendItem {
  owner_id: string;
  owner_type: InventoryOwnerType;

  owner_name: string;
  owner_code: string;
  unit_type: UnitType;

  current_quantity: number;
  minimum_quantity: number;

  average_daily_outflow: number;
  average_daily_inflow: number;

  coverage_days: number | null;

  trend: InventoryTrend;

  total_inflow: number;
  total_outflow: number;

  history: InventoryTrendPoint[];
}

export interface InventoryTrendAnalysisEvent {
  type: "inventory_trends";

  period_days: number;

  analyzed_from: string;
  analyzed_to: string;

  items: InventoryTrendItem[];

  total_items: number;
  decreasing_items: number;
  increasing_items: number;
  stable_items: number;
}

export interface ProductionRiskLLMFactor {
  factor: ProductionRiskFactorType;
  severity: ProductionRiskLevel;
  owner_id: string;
  owner_name: string;
  value: string | null;
  description: string;
}

export interface ProductionRiskLLMMaterial {
  material_id: string;
  material_name: string;
  current_stock: string;
  minimum_stock: string;
  required_per_product: string;
  producible_units: string;
  average_daily_consumption: string;
  days_of_stock: string | null;
}

export interface ProductionRiskLLMProduct {
  product_id: string;
  product_name: string;
  product_sku: string;

  risk_level: ProductionRiskLevel;
  current_producible_units: string;

  bottleneck_material: ProductionRiskLLMMaterial;

  risk_factors: ProductionRiskLLMFactor[];
}

export interface LowStockMaterial {
  material_id: string;
  sku: string;
  name: string;
  quantity: string;
  minimum_quantity: string;
  unit_type: string;
}

export interface PurchasePlanItem {
  material_id: string;
  material_name: string;

  supplier_id: string;
  supplier_name: string;

  quantity: string;
  unit_type: UnitType;

  unit_price: string;
  estimated_cost: string;

  lead_time_days: number;
  preferred_supplier: boolean;
}

export interface MaterialSupplierDetailResponse {
  material_id: string;
  supplier_id: string;

  material_name: string;
  material_sku: string;
  unit_type: UnitType;

  supplier_name: string;
  supplier_sku: string | null;

  unit_price: string | null;
  lead_time_days: number;
  preferred: boolean;
}

export interface PurchasePlanUpdatedEvent {
  type: "purchase_plan_updated";
  purchase_plan_id: string;
  items: PurchasePlanItem[];
  total_estimated_cost: number;
}

export interface PurchasePlanApprovedEvent {
  type: "purchase_plan_approved";
  purchase_plan_id: string;
  items: PurchasePlanItem[];
  total_estimated_cost: number;
}

export interface ProductionRiskAnalysisEvent {
  type: "production_risk_analysis";

  analysis_period_days: number;
  products_analyzed: number;
  high_risk_products: number;
  medium_risk_products: number;
  low_risk_products: number;

  products: ProductionRiskLLMProduct[];
}

export interface MaterialImpactAnalysisEvent {
  type: "material_impact_analysis";

  material_id: string;
  material_name: string;
  material_sku: string;

  impact_level: MaterialImpactLevel;

  current_quantity: string;
  minimum_quantity: string;

  total_outbound: string;
  outbound_movements: number;

  stock_coverage_days: string | null;
  min_lead_time_days: number | null;

  affected_products_count: number;
  supplier_count: number;
}

export interface LowStockMaterialEvent {
  type: "low_stock_materials";
  materials: LowStockMaterial[];
}

export interface SupplierRecommendationEvent {
  type: "supplier_recommendations";
  materials: MaterialSupplierDetailResponse[];
}

export interface PurchasePlanEvent {
  type: "purchase_plan";
  purchase_plan_id: string;
  items: PurchasePlanItem[];
  total_estimated_cost: number;
}

export interface ErrorEvent {
  type: "error";
  message: string;
}

export interface AIChatRequest {
  message: string;
  conversation_id?: string | null;
}

export interface AIMessageStart {
  type: "message_start";
  conversation_id: string;
}

export interface AIMessageDelta {
  type: "message_delta";
  delta: string;
}

export interface AIMessageEnd {
  type: "message_end";
  status: AIAgentStatus;
}

export interface AIToolStart {
  type: "tool_start";
  tool_name: string;
  call_id: string;
}

export interface AIToolEvent {
  type: "tool_event";
  event: AIEvent;
  call_id: string;
}

export interface AIStreamError {
  type: "error";
  message: string;
}

export type AIEvent =
  | LowStockMaterialEvent
  | SupplierRecommendationEvent
  | PurchasePlanEvent
  | PurchasePlanUpdatedEvent
  | PurchasePlanApprovedEvent
  | ProductionRiskAnalysisEvent
  | MaterialImpactAnalysisEvent
  | InventoryTrendAnalysisEvent
  | ErrorEvent;

export type AIStreamEvent =
  | AIMessageStart
  | AIMessageDelta
  | AIMessageEnd
  | AIToolStart
  | AIToolEvent
  | AIStreamError;

export interface AIUserMessage {
  id: string;
  role: "user";
  content: string;
}

export interface AIAssistantMessage {
  id: string;
  role: "assistant";
  content: string;
  toolExecutions: AIToolExecution[];
  agentStatus?: AIAgentStatus;
}

export type AIChatMessage = AIUserMessage | AIAssistantMessage;

export interface AIToolExecution {
  callId: string;
  toolName: string;
  event?: AIEvent;
}

export enum AIAgentStatus {
  THINKING = "thinking",
  ANALYZING = "analyzing",
  COMPLETED = "completed",
  ERROR = "error",
}
