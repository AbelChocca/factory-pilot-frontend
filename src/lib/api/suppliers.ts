import { PaginatedSuppliers, Status, Supplier } from "@/src/types/aliases";

import apiClient from "./axios";

export interface SupplierFilters {
  query?: string;
  status?: Status;
}

export interface CreateSupplierRequest {
  name: string;
  email?: string;
  phone?: string;
  lead_time_days: number;
}

export interface GetSuppliersParams extends SupplierFilters {
  page?: number;
  limit?: number;
}

export const suppliersApi = {
  async create(data: CreateSupplierRequest): Promise<Supplier> {
    const response = await apiClient.post<Supplier>("/suppliers/", data);

    return response.data;
  },

  async getAll(params?: GetSuppliersParams): Promise<PaginatedSuppliers> {
    const response = await apiClient.get<PaginatedSuppliers>("/suppliers/", {
      params,
    });

    return response.data;
  },

  async getById(supplierId: string): Promise<Supplier> {
    const response = await apiClient.get<Supplier>(`/suppliers/${supplierId}`);

    return response.data;
  },

  async delete(supplierId: string): Promise<void> {
    await apiClient.delete(`/suppliers/${supplierId}`);
  },
};
