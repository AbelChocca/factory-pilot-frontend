"use client";

import { useState } from "react";
import { GetPurchasePlansParams } from "@/src/lib/api/purchase-plans";
import { PurchasePlansPageHeader } from "@/src/components/purchase_plans/purchase-plans-page-header";
import { PurchasePlansTable } from "@/src/components/purchase_plans/purchase_plans_table";

export default function PurchasePlansPage() {
  const [filters, setFilters] = useState<GetPurchasePlansParams>({
    page: 1,
    limit: 20,
  });

  return (
    <div className="flex-1 space-y-6 p-6">
      <PurchasePlansPageHeader />

      <PurchasePlansTable filters={filters} onFiltersChange={setFilters} />
    </div>
  );
}
