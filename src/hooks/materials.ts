import {
  useQuery,
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";
import {
  CreateMaterialRequest,
  GetMaterialsParams,
  materialsApi,
} from "../lib/api/materials";

export const materialsQueryKeys = {
  all: ["materials"] as const,

  list: (params?: GetMaterialsParams) =>
    [...materialsQueryKeys.all, "list", params] as const,

  detail: (materialId: string) =>
    [...materialsQueryKeys.all, "detail", materialId] as const,
};

export function useMaterials(params?: GetMaterialsParams) {
  return useQuery({
    queryKey: materialsQueryKeys.list(params),
    queryFn: () => materialsApi.getAll(params),
  });
}

export function useMaterial(materialId: string) {
  return useQuery({
    queryKey: materialsQueryKeys.detail(materialId),
    queryFn: () => materialsApi.getById(materialId),
    enabled: Boolean(materialId),
  });
}

export function useCreateMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMaterialRequest) => materialsApi.create(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: materialsQueryKeys.all,
      });
    },
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (materialId: string) => materialsApi.delete(materialId),

    onSuccess: (_, materialId) => {
      queryClient.removeQueries({
        queryKey: materialsQueryKeys.detail(materialId),
      });

      queryClient.invalidateQueries({
        queryKey: materialsQueryKeys.all,
      });
    },
  });
}

export function useInfiniteMaterials(search: string) {
  return useInfiniteQuery({
    queryKey: ["materials", "infinite", search],

    initialPageParam: 1,

    queryFn: ({ pageParam }) =>
      materialsApi.getAll({
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
