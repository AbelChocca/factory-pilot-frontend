import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  CreatePurchasePlanRequest,
  GetPurchasePlansParams,
  purchasePlansApi,
  UpdatePurchasePlanRequest,
} from "@/src/lib/api/purchase-plans";

const purchasePlanKeys = {
  all: ["purchase-plans"] as const,

  lists: () => [...purchasePlanKeys.all, "list"] as const,

  list: (params: GetPurchasePlansParams) =>
    [...purchasePlanKeys.lists(), params] as const,

  current: () => [...purchasePlanKeys.all, "current"] as const,

  detail: (purchasePlanId: string) =>
    [...purchasePlanKeys.all, "detail", purchasePlanId] as const,

  items: (purchasePlanId: string) =>
    [...purchasePlanKeys.all, "items", purchasePlanId] as const,
};

export function usePurchasePlans(params?: GetPurchasePlansParams) {
  return useQuery({
    queryKey: purchasePlanKeys.list(params ?? {}),
    queryFn: () => purchasePlansApi.getAll(params),
  });
}

export function useCurrentPurchasePlan() {
  return useQuery({
    queryKey: purchasePlanKeys.current(),
    queryFn: purchasePlansApi.getCurrent,
  });
}

export function usePurchasePlan(purchasePlanId: string) {
  return useQuery({
    queryKey: purchasePlanKeys.detail(purchasePlanId),
    queryFn: () => purchasePlansApi.getById(purchasePlanId),
    enabled: Boolean(purchasePlanId),
  });
}

export function usePurchasePlanItems(purchasePlanId: string) {
  return useQuery({
    queryKey: purchasePlanKeys.items(purchasePlanId),
    queryFn: () => purchasePlansApi.getItems(purchasePlanId),
    enabled: Boolean(purchasePlanId),
  });
}

export function useCreatePurchasePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePurchasePlanRequest) =>
      purchasePlansApi.create(data),

    onSuccess: (purchasePlan) => {
      queryClient.setQueryData(
        purchasePlanKeys.detail(purchasePlan.id),
        purchasePlan,
      );

      queryClient.invalidateQueries({
        queryKey: purchasePlanKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: purchasePlanKeys.current(),
      });
    },
  });
}

export function useUpdatePurchasePlan(purchasePlanId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePurchasePlanRequest) =>
      purchasePlansApi.update(purchasePlanId, data),

    onSuccess: (purchasePlan) => {
      queryClient.setQueryData(
        purchasePlanKeys.detail(purchasePlan.id),
        purchasePlan,
      );

      queryClient.invalidateQueries({
        queryKey: purchasePlanKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: purchasePlanKeys.current(),
      });

      queryClient.invalidateQueries({
        queryKey: purchasePlanKeys.items(purchasePlan.id),
      });
    },
  });
}

export function useApprovePurchasePlan(purchasePlanId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => purchasePlansApi.approve(purchasePlanId),

    onSuccess: (purchasePlan) => {
      queryClient.setQueryData(
        purchasePlanKeys.detail(purchasePlan.id),
        purchasePlan,
      );

      queryClient.invalidateQueries({
        queryKey: purchasePlanKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: purchasePlanKeys.current(),
      });

      queryClient.invalidateQueries({
        queryKey: purchasePlanKeys.items(purchasePlan.id),
      });
    },
  });
}

export function usePurchasePlanDetails(purchasePlanId: string | null) {
  const planQuery = useQuery({
    queryKey: ["purchase-plans", "detail", purchasePlanId],
    queryFn: () => purchasePlansApi.getById(purchasePlanId!),
    enabled: Boolean(purchasePlanId),
  });

  const itemsQuery = useQuery({
    queryKey: ["purchase-plans", "items", purchasePlanId],
    queryFn: () => purchasePlansApi.getItems(purchasePlanId!),
    enabled: Boolean(purchasePlanId),
  });

  return {
    plan: planQuery.data,
    items: itemsQuery.data ?? [],
    isPending: planQuery.isPending || itemsQuery.isPending,
    isError: planQuery.isError || itemsQuery.isError,
    error: planQuery.error ?? itemsQuery.error,
  };
}
