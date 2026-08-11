import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateInventoryMovementRequest,
  GetInventoryMovementsParams,
  inventoryMovementsApi,
} from "../lib/api/inventory-movements-api";

export const inventoryMovementKeys = {
  all: ["inventory-movements"] as const,

  lists: () => [...inventoryMovementKeys.all, "list"] as const,

  list: (params?: GetInventoryMovementsParams) =>
    [...inventoryMovementKeys.lists(), params] as const,
};

export const useInventoryMovements = (params?: GetInventoryMovementsParams) => {
  return useQuery({
    queryKey: inventoryMovementKeys.list(params),
    queryFn: () => inventoryMovementsApi.getAll(params),
  });
};

export const useCreateInventoryMovement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInventoryMovementRequest) =>
      inventoryMovementsApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: inventoryMovementKeys.lists(),
      });
    },
  });
};
