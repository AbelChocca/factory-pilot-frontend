"use client";

import { useState } from "react";

import { SuppliersPageHeader } from "@/src/components/suppliers/suppliers-page-header";
import { SuppliersFilters } from "@/src/components/suppliers/suppliers-filters";
import { SuppliersTable } from "@/src/components/suppliers/suppliers-table";

import { GetSuppliersParams } from "@/src/lib/api/suppliers";

export default function SuppliersPage() {
  const [filters, setFilters] = useState<GetSuppliersParams>({
    page: 1,
    limit: 20,
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      <SuppliersPageHeader />

      <div className="space-y-4">
        <SuppliersFilters filters={filters} onFiltersChange={setFilters} />

        <SuppliersTable filters={filters} onFiltersChange={setFilters} />
      </div>
    </div>
  );
}
