import {
  PaginatedPurchasePlans,
  PurchasePlan,
  PurchasePlanItem,
} from "@/src/types/aliases";

import apiClient from "./axios";

export interface PurchasePlanItemRequest {
  material_id: string;
  supplier_id: string;
  quantity: string;
}

export interface CreatePurchasePlanRequest {
  items: PurchasePlanItemRequest[];
}

export interface UpdatePurchasePlanRequest {
  items: PurchasePlanItemRequest[];
}

export interface GetPurchasePlansParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const purchasePlansApi = {
  async create(data: CreatePurchasePlanRequest): Promise<PurchasePlan> {
    const response = await apiClient.post<PurchasePlan>(
      "/purchase-plans/",
      data,
    );

    return response.data;
  },

  async getAll(
    params?: GetPurchasePlansParams,
  ): Promise<PaginatedPurchasePlans> {
    const response = await apiClient.get<PaginatedPurchasePlans>(
      "/purchase-plans/",
      {
        params,
      },
    );

    return response.data;
  },

  async getCurrent(): Promise<PurchasePlan> {
    const response = await apiClient.get<PurchasePlan>(
      "/purchase-plans/current",
    );

    return response.data;
  },

  async getById(purchasePlanId: string): Promise<PurchasePlan> {
    const response = await apiClient.get<PurchasePlan>(
      `/purchase-plans/${purchasePlanId}`,
    );

    return response.data;
  },

  async getItems(purchasePlanId: string): Promise<PurchasePlanItem[]> {
    const response = await apiClient.get<PurchasePlanItem[]>(
      `/purchase-plans/${purchasePlanId}/items`,
    );

    return response.data;
  },

  async update(
    purchasePlanId: string,
    data: UpdatePurchasePlanRequest,
  ): Promise<PurchasePlan> {
    const response = await apiClient.put<PurchasePlan>(
      `/purchase-plans/${purchasePlanId}`,
      data,
    );

    return response.data;
  },

  async approve(purchasePlanId: string): Promise<PurchasePlan> {
    const response = await apiClient.post<PurchasePlan>(
      `/purchase-plans/${purchasePlanId}/approve`,
    );

    return response.data;
  },
};
