import {
  AvailabilityStatus,
  PaginatedProducts,
  Product,
} from "@/src/types/aliases";

import apiClient from "./axios";

export interface ProductFilters {
  query?: string;
  availability_status?: AvailabilityStatus;
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  initial_stock: string;
  initial_minimum_stock: string;
}

export interface GetProductsParams extends ProductFilters {
  page?: number;
  limit?: number;
}

export const productsApi = {
  async create(data: CreateProductRequest): Promise<Product> {
    const formData = new FormData();

    formData.append("name", data.name);

    if (data.description) {
      formData.append("description", data.description);
    }

    formData.append("initial_stock", data.initial_stock);
    formData.append("initial_minimum_stock", data.initial_minimum_stock);

    const response = await apiClient.post<Product>("/products/", formData);

    return response.data;
  },

  async getAll(params?: GetProductsParams): Promise<PaginatedProducts> {
    const response = await apiClient.get<PaginatedProducts>("/products/", {
      params,
    });

    return response.data;
  },

  async getById(productId: string): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${productId}`);

    return response.data;
  },

  async delete(productId: string): Promise<void> {
    await apiClient.delete(`/products/${productId}`);
  },
};
