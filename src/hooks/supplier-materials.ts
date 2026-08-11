import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  ReplaceMaterialSupplierItem,
  supplierMaterialsApi,
} from "@/src/lib/api/supplier-materials";

export const supplierMaterialKeys = {
  all: ["supplier-materials"] as const,

  material: (materialId: string) =>
    [...supplierMaterialKeys.all, "material", materialId] as const,

  preferred: (materialId: string) =>
    [...supplierMaterialKeys.all, "material", materialId, "preferred"] as const,

  supplier: (supplierId: string) =>
    [...supplierMaterialKeys.all, "supplier", supplierId] as const,
};

export const useMaterialSuppliers = (materialId: string) => {
  return useQuery({
    queryKey: supplierMaterialKeys.material(materialId),
    queryFn: () => supplierMaterialsApi.getMaterialSuppliers(materialId),
    enabled: !!materialId,
  });
};

export const usePreferredSupplier = (materialId: string) => {
  return useQuery({
    queryKey: supplierMaterialKeys.preferred(materialId),
    queryFn: () => supplierMaterialsApi.getPreferredSupplier(materialId),
    enabled: !!materialId,
  });
};

export const useSupplierMaterials = (supplierId: string) => {
  return useQuery({
    queryKey: supplierMaterialKeys.supplier(supplierId),
    queryFn: () => supplierMaterialsApi.getSupplierMaterials(supplierId),
    enabled: !!supplierId,
  });
};

export const useReplaceMaterialSuppliers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      materialId,
      suppliers,
    }: {
      materialId: string;
      suppliers: ReplaceMaterialSupplierItem[];
    }) => supplierMaterialsApi.replaceMaterialSuppliers(materialId, suppliers),

    onSuccess: (_, { materialId }) => {
      queryClient.invalidateQueries({
        queryKey: supplierMaterialKeys.material(materialId),
      });

      queryClient.invalidateQueries({
        queryKey: supplierMaterialKeys.preferred(materialId),
      });

      queryClient.invalidateQueries({
        queryKey: supplierMaterialKeys.all,
      });
    },
  });
};
