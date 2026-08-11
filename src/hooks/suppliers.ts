import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  CreateSupplierRequest,
  GetSuppliersParams,
  suppliersApi,
} from "@/src/lib/api/suppliers";

export const supplierKeys = {
  all: ["suppliers"] as const,

  lists: () => [...supplierKeys.all, "list"] as const,

  list: (params?: GetSuppliersParams) =>
    [...supplierKeys.lists(), params] as const,

  details: () => [...supplierKeys.all, "detail"] as const,

  detail: (supplierId: string) =>
    [...supplierKeys.details(), supplierId] as const,
};

export const useSuppliers = (params?: GetSuppliersParams) => {
  return useQuery({
    queryKey: supplierKeys.list(params),
    queryFn: () => suppliersApi.getAll(params),
  });
};

export const useSupplier = (supplierId: string) => {
  return useQuery({
    queryKey: supplierKeys.detail(supplierId),
    queryFn: () => suppliersApi.getById(supplierId),
    enabled: !!supplierId,
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSupplierRequest) => suppliersApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.lists(),
      });
    },
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supplierId: string) => suppliersApi.delete(supplierId),

    onSuccess: (_, supplierId) => {
      queryClient.invalidateQueries({
        queryKey: supplierKeys.lists(),
      });

      queryClient.removeQueries({
        queryKey: supplierKeys.detail(supplierId),
      });
    },
  });
};

export function useInfiniteSuppliers(search: string) {
  return useInfiniteQuery({
    queryKey: ["suppliers", "infinite", search],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      suppliersApi.getAll({
        query: search.trim() || undefined,
        page: pageParam,
        limit: 20,
      }),

    getNextPageParam: (lastPage) => {
      if (lastPage.current_page >= lastPage.total_pages) {
        return undefined;
      }

      return lastPage.current_page + 1;
    },
  });
}
