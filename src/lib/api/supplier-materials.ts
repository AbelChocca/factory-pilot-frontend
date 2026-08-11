import { MaterialSupplier, SupplierMaterial } from "@/src/types/aliases";

import apiClient from "./axios";

export interface ReplaceMaterialSupplierItem {
  supplier_id: string;
  supplier_sku?: string;
  unit_price?: string;
  preferred?: boolean;
}

export const supplierMaterialsApi = {
  async getMaterialSuppliers(materialId: string): Promise<MaterialSupplier[]> {
    const response = await apiClient.get<MaterialSupplier[]>(
      `/materials/${materialId}/suppliers`,
    );

    return response.data;
  },

  async replaceMaterialSuppliers(
    materialId: string,
    data: ReplaceMaterialSupplierItem[],
  ): Promise<void> {
    await apiClient.put(`/materials/${materialId}/suppliers`, data);
  },

  async getPreferredSupplier(
    materialId: string,
  ): Promise<MaterialSupplier | null> {
    const response = await apiClient.get<MaterialSupplier | null>(
      `/materials/${materialId}/preferred-supplier`,
    );

    return response.data;
  },

  async getSupplierMaterials(supplierId: string): Promise<SupplierMaterial[]> {
    const response = await apiClient.get<SupplierMaterial[]>(
      `/suppliers/${supplierId}/materials`,
    );

    return response.data;
  },
};
