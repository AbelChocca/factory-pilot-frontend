import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  CreateProductRequest,
  GetProductsParams,
  productsApi,
} from "@/src/lib/api/products";

export const productKeys = {
  all: ["products"] as const,

  lists: () => [...productKeys.all, "list"] as const,

  list: (params?: GetProductsParams) =>
    [...productKeys.lists(), params] as const,

  details: () => [...productKeys.all, "detail"] as const,

  detail: (productId: string) => [...productKeys.details(), productId] as const,
};

export const useProducts = (params?: GetProductsParams) => {
  return useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => productsApi.getAll(params),
  });
};

export const useProduct = (productId: string) => {
  return useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => productsApi.getById(productId),
    enabled: !!productId,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => productsApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => productsApi.delete(productId),

    onSuccess: (_, productId) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: productKeys.detail(productId),
      });
    },
  });
};
