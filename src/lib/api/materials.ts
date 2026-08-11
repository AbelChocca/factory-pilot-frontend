import {
  AvailabilityStatus,
  Material,
  MaterialType,
  PaginatedMaterials,
  UnitType,
} from "@/src/types/aliases";
import apiClient from "./axios";

export interface MaterialFilters {
  query?: string;
  unit_type?: UnitType;
  availability_status?: AvailabilityStatus;
}

export interface CreateMaterialRequest {
  name: string;
  description?: string;
  material_type: MaterialType;
  unit_type: UnitType;
  initial_stock: string;
  initial_minimum_stock: string;
}

export interface GetMaterialsParams extends MaterialFilters {
  page?: number;
  limit?: number;
}

export const materialsApi = {
  async create(data: CreateMaterialRequest): Promise<Material> {
    const response = await apiClient.post<Material>("/materials/", data);

    return response.data;
  },

  async getAll(params?: GetMaterialsParams): Promise<PaginatedMaterials> {
    const response = await apiClient.get<PaginatedMaterials>("/materials/", {
      params,
    });

    return response.data;
  },

  async getById(materialId: string): Promise<Material> {
    const response = await apiClient.get<Material>(`/materials/${materialId}`);

    return response.data;
  },

  async delete(materialId: string): Promise<void> {
    await apiClient.delete(`/materials/${materialId}`);
  },
};
