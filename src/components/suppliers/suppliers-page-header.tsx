"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { CreateSupplierDrawer } from "./create-supplier-drawer";

export function SuppliersPageHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Suppliers</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage suppliers, lead times and sourcing relationships.
          </p>
        </div>

        <Button onClick={() => setIsCreateOpen(true)}>
          <Plus className="size-4" />
          Add Supplier
        </Button>
      </div>

      <CreateSupplierDrawer
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
      />
    </>
  );
}
