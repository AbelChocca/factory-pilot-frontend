"use client";

import { useState } from "react";

import { MaterialsFilters } from "@/src/components/materials/materials-filters";
import { MaterialsPageHeader } from "@/src/components/materials/materials-page-header";
import { MaterialsTable } from "@/src/components/materials/materials-table";
import { InventoryMovementsTable } from "@/src/components/inventory/inventory-movements-table";

import { GetMaterialsParams } from "@/src/lib/api/materials";
import { GetInventoryMovementsParams } from "@/src/lib/api/inventory-movements-api";

export default function MaterialsPage() {
  const [filters, setFilters] = useState<GetMaterialsParams>({
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
      <MaterialsPageHeader />

      <div className="space-y-4">
        <MaterialsFilters filters={filters} onFiltersChange={setFilters} />

        <MaterialsTable filters={filters} onFiltersChange={setFilters} />
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
          ownerType="MATERIAL"
        />
      </div>
    </div>
  );
}
