"use client";

import { useState } from "react";

import { ProductsPageHeader } from "@/src/components/products/products-page-header";
import { GetProductsParams } from "@/src/lib/api/products";
import { ProductsFilters } from "@/src/components/products/products-filters";
import { ProductsTable } from "@/src/components/products/products-table";
import { GetInventoryMovementsParams } from "@/src/lib/api/inventory-movements-api";
import { InventoryMovementsTable } from "@/src/components/inventory/inventory-movements-table";

export default function ProductsPage() {
  const [filters, setFilters] = useState<GetProductsParams>({
    page: 1,
    limit: 20,
  });

  const [movementFilters, setMovementFilters] =
    useState<GetInventoryMovementsParams>({
      page: 1,
      limit: 20,
    });

  return (
    <div className="flex-1 space-y-6 p-6">
      <ProductsPageHeader />

      <div className="space-y-4">
        <ProductsFilters filters={filters} onFiltersChange={setFilters} />
        <ProductsTable filters={filters} onFiltersChange={setFilters} />
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Inventory Movements</h2>

          <p className="text-sm text-muted-foreground">
            Track all inventory movements for materials.
          </p>
        </div>

        <InventoryMovementsTable
          filters={movementFilters}
          onFiltersChange={setMovementFilters}
          ownerType="PRODUCT"
        />
      </div>
    </div>
  );
}
