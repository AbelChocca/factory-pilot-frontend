import { PaginatedInventoryMovements } from "@/src/types/aliases";
import apiClient from "./axios";
import {
  InventoryMovementType,
  InventoryOwnerType,
} from "@/src/types/inventry-types";

export interface InventoryMovementFilters {
  query?: string;
  movement_type?: InventoryMovementType;
  owner_type?: InventoryOwnerType;
  owner_id?: string;
  created_from?: string;
  created_to?: string;
}

export interface CreateInventoryMovementRequest {
  movement_type: InventoryMovementType;
  owner_type: InventoryOwnerType;
  owner_id: string;
  reason?: string;
  quantity: string;
}

export interface GetInventoryMovementsParams extends InventoryMovementFilters {
  page?: number;
  limit?: number;
}

export const inventoryMovementsApi = {
  async create(data: CreateInventoryMovementRequest): Promise<void> {
    await apiClient.post("/inventory-movements/", data);
  },

  async getAll(
    params?: GetInventoryMovementsParams,
  ): Promise<PaginatedInventoryMovements> {
    const response = await apiClient.get("/inventory-movements/", {
      params,
    });

    return response.data;
  },
};
